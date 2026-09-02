"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";

/**
 * Routes same-page hash links through Lenis instead of the browser's instant
 * jump.
 *
 * Lenis ships an `anchors` option, but it never calls preventDefault, so the
 * browser's own jump would race the animation. Handling the clicks here avoids
 * that. No offset is passed: every target is a `section[id]`, and Lenis already
 * subtracts their `scroll-margin-top` — which tracks the header height across
 * breakpoints on its own.
 */
function AnchorLinks() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onClick = (event: MouseEvent) => {
      // Leave modified clicks alone — they open tabs/windows.
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const link = (event.target as Element | null)?.closest?.("a");
      if (!(link instanceof HTMLAnchorElement)) return;
      if (link.target && link.target !== "_self") return;

      const url = new URL(link.href, window.location.href);
      const here = new URL(window.location.href);
      const samePage =
        url.origin === here.origin && url.pathname === here.pathname;
      if (!samePage || !url.hash) return;

      const target = document.querySelector(url.hash);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, {
        // Honour the OS setting: jump rather than glide.
        immediate: lenis.prefersReducedMotion,
      });
      // Native anchors push a history entry, so keep Back working the same way.
      history.pushState(null, "", url.hash);
    };

    // Going back would otherwise leave Lenis holding its old target, which it
    // reapplies on the next frame and undoes the browser's scroll restoration.
    // popstate fires after that restoration, so window.scrollY is the value to
    // adopt here.
    const onPopState = () => {
      const restored = window.scrollY;
      const target = window.location.hash
        ? document.querySelector(window.location.hash)
        : null;

      lenis.scrollTo(target ? (target as HTMLElement) : restored, {
        immediate: true,
        force: true,
      });
    };

    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPopState);
    };
  }, [lenis]);

  return null;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        /* Touch is deliberately left native: syncTouch fights mobile browsers'
           address-bar collapse and their own momentum physics. */
        syncTouch: false,
      }}
    >
      <AnchorLinks />
      {children}
    </ReactLenis>
  );
}
