import React, { useEffect, useRef } from "react";
import { useAnimation, motion, useInView } from "framer-motion";

export const RevealLeft = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [isInView]);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -75 }, // Start off-screen to the left
          visible: { opacity: 1, x: 0 }, // Move to the original position
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
        ref={ref}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 }, // Start from the left
          visible: { left: "100%" }, // Slide to the right
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          background: "var(--brand)",
          zIndex: 20,
        }}
      />
    </div>
  );
};
