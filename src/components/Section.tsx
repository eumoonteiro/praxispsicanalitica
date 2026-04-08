import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  dark?: boolean;
}

const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, dark }) => {
  return (
    <section 
      id={id} 
      className={`section-padding ${dark ? 'bg-dark' : ''}`} 
      style={{ color: dark ? 'white' : 'inherit' }}
    >
      <div className="container">
        {(title || subtitle) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '50px' }}
          >
            {title && <h2 style={{ color: dark ? 'white' : 'var(--primary)', fontSize: '2.5rem', marginBottom: '10px' }}>{title}</h2>}
            {subtitle && <p style={{ color: dark ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>{subtitle}</p>}
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default Section;
