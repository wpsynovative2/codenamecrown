export default function EOI() {
  return (
    <section
      className="section section--dark edge-top edge-bottom"
      id="eoi-benefits"
    >
      <div className="container">
        <div className="rule-heading rule-heading--cream">
          <span>EOI BENEFITS</span>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="eoi__panel">
            <div className="eoi__cell">
              <p className="eoi__label">SAVE UPTO</p>
              <h2 className="eoi__value">₹15 LACS*</h2>
            </div>
            <div className="eoi__cell">
              <p className="eoi__label">ENJOY</p>
              <h2 className="eoi__value">0% GST*</h2>
            </div>
            {/* The third cell sets its number beside the label, not above it. */}
            <div className="eoi__cell eoi__cell--inline">
              <h2 className="eoi__value">3</h2>
              <p className="eoi__label">
                VALUABLE
                <br />
                BENEFITS*
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2 className="eoi__pill">1, 2 &amp; 3 BHK @ ₹95 LACS*++ ONWARDS</h2>
        </div>
      </div>
    </section>
  );
}
