import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const ProjectCard = ({ title, status, description, tags }) => {
  const statusLower = status.toLowerCase();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className="project-card"
      data-status={statusLower}
      whileHover={shouldReduceMotion ? {} : {
        borderColor: 'var(--color-accent-border)',
        boxShadow: 'var(--shadow-hover)',
      }}
      transition={
        shouldReduceMotion
          ? { duration: 0.01 }
          : { duration: 0.25, ease: [0.165, 0.84, 0.44, 1] }
      }
    >
      <div className="project-status">
        <span className={`pill pill--${statusLower}`}>{status}</span>
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      <div className="project-tags">
        {tags.map((tag, i) => (
          <span key={i} className="chip">
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
};

export default ProjectCard;
