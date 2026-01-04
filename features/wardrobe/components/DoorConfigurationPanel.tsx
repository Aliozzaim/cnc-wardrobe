'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Split } from 'lucide-react';
import { useDoorConfiguration } from '../hooks/useDoorConfiguration';
import { DoorConfigurationTable } from './DoorConfigurationTable';

export function DoorConfigurationPanel() {
    const {
        wardrobeInput,
        columns,
        cncParts,
        summary,
        validationErrors,
        updateWardrobeInput,
        updateColumn,
        addColumn,
        removeColumn,
        addSplitDoorRange,
        removeSplitDoorRange,
        addVerticalSplitter,
        removeVerticalSplitter,
        isValid
    } = useDoorConfiguration();

    return (
        <div className="space-y-6">
            {/* Wardrobe Configuration */}
            <Card>
                <CardHeader>
                    <CardTitle>Wardrobe Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="totalWidth">Total Width (cm)</Label>
                            <Input
                                id="totalWidth"
                                type="number"
                                value={wardrobeInput.totalWidthCm}
                                onChange={(e) => updateWardrobeInput({ totalWidthCm: parseFloat(e.target.value) || 0 })}
                                min="1"
                                step="0.1"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="totalHeight">Total Height (cm)</Label>
                            <Input
                                id="totalHeight"
                                type="number"
                                value={wardrobeInput.totalHeightCm}
                                onChange={(e) => updateWardrobeInput({ totalHeightCm: parseFloat(e.target.value) || 0 })}
                                min="1"
                                step="0.1"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="material">Material</Label>
                            <Select
                                value={wardrobeInput.material}
                                onValueChange={(value) => updateWardrobeInput({ material: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="MDF">MDF</SelectItem>
                                    <SelectItem value="Plywood">Plywood</SelectItem>
                                    <SelectItem value="Particle Board">Particle Board</SelectItem>
                                    <SelectItem value="Solid Wood">Solid Wood</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="pricePerM2">Price per m² (€)</Label>
                            <Input
                                id="pricePerM2"
                                type="number"
                                value={wardrobeInput.pricePerM2}
                                onChange={(e) => updateWardrobeInput({ pricePerM2: parseFloat(e.target.value) || 0 })}
                                min="0.01"
                                step="0.01"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Columns Configuration */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Columns Configuration</h3>
                    <Button onClick={addColumn} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Column
                    </Button>
                </div>

                {columns.map((column, columnIndex) => (
                    <Card key={column.id}>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>Column {columnIndex + 1}</CardTitle>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeColumn(columnIndex)}
                                    disabled={columns.length <= 1}
                                    className="flex items-center gap-2"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Remove
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Column Basic Settings */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label>Width (cm)</Label>
                                    <Input
                                        type="number"
                                        value={wardrobeInput.columns[columnIndex].widthCm}
                                        onChange={(e) => updateColumn(columnIndex, {
                                            widthCm: parseFloat(e.target.value) || 0
                                        })}
                                        min="1"
                                        step="0.1"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Number of Shelves</Label>
                                    <Input
                                        type="number"
                                        value={wardrobeInput.columns[columnIndex].shelfCount}
                                        onChange={(e) => {
                                            const newCount = parseInt(e.target.value) || 1;
                                            const currentHeights = wardrobeInput.columns[columnIndex].shelfHeights;
                                            const currentGaps = wardrobeInput.columns[columnIndex].shelfGaps;

                                            updateColumn(columnIndex, {
                                                shelfCount: newCount,
                                                shelfHeights: Array(newCount).fill(0).map((_, i) => currentHeights[i] || 60),
                                                shelfGaps: Array(newCount).fill(0).map((_, i) => currentGaps[i] || 2)
                                            });
                                        }}
                                        min="1"
                                        max="10"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Door Type</Label>
                                    <Select
                                        value={wardrobeInput.columns[columnIndex].doorType}
                                        onValueChange={(value: 'full' | 'split' | 'none') =>
                                            updateColumn(columnIndex, { doorType: value })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">No Door</SelectItem>
                                            <SelectItem value="full">Full Door</SelectItem>
                                            <SelectItem value="split">Split Doors</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Shelf Configuration */}
                            <div className="space-y-2">
                                <Label>Shelf Heights (cm)</Label>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                    {wardrobeInput.columns[columnIndex].shelfHeights.map((height, shelfIndex) => (
                                        <Input
                                            key={shelfIndex}
                                            type="number"
                                            value={height}
                                            onChange={(e) => {
                                                const newHeights = [...wardrobeInput.columns[columnIndex].shelfHeights];
                                                newHeights[shelfIndex] = parseFloat(e.target.value) || 0;
                                                updateColumn(columnIndex, { shelfHeights: newHeights });
                                            }}
                                            min="1"
                                            step="0.1"
                                            placeholder={`Shelf ${shelfIndex + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Shelf Gaps (cm)</Label>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                    {wardrobeInput.columns[columnIndex].shelfGaps.map((gap, gapIndex) => (
                                        <Input
                                            key={gapIndex}
                                            type="number"
                                            value={gap}
                                            onChange={(e) => {
                                                const newGaps = [...wardrobeInput.columns[columnIndex].shelfGaps];
                                                newGaps[gapIndex] = parseFloat(e.target.value) || 0;
                                                updateColumn(columnIndex, { shelfGaps: newGaps });
                                            }}
                                            min="0"
                                            step="0.1"
                                            placeholder={`Gap ${gapIndex + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Split Door Configuration */}
                            {wardrobeInput.columns[columnIndex].doorType === 'split' && (
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Label>Split Door Ranges</Label>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => addSplitDoorRange(columnIndex, 0, 0)}
                                            className="flex items-center gap-2"
                                        >
                                            <Plus className="h-4 w-4" />
                                            Add Range
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        {wardrobeInput.columns[columnIndex].splitDoorRanges.map((range, rangeIndex) => (
                                            <div key={rangeIndex} className="flex gap-2 items-center">
                                                <span className="text-sm">From shelf</span>
                                                <Input
                                                    type="number"
                                                    value={range.startY}
                                                    onChange={(e) => {
                                                        const newRanges = [...wardrobeInput.columns[columnIndex].splitDoorRanges];
                                                        newRanges[rangeIndex] = { ...range, startY: parseInt(e.target.value) || 0 };
                                                        updateColumn(columnIndex, { splitDoorRanges: newRanges });
                                                    }}
                                                    min="0"
                                                    max={wardrobeInput.columns[columnIndex].shelfCount - 1}
                                                    className="w-20"
                                                />
                                                <span className="text-sm">to shelf</span>
                                                <Input
                                                    type="number"
                                                    value={range.endY}
                                                    onChange={(e) => {
                                                        const newRanges = [...wardrobeInput.columns[columnIndex].splitDoorRanges];
                                                        newRanges[rangeIndex] = { ...range, endY: parseInt(e.target.value) || 0 };
                                                        updateColumn(columnIndex, { splitDoorRanges: newRanges });
                                                    }}
                                                    min="0"
                                                    max={wardrobeInput.columns[columnIndex].shelfCount - 1}
                                                    className="w-20"
                                                />
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => removeSplitDoorRange(columnIndex, rangeIndex)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Vertical Splitters */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label>Vertical Splitters</Label>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addVerticalSplitter(columnIndex, 50)}
                                        className="flex items-center gap-2"
                                    >
                                        <Split className="h-4 w-4" />
                                        Add Splitter
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    {wardrobeInput.columns[columnIndex].verticalSplitters.map((position, splitterIndex) => (
                                        <div key={splitterIndex} className="flex gap-2 items-center">
                                            <span className="text-sm">Position:</span>
                                            <Input
                                                type="number"
                                                value={position}
                                                onChange={(e) => {
                                                    const newSplitters = [...wardrobeInput.columns[columnIndex].verticalSplitters];
                                                    newSplitters[splitterIndex] = parseFloat(e.target.value) || 0;
                                                    updateColumn(columnIndex, { verticalSplitters: newSplitters });
                                                }}
                                                min="0"
                                                max={wardrobeInput.columns[columnIndex].widthCm}
                                                step="0.1"
                                                className="w-24"
                                            />
                                            <span className="text-sm">cm from left</span>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => removeVerticalSplitter(columnIndex, splitterIndex)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
                <Card className="border-destructive">
                    <CardHeader>
                        <CardTitle className="text-destructive">Validation Errors</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="text-sm text-destructive space-y-1">
                            {validationErrors.map((error, index) => (
                                <li key={index}>• {error}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            )}

            {/* Summary */}
            {isValid && (
                <Card>
                    <CardHeader>
                        <CardTitle>Configuration Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">{summary.totalDoors}</div>
                                <div className="text-sm text-muted-foreground">Total Doors</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">{summary.totalArea.toFixed(3)} m²</div>
                                <div className="text-sm text-muted-foreground">Total Area</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">{summary.totalCost.toFixed(2)} €</div>
                                <div className="text-sm text-muted-foreground">Total Cost</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">{summary.totalBandLength.toFixed(2)} m</div>
                                <div className="text-sm text-muted-foreground">Edge Banding</div>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <Badge variant="secondary">Full: {summary.doorTypes.full}</Badge>
                            <Badge variant="secondary">Split: {summary.doorTypes.split}</Badge>
                            <Badge variant="secondary">None: {summary.doorTypes.none}</Badge>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* CNC Parts Table */}
            {isValid && cncParts.length > 0 && (
                <DoorConfigurationTable cncParts={cncParts} />
            )}
        </div>
    );
}
