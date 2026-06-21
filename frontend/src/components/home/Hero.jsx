import { motion } from "framer-motion";
import "./Hero.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import racketImage from "../../assets/images/racket.png";
import FloatingShuttle from "./FloatingShuttle";

const Hero = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <div className="hero-content">

        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src={racketImage}
            alt="Badminton Racket"
            className="hero-racket"
            animate={{
              y: [0, -12, 0],
              rotate: [0, 2, 0, -2, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <FloatingShuttle />
        </motion.div>

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="hero-tag">
            PREMIUM BADMINTON STORE
          </span>

          <h1>
            PLAY LIKE
            <br />
            A CHAMPION
          </h1>

          <p>
            {isLoggedIn
              ? `Welcome back${user?.name ? `, ${user.name}` : ""} 👋`
              : "Discover premium badminton rackets, shuttlecocks and accessories trusted by players across India."}
          </p>

          <div className="hero-buttons">
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
                    Shop Now
                  </button>
                </Link>

                <Link to="/orders">
                  <button className="secondary-btn">
                    My Orders
                  </button>
                </Link>
              </>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;