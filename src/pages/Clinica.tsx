
import Section from '../components/Section';
import { MessageSquare, ClipboardCheck, PhoneCall, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Clinica = () => {
  return (
    <div className="page-transition-wrapper">
      <Section id="clinica-info" title="Clínica Social" subtitle="Atendimento psicanalítico ético e acessível para todos os falantes de língua portuguesa.">
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', marginBottom: '80px' }} className="mobile-grid">
          <div>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '40px' }}>
              A clínica social foi inaugurada como um alicerce sólido do trabalho da Práxis, oferecendo atendimento remoto para todo o Brasil e falantes de português ao redor do mundo.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
              {[
                { icon: MessageSquare, title: "Inscrição", text: "Preencha o formulário abaixo com seus dados." },
                { icon: ClipboardCheck, title: "Triagem", text: "Sua solicitação é avaliada por nossos analistas." },
                { icon: PhoneCall, title: "Contato", text: "Retornaremos em até 7 dias úteis via WhatsApp." },
                { icon: UserCheck, title: "Início", text: "Sessões semanais com valores acessíveis." }
              ].map((step, idx) => (
                <div key={idx} className="glass" style={{ padding: '30px', borderRadius: '24px' }}>
                  <div style={{ color: 'var(--secondary)', marginBottom: '16px' }}><step.icon size={28} /></div>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '8px', fontWeight: 700 }}>{step.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>{step.text}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="glass" 
            style={{ 
              padding: '60px 40px', 
              borderRadius: '40px', 
              background: 'var(--primary)', 
              color: 'white', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              textAlign: 'center',
              boxShadow: '0 20px 50px rgba(10, 17, 40, 0.3)'
            }}
          >
            <h3 className="outfit" style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '20px', letterSpacing: '-2px', color: 'white' }}>Valores Sociais</h3>
            <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '40px' }}>Qualidade clínica e ética ao alcance de todos.</p>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ fontSize: '1.1rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px' }}>A partir de</span>
              <div className="outfit price-text" style={{ fontSize: '5rem', fontWeight: 900, margin: '10px 0', lineHeight: 1 }}>R$50</div>
              <span style={{ fontSize: '1.1rem', opacity: 0.7 }}>por sessão</span>
            </div>
          </motion.div>
        </div>

        {/* Form Section */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h3 className="outfit" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Formulário de Inscrição</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '50px' }}>Preencha os campos abaixo e entraremos em contato o mais breve possível.</p>
          
          <div className="form-container">
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLSew0rsEhM7hSqerEVazw8O1qXBO-NVswhBIkHy9f5GhEmJEuA/viewform?embedded=true" 
              width="100%" 
              height="1000" 
              frameBorder="0" 
              marginHeight={0} 
              marginWidth={0}
              className="form-iframe"
            >
              Carregando…
            </iframe>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Clinica;
