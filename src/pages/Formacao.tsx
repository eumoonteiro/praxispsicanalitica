import { motion } from 'framer-motion';
import Section from '../components/Section';
import { Calendar, Clock, CheckCircle2, MessageCircle } from 'lucide-react';

const Formacao = () => {
  const whatsappUrl = "https://wa.me/5521964322455?text=Olá, quero participar da formação";

  const clinicalFeatures = [
    "Duração de 24 meses",
    "Aula teórica e prática*",
    "Módulos que sustentam uma clínica ética e potente",
    "Professores qualificados e alinhados a Psicanálise do Inconsciente",
    "Defesa de uma práxis da psicanálise acessível e de qualidade!"
  ];



  const continuedFeatures = [
    "Modalidade restrita aos membros da Práxis Psicanalítica;",
    "Seminários em diversos temas;",
    "Direcionado para pessoas com maiores percursos em psicanálise;",
    "Há a possibilidade de atendimento pela Clínica Social da Práxis."
  ];

  return (
    <div className="page-transition-wrapper">
      <Section 
        id="formacao-hero" 
        title="Percursos de Formação" 
        subtitle="Sustentação de uma clínica ética e potente através do ensino permanente."
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', alignItems: 'start' }} className="mobile-grid">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}
          >
            <div>
              <h2 className="outfit" style={{ fontSize: '2.5rem', marginBottom: '25px', color: 'var(--secondary)' }}>
                Formação Clínica/Inicial
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '35px' }}>
                {clinicalFeatures.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <CheckCircle2 color="var(--secondary)" size={22} style={{ marginTop: '4px' }} />
                    <span style={{ fontSize: '1.1rem', fontWeight: 500, opacity: 0.9 }}>{item}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontStyle: 'italic', borderLeft: '3px solid var(--accent)', paddingLeft: '20px', lineHeight: '1.6' }}>
                *Mediante a sustentação do tripé psicanalítico - teoria, supervisão e análise pessoal.
              </p>
            </div>

            <div style={{ paddingTop: '40px', borderTop: '1px solid #eee' }}>
              <h2 className="outfit" style={{ fontSize: '2.5rem', marginBottom: '25px', color: 'var(--primary)' }}>
                Formação continuada em Psicanálise
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '35px' }}>
                {continuedFeatures.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <CheckCircle2 color="var(--primary)" size={22} style={{ marginTop: '4px' }} />
                    <span style={{ fontSize: '1.1rem', fontWeight: 500, opacity: 0.9 }}>{item}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontStyle: 'italic', borderLeft: '3px solid var(--primary)', paddingLeft: '20px', lineHeight: '1.6' }}>
                Sabe-se que a formação do analista é baseada em um tripé, que diz sobre teoria, supervisão e análise pessoal, sendo esta última de responsabilidade do analista.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass"
            style={{ padding: '50px', borderRadius: '40px', background: 'var(--primary)', color: 'white' }}
          >
            <h3 className="outfit" style={{ color: 'white', fontSize: '1.8rem', marginBottom: '30px' }}>Informações e Horários</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase', fontWeight: 800, marginBottom: '4px' }}>Encontros</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>Segundas das 20h às 22h</div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '8px', lineHeight: '1.4' }}>
                    (sujeito a alterações na data e horário sendo avisados com dois meses de antecedência)
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Calendar size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase', fontWeight: 800, marginBottom: '4px' }}>Frequência</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>Semanal</div>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <p style={{ marginBottom: '20px', fontSize: '1.1rem' }}>Faça seu pré-cadastro abaixo!</p>
              <a 
                href={whatsappUrl} 
                target="_blank" 
                className="btn" 
                style={{ background: 'white', color: 'var(--primary)', width: '100%', borderRadius: '100px', padding: '18px' }}
              >
                Quero Participar <MessageCircle size={20} />
              </a>
            </div>
          </motion.div>

        </div>
      </Section>
    </div>
  );
};

export default Formacao;
