/**
 * reCAPTCHA v3 — loaded lazily on the client.
 *
 * The site key is public by design. The *secret* key never touches this app:
 * verification happens inside the Google Apps Script that receives the form,
 * which keeps the whole stack free of a self-hosted backend.
 */

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

let loader: Promise<void> | null = null;

export function isRecaptchaConfigured(): boolean {
  return SITE_KEY.length > 0;
}

function loadScript(): Promise<void> {
  if (loader) return loader;

  loader = new Promise<void>((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("reCAPTCHA can only load in the browser"));
      return;
    }
    if (window.grecaptcha) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loader = null; // allow a retry on the next submit
      reject(new Error("Failed to load reCAPTCHA"));
    };
    document.head.appendChild(script);
  });

  return loader;
}

/**
 * Returns a fresh v3 token, or an empty string when no site key is configured
 * so local development works without credentials.
 */
export async function getRecaptchaToken(action = "enquiry_form"): Promise<string> {
  if (!isRecaptchaConfigured()) return "";

  await loadScript();

  const grecaptcha = window.grecaptcha;
  if (!grecaptcha) throw new Error("reCAPTCHA unavailable");

  return new Promise<string>((resolve, reject) => {
    grecaptcha.ready(() => {
      grecaptcha.execute(SITE_KEY, { action }).then(resolve, reject);
    });
  });
}
