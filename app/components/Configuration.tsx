"use client";

import Image from "next/image";
import { useState } from "react";
import { CONFIGURATION_ROWS, UNIT_PLANS } from "../data/site";
import { useModal } from "./ModalProvider";
import { IconArrowCircleRight } from "./Icons";

type TabKey = keyof typeof UNIT_PLANS;

const TABS = Object.keys(UNIT_PLANS) as TabKey[];

export default function Configuration() {
  const { openEnquiry } = useModal();
  const [active, setActive] = useState<TabKey>("1BHK");

  return (
    <section className="section section--light" id="configuration">
      <div className="container">
        <div className="rule-heading">
          <span>CONFIGURATION</span>
        </div>

        {/* Prices stay blurred until the visitor enquires — as on the original. */}
        <div className="table-wrapper">
          <table className="property-table">
            <thead>
              <tr>
                <th>CATEGORY</th>
                <th>CARPET RANGE (SQ.FT)</th>
                <th>SOURCING AV (₹ CR.)</th>
              </tr>
            </thead>
            <tbody>
              {CONFIGURATION_ROWS.map((row) => (
                <tr key={row.category}>
                  <td className="category">{row.category}</td>
                  <td>{row.carpet}</td>
                  <td className="price-cell">
                    <span className="price price-blur">{row.price}</span>
                    <button
                      type="button"
                      className="enquire-btn"
                      onClick={() =>
                        openEnquiry(`Configuration — ${row.category}`)
                      }
                    >
                      ENQUIRE NOW
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="gradient-rule" style={{ marginBlock: 40 }} />

        <div className="rule-heading">
          <span>UNIT PLAN</span>
        </div>

        <div className="tabs__list" role="tablist" aria-label="Unit plans">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              id={`tab-${tab}`}
              aria-selected={active === tab}
              aria-controls={`panel-${tab}`}
              className="tabs__tab"
              onClick={() => setActive(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div
          className="tabs__panel"
          role="tabpanel"
          id={`panel-${active}`}
          aria-labelledby={`tab-${active}`}
        >
          {UNIT_PLANS[active].map((plan) => (
            <article className="plan-card" key={plan.title}>
              <Image
                className="plan-card__image"
                src={plan.image}
                alt={plan.title}
                width={627}
                height={430}
                sizes="(max-width: 767px) 100vw, 32vw"
              />
              <div className="plan-card__overlay">
                <h2 className="plan-card__title">{plan.title}</h2>
                <button
                  type="button"
                  className="button"
                  onClick={() => openEnquiry(`Unit Plan — ${plan.title}`)}
                >
                  Book Site Visit
                  <IconArrowCircleRight className="icon" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
