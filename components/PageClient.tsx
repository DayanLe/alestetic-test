'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles, Calendar, MapPin, Phone, Clock, ChevronDown, Star,
  MessageCircle, ShieldCheck, Menu, X, Award, Droplet, ChevronRight,
  ArrowRight, Send, CheckCircle2
} from 'lucide-react';
import Image from 'next/image';

import { TREATMENTS, FAQS, TESTIMONIALS, Treatment } from '@/lib/data';
import SkinQuiz from '@/components/SkinQuiz';
import TreatmentModal from '@/components/TreatmentModal';
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider';
import { AlesteticLogo } from '@/components/AlesteticLogo';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573125554321';

export default function PageClient() {
  const [activeCategory, setActiveCategory] = useState<'facial' | 'corporal' | 'premium'>('facial');
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [faqOpenId, setFaqOpenId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', treatment: 'Limpieza y Exfoliación Facial Profunda',
    date: '', time: '', message: ''
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredTreatments = TREATMENTS.filter(t => t.category === activeCategory);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateWhatsAppLink = (treatmentName?: string) => {
    let text = '';
    if (treatmentName) {
      text = `Hola Alestetic! 👋 Quisiera solicitar más información y agendar una sesión para el tratamiento: *${treatmentName}* que vi en su sitio web. ¿Qué horarios tienen disponibles?`;
    } else {
      text = `Hola Alestetic! 👋 Quisiera agendar mi valoración estética clínica:\n\n*Nombre:* ${formData.name || 'Invitado'}\n*Teléfono:* ${formData.phone || 'No especificado'}\n*Tratamiento:* ${formData.treatment}\n*Fecha estimada:* ${formData.date || 'Por acordar'}\n*Hora:* ${formData.time || 'Por acordar'}\n*Notas:* ${formData.message || 'Sin observaciones'}\n\n¿Podrían confirmarme la disponibilidad en su sede Viva Envigado? 🏥✨`;
    }
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  };

  const handleBookDirect = (treatmentName: string) => {
    window.open(generateWhatsAppLink(treatmentName), '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  const handleConfirmWhatsAppRedirect = () => {
    window.open(generateWhatsAppLink(), '_blank', 'noopener,noreferrer');
    setShowSuccessModal(false);
    setFormData({ name: '', phone: '', treatment: 'Limpieza y Exfoliación Facial Profunda', date: '', time: '', message: '' });
  };

  return (
    <div className="min-h-screen feminine-gradient-mesh font-sans selection:bg-gold-200 selection:text-gold-950">

      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hola Alestetic! 👋 Quisiera información sobre sus tratamientos. ¿Me pueden ayudar?')}`}
        target="_blank" rel="noopener noreferrer"
        aria-label="Hablar por WhatsApp con Alestetic"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold text-xs px-4 py-3 rounded-full shadow-2xl shadow-green-500/40 transition-all duration-300 hover:scale-105"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">Hablar con asesora</span>
      </a>

      {/* Top micro-banner */}
      <div className="bg-clin-900 text-gold-100 py-1.5 px-4 text-center text-xs font-semibold tracking-wider flex items-center justify-center gap-2">
        <Sparkles className="h-3 w-3 animate-pulse text-gold-400" />
        <span>Sede Viva Envigado – Agendando citas de valoración para esta semana</span>
        <span className="hidden sm:inline bg-gold-500 text-clin-950 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ml-2">Promo Active</span>
      </div>

      {/* Header */}
      <header className={`fixed top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-40 rounded-full transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg border border-gold-200 py-3.5 px-6 top-4' : 'bg-transparent py-5 px-6'}`}>
        <div className="flex items-center justify-between">
          <a href="#inicio" className="flex items-center group select-none">
            <AlesteticLogo variant="light" size="sm" className="transition-transform duration-300 hover:scale-102" />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-clin-700">
            {[['#inicio','Inicio'],['#tratamientos','Tratamientos'],['#resultados-reales','Resultados'],['#diagnostico','Test de Piel'],['#sobre-nosotros','Nosotros'],['#testimonios','Opiniones'],['#faq','Preguntas']].map(([href, label]) => (
              <a key={href} href={href} className="hover:text-gold-600 transition-colors uppercase tracking-wider">{label}</a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a href="#reservar" className="px-5 py-2.5 rounded-full bg-clin-900 hover:bg-gold-600 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5" /> Agendar Valoración
            </a>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden rounded-full p-2 text-clin-950 hover:bg-gold-100 transition-colors" aria-label="Abrir Menú">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white border border-gold-200 shadow-xl rounded-3xl mt-3 p-6 flex flex-col gap-4 z-40 md:hidden">
              <nav className="flex flex-col gap-4 text-sm font-semibold text-clin-800">
                {[['#inicio','Inicio'],['#tratamientos','Tratamientos'],['#resultados-reales','Resultados Reales'],['#diagnostico','Test de Tipo de Piel'],['#sobre-nosotros','Nosotros'],['#testimonios','Testimonios'],['#faq','Preguntas Frecuentes']].map(([href, label]) => (
                  <a key={href} href={href} onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-600 transition-colors border-b border-gold-100 pb-2">{label}</a>
                ))}
              </nav>
              <a href="#reservar" onClick={() => setMobileMenuOpen(false)} className="w-full py-3 rounded-full bg-clin-900 text-white text-center text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg">
                <Calendar className="h-4 w-4" /> Agendar Valoración
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 1. Hero */}
      <section className="relative pt-36 pb-20 md:py-40 bg-gradient-to-tr from-white via-rose-light/20 to-gold-100/30 overflow-hidden" id="inicio">
        <h1 className="sr-only">Centro de Estética Médica en Envigado – Tratamientos Faciales y Corporales con INVIMA | Alestetic Viva Envigado, Medellín</h1>
        <div className="absolute top-[15%] left-[5%] w-96 h-96 bg-rose-light/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-[35%] right-[2%] w-[500px] h-[500px] bg-gold-200/35 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-gold-600 bg-white/75 border border-gold-200/50 px-3.5 py-1.5 rounded-full mb-5 block shadow-xs">
              COSMETIC EXCELLENCE • SEDE VIVA ENVIGADO
            </span>
            <h2 className="font-serif text-[42px] sm:text-[60px] lg:text-[76px] font-semibold tracking-tight text-clin-900 leading-[1.05] mb-6">
              Rigor Científico <br/>
              <span className="not-italic text-brand-gradient font-semibold block mt-1">Y Belleza Armónica.</span>
            </h2>
            <p className="text-base text-clin-700 leading-relaxed max-w-xl mb-8">
              En Alestetic renovamos tu confianza facial y corporal a través de metodologías personalizadas clínicamente validadas y aparatología médica certificada por el INVIMA. El máximo estándar en estética profesional del Centro Comercial Viva Envigado.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-9 w-full max-w-xl">
              {[
                [Droplet, 'gold-100', 'gold-600', 'Equipos Certificados'],
                [ShieldCheck, 'rose-accent/40', 'rose-deep', 'Médico Especialista'],
                [MapPin, 'gold-100', 'gold-600', 'Sede Viva Envigado'],
              ].map(([Icon, bg, color, label], i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className={`w-5 h-5 rounded-full bg-${bg} flex items-center justify-center shrink-0`}>
                    {React.createElement(Icon as React.ComponentType<{className:string}>, { className: `h-3 w-3 text-${color}` })}
                  </div>
                  <span className="text-xs font-bold text-clin-800">{label as string}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
              <a href="#tratamientos" className="w-full sm:w-auto px-8 py-4 rounded-full text-white font-extrabold text-xs text-center shadow-lg cursor-pointer duration-300 transition-all flex items-center justify-center gap-2 uppercase tracking-widest boutique-button-primary">
                Ver Tratamientos <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#diagnostico" className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-gold-400/60 hover:border-gold-500 hover:bg-gold-50/90 text-gold-700 font-extrabold text-xs text-center duration-300 transition-all flex items-center justify-center gap-2 uppercase tracking-widest hover:text-clin-900">
                Hacer Test de Piel <Sparkles className="h-4 w-4 text-gold-500" />
              </a>
            </div>
            <div className="flex items-center gap-6 sm:gap-10 pt-8 border-t border-gold-200 w-full max-w-xl">
              {[['15k+','Pacientes'],['100%','Garantizado'],['08+','Especialistas']].map(([num, label], i) => (
                <React.Fragment key={i}>
                  {i > 0 && <div className="h-10 w-px bg-gold-300" />}
                  <div className="flex flex-col">
                    <span className="text-2xl sm:text-3xl font-semibold text-clin-900 font-serif">{num}</span>
                    <span className="text-[10px] uppercase tracking-wider text-clin-500 font-extrabold">{label}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center">
            <div className="absolute inset-0 bg-gold-200 rounded-t-full translate-y-3 translate-x-3 -z-10" />
            <div className="absolute inset-0 bg-rose-accent/20 rounded-t-full -translate-y-2 -translate-x-2 -z-10" />
            <div className="relative w-full max-w-[380px] h-[480px] rounded-t-full overflow-hidden border-[10px] border-white bg-white shadow-2xl flex flex-col justify-end">
              <Image src="/alestetic-test/images/alestetic_hero_1780755609656.webp"
                alt="Tratamiento facial clínico Alestetic – Centro de estética médica Viva Envigado, Medellín"
                fill className="object-cover hover:scale-105 duration-700 transition-transform" priority fetchPriority="high" />
              <div className="absolute bottom-5 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-gold-200 shadow-xl flex items-center justify-between z-10">
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

      {/* 2. Skin Quiz */}
      <section className="py-20 bg-gold-100/50 relative overflow-hidden" id="diagnostico">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-gold-600 block mb-3">TECNOLOGÍA INTELIGENTE</span>
            <h2 className="font-serif text-[32px] md:text-[50px] font-semibold tracking-tight text-clin-900 leading-[1.15]">¿No sabes qué tratamiento necesitas?</h2>
            <p className="text-xs sm:text-sm text-clin-600 max-w-xl mx-auto mt-4">Responde 3 preguntas sencillas y recibe una recomendación experta y personalizada de nuestro catálogo estético en segundos.</p>
          </div>
          <SkinQuiz onBookTreatment={handleBookDirect} />
        </div>
      </section>

      {/* 3. Criolipólisis highlight */}
      <section className="py-20 bg-gradient-to-br from-gold-900 to-gold-800 text-white relative overflow-hidden" id="especialidad-criolipolisis">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gold-300/10 rounded-full pointer-events-none animate-[spin_120s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold-300/15 rounded-full pointer-events-none animate-[spin_85s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-gold-400/20 rounded-full pointer-events-none animate-[spin_40s_linear_infinite]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <span className="text-[10px] uppercase font-black tracking-[0.4em] text-gold-300 bg-gold-900/50 border border-gold-500/30 px-3 py-1 rounded-full mb-4">TRATAMIENTO ESTRELLA CORPORAL</span>
              <h2 className="font-serif text-[38px] md:text-[56px] font-semibold tracking-tight leading-[1.05] mb-6">
                Eliminamos esa grasita<br /><span className="text-gold-200 font-semibold">que ya no quieres.</span>
              </h2>
              <p className="text-base text-gold-100/90 leading-relaxed max-w-xl mb-8">
                Nuestra tecnología de <strong className="text-white font-extrabold">Criolipólisis de Contorno Avanzada</strong> actúa congelando de forma controlada las células adiposas sin dañar la piel. Es la alternativa no quirúrgica preferida en Envigado para conseguir resultados permanentes y modelar tu contorno de manera saludable.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 w-full max-w-lg">
                {['Sin cirugía ni dolor','Para abdomen, flancos y muslos','En solo 90 min por sesión','Retorno inmediato a actividades'].map((perk) => (
                  <div key={perk} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-gold-700/80 border border-gold-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-gold-300" />
                    </div>
                    <span className="text-xs font-semibold text-gold-100">{perk}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <button onClick={() => handleBookDirect('Criolipólisis de Contorno (Grasa Localizada)')}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-gold-900 hover:bg-gold-100 font-extrabold text-xs uppercase tracking-widest duration-300 transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg">
                  Contactar hoy <ArrowRight className="h-4 w-4 text-gold-800" />
                </button>
                <a href="#tratamientos" className="text-xs text-gold-200 mt-2 sm:mt-0 font-bold tracking-wider hover:text-white transition-colors">Explorar otras zonas corporales</a>
              </div>
            </div>
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[360px] p-8 rounded-[2rem] bg-white text-clin-900 shadow-2xl overflow-hidden border border-gold-200">
                <span className="text-[10px] text-gold-600 font-extrabold uppercase tracking-widest block mb-1">PROMO LIMITADA</span>
                <span className="font-serif text-[42px] leading-none font-semibold text-gradient block mb-3">CRIOLIPÓLISIS</span>
                <p className="text-xs text-clin-600 mb-6 leading-relaxed">Consigue tu valoración clínica computarizada sin costo agendando tu cita el día de hoy. ¡Empieza el cambio!</p>
                <div className="space-y-3 bg-gold-50 p-4 rounded-2xl border border-gold-100 mb-6">
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
                <button onClick={() => handleBookDirect('Criolipólisis de Contorno (Grasa Localizada)')}
                  className="w-full py-3 rounded-full bg-clin-900 hover:bg-gold-500 text-white hover:text-clin-900 text-xs font-black uppercase tracking-widest duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2">
                  <MessageCircle className="h-4 w-4" /> Reservar Cupo Gratis
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Treatments */}
      <section className="py-24 bg-white" id="tratamientos">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.25em] text-gold-600 block mb-2">NUESTRO CATÁLOGO</span>
              <h2 className="font-serif text-[32px] md:text-[46px] font-semibold tracking-tight text-clin-900 leading-[1.1]">Tratamientos Especializados</h2>
              <p className="text-sm text-clin-600 mt-4 max-w-lg mb-1 leading-relaxed">Cada procedimiento es aplicado por profesionales certificadas bajo la supervisión médica que garantiza la máxima seguridad corporal y facial.</p>
            </div>
            <div className="flex p-1.5 rounded-full bg-gold-100/80 border border-gold-200 self-start">
              {(['facial','corporal','premium'] as const).map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase cursor-pointer duration-200 transition-all ${activeCategory === cat ? 'bg-clin-900 text-white shadow-sm' : 'text-clin-600 hover:text-clin-900'}`}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredTreatments.map((treatment) => (
                <motion.div key={treatment.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}
                  className="rounded-3xl border border-gold-200 bg-gold-50/15 overflow-hidden p-6 hover:bg-white flex flex-col justify-between group transition-all duration-300 relative shadow-sm hover:shadow-xl hover:-translate-y-1.5">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-wider bg-gold-100 text-gold-800 rounded-full uppercase">{treatment.duration}</span>
                      {treatment.technology && <span className="text-[10px] font-medium text-clin-500 uppercase truncate max-w-[150px]">{treatment.technology}</span>}
                    </div>
                    <h3 className="font-serif text-lg font-medium text-clin-900 group-hover:text-gold-700 transition-colors mb-2.5">{treatment.name}</h3>
                    <p className="text-xs text-clin-600 leading-relaxed mb-6">{treatment.shortDescription}</p>
                    <div className="space-y-2 mb-6">
                      {treatment.benefits.slice(0, 2).map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2 text-[11px] text-clin-700">
                          <CheckCircle2 className="h-3.5 w-3.5 text-gold-500 mt-0.5 shrink-0" /><span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gold-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-clin-400 block uppercase font-bold tracking-wider">Inversión</span>
                      <span className="text-xs font-semibold text-clin-800">
                        {treatment.priceRange === '$$' && 'Moderado'}{treatment.priceRange === '$$$' && 'Medio-Alto'}{treatment.priceRange === '$$$$' && 'Premium'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setSelectedTreatment(treatment)} className="text-xs font-bold text-clin-900 group-hover:text-gold-600 transition-colors py-2 px-3 border border-transparent group-hover:border-gold-300 rounded-full bg-gold-50/50 hover:bg-gold-50 duration-200 flex items-center gap-1 cursor-pointer">
                        Saber más <ChevronRight className="h-3 w-3" />
                      </button>
                      <button onClick={() => handleBookDirect(treatment.name)} className="p-2 bg-clin-900 text-white rounded-full hover:bg-gold-600 duration-200 cursor-pointer shadow-md" title="Reservar en WhatsApp">
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

      {/* 5. Before/After */}
      <BeforeAfterSlider />

      {/* 6. About */}
      <section className="py-24 bg-gold-50/40 relative overflow-hidden" id="sobre-nosotros">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-x-4 inset-y-4 border border-gold-300 rounded-[2.5rem] -rotate-3 -z-10" />
            <div className="relative rounded-[2.5rem] overflow-hidden bg-white shadow-xl border-4 border-white">
              <Image src="/alestetic-test/images/alestetic_clinic_1780755626959.webp"
                alt="Clínica estética Alestetic en Centro Comercial Viva Envigado, Envigado, Medellín"
                width={600} height={400} className="w-full h-[400px] object-cover hover:scale-105 duration-700 transition-transform" />
              <div className="absolute top-5 right-5 bg-clin-900/90 backdrop-blur-md rounded-2xl p-4 text-white border border-white/10 max-w-[220px] shadow-lg">
                <span className="text-[10px] text-gold-300 uppercase tracking-widest font-bold block mb-1">Ubicación</span>
                <p className="text-xs font-medium leading-normal">Fácil acceso y parqueadero en el Centro Comercial Viva Envigado, Medellín.</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-gold-600 block mb-2">BOUTIQUE EXPERIENCE</span>
            <h2 className="font-serif text-[32px] md:text-[46px] font-semibold tracking-tight text-clin-900 leading-[1.1] mb-6">
              Estética Médica con enfoque <span className="text-gradient italic block md:inline font-semibold">armónico y natural</span>
            </h2>
            <p className="text-sm text-clin-700 leading-relaxed mb-8">En Alestetic entendemos la estética no como un cambio radical, sino como la potenciación de los rasgos propios y el cuidado de la salud cutánea. Nuestra consulta boutique ofrece ambientes íntimos, protocolos estrictos de higiene y profesionales dedicadas enteramente al tratamiento integral de tu cuerpo y de tu rostro.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {[['01','Acompañamiento Profesional','Cada caso es valorado clínicamente para ofrecer terapias seguras óptimas.'],
                ['02','Equipos de Última Generación','Tecnología aprobada por el INVIMA para resultados estables y sin riesgos.'],
                ['03','Ambientes Privados de Relax','Suites aisladas acústicamente con aromaterapia y música ambiental relajante.'],
                ['04','Ética Cosmética','Priorizamos la salud sobre los estándares cosméticos irreales.']
              ].map(([num, title, desc]) => (
                <div key={num} className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-gold-100 flex items-center justify-center shrink-0 text-gold-700 font-bold text-sm">{num}</div>
                  <div>
                    <h4 className="text-sm font-bold text-clin-900 mb-1">{title}</h4>
                    <p className="text-xs text-clin-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="py-24 bg-white" id="testimonios">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-gold-600 block mb-2">EXPERIENCIAS REALES</span>
          <h2 className="font-serif text-[32px] md:text-[46px] font-semibold tracking-tight text-clin-900 leading-[1.1] mb-4">Nuestros huéspedes lo confirman</h2>
          <p className="text-xs sm:text-sm text-clin-500 max-w-lg mx-auto mb-16 leading-relaxed">La sonrisa y seguridad de nuestros pacientes son la mejor evidencia de nuestra dedicación profesional diaria.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {TESTIMONIALS.map((review) => (
              <div key={review.id} className="rounded-3xl border border-gold-200 bg-gold-50/10 p-6 flex flex-col justify-between hover:bg-white duration-300 transition-all hover:shadow-lg shadow-xs">
                <div>
                  <div className="flex items-center gap-1 mb-4 text-gold-500">
                    {[...Array(review.rating)].map((_, idx) => <Star key={idx} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="text-xs text-clin-600 italic leading-relaxed mb-6 font-medium">"{review.comment}"</p>
                </div>
                <div className="pt-4 border-t border-gold-100 flex items-center gap-3">
                  <div className="w-9 h-9 bg-gold-200 text-gold-900 rounded-full flex items-center justify-center font-bold text-xs uppercase shadow-sm">{review.name.charAt(0)}</div>
                  <div>
                    <p className="text-xs font-bold text-clin-900">{review.name}</p>
                    <span className="text-[10px] text-clin-400 block">{review.role}</span>
                    <span className="text-[9px] bg-gold-100/50 text-gold-800 py-0.5 px-1.5 rounded-md font-semibold inline-block mt-1">{review.treatment}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Booking & Contact */}
      <section className="py-24 bg-gold-100/30 relative border-t border-gold-200 overflow-hidden" id="reservar">
        <div className="absolute top-[30%] right-[10%] w-72 h-72 bg-gold-200/50 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.25em] text-gold-600 block mb-2">VISÍTANOS</span>
                <h2 className="font-serif text-[32px] md:text-[46px] font-semibold tracking-tight text-clin-900 leading-[1.1] mb-6">Programa tu visita</h2>
                <p className="text-sm text-clin-700 leading-relaxed mb-8">Te esperamos en nuestra sede premium del área metropolitana para diseñar la mejor versión de tu cutis y cuerpo.</p>
                <div className="space-y-6 mb-8">
                  {[
                    [MapPin, 'Sede Principal', 'Centro Comercial Viva Envigado', 'Local 324, Nivel 3. Envigado, Antioquia, Colombia.'],
                    [Clock, 'Horarios de Atención', 'Lunes a Sábado', '8:00 AM – 7:00 PM • Domingos por agenda previa.'],
                    [Phone, 'Línea WhatsApp', '(+57) 312 555 4321', null],
                  ].map(([Icon, label, main, sub], i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-white border border-gold-200 text-gold-600 flex items-center justify-center shrink-0 shadow-xs">
                        {React.createElement(Icon as React.ComponentType<{className:string}>, { className: 'h-5 w-5' })}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-clin-500 uppercase tracking-widest">{label as string}</h4>
                        <p className="text-sm text-clin-900 font-bold mt-1">{main as string}</p>
                        {sub && <p className="text-xs text-clin-600">{sub as string}</p>}
                        {i === 2 && <span className="inline-flex items-center gap-1 text-[10px] text-green-700 bg-green-50 px-2 py-0.5 rounded-full font-bold mt-1 uppercase"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping inline-block" />Online ahora</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-gold-200 p-4 rounded-3xl shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-clin-900 uppercase">Indicaciones de Acceso</span>
                  <span className="text-[9px] bg-gold-100 text-gold-700 py-0.5 px-2 rounded-full font-bold">Waze & Maps</span>
                </div>
                <div className="h-44 rounded-2xl bg-gold-50/70 relative overflow-hidden flex flex-col justify-center items-center border border-dashed border-gold-300 text-center p-4">
                  <MapPin className="h-8 w-8 text-gold-600 mb-2 animate-bounce" />
                  <p className="text-xs font-bold text-clin-900">Viva Envigado • Medellín</p>
                  <p className="text-[10px] text-clin-500 mt-1 max-w-[220px]">Ingresa por la torre médica comercial Nivel 3 para un acceso privado cómodo.</p>
                  <a href="https://waze.com/ul?ll=6.17254,-75.59131&navigate=yes" target="_blank" rel="noopener noreferrer"
                    className="mt-3 text-[10px] font-bold text-gold-700 hover:text-gold-900 underline flex items-center gap-1">
                    Abrir en Waze — CC Viva Envigado <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 bg-white rounded-3xl border border-gold-200 p-6 md:p-8 shadow-xl" id="formulario-reserva">
              <h3 className="font-serif text-xl md:text-2xl font-medium text-clin-900 mb-2">Solicitud de Valoración Personalizada</h3>
              <p className="text-xs text-clin-500 mb-6">Ingresa tus datos a continuación. El sistema generará una reserva clínica de valoración y te facilitará enviar toda la información directamente de un solo toque al WhatsApp institucional de Alestetic.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name-input" className="text-xs font-semibold text-clin-700">Nombre Completo *</label>
                    <input id="name-input" type="text" name="name" required value={formData.name} onChange={handleFormChange} placeholder="Ej: Carolina Giraldo" className="w-full text-xs p-3.5 rounded-xl border border-gold-200 outline-none focus:border-gold-500 hover:border-gold-300 transition-colors" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone-input" className="text-xs font-semibold text-clin-700">Celular WhatsApp *</label>
                    <input id="phone-input" type="tel" name="phone" required value={formData.phone} onChange={handleFormChange} placeholder="Ej: 312 4567890" className="w-full text-xs p-3.5 rounded-xl border border-gold-200 outline-none focus:border-gold-500 hover:border-gold-300 transition-colors" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="treatment-select" className="text-xs font-semibold text-clin-700">Tratamiento de Interés *</label>
                  <select id="treatment-select" name="treatment" value={formData.treatment} onChange={handleFormChange} className="w-full text-xs p-3.5 rounded-xl border border-gold-200 outline-none bg-white focus:border-gold-500 transition-colors">
                    {TREATMENTS.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                    <option value="Valoración Estética Facial General">Valoración Estética Facial General</option>
                    <option value="Valoración Estética Corporal General">Valoración Estética Corporal General</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="date-input" className="text-xs font-semibold text-clin-700">Fecha Tentativa</label>
                    <input id="date-input" type="date" name="date" value={formData.date} onChange={handleFormChange} className="w-full text-xs p-3.5 rounded-xl border border-gold-200 outline-none focus:border-gold-500 transition-colors" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="time-select" className="text-xs font-semibold text-clin-700">Hora Preferida</label>
                    <select id="time-select" name="time" value={formData.time} onChange={handleFormChange} className="w-full text-xs p-3.5 rounded-xl border border-gold-200 outline-none bg-white focus:border-gold-500 transition-colors">
                      <option value="">Por acordar con asesora</option>
                      <option value="Mañana (8:00 AM - 12:00 PM)">Mañana (8:00 AM - 12:00 PM)</option>
                      <option value="Mediodía (12:00 PM - 2:00 PM)">Mediodía (12:00 PM - 2:00 PM)</option>
                      <option value="Tarde (2:00 PM - 7:00 PM)">Tarde (2:00 PM - 7:00 PM)</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message-input" className="text-xs font-semibold text-clin-700">Observaciones o Preocupación Principal</label>
                  <textarea id="message-input" name="message" rows={3} value={formData.message} onChange={handleFormChange} placeholder="Cuéntanos un poco sobre tu tipo de piel o los objetivos que deseas alcanzar..." className="w-full text-xs p-3.5 rounded-xl border border-gold-200 outline-none resize-none focus:border-gold-500 transition-colors" />
                </div>
                <button type="submit" className="w-full py-4 rounded-full bg-clin-900 hover:bg-gold-600 text-white font-bold text-xs shadow-lg cursor-pointer duration-200 transition-all flex items-center justify-center gap-2">
                  <Send className="h-4 w-4" /> Generar y Enviar a WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-24 bg-white" id="faq">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-gold-600 block mb-2">RESPUESTAS</span>
            <h2 className="font-serif text-[32px] md:text-[46px] font-semibold tracking-tight text-clin-900 leading-[1.1]">Preguntas Frecuentes</h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq) => {
              const isOpen = faqOpenId === faq.id;
              return (
                <div key={faq.id} className="rounded-2xl border border-gold-200 bg-gold-50/5 overflow-hidden">
                  <button onClick={() => setFaqOpenId(isOpen ? null : faq.id)}
                    className="w-full text-left p-5 flex items-center justify-between font-semibold text-xs sm:text-sm text-clin-900 focus:outline-none bg-white hover:bg-gold-50/20 transition-all duration-200 cursor-pointer">
                    <span>{faq.question}</span>
                    <ChevronDown className={`h-4 w-4 text-gold-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="bg-white">
                        <div className="p-5 pt-0 text-xs sm:text-sm text-clin-600 leading-relaxed border-t border-gold-100">{faq.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. Footer */}
      <footer className="bg-clin-900 text-gold-100/80 pt-16 pb-12 border-t-2 border-gold-400">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-clin-800 pb-12 mb-10">
          <div className="md:col-span-5">
            <a href="#inicio" className="flex items-center group mb-4 outline-none select-none">
              <AlesteticLogo variant="dark" size="sm" className="transition-transform duration-300 hover:scale-102" />
            </a>
            <p className="text-xs text-clin-300 leading-relaxed max-w-sm">Centro clínico estético integral dedicado a ofrecer tratamientos estéticos faciales y corporales de alto impacto biológico e hidratante, garantizando resultados armoniosos, éticos y seguros.</p>
          </div>
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-2">Servicios Clave</h4>
            <a href="#tratamientos" onClick={() => setActiveCategory('facial')} className="text-xs text-clin-300 hover:text-gold-400 transition-colors">Tratamientos Faciales</a>
            <a href="#tratamientos" onClick={() => setActiveCategory('corporal')} className="text-xs text-clin-300 hover:text-gold-400 transition-colors">Tratamientos Corporales</a>
            <a href="#tratamientos" onClick={() => setActiveCategory('premium')} className="text-xs text-clin-300 hover:text-gold-400 transition-colors">Láser Diodo Premium</a>
            <a href="#diagnostico" className="text-xs text-clin-300 hover:text-gold-400 transition-colors flex items-center gap-1">Test Evaluador de Piel <Sparkles className="h-3 w-3 text-gold-400" /></a>
          </div>
          <div className="md:col-span-4 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-2">Sede Viva Envigado</h4>
            <span className="text-xs text-clin-300 flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-gold-500" />Local 324, Centro Comercial Viva Envigado.</span>
            <span className="text-xs text-clin-300 flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-gold-500" />(+57) 312 555 4321</span>
            <span className="text-[10px] bg-clin-800 text-gold-300 border border-clin-700 py-1 px-2.5 rounded-lg font-medium self-start mt-2">Aprobado por el INVIMA • Protocolos Estrictos</span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-clin-400">
          <p>© {new Date().getFullYear()} Alestetic. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <span className="text-[10px]">Diseño y desarrollo por <a href="https://tresdobleu.com" target="_blank" rel="noopener noreferrer" className="font-bold text-gold-400 hover:text-white underline">Tresdobleu</a></span>
          </div>
        </div>
      </footer>

      {/* Treatment Modal */}
      <TreatmentModal treatment={selectedTreatment} onClose={() => setSelectedTreatment(null)} onBook={handleBookDirect} />

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSuccessModal(false)} className="absolute inset-0 bg-clin-900/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 text-center border border-gold-200 shadow-2xl z-10">
              <AlesteticLogo variant="light" size="sm" className="mb-3" />
              <div className="w-10 h-10 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="h-5 w-5" /></div>
              <h3 className="font-serif text-lg font-medium text-clin-900 mb-2">¡Solicitud Registrada Exitosamente!</h3>
              <p className="text-xs text-clin-600 leading-relaxed mb-6">Hemos preparado la solicitud de valoración clínica con tus preferencias estéticas. Presiona el botón a continuación para despacharla de forma instantánea a nuestra asesora en WhatsApp.</p>
              <div className="bg-gold-50/50 border border-gold-100 rounded-2xl p-4 text-left text-[11px] text-clin-700 space-y-1 mb-6">
                <p><strong>Paciente:</strong> {formData.name}</p>
                <p><strong>Tratamiento:</strong> {formData.treatment}</p>
                <p><strong>Fecha/Hora:</strong> {formData.date || 'Por acordar'} - {formData.time || 'Por acordar'}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowSuccessModal(false)} className="w-1/3 py-2.5 text-xs text-clin-600 font-bold border border-gold-200 rounded-full hover:bg-gold-50 cursor-pointer">Regresar</button>
                <button onClick={handleConfirmWhatsAppRedirect} className="w-2/3 py-2.5 bg-clin-900 hover:bg-gold-600 text-gold-100 hover:text-white text-xs font-bold rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-md">
                  <MessageCircle className="h-4 w-4 fill-current text-white" /> Abrir WhatsApp
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Widget (original animated) */}
      <div className="fixed bottom-20 right-6 z-40 flex flex-col items-end gap-2">
        <motion.div initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 3, duration: 0.5 }}
          className="bg-white text-clin-900 border border-gold-200 text-[11px] font-black tracking-tight px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-1.5 pointer-events-none select-none mb-1 hidden sm:flex">
          ¿Necesitas ayuda? 💬
        </motion.div>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
          onClick={() => handleBookDirect('Valoración Estética General')}
          className="w-14 h-14 bg-[#25D366] hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-xl cursor-pointer border border-white/20 transition-colors"
          title="Consúltanos por WhatsApp">
          <MessageCircle className="h-6 w-6 stroke-[2.5]" />
        </motion.button>
      </div>

    </div>
  );
}
