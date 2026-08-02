import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Globe, Heart, Baby, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../components/icons/BrandIcons';
import ThemeToggle from '../components/ThemeToggle';
import BioLink from '../components/BioLink';

const LINKS = [
  { href: 'https://mannyflo.com', icon: <Globe size={20} />, label: 'mannyflo.com', sublabel: 'Personal website' },
  { href: 'https://mannyandcelesti.com', icon: <Heart size={20} />, label: 'mannyandcelesti.com', sublabel: 'Family website' },
  { href: 'https://www.amazon.com/baby-reg/1NWHK22CZPH2H', icon: <Baby size={20} />, label: 'Baby Registry', sublabel: 'Amazon' },
  { href: 'https://www.instagram.com/kylo_renders?igsh=NTc4MTIwNjQ2YQ==', icon: <InstagramIcon size={20} />, label: '@kylo_renders', sublabel: 'SF Baby Shower Photos' },
  { href: 'https://www.linkedin.com/in/mannyflores11/', icon: <LinkedinIcon size={20} />, label: 'LinkedIn' },
  { href: 'https://github.com/tunnelslug', icon: <GithubIcon size={20} />, label: 'GitHub' },
  { href: 'https://instagram.com/mannyrunning', icon: <InstagramIcon size={20} />, label: '@mannyrunning', sublabel: 'Instagram' },
  { href: 'mailto:mannyflores1193@gmail.com', icon: <Mail size={20} />, label: 'Email' },
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
    <div className="bio-page">
      <div className="bio-theme-toggle">
        <ThemeToggle />
      </div>

      <motion.div
        className="bio-shell"
        variants={staggerContainer(shouldReduceMotion)}
        initial="hidden"
        animate="visible"
      >
        <motion.img
          src="/profile2.png"
          alt="Portrait of Manny Flores"
          className="bio-portrait"
          width="96"
          height="96"
          loading="eager"
          decoding="async"
          variants={faderVariants(shouldReduceMotion)}
        />

        <motion.h1 className="bio-name" variants={faderVariants(shouldReduceMotion)}>
          Manny Flores
        </motion.h1>
        <motion.p className="bio-role" variants={faderVariants(shouldReduceMotion)}>
          Engineer · Runner · <span className="bio-role-nowrap">Soon-to-be</span><br />
          Father · SF Bay Area
        </motion.p>

        <motion.div className="bio-link-list" variants={staggerContainer(shouldReduceMotion)}>
          {LINKS.map((link) => (
            <motion.div key={link.href} variants={faderVariants(shouldReduceMotion)}>
              <BioLink
                href={link.href}
                icon={link.icon}
                label={link.label}
                sublabel={link.sublabel}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.p className="bio-footer" variants={faderVariants(shouldReduceMotion)}>
          © {new Date().getFullYear()} Manny Flores
        </motion.p>
      </motion.div>
    </div>
  );
};

export default BioPage;
