import { motion } from "framer-motion";
import "./Hero.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
//import FloatingParticles from "./FloatingParticles";
import racketImage from "../../assets/images/racket.png";
import FloatingShuttle from "./FloatingShuttle";


const Hero = () => {
    const { isLoggedIn, user } = useAuth();
  return (
    <section className="hero">
      <FloatingShuttle />
      {/* Left Side */}
      <motion.div
        className="hero-left"
        initial={{
          opacity: 0,
          x: -80,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 1,
        }}
      >
   <motion.img
  src={racketImage}
  alt="Badminton Racket"
  className="hero-racket"
  animate={{
    y: [0, -15, 0],
    rotate: [0, 3, 0, -3, 0],
  }}
  transition={{
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>
      </motion.div>

      {/* Right Side */}
      <motion.div
        className="hero-right"
        initial={{
          opacity: 0,
          x: 80,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 1,
          delay: 0.3,
        }}
      >
        <motion.h1
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.5,
          }}
        >
          PLAY
          <br />
          BEYOND
          <br />
          LIMITS
        </motion.h1>

        <motion.p
  initial={{
    opacity: 0,
    y: 20,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.8,
    delay: 0.8,
  }}
>
  {isLoggedIn
    ? `Welcome back${
        user?.name
          ? `, ${user.name}`
          : ""
      } 👋`
    : "Premium badminton equipment trusted by professionals."}
</motion.p>

      <motion.div
  className="hero-buttons"
  initial={{
    opacity: 0,
    y: 20,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.8,
    delay: 1,
  }}
>
  {!isLoggedIn ? (
    <>
      <Link to="/login">
        <button>
          Login
        </button>
      </Link>

      <Link to="/register">
        <button className="secondary-btn">
          Register
        </button>
      </Link>
    </>
  ) : (
    <>
      <Link to="/products">
        <button>
          Explore Collection
        </button>
      </Link>
    </>
  )}
</motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;