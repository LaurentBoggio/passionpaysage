"use client";
import { useState, useEffect } from 'react';
import { Leaf, Scissors, TreePine, Menu, X, Phone, Star, MapPin, CheckCircle, Send, Loader2 } from 'lucide-react';

export default function LandscaperPro() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState('idle'); // idle | loading | success

  // Effet pour le header collant au scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

// Dans votre composant LandscaperPro, remplacez l'ancienne fonction handleSubmit par celle-ci :
const handleSubmit = async (e) => {
  e.preventDefault();
  setFormStatus('loading');

  const formData = {
    name: e.target[0].value,
    email: e.target[1].value,
    message: e.target[2].value,
  };

  try {
    const response = await fetch('/api/send', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      setFormStatus('success');
      e.target.reset(); // Vide le formulaire
    } else {
      setFormStatus('idle');
      alert("Erreur lors de l'envoi.");
    }
  } catch (error) {
    setFormStatus('idle');
    console.error(error);
  }
  
  setTimeout(() => setFormStatus('idle'), 5000);
};


  return (
    <div className="bg-slate-50 font-sans scroll-smooth">
      {/* --- NAVIGATION DYNAMIQUE --- */}
      <nav className={`fixed w-full z-[100] transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-6"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className={`flex items-center gap-2 font-black text-2xl tracking-tighter transition-colors ${
            isScrolled ? "text-emerald-800" : "text-white"
          }`}>
            <Leaf className="fill-emerald-500 text-emerald-500" /> VERT-DESIGN
          </div>
          
          <div className="hidden md:flex gap-8 items-center font-bold text-sm uppercase tracking-widest">
            {['Services', 'Réalisations', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className={`hover:text-emerald-500 transition ${
                isScrolled ? "text-slate-700" : "text-white/90"
              }`}>{item}</a>
            ))}
            <a href="tel:0400000000" className="bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 shadow-xl flex items-center gap-2">
              <Phone size={18} /> 04 00 00 00 00
            </a>
          </div>

          <button className="md:hidden text-emerald-500" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Menu Mobile Overlay */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold py-2 border-b">Services</a>
            <a href="#réalisations" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold py-2 border-b">Projets</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold py-2">Contact</a>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="images.unsplash.com" alt="Landscape" className="w-full h-full object-cover scale-105 animate-slow-zoom" />
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/60 via-transparent to-black/20" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <h1 className="text-6xl md:text-9xl font-black text-white mb-8 leading-[0.9] tracking-tighter drop-shadow-2xl">
            Jardins <br/> <span className="text-emerald-400 italic font-serif">d'Exception</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Création de paysages haut de gamme pour résidences privées. Expertise certifiée 2025.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="#contact" className="bg-emerald-500 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition shadow-2xl">Commencer mon projet</a>
            <a href="#réalisations" className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition">Voir la galerie</a>
          </div>
        </div>
      </section>

      {/* --- SERVICES AVEC EFFET HOVER --- */}
      <section id="services" className="py-32 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:sticky lg:top-32 h-fit">
            <h2 className="text-emerald-600 font-black uppercase tracking-widest text-sm mb-4 italic">Nos compétences</h2>
            <p className="text-5xl font-black text-slate-900 leading-tight mb-8">Nous façonnons la nature avec précision.</p>
            <div className="h-2 w-24 bg-emerald-500 rounded-full"></div>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: <TreePine />, title: "Aménagement", desc: "Création de jardins thématiques (Zen, Méditerranéen, Moderne)." },
              { icon: <Scissors />, title: "Élagage expert", desc: "Taille raisonnée et soins des arbres centenaires." },
              { icon: <MapPin />, title: "Terrassement", desc: "Pavage en pierre naturelle et murets paysagers." },
              { icon: <Star />, title: "Lumière & Eau", desc: "Éclairage LED basse consommation et bassins connectés." }
            ].map((s, i) => (
              <div key={i} className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className="text-emerald-500 mb-6 bg-emerald-50 w-14 h-14 rounded-xl flex items-center justify-center">{s.icon}</div>
                <h3 className="text-2xl font-extrabold text-slate-800 mb-3">{s.title}</h3>
                <p className="text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FORMULAIRE DE CONTACT FONCTIONNEL --- */}
      <section id="contact" className="py-32 bg-emerald-950 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6">Prêt à transformer votre extérieur ?</h2>
            <p className="text-emerald-200/70 text-lg italic">Étude personnalisée et devis gratuit sous 48h.</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 p-8 md:p-12 rounded-[2rem] border border-white/10 backdrop-blur-xl">
            <input type="text" placeholder="Nom complet" required className="bg-white/10 border border-white/20 rounded-xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none transition" />
            <input type="email" placeholder="Email" required className="bg-white/10 border border-white/20 rounded-xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none transition" />
            <div className="md:col-span-2">
              <textarea placeholder="Décrivez votre projet (ex: Terrasse de 40m², jardin sec...)" rows="4" className="w-full bg-white/10 border border-white/20 rounded-xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none transition"></textarea>
            </div>
            <button 
              disabled={formStatus !== 'idle'}
              className="md:col-span-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-800 text-white font-black py-5 rounded-xl transition flex items-center justify-center gap-3 text-lg"
            >
              {formStatus === 'idle' && <><Send size={20} /> Envoyer ma demande</>}
              {formStatus === 'loading' && <><Loader2 className="animate-spin" /> Envoi en cours...</>}
              {formStatus === 'success' && <><CheckCircle /> Demande reçue !</>}
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-slate-900 py-12 text-slate-500 text-center border-t border-white/5">
        <p>© 2025 Vert-Design - Architectes du Paysage. Tous droits réservés.</p>
      </footer>

      {/* CSS Animé pour le zoom doux du Hero */}
      <style jsx global>{`
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate ease-in-out;
        }
      `}</style>
    </div>
  );
}

