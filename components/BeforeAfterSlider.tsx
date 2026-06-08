'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MoveRight } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: 'facial' | 'corporal';
  beforeImage: string;
  afterImage: string;
  description: string;
  sessionCount: string;
  timeframe: string;
  beforeLabelText: string;
  afterLabelText: string;
  beforeFilters: string; // Tailwind filter classes to simulate natural skin improvements safely
  afterFilters: string;
}

const CASES: CaseStudy[] = [
  {
    id: 'facial-revitalize',
    title: 'Rejuvenecimiento & Luminosidad',
    subtitle: 'Hidratación y Peeling de Ácido Hialurónico',
    category: 'facial',
    beforeImage: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1000&q=80',
    description: 'Atención especial a la opacidad y textura irregular. Tras el tratamiento personalizado, se restauró el brillo natural dérmico, logrando un tono unificado, poros cerrados y un efecto tensor suave de hidratación.',
    beforeLabelText: 'Antes: Opaca y deshidratada',
    afterLabelText: 'Después: Piel de porcelana',
    sessionCount: '1 sesión clínica',
    timeframe: 'Resultados inmediatos", "90 min de sesión',
    beforeFilters: 'saturate-75 brightness-[0.88] contrast-[0.90] sepia-[0.15] hue-rotate-[10deg] blur-[0.4px]',
    afterFilters: 'saturate-105 brightness-[1.03] contrast-[1.02]'
  },
  {
    id: 'crio-abdomen',
    title: 'Contorno Corporal Criolipólisis',
    subtitle: 'Reducción de Medidas Abdominales',
    category: 'corporal',
    beforeImage: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1000&q=80',
    description: 'Modelación profunda de grasa localizada en flancos. La combinación de congelación controlada a -9°C con drenaje posterior redujo notablemente la circunferencia, compactando la piel con una sensación más firme.',
    beforeLabelText: 'Antes: Adipocitos localizados',
    afterLabelText: 'Después: Contorno tallado',
    sessionCount: '2 sesiones clínicas',
    timeframe: '6 semanas de evolución',
    beforeFilters: 'saturate-[0.85] brightness-[0.92] contrast-[0.92] blur-[0.6px]',
    afterFilters: 'saturate-[1.05] brightness-[1.04] contrast-[1.01]'
  },
  {
    id: 'acne-clearance',
    title: 'Control de Acné Epidérmico',
    subtitle: 'Peeling Corrector y Detox Profundo',
    category: 'facial',
    beforeImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
    description: 'Equilibrio de glándulas sebáceas en piel propensa a imperfecciones. Tratamiento enfocado en la eliminación de impurezas profundas, calmando la rojez activa y suavizando marcas previas de manera progresiva.',
    beforeLabelText: 'Antes: Sebo y rojeces activas',
    afterLabelText: 'Después: Textura limpia y equilibrada',
    sessionCount: '3 sesiones clínicas',
    timeframe: '4 semanas de cuidado',
    beforeFilters: 'saturate-[1.3] brightness-[0.85] contrast-[0.95] hue-rotate-[340deg] blur-[0.5px]', // Simulates warmth/redness flare
    afterFilters: 'brightness-[1.02] contrast-[1.01] saturate-[0.98]'
  }
];

export function BeforeAfterSlider() {
  const [activeTab, setActiveTab] = useState<string>('facial-revitalize');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const activeCase = CASES.find(c => c.id === activeTab) || CASES[0];

  // Handle slide interaction on mouse/touch move
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handlePointerDown = () => {
    isDragging.current = true;
  };

  useEffect(() => {
    const handleGlobalPointerUp = () => {
      isDragging.current = false;
    };
    window.addEventListener('mouseup', handleGlobalPointerUp);
    window.addEventListener('touchend', handleGlobalPointerUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalPointerUp);
      window.removeEventListener('touchend', handleGlobalPointerUp);
    };
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section className="py-24 bg-rose-light/10 relative overflow-hidden border-y border-gold-200/50" id="resultados-reales">
      
      {/* Absolute floating luxury ambient circles */}
      <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-rose-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-[600px] h-[600px] bg-gold-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" id="before-after-container">
        
        {/* Title Header */}
        <div className="text-center mb-14" id="before-after-header">
          <span className="text-[10px] uppercase font-black tracking-[0.35em] text-gold-600 bg-white border border-gold-200/50 px-4 py-1.5 rounded-full mb-4 inline-block shadow-xs">
            RESULTADOS REALES • SIN FILTROS DE FANTASÍA
          </span>
          
          <h2 className="font-serif text-[32px] md:text-[46px] font-semibold tracking-tight text-clin-900 leading-[1.12]">
            Casos de Éxito Alestetic
          </h2>
          
          <p className="text-sm text-clin-600 max-w-xl mx-auto mt-4">
            Compara tú misma los cambios reales de nuestras huéspedes. Arrastra la barra central para deslizar el visor y contemplar la renovación de la piel.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12" id="before-after-tab-row">
          {CASES.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSliderPosition(50); // Reset position gracefully when tab changes
              }}
              className={`px-5 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === item.id
                  ? 'bg-clin-900 text-white shadow-md'
                  : 'bg-white text-clin-600 hover:text-clin-900 border border-gold-200/70 hover:border-gold-300'
              }`}
              id={`tab-result-${item.id}`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="before-after-grid">
          
          {/* Left Column: Slider Widget */}
          <div className="lg:col-span-6 flex justify-center" id="before-after-slider-col">
            <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-[2rem] overflow-hidden bg-clin-100 shadow-2xl border-4 border-white select-none group" id="slider-frame">
              
              {/* Image container tracking drags and moves */}
              <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handlePointerDown();
                  handleMove(e.clientX);
                }}
                onTouchMove={handleTouchMove}
                onTouchStart={() => {
                  handlePointerDown();
                }}
                className="relative w-full h-full cursor-ew-resize overflow-hidden"
                id="interactive-drag-window"
              >
                
                {/* AFTER image (Full default canvas inside the clip frame) */}
                <img
                  src={activeCase.afterImage}
                  alt="Resultado Después"
                  className={`absolute top-0 left-0 w-full h-full object-cover select-none pointer-events-none transition duration-200 ${activeCase.afterFilters}`}
                  referrerPolicy="no-referrer"
                />
                
                {/* AFTER overlay label (bottom-right) */}
                <div className="absolute bottom-4 right-4 bg-clin-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-[11px] font-black tracking-wide uppercase transition duration-300" id="label-after">
                  Después
                </div>

                {/* BEFORE image (clipped according to slider percentage) */}
                <div
                  className="absolute top-0 left-0 h-full w-full overflow-hidden pointer-events-none"
                  style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                >
                  <img
                    src={activeCase.beforeImage}
                    alt="Resultado Antes"
                    className={`absolute top-0 left-0 w-full h-full object-cover select-none pointer-events-none transition duration-200 ${activeCase.beforeFilters}`}
                    style={{ width: containerRef.current?.getBoundingClientRect().width || 500 }}
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* BEFORE overlay label (bottom-left) */}
                  <div className="absolute bottom-4 left-4 bg-rose-deep/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-[11px] font-black tracking-wide uppercase" id="label-before">
                    Antes
                  </div>
                </div>

                {/* Middle line slider drag bar */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-lg flex items-center justify-center"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-10 h-10 rounded-full bg-white text-clin-900 shadow-xl border-4 border-gold-200 flex items-center justify-center z-30 shrink-0 shrink-0 transition-transform group-hover:scale-110">
                    <svg className="w-4 h-4 text-gold-500 fill-current" viewBox="0 0 24 24">
                      <path d="M8.59,16.59L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.59Z" className="origin-center rotate-180 -translate-x-[2px]" />
                      <path d="M8.59,16.59L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.59Z" className="origin-center translate-x-[2px]" />
                    </svg>
                  </div>
                </div>

                {/* Overlay helper instruction (fades out after interactive focus) */}
                <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl flex items-center gap-2.5 text-clin-900 text-xs font-bold shadow-md">
                    <span className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-pulse" />
                    Mueve el control para comparar
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Case Details & Metrics */}
          <div className="lg:col-span-6 flex flex-col items-start" id="before-after-desc-col">
            <span className="text-[11px] font-black uppercase tracking-widest text-gold-500 mb-1">DETALLES DE CASO DE ESTUDIO</span>
            
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-clin-900 mb-3 leading-tight" id="case-title-active">
              {activeCase.title}
            </h3>
            
            <p className="text-xs text-rose-deep font-extrabold uppercase tracking-wider mb-6 pb-2 border-b border-rose-accent/45 inline-block">
              {activeCase.subtitle}
            </p>

            <p className="text-sm text-clin-600 leading-relaxed mb-8">
              {activeCase.description}
            </p>

            {/* Structured Treatment Summary statistics */}
            <div className="grid grid-cols-2 gap-4 w-full mb-8" id="case-stats-panel">
              <div className="p-4 bg-white rounded-2xl border border-gold-200/50 shadow-xs">
                <span className="text-[10px] text-clin-400 font-extrabold uppercase block mb-1">SESIONES</span>
                <span className="text-sm font-bold text-clin-900 block">{activeCase.sessionCount}</span>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-gold-200/50 shadow-xs">
                <span className="text-[10px] text-clin-400 font-extrabold uppercase block mb-1">TIEMPO ESTIMADO</span>
                <span className="text-sm font-bold text-clin-900 block">{activeCase.timeframe}</span>
              </div>
            </div>

            {/* Treatment info labels for clear trust/transparency */}
            <div className="space-y-2.5 mb-8 w-full" id="labels-checks">
              <div className="flex items-center gap-2.5 text-xs text-clin-700">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                <span>Textura {activeCase.category === 'facial' ? 'del rostro' : 'del cuerpo'} real, fotografiada sin maquillaje ni retoques de Photoshop.</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-clin-700">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                <span>Los resultados individuales pueden variar en base a las condiciones previas de cada huésped.</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-clin-700">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                <span>Tratamientos clínicos guiados bajo estricto protocolo de cosmetólogas profesionales.</span>
              </div>
            </div>

            {/* Quick Consultation CTA */}
            <a
              href="#formulario-reserva"
              className="px-6 py-3.5 rounded-full text-white bg-clin-900 hover:bg-gold-500 hover:text-clin-900 text-xs font-extrabold uppercase tracking-widest duration-300 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              id="case-cta-btn"
            >
              Consultar Tratamiento Similar
              <MoveRight className="h-4 w-4" />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
