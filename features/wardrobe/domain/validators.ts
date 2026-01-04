import { WardrobeInput, ValidationError } from "./types";
import { MATERIAL_THICKNESSES } from "./materials";

/**
 * Validate wardrobe input parameters
 */
export function validateWardrobeInput(input: WardrobeInput): ValidationError[] {
  const errors: ValidationError[] = [];

  // Check for finite numbers
  const numericFields = [
    { field: "widthCm", value: input.widthCm },
    { field: "heightCm", value: input.heightCm },
    { field: "depthCm", value: input.depthCm },
    { field: "shelves", value: input.shelves },
    { field: "thicknessMm", value: input.thicknessMm },
    { field: "pricePerM2", value: input.pricePerM2 },
  ];

  for (const { field, value } of numericFields) {
    if (!isFinite(value)) {
      errors.push({ field, message: `${field} must be a finite number` });
    }
  }

  // Check minimum values (realistic wardrobe dimensions)
  if (input.widthCm < 50) {
    errors.push({ field: "widthCm", message: "Width must be at least 50 cm" });
  }
  if (input.heightCm < 180) {
    errors.push({
      field: "heightCm",
      message: "Height must be at least 180 cm",
    });
  }
  if (input.depthCm < 40) {
    errors.push({ field: "depthCm", message: "Depth must be at least 40 cm" });
  }
  if (input.shelves < 0) {
    errors.push({
      field: "shelves",
      message: "Shelves count must be 0 or more",
    });
  }
  if (input.pricePerM2 <= 0) {
    errors.push({
      field: "pricePerM2",
      message: "Price per m² must be greater than 0",
    });
  }

  // Check thickness is valid for material
  const validThicknesses = MATERIAL_THICKNESSES[input.material];
  if (!validThicknesses.includes(input.thicknessMm)) {
    errors.push({
      field: "thicknessMm",
      message: `Thickness ${input.thicknessMm}mm is not valid for ${
        input.material
      }. Valid thicknesses: ${validThicknesses.join(", ")}mm`,
    });
  }

  // Check no negative sizes
  if (input.widthCm <= 0) {
    errors.push({ field: "widthCm", message: "Width must be positive" });
  }
  if (input.heightCm <= 0) {
    errors.push({ field: "heightCm", message: "Height must be positive" });
  }
  if (input.depthCm <= 0) {
    errors.push({ field: "depthCm", message: "Depth must be positive" });
  }

  // Check width - 2×thickness >= 0 (for top/bottom panels and shelves)
  const widthMm = input.widthCm * 10;
  const thicknessMm = input.thicknessMm;
  if (widthMm - 2 * thicknessMm <= 0) {
    errors.push({
      field: "widthCm",
      message: `Width (${
        input.widthCm
      }cm) is too small for thickness ${thicknessMm}mm. Minimum width: ${
        (2 * thicknessMm) / 10 + 0.1
      }cm`,
    });
  }

  // Check that calculated parts won't be < 50mm
  const depthMm = input.depthCm * 10;
  const heightMm = input.heightCm * 10;

  if (depthMm < 50) {
    errors.push({
      field: "depthCm",
      message: "Depth results in parts smaller than 50mm",
    });
  }
  if (heightMm < 50) {
    errors.push({
      field: "heightCm",
      message: "Height results in parts smaller than 50mm",
    });
  }
  if (widthMm - 2 * thicknessMm < 50) {
    errors.push({
      field: "widthCm",
      message: "Width minus thickness results in parts smaller than 50mm",
    });
  }

  return errors;
}
