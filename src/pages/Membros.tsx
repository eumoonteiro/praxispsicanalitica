import { motion } from 'framer-motion';
import Section from '../components/Section';
import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

interface Member {
  id: string;
  name: string;
  role: string;
  photo?: string;
}

const Membros = () => {
  const [membros, setMembros] = useState<Member[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'membros'), orderBy('name'));
    const unsub = onSnapshot(q, (snapshot) => {
      setMembros(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Member)));
    });
    return () => unsub();
  }, []);

  return (
    <div className="page-transition-wrapper">
      <Section id="membros-grid" title="Membros do Movimento">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '40px' }}>
          {membros.map((m, i) => (
            <motion.div 
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.1 }}
              className="card-member"
            >
              <div className="member-photo" style={{ margin: '0 auto 25px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', width: '150px', height: '150px' }}>
                {m.photo ? (
                  <img src={m.photo} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} alt={m.name} />
                ) : (
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--secondary)' }}>{m.name[0]}</span>
                  </div>
                )}
              </div>
              <h4 className="outfit" style={{ fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '10px' }}>{m.name}</h4>
              <p style={{ 
                fontSize: '0.85rem', 
                fontWeight: 800, 
                color: 'var(--secondary)', 
                textTransform: 'uppercase', 
                letterSpacing: '1.5px',
                background: 'var(--accent-glow)',
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '8px'
              }}>
                {m.role || "Membro Associado"}
              </p>
            </motion.div>
          ))}
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="card-member"
            style={{ border: '2px dashed var(--accent)', background: 'var(--accent-glow)', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '340px' }}
          >
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--secondary)', boxShadow: 'var(--shadow-sm)' }}>
               <Users size={30} />
            </div>
            <h4 className="outfit" style={{ fontSize: '1.3rem' }}>Deseja compor?</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', padding: '0 20px', lineHeight: '1.6' }}>
              Você que já possui um percurso na psicanálise pode nos enviar uma carta dizendo de seu desejo em estar na Práxis Psicanalítica. A carta deve ser enviada para o e-mail: <strong style={{ color: 'var(--secondary)' }}>coordenacao@praxispsicanalitica.com.br</strong>
              <br /><br />
              Aguardamos você!
            </p>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default Membros;
