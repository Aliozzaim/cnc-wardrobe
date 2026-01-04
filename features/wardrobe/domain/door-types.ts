// Door Configuration Types
export interface WardrobeColumn {
  id: string;
  widthCm: number;
  totalHeightCm: number;
  shelves: Shelf[];
  doors: DoorConfiguration[];
  verticalSplitters: VerticalSplitter[];
}

export interface Shelf {
  id: string;
  position: number; // Position from bottom (0 = bottom)
  heightCm: number;
  gapCm: number; // Gap between shelves
}

export interface DoorConfiguration {
  id: string;
  type: "full" | "split" | "none";
  panels: DoorPanel[];
}

export interface DoorPanel {
  id: string;
  columnId: string;
  startYCm: number; // Distance from bottom
  endYCm: number; // Distance from bottom
  widthCm: number;
  heightCm: number;
  thicknessMm: number;
  edgeBanding: EdgeBanding[];
}

export interface VerticalSplitter {
  id: string;
  positionCm: number; // Distance from left edge
  heightCm: number;
  thicknessMm: number;
}

export interface EdgeBanding {
  side: "top" | "bottom" | "left" | "right";
  lengthMm: number;
  quantity: number;
}

export interface WardrobeDoorConfig {
  columns: WardrobeColumn[];
  totalWidthCm: number;
  totalHeightCm: number;
  doorThicknessMm: number;
}

export interface CncDoorPart {
  id: string;
  name: string;
  widthMm: number;
  heightMm: number;
  thicknessMm: number;
  quantity: number;
  edgeBanding: EdgeBanding[];
  material: string;
  cost: number;
}

// User Input Types for Configuration
export interface ColumnConfigInput {
  widthCm: number;
  shelfCount: number;
  shelfHeights: number[]; // Array of shelf heights in cm
  shelfGaps: number[]; // Array of gaps between shelves in cm
  doorType: "full" | "split" | "none";
  splitDoorRanges: Array<{
    startY: number; // Shelf index
    endY: number; // Shelf index (inclusive)
  }>;
  verticalSplitters: number[]; // Positions in cm from left edge
}

export interface WardrobeDoorInput {
  totalWidthCm: number;
  totalHeightCm: number;
  columns: ColumnConfigInput[];
  doorThicknessMm: number;
  material: string;
  pricePerM2: number;
  bandPricePerMeter: number;
}
