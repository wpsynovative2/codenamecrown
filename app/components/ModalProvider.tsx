"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLenis } from "lenis/react";
import Modal from "./Modal";
import EnquiryForm from "./EnquiryForm";
import { PRIVACY, TERMS } from "../data/site";

type ModalKind = "enquiry" | "terms" | "privacy" | null;

type ModalContextValue = {
  /** Opens the enquiry form. `source` records which button was clicked. */
  openEnquiry: (source: string) => void;
  openTerms: () => void;
  openPrivacy: () => void;
  close: () => void;
  /** True while any dialog is on screen. */
  isOpen: boolean;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal(): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside <ModalProvider>");
  return ctx;
}

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [kind, setKind] = useState<ModalKind>(null);
  const [source, setSource] = useState("Enquire Now");
  const lenis = useLenis();

  // These stay referentially stable on purpose: `value` has to change whenever
  // `kind` does (for isOpen), and consumers that key effects off a callback —
  // AutoEnquiry's timer — must not be torn down every time a dialog opens.
  const close = useCallback(() => setKind(null), []);
  const openEnquiry = useCallback((from: string) => {
    setSource(from);
    setKind("enquiry");
  }, []);
  const openTerms = useCallback(() => setKind("terms"), []);
  const openPrivacy = useCallback(() => setKind("privacy"), []);

  const value = useMemo<ModalContextValue>(
    () => ({
      openEnquiry,
      openTerms,
      openPrivacy,
      close,
      isOpen: kind !== null,
    }),
    [openEnquiry, openTerms, openPrivacy, close, kind]
  );

  // Lock body scroll while any modal is open. Lenis consumes wheel and touch
  // events itself, so stopping it is what actually freezes the page behind the
  // dialog; the overflow lock still covers keyboard and scrollbar dragging.
  // The dialog carries data-lenis-prevent, which Lenis honours even when
  // stopped, so its own content stays scrollable.
  useEffect(() => {
    if (!kind) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      document.body.style.overflow = previous;
      lenis?.start();
    };
  }, [kind, lenis]);

  return (
    <ModalContext.Provider value={value}>
      {children}

      {kind === "enquiry" && (
        <Modal onClose={close} labelledBy="enquiry-title">
          <h2 className="modal__title" id="enquiry-title">
            TALK TO US
          </h2>
          <p className="modal__intro">
            Fill in your details and our property expert will contact you with the
            latest pricing, availability, project details, and site visit options.
          </p>
          <EnquiryForm source={source} onSuccess={close} />
        </Modal>
      )}

      {kind === "terms" && (
        <Modal onClose={close} labelledBy="terms-title">
          <h2 className="modal__title" id="terms-title">
            {TERMS.title}
          </h2>
          <p className="modal__intro">{TERMS.intro}</p>
          <ul className="legal-list">
            {TERMS.points.map((point) => (
              <li key={point}>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="modal__actions">
            <button type="button" className="button" onClick={close}>
              Accept &amp; Continue
            </button>
          </div>
        </Modal>
      )}

      {kind === "privacy" && (
        <Modal onClose={close} labelledBy="privacy-title">
          <h2 className="modal__title" id="privacy-title">
            {PRIVACY.title}
          </h2>
          <p className="modal__intro">{PRIVACY.intro}</p>
          <ul className="legal-list">
            {PRIVACY.points.map((point) => (
              <li key={point}>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className="modal__intro">{PRIVACY.outro}</p>
          <div className="modal__actions">
            <button type="button" className="button" onClick={close}>
              Accept &amp; Continue
            </button>
          </div>
        </Modal>
      )}
    </ModalContext.Provider>
  );
}
