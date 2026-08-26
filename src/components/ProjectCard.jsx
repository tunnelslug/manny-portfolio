import React from 'react';

const ProjectCard = ({ title, status, description, tags }) => {
  const statusLower = status.toLowerCase();

  return (
    <article
      className="project-card"
      data-status={statusLower}
    >
      <div className="project-status">
        <span className={`pill pill--${statusLower}`}>{status}</span>
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      <div className="project-tags">
        {tags.map((tag) => (
          <span key={tag} className="chip">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
};

export default ProjectCard;
