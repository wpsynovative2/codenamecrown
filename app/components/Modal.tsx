"use client";

import { useEffect, useRef } from "react";
import { IconClose } from "./Icons";

type ModalProps = {
  onClose: () => void;
  labelledBy: string;
  children: React.ReactNode;
};

export default function Modal({ onClose, labelledBy, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape and keep focus inside the dialog.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Move focus into the dialog when it opens.
  useEffect(() => {
    panelRef.current
      ?.querySelector<HTMLElement>(
        'input:not([type="hidden"]):not(.hp-field input), button'
      )
      ?.focus();
  }, []);

  return (
    <div
      className="modal-overlay"
      /* Lenis skips elements marked this way, so the dialog keeps its own
         native scrolling while the page behind it is frozen. */
      data-lenis-prevent
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        ref={panelRef}
      >
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <IconClose />
        </button>
        {children}
      </div>
    </div>
  );
}
