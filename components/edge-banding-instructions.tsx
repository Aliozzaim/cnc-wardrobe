'use client';

import { useLanguage } from './language-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export function EdgeBandingInstructions() {
    const { t } = useLanguage();

    return (
        <section className="py-20 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {t('edgeBandingInstructions')}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {t('clearAndUnambiguous')} - {t('cncOperatorTable')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <Card className="border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl">{t('manufacturingRules')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2 mt-1">✓</span>
                                    <span>{t('onlyVisibleEdges')}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-500 mr-2 mt-1">✗</span>
                                    <span>{t('backFacingEdges')}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2 mt-1">→</span>
                                    <span>{t('shelvesBandedFront')}</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl">Edge Banding Format</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 font-mono text-sm">
                                <div className="text-green-600">
                                    {t('frontEdgeBanded')}
                                </div>
                                <div className="text-green-600">
                                    {t('leftEdgeBanded')}
                                </div>
                                <div className="text-green-600">
                                    {t('rightEdgeBanded')}
                                </div>
                                <div className="text-red-600">
                                    {t('backEdgeNotBanded')}
                                </div>
                                <div className="text-green-600">
                                    {t('topEdgeBanded')}
                                </div>
                                <div className="text-green-600">
                                    {t('bottomEdgeBanded')}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Example CNC Operator Table */}
                <Card className="border-0 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl">Sample CNC Operator Table</CardTitle>
                        <CardDescription>
                            Example for a 300×500×300cm wardrobe with 3 shelves
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-4 py-2 text-left">Part Name</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Front Edge</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Back Edge</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Left Edge</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Right Edge</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Top Edge</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Bottom Edge</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2 font-medium">Side Panels (2x)</td>
                                        <td className="border border-gray-300 px-4 py-2 text-green-600">Banded</td>
                                        <td className="border border-gray-300 px-4 py-2 text-red-600">Not Banded</td>
                                        <td className="border border-gray-300 px-4 py-2 text-green-600">Banded</td>
                                        <td className="border border-gray-300 px-4 py-2 text-green-600">Banded</td>
                                        <td className="border border-gray-300 px-4 py-2 text-green-600">Banded</td>
                                        <td className="border border-gray-300 px-4 py-2 text-green-600">Banded</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2 font-medium">Top & Bottom Panels (2x)</td>
                                        <td className="border border-gray-300 px-4 py-2 text-green-600">Banded</td>
                                        <td className="border border-gray-300 px-4 py-2 text-red-600">Not Banded</td>
                                        <td className="border border-gray-300 px-4 py-2 text-green-600">Banded</td>
                                        <td className="border border-gray-300 px-4 py-2 text-green-600">Banded</td>
                                        <td className="border border-gray-300 px-4 py-2 text-red-600">Not Banded</td>
                                        <td className="border border-gray-300 px-4 py-2 text-red-600">Not Banded</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2 font-medium">Shelves (3x)</td>
                                        <td className="border border-gray-300 px-4 py-2 text-green-600">Banded</td>
                                        <td className="border border-gray-300 px-4 py-2 text-red-600">Not Banded</td>
                                        <td className="border border-gray-300 px-4 py-2 text-red-600">Not Banded</td>
                                        <td className="border border-gray-300 px-4 py-2 text-red-600">Not Banded</td>
                                        <td className="border border-gray-300 px-4 py-2 text-red-600">Not Banded</td>
                                        <td className="border border-gray-300 px-4 py-2 text-red-600">Not Banded</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2 font-medium">Back Panel (1x)</td>
                                        <td className="border border-gray-300 px-4 py-2 text-red-600">Not Banded</td>
                                        <td className="border border-gray-300 px-4 py-2 text-red-600">Not Banded</td>
                                        <td className="border border-gray-300 px-4 py-2 text-red-600">Not Banded</td>
                                        <td className="border border-gray-300 px-4 py-2 text-red-600">Not Banded</td>
                                        <td className="border border-gray-300 px-4 py-2 text-red-600">Not Banded</td>
                                        <td className="border border-gray-300 px-4 py-2 text-red-600">Not Banded</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 text-sm text-gray-600">
                            <p><strong>Note:</strong> This table is automatically generated for each project based on your specific wardrobe dimensions and configuration.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
