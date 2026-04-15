import { useState, useEffect } from 'react';
import Section from '../components/Section';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, ArrowRight, User, DollarSign, FileText, Download, Info } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot, doc } from 'firebase/firestore';

interface EventItem {
  id: string;
  title: string;
  organizer: string;
  schedule: string;
  periodicity: string;
  price: string;
  formLink: string;
  cardUrl?: string;
  syllabus?: string;
  notebookUrl?: string;
}

const Agenda = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [generalNotebook, setGeneralNotebook] = useState<string | null>(null);

  useEffect(() => {
    const unsubEvents = onSnapshot(collection(db, 'agenda'), (snapshot) => {
      setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EventItem)));
    });

    const unsubConfig = onSnapshot(doc(db, 'site_config', 'media'), (snapshot) => {
      if (snapshot.exists()) {
        setGeneralNotebook(snapshot.data().general_notebook || null);
      }
    });

    return () => {
      unsubEvents();
      unsubConfig();
    };
  }, []);

  return (
    <div className="page-transition-wrapper">
      <Section id="agenda-hero" title="Agenda Práxis" subtitle="Seminários, Formações, CinePráxis e eventos científicos.">
        
        {generalNotebook && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ marginBottom: '48px', textAlign: 'center' }}
          >
            <div className="glass agenda-notebook-banner" style={{ 
              padding: '24px 32px', 
              borderRadius: '32px', 
              background: 'var(--accent-glow)', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '20px',
              maxWidth: '100%'
            }}>
              <div style={{ textAlign: 'left' }}>
                <h4 className="outfit" style={{ fontSize: '1.3rem', color: 'var(--primary)' }}>Guia de Atividades</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Cronograma oficial e atividades permanentes do movimento.</p>
              </div>
              <a href={generalNotebook} target="_blank" className="btn btn-primary" style={{ borderRadius: '100px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                <Download size={18} /> Baixar PDF
              </a>
            </div>
          </motion.div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '32px' }}>
          {events.length > 0 ? events.map((event, idx) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass"
              style={{ overflow: 'hidden', borderRadius: '40px', display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              {/* Event Card Image */}
              <div style={{ width: '100%', height: '240px', position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={event.cardUrl || 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80'} 
                  alt={event.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--primary)', color: 'white', padding: '10px 20px', borderRadius: '15px', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {event.periodicity}
                </div>
              </div>

              <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
                <div>
                  <h3 className="outfit" style={{ fontSize: '1.8rem', marginBottom: '15px', lineHeight: '1.2' }}>{event.title}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      <User size={16} color="var(--secondary)" /> <span>{event.organizer}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', background: 'rgba(0,0,0,0.02)', padding: '20px', borderRadius: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', opacity: 0.5 }}>Horário</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14}/> {event.schedule}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', opacity: 0.5 }}>Investimento</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}><DollarSign size={14}/> {event.price || 'Sob consulta'}</span>
                  </div>
                </div>

                {event.syllabus && (
                  <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
                    <h5 style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', opacity: 0.5, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FileText size={14} /> Ementa / Sobre
                    </h5>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                      {event.syllabus}
                    </p>
                  </div>
                )}

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {event.notebookUrl && (
                    <a href={event.notebookUrl} target="_blank" className="btn" style={{ width: '100%', borderRadius: '100px', background: 'var(--accent-glow)', color: 'var(--secondary)' }}>
                      Download Caderno de Atividades <Download size={18} />
                    </a>
                  )}
                  {event.title.toLowerCase().includes('cine') && (
                    <Link to="/cinepraxis" className="btn" style={{ width: '100%', borderRadius: '100px', background: 'var(--accent-glow)', color: 'var(--secondary)' }}>
                      Saiba mais sobre o Cine Práxis <Info size={18} />
                    </Link>
                  )}
                  {event.formLink ? (
                    <a href={event.formLink} target="_blank" className="btn btn-primary" style={{ width: '100%', borderRadius: '100px' }}>
                      Inscrever-se <ArrowRight size={18} />
                    </a>
                  ) : (
                    <button className="btn btn-primary" style={{ width: '100%', borderRadius: '100px', opacity: 0.5, cursor: 'not-allowed' }}>
                      Inscrições em breve
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )) : (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px 20px', opacity: 0.5 }}>
              <CalendarIcon size={64} style={{ margin: '0 auto 24px' }} />
              <h3 className="outfit">Nenhum evento publicado no momento.</h3>
              <p>Fique atento às nossas redes sociais para novidades.</p>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};

export default Agenda;
