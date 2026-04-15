import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState('/logo-full.png');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Fetch dynamic logo with real-time listener
    const unsub = onSnapshot(doc(db, 'site_config', 'media'), (snapshot) => {
      if (snapshot.exists() && snapshot.data().logo) {
        setLogoUrl(snapshot.data().logo);
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsub();
    };
  }, []);

  const navLinks = [
    { name: 'Início', href: '/' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Membros', href: '/membros' },
    { name: 'Agenda', href: '/agenda' },
    { name: 'Cine Práxis', href: '/cinepraxis' },
    { name: 'Clínica', href: '/clinica' },
    { name: 'Loja', href: '/loja' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav 
        className={`fixed w-full z-[100] transition-all duration-500 ${isScrolled || location.pathname !== '/' ? 'glass py-4 shadow-md' : 'bg-transparent py-6'}`}
        style={{ top: 0 }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', zIndex: 101 }}>
            <img 
              src={logoUrl} 
              alt="Práxis" 
              style={{ 
                height: isScrolled ? '65px' : '85px', 
                width: 'auto', 
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.05))'
              }} 
            />
          </Link>

          {/* Desktop Menu */}
          <ul style={{ display: 'flex', gap: '8px', alignItems: 'center' }} className="desktop-menu">
            {navLinks.map(link => (
              <li key={link.name} style={{ display: 'block' }}>
                <Link 
                  to={link.href} 
                  className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li style={{ marginLeft: '12px', display: 'flex', gap: '8px' }}>
              <a 
                href="https://revistapraxispsicanalitica.com.br" 
                target="_blank" 
                className="btn" 
                style={{ padding: '12px 20px', borderRadius: '100px', fontSize: '0.9rem', background: 'var(--accent-glow)', color: 'var(--secondary)' }}
              >
                Revista <ArrowUpRight size={14} />
              </a>
              <a 
                href="https://wa.me/5521964322455" 
                target="_blank" 
                className="btn btn-primary" 
                style={{ padding: '12px 24px', borderRadius: '100px', fontSize: '0.9rem' }}
              >
                Contato <ArrowUpRight size={14} />
              </a>
            </li>
          </ul>

          {/* Mobile Toggle */}
          <button 
            className="mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ position: 'relative', zIndex: 9999 }}
          >
            {isMobileMenuOpen ? <X size={36} /> : <Menu size={36} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu — outside <nav> to avoid backdrop-filter stacking context */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              position: 'fixed', 
              inset: 0, 
              background: 'white', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '20px',
              zIndex: 9998
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link 
                  to={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="outfit mobile-nav-link"
                  style={{ color: isActive(link.href) ? 'var(--secondary)' : 'var(--primary)', fontWeight: 800 }}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.3 }}
              style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px', width: '80%' }}
            >
              <a 
                href="https://revistapraxispsicanalitica.com.br" 
                target="_blank" 
                className="btn" 
                style={{ borderRadius: '100px', background: 'var(--accent-glow)', color: 'var(--secondary)', width: '100%' }}
              >
                Revista <ArrowUpRight size={18} />
              </a>
              <a 
                href="https://wa.me/5521964322455" 
                target="_blank" 
                className="btn btn-primary" 
                style={{ borderRadius: '100px', width: '100%' }}
              >
                Contato <ArrowUpRight size={18} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
