import Section from '../components/Section';
import { motion } from 'framer-motion';
import { BookOpen, Share2, Search, ExternalLink } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

const Sobre = () => {
  const [gestao, setGestao] = useState<any[]>([]);
  const [media, setMedia] = useState<any>({ about_photo: '/founding-photo.png' });

  useEffect(() => {
    // Real-time Gestao
    const unsubGestao = onSnapshot(collection(db, 'gestao'), (snapshot) => {
      setGestao(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Site Media Config
    const unsubMedia = onSnapshot(doc(db, 'site_config', 'media'), (snapshot) => {
      if (snapshot.exists()) setMedia(snapshot.data());
    });

    return () => {
      unsubGestao();
      unsubMedia();
    };
  }, []);

  return (
    <div className="page-transition-wrapper">
      <Section 
        id="historia"
        title="Nossa História" 
        subtitle="Um movimento fundado sob o desejo de uma psicanálise ética e rigorosa."
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="mobile-grid">
          <div>
            <p style={{ fontSize: '1.25rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '32px' }}>
              A Práxis Psicanalítica tem como tripé basal o ensino, a transmissão e a pesquisa. Nosso objetivo central reside em promover a transmissão da Psicanálise em sua interseção com a clínica e a cultura.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '32px' }}>
              Fundada em <strong>07 de agosto de 2021</strong>, a Práxis nasceu para ser um espaço de interlocução para analistas que buscam percursos de formação permanentes e sustentados pelo rigor teórico.
            </p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="glass" 
              style={{ padding: '40px', borderRadius: '24px', borderLeft: '6px solid var(--secondary)' }}
            >
              <p className="outfit" style={{ fontStyle: 'italic', fontSize: '1.4rem', color: 'var(--primary)', margin: 0, fontWeight: 500 }}>
                "Uma psicanálise ética, sem dogmas, comprometida com o sofrimento humano e a cultura contemporânea."
              </p>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative' }}
          >
            <img 
              src={media.about_photo || "/founding-photo.png"} 
              alt="Fundação da Práxis" 
              style={{ width: '100%', borderRadius: '32px', boxShadow: 'var(--shadow-lg)', position: 'relative', zIndex: 1 }} 
            />
          </motion.div>
        </div>
      </Section>

      <Section id="equipe" title="Corpo de Gestão" subtitle="Os profissionais responsáveis pela sustentação do movimento.">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {gestao.map((p, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -5 }}
              className="card-member shadow-sm" 
              style={{ padding: '40px', background: 'white', borderRadius: '40px', textAlign: 'center' }}
            >
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--accent-glow)', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 800, color: 'var(--secondary)', border: '4px solid white', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                {p.photo ? <img src={p.photo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="P" /> : p.name[0]}
              </div>
              <h4 className="outfit" style={{ fontSize: '1.6rem', color: 'var(--primary)', marginBottom: '8px' }}>{p.name}</h4>
              <p style={{ color: 'var(--secondary)', fontWeight: 600, fontSize: '1rem', marginBottom: '24px' }}>{p.role}</p>
              <a href={p.lattes} target="_blank" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '0.9rem', width: '100%', justifyContent: 'center', background: 'transparent', border: '1px solid var(--secondary)', color: 'var(--secondary)', borderRadius: '100px' }}>
                Ver Currículo Lattes <ExternalLink size={16} />
              </a>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="tripe" title="Tripé Basal" subtitle="Os fundamentos que sustentam nossa prática e transmissão.">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {[
            { 
              title: "Ensino", 
              icon: BookOpen, 
              desc: "Proporcionar um ensino rigoroso dos conceitos fundamentais de Freud e Lacan, articulando a teoria com as questões da contemporaneidade." 
            },
            { 
              title: "Transmissão", 
              icon: Share2, 
              desc: "A transmissão da psicanálise ocorre para além dos livros, no laço entre analistas e no compromisso com a formação permanente." 
            },
            { 
              title: "Pesquisa", 
              icon: Search, 
              desc: "Incentivar a produção de conhecimento através de grupos de trabalho, seminários e publicações que interroguem a prática clínica." 
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ y: -10 }}
              className="glass" 
              style={{ padding: '50px 40px', borderRadius: '32px', textAlign: 'center' }}
            >
              <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', color: 'var(--secondary)' }}>
                <item.icon size={36} />
              </div>
              <h3 className="outfit" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '20px' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Sobre;
