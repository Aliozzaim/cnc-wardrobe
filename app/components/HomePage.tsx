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

            {/* Professional Carpentry Services */}
            <section className="py-20 px-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            🛠️ {t('professionalCarpentryServices')}
                        </h2>
                        <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
                            {t('gotYourCncPlan')}
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                            {t('experiencedCarpenters')}
                        </p>
                    </div>

                    <Card className="max-w-md mx-auto border-2 border-amber-200 dark:border-amber-800 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <CardContent className="p-8">
                            <div className="text-4xl mb-4">📞</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                {t('contactUs')}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                {t('readyToBringDesignToLife')}
                            </p>
                            <a
                                href="https://www.instagram.com/ozzaim_ahsap/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                                @ozzaim_ahsap
                            </a>
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                                <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">📍</span>
                                        <span>Derebahçe Mahallesi, Kafkas Caddesi No:31, Samsun</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">📱</span>
                                        <a href="tel:+905339545508" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                                            +(90) 533 954 55 08
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                                {t('followUsForInspiration')}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}
