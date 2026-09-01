"use client";

import Image from "next/image";
import { useState } from "react";
import { AMENITIES, UTILITIES } from "../data/site";
import { useMediaQuery } from "../lib/useMediaQuery";
import {
  IconChalkboardTeacher,
  IconChevronLeft,
  IconChevronRight,
  IconDoorOpen,
  IconLayerGroup,
  IconTable,
  IconToggleOn,
} from "./Icons";

const UTILITY_ICONS = {
  table: IconTable,
  chalkboardTeacher: IconChalkboardTeacher,
  doorOpen: IconDoorOpen,
  toggleOn: IconToggleOn,
  layerGroup: IconLayerGroup,
} as const;

/** Cards visible at each breakpoint, mirroring the original carousel. */
function usePerView(): number {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  return isMobile ? 1 : isTablet ? 2 : 3;
}

export default function Amenities() {
  const perView = usePerView();
  const [index, setIndex] = useState(0);

  const maxIndex = Math.max(0, AMENITIES.length - perView);

  // Clamp during render so a breakpoint change can never scroll past the end.
  const current = Math.min(index, maxIndex);

  const go = (delta: number) => {
    const next = current + delta;
    setIndex(next < 0 ? maxIndex : next > maxIndex ? 0 : next);
  };

  return (
    <>
      <div className="gradient-rule" />

      <section className="section section--light" id="amenities">
        <div className="container">
          <div className="rule-heading">
            <span>AMENITIES</span>
          </div>

          <p className="amenities__lead">
            From fitness and recreation to work and relaxation, every amenity is
            designed to add more to your everyday life.
          </p>

          <div className="amenity-carousel">
            <div className="amenity-carousel__viewport">
              <div
                className="amenity-carousel__track"
                style={{
                  transform: `translateX(calc(-${current} * (100% + 20px) / ${perView}))`,
                }}
              >
                {AMENITIES.map((amenity) => (
                  <article
                    className="amenity-card rounded-sm"
                    key={amenity.name}
                  >
                    <div className="amenity-card__media">
                      <Image
                        src={amenity.image}
                        alt={amenity.name}
                        width={800}
                        height={800}
                        sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <h3 className="amenity-card__name">{amenity.name}</h3>
                  </article>
                ))}
              </div>
            </div>

            <div className="amenity-carousel__nav">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous amenities"
              >
                <IconChevronLeft />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next amenities"
              >
                <IconChevronRight />
              </button>
            </div>
          </div>

          <div className="rule-heading">
            <span>UTILITIES AMENITIES</span>
          </div>

          <div className="utilities">
            {UTILITIES.map(({ title, icon }) => {
              const Icon = UTILITY_ICONS[icon];
              return (
                <div className="icon-box icon-box--utility" key={title}>
                  <span className="icon-box__icon">
                    <Icon />
                  </span>
                  <h3 className="icon-box__title">{title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
