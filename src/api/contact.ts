import type { EnquiryPayload } from "../../shared/enquiry.mjs";
const base = (import.meta.env.VITE_API_BASE ?? "").replace(/\/$/, "");
export async function getContactConfig(
  signal?: AbortSignal,
): Promise<{ enabled: boolean }> {
  const response = await fetch(`${base}/api/contact-config`, { signal });
  if (!response.ok) throw new Error("Enquiry delivery is unavailable.");
  const data: unknown = await response.json();
  return {
    enabled:
      typeof data === "object" &&
      data !== null &&
      "enabled" in data &&
      data.enabled === true,
  };
}
export async function submitContact(
  payload: EnquiryPayload,
): Promise<{ reference: string }> {
  const response = await fetch(`${base}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(25000),
  });
  const data = (await response.json().catch(() => ({}))) as {
    ok?: boolean;
    reference?: string;
    error?: string;
  };
  if (!response.ok || data.ok !== true || typeof data.reference !== "string")
    throw new Error(
      data.error ||
        "Your enquiry could not be sent. Try again or download your enquiry.",
    );
  return { reference: data.reference };
}
