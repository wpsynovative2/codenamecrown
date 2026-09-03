"use client";

import { useEffect, useRef } from "react";
import { useModal } from "./ModalProvider";

/** How long after load the first prompt appears. */
const DELAY_MS = 3000;
/** How far down the page the second prompt triggers. */
const SCROLL_FRACTION = 0.5;

/**
 * Opens the enquiry form on its own: once 3s after load, and again once the
 * visitor passes halfway down the page. Each trigger fires at most once per
 * page load, so a visitor sees it at most twice.
 *
 * Rendered from the home page only — mounting it in the layout would fire it
 * on /thank-you too, right after someone had already enquired.
 */
export default function AutoEnquiry() {
  const { openEnquiry, isOpen } = useModal();

  // Read the live open-state from the callbacks without listing it as a
  // dependency — re-running the effect would restart the 3s timer every time a
  // dialog opened or closed. Mirrored in an effect rather than during render,
  // which React forbids.
  const openRef = useRef(isOpen);
  useEffect(() => {
    openRef.current = isOpen;
  }, [isOpen]);

  // Guard both triggers with refs rather than effect scope, so even if this
  // effect were ever re-run the timer could not fire a second time.
  const timerFired = useRef(false);
  const scrollFired = useRef(false);

  useEffect(() => {
    const pop = (source: string) => {
      // Never clobber a dialog the visitor opened themselves: re-opening would
      // remount the form and wipe whatever they had typed.
      if (openRef.current) return;
      openEnquiry(source);
    };

    const timer = window.setTimeout(() => {
      if (timerFired.current) return;
      timerFired.current = true;
      pop("Auto — 3s after load");
    }, DELAY_MS);

    const onScroll = () => {
      if (scrollFired.current) return;

      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable < SCROLL_FRACTION) return;

      scrollFired.current = true;
      window.removeEventListener("scroll", onScroll);
      pop("Auto — 50% scrolled");
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [openEnquiry]);

  return null;
}
