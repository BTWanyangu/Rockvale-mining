import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowUpRight, Download, CheckCircle2 } from "lucide-react";
import {
  ENQUIRY_TYPES,
  normalizeEnquiry,
  validateEnquiry,
  formatEnquiry,
} from "../../../shared/enquiry.mjs";
import type { EnquiryPayload } from "../../../shared/enquiry.mjs";
import { getContactConfig, submitContact } from "../../api/contact";
import Button from "../ui/Button";
export default function ContactFormSection() {
  const [params] = useSearchParams();
  const suggested = params.get("type") ?? "General enquiry";
  const [values, setValues] = useState<EnquiryPayload>({
    name: "",
    email: "",
    organisation: "",
    phone: "",
    type: ENQUIRY_TYPES.includes(suggested) ? suggested : "General enquiry",
    message: "",
    website: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [delivery, setDelivery] = useState<
    "checking" | "available" | "unavailable"
  >("checking");
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState("");
  const [notice, setNotice] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 6000);
    getContactConfig(controller.signal)
      .then((config) =>
        setDelivery(config.enabled ? "available" : "unavailable"),
      )
      .catch(() => setDelivery("unavailable"));
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, []);
  const update = (key: keyof EnquiryPayload, value: string | boolean) => {
    setValues((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => {
      const next = { ...previous };
      delete next[key];
      return next;
    });
    setNotice("");
  };
  const checked = () => {
    const found = validateEnquiry(values);
    setErrors(found);
    const key = Object.keys(found)[0];
    if (key) {
      document.getElementById(`enquiry-${key}`)?.focus();
      return null;
    }
    return normalizeEnquiry(values);
  };
  const send = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const valid = checked();
    if (!valid) return;
    if (delivery !== "available") {
      setNotice(
        "Email delivery is unavailable. Download your prepared enquiry to keep a copy.",
      );
      return;
    }
    setSending(true);
    setNotice("");
    try {
      const result = await submitContact(valid);
      setReference(result.reference);
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : "The enquiry could not be sent.",
      );
    } finally {
      setSending(false);
    }
  };
  const download = () => {
    const valid = checked();
    if (!valid) return;
    const file = new Blob(
      [
        formatEnquiry(valid) +
          "\n\nPrepared locally. This file has not been sent.\n",
      ],
      { type: "text/plain;charset=utf-8" },
    );
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "rockvalle-enquiry.txt";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice(
      "Your prepared enquiry has been downloaded. No email has been sent.",
    );
  };
  const error = (key: string) =>
    errors[key] && (
      <span className="field-error" id={`error-${key}`}>
        {errors[key]}
      </span>
    );
  if (reference)
    return (
      <div className="form-confirmation" role="status">
        <CheckCircle2 size={40} aria-hidden="true" />
        <h2>Your enquiry has been accepted.</h2>
        <p>
          The email service accepted your enquiry for sending. Please keep this
          reference for your records.
        </p>
        <code>{reference}</code>
        <Button
          onClick={() => {
            setReference("");
            setValues({ ...values, message: "" });
          }}
        >
          Prepare another enquiry
        </Button>
      </div>
    );
  return (
    <div className="enquiry-form-panel">
      <span className="eyebrow">Business enquiries</span>
      <h2>Tell us about the opportunity.</h2>
      <p className="form-intro">
        Fields marked * are required. Keep the initial brief concise and avoid
        sensitive personal or commercial records.
      </p>
      <div
        className={`delivery-status ${delivery === "available" ? "ready" : ""}`}
        role="status"
      >
        {delivery === "checking"
          ? "Checking enquiry delivery…"
          : delivery === "available"
            ? "Email delivery is available."
            : "Save your brief with Download enquiry. Online sending is currently unavailable."}
      </div>
      <form onSubmit={send} noValidate>
        <fieldset disabled={sending}>
          <legend className="sr-only">Your contact details and enquiry</legend>
          <div className="form-grid">
            <label htmlFor="enquiry-name">
              Full name *
              <input
                id="enquiry-name"
                autoComplete="name"
                value={values.name}
                onChange={(e) => update("name", e.target.value)}
                maxLength={100}
                required
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "error-name" : undefined}
              />
              {error("name")}
            </label>
            <label htmlFor="enquiry-email">
              Email address *
              <input
                id="enquiry-email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => update("email", e.target.value)}
                maxLength={254}
                required
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "error-email" : undefined}
              />
              {error("email")}
            </label>
            <label htmlFor="enquiry-organisation">
              Organisation
              <input
                id="enquiry-organisation"
                autoComplete="organization"
                value={values.organisation}
                onChange={(e) => update("organisation", e.target.value)}
                maxLength={150}
                aria-invalid={Boolean(errors.organisation)}
                aria-describedby={
                  errors.organisation ? "error-organisation" : undefined
                }
              />
              {error("organisation")}
            </label>
            <label htmlFor="enquiry-phone">
              Phone number
              <input
                id="enquiry-phone"
                type="tel"
                autoComplete="tel"
                value={values.phone}
                onChange={(e) => update("phone", e.target.value)}
                maxLength={50}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "error-phone" : undefined}
              />
              {error("phone")}
            </label>
            <label className="form-full" htmlFor="enquiry-type">
              Enquiry category *
              <select
                id="enquiry-type"
                value={values.type}
                onChange={(e) => update("type", e.target.value)}
                required
                aria-invalid={Boolean(errors.type)}
                aria-describedby={errors.type ? "error-type" : undefined}
              >
                {ENQUIRY_TYPES.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
              {error("type")}
            </label>
            <label className="form-full" htmlFor="enquiry-message">
              Your brief *
              <textarea
                id="enquiry-message"
                rows={6}
                value={values.message}
                onChange={(e) => update("message", e.target.value)}
                minLength={20}
                maxLength={8000}
                required
                placeholder="Describe the material or opportunity, the available information, the location and your objective."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? "error-message" : "message-hint"
                }
              />
              {error("message")}
              <small id="message-hint">
                20–8,000 characters. {values.message.length.toLocaleString()}{" "}
                entered.
              </small>
            </label>
          </div>
          <div className="form-honeypot" aria-hidden="true">
            <label htmlFor="enquiry-website">
              Leave this field empty
              <input
                id="enquiry-website"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={(e) => update("website", e.target.value)}
              />
            </label>
          </div>
          <label className="consent-label" htmlFor="enquiry-consent">
            <input
              id="enquiry-consent"
              type="checkbox"
              checked={values.consent}
              onChange={(e) => update("consent", e.target.checked)}
              required
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? "error-consent" : undefined}
            />
            <span>
              I agree that my details may be used to respond to this enquiry.
              Read the <Link to="/privacy">privacy information</Link>. *
            </span>
          </label>
          {error("consent")}
          <div className="form-actions">
            <Button
              type="submit"
              disabled={delivery !== "available" || sending}
            >
              {sending ? "Sending enquiry…" : "Send enquiry"}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Button>
            <Button variant="gold" onClick={download}>
              <Download size={17} aria-hidden="true" />
              Download enquiry
            </Button>
          </div>
        </fieldset>
        {notice && (
          <p className="form-notice" role="status">
            {notice}
          </p>
        )}
      </form>
    </div>
  );
}
