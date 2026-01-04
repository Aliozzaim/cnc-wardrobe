import { WardrobeInput } from "../features/wardrobe/domain/types";
import { TranslationKey } from "../lib/i18n";

export interface WardrobePreset {
  id: string;
  nameKey: TranslationKey; // Translation key
  description: TranslationKey;
  input: WardrobeInput;
}

export const WARDROBE_PRESETS: WardrobePreset[] = [
  {
    id: "small",
    nameKey: "smallWardrobe",
    description: "smallWardrobeDesc",
    input: {
      widthCm: 300, // Min: 300
      heightCm: 500, // Min: 500
      depthCm: 300, // Min: 300
      shelves: 2,
      material: "MDF",
      thicknessMm: 16,
      backPanel: true,
      pricePerM2: 150,
      doors: false,
      doorStyle: "none",
      bandPricePerMeter: 2.5,
      doorSections: [],
    },
  },
  {
    id: "medium",
    nameKey: "mediumWardrobe",
    description: "mediumWardrobeDesc",
    input: {
      widthCm: 350,
      heightCm: 550,
      depthCm: 350,
      shelves: 3,
      material: "MDF",
      thicknessMm: 18,
      backPanel: true,
      pricePerM2: 150,
      doors: false,
      doorStyle: "none",
      bandPricePerMeter: 2.5,
      doorSections: [],
    },
  },
  {
    id: "large",
    nameKey: "largeWardrobe",
    description: "largeWardrobeDesc",
    input: {
      widthCm: 400,
      heightCm: 600,
      depthCm: 400,
      shelves: 4,
      material: "Plywood",
      thicknessMm: 18,
      backPanel: true,
      pricePerM2: 200,
      doors: false,
      doorStyle: "none",
      bandPricePerMeter: 2.5,
      doorSections: [],
    },
  },
  {
    id: "walkin",
    nameKey: "walkInWardrobe",
    description: "walkInWardrobeDesc",
    input: {
      widthCm: 500,
      heightCm: 700,
      depthCm: 500,
      shelves: 5,
      material: "Plywood",
      thicknessMm: 18,
      backPanel: true,
      pricePerM2: 200,
      doors: false,
      doorStyle: "none",
      bandPricePerMeter: 2.5,
      doorSections: [],
    },
  },
];
