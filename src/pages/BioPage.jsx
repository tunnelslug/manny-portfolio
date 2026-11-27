import React, { useEffect } from 'react';
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';
import { Globe, Heart, Mail } from 'lucide-react';
import { LinkedinIcon, XIcon, InstagramIcon } from '../components/icons/BrandIcons';
import ThemeToggle from '../components/ThemeToggle';
import BioLink from '../components/BioLink';
import { contactEmail, contactMailto } from '../content/portfolio';

const LINKS = [
  { href: 'https://mannyflo.com', icon: <Globe size={20} />, label: 'mannyflo.com', sublabel: 'Personal website' },
  { href: 'https://mannyandcelesti.com', icon: <Heart size={20} />, label: 'mannyandcelesti.com', sublabel: 'Family website' },
  { href: 'https://instagram.com/luciddoomscroll', icon: <InstagramIcon size={20} />, label: '@luciddoomscroll', sublabel: 'Instagram' },
  { href: 'https://x.com/Mannyflo', icon: <XIcon size={20} />, label: '@Mannyflo', sublabel: 'X' },
  { href: 'https://www.linkedin.com/in/mannyflores11/', icon: <LinkedinIcon size={20} />, label: 'LinkedIn' },
  { href: contactMailto, icon: <Mail size={20} />, label: contactEmail, sublabel: 'Email' },
];

const faderVariants = (shouldReduceMotion) => shouldReduceMotion ? {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.01 } }
} : {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.165, 0.84, 0.44, 1] } }
};

const staggerContainer = (shouldReduceMotion) => ({
  hidden: {},
  visible: { transition: { staggerChildren: shouldReduceMotion ? 0.01 : 0.06 } }
});

const BioPage = () => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    document.title = 'Manny Flores · Links';
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="bio-page">
        <div className="bio-theme-toggle">
          <ThemeToggle />
        </div>

        <m.div
          className="bio-shell"
          variants={staggerContainer(shouldReduceMotion)}
          initial="hidden"
          animate="visible"
        >
          <m.img
            src="/profile2.webp"
            alt="Portrait of Manny Flores"
            className="bio-portrait"
            width="96"
            height="96"
            loading="eager"
            decoding="async"
            variants={faderVariants(shouldReduceMotion)}
          />

          <m.h1 className="bio-name" variants={faderVariants(shouldReduceMotion)}>
            Manny Flores
          </m.h1>
          <m.p className="bio-role" variants={faderVariants(shouldReduceMotion)}>
            Engineer · Runner · Husband · Dad · SF&nbsp;Bay&nbsp;Area
          </m.p>

          <m.div className="bio-link-list" variants={staggerContainer(shouldReduceMotion)}>
            {LINKS.map((link) => (
              <m.div key={link.href} variants={faderVariants(shouldReduceMotion)}>
                <BioLink
                  href={link.href}
                  icon={link.icon}
                  label={link.label}
                  sublabel={link.sublabel}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                />
              </m.div>
            ))}
          </m.div>

          <m.p className="bio-footer" variants={faderVariants(shouldReduceMotion)}>
            © {new Date().getFullYear()} Manny Flores
          </m.p>
        </m.div>
      </div>
    </LazyMotion>
  );
};

export default BioPage;
