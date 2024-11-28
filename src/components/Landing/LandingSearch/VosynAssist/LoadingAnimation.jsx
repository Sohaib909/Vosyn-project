import React from "react";

import { motion } from "framer-motion";

import styles from "./VosynAssist.module.css";

const LoadingAnimation = ({ isLoading }) => {
  const loadingDotTransition = {
    duration: 0.45,
    ease: "linear",
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 0.45,
  };
  const finishedLoadingDotTransition = {
    delay: 0.1,
    duration: 0.1,
    ease: "linear",
  };

  const loadingResponseVariants = {
    loading: {
      transition: {
        staggerChildren: 0.175,
      },
    },
  };

  const loadingResponseDotVariants = {
    finishLoading: (i) => {
      return {
        x: `-${i * 20}px`,
        transition: { duration: 0.1, ease: "easeOut" },
      };
    },
  };

  return (
    <motion.div
      variants={loadingResponseVariants}
      animate={isLoading ? "loading" : "finishLoading"}
      className={styles.loadingResponseContainer}
    >
      {[...Array(3).keys()].map((idx) => {
        return (
          <motion.div
            key={idx}
            variants={loadingResponseDotVariants}
            custom={idx}
            className={styles.loadingResponseDotContainer}
          >
            <motion.div
              variants={{
                loading: {
                  y: ["-50%", "-100%", "-50%"],
                  backgroundColor: ["#dfdfdf", "#ffffff", "#dfdfdf"],
                  transition: loadingDotTransition,
                },
                finishLoading: {
                  y: "-16px",
                  scale: 2 / 3,
                  backgroundColor: "#ffffff",
                  transition: finishedLoadingDotTransition,
                },
              }}
              style={{ x: "-50%", originX: 0, originY: 0.5 }}
              className={styles.loadingResponseDot}
            ></motion.div>
            <motion.div
              variants={{
                loading: {
                  scaleY: [0, 1, 0],
                  backgroundColor: ["#dfdfdf", "#ffffff", "#dfdfdf"],
                  transition: loadingDotTransition,
                },
                finishLoading: {
                  y: "-4px",
                  scaleX: 2 / 3,
                  scaleY: 4 / 3,
                  backgroundColor: "#ffffff",
                  transition: finishedLoadingDotTransition,
                },
              }}
              style={{ originX: 0, originY: 0.5 }}
              className={styles.loadingResponseDotCenter}
            ></motion.div>
            <motion.div
              variants={{
                loading: {
                  y: ["-50%", "0%", "-50%"],
                  backgroundColor: ["#dfdfdf", "#ffffff", "#dfdfdf"],
                  transition: loadingDotTransition,
                },
                finishLoading: {
                  y: "0px",
                  scale: 2 / 3,
                  backgroundColor: "#ffffff",
                  transition: finishedLoadingDotTransition,
                },
              }}
              style={{ x: "-50%", originX: 0, originY: 0.5 }}
              className={styles.loadingResponseDot}
            ></motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default LoadingAnimation;
