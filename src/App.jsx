import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import React, { useState } from 'react';
import ResumeDialog from './components/ResumeDialog';
import SiteHeader, { SiteFooter } from './components/SiteHeader';
import { PERSON, WORK, ESSAYS, formatDate } from './content/site';

const App = () => {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="site">
      <a href="#main" className="skip-link">Skip to content</a>
      <SiteHeader onResume={() => setResumeOpen(true)} />

      <main id="main" className="page">
        <section id="about" aria-labelledby="hero-name">
          <h1 id="hero-name" className="sr-only">{PERSON.name}</h1>
          <p className="lede">
            Identity has been my whole career: who gets in, what they can touch,
            and how access ends when they leave. Ten years of that across fintech
            and healthcare. Lately the newest users on the network are not people,
            so the job now is making sure AI tools live by the same rules as
            everyone else: <span className="accent">who, and what, can do what.</span>
          </p>
          <p className="now">{PERSON.now}</p>
          <p className="aside">{PERSON.aside}</p>
        </section>

        <section id="work" className="section" aria-labelledby="work-h">
          <h2 id="work-h" className="section-title">Selected work</h2>
          <ol className="work-list">
            {WORK.map((item) => (
              <li key={item.num} className="work-item">
                <div className="work-kicker">
                  <span className="work-num">{item.num}</span>
                  <h3>{item.title}</h3>
                </div>
                <p><span className="work-label">Problem. </span>{item.problem}</p>
                <p><span className="work-label">Constraint. </span>{item.constraint}</p>
                <p><span className="work-label">Shipped. </span>{item.shipped}</p>
                <p>
                  <span className="work-label">What changed. </span>
                  {item.changed}
                  {item.href && (
                    <>
                      {' '}
                      <a className="inline-link" href={item.href} target="_blank" rel="noopener noreferrer">
                        Source
                      </a>
                      .
                    </>
                  )}
                </p>
              </li>
            ))}
          </ol>
          <p className="resume-note">
            The rest lives on the{' '}
            <button type="button" className="inline-link" onClick={() => setResumeOpen(true)}>
              resume
            </button>
            . This page does not clone it.
          </p>
        </section>

        <section id="writing" className="section" aria-labelledby="writing-h">
          <div className="writing-toolbar">
            <h2 id="writing-h" className="section-title">Writing</h2>
            <a className="rss-link" href="/rss.xml">RSS</a>
          </div>
          <ol className="writing-list">
            {ESSAYS.map((essay) => (
              <li key={essay.slug} className="writing-item">
                <time className="writing-date" dateTime={essay.date}>
                  {formatDate(essay.date)}
                </time>
                <div>
                  <a href={`/writing/${essay.slug}`}>{essay.title}</a>
                  <span className="writing-dek">{essay.dek}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <SiteFooter />
      <Analytics />
      <SpeedInsights />
      <ResumeDialog open={resumeOpen} onOpenChange={setResumeOpen} />
    </div>
  );
};

export default App;
