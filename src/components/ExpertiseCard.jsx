import React from 'react';

const ExpertiseCard = ({ num, title, description, details }) => (
  <article className="expertise-row">
    <div className="expertise-head">
      <span className="expertise-num" aria-hidden="true">
        {num}
      </span>
      <h3>{title}</h3>
    </div>
    <div className="expertise-content">
      <p>{description}</p>
      <ul>
        {details.map((detail, i) => (
          <li key={i}>{detail}</li>
        ))}
      </ul>
    </div>
  </article>
);

export default ExpertiseCard;
