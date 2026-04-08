import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';

// Pages
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Formacao from './pages/Formacao';
import Agenda from './pages/Agenda';
import Clinica from './pages/Clinica';
import Membros from './pages/Membros';
import Loja from './pages/Loja';
import CinePraxis from './pages/CinePraxis';
import Admin from './pages/Admin';

// Helper to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  useEffect(() => {
    // Sync Favicon with Admin Logo
    const unsub = onSnapshot(doc(db, 'site_config', 'media'), (snapshot) => {
      if (snapshot.exists() && snapshot.data().logo) {
        const link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
        if (link) {
          link.href = snapshot.data().logo;
        }
      }
    });
    return () => unsub();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/formacao" element={<Formacao />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/clinica" element={<Clinica />} />
            <Route path="/membros" element={<Membros />} />
            <Route path="/loja" element={<Loja />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/cinepraxis" element={<CinePraxis />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
