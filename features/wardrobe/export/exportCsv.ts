import { CncPart } from "../domain/types";

/**
 * Export CNC parts to CSV format
 * CNC-friendly table with all dimensions in mm and banding information
 */
export function exportToCsv(parts: CncPart[]): string {
  const headers = [
    "Part ID",
    "Name",
    "Width (mm)",
    "Height (mm)",
    "Thickness (mm)",
    "Quantity",
    "Material",
    "Area (m²)",
    "Cost (€)",
    "Banding Sides",
    "Banding Details",
  ];

  const rows = parts.map((part) => {
    // Get banding information
    const bandingSides =
      part.edgeBanding && part.edgeBanding.length > 0
        ? part.edgeBanding.map((edge) => edge.side).join(", ")
        : "";

    const bandingDetails =
      part.edgeBanding && part.edgeBanding.length > 0
        ? part.edgeBanding
            .map(
              (edge) => `${edge.side}: ${edge.lengthMm}mm × ${edge.quantity}`
            )
            .join("; ")
        : "";

    return [
      part.id,
      part.name,
      part.widthMm.toString(),
      part.heightMm.toString(),
      part.thicknessMm.toString(),
      part.quantity.toString(),
      part.material,
      part.areaM2.toFixed(4),
      part.cost.toFixed(2),
      bandingSides,
      bandingDetails,
    ];
  });

  // Combine headers and rows
  const csvContent = [headers, ...rows]
    .map((row) => row.map((field) => `"${field}"`).join(","))
    .join("\n");

  return csvContent;
}

/**
 * Download CSV file
 */
export function downloadCsv(
  parts: CncPart[],
  filename: string = "wardrobe-parts.csv"
): void {
  const csvContent = exportToCsv(parts);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
