import { Metadata } from 'next';
import { LanguageProvider } from '@/components/language-provider';
import HomePage from './components/HomePage';
import OnboardingContent from './components/OnboardingContent';

export const metadata: Metadata = {
  title: 'CNC Wardrobe Calculator | Free Online Tool for Woodworkers',
  description:
    'Professional CNC-ready wardrobe calculator. Generate precise cutting plans, calculate costs, and export to DXF/CSV.',
  keywords: [
    'CNC wardrobe calculator',
    'wardrobe design tool',
    'furniture calculator',
    'woodworking software',
    'CNC cutting plans',
    'custom wardrobe planner',
  ],
  openGraph: {
    title: 'CNC Wardrobe Calculator - Professional Woodworking Tool',
    description:
      'Design and calculate custom wardrobes with precision. Export CNC-ready plans.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CNC Wardrobe Calculator',
    description: 'Professional wardrobe design and CNC planning tool.',
  },
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      tr: '/tr',
    },
  },
};

export default function RootPage() {
  return (
    <LanguageProvider>
      <div className="flex flex-col">
        <HomePage />
      </div>
    </LanguageProvider>
  );
}
