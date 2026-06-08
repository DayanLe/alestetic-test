import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Estética Médica en Envigado – Tratamientos Faciales y Corporales | Alestetic',
  description:
    'Alestetic en Centro Comercial Viva Envigado, Medellín. Criolipólisis, radiofrecuencia, depilación láser, lifting facial y más con equipos certificados INVIMA. Agenda tu valoración gratuita hoy.',
  metadataBase: new URL('https://dayanle.github.io'),
  alternates: {
    canonical: '/alestetic-test/',
  },
  openGraph: {
    type: 'website',
    url: 'https://dayanle.github.io/alestetic-test/',
    title: 'Alestetic – Centro de Estética Médica | Viva Envigado, Medellín',
    description:
      'Tratamientos faciales y corporales con equipos INVIMA certificados. Criolipólisis, radiofrecuencia y depilación láser en Envigado, Medellín.',
    locale: 'es_CO',
    siteName: 'Alestetic',
    images: [{ url: '/alestetic-test/images/alestetic_hero_1780755609656.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alestetic – Centro de Estética Médica | Viva Envigado',
    description: 'Tratamientos faciales y corporales premium en Viva Envigado, Medellín. INVIMA certificado.',
    images: ['/alestetic-test/images/alestetic_hero_1780755609656.webp'],
  },
  robots: { index: true, follow: true },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  name: 'Alestetic – Centro de Estética Médica',
  url: 'https://dayanle.github.io/alestetic-test/',
  description:
    'Centro de estética médica en Viva Envigado, Medellín. Tratamientos faciales y corporales con equipos INVIMA certificados: criolipólisis, radiofrecuencia, depilación láser, lifting facial y más.',
  telephone: '+573125554321',
  priceRange: '$$–$$$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Local 324, Nivel 3, Centro Comercial Viva Envigado',
    addressLocality: 'Envigado',
    addressRegion: 'Antioquia',
    postalCode: '055422',
    addressCountry: 'CO',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 6.17254, longitude: -75.59131 },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '19:00',
    },
  ],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: '4', bestRating: '5' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Con cuánta anticipación debo agendar mi cita en Alestetic?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Recomendamos agendar su valoración u tratamiento con 3 a 5 días de anticipación para poder garantizarle el horario de su preferencia, especialmente en fines de semana o tardes. Alestetic atiende de lunes a sábado de 8:00 AM a 7:00 PM en el Centro Comercial Viva Envigado, Local 324, Nivel 3.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué incluye la consulta de valoración estética en Alestetic?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nuestra valoración inicial es exhaustiva y personalizada. Una especialista esteticista evalúa el fototipo cutáneo, el grado de hidratación, elasticidad y grasa, analiza tus objetivos específicos y diseña un plan terapéutico a tu medida, explicándote tecnologías sugeridas y cronograma.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Tienen protocolos de bioseguridad y equipos certificados INVIMA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutamente. En Alestetic la salud es prioridad. Toda nuestra aparatología cuenta con registro sanitario INVIMA certificado. Utilizamos consumibles desechables premium de un solo uso y esterilización quirúrgica en todos los instrumentos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Los tratamientos corporales de Alestetic requieren dietas extremas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Nuestros tratamientos de reducción y moldeamiento son moldeadores inductivos. Recomendamos mantener una hidratación abundante de agua para facilitar la vía de drenaje de adipocitos y llevar una alimentación balanceada general, sin necesidad de planes restrictivos extremos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Dónde está ubicado Alestetic en Colombia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nuestra sede principal se encuentra en el Local 324, Nivel 3 del Centro Comercial Viva Envigado, en el área metropolitana de Medellín, Antioquia. Contamos con parqueadero vigilado y fácil acceso desde toda el área metropolitana.',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preload" as="image" href="/alestetic-test/images/alestetic_hero_1780755609656.webp" />
        <meta name="geo.region" content="CO-ANT" />
        <meta name="geo.placename" content="Envigado, Antioquia" />
        <meta name="geo.position" content="6.17254;-75.59131" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
