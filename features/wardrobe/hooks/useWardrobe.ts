import { useState, useCallback, useMemo } from "react";
import {
  WardrobeInput,
  WardrobeCalculation,
  ValidationError,
  DoorSection,
} from "../domain/types";
import { calculateWardrobeParts } from "../domain/calculator";
import { MATERIALS } from "../domain/materials";

const initialInput: WardrobeInput = {
  widthCm: 120,
  heightCm: 220,
  depthCm: 60,
  shelves: 3,
  thicknessMm: 18,
  backPanel: true,
  pricePerM2: 25,
  material: "MDF",
  doors: false,
  doorStyle: "none",
  bandPricePerMeter: 2.5,
  doorSections: [],
};

export function useWardrobe() {
  const [input, setInput] = useState<WardrobeInput>(initialInput);

  const validateInput = useCallback(
    (input: WardrobeInput): ValidationError[] => {
      const errors: ValidationError[] = [];

      // Only validate if values are greater than 0 (allow 0)
      if (input.widthCm < 0) {
        errors.push({
          field: "widthCm",
          message: "Width must be at least 1cm",
        });
      }
      if (input.heightCm < 0) {
        errors.push({
          field: "heightCm",
          message: "Height must be at least 1cm",
        });
      }
      if (input.depthCm < 0) {
        errors.push({
          field: "depthCm",
          message: "Depth must be at least 1cm",
        });
      }
      if (input.shelves < 0) {
        errors.push({
          field: "shelves",
          message: "Number of shelves cannot be negative",
        });
      }
      if (input.pricePerM2 <= 0) {
        errors.push({
          field: "pricePerM2",
          message: "Price per m² must be positive",
        });
      }
      if (input.bandPricePerMeter <= 0) {
        errors.push({
          field: "bandPricePerMeter",
          message: "Band price per meter must be positive",
        });
      }

      if (input.doorSections && input.doorSections.length > 0) {
        input.doorSections.forEach((section, index) => {
          if (section.startY < 0 || section.endY > input.heightCm) {
            errors.push({
              field: `doorSections[${index}]`,
              message: `Door section ${
                index + 1
              } must be within wardrobe height`,
            });
          }
          if (section.startY >= section.endY) {
            errors.push({
              field: `doorSections[${index}]`,
              message: `Door section ${
                index + 1
              }: start height must be less than end height`,
            });
          }
        });
      }

      return errors;
    },
    []
  );

  const calculation = useMemo(() => {
    const errors = validateInput(input);

    if (errors.length === 0) {
      return calculateWardrobeParts(input);
    } else {
      return null;
    }
  }, [input, validateInput]);

  const validationErrors = useMemo(() => {
    return validateInput(input);
  }, [input, validateInput]);

  const updateInput = useCallback(
    <K extends keyof WardrobeInput>(field: K, value: WardrobeInput[K]) => {
      setInput((prev) => {
        const newInput = { ...prev, [field]: value };

        // Reset door style if doors are disabled
        if (field === "doors" && !value) {
          newInput.doorStyle = "none";
          newInput.doorSections = [];
        }

        return newInput;
      });
    },
    []
  );

  const addDoorSection = useCallback(() => {
    setInput((prev) => {
      const sections = [...(prev.doorSections || [])];
      const lastSection = sections[sections.length - 1];
      const startY = lastSection ? lastSection.endY : 0;
      const endY = Math.min(startY + 50, prev.heightCm); // Default 50cm sections

      sections.push({
        id: `section-${Date.now()}`,
        startY,
        endY,
        doorType: "none",
      });

      return { ...prev, doorSections: sections };
    });
  }, []);

  const updateDoorSection = useCallback(
    (
      index: number,
      field: keyof DoorSection,
      value: DoorSection[keyof DoorSection]
    ) => {
      setInput((prev) => {
        const sections = [...(prev.doorSections || [])];
        sections[index] = { ...sections[index], [field]: value };
        return { ...prev, doorSections: sections };
      });
    },
    []
  );

  const removeDoorSection = useCallback((index: number) => {
    setInput((prev) => {
      const sections = [...(prev.doorSections || [])];
      sections.splice(index, 1);
      return { ...prev, doorSections: sections };
    });
  }, []);

  const updateMaterial = useCallback((material: "MDF" | "Plywood") => {
    setInput((prev) => ({
      ...prev,
      material,
      thicknessMm: MATERIALS[material].thicknessMm,
      pricePerM2: MATERIALS[material].pricePerM2,
    }));
  }, []);

  return {
    input,
    calculation,
    validationErrors,
    updateInput,
    updateMaterial,
    addDoorSection,
    updateDoorSection,
    removeDoorSection,
  };
}
