import shuttleImage from "../../assets/images/shuttle.png";
import "./FloatingShuttle.css";

const FloatingShuttle = () => {
  return (
    <img
      src={shuttleImage}
      alt="Shuttle"
      className="floating-shuttle"
    />
  );
};

export default FloatingShuttle;