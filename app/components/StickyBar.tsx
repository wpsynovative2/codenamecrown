"use client";

import { CONTACT } from "../data/site";
import { useModal } from "./ModalProvider";
import { IconDownload, IconPhone, IconWhatsapp } from "./Icons";

/** Fixed action bar — mobile only, matching the original's hidden-desktop rule. */
export default function StickyBar() {
  const { openEnquiry } = useModal();

  return (
    <div className="sticky-bar">
      <a
        className="sticky-bar__item"
        href={`https://wa.me/${CONTACT.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconWhatsapp />
        Whatsapp
      </a>

      {/* The brochure is gated behind the enquiry form. */}
      <button
        type="button"
        className="sticky-bar__item"
        onClick={() => openEnquiry("Sticky bar — Brochure")}
      >
        <IconDownload />
        Brochure
      </button>

      <a className="sticky-bar__item" href={`tel:+91${CONTACT.phonePrimary}`}>
        <IconPhone />
        Call us
      </a>
    </div>
  );
}
