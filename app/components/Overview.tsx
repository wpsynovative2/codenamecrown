import { Fragment } from "react";
import { OVERVIEW_STATS } from "../data/site";

export default function Overview() {
  return (
    <section className="section section--light edge-top overview" id="overview">
      <div className="container">
        <h2 className="overview__title">Overview</h2>

        <p className="overview__text">
          Welcome to <strong>CODENAME CROWN</strong>, a thoughtfully planned
          residential address in the heart of Mulund East. Offering 1, 2 &amp; 3
          BHK flats in Mulund East, the project combines spacious layouts,
          private balconies, open views and modern lifestyle amenities. With just
          four homes per floor and excellent connectivity, Prabhav Pride offers
          privacy, convenience and a well-connected lifestyle for those looking
          to buy a flat in Mulund East.
        </p>

        <div className="overview__stats">
          {OVERVIEW_STATS.map((stat, i) => (
            <Fragment key={stat}>
              {i > 0 && <hr className="stat-divider" />}
              <h2 className="stat">{stat}</h2>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
