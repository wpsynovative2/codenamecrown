import { HIGHLIGHTS } from "../data/site";
import {
  IconArrowsAltV,
  IconBuilding,
  IconCloudSun,
  IconCompass,
  IconLink,
  IconMapMarker,
  IconRulerCombined,
  IconStore,
  IconSwimmer,
  IconToriiGate,
} from "./Icons";

const ICONS = {
  building: IconBuilding,
  toriiGate: IconToriiGate,
  cloudSun: IconCloudSun,
  mapMarker: IconMapMarker,
  compass: IconCompass,
  rulerCombined: IconRulerCombined,
  arrowsAltV: IconArrowsAltV,
  link: IconLink,
  store: IconStore,
  swimmer: IconSwimmer,
} as const;

export default function Highlights() {
  return (
    <section className="section section--light" id="highlights">
      <div className="container">
        <div className="rule-heading">
          <span>PROJECT HIGHLIGHTS</span>
        </div>

        <div className="panel">
          {HIGHLIGHTS.map(({ title, icon }) => {
            const Icon = ICONS[icon];
            return (
              <div className="icon-box" key={title}>
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
  );
}
