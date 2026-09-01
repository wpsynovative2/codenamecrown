"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "../data/site";
import { useModal } from "./ModalProvider";
import { IconArrowCircleRight, IconMenu } from "./Icons";

export default function Header() {
  const { openEnquiry } = useModal();
  const [open, setOpen] = useState(false);

  // Close the mobile menu once the viewport is wide enough for the full nav.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="header">
      <div className="header__inner">
        <a className="header__logo" href="#top" aria-label="Codename Crown home">
          <Image
            src="/images/codename-crown-logo.png"
            alt="Codename Crown"
            width={1107}
            height={557}
            priority
          />
        </a>

        <div className="header__right">
          <nav
            className={`header__nav${open ? " is-open" : ""}`}
            aria-label="Primary"
          >
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={() => setOpen(false)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="header__toggle"
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            onClick={() => setOpen((v) => !v)}
          >
            <IconMenu />
          </button>

          <button
            type="button"
            className="button"
            onClick={() => openEnquiry("Header — Enquire Now")}
          >
            Enquire Now
            <IconArrowCircleRight className="icon" />
          </button>
        </div>
      </div>
    </header>
  );
}
