'use client';

import React, { useState, useEffect } from 'react';
import { CncPart } from '../domain/types';
import { useLanguage } from '../../../components/language-provider';

interface WardrobeDiagramProps {
    parts: CncPart[];
}

export function WardrobeDiagram({ parts }: WardrobeDiagramProps) {
    const { t } = useLanguage();
    const [scale, setScale] = useState(0.5);

    useEffect(() => {
        const updateScale = () => {
            setScale(window.innerWidth < 768 ? 0.3 : 0.5);
        };

        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    // Calculate total dimensions for SVG
    const maxWidth = Math.max(...parts.map(p => p.widthMm));
    const totalHeight = parts.reduce((sum, p) => sum + p.heightMm + 20, 0); // 20px spacing

    const svgWidth = Math.max(maxWidth * scale + 200, 400); // Minimum width for mobile
    const svgHeight = Math.max(totalHeight * scale + 100, 300); // Minimum height for mobile

    // Calculate positions for each part
    const partPositions = parts.map((part, index) => {
        const previousPartsHeight = parts
            .slice(0, index)
            .reduce((sum, p) => sum + p.heightMm + 20, 0);
        return {
            ...part,
            y: 50 + previousPartsHeight * scale,
        };
    });

    return (
        <div className="wardrobe-diagram w-full">
            <div className="overflow-x-auto overflow-y-auto max-h-96 md:max-h-none">
                <svg
                    width={svgWidth}
                    height={svgHeight}
                    viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                    className="border border-border bg-background min-w-full h-auto"
                    style={{ maxWidth: '100%', height: 'auto' }}
                >
                    {partPositions.map((part) => {
                        const x = 50;
                        const y = part.y;
                        const width = part.widthMm * scale;
                        const height = part.heightMm * scale;

                        // Draw part rectangle
                        const rect = (
                            <rect
                                key={`part-${part.id}`}
                                x={x}
                                y={y}
                                width={width}
                                height={height}
                                fill="hsl(var(--muted))"
                                stroke="hsl(var(--border))"
                                strokeWidth="1"
                                rx="2"
                            />
                        );

                        // Draw dimensions
                        const dimensionLines = (
                            <g key={`dimensions-${part.id}`}>
                                {/* Width dimension */}
                                <line x1={x} y1={y - 10} x2={x + width} y2={y - 10} stroke="hsl(var(--foreground))" strokeWidth="1" />
                                <line x1={x} y1={y - 15} x2={x} y2={y - 5} stroke="hsl(var(--foreground))" strokeWidth="1" />
                                <line x1={x + width} y1={y - 15} x2={x + width} y2={y - 5} stroke="hsl(var(--foreground))" strokeWidth="1" />
                                <text x={x + width / 2} y={y - 20} textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))">
                                    {part.widthMm}mm
                                </text>

                                {/* Height dimension */}
                                <line x1={x - 10} y1={y} x2={x - 10} y2={y + height} stroke="hsl(var(--foreground))" strokeWidth="1" />
                                <line x1={x - 15} y1={y} x2={x - 5} y2={y} stroke="hsl(var(--foreground))" strokeWidth="1" />
                                <line x1={x - 15} y1={y + height} x2={x - 5} y2={y + height} stroke="hsl(var(--foreground))" strokeWidth="1" />
                                <text x={x - 25} y={y + height / 2} textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" transform={`rotate(-90 ${x - 25} ${y + height / 2})`}>
                                    {part.heightMm}mm
                                </text>
                            </g>
                        );

                        // Part label
                        const label = (
                            <text
                                key={`label-${part.id}`}
                                x={x + width / 2}
                                y={y + height / 2}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize="12"
                                fill="hsl(var(--foreground))"
                                fontWeight="bold"
                            >
                                {part.name}
                                {part.quantity > 1 ? ` (${part.quantity}x)` : ''}
                            </text>
                        );

                        // Thickness label
                        const thicknessLabel = (
                            <text
                                key={`thickness-${part.id}`}
                                x={x + width + 10}
                                y={y + height / 2}
                                textAnchor="start"
                                dominantBaseline="middle"
                                fontSize="10"
                                fill="hsl(var(--muted-foreground))"
                            >
                                {part.thicknessMm}mm {t('thickness').toLowerCase()}
                            </text>
                        );

                        return [rect, dimensionLines, label, thicknessLabel];
                    })}
                </svg>
            </div>

            <div className="mt-4 text-sm text-muted-foreground text-center">
                <p>{t('scale')}: 1:{(1/scale).toFixed(1)} | {t('allDimensionsInMm')}</p>
                <p>{t('totalPartsCount')}: {parts.length}</p>
            </div>
        </div>
    );
}