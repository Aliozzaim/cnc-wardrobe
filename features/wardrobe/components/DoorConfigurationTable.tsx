'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { CncDoorPart } from '../domain/door-types';

interface DoorConfigurationTableProps {
    cncParts: CncDoorPart[];
}

export function DoorConfigurationTable({ cncParts }: DoorConfigurationTableProps) {
    const exportCsv = () => {
        const headers = ['Part Name', 'Width (mm)', 'Height (mm)', 'Thickness (mm)', 'Quantity', 'Area (m²)', 'Edge Banding (m)', 'Cost (€)'];
        const csvContent = [
            headers.join(','),
            ...cncParts.map(part => [
                part.name,
                part.widthMm,
                part.heightMm,
                part.thicknessMm,
                part.quantity,
                ((part.widthMm * part.heightMm) / 1000000).toFixed(3),
                (part.edgeBanding.reduce((sum, edge) => sum + (edge.lengthMm * edge.quantity), 0) / 1000).toFixed(2),
                part.cost.toFixed(2)
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'door-configuration.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const exportDxf = () => {
        // Simple DXF export for door panels
        let dxfContent = `0
SECTION
2
ENTITIES
`;

        cncParts.forEach((part, index) => {
            const x = 0;
            const y = index * (part.heightMm + 100); // Space between parts

            // Rectangle for door panel
            dxfContent += `0
RECTANGLE
8
DoorPanel
10
${x}
20
${y}
11
${x + part.widthMm}
21
${y + part.heightMm}
`;

            // Add edge banding indicators
            part.edgeBanding.forEach((edge, edgeIndex) => {
                dxfContent += `0
LINE
8
EdgeBanding
10
${x}
20
${y + (edge.side === 'top' ? part.heightMm : 0)}
11
${x + part.widthMm}
21
${y + (edge.side === 'top' ? part.heightMm : 0)}
`;
            });
        });

        dxfContent += `0
ENDSEC
0
EOF
`;

        const blob = new Blob([dxfContent], { type: 'application/dxf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'door-configuration.dxf';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>CNC Door Parts List</CardTitle>
                    <div className="flex gap-2">
                        <Button onClick={exportCsv} className="flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            Export CSV
                        </Button>
                        <Button onClick={exportDxf} variant="outline" className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Export DXF
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-2">Part Name</th>
                                <th className="text-right py-2">Width (mm)</th>
                                <th className="text-right py-2">Height (mm)</th>
                                <th className="text-right py-2">Thickness (mm)</th>
                                <th className="text-right py-2">Quantity</th>
                                <th className="text-right py-2">Area (m²)</th>
                                <th className="text-right py-2">Edge Banding</th>
                                <th className="text-right py-2">Cost (€)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cncParts.map((part, index) => (
                                <tr key={part.id} className="border-b">
                                    <td className="py-2 font-medium">{part.name}</td>
                                    <td className="text-right py-2">{part.widthMm}</td>
                                    <td className="text-right py-2">{part.heightMm}</td>
                                    <td className="text-right py-2">{part.thicknessMm}</td>
                                    <td className="text-right py-2">{part.quantity}</td>
                                    <td className="text-right py-2">
                                        {((part.widthMm * part.heightMm) / 1000000).toFixed(3)}
                                    </td>
                                    <td className="text-right py-2">
                                        <div className="flex flex-wrap gap-1 justify-end">
                                            {part.edgeBanding.map((edge, idx) => (
                                                <Badge key={idx} variant="secondary" className="text-xs">
                                                    {edge.side}
                                                </Badge>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="text-right py-2 font-medium">{part.cost.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="border-t-2 font-bold">
                                <td colSpan={5} className="py-2 text-right">Total:</td>
                                <td className="text-right py-2">
                                    {cncParts.reduce((sum, part) => sum + (part.widthMm * part.heightMm) / 1000000, 0).toFixed(3)}
                                </td>
                                <td className="text-right py-2">
                                    {cncParts.reduce((sum, part) =>
                                        sum + part.edgeBanding.reduce((bandSum, edge) => bandSum + (edge.lengthMm * edge.quantity), 0) / 1000, 0
                                    ).toFixed(2)} m
                                </td>
                                <td className="text-right py-2">
                                    {cncParts.reduce((sum, part) => sum + part.cost, 0).toFixed(2)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Detailed Edge Banding Breakdown */}
                <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Edge Banding Details</h4>
                    <div className="space-y-1">
                        {cncParts.map((part) => (
                            <div key={part.id} className="text-sm">
                                <div className="font-medium">{part.name}:</div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 ml-4 text-xs text-muted-foreground">
                                    {part.edgeBanding.map((edge, idx) => (
                                        <div key={idx}>
                                            {edge.side}: {(edge.lengthMm * edge.quantity / 1000).toFixed(2)}m
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Manufacturing Notes */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold mb-2 text-blue-900">Manufacturing Notes</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>• All door panels: 18mm thickness</li>
                        <li>• All edges require edge banding (top, bottom, left, right)</li>
                        <li>• Split doors include 4mm overlap per panel</li>
                        <li>• Maintain 2mm gap between door panels</li>
                        <li>• Verify all dimensions before cutting</li>
                        <li>• Test fit doors before final installation</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}
