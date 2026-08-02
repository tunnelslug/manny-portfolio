import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const BioLink = ({ href, icon, label, sublabel, ...props }) => {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      className="bio-link relative overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
      {...props}
    >
      <motion.span
        className="absolute inset-0 z-0 origin-bottom pointer-events-none"
        style={{ backgroundColor: 'var(--color-text)' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isHovered ? 1 : 0 }}
        transition={
          shouldReduceMotion
            ? { duration: 0.01 }
            : { duration: 0.35, ease: [0.165, 0.84, 0.44, 1] }
        }
      />
      <motion.span
        className="bio-link-content relative z-10"
        animate={{ color: isHovered ? 'var(--color-bg)' : 'var(--color-text)' }}
        transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.25, ease: 'easeOut' }}
      >
        <span className="bio-link-icon" aria-hidden="true">{icon}</span>
        <span className="bio-link-text">
          <span className="bio-link-label">{label}</span>
          {sublabel && <span className="bio-link-sublabel">{sublabel}</span>}
        </span>
      </motion.span>
    </motion.a>
  );
};

export default BioLink;
