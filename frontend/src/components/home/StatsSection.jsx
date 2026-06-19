import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import "./StatsSection.css";

const stats = [
  {
    value: 1000,
    suffix: "+",
    label: "Premium Products",
  },
  {
    value: 500,
    suffix: "+",
    label: "Happy Players",
  },
  {
    value: 50,
    suffix: "+",
    label: "Top Brands",
  },
  {
    value: 99,
    suffix: "%",
    label: "Customer Satisfaction",
  },
];

const StatsSection = () => {
  const { ref, inView } =
    useInView({
      triggerOnce: true,
      threshold: 0.3,
    });

  return (
    <section
      className="stats-section"
      ref={ref}
    >
      <p className="stats-tag">
        OUR IMPACT
      </p>

      <h2>
        Trusted by the
        Badminton Community
      </h2>

      <div className="stats-grid">
        {stats.map(
          (item, index) => (
            <div
              className="stats-card"
              key={index}
            >
           <h3>
  {item.value}
  {item.suffix}
</h3>

              <p>
                {item.label}
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default StatsSection;