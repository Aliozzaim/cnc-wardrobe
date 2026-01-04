'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Calculator } from 'lucide-react';
import { EdgeBandingInstructions } from '@/components/edge-banding-instructions';
import { useLanguage } from '@/components/language-provider';

export default function OnboardingContent() {
    const { t } = useLanguage();

    return (
        <>
            {/* Language Support Card */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8">
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-700 dark:border-gray-600">
                            <CardContent className="pt-6">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    {t('multiLanguageSupport')}
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 text-green-500 mr-2" />
                                        English interface
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 text-green-500 mr-2" />
                                        Turkish interface
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 text-green-500 mr-2" />
                                        Localized calculations
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {t('howItWorks')}
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            {t('designYourCustomWardrobe')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            ['1', t('enterDimensions'), t('specifyWidthHeightDepth')],
                            ['2', t('configureOptions'), t('chooseMaterialsDoorsShelves')],
                            ['3', t('reviewResults'), t('check3DModelCosts')],
                            ['4', t('exportFiles'), t('downloadDXFCSV')],
                        ].map(([step, title, desc]) => (
                            <div key={step} className="text-center">
                                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{step}</span>
                                </div>
                                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Edge Banding */}
            <EdgeBandingInstructions />

            {/* CTA */}
            <section className="py-20 px-4 bg-blue-600 dark:bg-blue-700">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {t('readyToDesign')}
                    </h2>
                    <p className="text-xl text-blue-100 dark:text-blue-200 mb-8">
                        {t('joinThousands')}
                    </p>

                    <Link href="/app">
                        <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                            <Calculator className="mr-2 h-5 w-5" />
                            {t('startDesigningNow')}
                        </Button>
                    </Link>
                </div>
            </section>
        </>
    );
}
