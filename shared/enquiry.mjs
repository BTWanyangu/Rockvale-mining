export const ENQUIRY_TYPES = [
  "General enquiry",
  "Exploration & development",
  "Mining & processing",
  "Trading & distribution",
  "Recycling & recovery",
  "Supply & sourcing partnerships",
  "Commodity buying & offtake",
  "Material recovery opportunities",
];
export function normalizeEnquiry(input) {
  const source =
    input && typeof input === "object" && !Array.isArray(input) ? input : {};
  const text = (key) =>
    typeof source[key] === "string" ? source[key].trim() : "";
  return {
    name: text("name"),
    email: text("email"),
    organisation: text("organisation"),
    phone: text("phone"),
    type: text("type"),
    message: text("message"),
    website: text("website"),
    consent: source.consent === true,
  };
}
export function validateEnquiry(input) {
  const value = normalizeEnquiry(input);
  const errors = {};
  if (
    value.name.length < 2 ||
    value.name.length > 100 ||
    /[\r\n]/.test(value.name)
  )
    errors.name = "Enter your name, using 2 to 100 characters.";
  if (
    value.email.length > 254 ||
    !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value.email)
  )
    errors.email = "Enter a valid email address.";
  if (value.organisation.length > 150 || /[\r\n]/.test(value.organisation))
    errors.organisation = "Use a single line, up to 150 characters.";
  if (value.phone.length > 50 || /[\r\n]/.test(value.phone))
    errors.phone = "Use a single line, up to 50 characters.";
  if (!ENQUIRY_TYPES.includes(value.type))
    errors.type = "Choose an enquiry category.";
  if (value.message.length < 20 || value.message.length > 8000)
    errors.message = "Describe your enquiry using 20 to 8,000 characters.";
  if (!value.consent)
    errors.consent = "Confirm that your details may be used to respond.";
  if (value.website) errors.website = "The enquiry could not be accepted.";
  return errors;
}
export function formatEnquiry(input) {
  const v = normalizeEnquiry(input);
  return [
    "RockValle Resources — business enquiry",
    "",
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    `Organisation: ${v.organisation || "Not provided"}`,
    `Phone: ${v.phone || "Not provided"}`,
    `Category: ${v.type}`,
    "",
    "Message:",
    v.message,
    "",
    "Consent to respond: confirmed",
  ].join("\n");
}
