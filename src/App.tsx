/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Calendar,
  MapPin,
  Phone,
  Clock,
  ChevronDown,
  Star,
  MessageCircle,
  ShieldCheck,
  Menu,
  X,
  Award,
  Droplet,
  ChevronRight,
  ArrowRight,
  Send,
  CheckCircle2
} from 'lucide-react';

import { TREATMENTS, FAQS, TESTIMONIALS, Treatment } from './data';
import SkinQuiz from './components/SkinQuiz';
import TreatmentModal from './components/TreatmentModal';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { AlesteticLogo } from './components/AlesteticLogo';

// Import generated premium assets (WebP for better performance)
import alesteticHero from './assets/images/alestetic_hero_1780755609656.webp';
import alesteticClinic from './assets/images/alestetic_clinic_1780755626959.webp';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'facial' | 'corporal' | 'premium'>('facial');
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [faqOpenId, setFaqOpenId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    treatment: 'Limpieza y Exfoliación Facial Profunda',
    date: '',
    time: '',
    message: ''
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Track scrolling to toggle navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filtered treatments
  const filteredTreatments = TREATMENTS.filter(t => t.category === activeCategory);

  // Form submission handler
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateWhatsAppLink = (treatmentName?: string) => {
    const phoneNum = import.meta.env.VITE_WHATSAPP_NUMBER || '573125554321';
    let text = '';
    
    if (treatmentName) {
      // Direct booking for a specific treatment
      text = `Hola Alestetic! 👋 Quisiera solicitar más información y agendar una sesión para el tratamiento: *${treatmentName}* que vi en su sitio web. ¿Qué horarios tienen disponibles?`;
    } else {
      // General booking form request
      text = `Hola Alestetic! 👋 Quisiera agendar mi valoración estética clínica:\n\n` +
             `*Nombre:* ${formData.name || 'Invitado'}\n` +
             `*Teléfono:* ${formData.phone || 'No especificado'}\n` +
             `*Tratamiento:* ${formData.treatment}\n` +
             `*Fecha estimada:* ${formData.date || 'Por acordar'}\n` +
             `*Hora:* ${formData.time || 'Por acordar'}\n` +
             `*Notas:* ${formData.message || 'Sin observaciones'}\n\n` +
             `¿Podrían confirmarme la disponibilidad en su sede Viva Envigado? 🏥✨`;
    }

    return `https://wa.me/${phoneNum}?text=${encodeURIComponent(text)}`;
  };

  const handleBookDirect = (treatmentName: string) => {
    const link = generateWhatsAppLink(treatmentName);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Beautiful mock registration message and then redirect to live WhatsApp
    setShowSuccessModal(true);
  };

  const handleConfirmWhatsAppRedirect = () => {
    const link = generateWhatsAppLink();
    window.open(link, '_blank', 'noopener,noreferrer');
    setShowSuccessModal(false);
    // Reset states
    setFormData({
      name: '',
      phone: '',
      treatment: 'Limpieza y Exfoliación Facial Profunda',
      date: '',
      time: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen feminine-gradient-mesh font-sans selection:bg-gold-200 selection:text-gold-950" id="alestetic-app">
      
      {/* Top micro-banner */}
      <div className="bg-clin-900 text-gold-100 py-1.5 px-4 text-center text-xs font-semibold tracking-wider flex items-center justify-center gap-2" id="top-promo-banner">
        <Sparkles className="h-3 w-3 animate-pulse text-gold-400" />
        <span>Sede Viva Envigado – Agendando citas de valoración para esta semana</span>
        <span className="hidden sm:inline bg-gold-500 text-clin-950 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ml-2">Promo Active</span>
      </div>

      {/* Main Premium Floating Header */}
      <header
        className={`fixed top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-40 rounded-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-md shadow-lg border border-gold-200 py-3.5 px-6 top-4'
            : 'bg-transparent py-5 px-6'
        }`}
        id="main-header"
      >
        <div className="flex items-center justify-between" id="navbar-container">
          {/* Brand Logo - Official Custom Vector Branding */}
          <a href="#inicio" className="flex items-center group select-none" id="logo-link">
            <AlesteticLogo variant="light" size="sm" className="transition-transform duration-300 hover:scale-102" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-clin-700" id="desktop-nav">
            <a href="#inicio" className="hover:text-gold-600 transition-colors uppercase tracking-wider">Inicio</a>
            <a href="#tratamientos" className="hover:text-gold-600 transition-colors uppercase tracking-wider">Tratamientos</a>
            <a href="#resultados-reales" className="hover:text-gold-600 transition-colors uppercase tracking-wider">Resultados</a>
            <a href="#diagnostico" className="hover:text-gold-600 transition-colors uppercase tracking-wider">Test de Piel</a>
            <a href="#sobre-nosotros" className="hover:text-gold-600 transition-colors uppercase tracking-wider">Nosotros</a>
            <a href="#testimonios" className="hover:text-gold-600 transition-colors uppercase tracking-wider">Opiniones</a>
            <a href="#faq" className="hover:text-gold-600 transition-colors uppercase tracking-wider">Preguntas</a>
          </nav>

          {/* Action CTA */}
          <div className="hidden md:flex items-center gap-3" id="header-cta-block">
            <a
              href="#reservar"
              className="px-5 py-2.5 rounded-full bg-clin-900 hover:bg-gold-600 text-white text-xs font-bold shadow-md shadow-clin-900/10 transition-colors flex items-center gap-2 cursor-pointer"
              id="header-cta-btn"
            >
              <Calendar className="h-3.5 w-3.5" />
              Agendar Valoración
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-full p-2 text-clin-950 hover:bg-gold-100 transition-colors"
            id="mobile-menu-toggle"
            aria-label="Abrir Menú"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white border border-gold-200 shadow-xl rounded-3xl mt-3 p-6 flex flex-col gap-4 z-40 md:hidden overflow-hidden"
              id="mobile-nav-drawer"
            >
              <nav className="flex flex-col gap-4 text-sm font-semibold text-clin-800" id="mobile-nav-links">
                <a
                  href="#inicio"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-gold-600 transition-colors border-b border-gold-100 pb-2"
                >
                  Inicio
                </a>
                <a
                  href="#tratamientos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-gold-600 transition-colors border-b border-gold-100 pb-2"
                >
                  Tratamientos
                </a>
                <a
                  href="#resultados-reales"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-gold-600 transition-colors border-b border-gold-100 pb-2"
                >
                  Resultados Reales
                </a>
                <a
                  href="#diagnostico"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-gold-600 transition-colors border-b border-gold-100 pb-2"
                >
                  Test de Tipo de Piel
                </a>
                <a
                  href="#sobre-nosotros"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-gold-600 transition-colors border-b border-gold-100 pb-2"
                >
                  Nosotros
                </a>
                <a
                  href="#testimonios"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-gold-600 transition-colors border-b border-gold-100 pb-2"
                >
                  Testimonios
                </a>
                <a
                  href="#faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-gold-600 transition-colors pb-1"
                >
                  Preguntas Frecuentes
                </a>
              </nav>

              <a
                href="#reservar"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-clin-900 text-white text-center text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-clin-900/10"
                id="mobile-nav-cta-btn"
              >
                <Calendar className="h-4 w-4" />
                Agendar Valoración
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>


      {/* Floating WhatsApp CTA — visible at all scroll depths */}
      <a
        href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '573125554321'}?text=${encodeURIComponent('Hola Alestetic! 👋 Quisiera información sobre sus tratamientos. ¿Me pueden ayudar?')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hablar por WhatsApp con Alestetic"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold text-xs px-4 py-3 rounded-full shadow-2xl shadow-green-500/40 transition-all duration-300 hover:scale-105"
        id="whatsapp-floating-btn"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">Hablar con asesora</span>
      </a>

      {/* 1. Hero Section */}
      <section className="relative pt-36 pb-20 md:py-40 bg-gradient-to-tr from-white via-rose-light/20 to-gold-100/30 overflow-hidden" id="inicio">
        {/* Decorative soft glowing elements in background */}
        <div className="absolute top-[15%] left-[5%] w-96 h-96 bg-rose-light/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-[35%] right-[2%] w-[500px] h-[500px] bg-gold-200/35 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10" id="hero-grid">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start" id="hero-text-block">
            {/* SEO H1 — visually hidden, semantically primary for crawlers */}
            <h1 className="sr-only">Centro de Estética Médica en Envigado – Tratamientos Faciales y Corporales con INVIMA | Alestetic Viva Envigado, Medellín</h1>

            {/* Upper Premium Badge */}
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-gold-600 bg-white/75 border border-gold-200/50 px-3.5 py-1.5 rounded-full mb-5 block shadow-xs">
              COSMETIC EXCELLENCE • SEDE VIVA ENVIGADO
            </span>

            {/* Main Visual Headline — design-first, H2 for correct hierarchy */}
            <h2 className="font-serif text-[42px] sm:text-[60px] lg:text-[76px] font-semibold tracking-tight text-clin-900 leading-[1.05] mb-6">
              Rigor Científico <br/>
              <span className="not-italic text-brand-gradient font-semibold block mt-1">Y Belleza Armónica.</span>
            </h2>

            {/* Supporting Copy */}
            <p className="text-base text-clin-700 leading-relaxed max-w-xl mb-8">
              En Alestetic renovamos tu confianza facial y corporal a través de metodologías personalizadas clínicamente validadas y aparatología médica certificada por el INVIMA. El máximo estándar en estética profesional del Centro Comercial Viva Envigado.
            </p>

            {/* Premium Highlights Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-9 w-full max-w-xl" id="hero-features-checklist">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-gold-100 flex items-center justify-center shrink-0">
                  <Droplet className="h-3 w-3 text-gold-600" />
                </div>
                <span className="text-xs font-bold text-clin-800">Equipos Certificados</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-rose-accent/40 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-3 w-3 text-rose-deep" />
                </div>
                <span className="text-xs font-bold text-clin-800">Médico Especialista</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-gold-100 flex items-center justify-center shrink-0">
                  <MapPin className="h-3 w-3 text-gold-600" />
                </div>
                <span className="text-xs font-bold text-clin-800">Sede Viva Envigado</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10" id="hero-navigation-ctas">
              <a
                href="#tratamientos"
                className="w-full sm:w-auto px-8 py-4 rounded-full text-white font-extrabold text-xs text-center shadow-lg cursor-pointer duration-300 transition-all flex items-center justify-center gap-2 uppercase tracking-widest boutique-button-primary"
                id="hero-cta-main"
              >
                Ver Tratamientos
                <ArrowRight className="h-4 w-4 text-white" />
              </a>

              <a
                href="#diagnostico"
                className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-gold-400/60 hover:border-gold-500 hover:bg-gold-50/90 text-gold-700 font-extrabold text-xs text-center duration-300 transition-all flex items-center justify-center gap-2 uppercase tracking-widest hover:text-clin-900"
                id="hero-cta-quiz"
              >
                Hacer Test de Piel
                <Sparkles className="h-4 w-4 text-gold-500" />
              </a>
            </div>

            {/* Timeless Artistry Stats Block */}
            <div className="flex items-center gap-6 sm:gap-10 pt-8 border-t border-gold-200 w-full max-w-xl" id="hero-stats-row">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-semibold text-clin-900 font-serif">15k+</span>
                <span className="text-[10px] uppercase tracking-wider text-clin-500 font-extrabold">Pacientes</span>
              </div>
              <div className="h-10 w-px bg-gold-300" />
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-semibold text-clin-900 font-serif">100%</span>
                <span className="text-[10px] uppercase tracking-wider text-clin-500 font-extrabold">Garantizado</span>
              </div>
              <div className="h-10 w-px bg-gold-300" />
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-semibold text-clin-900 font-serif">08+</span>
                <span className="text-[10px] uppercase tracking-wider text-clin-500 font-extrabold">Especialistas</span>
              </div>
            </div>
          </div>

          {/* Right Aesthetic Image Frame (Luxury Sanctuary Arch) */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center" id="hero-image-block">
            <div className="absolute inset-0 bg-gold-200 rounded-t-full translate-y-3 translate-x-3 -z-10" />
            <div className="absolute inset-0 bg-rose-accent/20 rounded-t-full -translate-y-2 -translate-x-2 -z-10" />

            <div className="relative w-full max-w-[380px] h-[480px] rounded-t-full overflow-hidden border-[10px] border-white bg-white shadow-2xl flex flex-col justify-end" id="hero-image-inner-container">
              <img
                src={alesteticHero}
                alt="Tratamiento facial clínico Alestetic – Centro de estética médica Viva Envigado, Medellín"
                fetchPriority="high"
                loading="eager"
                className="w-full h-full object-cover hover:scale-105 duration-700 transition-transform"
                referrerPolicy="no-referrer"
                id="img-hero-main"
              />

              {/* Float Glassmorphic overlay badge inside the image */}
              <div className="absolute bottom-5 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-gold-200 shadow-xl flex items-center justify-between" id="hero-floating-card">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-clin-900 text-gold-400 rounded-full flex items-center justify-center shadow-md">
                    <Droplet className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-clin-900 uppercase tracking-tight">Piel Radiante</p>
                    <p className="text-[10px] text-clin-600 font-medium">Resultados inmediatos</p>
                  </div>
                </div>
                <div className="text-right flex flex-col">
                  <span className="text-lg font-serif text-gold-600 font-black leading-none">98%</span>
                  <span className="text-[8px] text-clin-500 uppercase font-black tracking-wider">Satisfacción</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 2. Interactive Treatment Profile Assessment Quiz */}
      <section className="py-20 bg-gold-100/50 relative overflow-hidden" id="diagnostico">
        <div className="max-w-4xl mx-auto px-6" id="diagnostic-quiz-wrapper">
          <div className="text-center mb-10" id="quiz-intro-section">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-gold-600 block mb-3">TECNOLOGÍA INTELIGENTE</span>
            <h2 className="font-serif text-[32px] md:text-[50px] font-semibold tracking-tight text-clin-900 leading-[1.15]">
              ¿No sabes qué tratamiento necesitas?
            </h2>
            <p className="text-xs sm:text-sm text-clin-600 max-w-xl mx-auto mt-4">
              Responde 3 preguntas sencillas y recibe una recomendación experta y personalizada de nuestro catálogo estético en segundos.
            </p>
          </div>

          <SkinQuiz onBookTreatment={handleBookDirect} />
        </div>
      </section>


      {/* Specialty Treatment Highlight (Screenshot 2 Adaptations) */}
      <section className="py-20 bg-gradient-to-br from-gold-900 to-gold-800 text-white relative overflow-hidden" id="especialidad-criolipolisis">
        {/* Abstract wavy lines and rings representing localized cooling */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gold-300/10 rounded-full pointer-events-none animate-[spin_120s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold-300/15 rounded-full pointer-events-none animate-[spin_85s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-gold-400/20 rounded-full pointer-events-none animate-[spin_40s_linear_infinite]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-light/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10" id="criolipolisis-banner-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="criolipolisis-banner-grid">
            
            {/* Left info column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left" id="criolipolisis-left">
              <span className="text-[10px] uppercase font-black tracking-[0.4em] text-gold-300 bg-gold-900/50 border border-gold-500/30 px-3 py-1 rounded-full mb-4">
                TRATAMIENTO ESTRELLA CORPORAL
              </span>
              
              <h2 className="font-serif text-[38px] md:text-[56px] font-semibold tracking-tight leading-[1.05] mb-6">
                Eliminamos esa grasita<br />
                <span className="text-gold-200 font-semibold">que ya no quieres.</span>
              </h2>

              <p className="text-base text-gold-100/90 leading-relaxed max-w-xl mb-8">
                Nuestra tecnología de <strong className="text-white font-extrabold">Criolipólisis de Contorno Avanzada</strong> actúa congelando de forma controlada las células adiposas sin dañar la piel. Es la alternativa no quirúrgica preferida en Envigado para conseguir resultados permanentes y modelar tu contorno de manera saludable.
              </p>

              {/* Premium Perks list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 w-full max-w-lg" id="crio-perks">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-gold-700/80 border border-gold-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-gold-300" />
                  </div>
                  <span className="text-xs font-semibold text-gold-100">Sin cirugía ni dolor</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-gold-700/80 border border-gold-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-gold-300" />
                  </div>
                  <span className="text-xs font-semibold text-gold-100">Para abdomen, flancos y muslos</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-gold-700/80 border border-gold-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-gold-300" />
                  </div>
                  <span className="text-xs font-semibold text-gold-100">En solo 90 min por sesión</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-gold-700/80 border border-gold-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-gold-300" />
                  </div>
                  <span className="text-xs font-semibold text-gold-100">Retorno inmediato a actividades</span>
                </div>
              </div>

              {/* CTA trigger */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto" id="crio-actions">
                <button
                  onClick={() => handleBookDirect("Criolipólisis de Contorno (Grasa Localizada)")}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-gold-900 hover:bg-gold-100 font-extrabold text-xs text-center uppercase tracking-widest duration-300 transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-gold-950/20"
                  id="crio-action-btn"
                >
                  Contactar hoy
                  <ArrowRight className="h-4 w-4 text-gold-800" />
                </button>
                <a
                  href="#tratamientos"
                  className="text-xs text-gold-200 mt-2 sm:mt-0 font-bold tracking-wider hover:text-white transition-colors duration-200"
                >
                  Explorar otras zonas corporales
                </a>
              </div>
            </div>

            {/* Right Interactive Measuring Tape stylized card */}
            <div className="lg:col-span-5 flex justify-center" id="criolipolisis-right-artwork">
              <div className="relative w-full max-w-[360px] p-8 rounded-[2rem] bg-white text-clin-900 shadow-2xl relative overflow-hidden border border-gold-200" id="tape-artwork-card">
                
                {/* Elegant curves representing contour tape in rose gold / alestetic teal */}
                <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none" id="tape-decor">
                  {/* Stylized elegant curvy ribbon segment */}
                  <svg className="w-full h-full text-rose-accent rotate-12 translate-x-6 -translate-y-4" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M10,30 C30,10 50,70 90,50" className="stroke-rose-accent" />
                    <path d="M15,35 C35,15 55,75 95,55" className="stroke-gold-400 opacity-60" strokeDasharray="3,3" />
                  </svg>
                </div>

                <span className="text-[10px] text-gold-600 font-extrabold uppercase tracking-widest block mb-1">PROMO LIMITADA</span>
                <span className="font-serif text-[42px] leading-none font-semibold text-gradient block mb-3">CRIOLIPÓLISIS</span>
                
                <p className="text-xs text-clin-600 mb-6 leading-relaxed">
                  Consigue tu valoración clínica computarizada sin costo agendando tu cita el día de hoy. ¡Empieza el cambio!
                </p>

                <div className="space-y-3 bg-gold-50 p-4 rounded-2xl border border-gold-100 mb-6" id="crio-box-details">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-clin-600">Cupos esta semana:</span>
                    <span className="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full text-[10px]">¡Pocos disponibles!</span>
                  </div>
                  <div className="h-px bg-gold-200" />
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-clin-600">Sede clínica:</span>
                    <span className="font-bold text-clin-900">CC Viva Envigado</span>
                  </div>
                </div>

                <button
                  onClick={() => handleBookDirect("Criolipólisis de Contorno (Grasa Localizada)")}
                  className="w-full py-3 rounded-full bg-clin-900 hover:bg-gold-500 text-white hover:text-clin-900 text-xs font-black uppercase tracking-widest duration-300 shadow-md shadow-clin-900/10 cursor-pointer flex items-center justify-center gap-2"
                  id="crio-card-action-btn"
                >
                  <MessageCircle className="h-4 w-4" />
                  Reservar Cupo Gratis
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 3. Treatments Section */}
      <section className="py-24 bg-white" id="tratamientos">
        <div className="max-w-7xl mx-auto px-6" id="treatments-section-container">
          
          {/* Headline and tabs selector */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12" id="treatments-intro-group">
            <div id="treatments-title-text">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-gold-600 block mb-2">NUESTRO CATÁLOGO</span>
              <h2 className="font-serif text-[32px] md:text-[46px] font-semibold tracking-tight text-clin-900 leading-[1.1]">
                Tratamientos Especializados
              </h2>
              <p className="text-sm text-clin-600 mt-4 max-w-lg mb-1 leading-relaxed">
                Cada procedimiento es aplicado por profesionales certificadas bajo la supervisión médica que garantiza la máxima seguridad corporal y facial.
              </p>
            </div>

            {/* Premium Category Menu */}
            <div className="flex p-1.5 rounded-full bg-gold-100/80 border border-gold-200 self-start" id="treatments-category-selector">
              <button
                onClick={() => setActiveCategory('facial')}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase cursor-pointer duration-200 transition-all ${
                  activeCategory === 'facial'
                    ? 'bg-clin-900 text-white shadow-sm'
                    : 'text-clin-600 hover:text-clin-900'
                }`}
                id="tab-facial"
              >
                Facial
              </button>
              <button
                onClick={() => setActiveCategory('corporal')}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase cursor-pointer duration-200 transition-all ${
                  activeCategory === 'corporal'
                    ? 'bg-clin-900 text-white shadow-sm'
                    : 'text-clin-600 hover:text-clin-900'
                }`}
                id="tab-corporal"
              >
                Corporal
              </button>
              <button
                onClick={() => setActiveCategory('premium')}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase cursor-pointer duration-200 transition-all ${
                  activeCategory === 'premium'
                    ? 'bg-clin-900 text-white shadow-sm'
                    : 'text-clin-600 hover:text-clin-900'
                }`}
                id="tab-premium"
              >
                Premium
              </button>
            </div>
          </div>

          {/* Grid of Treatment Cards */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            id="treatments-grid"
          >
            <AnimatePresence mode="popLayout">
              {filteredTreatments.map((treatment) => (
                <motion.div
                  key={treatment.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl border border-gold-200 bg-gold-50/15 overflow-hidden p-6 hover:bg-white flex flex-col justify-between group transition-all duration-300 relative shadow-sm hover:shadow-xl hover:-translate-y-1.5"
                  id={`card-${treatment.id}`}
                >
                  <div id="card-inner-top">
                    {/* Tiny badge with icons */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-wider bg-gold-100 text-gold-800 rounded-full uppercase">
                        {treatment.duration}
                      </span>
                      {treatment.technology && (
                        <span className="text-[10px] font-medium text-clin-500 uppercase truncate max-w-[150px]">
                          {treatment.technology}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-lg font-medium text-clin-900 group-hover:text-gold-700 transition-colors mb-2.5">
                      {treatment.name}
                    </h3>

                    {/* Short Desc */}
                    <p className="text-xs text-clin-600 leading-relaxed mb-6">
                      {treatment.shortDescription}
                    </p>

                    {/* Key benefits preview */}
                    <div className="space-y-2 mb-6" id="card-benefits-preview">
                      {treatment.benefits.slice(0, 2).map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2 text-[11px] text-clin-700">
                          <CheckCircle2 className="h-3.5 w-3.5 text-gold-500 mt-0.5 shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing/Action segment */}
                  <div className="pt-4 border-t border-gold-100 flex items-center justify-between" id="card-inner-bottom">
                    <div>
                      <span className="text-[10px] text-clin-400 block uppercase font-bold tracking-wider">Inversión</span>
                      <span className="text-xs font-semibold text-clin-800">
                        {treatment.priceRange === '$$' && 'Moderado'}
                        {treatment.priceRange === '$$$' && 'Medio-Alto'}
                        {treatment.priceRange === '$$$$' && 'Premium'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedTreatment(treatment)}
                        className="text-xs font-bold text-clin-900 group-hover:text-gold-600 transition-colors py-2 px-3 border border-transparent group-hover:border-gold-300 rounded-full bg-gold-50/50 hover:bg-gold-50 duration-200 flex items-center gap-1 cursor-pointer"
                        id={`btn-details-${treatment.id}`}
                      >
                        Saber más
                        <ChevronRight className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleBookDirect(treatment.name)}
                        className="p-2 bg-clin-900 text-white rounded-full hover:bg-gold-600 duration-200 cursor-pointer shadow-md shadow-clin-950/10"
                        title="Reservar en WhatsApp"
                        id={`btn-book-${treatment.id}`}
                      >
                        <Calendar className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>


      {/* Interactive Before & After Segment */}
      <BeforeAfterSlider />


      {/* 4. Boutique Experience / About Us Section */}
      <section className="py-24 bg-gold-50/40 relative overflow-hidden" id="sobre-nosotros">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="about-grid">
          
          {/* Left Column: Image with details overlay */}
          <div className="lg:col-span-5 relative" id="about-image-wrapper">
            <div className="absolute inset-x-4 inset-y-4 border border-gold-300 rounded-[2.5rem] -rotate-3 -z-10" />
            <div className="absolute -inset-2 bg-clin-500/5 rounded-[2.5rem] rotate-2 -z-10 blur-xl" />

            <div className="relative rounded-[2.5rem] overflow-hidden bg-white shadow-xl border-4 border-white" id="about-image-container">
              <img
                src={alesteticClinic}
                alt="Clínica estética Alestetic en Centro Comercial Viva Envigado, Envigado, Medellín"
                className="w-full h-[400px] object-cover hover:scale-105 duration-700 transition-transform"
                referrerPolicy="no-referrer"
                id="img-about-clinic"
              />
              
              {/* Overlapping small floating review */}
              <div className="absolute top-5 right-5 bg-clin-900/90 backdrop-blur-md rounded-2xl p-4 text-white border border-white/10 max-w-[220px] shadow-lg" id="about-overlay-card">
                <span className="text-[10px] text-gold-300 uppercase tracking-widest font-bold block mb-1">Ubicación</span>
                <p className="text-xs font-medium leading-normal">
                  Fácil acceso y parqueadero en el Centro Comercial Viva Envigado, Medellín.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Principles */}
          <div className="lg:col-span-7 flex flex-col items-start" id="about-text-wrapper">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-gold-600 block mb-2">BOUTIQUE EXPERIENCE</span>
            <h2 className="font-serif text-[32px] md:text-[46px] font-semibold tracking-tight text-clin-900 leading-[1.1] mb-6">
              Estética Médica con enfoque <span className="text-gradient italic block md:inline font-semibold">armónico y natural</span>
            </h2>
            <p className="text-sm text-clin-700 leading-relaxed mb-8">
              En Alestetic entendemos la estética no como un cambio radical, sino como la potenciación de los rasgos propios y el cuidado de la salud cutánea. Nuestra consulta boutique ofrece ambientes íntimos, protocolos estrictos de higiene y profesionales dedicadas enteramente al tratamiento integral de tu cuerpo y de tu rostro.
            </p>

            {/* Three key pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full" id="about-pillars">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-gold-100 flex items-center justify-center shrink-0 text-gold-700 font-bold text-sm">
                  01
                </div>
                <div>
                  <h4 className="text-sm font-bold text-clin-900 mb-1">Acompañamiento Profesional</h4>
                  <p className="text-xs text-clin-500 leading-relaxed">Cada caso es valorado clínicamente para ofrecer terapias seguras óptimas.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-gold-100 flex items-center justify-center shrink-0 text-gold-700 font-bold text-sm">
                  02
                </div>
                <div>
                  <h4 className="text-sm font-bold text-clin-900 mb-1">Equipos de Última Generación</h4>
                  <p className="text-xs text-clin-500 leading-relaxed">Tecnología aprobada por el INVIMA para resultados estables y sin riesgos.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-gold-100 flex items-center justify-center shrink-0 text-gold-700 font-bold text-sm">
                  03
                </div>
                <div>
                  <h4 className="text-sm font-bold text-clin-900 mb-1">Ambientes Privados de Relax</h4>
                  <p className="text-xs text-clin-500 leading-relaxed">Suites aisladas acústicamente con aromaterapia y música ambiental relajante.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-gold-100 flex items-center justify-center shrink-0 text-gold-700 font-bold text-sm">
                  04
                </div>
                <div>
                  <h4 className="text-sm font-bold text-clin-900 mb-1">Ética Cosmética</h4>
                  <p className="text-xs text-clin-500 leading-relaxed">Priorizamos la salud sobre los estándares cosméticos irreales.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 5. Testimonials Section */}
      <section className="py-24 bg-white" id="testimonios">
        <div className="max-w-7xl mx-auto px-6 text-center" id="opinions-section">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-gold-600 block mb-2">EXPERIENCIAS REALES</span>
          <h2 className="font-serif text-[32px] md:text-[46px] font-semibold tracking-tight text-clin-900 leading-[1.1] mb-4">
            Nuestros huéspedes lo confirman
          </h2>
          <p className="text-xs sm:text-sm text-clin-500 max-w-lg mx-auto mb-16 leading-relaxed">
            La sonrisa y seguridad de nuestros pacientes son la mejor evidencia de nuestra dedicación profesional diaria.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left" id="testimonials-grid">
            {TESTIMONIALS.map((review) => (
              <div
                key={review.id}
                className="rounded-3xl border border-gold-200 bg-gold-50/10 p-6 flex flex-col justify-between hover:bg-white duration-300 transition-all hover:shadow-lg shadow-xs"
                id={`review-box-${review.id}`}
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-4 text-gold-500">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} className="h-4.5 w-4.5 fill-current" />
                    ))}
                  </div>

                  <p className="text-xs text-clin-600 italic leading-relaxed mb-6 font-medium">
                    "{review.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-gold-100 flex items-center gap-3">
                  <div className="w-9 h-9 bg-gold-200 text-gold-900 rounded-full flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-clin-900">{review.name}</h5>
                    <span className="text-[10px] text-clin-400 block">{review.role}</span>
                    <span className="text-[9px] bg-gold-100/50 text-gold-800 py-0.5 px-1.5 rounded-md font-semibold inline-block mt-1">
                      {review.treatment}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 6. Form/Booking & Contact Section */}
      <section className="py-24 bg-gold-100/30 relative border-t border-gold-200 overflow-hidden" id="reservar">
        {/* Soft layout patterns */}
        <div className="absolute top-[30%] right-[10%] w-72 h-72 bg-gold-200/50 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10" id="contact-wrapper">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Direct info and map */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full" id="contact-left-column">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.25em] text-gold-600 block mb-2">VISÍTANOS</span>
                <h2 className="font-serif text-[32px] md:text-[46px] font-semibold tracking-tight text-clin-900 leading-[1.1] mb-6">
                  Programa tu visita
                </h2>
                <p className="text-sm text-clin-700 leading-relaxed mb-8">
                  Te esperamos en nuestra sede premium del área metropolitana para diseñar la mejor versión de tu cutis y cuerpo.
                </p>

                {/* Info Blocks */}
                <div className="space-y-6 mb-8" id="contact-info-blocks">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-white border border-gold-200 text-gold-600 flex items-center justify-center shrink-0 shadow-xs">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-clin-500 uppercase tracking-widest">Sede Principal</h4>
                      <p className="text-sm text-clin-900 font-bold mt-1">Centro Comercial Viva Envigado</p>
                      <p className="text-xs text-clin-600">Local 324, Nivel 3. Envigado, Antioquia, Colombia.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-white border border-gold-200 text-gold-600 flex items-center justify-center shrink-0 shadow-xs">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-clin-500 uppercase tracking-widest">Horarios de Atención</h4>
                      <p className="text-sm text-clin-900 font-bold mt-1">Lunes a Sábado</p>
                      <p className="text-xs text-clin-600">8:00 AM – 7:00 PM</p>
                      <p className="text-xs text-clin-600">Domingos por agenda prioritaria previa.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-white border border-gold-200 text-gold-600 flex items-center justify-center shrink-0 shadow-xs">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-clin-500 uppercase tracking-widest">Línea WhatsApp</h4>
                      <p className="text-sm text-clin-900 font-bold mt-1">(+57) 312 555 4321</p>
                      <span className="inline-flex items-center gap-1 text-[10px] text-green-700 bg-green-50 px-2 py-0.5 rounded-full font-bold mt-1 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping inline-block" />
                        Online ahora
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Styled mock vector maps block */}
              <div className="bg-white border border-gold-200 p-4 rounded-3xl shadow-sm" id="mock-map-block">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-clin-900 uppercase">Indicaciones de Acceso</span>
                  <span className="text-[9px] bg-gold-100 text-gold-700 py-0.5 px-2 rounded-full font-bold">Waze & Maps</span>
                </div>
                <div className="h-44 rounded-2xl bg-gold-50/70 relative overflow-hidden flex flex-col justify-center items-center border border-dashed border-gold-300 text-center p-4">
                  <MapPin className="h-8 w-8 text-gold-600 mb-2 animate-bounce" />
                  <p className="text-xs font-bold text-clin-900">Viva Envigado • Medellín</p>
                  <p className="text-[10px] text-clin-500 mt-1 max-w-[220px]">Ingresa por la torre médica comercial Nivel 3 para un acceso privado cómodo.</p>
                  <a
                    href="https://waze.com/ul?ll=6.17254,-75.59131&navigate=yes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 text-[10px] font-bold text-gold-700 hover:text-gold-900 underline flex items-center gap-1"
                  >
                    Abrir en Waze — CC Viva Envigado
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: High Fidelity interactive form */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-gold-200 p-6 md:p-8 shadow-xl" id="contact-right-column">
              <h3 className="font-serif text-xl md:text-2xl font-medium text-clin-900 mb-2">
                Solicitud de Valoración Personalizada
              </h3>
              <p className="text-xs text-clin-500 mb-6">
                Ingresa tus datos a continuación. El sistema generará una reserva clínica de valoración y te facilitará enviar toda la información directamente de un solo toque al WhatsApp institucional de Alestetic.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4" id="booking-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name-input" className="text-xs font-semibold text-clin-700">Nombre Completo *</label>
                    <input
                      id="name-input"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="Ej: Carolina Giraldo"
                      className="w-full text-xs p-3.5 rounded-xl border border-gold-200 outline-none focus:border-gold-500 hover:border-gold-300 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone-input" className="text-xs font-semibold text-clin-700">Celular WhatsApp *</label>
                    <input
                      id="phone-input"
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder="Ej: 312 4567890"
                      className="w-full text-xs p-3.5 rounded-xl border border-gold-200 outline-none focus:border-gold-500 hover:border-gold-300 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="treatment-select" className="text-xs font-semibold text-clin-700">Tratamiento de Interés *</label>
                  <select
                    id="treatment-select"
                    name="treatment"
                    value={formData.treatment}
                    onChange={handleFormChange}
                    className="w-full text-xs p-3.5 rounded-xl border border-gold-200 outline-none bg-white focus:border-gold-500 transition-colors"
                  >
                    {TREATMENTS.map((treatment) => (
                      <option key={treatment.id} value={treatment.name}>
                        {treatment.name}
                      </option>
                    ))}
                    <option value="Valoración Estética Facial General">Valoración Estética Facial General</option>
                    <option value="Valoración Estética Corporal General">Valoración Estética Corporal General</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="date-input" className="text-xs font-semibold text-clin-700">Fecha Tentativa</label>
                    <input
                      id="date-input"
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleFormChange}
                      className="w-full text-xs p-3.5 rounded-xl border border-gold-200 outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="time-select" className="text-xs font-semibold text-clin-700">Hora Preferida</label>
                    <select
                      id="time-select"
                      name="time"
                      value={formData.time}
                      onChange={handleFormChange}
                      className="w-full text-xs p-3.5 rounded-xl border border-gold-200 outline-none bg-white focus:border-gold-500 transition-colors"
                    >
                      <option value="">Por acordar con asesora</option>
                      <option value="Mañana (8:00 AM - 12:00 PM)">Mañana (8:00 AM - 12:00 PM)</option>
                      <option value="Mediodía (12:00 PM - 2:00 PM)">Mediodía (12:00 PM - 2:00 PM)</option>
                      <option value="Tarde (2:00 PM - 7:00 PM)">Tarde (2:00 PM - 7:00 PM)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message-input" className="text-xs font-semibold text-clin-700">Observaciones o Preocupación Principal</label>
                  <textarea
                    id="message-input"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Cuéntanos un poco sobre tu tipo de piel o los objetivos que deseas alcanzar..."
                    className="w-full text-xs p-3.5 rounded-xl border border-gold-200 outline-none resize-none focus:border-gold-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-clin-900 hover:bg-gold-600 text-white font-bold text-xs shadow-lg shadow-clin-900/10 cursor-pointer duration-200 transition-all flex items-center justify-center gap-2"
                  id="submit-form-btn"
                >
                  <Send className="h-4 w-4" />
                  Generar y Enviar a WhatsApp
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>


      {/* 7. FAQ Section */}
      <section className="py-24 bg-white" id="faq">
        <div className="max-w-4xl mx-auto px-6" id="faq-section-container">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-gold-600 block mb-2">RESPUESTAS</span>
            <h2 className="font-serif text-[32px] md:text-[46px] font-semibold tracking-tight text-clin-900 leading-[1.1]">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-4" id="faq-accordion-container">
            {FAQS.map((faq) => {
              const isOpen = faqOpenId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-gold-200 bg-gold-50/5 overflow-hidden"
                  id={`faq-item-${faq.id}`}
                >
                  <button
                    onClick={() => setFaqOpenId(isOpen ? null : faq.id)}
                    className="w-full text-left p-5 flex items-center justify-between font-semibold text-xs sm:text-sm text-clin-900 focus:outline-none bg-white hover:bg-gold-50/20 transition-all duration-200 cursor-pointer"
                    id={`faq-btn-${faq.id}`}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`h-4.5 w-4.5 text-gold-600 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="bg-white"
                        id={`faq-answer-block-${faq.id}`}
                      >
                        <div className="p-5 pt-0 text-xs sm:text-sm text-clin-600 leading-relaxed border-t border-gold-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* 8. Footer Section */}
      <footer className="bg-clin-900 text-gold-100/80 pt-16 pb-12 border-t-2 border-gold-400" id="footer-section">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-clin-800 pb-12 mb-10" id="footer-grid">
          
          {/* Col 1 Brand detail */}
          <div className="md:col-span-5" id="footer-col-brand">
            <a href="#inicio" className="flex items-center group mb-4 outline-none select-none">
              <AlesteticLogo variant="dark" size="sm" className="transition-transform duration-300 hover:scale-102" />
            </a>
            <p className="text-xs text-clin-300 leading-relaxed max-w-sm">
              Centro clínico estético integral dedicado a ofrecer tratamientos estéticos faciales y corporales de alto impacto biológico e hidratante, garantizando resultados armoniosos, éticos y seguros.
            </p>
          </div>

          {/* Col 2 Quick Links */}
          <div className="md:col-span-3 flex flex-col gap-3" id="footer-col-links">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-2">Servicios Clave</h4>
            <a href="#tratamientos" onClick={() => { setActiveCategory('facial'); }} className="text-xs text-clin-300 hover:text-gold-400 transition-colors">Tratamientos Faciales</a>
            <a href="#tratamientos" onClick={() => { setActiveCategory('corporal'); }} className="text-xs text-clin-300 hover:text-gold-400 transition-colors">Tratamientos Corporales</a>
            <a href="#tratamientos" onClick={() => { setActiveCategory('premium'); }} className="text-xs text-clin-300 hover:text-gold-400 transition-colors">Láser Diodo Premium</a>
            <a href="#diagnostico" className="text-xs text-clin-300 hover:text-gold-400 transition-colors flex items-center gap-1">
              Test Evaluador de Piel
              <Sparkles className="h-3 w-3 text-gold-400" />
            </a>
          </div>

          {/* Col 3 Regulatory / Contact */}
          <div className="md:col-span-4 flex flex-col gap-3" id="footer-col-contact">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-2">Sede Viva Envigado</h4>
            <span className="text-xs text-clin-300 flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-gold-500" />
              Local 324, Centro Comercial Viva Envigado.
            </span>
            <span className="text-xs text-clin-300 flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-gold-500" />
              (+57) 312 555 4321
            </span>
            <span className="text-[10px] bg-clin-800 text-gold-300 border border-clin-700 py-1 px-2.5 rounded-lg font-medium self-start mt-2">
              Aprobado por el INVIMA • Protocolos Estrictos
            </span>
          </div>
        </div>

        {/* Micro Footer Credits */}
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-clin-400" id="footer-credits-row">
          <p>© {new Date().getFullYear()} Alestetic. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <span className="text-[10px]">Diseño y desarrollo por <a href="https://tresdobleu.com" target="_blank" className="font-bold text-gold-400 hover:text-white underline">Tresdobleu</a></span>
          </div>
        </div>
      </footer>


      {/* 9. Interactive Modals & Sub-components */}
      <TreatmentModal
        treatment={selectedTreatment}
        onClose={() => setSelectedTreatment(null)}
        onBook={handleBookDirect}
      />

      {/* Success Modal for whatsapp redirect confirmation */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="success-modal-overlay">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccessModal(false)}
              className="absolute inset-0 bg-clin-900/60 backdrop-blur-sm"
              id="success-modal-backdrop"
            />

            {/* Content card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 text-center border border-gold-200 shadow-2xl z-10"
              id="success-modal-card"
            >
              <AlesteticLogo variant="light" size="sm" className="mb-3" />
              
              <div className="w-10 h-10 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-5 w-5" />
              </div>

              <h3 className="font-serif text-lg font-medium text-clin-900 mb-2">
                ¡Solicitud Registrada Exitosamente!
              </h3>
              
              <p className="text-xs text-clin-600 leading-relaxed mb-6">
                Hemos preparado la solicitud de valoración clínica con tus preferencias estéticas. Presiona el botón a continuación para despacharla de forma instantánea a nuestra asesora en WhatsApp.
              </p>

              {/* Data review snippet */}
              <div className="bg-gold-50/50 border border-gold-100 rounded-2xl p-4 text-left text-[11px] text-clin-700 space-y-1 mb-6" id="form-data-snippet">
                <p><strong>Paciente:</strong> {formData.name}</p>
                <p><strong>Tratamiento:</strong> {formData.treatment}</p>
                <p><strong>Fecha/Hora:</strong> {formData.date || 'Por acordar'} - {formData.time || 'Por acordar'}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-1/3 py-2.5 text-xs text-clin-600 font-bold border border-gold-200 rounded-full hover:bg-gold-50 cursor-pointer"
                  id="success-close-btn"
                >
                  Regresar
                </button>
                <button
                  onClick={handleConfirmWhatsAppRedirect}
                  className="w-2/3 py-2.5 bg-clin-900 hover:bg-gold-600 text-gold-100 hover:text-white text-xs font-bold rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-clin-900/10"
                  id="success-whatsapp-btn"
                >
                  <MessageCircle className="h-4 w-4 fill-current text-white" />
                  Abrir WhatsApp
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Interactive WhatsApp Widget */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2" id="floating-whatsapp-widget">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 3, duration: 0.5 }}
          className="bg-white text-clin-900 border border-gold-200 text-[11px] font-black tracking-tight px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-1.5 pointer-events-none select-none mb-1 hidden sm:flex"
        >
          ¿Necesitas ayuda? 💬
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleBookDirect("Valoración Estética General")}
          className="w-14 h-[56px] w-[56px] bg-[#25D366] hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-green-600/20 cursor-pointer border border-white/20 transition-colors"
          title="Consúltanos por WhatsApp"
          id="btn-whatsapp-floating"
        >
          <MessageCircle className="h-6 w-6 stroke-[2.5]" />
        </motion.button>
      </div>

    </div>
  );
}
