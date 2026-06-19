import "./FloatingParticles.css";

const FloatingParticles = () => {
  return (
    <div className="particles">
      {[...Array(18)].map((_, index) => (
        <span
          key={index}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${8 + Math.random() * 8}s`,
          }}
        ></span>
      ))}
    </div>
  );
};

export default FloatingParticles;