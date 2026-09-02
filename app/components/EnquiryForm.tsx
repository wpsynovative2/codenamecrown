"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import {
  EnquiryErrors,
  EnquiryValues,
  INITIAL_VALUES,
  validate,
} from "../lib/validation";
import { getRecaptchaToken } from "../lib/recaptcha";
import { currentDateTime, currentUrl, submitEnquiry } from "../lib/submit";
import { useModal } from "./ModalProvider";

type Status = "idle" | "submitting" | "success" | "error";

type EnquiryFormProps = {
  /** Label of the button that opened this form — stored alongside the lead. */
  source: string;
  onSuccess?: () => void;
};

export default function EnquiryForm({ source, onSuccess }: EnquiryFormProps) {
  const uid = useId();
  const router = useRouter();
  const { openTerms, openPrivacy } = useModal();

  const [values, setValues] = useState<EnquiryValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // Snapshot of the hidden fields, shown read-only exactly like the original.
  const [submittedAt] = useState(() => currentDateTime());
  const [pageUrl] = useState(() => currentUrl());

  // The redirect should feel instant, so warm the route while they type.
  useEffect(() => {
    router.prefetch("/thank-you");
  }, [router]);

  /**
   * Shared success path for a real submission and a honeypot hit — a bot must
   * not be able to tell the two apart.
   *
   * The dialog is closed first: ModalProvider lives in the root layout, so its
   * state survives the navigation and the dialog would otherwise still be
   * sitting open on top of the thank-you page.
   */
  const goToThankYou = () => {
    onSuccess?.();
    router.push("/thank-you");
  };

  const setField = <K extends keyof EnquiryValues>(
    key: K,
    value: EnquiryValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("idle");
      return;
    }

    // Honeypot: a filled field means a bot. Feign success and drop the lead.
    if (values.website.trim() !== "") {
      setStatus("success");
      setStatusMessage("Thank you! Our property expert will contact you shortly.");
      goToThankYou();
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    try {
      const recaptchaToken = await getRecaptchaToken("enquiry_form");

      await submitEnquiry({
        ...values,
        recaptchaToken,
        submittedAt,
        pageUrl: pageUrl || currentUrl(),
        source,
      });

      setStatus("success");
      setStatusMessage("Thank you! Our property expert will contact you shortly.");
      setValues(INITIAL_VALUES);
      goToThankYou();
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again or call us directly."
      );
    }
  };

  const fieldClass = (key: keyof EnquiryValues, extra: string) =>
    `field ${extra}${errors[key] ? " field--error" : ""}`;

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      {statusMessage && (
        <p
          className={`form__status form__status--${
            status === "success" ? "ok" : "error"
          }`}
          role="status"
        >
          {statusMessage}
        </p>
      )}

      <div className={fieldClass("name", "field--half")}>
        <label htmlFor={`${uid}-name`}>
          Full Name<span className="field__required">*</span>
        </label>
        <input
          id={`${uid}-name`}
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Full Name"
          value={values.name}
          onChange={(e) => setField("name", e.target.value)}
          aria-invalid={Boolean(errors.name)}
          required
        />
        {errors.name && <p className="field__error">{errors.name}</p>}
      </div>

      <div className={fieldClass("phone", "field--half")}>
        <label htmlFor={`${uid}-phone`}>
          Contact no<span className="field__required">*</span>
        </label>
        <input
          id={`${uid}-phone`}
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          maxLength={16}
          placeholder="Enter a valid number"
          value={values.phone}
          onChange={(e) => setField("phone", e.target.value)}
          aria-invalid={Boolean(errors.phone)}
          required
        />
        {errors.phone && <p className="field__error">{errors.phone}</p>}
      </div>

      <div className={fieldClass("email", "field--half")}>
        <label htmlFor={`${uid}-email`}>Email Address</label>
        <input
          id={`${uid}-email`}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="your@gmail.com"
          value={values.email}
          onChange={(e) => setField("email", e.target.value)}
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email && <p className="field__error">{errors.email}</p>}
      </div>

      <div className={fieldClass("interestedIn", "field--half")}>
        <label htmlFor={`${uid}-interest`}>Interested In</label>
        <select
          id={`${uid}-interest`}
          name="interestedIn"
          value={values.interestedIn}
          onChange={(e) => setField("interestedIn", e.target.value)}
        >
          <option value="1BHK">1BHK</option>
          <option value="2BHK">2BHK</option>
          <option value="3BHK">3BHK</option>
        </select>
        {errors.interestedIn && (
          <p className="field__error">{errors.interestedIn}</p>
        )}
      </div>

      <div className={fieldClass("message", "field--full")}>
        <label htmlFor={`${uid}-message`}>Message (optional)</label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={4}
          placeholder="Type your query here......"
          value={values.message}
          onChange={(e) => setField("message", e.target.value)}
        />
        {errors.message && <p className="field__error">{errors.message}</p>}
      </div>

      <div className={fieldClass("consent", "field--full field--consent")}>
        <input
          id={`${uid}-consent`}
          name="consent"
          type="checkbox"
          checked={values.consent}
          onChange={(e) => setField("consent", e.target.checked)}
          aria-invalid={Boolean(errors.consent)}
        />
        <label htmlFor={`${uid}-consent`}>
          I agree to be contacted by Code Name Crown and their partners via
          WhatsApp, SMS, Phone, Email etc.
        </label>
      </div>
      {errors.consent && (
        <p className="field__error" style={{ paddingInline: 10 }}>
          {errors.consent}
        </p>
      )}

      {/*
        Honeypot. Hidden from people via off-screen positioning (not
        display:none, which many bots detect and skip) and from assistive tech
        via aria-hidden. Any value here marks the submission as spam.
      */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor={`${uid}-website`}>Leave this field empty</label>
        <input
          id={`${uid}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => setField("website", e.target.value)}
        />
      </div>

      {/* Hidden metadata — captured automatically, never shown to the visitor. */}
      <input type="hidden" name="submittedAt" value={submittedAt} readOnly />
      <input type="hidden" name="pageUrl" value={pageUrl} readOnly />
      <input type="hidden" name="source" value={source} readOnly />

      <div className="field field--full">
        <button
          type="submit"
          className="form__submit"
          /* Stays disabled through "success" too, so the redirect can't be
             raced by a second click. */
          disabled={status === "submitting" || status === "success"}
        >
          {status === "submitting" ? "Sending…" : "Send Enquiry"}
        </button>
      </div>

      <p className="form__legal">
        This site is protected by reCAPTCHA. By submitting you accept our{" "}
        <button type="button" onClick={openPrivacy}>
          Privacy Policy
        </button>{" "}
        and{" "}
        <button type="button" onClick={openTerms}>
          Terms &amp; Conditions
        </button>
        .
      </p>
    </form>
  );
}
