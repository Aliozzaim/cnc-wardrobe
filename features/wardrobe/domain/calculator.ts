import {
  WardrobeInput,
  CncPart,
  WardrobeCalculation,
  EdgeBanding,
  DoorSection,
} from "./types";

/**
 * Get translated edge banding name
 */
function getEdgeBandingName(partName: string, side: string): string {
  const edgeNameMap: Record<string, Record<string, string>> = {
    "Side Panels": {
      front: "sidePanelsFrontEdge",
      top: "sidePanelsTopEdge",
      bottom: "sidePanelsBottomEdge",
    },
    "Top & Bottom Panels": {
      front: "topBottomPanelsFrontEdge",
      left: "topBottomPanelsLeftEdge",
      right: "topBottomPanelsRightEdge",
    },
    Shelves: {
      front: "shelvesFrontEdge",
    },
    "Full Door": {
      front: "doorPanelFrontEdge",
      back: "doorPanelBackEdge",
      left: "doorPanelLeftEdge",
      right: "doorPanelRightEdge",
      top: "doorPanelTopEdge",
      bottom: "doorPanelBottomEdge",
    },
    "Split Doors": {
      front: "doorPanelFrontEdge",
      back: "doorPanelBackEdge",
      left: "doorPanelLeftEdge",
      right: "doorPanelRightEdge",
      top: "doorPanelTopEdge",
      bottom: "doorPanelBottomEdge",
    },
  };

  // Return the translation key if found, otherwise fallback to English
  return (
    edgeNameMap[partName]?.[side] ||
    `${partName} - ${side.charAt(0).toUpperCase() + side.slice(1)} Edge`
  );
}

/**
 * Determine which edges need banding for a specific part
 * Manufacturing Rules:
 * - Only visible edges get banding
 * Back-facing or wall-facing edges do NOT get banding
 * Shelves are banded on the front edge only
 */
function determineEdgeBanding(
  partName: string,
  input: WardrobeInput
): EdgeBanding[] {
  const edges: EdgeBanding[] = [];

  // Side panels - Front edge is visible, top/bottom edges may be visible depending on installation
  if (partName.includes("Side Panels")) {
    edges.push({ side: "front", lengthMm: input.heightCm * 10, quantity: 2 });
    // Top and bottom edges might be visible if not against other furniture
    // For now, we'll band them as they could be visible
    edges.push(
      { side: "top", lengthMm: input.depthCm * 10, quantity: 2 },
      { side: "bottom", lengthMm: input.depthCm * 10, quantity: 2 }
    );
  }

  // Top & Bottom panels - Front edge is visible, left/right edges may be visible
  if (partName.includes("Top & Bottom")) {
    edges.push(
      {
        side: "front",
        lengthMm: input.widthCm * 10 - 2 * input.thicknessMm,
        quantity: 2,
      },
      { side: "left", lengthMm: input.depthCm * 10, quantity: 2 },
      { side: "right", lengthMm: input.depthCm * 10, quantity: 2 }
    );
  }

  // Shelves - ONLY front edge is visible (back faces wall, sides face other shelves)
  if (partName.includes("Shelves")) {
    edges.push({
      side: "front",
      lengthMm: input.widthCm * 10 - 2 * input.thicknessMm,
      quantity: input.shelves,
    });
  }

  // Back panel - NO visible edges (faces the wall completely)
  if (partName.includes("Back Panel")) {
    // No banding for back panel as it faces the wall
    // This is explicitly NOT banded per manufacturing rules
  }

  // Doors - All edges are visible when doors are added
  if (partName.includes("Door")) {
    const doorHeight = (input.heightCm - 2) * 10; // Leave 20mm gap at bottom
    if (partName.includes("Full")) {
      const doorWidth = (input.widthCm + 0.4) * 10; // Add 4mm for overlap
      edges.push(
        { side: "front", lengthMm: doorWidth, quantity: 1 },
        { side: "back", lengthMm: doorWidth, quantity: 1 },
        { side: "left", lengthMm: doorHeight, quantity: 1 },
        { side: "right", lengthMm: doorHeight, quantity: 1 },
        { side: "top", lengthMm: doorWidth, quantity: 1 },
        { side: "bottom", lengthMm: doorWidth, quantity: 1 }
      );
    } else if (partName.includes("Split")) {
      const doorWidth = (input.widthCm / 2 + 0.2) * 10; // Add 2mm for overlap per door
      edges.push(
        { side: "front", lengthMm: doorWidth, quantity: 2 },
        { side: "back", lengthMm: doorWidth, quantity: 2 },
        { side: "left", lengthMm: doorHeight, quantity: 2 },
        { side: "right", lengthMm: doorHeight, quantity: 2 },
        { side: "top", lengthMm: doorWidth, quantity: 2 },
        { side: "bottom", lengthMm: doorWidth, quantity: 2 }
      );
    }
  }

  return edges;
}

/**
 * Calculate edge banding requirements for wardrobe parts
 */
function calculateBandRequirement(input: WardrobeInput, parts: CncPart[]) {
  const edges: Array<{ name: string; lengthMm: number; quantity: number }> = [];
  let totalBandMeters = 0;

  parts.forEach((part) => {
    const bandingEdges = determineEdgeBanding(part.name, input);

    // Store banding information in the part
    part.edgeBanding = bandingEdges;

    // Calculate total banding
    bandingEdges.forEach((edge) => {
      edges.push({
        name: getEdgeBandingName(part.name, edge.side),
        lengthMm: edge.lengthMm,
        quantity: edge.quantity,
      });
      totalBandMeters += (edge.lengthMm / 1000) * edge.quantity;
    });
  });

  const bandCost = totalBandMeters * input.bandPricePerMeter;

  return {
    totalBandMeters,
    bandCost,
    edges,
  };
}

/**
 * Generate door parts based on flexible door sections
 */
function generateDoorParts(input: WardrobeInput): CncPart[] {
  const doorParts: CncPart[] = [];

  if (!input.doors) return doorParts;

  // If using simple door style (backward compatibility)
  if (!input.doorSections || input.doorSections.length === 0) {
    if (input.doorStyle === "full") {
      const doorWidth = (input.widthCm + 0.4) * 10; // Add 4mm for overlap
      const doorHeight = (input.heightCm - 2) * 10; // Leave 20mm gap at bottom
      const areaM2 = (doorWidth / 1000) * (doorHeight / 1000);
      const cost = areaM2 * input.pricePerM2;

      doorParts.push({
        id: "door-full",
        name: "Full Door",
        widthMm: doorWidth,
        heightMm: doorHeight,
        thicknessMm: 18,
        quantity: 1,
        material: input.material,
        areaM2,
        cost,
      });
    } else if (input.doorStyle === "split") {
      const doorWidth = (input.widthCm / 2 + 0.2) * 10; // Add 2mm for overlap per door
      const doorHeight = (input.heightCm - 2) * 10; // Leave 20mm gap at bottom
      const areaM2 = (doorWidth / 1000) * (doorHeight / 1000);
      const cost = areaM2 * input.pricePerM2;

      doorParts.push({
        id: "doors-split",
        name: "Split Doors",
        widthMm: doorWidth,
        heightMm: doorHeight,
        thicknessMm: 18,
        quantity: 2,
        material: input.material,
        areaM2,
        cost,
      });
    }
  } else {
    // Use flexible door sections
    input.doorSections.forEach((section, index) => {
      if (section.doorType === "none") return;

      const sectionHeight = (section.endY - section.startY) * 10; // Convert to mm
      const doorWidth =
        section.doorType === "full"
          ? (input.widthCm + 0.4) * 10
          : (input.widthCm / 2 + 0.2) * 10;
      const quantity = section.doorType === "full" ? 1 : 2;
      const areaM2 = (doorWidth / 1000) * (sectionHeight / 1000) * quantity;
      const cost = areaM2 * input.pricePerM2;

      doorParts.push({
        id: `door-section-${index}`,
        name: `Door Section ${index + 1} (${section.doorType})`,
        widthMm: doorWidth,
        heightMm: sectionHeight,
        thicknessMm: 18,
        quantity,
        material: input.material,
        areaM2,
        cost,
      });
    });
  }

  return doorParts;
}

/**
 * Calculate CNC parts for a wardrobe based on input parameters
 * All calculations are in millimeters for CNC compatibility
 */
export function calculateWardrobeParts(
  input: WardrobeInput
): WardrobeCalculation {
  const {
    widthCm,
    heightCm,
    depthCm,
    shelves,
    thicknessMm,
    backPanel,
    pricePerM2,
    material,
    doors,
    doorStyle,
    bandPricePerMeter,
  } = input;

  // Convert cm to mm
  const widthMm = widthCm * 10;
  const heightMm = heightCm * 10;
  const depthMm = depthCm * 10;

  const parts: CncPart[] = [];

  // Helper function to calculate area and cost
  const calculateAreaAndCost = (
    widthMm: number,
    heightMm: number,
    quantity: number
  ): { areaM2: number; cost: number } => {
    const areaM2 = (widthMm / 1000) * (heightMm / 1000) * quantity;
    const cost = areaM2 * pricePerM2;
    return { areaM2, cost };
  };

  // 1. Side Panels (2 pieces)
  // Width = wardrobe depth, Height = wardrobe height, Thickness = material thickness
  const sidePanelWidth = depthMm;
  const sidePanelHeight = heightMm;
  const { areaM2: sideArea, cost: sideCost } = calculateAreaAndCost(
    sidePanelWidth,
    sidePanelHeight,
    2
  );

  parts.push({
    id: "side-panels",
    name: "Side Panels",
    widthMm: sidePanelWidth,
    heightMm: sidePanelHeight,
    thicknessMm,
    quantity: 2,
    material,
    areaM2: sideArea,
    cost: sideCost,
  });

  // 2. Top & Bottom Panels (2 pieces)
  // Width = wardrobe width − (2 × material thickness), Depth = wardrobe depth
  const topBottomWidth = widthMm - 2 * thicknessMm;
  const topBottomHeight = depthMm;
  const { areaM2: topBottomArea, cost: topBottomCost } = calculateAreaAndCost(
    topBottomWidth,
    topBottomHeight,
    2
  );

  parts.push({
    id: "top-bottom-panels",
    name: "Top & Bottom Panels",
    widthMm: topBottomWidth,
    heightMm: topBottomHeight,
    thicknessMm,
    quantity: 2,
    material,
    areaM2: topBottomArea,
    cost: topBottomCost,
  });

  // 3. Shelves (user input quantity)
  // Same dimensions as top panel
  if (shelves > 0) {
    const { areaM2: shelvesArea, cost: shelvesCost } = calculateAreaAndCost(
      topBottomWidth,
      topBottomHeight,
      shelves
    );

    parts.push({
      id: "shelves",
      name: "Shelves",
      widthMm: topBottomWidth,
      heightMm: topBottomHeight,
      thicknessMm,
      quantity: shelves,
      material,
      areaM2: shelvesArea,
      cost: shelvesCost,
    });
  }

  // 4. Back Panel (optional)
  // Width = wardrobe width, Height = wardrobe height, Thickness = material thickness
  if (backPanel) {
    const backPanelWidth = widthMm;
    const backPanelHeight = heightMm;
    const { areaM2: backArea, cost: backCost } = calculateAreaAndCost(
      backPanelWidth,
      backPanelHeight,
      1
    );

    parts.push({
      id: "back-panel",
      name: "Back Panel",
      widthMm: backPanelWidth,
      heightMm: backPanelHeight,
      thicknessMm,
      quantity: 1,
      material,
      areaM2: backArea,
      cost: backCost,
    });
  }

  // 5. Doors (optional) - use the new flexible door generation
  const doorParts = generateDoorParts(input);
  parts.push(...doorParts);

  // Calculate band/edge covering
  const bandCalculation = calculateBandRequirement(input, parts);

  // Add banding costs to individual parts for display
  parts.forEach((part) => {
    if (part.edgeBanding && part.edgeBanding.length > 0) {
      const partBandingCost = part.edgeBanding.reduce((sum, edge) => {
        return (
          sum + (edge.lengthMm / 1000) * edge.quantity * input.bandPricePerMeter
        );
      }, 0);
      part.cost += partBandingCost;
    }
  });

  // Calculate totals
  const totalCost = parts.reduce((sum, part) => sum + part.cost, 0);
  const totalArea = parts.reduce((sum, part) => sum + part.areaM2, 0);

  return {
    parts,
    totalCost,
    totalArea,
    bandCalculation,
  };
}
