import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { Check, Calculator, Cpu, FileText, Ruler } from 'lucide-react';

interface HomePageProps {
    translations: Record<string, string>;
}

export default function HomePage({ translations }: HomePageProps) {
    const t = (key: string) => translations[key] || key;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <Header />

            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <Badge className="mb-4 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        🎯 {t('professionalWoodworkingTool')}
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                        {t('title')}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                        {t('designCustomWardrobes')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/app">
                            <Button size="lg" className="text-lg px-8 py-6">
                                <Calculator className="mr-2 h-5 w-5" />
                                {t('startDesigning')}
                            </Button>
                        </Link>
                        <Link href="#features">
                            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                                {t('learnMore')}
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-4 bg-white dark:bg-gray-800">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {t('professionalFeaturesForWoodworkers')}
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            {t('everythingYouNeed')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-700 dark:border-gray-600">
                            <CardHeader>
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                                    <Ruler className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <CardTitle className="dark:text-white">{t('precisionCalculations')}</CardTitle>
                                <CardDescription className="dark:text-gray-300">
                                    {t('accurateMeasurements')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 text-green-500 mr-2" />
                                        {t('minWidth')} (300cm)
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 text-green-500 mr-2" />
                                        {t('material')} {t('thickness')} optimization
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 text-green-500 mr-2" />
                                        {t('edgeBandingCalculation')}
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-700 dark:border-gray-600">
                            <CardHeader>
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                                    <Cpu className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                                <CardTitle className="dark:text-white">{t('cncReadyExport')}</CardTitle>
                                <CardDescription className="dark:text-gray-300">
                                    {t('exportProfessionalFiles')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 text-green-500 mr-2" />
                                        {t('exportDxf')}
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 text-green-500 mr-2" />
                                        {t('exportCsv')}
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 text-green-500 mr-2" />
                                        {t('threeDVisualization')}
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-700 dark:border-gray-600">
                            <CardHeader>
                                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                                    <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                </div>
                                <CardTitle className="dark:text-white">{t('costOptimization')}</CardTitle>
                                <CardDescription className="dark:text-gray-300">
                                    {t('completeCostBreakdown')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 text-green-500 mr-2" />
                                        {t('material')} {t('cost')}
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 text-green-500 mr-2" />
                                        {t('bandCost')}
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 text-green-500 mr-2" />
                                        {t('totalCost')} optimization
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-700 dark:border-gray-600">
                            <CardHeader>
                                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                                    <Ruler className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <CardTitle className="dark:text-white">{t('multiLanguageSupport')}</CardTitle>
                                <CardDescription className="dark:text-gray-300">
                                    {t('availableInEnglishAndTurkish')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
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
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {t('enterDimensions')}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {t('specifyWidthHeightDepth')}
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-green-600 dark:text-green-400">2</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {t('configureOptions')}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {t('chooseMaterialsDoorsShelves')}
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {t('reviewResults')}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {t('check3DModelCosts')}
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">4</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {t('exportFiles')}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {t('downloadDXFCSV')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-white dark:bg-gray-800">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {t('readyToDesign')}
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                        {t('joinThousands')}
                    </p>
                    <Link href="/app">
                        <Button size="lg" className="text-lg px-8 py-6">
                            <Calculator className="mr-2 h-5 w-5" />
                            {t('startDesigningNow')}
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
