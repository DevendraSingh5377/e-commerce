import "./BrandStrip.css";

const brands = [
  "YONEX",
  "LI-NING",
  "VICTOR",
  "APACS",
  "CARLTON",
  "HUNDRED",
];

const BrandStrip = () => {
  return (
    <section className="brand-strip">
      <p className="brand-title">
        TRUSTED BY TOP BADMINTON BRANDS
      </p>

      <div className="brand-slider">
        <div className="brand-track">
          {[...brands, ...brands].map(
            (brand, index) => (
              <div
                className="brand-item"
                key={index}
              >
                {brand}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default BrandStrip;