import { Material, MaterialType } from "./types";

// Predefined materials with their properties
export const MATERIALS: Record<MaterialType, Material> = {
  MDF: {
    name: "MDF",
    thicknessMm: 18, // Default thickness
    pricePerM2: 150, // Default price per m² in TL
  },
  Plywood: {
    name: "Plywood",
    thicknessMm: 18, // Default thickness
    pricePerM2: 200, // Default price per m² in TL
  },
};

// Available thicknesses for each material (mm)
export const MATERIAL_THICKNESSES: Record<MaterialType, number[]> = {
  MDF: [16, 18, 22],
  Plywood: [16, 18, 22],
};

// Get material with custom price and thickness
export function createMaterial(
  type: MaterialType,
  thicknessMm: number,
  pricePerM2: number
): Material {
  return {
    name: type,
    thicknessMm,
    pricePerM2,
  };
}
