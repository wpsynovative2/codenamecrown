import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CONTACT, WHATSAPP_TEXT } from "../data/site";
import {
  IconArrowCircleRight,
  IconEnvelope,
  IconPhone,
  IconWhatsapp,
} from "../components/Icons";

export const metadata: Metadata = {
  title: "Thank You — Codename Crown | Prabhav Construction",
  description:
    "Your enquiry has been received. Our property expert will contact you shortly with pricing, availability, project details and site visit options.",
  // A confirmation page reached only after submitting has no business in search
  // results, and indexing it would let people land here without enquiring.
  robots: { index: false, follow: false },
};

/**
 * Deliberately standalone — no header, footer or sticky bar. Nothing competes
 * with the confirmation, and there is no nav to pull the visitor back into
 * browsing before the callback lands.
 */
export default function ThankYou() {
  return (
    <main className="section section--light thanks">
      <div className="container thanks__inner">
        <Link className="thanks__logo" href="/#top" aria-label="Codename Crown home">
          <Image
            src="/images/codename-crown-logo.png"
            alt="Codename Crown"
            width={1107}
            height={557}
            priority
          />
        </Link>

        <span className="thanks__badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              d="M4 12.5 9.5 18 20 7"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <div className="rule-heading thanks__rule">
          <span>THANK YOU</span>
        </div>

        <p className="thanks__lead">Your enquiry has been received.</p>

        <p className="thanks__text">
          One of our property experts will call you shortly with the latest
          pricing, availability, floor plans and site visit options for Codename
          Crown, 90ft Road, Mulund East.
        </p>

        <div className="thanks__actions">
          <Link className="button" href="/#top">
            Back to Home
            <IconArrowCircleRight className="icon" />
          </Link>

          <a
            className="button button--ghost"
            href={`https://wa.me/${CONTACT.whatsapp}?text=${WHATSAPP_TEXT}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat on WhatsApp
            <IconWhatsapp className="icon" />
          </a>
        </div>

        <div className="thanks__contact">
          <p className="thanks__contact-label">
            Would rather not wait? Reach us directly.
          </p>

          <ul className="thanks__contact-list">
            <li>
              <IconPhone />
              <a href={`tel:+91${CONTACT.phonePrimary}`}>
                +91 {CONTACT.phonePrimary}
              </a>
            </li>
            <li>
              <IconEnvelope />
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
          </ul>
        </div>

        <p className="thanks__rera">MahaRERA: {CONTACT.rera}</p>
      </div>
    </main>
  );
}
