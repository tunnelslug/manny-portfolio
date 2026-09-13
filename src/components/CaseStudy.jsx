import React from 'react';

/* One thing in motion: prose on the left, proof on the right. The proof is
   either an artifact (a link plus the shape of what is behind it) or the
   shape alone, set in mono like a directory listing. No proof, no entry. */
const CaseStudy = ({ title, status, description, tags, proof, onFollow }) => {
  const statusLower = status.toLowerCase();
  return (
    <article className="case" data-status={statusLower}>
      <div className="case-body">
        <div className="case-head">
          <span className={`pill pill--${statusLower}`}>{status}</span>
          <h3>{title}</h3>
        </div>
        <p>{description}</p>
        <div className="case-tags">
          {tags.map((tag) => (
            <span key={tag} className="chip">{tag}</span>
          ))}
        </div>
      </div>
      <aside className="case-proof" aria-label={`${proof.kind} for ${typeof title === 'string' ? title : 'this work'}`}>
        <div className="case-proof-head">
          <span className="case-proof-kind">{proof.kind}</span>
          {proof.link && (
            <a
              className="case-proof-link"
              href={proof.link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onFollow ? onFollow(proof.link.label) : undefined}
            >
              {proof.link.label}
              <span aria-hidden="true"> ↗</span>
            </a>
          )}
        </div>
        <dl className="case-proof-lines">
          {proof.lines.map(([key, value]) => (
            <div key={key + value} className="case-proof-line">
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </article>
  );
};

export default CaseStudy;
