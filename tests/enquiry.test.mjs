import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizeEnquiry,
  validateEnquiry,
  formatEnquiry,
} from "../shared/enquiry.mjs";
import { deliverEnquiry, EnquiryRateLimiter } from "../server/contact.mjs";
const valid = {
  name: "Test Sender",
  email: "sender@example.test",
  organisation: "Test Organisation",
  phone: "",
  type: "General enquiry",
  message:
    "Please discuss this resource opportunity and its available information.",
  website: "",
  consent: true,
};
test("valid enquiries are trimmed without losing multiline information", () => {
  const value = normalizeEnquiry({
    ...valid,
    name: "  Test Sender  ",
    message:
      "  Line one describes the resource.\nLine two describes the requirement.  ",
  });
  assert.equal(value.name, "Test Sender");
  assert.equal(
    value.message,
    "Line one describes the resource.\nLine two describes the requirement.",
  );
  assert.deepEqual(validateEnquiry(value), {});
  assert(formatEnquiry(value).includes(value.message));
});
test("missing or malformed input cannot pass required validation", () => {
  for (const value of [
    null,
    [],
    {},
    "payload",
    { ...valid, email: "invalid" },
    { ...valid, consent: "true" },
  ])
    assert(Object.keys(validateEnquiry(value)).length > 0);
});
test("oversized input, unknown categories and header injection are rejected", () => {
  for (const value of [
    { ...valid, name: "A".repeat(101) },
    { ...valid, message: "a".repeat(8001) },
    { ...valid, type: "Injected category" },
    { ...valid, name: "Sender\nBcc: victim@example.test" },
    { ...valid, email: "sender@example.test\r\nBcc: other@example.test" },
  ])
    assert(Object.keys(validateEnquiry(value)).length > 0);
});
test("honeypot and missing consent prevent delivery", async () => {
  let called = false;
  const transporter = {
    sendMail: async () => {
      called = true;
      return { accepted: ["recipient@example.test"] };
    },
  };
  for (const input of [
    { ...valid, website: "bot.invalid" },
    { ...valid, consent: false },
  ]) {
    const result = await deliverEnquiry({
      input,
      transporter,
      from: "site@example.test",
      to: "recipient@example.test",
    });
    assert.equal(result.status, 422);
  }
  assert.equal(called, false);
});
test("unconfigured delivery returns unavailable instead of a false success", async () => {
  const result = await deliverEnquiry({
    input: valid,
    transporter: null,
    from: "",
    to: "",
  });
  assert.equal(result.status, 503);
  assert.equal(result.body.ok, false);
  assert.equal(result.body.reference, undefined);
});
test("SMTP rejection and failure never produce a success receipt", async () => {
  for (const transporter of [
    {
      sendMail: async () => ({
        accepted: [],
        rejected: ["recipient@example.test"],
      }),
    },
    {
      sendMail: async () => {
        throw new Error("private SMTP configuration");
      },
    },
  ]) {
    const result = await deliverEnquiry({
      input: valid,
      transporter,
      from: "site@example.test",
      to: "recipient@example.test",
    });
    assert.equal(result.status, 502);
    assert.equal(result.body.ok, false);
    assert(!JSON.stringify(result).includes("private SMTP"));
  }
});
test("accepted transport uses fixed recipients and only validated enquiry fields", async () => {
  let mail;
  const result = await deliverEnquiry({
    input: {
      ...valid,
      to: "attacker@example.test",
      raw: { path: "/private/file" },
    },
    transporter: {
      sendMail: async (message) => {
        mail = message;
        return { accepted: ["recipient@example.test"] };
      },
    },
    from: "site@example.test",
    to: "recipient@example.test",
  });
  assert.equal(result.status, 200);
  assert.equal(result.body.ok, true);
  assert.match(result.body.reference, /^[0-9a-f-]{36}$/);
  assert.equal(mail.to, "recipient@example.test");
  assert.equal(mail.replyTo, valid.email);
  assert.equal(mail.raw, undefined);
  assert.equal(mail.disableFileAccess, true);
  assert.equal(mail.disableUrlAccess, true);
  assert(mail.text.includes(result.body.reference));
});
test("rate limiting separates clients and expires after its configured window", () => {
  let now = 0;
  const limiter = new EnquiryRateLimiter({
    limit: 2,
    windowMs: 100,
    now: () => now,
  });
  assert(limiter.allow("a"));
  assert(limiter.allow("a"));
  assert.equal(limiter.allow("a"), false);
  assert(limiter.allow("b"));
  now = 101;
  assert(limiter.allow("a"));
});
