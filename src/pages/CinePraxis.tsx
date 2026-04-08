import Section from '../components/Section';
import { motion } from 'framer-motion';
import { Film, Calendar, Clock, Users, MessageSquare, ArrowRight } from 'lucide-react';

const CinePraxis = () => {
  const schedule = [
    {
      month: 'ABRIL',
      date: '25 de Abril de 2026',
      title: 'Hamnet',
      image: '/cinepraxis/hamnet.jpg',
      synopsis: 'Ambientado na Inglaterra de 1580, o filme explora a vida de Agnes, uma mulher de espírito livre e dons curativos, e seu marido, um tutor de latim (William Shakespeare). A narrativa foca na perda devastadora de seu filho de 11 anos, Hamnet, para a peste, e como esse luto visceral se transmuta na criação de uma das maiores tragédias da literatura: Hamlet.'
    },
    {
      month: 'MAIO',
      date: '23 de Maio de 2026',
      title: 'Medida Provisória',
      image: '/cinepraxis/medida.jpg',
      synopsis: 'Em um futuro distópico no Brasil, um governo autoritário ordena uma "medida provisória" que obriga todos os cidadãos negros a serem "devolvidos" à África como forma de reparação histórica. O advogado Antônio, sua esposa médica Capitu e o jornalista André resistem ao confinamento e ao absurdo institucional enquanto o país mergulha no caos.'
    },
    {
      month: 'JUNHO',
      date: '27 de Junho de 2026',
      title: 'O Quarto de Jack (Room)',
      image: '/cinepraxis/quarto.jpg',
      synopsis: 'Jack, um menino de cinco anos, vive isolado em um cubículo com sua mãe, Joy. Para ele, o quarto é o mundo inteiro; para ela, é o cativeiro onde é mantida há anos. Após uma fuga arriscada, Jack precisa enfrentar a descoberta do mundo real, enquanto sua mãe lida com os traumas do passado e a dificuldade de reintegração.'
    }
  ];

  const organizers = ['Deiziane Ribeiro', 'Bárbara Belmiro', 'Lucas Monteiro'];

  return (
    <div className="page-transition-wrapper">
      <Section 
        id="cinepraxis-hero" 
        title="Cine Práxis" 
        subtitle="Interlocução entre a sétima arte e a teoria psicanalítica."
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', marginBottom: '80px' }} className="mobile-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '30px' }}>
              O projeto propõe encontros mensais para a exibição e debate de obras cinematográficas que tocam o cerne da experiência humana, utilizando o cinema como um dispositivo clínico e social para pensar a subjetividade, a cultura e o mal-estar contemporâneo.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
              Busca-mos transpor os conceitos dos consultórios e livros para a tela, promovendo uma análise profunda sobre como o desejo, o trauma e o laço social se manifestam na ficção e na realidade.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass"
            style={{ padding: '40px', borderRadius: '40px' }}
          >
            <h3 className="outfit" style={{ fontSize: '1.5rem', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Film color="var(--secondary)" /> Informações Gerais
            </h3>
            
            <div style={{ display: 'grid', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={20} color="var(--secondary)" />
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', opacity: 0.5, display: 'block' }}>Horário</span>
                  <span style={{ fontWeight: 700 }}>10:00h</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={20} color="var(--secondary)" />
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', opacity: 0.5, display: 'block' }}>Público</span>
                  <span style={{ fontWeight: 700 }}>Estudantes, profissionais e interessados</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquare size={20} color="var(--secondary)" />
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', opacity: 0.5, display: 'block' }}>Dinâmica</span>
                  <span style={{ fontWeight: 700 }}>Apresentação + Debate Teórico</span>
                </div>
              </div>

              <div style={{ marginTop: '10px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '20px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', opacity: 0.5, display: 'block', marginBottom: '15px' }}>Organização</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {organizers.map(org => (
                    <span key={org} style={{ background: 'var(--primary)', color: 'white', padding: '6px 15px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 600 }}>
                      {org}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div style={{ marginBottom: '80px' }}>
          <h2 className="outfit" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '50px' }}>Programação 2026</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {schedule.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass"
                style={{ overflow: 'hidden', borderRadius: '32px' }}
              >
                <div style={{ height: '450px', position: 'relative' }}>
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'var(--secondary)', color: 'white', padding: '8px 15px', borderRadius: '12px', fontWeight: 800, fontSize: '0.8rem' }}>
                    {item.month}
                  </div>
                </div>
                <div style={{ padding: '30px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary)', marginBottom: '10px', fontWeight: 700, fontSize: '0.9rem' }}>
                    <Calendar size={16} /> {item.date}
                  </div>
                  <h3 className="outfit" style={{ fontSize: '1.8rem', marginBottom: '15px' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{item.synopsis}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div id="inscricao" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="glass" style={{ padding: '40px', borderRadius: '40px', textAlign: 'center' }}>
            <h3 className="outfit" style={{ fontSize: '2rem', marginBottom: '20px' }}>Inscrições</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Preencha o formulário abaixo para garantir sua vaga no próximo encontro.</p>
            <div style={{ overflow: 'hidden', borderRadius: '24px', background: '#f8fafc' }}>
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSc0CMEGG6TnwYImzYYSqu7Pqx9UJG2YpCfr87o_XMfyOToXXQ/viewform?embedded=true" 
                width="100%" 
                height="800" 
                frameBorder="0" 
                marginHeight={0} 
                marginWidth={0}
              >
                Carregando…
              </iframe>
            </div>
          </div>
        </div>
      </Section>

      {/* Floating CTA */}
      <motion.a 
        href="#inscricao"
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-primary floating-cta"
        style={{ 
          position: 'fixed', 
          bottom: '40px', 
          right: '40px', 
          zIndex: 99, 
          borderRadius: '100px', 
          padding: '18px 35px', 
          boxShadow: '0 15px 35px rgba(10, 17, 40, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '1.1rem',
          fontWeight: 800
        }}
      >
        Garantir minha vaga <ArrowRight size={22} />
      </motion.a>
    </div>
  );
};

export default CinePraxis;
