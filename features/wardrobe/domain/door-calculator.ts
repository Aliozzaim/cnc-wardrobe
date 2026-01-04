import {
  WardrobeDoorInput,
  WardrobeColumn,
  Shelf,
  DoorConfiguration,
  DoorPanel,
  VerticalSplitter,
  EdgeBanding,
  CncDoorPart,
  ColumnConfigInput,
} from "./door-types";

/**
 * Door Configuration Calculator
 * Converts user input into CNC-ready door parts
 */

export class DoorConfigurationCalculator {
  private static readonly DOOR_THICKNESS_MM = 18;
  private static readonly DOOR_GAP_MM = 2; // Gap between doors
  private static readonly OVERLAP_MM = 4; // Door overlap for split doors

  /**
   * Convert user input to wardrobe configuration
   */
  static calculateWardrobeConfiguration(
    input: WardrobeDoorInput
  ): WardrobeColumn[] {
    const columns: WardrobeColumn[] = [];
    let currentXPosition = 0;

    for (let i = 0; i < input.columns.length; i++) {
      const columnInput = input.columns[i];
      const column = this.createColumn(
        columnInput,
        i,
        currentXPosition,
        input.totalHeightCm
      );
      columns.push(column);
      currentXPosition += columnInput.widthCm;
    }

    return columns;
  }

  /**
   * Create a single column with shelves and doors
   */
  private static createColumn(
    input: ColumnConfigInput,
    columnIndex: number,
    xPos: number,
    totalHeight: number
  ): WardrobeColumn {
    const columnId = `column-${columnIndex + 1}`;

    // Create shelves
    const shelves = this.createShelves(input, totalHeight);

    // Create vertical splitters
    const verticalSplitters = this.createVerticalSplitters(
      input.verticalSplitters,
      totalHeight
    );

    // Create door configuration
    const doors = this.createDoorConfiguration(
      input,
      columnId,
      input.widthCm,
      shelves
    );

    return {
      id: columnId,
      widthCm: input.widthCm,
      totalHeightCm: totalHeight,
      shelves,
      doors,
      verticalSplitters,
    };
  }

  /**
   * Create shelves for a column
   */
  private static createShelves(
    input: ColumnConfigInput,
    totalHeight: number
  ): Shelf[] {
    const shelves: Shelf[] = [];
    let currentPosition = 0;

    for (let i = 0; i < input.shelfCount; i++) {
      const shelfHeight = input.shelfHeights[i] || 40; // Default 40cm
      const gap = input.shelfGaps[i] || 2; // Default 2cm gap

      shelves.push({
        id: `shelf-${i + 1}`,
        position: currentPosition,
        heightCm: shelfHeight,
        gapCm: gap,
      });

      currentPosition += shelfHeight + gap;
    }

    return shelves;
  }

  /**
   * Create vertical splitters
   */
  private static createVerticalSplitters(
    positions: number[],
    totalHeight: number
  ): VerticalSplitter[] {
    return positions.map((position, index) => ({
      id: `splitter-${index + 1}`,
      positionCm: position,
      heightCm: totalHeight,
      thicknessMm: 18,
    }));
  }

  /**
   * Create door configuration for a column
   */
  private static createDoorConfiguration(
    input: ColumnConfigInput,
    columnId: string,
    columnWidth: number,
    shelves: Shelf[]
  ): DoorConfiguration[] {
    if (input.doorType === "none") {
      return [];
    }

    if (input.doorType === "full") {
      return [this.createFullDoor(columnId, columnWidth, shelves)];
    }

    if (input.doorType === "split") {
      return this.createSplitDoors(
        columnId,
        columnWidth,
        input.splitDoorRanges,
        shelves
      );
    }

    return [];
  }

  /**
   * Create a full-height door
   */
  private static createFullDoor(
    columnId: string,
    columnWidth: number,
    shelves: Shelf[]
  ): DoorConfiguration {
    const totalHeight =
      shelves.reduce((sum, shelf) => sum + shelf.heightCm + shelf.gapCm, 0) -
      shelves[shelves.length - 1].gapCm;

    const doorPanel: DoorPanel = {
      id: `${columnId}-door-full`,
      columnId,
      startYCm: 0,
      endYCm: totalHeight,
      widthCm: columnWidth + this.OVERLAP_MM / 10, // Add overlap in cm
      heightCm: totalHeight,
      thicknessMm: this.DOOR_THICKNESS_MM,
      edgeBanding: this.calculateDoorEdgeBanding(
        totalHeight,
        columnWidth + this.OVERLAP_MM / 10
      ),
    };

    return {
      id: `${columnId}-config-full`,
      type: "full",
      panels: [doorPanel],
    };
  }

  /**
   * Create split doors based on shelf ranges
   */
  private static createSplitDoors(
    columnId: string,
    columnWidth: number,
    ranges: Array<{ startY: number; endY: number }>,
    shelves: Shelf[]
  ): DoorConfiguration[] {
    const doorPanels: DoorPanel[] = [];
    const doorWidth = columnWidth / 2 + this.OVERLAP_MM / 10; // Split width with overlap

    ranges.forEach((range, index) => {
      const startYCm = this.getShelfPosition(range.startY, shelves);
      const endYCm = this.getShelfEndPosition(range.endY, shelves);
      const doorHeight = endYCm - startYCm;

      // Create left door panel
      const leftPanel: DoorPanel = {
        id: `${columnId}-door-left-${index + 1}`,
        columnId,
        startYCm,
        endYCm,
        widthCm: doorWidth,
        heightCm: doorHeight,
        thicknessMm: this.DOOR_THICKNESS_MM,
        edgeBanding: this.calculateDoorEdgeBanding(doorHeight, doorWidth),
      };

      // Create right door panel
      const rightPanel: DoorPanel = {
        id: `${columnId}-door-right-${index + 1}`,
        columnId,
        startYCm,
        endYCm,
        widthCm: doorWidth,
        heightCm: doorHeight,
        thicknessMm: this.DOOR_THICKNESS_MM,
        edgeBanding: this.calculateDoorEdgeBanding(doorHeight, doorWidth),
      };

      doorPanels.push(leftPanel, rightPanel);
    });

    return [
      {
        id: `${columnId}-config-split`,
        type: "split",
        panels: doorPanels,
      },
    ];
  }

  /**
   * Get shelf position from shelf index
   */
  private static getShelfPosition(
    shelfIndex: number,
    shelves: Shelf[]
  ): number {
    if (shelfIndex === 0) return 0;

    let position = 0;
    for (let i = 0; i < shelfIndex; i++) {
      position += shelves[i].heightCm + shelves[i].gapCm;
    }
    return position;
  }

  /**
   * Get shelf end position from shelf index
   */
  private static getShelfEndPosition(
    shelfIndex: number,
    shelves: Shelf[]
  ): number {
    let position = 0;
    for (let i = 0; i <= shelfIndex; i++) {
      position += shelves[i].heightCm;
      if (i < shelfIndex) {
        position += shelves[i].gapCm;
      }
    }
    return position;
  }

  /**
   * Calculate edge banding for doors (all edges are banded)
   */
  private static calculateDoorEdgeBanding(
    heightCm: number,
    widthCm: number
  ): EdgeBanding[] {
    const heightMm = heightCm * 10;
    const widthMm = widthCm * 10;

    return [
      { side: "top", lengthMm: widthMm, quantity: 1 },
      { side: "bottom", lengthMm: widthMm, quantity: 1 },
      { side: "left", lengthMm: heightMm, quantity: 1 },
      { side: "right", lengthMm: heightMm, quantity: 1 },
    ];
  }

  /**
   * Convert door panels to CNC parts
   */
  static generateCncParts(
    columns: WardrobeColumn[],
    material: string,
    pricePerM2: number,
    bandPricePerMeter: number
  ): CncDoorPart[] {
    const cncParts: CncDoorPart[] = [];

    columns.forEach((column) => {
      column.doors.forEach((doorConfig) => {
        doorConfig.panels.forEach((panel) => {
          const cncPart = this.createCncPart(
            panel,
            material,
            pricePerM2,
            bandPricePerMeter
          );
          cncParts.push(cncPart);
        });
      });
    });

    return cncParts;
  }

  /**
   * Create CNC part from door panel
   */
  private static createCncPart(
    panel: DoorPanel,
    material: string,
    pricePerM2: number,
    bandPricePerMeter: number
  ): CncDoorPart {
    const widthMm = Math.round(panel.widthCm * 10);
    const heightMm = Math.round(panel.heightCm * 10);
    const areaM2 = (widthMm * heightMm) / 1000000;

    // Calculate edge banding cost
    const totalBandLength =
      panel.edgeBanding.reduce(
        (sum, edge) => sum + edge.lengthMm * edge.quantity,
        0
      ) / 1000; // Convert to meters
    const bandCost = totalBandLength * bandPricePerMeter;

    // Calculate material cost
    const materialCost = areaM2 * pricePerM2;

    const totalCost = materialCost + bandCost;

    return {
      id: panel.id,
      name: `Door Panel ${panel.id}`,
      widthMm,
      heightMm,
      thicknessMm: panel.thicknessMm,
      quantity: 1,
      edgeBanding: panel.edgeBanding,
      material,
      cost: totalCost,
    };
  }

  /**
   * Generate summary statistics
   */
  static generateSummary(columns: WardrobeColumn[], cncParts: CncDoorPart[]) {
    const totalDoors = cncParts.length;
    const totalArea = cncParts.reduce(
      (sum, part) => sum + (part.widthMm * part.heightMm) / 1000000,
      0
    );
    const totalCost = cncParts.reduce((sum, part) => sum + part.cost, 0);
    const totalBandLength =
      cncParts.reduce(
        (sum, part) =>
          sum +
          part.edgeBanding.reduce(
            (bandSum, edge) => bandSum + edge.lengthMm * edge.quantity,
            0
          ),
        0
      ) / 1000;

    return {
      totalDoors,
      totalArea,
      totalCost,
      totalBandLength,
      columns: columns.length,
      doorTypes: this.getDoorTypeSummary(columns),
    };
  }

  /**
   * Get summary of door types used
   */
  private static getDoorTypeSummary(columns: WardrobeColumn[]) {
    const summary = {
      full: 0,
      split: 0,
      none: 0,
    };

    columns.forEach((column) => {
      column.doors.forEach((door) => {
        summary[door.type]++;
      });
    });

    return summary;
  }
}
