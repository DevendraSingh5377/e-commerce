import {
  FaMedal,
  FaShippingFast,
  FaShieldAlt,
  FaHeadset,
} from "react-icons/fa";

import "./WhyChooseUs.css";

const features = [
  {
    icon: <FaMedal />,
    title: "Premium Quality",
    description:
      "Original products from the world's most trusted badminton brands.",
  },
  {
    icon: <FaShippingFast />,
    title: "Fast Delivery",
    description:
      "Quick and reliable shipping with secure packaging.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Payments",
    description:
      "100% protected payments with trusted payment gateways.",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    description:
      "Dedicated customer support whenever you need assistance.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="why-section">
      <h2>
        Why Choose Us
      </h2>

      <p className="why-subtitle">
        Everything a badminton player needs,
        delivered with quality and trust.
      </p>

      <div className="why-grid">
        {features.map(
          (item, index) => (
            <div
              className="why-card"
              key={index}
            >
              <div className="why-icon">
                {item.icon}
              </div>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.description}
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default WhyChooseUs;