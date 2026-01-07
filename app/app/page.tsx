'use client';

import { useState } from 'react';
import { useWardrobe } from '../../features/wardrobe/hooks/useWardrobe';
import { use3DControls } from '../../features/wardrobe/hooks/use3DControls';
import { WardrobeDiagram } from '../../features/wardrobe/visualization/WardrobeDiagram';
import { downloadCsv } from '../../features/wardrobe/export/exportCsv';
import { downloadDxf } from '../../features/wardrobe/export/exportDxf';
import { MATERIALS } from '../../features/wardrobe/domain/materials';
import { WARDROBE_PRESETS } from '../../lib/presets';
import { useLanguage } from '../../components/language-provider';
import { TranslationKey } from '../../lib/i18n';
import { Header } from '../../components/header';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Checkbox } from '../../components/ui/checkbox';
import { Download, FileText, Settings, RotateCcw, Layers } from 'lucide-react';
import { SimpleDoorConfiguration } from '../../features/wardrobe/components/SimpleDoorConfiguration';
import { DoorPanelProvider } from '../../features/wardrobe/context/DoorPanelContext';
import { DoorPanels3D } from '../../features/wardrobe/components/DoorPanels3D';
import { LanguageProvider } from '../../components/language-provider';

export default function Home() {
  const { input, updateInput, validationErrors, calculation } = useWardrobe();
  const { t } = useLanguage();
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [show3DModel, setShow3DModel] = useState(true);
  const [showAdvancedDoors, setShowAdvancedDoors] = useState(false);
  const {
    rotation,
    scale,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
    resetView,
  } = use3DControls();

  // Helper to get available thicknesses for current material
  const availableThicknesses = MATERIALS[input.material].thicknessMm ?
    [MATERIALS[input.material].thicknessMm] :
    [16, 18, 22];

  // Check if input is valid
  const isValid = validationErrors.length === 0;

  const handleExportCsv = () => {
    if (calculation) {
      downloadCsv(calculation.parts);
    }
  };

  const handleExportDxf = () => {
    if (calculation) {
      downloadDxf(calculation.parts);
    }
  };

  const handlePresetSelect = (presetId: string) => {
    const preset = WARDROBE_PRESETS.find(p => p.id === presetId);
    if (preset) {
      Object.entries(preset.input).forEach(([key, value]) => {
        updateInput(key as keyof typeof preset.input, value);
      });
      setSelectedPreset(presetId);
    }
  };

  return (
    <LanguageProvider>
      <DoorPanelProvider>
        <div className="min-h-screen bg-background">
          <Header />

          <main className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Input Form */}
              <div className="xl:col-span-1 space-y-6">
                {/* Presets */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      {t('presets')}
                    </CardTitle>
                    <CardDescription>{t('selectPreset')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Select value={selectedPreset} onValueChange={handlePresetSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('custom')} />
                      </SelectTrigger>
                      <SelectContent>
                        {WARDROBE_PRESETS.map((preset) => (
                          <SelectItem key={preset.id} value={preset.id}>
                            {t(preset.nameKey)} - {t(preset.description)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {/* Specifications */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t('wardrobeSpecifications')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Width */}
                    <div className="space-y-2">
                      <Label htmlFor="width">{t('width')} - {t('minWidth')}</Label>
                      <Input
                        id="width"
                        type="number"
                        value={input.widthCm}
                        onChange={(e) => updateInput('widthCm', parseFloat(e.target.value) || 0)}
                        min="1"
                        step="0.1"
                      />
                    </div>

                    {/* Height */}
                    <div className="space-y-2">
                      <Label htmlFor="height">{t('height')} - {t('minHeight')}</Label>
                      <Input
                        id="height"
                        type="number"
                        value={input.heightCm}
                        onChange={(e) => updateInput('heightCm', parseFloat(e.target.value) || 0)}
                        min="1"
                        step="0.1"
                      />
                    </div>

                    {/* Depth */}
                    <div className="space-y-2">
                      <Label htmlFor="depth">{t('depth')} - {t('minDepth')}</Label>
                      <Input
                        id="depth"
                        type="number"
                        value={input.depthCm}
                        onChange={(e) => updateInput('depthCm', parseFloat(e.target.value) || 0)}
                        min="1"
                        step="0.1"
                      />
                    </div>

                    {/* Shelves */}
                    <div className="space-y-2">
                      <Label htmlFor="shelves">{t('shelves')}</Label>
                      <Input
                        id="shelves"
                        type="number"
                        value={input.shelves}
                        onChange={(e) => updateInput('shelves', parseInt(e.target.value) || 0)}
                        min="0"
                      />
                    </div>

                    {/* Material */}
                    <div className="space-y-2">
                      <Label htmlFor="material">{t('material')}</Label>
                      <Select
                        value={input.material}
                        onValueChange={(value: 'MDF' | 'Plywood') => updateInput('material', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(MATERIALS).map(material => (
                            <SelectItem key={material} value={material}>
                              {material}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Thickness */}
                    <div className="space-y-2">
                      <Label htmlFor="thickness">{t('thickness')}</Label>
                      <Select
                        value={input.thicknessMm.toString()}
                        onValueChange={(value) => updateInput('thicknessMm', parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {availableThicknesses.map(thickness => (
                            <SelectItem key={thickness} value={thickness.toString()}>
                              {thickness}mm
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Back Panel */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="backPanel"
                        checked={input.backPanel}
                        onCheckedChange={(checked) => updateInput('backPanel', !!checked)}
                      />
                      <Label htmlFor="backPanel">{t('backPanel')}</Label>
                    </div>

                    {/* Doors */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="doors"
                        checked={input.doors}
                        onCheckedChange={(checked) => updateInput('doors', !!checked)}
                      />
                      <Label htmlFor="doors">{t('doors')}</Label>
                    </div>

                    {/* Door Style */}
                    {input.doors && (
                      <div className="space-y-2">
                        <Label htmlFor="doorStyle">{t('doorStyle')}</Label>
                        <Select
                          value={input.doorStyle}
                          onValueChange={(value: 'none' | 'full' | 'split') => updateInput('doorStyle', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">{t('noDoors')}</SelectItem>
                            <SelectItem value="full">{t('fullDoor')}</SelectItem>
                            <SelectItem value="split">{t('splitDoors')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Band Price per Meter */}
                    <div className="space-y-2">
                      <Label htmlFor="bandPrice">{t('bandPricePerMeter')} ({t('currency')})</Label>
                      <Input
                        id="bandPrice"
                        type="number"
                        value={input.bandPricePerMeter}
                        onChange={(e) => updateInput('bandPricePerMeter', parseFloat(e.target.value) || 0)}
                        min="0.01"
                        step="0.01"
                      />
                    </div>

                    {/* Price per m² */}
                    <div className="space-y-2">
                      <Label htmlFor="price">{t('pricePerM2')} ({t('currency')})</Label>
                      <Input
                        id="price"
                        type="number"
                        value={input.pricePerM2}
                        onChange={(e) => updateInput('pricePerM2', parseFloat(e.target.value) || 0)}
                        min="0.01"
                        step="0.01"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Validation Errors */}
                {validationErrors.length > 0 && (
                  <Card className="border-destructive">
                    <CardHeader>
                      <CardTitle className="text-destructive">{t('validationErrors')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-destructive space-y-1">
                        {validationErrors.map((error, index) => (
                          <li key={index}>• {error.message}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Advanced Door Configuration Toggle */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="h-5 w-5" />
                      {t('advancedDoorConfiguration')}
                    </CardTitle>
                    <CardDescription>
                      {t('configureColumnsSplitDoors')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => setShowAdvancedDoors(!showAdvancedDoors)}
                      variant={showAdvancedDoors ? "default" : "outline"}
                      className="w-full"
                    >
                      {showAdvancedDoors ? t('hideAdvancedDoorConfiguration') : t('showAdvancedDoorConfiguration')}
                    </Button>
                  </CardContent>
                </Card>

                {/* Advanced Door Configuration Panel */}
                {showAdvancedDoors && (
                  <div className="space-y-6">
                    <SimpleDoorConfiguration />
                  </div>
                )}
              </div>

              {/* Results */}
              <div className="xl:col-span-2 space-y-6">
                {/* Calculation Results */}
                {isValid && calculation && (
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('calculationResults')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{calculation.parts.length}</div>
                          <div className="text-sm text-muted-foreground">{t('totalParts')}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{calculation.totalArea.toFixed(3)} m²</div>
                          <div className="text-sm text-muted-foreground">{t('totalArea')}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{calculation.totalCost.toFixed(2)} {t('currency')}</div>
                          <div className="text-sm text-muted-foreground">{t('totalCost')}</div>
                        </div>
                      </div>

                      {/* Parts Table with Banding Info */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">{t('partName')}</th>
                              <th className="text-right py-2">{t('dimensions')}</th>
                              <th className="text-right py-2">{t('quantity')}</th>
                              <th className="text-right py-2">{t('area')}</th>
                              <th className="text-right py-2">{t('bandingSides')}</th>
                              <th className="text-right py-2">{t('cost')} ({t('currency')})</th>
                            </tr>
                          </thead>
                          <tbody>
                            {calculation.parts.map((part) => (
                              <tr key={part.id} className="border-b">
                                <td className="py-2">{part.name}</td>
                                <td className="text-right py-2">
                                  {part.widthMm}×{part.heightMm}×{part.thicknessMm}
                                </td>
                                <td className="text-right py-2">{part.quantity}</td>
                                <td className="text-right py-2">{part.areaM2.toFixed(3)}</td>
                                <td className="text-right py-2 text-xs">
                                  {part.edgeBanding && part.edgeBanding.length > 0 ? (
                                    <div className="flex flex-wrap gap-1 justify-end">
                                      {part.edgeBanding.map((edge, idx) => (
                                        <span key={idx} className="px-1 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                                          {t(edge.side)}
                                        </span>
                                      ))}
                                    </div>
                                  ) : (
                                    <span className="text-muted-foreground">-</span>
                                  )}
                                </td>
                                <td className="text-right py-2">{part.cost.toFixed(2)} {t('currency')}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Band Calculation */}
                      {calculation.bandCalculation && (
                        <div className="mt-6 p-4 bg-muted rounded-lg">
                          <h4 className="font-semibold mb-2">{t('edgeBandingCalculation')}</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <span className="text-sm text-muted-foreground">{t('totalBandRequired')}:</span>
                              <div className="font-medium">{calculation.bandCalculation.totalBandMeters.toFixed(2)} {t('meters')}</div>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">{t('bandCost')}:</span>
                              <div className="font-medium">{calculation.bandCalculation.bandCost.toFixed(2)} {t('currency')}</div>
                            </div>
                          </div>
                          {/* Detailed banding breakdown */}
                          <div className="mt-4">
                            <h5 className="font-medium mb-2 text-sm">{t('detailedBanding')}</h5>
                            <div className="max-h-32 overflow-y-auto">
                              {calculation.bandCalculation.edges.map((edge, idx) => (
                                <div key={idx} className="text-xs text-muted-foreground flex justify-between py-1">
                                  <span>{t(edge.name as TranslationKey)}</span>
                                  <span>{edge.lengthMm}mm × {edge.quantity}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Export Buttons */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        <Button onClick={handleExportCsv} className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          {t('exportCsv')}
                        </Button>
                        <Button onClick={handleExportDxf} variant="outline" className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          {t('exportDxf')}
                        </Button>
                        <Button
                          onClick={() => setShow3DModel(!show3DModel)}
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          <Settings className="h-4 w-4" />
                          {show3DModel ? t('hide3DModel') : t('view3DModel')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* 2D Diagram Visualization */}
                {isValid && calculation && (
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('cncPartsVisualization')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <WardrobeDiagram parts={calculation.parts} />
                    </CardContent>
                  </Card>
                )}

                {/* 3D Model Visualization - Working with Consistent Colors */}
                {show3DModel && (
                  <Card>
                    <CardHeader>
                      <CardTitle>3D {t('cncPartsVisualization')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center mb-4">
                        <Button
                          onClick={resetView}
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <RotateCcw className="h-4 w-4" />
                          {t('resetView')}
                        </Button>
                      </div>
                      <div
                        className="flex justify-center bg-gray-100 rounded-lg p-8"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onWheel={handleWheel}
                        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                      >
                        <div style={{
                          width: '400px',
                          height: '400px',
                          perspective: '1000px',
                          position: 'relative',
                        }}>
                          <div
                            style={{
                              width: '100%',
                              height: '100%',
                              transformStyle: 'preserve-3d',
                              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${scale * 0.8})`,
                              transition: isDragging ? 'none' : 'transform 0.2s ease',
                              position: 'relative',
                            }}
                          >
                            {/* Back Panel - Brown wood color */}
                            <div
                              style={{
                                position: 'absolute',
                                width: `${Math.max(80, input.widthCm * 1.5)}px`,
                                height: `${Math.max(80, input.heightCm * 1.5)}px`,
                                background: 'linear-gradient(145deg, #8B4513, #A0522D)',
                                transform: `translateZ(${-input.depthCm * 0.8}px)`,
                                left: '50%',
                                top: '50%',
                                marginLeft: `${-Math.max(40, input.widthCm * 0.75)}px`,
                                marginTop: `${-Math.max(40, input.heightCm * 0.75)}px`,
                                border: '2px solid #654321',
                                opacity: 0.9,
                              }}
                            ></div>

                            {/* Front Panel - Same brown but lighter */}
                            {input.doors && (
                              <div
                                style={{
                                  position: 'absolute',
                                  width: `${Math.max(80, input.widthCm * 1.5)}px`,
                                  height: `${Math.max(80, (input.heightCm - 2) * 1.5)}px`,
                                  background: 'linear-gradient(145deg, #A0522D, #CD853F)',
                                  transform: `translateZ(${input.depthCm * 0.8 + 1}px) translateY(-5px)`,
                                  left: '50%',
                                  top: '50%',
                                  marginLeft: `${-Math.max(40, input.widthCm * 0.75)}px`,
                                  marginTop: `${-Math.max(40, (input.heightCm - 2) * 0.75)}px`,
                                  border: '2px solid #8B4513',
                                  opacity: 0.9,
                                }}
                              ></div>
                            )}

                            {/* Left Panel */}
                            <div
                              style={{
                                position: 'absolute',
                                width: `${Math.max(80, input.depthCm * 1.5)}px`,
                                height: `${Math.max(80, input.heightCm * 1.5)}px`,
                                background: 'linear-gradient(145deg, #8B4513, #A0522D)',
                                transform: `translateX(${-input.widthCm * 0.8}px) rotateY(-90deg)`,
                                left: '50%',
                                top: '50%',
                                marginLeft: `${-Math.max(40, input.depthCm * 0.75)}px`,
                                marginTop: `${-Math.max(40, input.heightCm * 0.75)}px`,
                                border: '2px solid #654321',
                                opacity: 0.85,
                              }}
                            ></div>

                            {/* Right Panel */}
                            <div
                              style={{
                                position: 'absolute',
                                width: `${Math.max(80, input.depthCm * 1.5)}px`,
                                height: `${Math.max(80, input.heightCm * 1.5)}px`,
                                background: 'linear-gradient(145deg, #8B4513, #A0522D)',
                                transform: `translateX(${input.widthCm * 0.8}px) rotateY(90deg)`,
                                left: '50%',
                                top: '50%',
                                marginLeft: `${-Math.max(40, input.depthCm * 0.75)}px`,
                                marginTop: `${-Math.max(40, input.heightCm * 0.75)}px`,
                                border: '2px solid #654321',
                                opacity: 0.85,
                              }}
                            ></div>

                            {/* Top Panel */}
                            <div
                              style={{
                                position: 'absolute',
                                width: `${Math.max(80, input.widthCm * 1.5)}px`,
                                height: `${Math.max(80, input.depthCm * 1.5)}px`,
                                background: 'linear-gradient(145deg, #8B4513, #A0522D)',
                                transform: `translateY(${-input.heightCm * 0.8}px) rotateX(90deg)`,
                                left: '50%',
                                top: '50%',
                                marginLeft: `${-Math.max(40, input.widthCm * 0.75)}px`,
                                marginTop: `${-Math.max(40, input.depthCm * 0.75)}px`,
                                border: '2px solid #654321',
                                opacity: 0.85,
                              }}
                            ></div>

                            {/* Bottom Panel */}
                            <div
                              style={{
                                position: 'absolute',
                                width: `${Math.max(80, input.widthCm * 1.5)}px`,
                                height: `${Math.max(80, input.depthCm * 1.5)}px`,
                                background: 'linear-gradient(145deg, #8B4513, #A0522D)',
                                transform: `translateY(${input.heightCm * 0.8}px) rotateX(-90deg)`,
                                left: '50%',
                                top: '50%',
                                marginLeft: `${-Math.max(40, input.widthCm * 0.75)}px`,
                                marginTop: `${-Math.max(40, input.depthCm * 0.75)}px`,
                                border: '2px solid #654321',
                                opacity: 0.85,
                              }}
                            ></div>

                            {/* Shelves - Lighter wood color */}
                            {Array.from({ length: Math.min(input.shelves, 5) }, (_, i) => {
                              const shelfY = input.heightCm - ((i + 1) * (input.heightCm / (input.shelves + 1)));
                              const shelfPosition = -input.heightCm / 2 + shelfY;
                              return (
                                <div
                                  key={i}
                                  style={{
                                    position: 'absolute',
                                    width: `${Math.max(80, input.widthCm * 1.5)}px`,
                                    height: `${Math.max(80, input.depthCm * 1.5)}px`,
                                    background: 'linear-gradient(145deg, #CD853F, #DEB887)',
                                    transform: `translateY(${shelfPosition * 1.5}px) rotateX(90deg)`,
                                    left: '50%',
                                    top: '50%',
                                    marginLeft: `${-Math.max(40, input.widthCm * 0.75)}px`,
                                    marginTop: `${-Math.max(40, input.depthCm * 0.75)}px`,
                                    border: '1px solid #8b4513',
                                    opacity: 0.7,
                                  }}
                                ></div>
                              );
                            })}

                            {/* Doors - Darker wood color */}
                            {input.doors && input.doorStyle === 'full' && (
                              <div
                                style={{
                                  position: 'absolute',
                                  width: `${Math.max(80, (input.widthCm + 0.4) * 1.5)}px`,
                                  height: `${Math.max(80, (input.heightCm - 2) * 1.5)}px`,
                                  background: 'linear-gradient(145deg, #654321, #8B4513)',
                                  transform: `translateZ(${input.depthCm * 0.8 + 1}px) translateY(-5px)`,
                                  left: '50%',
                                  top: '50%',
                                  marginLeft: `${-Math.max(40, (input.widthCm + 0.4) * 0.75)}px`,
                                  marginTop: `${-Math.max(40, (input.heightCm - 2) * 0.75)}px`,
                                  border: '2px solid #333',
                                  opacity: 0.95,
                                }}
                              ></div>
                            )}

                            {input.doors && input.doorStyle === 'split' && (
                              <>
                                <div
                                  style={{
                                    position: 'absolute',
                                    width: `${Math.max(80, (input.widthCm / 2 + 0.2) * 1.5)}px`,
                                    height: `${Math.max(80, (input.heightCm - 2) * 1.5)}px`,
                                    background: 'linear-gradient(145deg, #654321, #8B4513)',
                                    transform: `translateZ(${input.depthCm * 0.8 + 1}px) translateX(${-input.widthCm * 0.4}px) translateY(-5px)`,
                                    left: '25%',
                                    top: '50%',
                                    marginLeft: `${-Math.max(40, (input.widthCm / 2 + 0.2) * 0.75)}px`,
                                    marginTop: `${-Math.max(40, (input.heightCm - 2) * 0.75)}px`,
                                    border: '2px solid #333',
                                    opacity: 0.95,
                                  }}
                                ></div>
                                <div
                                  style={{
                                    position: 'absolute',
                                    width: `${Math.max(80, (input.widthCm / 2 + 0.2) * 1.5)}px`,
                                    height: `${Math.max(80, (input.heightCm - 2) * 1.5)}px`,
                                    background: 'linear-gradient(145deg, #654321, #8B4513)',
                                    transform: `translateZ(${input.depthCm * 0.8 + 1}px) translateX(${input.widthCm * 0.4}px) translateY(-5px)`,
                                    left: '75%',
                                    top: '50%',
                                    marginLeft: `${-Math.max(40, (input.widthCm / 2 + 0.2) * 0.75)}px`,
                                    marginTop: `${-Math.max(40, (input.heightCm - 2) * 0.75)}px`,
                                    border: '2px solid #333',
                                    opacity: 0.95,
                                  }}
                                ></div>
                              </>
                            )}
                            {/* Custom Door Panels from Simple Configuration */}
                            <DoorPanels3D />
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-text-center mt-4">
                        {t('rotate3DModel')} - {t('allDimensionsInMm')}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </main >
        </div >
      </DoorPanelProvider>
    </LanguageProvider>
  )
}