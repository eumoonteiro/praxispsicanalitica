import { useState, useEffect } from 'react';
import { Users, Calendar, Trash2, Lock, LogOut, Upload, Link as LinkIcon, Clock, DollarSign, User, Briefcase, Image as ImageIcon, Edit2 } from 'lucide-react';
import { db, storage } from '../firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface Member {
  id: string;
  name: string;
  role: string;
  photo?: string;
}

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

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'membros' | 'agenda' | 'gestao' | 'media'>('membros');
  const [loading, setLoading] = useState(false);

  // Member State
  const [membros, setMembros] = useState<Member[]>([]);
  const [newMember, setNewMember] = useState({ name: '', role: 'Membro Associado', photo: '' });
  const [memberFile, setMemberFile] = useState<File | null>(null);

  // Agenda State
  const [agenda, setAgenda] = useState<EventItem[]>([]);
  const [newEvent, setNewEvent] = useState({ 
    title: '', 
    organizer: '', 
    schedule: '', 
    periodicity: 'Semanal', 
    price: '', 
    formLink: '',
    cardUrl: '',
    syllabus: '',
    notebookUrl: ''
  });
  const [eventFile, setEventFile] = useState<File | null>(null);
  const [notebookFile, setNotebookFile] = useState<File | null>(null);

  // Gestão State
  const [gestao, setGestao] = useState<any[]>([]);
  const [newGestao, setNewGestao] = useState({ name: '', role: '', lattes: '', photo: '' });
  const [gestaoFile, setGestaoFile] = useState<File | null>(null);

  // Media Settings State (logo, hero banners, etc)
  const [mediaSettings, setMediaSettings] = useState<any>({});
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [selectedMediaType, setSelectedMediaType] = useState('logo');

  // Editing State
  const [editingId, setEditingId] = useState<string | null>(null);

  // Authentication & Data Initial Load
  useEffect(() => {
    const auth = sessionStorage.getItem('praxis_auth');
    if (auth === 'true') setIsAuthenticated(true);

    // Real-time Members
    const unsubMembros = onSnapshot(query(collection(db, 'membros'), orderBy('name')), (snapshot) => {
      setMembros(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Member)));
    });

    // Real-time Agenda
    const unsubAgenda = onSnapshot(query(collection(db, 'agenda')), (snapshot) => {
      setAgenda(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EventItem)));
    });

    // Real-time Gestao
    const unsubGestao = onSnapshot(query(collection(db, 'gestao')), (snapshot) => {
      setGestao(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Site Media Config
    const unsubMedia = onSnapshot(doc(db, 'site_config', 'media'), (snapshot) => {
      if (snapshot.exists()) setMediaSettings(snapshot.data());
    });

    return () => {
      unsubMembros();
      unsubAgenda();
      unsubGestao();
      unsubMedia();
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'praxis2021@2025') {
      setIsAuthenticated(true);
      sessionStorage.setItem('praxis_auth', 'true');
    } else {
      alert('Senha incorreta');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('praxis_auth');
  };

  // Upload Function
  const uploadImage = async (file: File, path: string) => {
    // Normalize filename: lowercase, remove spaces/special chars
    const extension = file.name.split('.').pop();
    const cleanName = file.name.split('.')[0]
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
    
    const finalName = `${Date.now()}_${cleanName}.${extension}`;
    const storageRef = ref(storage, `${path}/${finalName}`);
    
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name) return;
    setLoading(true);
    try {
      let photoUrl = newMember.photo;
      if (memberFile) {
        photoUrl = await uploadImage(memberFile, 'membros');
      }
      
      if (editingId) {
        await setDoc(doc(db, 'membros', editingId), { ...newMember, photo: photoUrl });
        alert('Membro atualizado!');
      } else {
        await addDoc(collection(db, 'membros'), { ...newMember, photo: photoUrl });
        alert('Membro cadastrado!');
      }
      
      setNewMember({ name: '', role: 'Membro Associado', photo: '' });
      setMemberFile(null);
      setEditingId(null);
    } catch (err: any) {
      alert(`Erro: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const startEditMember = (m: Member) => {
    setNewMember({ name: m.name, role: m.role, photo: m.photo || '' });
    setEditingId(m.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title) return;
    setLoading(true);
    try {
      let cardUrl = newEvent.cardUrl;
      if (eventFile) {
        cardUrl = await uploadImage(eventFile, 'agenda');
      }

      let notebookUrl = newEvent.notebookUrl;
      if (notebookFile) {
        notebookUrl = await uploadImage(notebookFile, 'cadernos');
      }
      
      const eventData = { ...newEvent, cardUrl, notebookUrl };
      
      if (editingId) {
        await setDoc(doc(db, 'agenda', editingId), eventData);
        alert('Evento atualizado!');
      } else {
        await addDoc(collection(db, 'agenda'), eventData);
        alert('Evento publicado!');
      }

      setNewEvent({ title: '', organizer: '', schedule: '', periodicity: 'Semanal', price: '', formLink: '', cardUrl: '', syllabus: '', notebookUrl: '' });
      setEventFile(null);
      setNotebookFile(null);
      setEditingId(null);
    } catch (err: any) {
      alert(`Erro: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const startEditEvent = (ev: EventItem) => {
    setNewEvent({ 
      title: ev.title, 
      organizer: ev.organizer, 
      schedule: ev.schedule, 
      periodicity: ev.periodicity, 
      price: ev.price, 
      formLink: ev.formLink, 
      cardUrl: ev.cardUrl || '',
      syllabus: ev.syllabus || '',
      notebookUrl: ev.notebookUrl || ''
    });
    setEditingId(ev.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteItem = async (collectionName: string, id: string) => {
    if (confirm('Tem certeza que deseja excluir?')) {
      await deleteDoc(doc(db, collectionName, id));
    }
  };

  const handleSaveGestao = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGestao.name) return;
    setLoading(true);
    try {
      let photoUrl = newGestao.photo;
      if (gestaoFile) {
        photoUrl = await uploadImage(gestaoFile, 'gestao');
      }

      if (editingId) {
        await setDoc(doc(db, 'gestao', editingId), { ...newGestao, photo: photoUrl });
        alert('Gestão atualizada!');
      } else {
        await addDoc(collection(db, 'gestao'), { ...newGestao, photo: photoUrl });
        alert('Gestão adicionada!');
      }

      setNewGestao({ name: '', role: '', lattes: '', photo: '' });
      setGestaoFile(null);
      setEditingId(null);
    } catch (err: any) {
      alert('Erro ao salvar');
    } finally {
      setLoading(false);
    }
  };

  const startEditGestao = (g: any) => {
    setNewGestao({ name: g.name, role: g.role, lattes: g.lattes, photo: g.photo || '' });
    setEditingId(g.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Update Site Media
  const handleUpdateMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaFile) return;
    setLoading(true);
    try {
      const url = await uploadImage(mediaFile, 'site_media');
      const { setDoc } = await import('firebase/firestore');
      await setDoc(doc(db, 'site_config', 'media'), { [selectedMediaType]: url }, { merge: true });
      setMediaFile(null);
      alert('Media atualizada!');
    } catch (err: any) {
      alert('Erro ao atualizar media');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4f8' }}>
        <div className="admin-card" style={{ maxWidth: '450px', width: '90%', textAlign: 'center', padding: '60px 40px' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 40px', color: 'var(--secondary)' }}>
            <Lock size={40} />
          </div>
          <h1 className="outfit" style={{ fontSize: '2rem', marginBottom: '12px' }}>Acesso Restrito</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Autentique-se para gerenciar o movimento Práxis.</p>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input 
                type="password" 
                className="form-control" 
                placeholder="Palavra-passe" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ textAlign: 'center', fontSize: '1.2rem', padding: '18px' }}
                autoFocus
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '18px' }}>
              Entrar no Painel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="container mobile-grid" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '40px' }}>
        
        {/* Sidebar */}
        <aside className="admin-sidebar" style={{ height: 'fit-content', position: 'sticky', top: '140px' }}>
          <div style={{ marginBottom: '40px', padding: '0 10px' }}>
            <h2 className="outfit" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>Práxis Control</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Gerenciamento Firebase</p>
          </div>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { id: 'membros', icon: Users, label: 'Corpo de Membros' },
              { id: 'agenda', icon: Calendar, label: 'Eventos & Agenda' },
              { id: 'gestao', icon: Briefcase, label: 'Gestão Práxis' },
              { id: 'media', icon: ImageIcon, label: 'Imagens do Site' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  width: '100%',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  padding: '16px 20px',
                  borderRadius: '16px'
                }}
              >
                <tab.icon size={20} /> <span style={{ fontSize: '1rem' }}>{tab.label}</span>
              </button>
            ))}
            
            <button 
              onClick={handleLogout}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                width: '100%',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                padding: '16px 20px',
                borderRadius: '16px',
                marginTop: '40px',
                color: '#ef4444',
                background: 'transparent',
                fontWeight: 600
              }}
            >
              <LogOut size={20} /> Sair do Painel
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <main>
          {activeTab === 'membros' && (
            <div className="fade-in">
              <h1 className="outfit" style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Gerenciar Membros</h1>
              <div className="admin-card">
                <h3 className="outfit" style={{ marginBottom: '24px', fontSize: '1.2rem' }}>{editingId ? 'Editar Membro' : 'Novo Membro'}</h3>
                <form onSubmit={handleSaveMember} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label>Nome Completo</label>
                    <input className="form-control" placeholder="Ex: Dra. Maria Silva" value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Categoria</label>
                    <select className="form-control" value={newMember.role} onChange={e => setNewMember({...newMember, role: e.target.value})}>
                      <option value="Membro Efetivo">Membro Efetivo</option>
                      <option value="Membro Associado">Membro Associado</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label>Foto do Membro (Upload)</label>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                      <label className="btn" style={{ background: 'var(--accent-glow)', color: 'var(--secondary)', flex: 1, cursor: 'pointer' }}>
                        <Upload size={18} /> {memberFile ? memberFile.name : 'Selecionar Imagem'}
                        <input type="file" style={{ display: 'none' }} accept="image/*" onChange={e => setMemberFile(e.target.files?.[0] || null)} />
                      </label>
                      {memberFile && <button type="button" onClick={() => setMemberFile(null)} className="btn" style={{ background: '#fee2e2', color: '#ef4444' }}><Trash2 size={18}/></button>}
                    </div>
                  </div>
                  <button type="submit" disabled={loading} className="btn btn-primary" style={{ gridColumn: 'span 2', padding: '16px' }}>
                    {loading ? 'Processando...' : (editingId ? 'Atualizar Dados' : 'Cadastrar no Firebase')}
                  </button>
                  {editingId && <button type="button" onClick={() => {setEditingId(null); setNewMember({name:'', role:'Membro Associado', photo:''})}} className="btn" style={{ gridColumn: 'span 2' }}>Cancelar Edição</button>}
                </form>
              </div>

              <div className="admin-card">
                <h3 className="outfit" style={{ marginBottom: '24px', fontSize: '1.2rem' }}>Lista de Cadastro</h3>
                {membros.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', opacity: 0.5, border: '2px dashed #eee', borderRadius: '24px' }}>
                    <Users size={40} style={{ margin: '0 auto 15px' }} />
                    <p>Nenhum membro encontrado no banco de dados.</p>
                    <p style={{ fontSize: '0.8rem' }}>Dica: Verifique se as regras do Firestore foram publicadas.</p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                    {membros.map(m => (
                      <div key={m.id} className="glass" style={{ padding: '25px', borderRadius: '24px', textAlign: 'center', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '5px' }}>
                          <button onClick={() => startEditMember(m)} style={{ color: 'var(--secondary)', background: 'none', border: 'none', cursor: 'pointer' }}><Edit2 size={16}/></button>
                          <button onClick={() => deleteItem('membros', m.id)} style={{ color: '#ff4444', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={16}/></button>
                        </div>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#eee', margin: '0 auto 15px', overflow: 'hidden' }}>
                          {m.photo ? <img src={m.photo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={m.name} /> : <Users size={30} style={{ marginTop: '25px', opacity: 0.3 }} />}
                        </div>
                        <h4 className="outfit" style={{ fontSize: '1.1rem' }}>{m.name}</h4>
                        <p style={{ fontSize: '0.7rem', color: 'var(--secondary)', fontWeight: 800 }}>{m.role}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'agenda' && (
            <div className="fade-in">
              <h1 className="outfit" style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Agenda & Eventos</h1>
              <div className="admin-card">
                <h3 className="outfit" style={{ marginBottom: '24px', fontSize: '1.2rem' }}>{editingId ? 'Editar Evento' : 'Novo Card de Divulgação'}</h3>
                <form onSubmit={handleSaveEvent} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label>Título do Evento</label>
                    <input className="form-control" placeholder="Ex: Seminário de Verão" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Organizador</label>
                    <div style={{ position: 'relative' }}><input className="form-control" style={{ paddingLeft: '45px' }} placeholder="Nome do analista" value={newEvent.organizer} onChange={e => setNewEvent({...newEvent, organizer: e.target.value})} /><User size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} /></div>
                  </div>
                  <div className="form-group">
                    <label>Dias e Horário</label>
                    <div style={{ position: 'relative' }}><input className="form-control" style={{ paddingLeft: '45px' }} placeholder="Ex: Segundas, 19h às 21h" value={newEvent.schedule} onChange={e => setNewEvent({...newEvent, schedule: e.target.value})} /><Clock size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} /></div>
                  </div>
                  <div className="form-group">
                    <label>Periodicidade</label>
                    <select className="form-control" value={newEvent.periodicity} onChange={e => setNewEvent({...newEvent, periodicity: e.target.value})}>
                      <option value="Semanal">Semanal</option>
                      <option value="Quinzenal">Quinzenal</option>
                      <option value="Encontro Único">Encontro Único</option>
                      <option value="Mensal">Mensal</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Valor para Participante Externo</label>
                    <div style={{ position: 'relative' }}><input className="form-control" style={{ paddingLeft: '45px' }} placeholder="Ex: R$ 150,00" value={newEvent.price} onChange={e => setNewEvent({...newEvent, price: e.target.value})} /><DollarSign size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} /></div>
                  </div>
                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label>Link do Formulário de Inscrição</label>
                    <div style={{ position: 'relative' }}><input className="form-control" style={{ paddingLeft: '45px' }} placeholder="https://docs.google.com/forms/..." value={newEvent.formLink} onChange={e => setNewEvent({...newEvent, formLink: e.target.value})} /><LinkIcon size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} /></div>
                  </div>
                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label>Ementa / Sobre o Evento (Opcional)</label>
                    <textarea className="form-control" rows={4} placeholder="Descreva os temas que serão abordados..." value={newEvent.syllabus} onChange={e => setNewEvent({...newEvent, syllabus: e.target.value})} style={{ resize: 'vertical' }}></textarea>
                  </div>
                  <div className="form-group">
                    <label>Card de Divulgação (Imagem)</label>
                    <label className="btn" style={{ background: 'var(--accent-glow)', color: 'var(--secondary)', width: '100%', cursor: 'pointer' }}>
                      <Upload size={18} /> {eventFile ? eventFile.name : 'Selecionar Card'}
                      <input type="file" style={{ display: 'none' }} accept="image/*" onChange={e => setEventFile(e.target.files?.[0] || null)} />
                    </label>
                  </div>
                  <div className="form-group">
                    <label>Caderno de Atividades (PDF)</label>
                    <label className="btn" style={{ background: 'var(--accent-glow)', color: 'var(--secondary)', width: '100%', cursor: 'pointer' }}>
                      <Upload size={18} /> {notebookFile ? notebookFile.name : 'Subir PDF do Caderno'}
                      <input type="file" style={{ display: 'none' }} accept=".pdf" onChange={e => setNotebookFile(e.target.files?.[0] || null)} />
                    </label>
                  </div>
                  <button type="submit" disabled={loading} className="btn btn-primary" style={{ gridColumn: 'span 2', padding: '16px' }}>
                    {loading ? 'Processando...' : 'Publicar na Agenda'}
                  </button>
                </form>
              </div>

              <div className="admin-card">
                {agenda.map(ev => (
                  <div key={ev.id} className="glass" style={{ padding: '20px', borderRadius: '16px', marginBottom: '15px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <img src={ev.cardUrl} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} alt="Card" />
                    <div style={{ flex: 1 }}>
                      <h4 className="outfit" style={{ fontSize: '1.1rem' }}>{ev.title}</h4>
                      <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>{ev.organizer} • {ev.schedule}</p>
                    </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => startEditEvent(ev)} style={{ color: 'var(--secondary)', background: 'none', border: 'none', cursor: 'pointer' }}><Edit2 size={20}/></button>
                        <button onClick={() => deleteItem('agenda', ev.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={20}/></button>
                      </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'gestao' && (
            <div className="fade-in">
              <h1 className="outfit" style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Gestão & Coordenação</h1>
              <div className="admin-card">
                <h3 className="outfit" style={{ marginBottom: '24px', fontSize: '1.2rem' }}>{editingId ? 'Editar Membro Gestão' : 'Adicionar Membro da Gestão'}</h3>
                <form onSubmit={handleSaveGestao} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label>Nome Completo</label>
                    <input className="form-control" value={newGestao.name} onChange={e => setNewGestao({...newGestao, name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Cargo/Papel</label>
                    <input className="form-control" placeholder="Ex: Coordenação Geral" value={newGestao.role} onChange={e => setNewGestao({...newGestao, role: e.target.value})} />
                  </div>
                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label>Link Currículo Lattes</label>
                    <input className="form-control" placeholder="http://lattes.cnpq.br/..." value={newGestao.lattes} onChange={e => setNewGestao({...newGestao, lattes: e.target.value})} />
                  </div>
                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label>Foto de Perfil</label>
                    <input type="file" accept="image/*" onChange={e => setGestaoFile(e.target.files?.[0] || null)} />
                  </div>
                  <button type="submit" disabled={loading} className="btn btn-primary" style={{ gridColumn: 'span 2' }}>{loading ? 'Processando...' : 'Salvar na Gestão'}</button>
                </form>
              </div>
              <div className="admin-card">
                <div style={{ display: 'grid', gap: '15px' }}>
                  {gestao.map(g => (
                    <div key={g.id} className="glass" style={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                       <img src={g.photo} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} alt="G" />
                       <div style={{ flex: 1 }}>
                          <strong>{g.name}</strong> • {g.role}
                       </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                           <button onClick={() => startEditGestao(g)} className="btn" style={{ background: 'var(--accent-glow)', color: 'var(--secondary)', padding: '10px' }}><Edit2 size={16}/></button>
                           <button onClick={() => deleteItem('gestao', g.id)} className="btn" style={{ background: '#fee2e2', color: '#ef4444', padding: '10px' }}><Trash2 size={16}/></button>
                        </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="fade-in">
              <h1 className="outfit" style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Imagens em Destaque</h1>
              <div className="admin-card">
                <p style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>Escolha qual imagem do site você deseja alterar.</p>
                <form onSubmit={handleUpdateMedia}>
                  <div className="form-group">
                    <label>Onde aplicar esta imagem?</label>
                    <select className="form-control" value={selectedMediaType} onChange={e => setSelectedMediaType(e.target.value)}>
                      <option value="logo">Logo do Cabeçalho</option>
                      <option value="hero_bg">Fundo da Página Inicial</option>
                      <option value="about_photo">Foto Histórica (Sobre)</option>
                      <option value="general_notebook">Caderno de Atividades Geral (PDF)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Selecione o arquivo (Imagem ou PDF)</label>
                    <input type="file" className="form-control" accept="image/*,.pdf" onChange={e => setMediaFile(e.target.files?.[0] || null)} />
                  </div>
                  <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%' }}>{loading ? 'Enviando...' : 'Atualizar Imagem no Site'}</button>
                </form>
              </div>

              <div className="admin-card">
                 <h3 className="outfit">Imagens Atuais</h3>
                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
                    {Object.keys(mediaSettings).map(key => (
                      <div key={key} className="glass" style={{ padding: '15px', borderRadius: '15px' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase' }}>{key}</span>
                        <img src={mediaSettings[key]} style={{ width: '100%', height: '120px', objectFit: 'contain', marginTop: '10px', background: '#f9f9f9', borderRadius: '10px' }} alt="Media" />
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
