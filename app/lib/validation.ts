export type EnquiryValues = {
  name: string;
  phone: string;
  email: string;
  interestedIn: string;
  message: string;
  consent: boolean;
  /** Honeypot — must stay empty. */
  website: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

export const INITIAL_VALUES: EnquiryValues = {
  name: "",
  phone: "",
  email: "",
  interestedIn: "1BHK",
  message: "",
  consent: true,
  website: "",
};

/**
 * Reduce user input to the bare 10-digit subscriber number so that
 * "+91 98331 51512", "091-9833151512" and "9833151512" all validate.
 */
export function normalizeIndianMobile(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  if (digits.length === 13 && digits.startsWith("091")) return digits.slice(3);
  return digits;
}

/** Indian mobile numbers are 10 digits and start with 6, 7, 8 or 9. */
export function isValidIndianMobile(raw: string): boolean {
  return /^[6-9]\d{9}$/.test(normalizeIndianMobile(raw));
}

export function isValidEmail(raw: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw.trim());
}

export function validate(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};

  const name = values.name.trim();
  if (!name) {
    errors.name = "Please enter your full name.";
  } else if (name.length < 2) {
    errors.name = "Please enter your full name.";
  } else if (!/^[a-zA-Z\s.'-]+$/.test(name)) {
    errors.name = "Name may only contain letters, spaces, apostrophes and hyphens.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Please enter your contact number.";
  } else if (!isValidIndianMobile(values.phone)) {
    errors.phone = "Enter a valid 10-digit Indian mobile number starting with 6-9.";
  }

  // Email is optional on the original form, but must be well-formed if given.
  if (values.email.trim() && !isValidEmail(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.interestedIn) {
    errors.interestedIn = "Please select a configuration.";
  }

  if (values.message.length > 1000) {
    errors.message = "Please keep your message under 1000 characters.";
  }

  if (!values.consent) {
    errors.consent = "Please accept the consent to be contacted.";
  }

  return errors;
}
