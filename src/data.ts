export interface Treatment {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: 'facial' | 'corporal' | 'premium';
  duration: string;
  priceRange: string;
  benefits: string[];
  recovery: string;
  technology?: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  treatment: string;
  comment: string;
  rating: number;
  date: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const TREATMENTS: Treatment[] = [
  {
    id: 'limpieza-exfoliacion',
    name: 'Limpieza y Exfoliación Facial Profunda',
    shortDescription: 'Purificación total de la piel, eliminación de impurezas, renovación y oxigenación celular profunda.',
    fullDescription: 'El tratamiento higiénico facial insignia de Alestetic. Combina exfoliación ultrasónica avanzada, extracción meticulosa de impurezas, vapor de ozono y una mascarilla aclarante/descongestiva. Finaliza con una infusión hidratante profunda que restaura el brillo y suavidad natural de tu rostro.',
    category: 'facial',
    duration: '75 min',
    priceRange: '$$',
    benefits: [
      'Elimina impurezas, células muertas y puntos negros sin maltratar.',
      'Atenúa poros dilatados y previene la aparición de brotes.',
      'Propicia una oxigenación óptima celular y activa la microcirculación.',
      'Piel radiante, sedosa y lista para nutrirse profundamente.'
    ],
    recovery: 'Inmediata (sin incapacidad médica)',
    technology: 'Peeling Ultrasónico y Altafrecuencia'
  },
  {
    id: 'correccion-acne',
    name: 'Tratamiento de Corrección de Acné',
    shortDescription: 'Control de sebo, descongestión profunda y desinflamación biológica de pieles acneicas.',
    fullDescription: 'Programa especializado para pieles grasas o con tendencia acneica. Combinamos agentes químicos suaves (ácidos salicílicos/mandélicos) con terapia descongestiva manual para normalizar la producción de sebo, mitigar la inflamación y disminuir cicatrices o marcas activas.',
    category: 'facial',
    duration: '60 min',
    priceRange: '$$',
    benefits: [
      'Reduce significativamente la inflamación y enrojecimiento actino.',
      'Normaliza la glándula sebácea disminuyendo el brillo graso.',
      'Alinea la textura epidérmica para evitar marcas cicatrizales.',
      'Acción bactericida directa para mayor protección de la dermis.'
    ],
    recovery: 'Inmediata (Recomendable evitar el sol por 24 horas)',
    technology: 'Altafrecuencia dâArsonval y Mascarilla de Arcilla Purificante'
  },
  {
    id: 'rejuvenecimiento-facial',
    name: 'Rejuvenecimiento Facial Fotoactivado',
    shortDescription: 'Activación de colágeno y elastina para suavizar líneas de expresión, unificar tono y tensionar.',
    fullDescription: 'Luminosa terapia rejuvenecedora no invasiva. Estimulamos las capas profundas de la dermis para relanzar la producción biológica de colágeno. Atenúa líneas finas, mejora la firmeza alrededor de pómulos y óvalo facial, y aporta un efecto tensor radiante.',
    category: 'facial',
    duration: '60 min',
    priceRange: '$$$',
    benefits: [
      'Atenúa sensiblemente líneas y surcos de expresión.',
      'Promueve elasticidad y un efecto lifting natural instantáneo.',
      'Homogeneiza el tono facial reduciendo opacidad.',
      'Efectos progresivos duraderos sesión tras sesión.'
    ],
    recovery: 'Ninguna (Ligera rojez que disipa en 10 minutos)',
    technology: 'Radiofrecuencia Facial Tripolar Converted'
  },
  {
    id: 'hidratacion-intensa',
    name: 'Hidratación Profunda con Ácido Hialurónico',
    shortDescription: 'Micro-nutrición acuosa celular para pieles opacas, deshidratadas o expuestas.',
    fullDescription: 'Tratamiento de hidratación profunda y nutrición de la piel con ampollería de nanotecnología. Restaura el volumen hídrico ideal de la epidermis y estimula la regeneración natural para lograr una piel fresca, jugosa y de apariencia saludable.',
    category: 'facial',
    duration: '50 min',
    priceRange: '$$',
    benefits: [
      'Nutre y flexibiliza las capas de piel deshidratadas.',
      'Restaura instantáneamente el volumen y brillo natural.',
      'Combate los daños ocasionados por la contaminación y el sol.',
      'Otorga una textura de seda ideal previa a eventos.'
    ],
    recovery: 'Inmediata',
    technology: 'Electroporación Transdérmica de Ácido Hialurónico'
  },
  {
    id: 'control-rosacea',
    name: 'Terapia Calmante para Rosácea y Sensibilidad',
    shortDescription: 'Descongestión vascular, fortalecimiento de la barrera cutánea frente al enrojecimiento.',
    fullDescription: 'Protocolo ultra-respetuoso diseñado para pieles sensibilizadas, reactivas o diagnosticadas con rosácea. Aplicamos cócteles botánicos calmantes de alta gama junto con frío controlado para desinflamar los capilares dilatados y fortalecer la barrera lipídica de la piel.',
    category: 'facial',
    duration: '55 min',
    priceRange: '$$',
    benefits: [
      'Alivio inmediato de la picazón, tirantez y quemazón.',
      'Disminuye la apariencia de rojez difusa y capilares expuestos.',
      'Fortalece y repara la barrera cutánea debilitada.',
      'Sensación de frescura clínica duradera.'
    ],
    recovery: 'Inmediata (Altamente reconfortante)',
    technology: 'Crioterapia Facial Localizada y Mascarilla Hidrogel Calmante'
  },
  {
    id: 'lifting-facial-pro',
    name: 'Lifting Facial no Quirúrgico',
    shortDescription: 'Reposicionamiento muscular y contracción dérmica para redefinir el óvalo.',
    fullDescription: 'Reafirmación profunda que combate la flacidez del rostro sin agujas ni cirugías. Redefinimos el arco mandibular, levantamos pómulos y disminuimos la papada mediante la estimulación térmica y de microcorriente dirigida a las fibras elásticas del rostro.',
    category: 'facial',
    duration: '70 min',
    priceRange: '$$$',
    benefits: [
      'Redefinición visible del contorno facial y papada.',
      'Efecto lifting de cejas y pómulos caídos.',
      'Suaviza los pliegues nasogenianos y comisuras.',
      'Estimulación muscular tonificante.'
    ],
    recovery: 'Inmediata',
    technology: 'HIFU (Ultrasonido Focalizado de Alta Intensidad)'
  },
  {
    id: 'rejuvenecimiento-cuello-escote',
    name: 'Rejuvenecimiento de Cuello y Escote',
    shortDescription: 'Cuidado especializado para combatir la flacidez y las arrugas en zonas olvidadas.',
    fullDescription: 'La delicada piel de cuello y escote amerita especial atención clínica. Este tratamiento combina peeling de renovación celular, radiofrecuencia tensora e hidratación transdérmica específica para unificar tono, desvanecer arrugas en "anillo" y devolver firmeza estructural.',
    category: 'facial',
    duration: '50 min',
    priceRange: '$$',
    benefits: [
      'Disminuye la profundidad de las arrugas transversales del cuello.',
      'Tensa la piel flácida recuperando el soporte cervical.',
      'Trata manchas de sol y rojez difusa en el escote.',
      'Textura ultra-reconfortante y homogénea.'
    ],
    recovery: 'Inmediata',
    technology: 'Radiofrecuencia Tripolar y Cócteles Tensores'
  },
  {
    id: 'criolipolisis',
    name: 'Criolipólisis de Contorno (Grasa Localizada)',
    shortDescription: 'Eliminamos esa grasita que ya no quieres. Reducción definitiva de tejido adiposo mediante frío controlado.',
    fullDescription: 'Tratamiento estrella de remodelación corporal. Utiliza temperaturas bajas clínicamente moduladas para cristalizar y destruir células grasas no deseadas en abdomen, flancos, espalda o muslos. Los adipocitos eliminados se drenan naturalmente del cuerpo en las semanas siguientes, logrando reducciones permanentes y seguras sin pasar por quirófano.',
    category: 'corporal',
    duration: '90 min',
    priceRange: '$$$$',
    benefits: [
      'Reducción definitiva de grasa localizada rebelde.',
      'Altas tasas de disminución en centímetros desde la primera sesión.',
      'Alternativa médica no quirúrgica y no invasiva a la liposucción.',
      'No daña tejidos circundantes ni altera la vida laboral cotidiana.'
    ],
    recovery: 'Sutil sensibilidad al tacto de corta duración',
    technology: 'Criolipólisis de Succión Criostática Avanzada'
  },
  {
    id: 'moldeamiento-corporal',
    name: 'Moldeamiento Corporal & Reducción Pro',
    shortDescription: 'Eliminación dirigida de grasa localizada, movilización metabólica y modelamiento.',
    fullDescription: 'La combinación perfecta de ultracavitación, masajes reductores intensos y drenaje linfático asistido para esculpir la silueta. Este tratamiento ayuda a movilizar depósitos de adipocitos resistentes en cintura, espalda o caderas mientras estimula la eliminación de toxinas retenidas.',
    category: 'corporal',
    duration: '80 min',
    priceRange: '$$$',
    benefits: [
      'Reducción de centímetros en zonas foco específicas.',
      'Remodelamiento de curvas lumbares y flancos.',
      'Reactiva el drenaje de líquidos y toxinas estancadas.',
      'Resultados evidentes combinándolo con hábitos saludables.'
    ],
    recovery: 'Inmediata',
    technology: 'Ultracavitación de Alta Frecuencia y Vacuoterapia'
  },
  {
    id: 'radiofrecuencia-firmeza-corp',
    name: 'Radiofrecuencia Corporal Tensora',
    shortDescription: 'Combate la flacidez de la piel y estimula colágeno en brazos, abdomen o piernas.',
    fullDescription: 'Terapia térmica de alta gama diseñada exclusivamente para reafirmar y devolver la turgencia a la piel corporal. Ideal para combatir la flacidez post-natal, tras pérdidas abruptas de peso o para atenuar depósitos celulíticos en muslos, glúteos y brazos.',
    category: 'corporal',
    duration: '60 min',
    priceRange: '$$$',
    benefits: [
      'Tensa drásticamente la elasticidad cutánea flácida.',
      'Otorga una superficie de piel tersa, mitigando celulitis.',
      'Promueve la micro-circulación de nutrientes locales.',
      'Es un procedimiento tibio, cómodo y relajante.'
    ],
    technology: 'Radiofrecuencia Multi-Polar y Termo-Estímulo',
    recovery: 'Inmediata'
  },
  {
    id: 'drenaje-linfatico-manual',
    name: 'Drenaje Linfático Manual Clínico',
    shortDescription: 'Masaje terapéutico suave para la eliminación de toxinas, retención y post-quirúrgicos.',
    fullDescription: 'Maniobras manuales rítmicas, extremadamente suaves y precisas siguiendo el método clínico vodder. Indicado para eliminar retención de líquidos, aliviar la pesadez de piernas, desintoxicar el organismo y agilizar la recuperación de cirugías estéticas/plásticas.',
    category: 'corporal',
    duration: '60 min',
    priceRange: '$$',
    benefits: [
      'Excelente desinflamatorio para edemas y pesadez.',
      'Acelera la desinflamación y cicatrización en post-operatorios.',
      'Estimula las defensas naturales y el confort celular general.',
      'Extremadamente relajante para el sistema nervioso.'
    ],
    recovery: 'Inmediata (Profundamente descansado)',
    technology: 'Terapia Manual Vodder y Posicionamientos Anatómicos'
  },
  {
    id: 'depilacion-laser',
    name: 'Depilación Láser Diodo Premium',
    shortDescription: 'Eliminación permanente del vello corporal de forma segura, indolora y sumamente rápida.',
    fullDescription: 'El estándar de oro en depilación definitiva. Equipos de grado médico que calientan controladamente el folículo para inhibir el crecimiento del vello protector de la epidermis. Ofrece cabezal súper refrigerado "Ice Protect" para que el tratamiento sea sumamente cómodo y rápido en cualquier zona.',
    category: 'premium',
    duration: '30 a 60 min',
    priceRange: '$$$',
    benefits: [
      'Elimina definitivamente el vello de forma progresiva.',
      'Mejora y cura la foliculitis (vellos encarnados) de inmediato.',
      'Sesiones veloces y cabezal frío al tacto casi indoloro.',
      'Apta y segura para todos los fototipos de piel.'
    ],
    recovery: 'Inmediata',
    technology: 'Láser Diodo de Tres Longitudes de Onda con Cabezal Ice'
  },
  {
    id: 'bioestimulacion-colageno',
    name: 'Bioestimulación de Colágeno Inteligente',
    shortDescription: 'Terapia inductora de colágeno facial con micro-nutrientes péptidos antiedad.',
    fullDescription: 'Una bioestimulación regeneradora de vanguardia para refrescar integralmente el cutis. Empleamos micro-punciones milimétricas para introducir principios activos puros de grado médico (péptidos tensores, vitaminas y antioxidantes), induciendo una rápida renovación celular e incremento de la densidad de la piel.',
    category: 'premium',
    duration: '75 min',
    priceRange: '$$$$',
    benefits: [
      'Redensifica e incrementa la turgencia y firmeza de la piel.',
      'Disminuye marcas de acné, poros dilatados y líneas de expresión.',
      'Hidrata en las capas reales más profundas de la dermis.',
      'Efecto glowing o piel de porcelana ultra-saludable.'
    ],
    recovery: 'Evitar maquillaje y ejercicio por 24 horas',
    technology: 'Microneedling Clínico de Fraccionamiento Inductivo'
  }
];

export const TESTIMONIALS: Review[] = [
  {
    id: 'rev-1',
    name: 'Camila Restrepo',
    role: 'Paciente de Medellín',
    treatment: 'Limpieza Facial Profunda + Hidratación',
    comment: '¡Mi piel nunca se sintió tan liviana y fresca! Las esteticistas son increíblemente cuidadosas, te explican cada paso y la suite es sumamente relajante con aromaterapia única. Alestetic en Viva Envigado es mi lugar favorito.',
    rating: 5,
    date: 'Hace 2 semanas'
  },
  {
    id: 'rev-2',
    name: 'Mateo Giraldo',
    role: 'Deportista y Paciente',
    treatment: 'Drenaje Linfático Manual Clínico',
    comment: 'Excelente atención. Fui por retención de líquidos y cansancio muscular post-maratón. La técnica manual del especialista es impecable. Sales renovado, con una sensación de ligereza increíble.',
    rating: 5,
    date: 'Hace 1 mes'
  },
  {
    id: 'rev-3',
    name: 'Mariana Bedoya',
    role: 'Paciente de Envigado',
    treatment: 'Rejuvenecimiento Láser',
    comment: 'Llevo 3 sesiones del rejuvenecimiento láser y los resultados en mis manchitas de sol son impresionantes. Mi cutis tiene un brillo homogéneo y las líneas finas de mis ojos disminuyeron drásticamente. Lo mega recomiendo.',
    rating: 5,
    date: 'Hace 3 semanas'
  },
  {
    id: 'rev-4',
    name: 'Valentina Espinosa',
    role: 'Paciente Corporal',
    treatment: 'Moldeamiento Corporal & Reducción Pro',
    comment: 'Completo profesionalismo. El plan es integral: tecnología avanzada combinado con masajes eficientes y consejos de hábitos saludables. He reducido 4 centímetros de abdomen y mi piel se ve muy firme.',
    rating: 5,
    date: 'Hace 2 meses'
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'faq-1',
    question: '¿Con cuánta anticipación debo agendar mi cita?',
    answer: 'Recomendamos agendar su valoración u tratamiento con 3 a 5 días de anticipación para poder garantizarle el horario de su preferencia, especialmente en fines de semana o tardes.'
  },
  {
    id: 'faq-2',
    question: '¿Qué incluye la consulta de valoración estetica?',
    answer: 'Nuestra valoración inicial es exhaustiva y personalizada. Una especialista esteticista evalúa el fototipo cutáneo, el grado de hidratación, elasticidad y grasa, analiza tus objetivos específicos y diseña un plan terapéutico a tu medida, explicándote tecnologías sugeridas y cronograma.'
  },
  {
    id: 'faq-3',
    question: '¿Tienen protocolos de bioseguridad y equipos certificados?',
    answer: 'Absolutamente. En Alestetic la salud es prioridad. Toda nuestra aparatología cuenta con registro sanitario INVIMA certificado. Utilizamos consumibles desechables premium de un solo uso y esterilización quirúrgica en todos los instrumentos.'
  },
  {
    id: 'faq-4',
    question: '¿Los tratamientos corporales requieren dietas extremas?',
    answer: 'No. Nuestros tratamientos de reducción y moldeamiento son moldeadores inductivos. Recomendamos mantener una hidratación abundante de agua para facilitar la vía de drenaje de adipocitos y llevar una alimentación balanceada general, sin necesidad de planes restrictivos extremos.'
  },
  {
    id: 'faq-5',
    question: '¿Dónde están ubicados en Colombia?',
    answer: 'Nuestra sede principal se encuentra estratégicamente ubicada en el área metropolitana de Medellín, en la zona exclusiva de Envigado (zona comercial Viva Envigado), facilitando el acceso, parqueadero vigilado y seguridad premium para todos nuestros huéspedes.'
  }
];
