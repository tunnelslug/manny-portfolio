import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const StewardCard = ({ num, area, description }) => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.article 
      className="steward-card"
      whileHover={shouldReduceMotion ? {} : {
        borderColor: "rgba(28, 24, 22, 0.30)",
      }}
      transition={
        shouldReduceMotion 
          ? { duration: 0.01 }
          : { duration: 0.25, ease: [0.165, 0.84, 0.44, 1] }
      }
    >
      <span className="steward-num">
        {num}
      </span>
      <h3 style={{ fontVariationSettings: '"opsz" 18' }}>
        {area}
      </h3>
      <p>
        {description}
      </p>
    </motion.article>
  );
};

export default StewardCard;

