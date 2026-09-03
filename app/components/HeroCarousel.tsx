"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HERO_SLIDES_DESKTOP, HERO_SLIDES_MOBILE } from "../data/site";
import { useMediaQuery } from "../lib/useMediaQuery";
import { IconChevronLeft, IconChevronRight } from "./Icons";

/** 1 slide at a time, infinite, advancing every 3s. Pauses on hover. */
const AUTOPLAY_MS = 3000;

export default function HeroCarousel() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const slides = isMobile ? HERO_SLIDES_MOBILE : HERO_SLIDES_DESKTOP;
  const count = slides.length;

  // Clamp during render rather than resetting from an effect, so swapping
  // breakpoints can never leave the track on a slide that no longer exists.
  const current = index % count;

  useEffect(() => {
    if (paused || count < 2) return;
    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % count),
      AUTOPLAY_MS
    );
    return () => window.clearInterval(timer);
  }, [paused, count]);

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  return (
    <section
      className="hero"
      id="top"
      aria-roledescription="carousel"
      aria-label="Project gallery"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="carousel">
        <div
          className="carousel__track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((src, i) => (
            <figure
              className="carousel__slide"
              key={src}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
            >
              <Image
                src={src}
                alt=""
                width={1920}
                height={1080}
                priority={i === 0}
                sizes="100vw"
              />
            </figure>
          ))}
        </div>

        <button
          type="button"
          className="carousel__btn carousel__btn--prev"
          onClick={() => go(-1)}
          aria-label="Previous slide"
        >
          <IconChevronLeft />
        </button>
        <button
          type="button"
          className="carousel__btn carousel__btn--next"
          onClick={() => go(1)}
          aria-label="Next slide"
        >
          <IconChevronRight />
        </button>
      </div>
    </section>
  );
}
