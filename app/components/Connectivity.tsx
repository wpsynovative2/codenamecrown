import Image from "next/image";
import { CONNECTIVITY } from "../data/site";
import {
  IconArrowRight,
  IconGraduationCap,
  IconShoppingBag,
  IconStethoscope,
  IconTrain,
} from "./Icons";

/** Same order and glyphs as the original icon-list headings. */
const CATEGORY_ICONS = [
  IconTrain,
  IconGraduationCap,
  IconStethoscope,
  IconShoppingBag,
];

export default function Connectivity() {
  return (
    <section className="section section--light" id="connectivity">
      <div className="container">
        <div className="rule-heading">
          <span>CONNECTIVITY</span>
        </div>

        <div className="connectivity__map">
          <Image
            src="/images/Prabhav Pride Map.jpeg"
            alt="Map showing Codename Crown's location and nearby landmarks"
            width={4963}
            height={3508}
            sizes="100vw"
          />
        </div>

        <div className="connectivity__grid">
          {CONNECTIVITY.map((group, i) => {
            const Icon = CATEGORY_ICONS[i] ?? IconTrain;
            return (
              <div className="poi-card" key={group.title}>
                <h3 className="poi-card__title">
                  <Icon />
                  {group.title}
                </h3>
                <ul className="poi-card__list">
                  {group.items.map(([place, time]) => (
                    <li key={place}>
                      <IconArrowRight />
                      {place}
                      <span>{time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
