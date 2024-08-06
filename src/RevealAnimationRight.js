import React, { useEffect, useRef } from "react";
import { useAnimation, motion, useInView } from "framer-motion";

export const RevealRight = ({ children }) => {
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
          hidden: { opacity: 0, x: 75 }, // Change y to x for horizontal movement
          visible: { opacity: 1, x: 0 },
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
          hidden: { right: 0 }, // Start from the right
          visible: { right: "100%" }, // End at 100% from the right
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
