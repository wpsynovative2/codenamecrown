"use client";

import { CONTACT, SOCIAL, WHATSAPP_TEXT } from "../data/site";
import EnquiryForm from "./EnquiryForm";
import {
  IconEnvelope,
  IconFacebook,
  IconInstagram,
  IconMapMarker,
  IconPenNib,
  IconPhone,
  IconWhatsapp,
  IconYoutube,
} from "./Icons";

export default function Contact() {
  return (
    <section className="section section--light" id="contact-us">
      <div className="container">
        <div className="rule-heading">
          <span>CONTACT US</span>
        </div>

        <div className="contact__grid">
          <div className="contact__card contact__card--info">
            <h2 className="contact__heading">Codename crown</h2>

            <div className="info-row">
              <span className="info-row__icon">
                <IconMapMarker />
              </span>
              <div>
                <h3 className="info-row__title">Site Address</h3>
                <p className="info-row__body">{CONTACT.address}</p>
              </div>
            </div>

            <div className="info-row">
              <span className="info-row__icon">
                <IconPhone />
              </span>
              <div>
                <h3 className="info-row__title">Call Us</h3>
                <p className="info-row__body">
                  <a href={`tel:+91${CONTACT.phonePrimary}`}>
                    {CONTACT.phonePrimary}
                  </a>
                  {" | "}
                  <a href={`tel:+91${CONTACT.phoneSecondary}`}>
                    {CONTACT.phoneSecondary}
                  </a>
                </p>
              </div>
            </div>

            <div className="info-row">
              <span className="info-row__icon">
                <IconEnvelope />
              </span>
              <div>
                <h3 className="info-row__title">Email</h3>
                <p className="info-row__body">
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </p>
              </div>
            </div>

            <div className="info-row" style={{ borderBottom: "none" }}>
              <span className="info-row__icon">
                <IconPenNib />
              </span>
              <div>
                <h3 className="info-row__title">RERA Registration</h3>
                <p className="info-row__body">
                  {CONTACT.rera} —{" "}
                  <a
                    href="https://maharera.maharashtra.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {CONTACT.reraSite}
                  </a>
                </p>
              </div>
            </div>

            <div className="contact__social">
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Codename Crown on Facebook"
              >
                <IconFacebook />
              </a>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Codename Crown on Instagram"
              >
                <IconInstagram />
              </a>
              <a
                href={SOCIAL.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Codename Crown on YouTube"
              >
                <IconYoutube />
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=${WHATSAPP_TEXT}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
              >
                <IconWhatsapp />
              </a>
            </div>
          </div>

          <div className="contact__card contact__card--form">
            <h2 className="contact__heading">TALK TO US</h2>
            <p className="contact__lead">
              Fill in your details and our property expert will contact you with
              the latest pricing, availability, project details, and site visit
              options.
            </p>
            <EnquiryForm source="Contact section — Talk To Us" />
          </div>
        </div>
      </div>
    </section>
  );
}
