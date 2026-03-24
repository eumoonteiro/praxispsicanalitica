
import Section from '../components/Section';
import { ShoppingCart, Share2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Loja = () => {
  const books = [
    {
      title: "O psicanalista na pólis",
      author: "Rosane de A. Costa (Org.)",
      image: "/livro-polis.png",
      desc: "Ética, política e produção subjetiva."
    },
    {
      title: "Política e Psicanálise",
      author: "Bárbara Breder",
      image: "/livro-politica.png",
      desc: "(Des)encontros entre Lacan e Foucault."
    },
    {
      title: "O Desejo do Analista",
      author: "Andrei Albuquerque",
      image: "/livro-desejo.png",
      desc: "E a subversão da contratransferência."
    }
  ];

  return (
    <div className="page-transition-wrapper" style={{ paddingTop: '100px' }}>
      <Section id="loja-items" title="Loja & Publicações" subtitle="Obras produzidas por nossos membros e parceiros.">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          <motion.div 
            whileHover={{ y: -15 }}
            className="glass" 
            style={{ padding: '40px', borderRadius: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'var(--primary)', color: 'white' }}
          >
            <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
              <ShoppingCart size={36} color="white" />
            </div>
            <h3 className="outfit" style={{ fontSize: '1.8rem', color: 'white', marginBottom: '15px' }}>Revista Práxis</h3>
            <p style={{ opacity: 0.7, marginBottom: '30px', lineHeight: '1.6' }}>Acesse nossa produção teórica e clínica oficial através do portal da revista.</p>
            <a 
              href="https://revistapraxispsicanalitica.com.br" 
              target="_blank" 
              className="btn" 
              style={{ background: 'white', color: 'var(--primary)', width: '100%', borderRadius: '100px' }}
            >
              Visitar Revista <ArrowRight size={18} />
            </a>
          </motion.div>

          {books.map((book, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -15 }}
              className="glass" 
              style={{ padding: '30px', borderRadius: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            >
              <div style={{ width: '100%', aspectRatio: '2/3', borderRadius: '16px', overflow: 'hidden', marginBottom: '25px', boxShadow: 'var(--shadow-lg)' }}>
                <img src={book.image} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '8px' }}>{book.title}</h3>
              <p style={{ color: 'var(--secondary)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '12px' }}>{book.author}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>{book.desc}</p>
              
              <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: 'auto' }}>
                <a 
                  href="https://wa.me/5521964322455" 
                  target="_blank" 
                  className="btn btn-primary" 
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                >
                  <ShoppingCart size={18} /> Comprar
                </a>
                <button 
                  className="btn" 
                  style={{ padding: '12px', background: 'var(--accent-glow)', border: 'none', color: 'var(--secondary)' }}
                >
                  <Share2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="glass" style={{ marginTop: '80px', padding: '60px', borderRadius: '32px', textAlign: 'center', background: 'linear-gradient(135deg, white 0%, var(--accent-glow) 100%)' }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '20px' }}>Deseja divulgar seu livro aqui?</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 30px' }}>
            A Práxis apoia a produção científica e literária de seus membros. Entre em contato com a coordenação de comunicação para parcerias.
          </p>
          <a href="https://wa.me/5521964322455" target="_blank" className="btn btn-primary">Falar com Lucas Monteiro</a>
        </div>
      </Section>
    </div>
  );
};

export default Loja;
