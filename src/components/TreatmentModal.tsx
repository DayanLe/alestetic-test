import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Calendar, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { Treatment } from '../data';

interface TreatmentModalProps {
  treatment: Treatment | null;
  onClose: () => void;
  onBook: (treatmentName: string) => void;
}

export default function TreatmentModal({ treatment, onClose, onBook }: TreatmentModalProps) {
  if (!treatment) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="treatment-modal-overlay">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-clin-900/60 backdrop-blur-sm"
          id="treatment-modal-backdrop"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-gold-50 shadow-2xl border border-gold-200"
          id="treatment-modal-card"
        >
          {/* Header decorative accent */}
          <div className="h-2 w-full bg-gradient-to-r from-gold-300 via-gold-400 to-rose-accent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-clin-600 hover:bg-white hover:text-clin-900 transition-colors shadow-sm"
            aria-label="Cerrar"
            id="close-modal-btn"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            {/* Tag / Category */}
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-gold-700 bg-gold-100 rounded-full uppercase mb-3">
              Tratamiento {treatment.category === 'facial' ? 'Facial' : treatment.category === 'corporal' ? 'Corporal' : 'Médico Especial'}
            </span>

            {/* Title */}
            <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-clin-900 mb-4">
              {treatment.name}
            </h2>

            {/* Description */}
            <p className="text-clin-700 text-sm md:text-base leading-relaxed mb-6">
              {treatment.fullDescription}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Left Details column */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-gold-100 p-2 text-gold-600 mt-0.5">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-clin-500 uppercase tracking-wider">Duración de Sesión</h4>
                    <p className="text-sm font-medium text-clin-900">{treatment.duration}</p>
                  </div>
                </div>

                {/* Technology if exists */}
                {treatment.technology && (
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-clin-100 p-2 text-clin-600 mt-0.5">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-clin-500 uppercase tracking-wider">Tecnología Aplicada</h4>
                      <p className="text-sm font-medium text-clin-900">{treatment.technology}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-gold-100 p-2 text-gold-600 mt-0.5">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-clin-500 uppercase tracking-wider">Incapacidad / Recuperación</h4>
                    <p className="text-sm font-medium text-clin-900">{treatment.recovery}</p>
                  </div>
                </div>
              </div>

              {/* Right Details column (Benefits) */}
              <div className="bg-white rounded-2xl p-5 border border-gold-100 shadow-sm">
                <h4 className="text-xs font-bold text-clin-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-gold-500" />
                  Beneficios Clave
                </h4>
                <ul className="space-y-2.5">
                  {treatment.benefits.map((benefit, i) => (
                    <li key={i} className="flex gap-2 text-xs leading-relaxed text-clin-700">
                      <div className="rounded-full bg-gold-50 p-0.5 text-gold-600 shrink-0 mt-0.5">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Price and Call-To-Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gold-200">
              <div className="text-center sm:text-left">
                <span className="text-xs text-clin-500 block">Rango de precio estimado</span>
                <span className="text-lg font-semibold text-clin-900">
                  {treatment.priceRange === '$$' && 'Inversión Moderada'}
                  {treatment.priceRange === '$$$' && 'Inversión Media-Alta'}
                  {treatment.priceRange === '$$$$' && 'Exclusivo / Premium'}
                </span>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="w-1/2 sm:w-auto px-5 py-3 text-xs font-medium text-clin-700 border border-gold-300 rounded-full hover:bg-gold-100 transition-colors cursor-pointer"
                  id="cancel-modal-btn"
                >
                  Regresar
                </button>
                <button
                  onClick={() => onBook(treatment.name)}
                  className="w-1/2 sm:w-auto px-6 py-3 text-xs font-semibold text-white bg-gradient-to-r from-clin-900 via-gold-600 to-gold-500 hover:from-gold-500 hover:to-rose-deep rounded-full transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  id="book-modal-btn"
                >
                  <Calendar className="h-4 w-4" />
                  Reservar Cita
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
