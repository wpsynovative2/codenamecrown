import { EnquiryValues, normalizeIndianMobile } from "./validation";

/**
 * Leads are posted straight to a Google Apps Script Web App, which appends a
 * row to the Google Sheet. No self-hosted backend is involved.
 *
 * The request is sent as `text/plain` so the browser treats it as a simple
 * request and skips the CORS preflight that Apps Script cannot answer.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_SHEET_ENDPOINT ?? "";

export type SubmitPayload = EnquiryValues & {
  recaptchaToken: string;
  /** Hidden field — submission timestamp, IST. */
  submittedAt: string;
  /** Hidden field — the page the enquiry came from. */
  pageUrl: string;
  /** Which button opened the form, useful for attributing the lead. */
  source: string;
};

/** Formats a date the way the original `[current_datetime]` shortcode did. */
export function currentDateTime(date = new Date()): string {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

export function currentUrl(): string {
  return typeof window === "undefined" ? "" : window.location.href;
}

export function isSheetConfigured(): boolean {
  return ENDPOINT.length > 0;
}

export async function submitEnquiry(payload: SubmitPayload): Promise<void> {
  if (!isSheetConfigured()) {
    throw new Error(
      "Form endpoint is not configured. Set NEXT_PUBLIC_SHEET_ENDPOINT in .env.local."
    );
  }

  const body = {
    name: payload.name.trim(),
    phone: normalizeIndianMobile(payload.phone),
    email: payload.email.trim(),
    interestedIn: payload.interestedIn,
    message: payload.message.trim(),
    consent: payload.consent ? "Yes" : "No",
    submittedAt: payload.submittedAt,
    pageUrl: payload.pageUrl,
    source: payload.source,
    website: payload.website, // honeypot, checked server-side too
    recaptchaToken: payload.recaptchaToken,
  };

  const response = await fetch(ENDPOINT, {
    method: "POST",
    // text/plain keeps this a CORS "simple request" — no preflight.
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(body),
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`Submission failed (${response.status})`);
  }

  const result = await response.json().catch(() => null);
  if (result && result.ok === false) {
    throw new Error(result.error || "Submission was rejected.");
  }
}
