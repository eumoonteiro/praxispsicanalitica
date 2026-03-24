
import { Instagram, Linkedin, Facebook, Phone, Mail, Shield, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: 'var(--primary)', color: 'white', padding: '100px 0 40px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '80px', marginBottom: '80px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
              <img src="/logo-icon-light.png" alt="Logo" style={{ height: '50px' }} />
              <span className="outfit" style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-1px' }}>Práxis</span>
            </div>
            <p style={{ opacity: 0.6, fontSize: '1rem', lineHeight: '1.8', maxWidth: '300px' }}>
              Movimento baseado nos fundamentos psicanalíticos: ensino, transmissão e pesquisa.
            </p>
          </div>
          
          <div>
            <h4 className="outfit" style={{ color: 'white', marginBottom: '30px', fontSize: '1.2rem' }}>Acesso Rápido</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <li><Link to="/sobre" style={{ color: 'white', opacity: 0.6 }}>Sobre o Movimento</Link></li>
              <li><Link to="/membros" style={{ color: 'white', opacity: 0.6 }}>Nossos Membros</Link></li>
              <li><Link to="/agenda" style={{ color: 'white', opacity: 0.6 }}>Agenda de Eventos</Link></li>
              <li><Link to="/clinica" style={{ color: 'white', opacity: 0.6 }}>Clínica Social</Link></li>
              <li><Link to="/loja" style={{ color: 'white', opacity: 0.6 }}>Revista & Loja</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="outfit" style={{ color: 'white', marginBottom: '30px', fontSize: '1.2rem' }}>Fale Conosco</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <a href="https://wa.me/5521964322455" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'white', opacity: 0.6 }}>
                <Phone size={20} color="var(--accent)" /> (21) 96432-2455
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'white', opacity: 0.6 }}>
                <Mail size={20} color="var(--accent)" /> comunicacao@praxispsicanalitica.com.br
              </div>
              <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                <a href="https://www.instagram.com/praxispsicanalitica" target="_blank" style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <Instagram size={20} />
                </a>
                <a href="https://www.facebook.com/praxispsicanaliticaoficial" target="_blank" style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <Facebook size={20} />
                </a>
                <a href="https://www.linkedin.com/company/praxispsicanalítica/" target="_blank" style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <Linkedin size={20} />
                </a>
                <a href="https://www.youtube.com/channel/UC15JYvRV00cuJRL8aGmiRWA" target="_blank" style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          paddingTop: '40px', 
          borderTop: '1px solid rgba(255,255,255,0.1)',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ opacity: 0.4, fontSize: '0.9rem' }}>
            © {new Date().getFullYear()} Práxis Psicanalítica. Todos os direitos reservados.
          </div>
          <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.4, fontSize: '0.85rem', color: 'white' }}>
            <Shield size={14} /> Acesso Administrativo
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
