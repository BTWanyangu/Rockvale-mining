import test from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../server/app.mjs";
import { EnquiryRateLimiter } from "../server/contact.mjs";
const payload = {
  name: "Test Sender",
  email: "sender@example.test",
  organisation: "",
  phone: "",
  type: "General enquiry",
  message:
    "Please discuss this resource opportunity and the available information.",
  website: "",
  consent: true,
};
async function running(options, callback) {
  const app = createApp(options);
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    await callback(base);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}
const post = (base, body, headers = {}) =>
  fetch(`${base}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
test("health and delivery readiness do not expose configuration", () =>
  running({}, async (base) => {
    const health = await fetch(`${base}/health`);
    assert.equal(health.status, 200);
    assert.deepEqual(await health.json(), { ok: true });
    const config = await fetch(`${base}/api/contact-config`);
    assert.deepEqual(await config.json(), { enabled: false });
    assert.equal(config.headers.get("cache-control"), "no-store");
    const result = await post(base, payload);
    assert.equal(result.status, 503);
    assert.equal((await result.json()).ok, false);
  }));
test("cross-origin submission and non-JSON requests are rejected", () =>
  running({}, async (base) => {
    assert.equal(
      (await post(base, payload, { Origin: "https://unapproved.invalid" }))
        .status,
      403,
    );
    const plain = await fetch(`${base}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: "text",
    });
    assert.equal(plain.status, 415);
  }));
test("malformed JSON, excessive body size and invalid fields get explicit errors", () =>
  running({}, async (base) => {
    const malformed = await fetch(`${base}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{",
    });
    assert.equal(malformed.status, 400);
    const oversized = await post(base, {
      ...payload,
      message: "a".repeat(26000),
    });
    assert.equal(oversized.status, 413);
    const invalid = await post(base, { ...payload, email: "invalid" });
    assert.equal(invalid.status, 422);
    assert((await invalid.json()).errors.email);
  }));
test("approved origins receive CORS headers on readiness and accepted submissions", () =>
  running(
    {
      allowedOrigins: ["https://approved.invalid"],
      transporter: {
        sendMail: async () => ({ accepted: ["recipient@example.test"] }),
      },
      deliveryReady: true,
      from: "site@example.test",
      to: "recipient@example.test",
    },
    async (base) => {
      const config = await fetch(`${base}/api/contact-config`, {
        headers: { Origin: "https://approved.invalid" },
      });
      assert.equal(
        config.headers.get("access-control-allow-origin"),
        "https://approved.invalid",
      );
      assert.equal((await config.json()).enabled, true);
      const result = await post(base, payload, {
        Origin: "https://approved.invalid",
      });
      assert.equal(result.status, 200);
      assert.equal((await result.json()).ok, true);
    },
  ));
test("excessive requests return rate-limit errors without delivery", () =>
  running(
    { rateLimiter: new EnquiryRateLimiter({ limit: 1 }) },
    async (base) => {
      assert.equal((await post(base, payload)).status, 503);
      const result = await post(base, payload);
      assert.equal(result.status, 429);
      assert.equal(result.headers.get("retry-after"), "900");
    },
  ));
test("unknown API paths remain JSON 404 responses", () =>
  running({}, async (base) => {
    const result = await fetch(`${base}/api/missing`);
    assert.equal(result.status, 404);
    assert.match(result.headers.get("content-type"), /application\/json/);
    assert.equal((await result.json()).ok, false);
  }));
