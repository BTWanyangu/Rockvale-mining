import { randomUUID } from "node:crypto";
import {
  normalizeEnquiry,
  validateEnquiry,
  formatEnquiry,
} from "../shared/enquiry.mjs";
export class EnquiryRateLimiter {
  constructor({ limit = 6, windowMs = 15 * 60 * 1000, now = Date.now } = {}) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.now = now;
    this.entries = new Map();
  }
  allow(key) {
    const now = this.now();
    for (const [entry, value] of this.entries)
      if (value.expires <= now) this.entries.delete(entry);
    const current = this.entries.get(key);
    if (current && current.count >= this.limit) return false;
    if (!current && this.entries.size >= 10000) return false;
    this.entries.set(key, {
      count: (current?.count ?? 0) + 1,
      expires: current?.expires ?? now + this.windowMs,
    });
    return true;
  }
}
export async function deliverEnquiry({ input, transporter, from, to }) {
  const errors = validateEnquiry(input);
  if (Object.keys(errors).length)
    return {
      status: 422,
      body: {
        ok: false,
        error: "Check the enquiry details and try again.",
        errors,
      },
    };
  if (!transporter || !from || !to)
    return {
      status: 503,
      body: {
        ok: false,
        error:
          "Enquiry email delivery is unavailable. Download a copy of your enquiry.",
      },
    };
  const value = normalizeEnquiry(input);
  const reference = randomUUID();
  try {
    const result = await transporter.sendMail({
      from,
      to,
      replyTo: value.email,
      subject: `RockValle enquiry: ${value.type} [${reference}]`,
      text: `${formatEnquiry(value)}\n\nReference: ${reference}`,
      disableFileAccess: true,
      disableUrlAccess: true,
    });
    if (!Array.isArray(result.accepted) || result.accepted.length === 0)
      return {
        status: 502,
        body: {
          ok: false,
          error:
            "The email service did not accept the enquiry. Please try again or download a copy.",
        },
      };
    return { status: 200, body: { ok: true, reference } };
  } catch {
    return {
      status: 502,
      body: {
        ok: false,
        error:
          "The enquiry could not be sent. Please try again or download a copy.",
      },
    };
  }
}
