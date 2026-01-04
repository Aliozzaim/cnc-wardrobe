import { CncPart } from "../domain/types";

/**
 * Export CNC parts to DXF format
 * Basic DXF with rectangles for each part
 */
export function exportToDxf(parts: CncPart[]): string {
  let dxfContent = `0
SECTION
2
HEADER
0
ENDSEC
0
SECTION
2
ENTITIES
`;

  let currentY = 0;
  const spacing = 50; // Spacing between parts in DXF units

  parts.forEach((part) => {
    // Create a rectangle for each part
    // DXF rectangle is made of 4 lines
    const x1 = 0;
    const y1 = currentY;
    const x2 = part.widthMm;
    const y2 = currentY + part.heightMm;

    // Line 1: bottom
    dxfContent += `0
LINE
8
${part.name}
10
${x1}
20
${y1}
11
${x2}
21
${y1}
0
LINE
8
${part.name}
10
${x2}
20
${y1}
11
${x2}
21
${y2}
0
LINE
8
${part.name}
10
${x2}
20
${y2}
11
${x1}
21
${y2}
0
LINE
8
${part.name}
10
${x1}
20
${y2}
11
${x1}
21
${y1}
`;

    currentY += part.heightMm + spacing;
  });

  dxfContent += `0
ENDSEC
0
EOF
`;

  return dxfContent;
}

/**
 * Download DXF file
 */
export function downloadDxf(
  parts: CncPart[],
  filename: string = "wardrobe-parts.dxf"
): void {
  const dxfContent = exportToDxf(parts);
  const blob = new Blob([dxfContent], { type: "application/dxf" });
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
