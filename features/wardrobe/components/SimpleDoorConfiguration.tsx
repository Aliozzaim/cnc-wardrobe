'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus } from 'lucide-react';
import { useWardrobe } from '../hooks/useWardrobe';
import { useDoorPanels } from '../context/DoorPanelContext';
import { useLanguage } from '../../../components/language-provider';

export interface SimpleDoorPanel {
    id: string;
    name: string;
    startYCm: number; // Distance from bottom
    endYCm: number; // Distance from bottom
    widthCm: number;
    heightCm: number;
    doorType: 'full' | 'left' | 'right';
}

export function SimpleDoorConfiguration() {
    const { input } = useWardrobe();
    const { doorPanels, addDoorPanel, removeDoorPanel, updateDoorPanel } = useDoorPanels();
    const { t } = useLanguage();

    // Calculate shelf positions
    const shelfPositions = React.useMemo(() => {
        const positions = [0]; // Bottom position
        let currentPos = 0;

        for (let i = 0; i < input.shelves; i++) {
            const shelfHeight = 60; // Default shelf height, could be made configurable
            const gap = 2; // Default gap
            currentPos += shelfHeight + gap;
            positions.push(currentPos);
        }

        return positions;
    }, [input.shelves]);

    const calculateDoorCost = (panel: SimpleDoorPanel) => {
        const areaM2 = (panel.widthCm * panel.heightCm) / 10000;
        const materialCost = areaM2 * input.pricePerM2;

        // Edge banding: all 4 edges
        const perimeterM = (panel.widthCm * 2 + panel.heightCm * 2) / 100;
        const bandingCost = perimeterM * input.bandPricePerMeter;

        return materialCost + bandingCost;
    };

    const totalDoorCost = doorPanels.reduce((sum, panel) => sum + calculateDoorCost(panel), 0);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('simpleDoorConfiguration')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Door Type Selection */}
                <div className="space-y-2">
                    <Label>{t('addDoorPanels')}</Label>
                    <div className="flex gap-2">
                        <Button
                            onClick={() => addDoorPanel('full', input.widthCm, input.heightCm)}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            {t('fullDoorBtn')}
                        </Button>
                        <Button
                            onClick={() => addDoorPanel('left', input.widthCm, input.heightCm)}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            {t('leftDoorBtn')}
                        </Button>
                        <Button
                            onClick={() => addDoorPanel('right', input.widthCm, input.heightCm)}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            {t('rightDoorBtn')}
                        </Button>
                    </div>
                </div>

                {/* Door Panels List */}
                {doorPanels.length > 0 && (
                    <div className="space-y-4">
                        <Label>{t('configuredDoorPanels')}</Label>
                        {doorPanels.map((panel) => (
                            <Card key={panel.id} className="border">
                                <CardContent className="pt-4">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="font-medium">{panel.name}</h4>
                                            <Badge variant="secondary" className="mt-1">
                                                {panel.doorType === 'full' ? 'Full Width' :
                                                    panel.doorType === 'left' ? 'Left Half' : 'Right Half'}
                                            </Badge>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeDoorPanel(panel.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>{t('startPosition')}</Label>
                                            <Input
                                                type="number"
                                                value={panel.startYCm}
                                                onChange={(e) => updateDoorPanel(panel.id, {
                                                    startYCm: parseFloat(e.target.value) || 0
                                                })}
                                                min="0"
                                                max={input.heightCm}
                                                step="0.1"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>{t('endPosition')}</Label>
                                            <Input
                                                type="number"
                                                value={panel.endYCm}
                                                onChange={(e) => updateDoorPanel(panel.id, {
                                                    endYCm: parseFloat(e.target.value) || 0
                                                })}
                                                min="0"
                                                max={input.heightCm}
                                                step="0.1"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-2 text-sm text-muted-foreground">
                                        Height: {(panel.endYCm - panel.startYCm).toFixed(1)}cm |
                                        Width: {panel.widthCm.toFixed(1)}cm |
                                        Cost: {t('currency')}{calculateDoorCost(panel).toFixed(2)}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Quick Shelf Reference */}
                <div className="space-y-2">
                    <Label>{t('shelfPositions')}</Label>
                    <div className="text-sm text-muted-foreground">
                        {shelfPositions.map((pos, index) => (
                            <span key={index} className="inline-block mr-4">
                                {t('shelf')} {index}: {pos.toFixed(1)}cm
                            </span>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                {doorPanels.length > 0 && (
                    <Card className="bg-muted">
                        <CardContent className="pt-4">
                            <h4 className="font-medium mb-2">{t('doorSummary')}</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-muted-foreground">{t('totalPanels')}:</span>
                                    <span className="ml-2 font-medium">{doorPanels.length}</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">{t('doorTotalCost')}:</span>
                                    <span className="ml-2 font-medium">{t('currency')}{totalDoorCost.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Manufacturing Notes */}
                            <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                                <h5 className="font-medium text-blue-900 mb-1">{t('manufacturingNotes')}</h5>
                                <ul className="text-xs text-blue-800 space-y-1">
                                    <li>• {t('doorThickness')}</li>
                                    <li>• {t('allEdgesRequireBanding')}</li>
                                    <li>• {t('splitDoorsGap')}</li>
                                    <li>• {t('fullDoorsOverlap')}</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Export Options */}
                {doorPanels.length > 0 && (
                    <div className="flex gap-2">
                        <Button
                            onClick={() => {
                                const csvContent = [
                                    ['Panel Name', 'Width (cm)', 'Height (cm)', 'Type', 'Cost (' + t('currency') + ')'],
                                    ...doorPanels.map(panel => [
                                        panel.name,
                                        panel.widthCm.toFixed(1),
                                        (panel.endYCm - panel.startYCm).toFixed(1),
                                        panel.doorType,
                                        calculateDoorCost(panel).toFixed(2)
                                    ])
                                ].map(row => row.join(',')).join('\n');

                                const blob = new Blob([csvContent], { type: 'text/csv' });
                                const url = window.URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = 'door-panels.csv';
                                a.click();
                                window.URL.revokeObjectURL(url);
                            }}
                            className="flex items-center gap-2"
                        >
                            {t('exportDoorPanels')}
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
