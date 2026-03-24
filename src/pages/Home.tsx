import { motion } from 'framer-motion';
import { BookOpen, Users, GraduationCap, ArrowRight, MessageCircle } from 'lucide-react';
import Section from '../components/Section';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot, collection, query, orderBy } from 'firebase/firestore';

const Home = () => {
  const [media, setMedia] = useState<any>({ logo: '/logo-full.png', hero_bg: '' });
  const [membros, setMembros] = useState<any[]>([]);

  useEffect(() => {
    const unsubMedia = onSnapshot(doc(db, 'site_config', 'media'), (snapshot) => {
      if (snapshot.exists()) setMedia(snapshot.data());
    });
    
    const q = query(collection(db, 'membros'), orderBy('name'));
    const unsubMembros = onSnapshot(q, (snapshot) => {
      setMembros(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubMedia();
      unsubMembros();
    };
  }, []);

  const hubCards = [
    {
      title: "Percursos Práxis",
      subtitle: "Formação em Psicanálise",
      icon: GraduationCap,
      href: "/formacao",
      desc: "Formação Clínica/Inicial e Continuada para analistas, sustentadas pelo rigor teórico e o tripé psicanalítico."
    },
    {
      title: "Clínica Social",
      subtitle: "Psicanálise para todos",
      icon: MessageCircle,
      href: "/clinica",
      desc: "Atendimento psicanalítico acessível voltado para a comunidade e falantes de língua portuguesa."
    },
    {
      title: "Revista & Loja",
      subtitle: "Nossas Publicações",
      icon: BookOpen,
      href: "/loja",
      desc: "Acesse a Revista Práxis e obras produzidas por nossos membros sobre a ética e a clínica."
    }
  ];

  return (
    <div className="page-transition-wrapper">
      {/* Hero Section */}
      <section style={{ 
        height: '95vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'relative',
        background: media.hero_bg ? `linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url(${media.hero_bg})` : 'transparent',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div style={{ marginBottom: '60px' }}>
              <img 
                src={media.logo || "/logo-full.png"} 
                alt="Práxis Psicanalítica" 
                style={{ height: '220px', width: 'auto', marginBottom: '40px', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))' }} 
              />
              <h1 className="outfit" style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--primary)', lineHeight: '1', marginBottom: '24px', letterSpacing: '-4px' }}>
                Movimento de <span style={{ color: 'var(--secondary)' }}>Psicanálise</span>
              </h1>
              <p style={{ fontSize: '1.4rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 48px', lineHeight: '1.6' }}>
                Um espaço de interlocução para analistas guiados pelo ensino, transmissão e pesquisa.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }} className="mobile-grid">
              <Link to="/agenda" className="btn btn-primary" style={{ padding: '18px 40px', borderRadius: '100px', fontSize: '1.1rem' }}>
                Agenda de Eventos <ArrowRight size={20} />
              </Link>
              <Link to="/sobre" className="btn" style={{ padding: '18px 40px', borderRadius: '100px', fontSize: '1.1rem', background: 'var(--accent-glow)', color: 'var(--secondary)' }}>
                Sobre o Movimento
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hub Section */}
      <Section id="hub" title="Áreas de Atuação" subtitle="Conheça os pilares que sustentam a transmissão da Psicanálise em nosso movimento.">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {hubCards.map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -12 }}
              className="glass"
              style={{ padding: '60px 40px', borderRadius: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
            >
              <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)' }}>
                <card.icon size={36} />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--secondary)', letterSpacing: '1px' }}>{card.subtitle}</span>
                <h3 className="outfit" style={{ fontSize: '2rem', marginTop: '10px' }}>{card.title}</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>{card.desc}</p>
              <Link to={card.href} className="btn" style={{ background: 'transparent', border: '1px solid #e2e8f0', width: '100%', borderRadius: '100px' }}>
                Saiba Mais <ArrowRight size={18} />
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Revista Highlight Section */}
      <Section id="revista-destaque" title="Revista Práxis" subtitle="Nossa produção científica em interlocução com a clínica e a cultura.">
        <div className="glass" style={{ 
          padding: '80px', 
          borderRadius: '60px', 
          textAlign: 'center', 
          background: 'linear-gradient(135deg, var(--primary) 0%, #1e293b 100%)', 
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative background circle */}
          <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'var(--accent-glow)', filter: 'blur(80px)', opacity: 0.3 }}></div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="outfit" style={{ fontSize: '3rem', marginBottom: '24px', color: 'white' }}>Revista Práxis Psicanalítica</h2>
            <p style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '800px', margin: '0 auto 48px', lineHeight: '1.8' }}>
              Acesse as edições completas de nossa revista científica, com artigos, ensaios e pesquisas produzidas por nossos membros e convidados.
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }} className="mobile-grid">
              <a href="https://revistapraxispsicanalitica.com.br" target="_blank" className="btn btn-primary" style={{ background: 'white', color: 'var(--primary)', padding: '18px 40px', borderRadius: '100px' }}>
                Acessar Site da Revista <ArrowRight size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Community Section - Scrolling Loop */}
      <Section id="comunidade" title="Nossa Comunidade" subtitle="O corpo clínico e de pesquisa que sustenta o movimento Práxis.">
        <div style={{ position: 'relative', overflow: 'hidden', padding: '80px 0' }}>
          {/* Loop container using Framer Motion */}
          <div style={{ display: 'flex', width: 'max-content' }}>
            <motion.div 
              animate={{ x: [0, -1000] }} 
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              style={{ display: 'flex', gap: '30px', paddingRight: '30px' }}
            >
              {[...membros, ...membros].map((m, i) => (
                <div key={`${m.id}-${i}`} style={{ textAlign: 'center', width: '120px' }}>
                  <div style={{ 
                    width: '100px', 
                    height: '100px', 
                    borderRadius: '50%', 
                    overflow: 'hidden', 
                    margin: '0 auto 12px',
                    border: '3px solid white',
                    boxShadow: 'var(--shadow-sm)',
                    background: 'var(--accent-glow)'
                  }}>
                    {m.photo ? (
                      <img src={m.photo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={m.name} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', fontWeight: 800, fontSize: '1.5rem' }}>
                        {m.name?.[0]}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--primary)' }}>
                    {m.name}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/membros" className="btn btn-primary" style={{ borderRadius: '100px', padding: '16px 40px' }}>
            <Users size={18} /> Conhecer Todos os Membros
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default Home;
