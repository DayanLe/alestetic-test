'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, Calendar, Check } from 'lucide-react';
import { TREATMENTS, Treatment } from '@/lib/data';

interface SkinQuizProps {
  onBookTreatment: (treatmentName: string) => void;
}

interface Question {
  id: number;
  questionText: string;
  options: {
    text: string;
    value: string;
    description?: string;
  }[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    questionText: '¿Cuál es la principal preocupación sobre tu rostro o cuerpo en este momento?',
    options: [
      { text: 'Líneas de expresión, arrugas profundas o flacidez facial', value: 'antiaging', description: 'Busco recuperar firmeza y rejuvenecer mi cutis.' },
      { text: 'Puntos negros, imperfecciones, poros abiertos o brillo excesivo', value: 'purification', description: 'Busco descongestionar mi piel y lograr balance.' },
      { text: 'Manchas de sol, melasma, paño o tono opaco y sin vida', value: 'radiance', description: 'Busco unificar la pigmentación y dar luminosidad.' },
      { text: 'Falta de firmeza corporal, grasa localizada o celulitis', value: 'body', description: 'Busco moldear mi silueta y tonificar la piel.' }
    ]
  },
  {
    id: 2,
    questionText: '¿Cómo percibes la textura y sensación de tu piel facial en las mañanas?',
    options: [
      { text: 'Tirante, áspera, opaca o con descamación leve', value: 'dry_sensitive', description: 'Requiere hidratación urgente y cuidado delicado.' },
      { text: 'Grasa al tacto, con brillo generalizado y tendencia a brotes', value: 'oily', description: 'Requiere regulación de sebo y purificación médica.' },
      { text: 'Brillante solo en frente y nariz (Zona T), mejillas normales', value: 'mixed', description: 'Requiere limpieza equilibrada e hidratación inteligente.' },
      { text: 'Suave, tersa, equilibrada, casi sin imperfecciones', value: 'normal', description: 'Busco mantenimiento preventivo y estimulación premium.' }
    ]
  },
  {
    id: 3,
    questionText: '¿Cuál es tu objetivo estético primordial para iniciar un tratamiento?',
    options: [
      { text: 'Ver mi piel mucho más tersa, rejuvenecida y firme', value: 'antiaging_goal', description: 'Acción preventiva y correctiva contra el envejecimiento.' },
      { text: 'Limpiar a profundidad impurezas acumuladas y desintoxicar', value: 'clean_goal', description: 'Eliminar comedones y sentir ligereza cutánea.' },
      { text: 'Desvanecer imperfecciones de pigmento y tener un look brillante', value: 'glow_goal', description: 'Reducir el melasma y manchas post-acné.' },
      { text: 'Reducir centímetros, moldear contorno o tensar tejidos corporales', value: 'body_goal', description: 'Tratamientos específicos de silueta corporal.' }
    ]
  }
];

export default function SkinQuiz({ onBookTreatment }: SkinQuizProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [recommendedTreatments, setRecommendedTreatments] = useState<Treatment[]>([]);

  const handleSelectOption = (value: string) => {
    setAnswers({ ...answers, [currentStep]: value });
  };

  const handleNext = () => {
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateResult = () => {
    // Determine profile based on chosen concerns and objectives
    const concern = answers[0]; // antiaging, purification, radiance, body
    const skinType = answers[1]; // dry_sensitive, oily, mixed, normal
    const goal = answers[2]; // antiaging_goal, clean_goal, glow_goal, body_goal

    let recommendations: Treatment[] = [];

    if (concern === 'body' || goal === 'body_goal') {
      // Recommend corporal treatments
      const reduction = TREATMENTS.find(t => t.id === 'criolipolisis');
      const radio = TREATMENTS.find(t => t.id === 'radiofrecuencia-firmeza-corp');
      const drenaje = TREATMENTS.find(t => t.id === 'drenaje-linfatico-manual');
      if (reduction) recommendations.push(reduction);
      if (radio) recommendations.push(radio);
      if (drenaje) recommendations.push(drenaje);
    } else if (concern === 'purification' || skinType === 'oily') {
      const limpieza = TREATMENTS.find(t => t.id === 'limpieza-exfoliacion');
      const peeling = TREATMENTS.find(t => t.id === 'correccion-acne');
      const bioest = TREATMENTS.find(t => t.id === 'bioestimulacion-colageno');
      if (limpieza) recommendations.push(limpieza);
      if (peeling) recommendations.push(peeling);
      if (bioest) recommendations.push(bioest);
    } else if (concern === 'radiance' || goal === 'glow_goal') {
      const laser = TREATMENTS.find(t => t.id === 'rejuvenecimiento-facial');
      const peeling = TREATMENTS.find(t => t.id === 'correccion-acne');
      const limpieza = TREATMENTS.find(t => t.id === 'limpieza-exfoliacion');
      if (laser) recommendations.push(laser);
      if (peeling) recommendations.push(peeling);
      if (limpieza) recommendations.push(limpieza);
    } else {
      // General aging or normal skin types
      const laser = TREATMENTS.find(t => t.id === 'rejuvenecimiento-facial');
      const bioest = TREATMENTS.find(t => t.id === 'bioestimulacion-colageno');
      const limpieza = TREATMENTS.find(t => t.id === 'limpieza-exfoliacion');
      if (laser) recommendations.push(laser);
      if (bioest) recommendations.push(bioest);
      if (limpieza) recommendations.push(limpieza);
    }

    // Default fallback if somehow none match
    if (recommendations.length === 0) {
      recommendations = TREATMENTS.slice(0, 3);
    }

    setRecommendedTreatments(recommendations);
    setQuizFinished(true);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setQuizFinished(false);
    setRecommendedTreatments([]);
  };

  const activeQuestion = QUIZ_QUESTIONS[currentStep];
  const isSelected = answers[currentStep] !== undefined;
  const progressPercent = Math.round(((currentStep + (quizFinished ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="w-full bg-white rounded-3xl p-6 md:p-8 border border-gold-200 shadow-xl relative overflow-hidden" id="skin-quiz-container">
      {/* Absolute gold glow circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-100/40 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-clin-500/5 rounded-full blur-3xl pointer-events-none -ml-16 -mb-16" />

      {/* Header */}
      <div className="flex items-center gap-2 mb-4 relative z-10" id="quiz-header">
        <div className="rounded-lg bg-gold-100 p-1.5 text-gold-600">
          <Sparkles className="h-4 w-4" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-gold-700">Asesor de Rutina Estética</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gold-100 h-1 rounded-full overflow-hidden mb-6 relative z-10" id="quiz-progress-bar">
        <motion.div
          className="bg-gold-500 h-full"
          initial={{ width: '0%' }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!quizFinished ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
            id={`quiz-step-${currentStep}`}
          >
            {/* Question Text */}
            <h3 className="font-serif text-lg md:text-xl font-medium text-clin-900 mb-6 leading-tight">
              {activeQuestion.questionText}
            </h3>

            {/* Options grid */}
            <div className="space-y-3 mb-8">
              {activeQuestion.options.map((option) => {
                const isCurrentSelection = answers[currentStep] === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleSelectOption(option.value)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5 group ${
                      isCurrentSelection
                        ? 'border-gold-500 bg-gold-50/70 shadow-sm ring-1 ring-gold-500'
                        : 'border-gold-200 hover:border-gold-400 bg-white hover:bg-gold-50/20'
                    }`}
                    id={`option-${option.value}`}
                  >
                    {/* Ring selector indicator */}
                    <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isCurrentSelection ? 'border-gold-500 bg-gold-500 text-white' : 'border-gold-300'
                    }`}>
                      {isCurrentSelection && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>

                    <div>
                      <p className={`text-sm font-semibold transition-colors ${
                        isCurrentSelection ? 'text-gold-950' : 'text-clin-900'
                      }`}>
                        {option.text}
                      </p>
                      {option.description && (
                        <p className={`text-xs mt-1 transition-colors ${
                          isCurrentSelection ? 'text-gold-800' : 'text-clin-500'
                        }`}>
                          {option.description}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation footer */}
            <div className="flex items-center justify-between border-t border-gold-100 pt-5">
              <button
                disabled={currentStep === 0}
                onClick={handleBack}
                className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full transition-colors ${
                  currentStep === 0
                    ? 'text-clin-300 cursor-not-allowed'
                    : 'text-clin-600 hover:bg-gold-100 hover:text-clin-900 cursor-pointer'
                }`}
                id="quiz-back-btn"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Atrás
              </button>

              <button
                disabled={!isSelected}
                onClick={handleNext}
                className={`flex items-center gap-1.5 text-xs font-semibold px-5 py-2.5 rounded-full shadow-md transition-all ${
                  isSelected
                    ? 'bg-clin-900 hover:bg-gold-600 text-white shadow-clin-900/10 cursor-pointer scale-100'
                    : 'bg-clin-100 text-clin-300 cursor-not-allowed scale-95'
                }`}
                id="quiz-next-btn"
              >
                {currentStep === QUIZ_QUESTIONS.length - 1 ? 'Calcular Diagnóstico' : 'Siguiente'}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 text-center"
            id="quiz-results"
          >
            <div className="w-14 h-14 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gold-600">
              <Sparkles className="h-6 w-6" />
            </div>

            <h3 className="font-serif text-xl md:text-2xl font-medium text-clin-900 mb-2">
              ¡Tu Diagnóstico de Piel está Listo!
            </h3>
            <p className="text-xs text-clin-600 max-w-sm mx-auto mb-6">
              Basado en tus respuestas, hemos elaborado una combinación ideal de tratamientos para nutrir y potenciar tu cutis.
            </p>

            {/* Recommendations map */}
            <div className="space-y-3.5 text-left max-w-md mx-auto mb-6">
              {recommendedTreatments.map((treatment) => (
                <div
                  key={treatment.id}
                  className="bg-gold-50/50 hover:bg-gold-50 border border-gold-200 rounded-2xl p-4 transition-colors flex items-start gap-3 shadow-xs"
                  id={`rec-${treatment.id}`}
                >
                  <div className="rounded-full bg-gold-600 text-white p-1 shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-clin-900 truncate">{treatment.name}</h4>
                    <p className="text-xs text-clin-500 mt-0.5 line-clamp-2 leading-relaxed">{treatment.shortDescription}</p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-[10px] bg-white border border-gold-300 py-0.5 px-2 rounded-full font-medium text-clin-600">
                        ⏱️ {treatment.duration}
                      </span>
                      {treatment.technology && (
                        <span className="text-[10px] bg-clin-50/70 border border-clin-200 py-0.5 px-2 rounded-full font-medium text-clin-700 truncate max-w-[180px]">
                          🛡️ {treatment.technology}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => onBookTreatment(treatment.name)}
                    className="self-center bg-clin-900 hover:bg-gold-600 text-white rounded-xl p-2.5 transition-colors cursor-pointer"
                    title="Reservar en WhatsApp"
                    id={`book-rec-${treatment.id}`}
                  >
                    <Calendar className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4 border-t border-gold-100">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs font-semibold text-clin-600 hover:text-clin-900 px-4 py-2.5 rounded-full hover:bg-gold-100 transition-colors cursor-pointer"
                id="quiz-retry-btn"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Hacer Test de Nuevo
              </button>
              <button
                onClick={() => onBookTreatment("Asesoría Especializada con Test de Piel")}
                className="px-6 py-3 bg-clin-900 hover:bg-gold-600 text-white rounded-full text-xs font-bold shadow-md shadow-clin-950/10 cursor-pointer transition-all duration-200"
                id="quiz-book-all-btn"
              >
                Agendar Plan Sugerido
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
