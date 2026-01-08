import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { translations } from '@/lib/i18n';
import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Contact Us | CNC Wardrobe Calculator',
    description: 'Get in touch with our carpentry services. Professional woodworking and CNC plan implementation in Samsun.',
    keywords: [
        'contact',
        'carpentry services',
        'woodworking',
        'Samsun',
        'CNC plans',
        'custom furniture',
    ],
};

export default async function ContactPage() {
    const cookieStore = await cookies();
    const language = (cookieStore.get('language')?.value as 'en' | 'tr') || 'en';
    const t = (key: string) => translations[language][key as keyof typeof translations[typeof language]] || key;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <Header />

            {/* Hero Section */}
            <section className="py-20 px-2">
                <div className="max-w-4xl mx-auto text-center">
                    <Badge className="mb-2 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
                        🛠️ {t('contactUs')}
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        {t('professionalCarpentryServices')}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                        {t('experiencedCarpenters')}
                    </p>
                </div>
            </section>

            {/* Contact Information */}
            <section className=" px-4 ">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">

                        {/* Carpentry Services Contact */}
                        <Card className="border-2 border-amber-200 dark:border-amber-800 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                                    <span className="text-2xl">🛠️</span>
                                    {t('carpentryServices')}
                                </CardTitle>
                                <CardDescription>
                                    {t('readyToBringDesignToLife')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-xl">📍</span>
                                    <div>
                                        <div className="font-medium">{t('workshopAddress')}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Derebahçe Mahallesi, Kafkas Caddesi No:31, Samsun
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-xl">📱</span>
                                    <div>
                                        <div className="font-medium">{t('phone')}</div>
                                        <a
                                            href="tel:+905339545508"
                                            className="text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 transition-colors"
                                        >
                                            0533 954 55 08
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-xl">📸</span>
                                    <div>
                                        <div className="font-medium">{t('instagram')}</div>
                                        <a
                                            href="https://www.instagram.com/ozzaim_ahsap/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 transition-colors"
                                        >
                                            @ozzaim_ahsap
                                        </a>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Website Developer Contact */}
                        <Card className="border-2 border-blue-200 dark:border-blue-800 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                                    <span className="text-2xl">💻</span>
                                    {t('websiteDeveloper')}
                                </CardTitle>
                                <CardDescription>
                                    {t('designedAndBuiltBy')} {t('aliOzzAim')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-xl">🌐</span>
                                    <div>
                                        <div className="font-medium">{t('portfolioWebsite')}</div>
                                        <a
                                            href="https://www.aliozzaim.lol/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                        >
                                            aliozzaim.lol
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-xl">💼</span>
                                    <div>
                                        <div className="font-medium">{t('linkedin')}</div>
                                        <a
                                            href="https://www.linkedin.com/in/ali-riza-ozzaim-8b1ba320a/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-700 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400 transition-colors"
                                        >
                                            Ali Rıza Ozzaim
                                        </a>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-12 text-center">
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                {t('gotYourCncPlan')}
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                                {t('followUsForInspiration')}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/app">
                                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                                        🛠️ Start Designing
                                    </button>
                                </Link>
                                <a
                                    href="https://www.instagram.com/ozzaim_ahsap/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    📸 Contact Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}