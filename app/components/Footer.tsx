"use client";

import Image from "next/image";
import { CONTACT, DISCLAIMER, WHATSAPP_TEXT } from "../data/site";
import { useModal } from "./ModalProvider";
import {
  IconEnvelope,
  IconMapMarker,
  IconPhoneSquare,
  IconWhatsappSquare,
} from "./Icons";

export default function Footer() {
  const { openTerms, openPrivacy } = useModal();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="rule-heading rule-heading--cream">
          <span>PROJECT BY</span>
        </div>

        <div className="footer__logo">
          <Image
            src="/images/prabhav-since-2000-white.png"
            alt="Prabhav Construction — since 2000"
            width={1600}
            height={900}
            sizes="(max-width: 767px) 250px, 30vw"
          />
        </div>

        <div className="footer__consultants">
          <div className="footer__consultant">
            <p>DESIGNING ARCHITECT</p>
            <h3>MAYUREE CONSULTANTS</h3>
          </div>
          <div className="footer__consultant">
            <p>RCC CONSULTANT</p>
            <h3>SHRAVANI CONSULTANTS</h3>
          </div>
        </div>

        {/* Contacts and the RERA block share one row on desktop, as on the
            original: large phone numbers left, a fixed 248px reach column,
            then the MahaRERA notice and QR. */}
        <div className="footer__contacts">
          <ul className="footer__phones">
            <li>
              <IconPhoneSquare />
              <a href={`tel:+91${CONTACT.phonePrimary}`}>
                +91 {CONTACT.phonePrimary}
              </a>
            </li>
            <li>
              <IconWhatsappSquare />
              <a
                href={`https://wa.me/91${CONTACT.phoneSecondary}?text=${WHATSAPP_TEXT}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                +91 {CONTACT.phoneSecondary}
              </a>
            </li>
          </ul>

          <ul className="footer__reach">
            <li>
              <IconEnvelope />
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li>
              <IconMapMarker />
              {CONTACT.addressUpper}
            </li>
          </ul>
        </div>

        <div className="footer__rera">
          <div className="footer__rera-logo">
            <Image
              src="/images/maharera-logo.png"
              alt="MahaRERA"
              width={1600}
              height={1600}
              sizes="65px"
            />
          </div>

          <div className="footer__rera-text">
            <p>
              This project CODE NAME CROWN has been registered under MahaRERA
              registration number
            </p>
            <h2>{CONTACT.rera}</h2>
            <h6>
              Available on the website{" "}
              <a
                href="https://maharera.maharashtra.gov.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                maharera.maharashtra.gov.in
              </a>
              .
            </h6>
          </div>

          <div className="footer__barcode">
            <Image
              src="/images/RERA BARCODE.png"
              alt="MahaRERA registration QR code"
              width={300}
              height={300}
              sizes="80px"
            />
          </div>
        </div>

        <p className="footer__disclaimer">{DISCLAIMER}</p>

        <div className="footer__bottom">
          <p>© 2026 Code Name Crown. All rights reserved.</p>

          <div className="footer__legal-links">
            <button type="button" onClick={openPrivacy}>
              Privacy Policy
            </button>
            <button type="button" onClick={openTerms}>
              Terms &amp; Conditions
            </button>
          </div>

          <p className="footer__credit">
            <a
              href="https://synovative.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              Design And Developed BY : SYNOVATIVE
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
