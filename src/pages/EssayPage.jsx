import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import React, { useEffect, useState } from 'react';
import ResumeDialog from '../components/ResumeDialog';
import SiteHeader, { SiteFooter } from '../components/SiteHeader';
import { getEssay, formatDate, PERSON } from '../content/site';

const EssayPage = ({ slug }) => {
  const [resumeOpen, setResumeOpen] = useState(false);
  const essay = getEssay(slug);

  useEffect(() => {
    if (essay) {
      document.title = `${essay.title} · ${PERSON.name}`;
    } else {
      document.title = `Not found · ${PERSON.name}`;
    }
  }, [essay]);

  return (
    <div className="site">
      <a href="#main" className="skip-link">Skip to content</a>
      <SiteHeader onResume={() => setResumeOpen(true)} current="writing" />
      <main id="main" className="page">
        {essay ? (
          <article>
            <p className="essay-kicker">
              <time dateTime={essay.date}>{formatDate(essay.date)}</time>
            </p>
            <h1 className="essay-title">{essay.title}</h1>
            <div className="essay-body">
              {essay.body.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
            <a className="essay-back" href="/#writing">All writing</a>
          </article>
        ) : (
          <div>
            <h1 className="essay-title">Not found</h1>
            <p className="missing">That note is not here.</p>
            <a className="essay-back" href="/#writing">All writing</a>
          </div>
        )}
      </main>
      <SiteFooter />
      <Analytics />
      <SpeedInsights />
      <ResumeDialog open={resumeOpen} onOpenChange={setResumeOpen} />
    </div>
  );
};

export default EssayPage;
