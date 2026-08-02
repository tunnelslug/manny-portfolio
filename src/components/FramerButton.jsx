import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const FramerButton = ({ 
  href, 
  onClick, 
  variant = 'primary', 
  className = '', 
  children,
  ...props 
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  
  const Component = href ? motion.a : motion.button;
  const isGhost = variant === 'ghost';
  const baseClass = isGhost ? 'btn-ghost' : 'btn';
  const combinedClass = `${baseClass} ${className} relative overflow-hidden`;
  
  const handleHoverStart = () => setIsHovered(true);
  const handleHoverEnd = () => setIsHovered(false);
  
  return (
    <Component
      href={href}
      onClick={onClick}
      className={combinedClass}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
      {...props}
    >
      {/* Background ink overlay */}
      <motion.span
        className="absolute inset-0 z-0 origin-bottom pointer-events-none"
        style={{
          backgroundColor: isGhost ? 'var(--color-text)' : 'var(--color-accent-strong)',
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isHovered ? 1 : 0 }}
        whileTap={shouldReduceMotion ? {} : {
          backgroundColor: isGhost ? 'var(--color-text)' : 'var(--color-accent-strong)',
        }}
        transition={
          shouldReduceMotion
            ? { duration: 0.01 }
            : { duration: 0.35, ease: [0.165, 0.84, 0.44, 1] }
        }
      />
      
      {/* Content wrapper with higher z-index to stay above the ink fill */}
      <motion.span
        className="relative z-10 flex items-center gap-2 w-full justify-center pointer-events-none"
        animate={
          isGhost
            ? { color: isHovered ? 'var(--color-bg)' : 'var(--color-text)' }
            : {}
        }
        transition={
          shouldReduceMotion
            ? { duration: 0.01 }
            : { duration: 0.25, ease: 'easeOut' }
        }
      >
        {children}
      </motion.span>
    </Component>
  );
};

export default FramerButton;
