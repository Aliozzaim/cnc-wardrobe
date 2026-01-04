import { useState, useCallback, useMemo } from "react";
import {
  WardrobeDoorInput,
  ColumnConfigInput,
  WardrobeColumn,
  CncDoorPart,
} from "../domain/door-types";
import { DoorConfigurationCalculator } from "../domain/door-calculator";

export interface DoorConfigurationState {
  wardrobeInput: WardrobeDoorInput;
  columns: WardrobeColumn[];
  cncParts: CncDoorPart[];
  summary: {
    totalDoors: number;
    totalArea: number;
    totalCost: number;
    totalBandLength: number;
    columns: number;
    doorTypes: {
      full: number;
      split: number;
      none: number;
    };
  };
}

const initialWardrobeInput: WardrobeDoorInput = {
  totalWidthCm: 300,
  totalHeightCm: 240,
  columns: [
    {
      widthCm: 100,
      shelfCount: 4,
      shelfHeights: [50, 60, 50, 60],
      shelfGaps: [2, 2, 2, 2],
      doorType: "full",
      splitDoorRanges: [],
      verticalSplitters: [],
    },
  ],
  doorThicknessMm: 18,
  material: "MDF",
  pricePerM2: 25,
  bandPricePerMeter: 3.5,
};

export function useDoorConfiguration() {
  const [wardrobeInput, setWardrobeInput] =
    useState<WardrobeDoorInput>(initialWardrobeInput);

  // Calculate columns and CNC parts
  const columns = useMemo(() => {
    return DoorConfigurationCalculator.calculateWardrobeConfiguration(
      wardrobeInput
    );
  }, [wardrobeInput]);

  const cncParts = useMemo(() => {
    return DoorConfigurationCalculator.generateCncParts(
      columns,
      wardrobeInput.material,
      wardrobeInput.pricePerM2,
      wardrobeInput.bandPricePerMeter
    );
  }, [columns, wardrobeInput]);

  const summary = useMemo(() => {
    return DoorConfigurationCalculator.generateSummary(columns, cncParts);
  }, [columns, cncParts]);

  // Update functions
  const updateWardrobeInput = useCallback(
    (updates: Partial<WardrobeDoorInput>) => {
      setWardrobeInput((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  const updateColumn = useCallback(
    (columnIndex: number, updates: Partial<ColumnConfigInput>) => {
      setWardrobeInput((prev) => ({
        ...prev,
        columns: prev.columns.map((col, index) =>
          index === columnIndex ? { ...col, ...updates } : col
        ),
      }));
    },
    []
  );

  const addColumn = useCallback(() => {
    setWardrobeInput((prev) => ({
      ...prev,
      columns: [
        ...prev.columns,
        {
          widthCm: 100,
          shelfCount: 3,
          shelfHeights: [60, 60, 60],
          shelfGaps: [2, 2, 2],
          doorType: "none",
          splitDoorRanges: [],
          verticalSplitters: [],
        },
      ],
    }));
  }, []);

  const removeColumn = useCallback(
    (columnIndex: number) => {
      if (wardrobeInput.columns.length <= 1) return;

      setWardrobeInput((prev) => ({
        ...prev,
        columns: prev.columns.filter((_, index) => index !== columnIndex),
      }));
    },
    [wardrobeInput.columns.length]
  );

  const addSplitDoorRange = useCallback(
    (columnIndex: number, startY: number, endY: number) => {
      updateColumn(columnIndex, {
        splitDoorRanges: [
          ...wardrobeInput.columns[columnIndex].splitDoorRanges,
          { startY, endY },
        ],
      });
    },
    [wardrobeInput.columns, updateColumn]
  );

  const removeSplitDoorRange = useCallback(
    (columnIndex: number, rangeIndex: number) => {
      updateColumn(columnIndex, {
        splitDoorRanges: wardrobeInput.columns[
          columnIndex
        ].splitDoorRanges.filter((_, index) => index !== rangeIndex),
      });
    },
    [wardrobeInput.columns, updateColumn]
  );

  const addVerticalSplitter = useCallback(
    (columnIndex: number, position: number) => {
      updateColumn(columnIndex, {
        verticalSplitters: [
          ...wardrobeInput.columns[columnIndex].verticalSplitters,
          position,
        ],
      });
    },
    [wardrobeInput.columns, updateColumn]
  );

  const removeVerticalSplitter = useCallback(
    (columnIndex: number, splitterIndex: number) => {
      updateColumn(columnIndex, {
        verticalSplitters: wardrobeInput.columns[
          columnIndex
        ].verticalSplitters.filter((_, index) => index !== splitterIndex),
      });
    },
    [wardrobeInput.columns, updateColumn]
  );

  // Validation
  const validateInput = useCallback(() => {
    const errors: string[] = [];

    if (wardrobeInput.totalWidthCm <= 0) {
      errors.push("Total width must be positive");
    }

    if (wardrobeInput.totalHeightCm <= 0) {
      errors.push("Total height must be positive");
    }

    const columnsTotalWidth = wardrobeInput.columns.reduce(
      (sum, col) => sum + col.widthCm,
      0
    );
    if (Math.abs(columnsTotalWidth - wardrobeInput.totalWidthCm) > 0.1) {
      errors.push(
        `Column widths (${columnsTotalWidth}cm) must equal total width (${wardrobeInput.totalWidthCm}cm)`
      );
    }

    wardrobeInput.columns.forEach((col, index) => {
      if (col.widthCm <= 0) {
        errors.push(`Column ${index + 1} width must be positive`);
      }

      if (col.shelfCount <= 0) {
        errors.push(`Column ${index + 1} must have at least 1 shelf`);
      }

      if (col.shelfHeights.some((height) => height <= 0)) {
        errors.push(`Column ${index + 1} all shelf heights must be positive`);
      }

      if (col.shelfGaps.some((gap) => gap < 0)) {
        errors.push(`Column ${index + 1} shelf gaps cannot be negative`);
      }

      // Validate split door ranges
      col.splitDoorRanges.forEach((range, rangeIndex) => {
        if (range.startY < 0 || range.endY >= col.shelfCount) {
          errors.push(
            `Column ${index + 1}, split door range ${
              rangeIndex + 1
            }: invalid shelf range`
          );
        }
        if (range.startY > range.endY) {
          errors.push(
            `Column ${index + 1}, split door range ${
              rangeIndex + 1
            }: start must be <= end`
          );
        }
      });

      // Validate vertical splitters
      col.verticalSplitters.forEach((position, splitterIndex) => {
        if (position <= 0 || position >= col.widthCm) {
          errors.push(
            `Column ${index + 1}, splitter ${
              splitterIndex + 1
            }: position must be within column width`
          );
        }
      });
    });

    return errors;
  }, [wardrobeInput]);

  const validationErrors = useMemo(() => validateInput(), [validateInput]);

  return {
    // State
    wardrobeInput,
    columns,
    cncParts,
    summary,
    validationErrors,

    // Actions
    updateWardrobeInput,
    updateColumn,
    addColumn,
    removeColumn,
    addSplitDoorRange,
    removeSplitDoorRange,
    addVerticalSplitter,
    removeVerticalSplitter,
    validateInput,

    // Computed
    isValid: validationErrors.length === 0,
  };
}
