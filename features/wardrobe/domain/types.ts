export type MaterialType = "MDF" | "Plywood";

export interface Material {
  name: MaterialType;
  thicknessMm: number;
  pricePerM2: number;
}

export interface WardrobeInput {
  widthCm: number; // ≥ 300
  heightCm: number; // ≥ 500
  depthCm: number; // ≥ 300
  shelves: number; // ≥ 0
  thicknessMm: number; // 16, 18, 22
  backPanel: boolean;
  pricePerM2: number; // > 0
  material: "MDF" | "Plywood";
  doors: boolean; // Add doors/covers
  doorStyle: "none" | "full" | "split"; // Door configuration
  bandPricePerMeter: number; // Price per meter for edge banding
  doorSections?: DoorSection[]; // New flexible door configuration
}

export interface DoorSection {
  id: string;
  startY: number; // Starting height in cm from bottom
  endY: number; // Ending height in cm from bottom
  doorType: "none" | "full" | "split";
}

export interface EdgeBanding {
  side: "front" | "back" | "left" | "right" | "top" | "bottom";
  lengthMm: number;
  quantity: number;
}

export interface CncPart {
  id: string;
  name: string;
  widthMm: number;
  heightMm: number;
  thicknessMm: number;
  quantity: number;
  material: string;
  areaM2: number;
  cost: number;
  edgeBanding?: EdgeBanding[]; // Add edge banding details to each part
}

export interface WardrobeCalculation {
  parts: CncPart[];
  totalCost: number;
  totalArea: number;
  bandCalculation?: {
    totalBandMeters: number;
    bandCost: number;
    edges: Array<{
      name: string;
      lengthMm: number;
      quantity: number;
    }>;
  };
}

export interface ValidationError {
  field: string;
  message: string;
}
