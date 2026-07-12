import { jsPDF } from "jspdf";
import { Certificate } from "../types";

// Helper to draw smooth, flowing handwritten-look cursive lines
function drawCursiveSignature(doc: jsPDF, startX: number, startY: number, offsets: [number, number][]) {
  if (offsets.length === 0) return;
  
  let cx = startX + offsets[0][0];
  let cy = startY + offsets[0][1];
  
  for (let i = 1; i < offsets.length; i++) {
    const tx = startX + offsets[i][0];
    const ty = startY + offsets[i][1];
    doc.line(cx, cy, tx, ty);
    cx = tx;
    cy = ty;
  }
}

export function generateCertPdf(cert: Certificate): jsPDF {
  // A4 Landscape format: 297mm wide by 210mm high
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4"
  });

  const width = 297;
  const height = 210;

  // 1. Solid background color (pure crisp white)
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, width, height, "F");

  // Determine if this certificate has the Forage right sidebar (BA and TATA have it)
  const isForageSidebar = cert.company.toLowerCase().includes("british") || cert.company.toLowerCase().includes("tata");

  if (isForageSidebar) {
    // Determine right-sidebar background color (BA Red vs TATA Blue)
    let sidebarColor = [193, 23, 31]; // default BA Red (#C1171F)
    if (cert.company.toLowerCase().includes("tata")) {
      sidebarColor = [46, 104, 178]; // TATA Forage Blue (#2E68B2)
    }

    const sidebarX = 212;
    doc.setFillColor(sidebarColor[0], sidebarColor[1], sidebarColor[2]);
    
    // Draw the solid vertical brand block
    doc.rect(sidebarX, 0, width - sidebarX, height, "F");

    // Draw Forage logo text and leaf emblem on the right sidebar
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(255, 255, 255);
    
    // Smooth vector-style leaf logo emblem
    doc.triangle(236, 17, 244, 25, 233, 27, "F");
    doc.triangle(236, 17, 246, 19, 244, 25, "F");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Forage", 248, 25);

    // Sidebar tagline text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Inspiring and", 254, 38, { align: "center" });
    doc.text("empowering", 254, 43, { align: "center" });
    doc.text("future professionals", 254, 48, { align: "center" });
  }

  // 2. Draw Company Logo on top left
  const logoX = 20;
  const logoY = 24;

  if (cert.company.toLowerCase().includes("british")) {
    // BRITISH AIRWAYS LOGO
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(7, 29, 73); // BA Navy
    doc.text("BRITISH AIRWAYS", logoX, logoY);

    const textWidth = doc.getTextWidth("BRITISH AIRWAYS");
    const ribbonX = logoX + textWidth + 4;
    
    // Red Speedbird Swoosh
    doc.setFillColor(193, 23, 31);
    doc.triangle(ribbonX, logoY - 4, ribbonX + 16, logoY - 7, ribbonX + 8, logoY - 2, "F");
    
    // Navy bottom tail
    doc.setFillColor(7, 29, 73);
    doc.triangle(ribbonX + 2, logoY - 1, ribbonX + 12, logoY - 2, ribbonX + 6, logoY + 1, "F");

  } else if (cert.company.toLowerCase().includes("tata")) {
    // TATA LOGO
    const symbolX = logoX + 6;
    const symbolY = logoY - 4;
    
    doc.setDrawColor(46, 104, 178);
    doc.setLineWidth(1.2);
    doc.circle(symbolX, symbolY, 6, "S");
    
    doc.setDrawColor(46, 104, 178);
    doc.setLineWidth(0.8);
    doc.line(symbolX - 3, symbolY - 1, symbolX, symbolY - 4);
    doc.line(symbolX + 3, symbolY - 1, symbolX, symbolY - 4);
    doc.line(symbolX, symbolY - 4, symbolX, symbolY + 4);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(46, 104, 178);
    doc.text("TATA", logoX, logoY + 10);

  } else if (cert.company.toLowerCase().includes("deloitte")) {
    // DELOITTE LOGO
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor(0, 0, 0);
    doc.text("Deloitte", logoX, logoY + 2);
    
    const textW = doc.getTextWidth("Deloitte");
    doc.setFillColor(134, 188, 37); // Deloitte Green Dot
    doc.circle(logoX + textW + 2, logoY + 0.5, 2.2, "F");
  }

  // 3. Thin grey divider line
  const dividerEndY = isForageSidebar ? 200 : 277;
  doc.setDrawColor(225, 225, 225);
  doc.setLineWidth(0.3);
  doc.line(20, 42, dividerEndY, 42);

  // 4. Recipient Name: "Aryan Yadav" (Large, crisp, professional)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(33, 37, 41);
  doc.text("Aryan Yadav", 20, 88);

  // 5. Program Title: Clean bold sans-serif
  doc.setFont("helvetica", "bold");
  doc.setFontSize(21);
  doc.setTextColor(24, 28, 36);
  
  const titleText = cert.title;
  const titleLines = doc.splitTextToSize(titleText, isForageSidebar ? 180 : 250);
  doc.text(titleLines, 20, 101, { lineHeightFactor: 1.25 });

  // 6. Certificate of Completion & Issue Date
  const titleHeightOffset = titleLines.length * 10;
  const certificateTextY = 101 + titleHeightOffset;

  // Uses elegant, classic, normal Times (serif) rather than childish italics or gimmicks
  doc.setFont("times", "normal");
  doc.setFontSize(15);
  doc.setTextColor(100, 100, 100);
  doc.text("Certificate of Completion", 20, certificateTextY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  doc.text(cert.issueDate, 20, certificateTextY + 7);

  // 7. Completed Tasks Section
  const tasksHeaderY = certificateTextY + 23;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(110, 110, 110);
  doc.text(`Over the period of April 2026, Aryan Yadav has completed practical tasks in:`, 20, tasksHeaderY);

  // Render bullet tasks elegantly
  let taskY = tasksHeaderY + 6;
  const bulletTasks = cert.tasks || [];
  bulletTasks.forEach(task => {
    // Bullet dot
    doc.setFillColor(100, 100, 100);
    doc.circle(22, taskY - 1, 0.7, "F");
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(70, 70, 70);
    const splitTask = doc.splitTextToSize(task, isForageSidebar ? 175 : 240);
    doc.text(splitTask, 25, taskY);
    taskY += (splitTask.length * 4) + 1;
  });

  // 8. Signatory Block & Cursive Signature (Bottom right)
  const signX = isForageSidebar ? 170 : 230;
  const signY = 168;

  // Configure pen strokes for the signature
  doc.setDrawColor(24, 28, 36); // Classic deep dark ink
  doc.setLineWidth(0.4);

  if (cert.signatoryName?.includes("Tom")) {
    // Elegant, smooth continuous cursive loop path for Tom Brunskill
    const tomSignatureOffsets: [number, number][] = [
      [-15, -12], [-5, -12], // T top horizontal bar
      [-10, -12], [-10, -4], // T stem vertical down
      [-10, -4], [-8, -6], [-6, -4], [-4, -6], [-2, -4], // "om" loops
      [1, -10], [1, -3], // "B" stem
      [1, -10], [4, -9], [4, -7], [1, -6.5], [5, -5.5], [5, -3], [1, -3], // "B" dual loops
      [3, -4], [5, -5], [7, -4], [9, -5], [11, -3], // "run" loops
      [13, -7], [13, -3], // "s" loop
      [15, -3], [17, -5], [19, -3], // "ki"
      [21, -9], [21, -3], // "ll" stems
      [23, -3], [32, -5], [35, -2] // final elegant dash flourish
    ];
    drawCursiveSignature(doc, signX, signY, tomSignatureOffsets);
  } else {
    // Elegant, smooth continuous cursive loop path for Tina McCreery
    const tinaSignatureOffsets: [number, number][] = [
      [-12, -14], [-2, -14], // T top
      [-7, -14], [-7, -4], // T stem
      [-7, -4], [-5, -6], [-3, -4], [-1, -6], [1, -4], // "ina" loops
      [4, -12], [4, -3], // "M" stem 1
      [4, -12], [7, -5], [10, -12], [10, -3], // "M" middle peaks and stem 2
      [12, -5], [14, -3], [16, -5], [18, -3], // "c" loops
      [20, -10], [20, -3], // "C" stem
      [22, -4], [24, -5], [26, -3], [35, -4] // final elegant dash flourish
    ];
    drawCursiveSignature(doc, signX, signY, tinaSignatureOffsets);
  }

  // Signatory Name and Title text
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(33, 37, 41);
  doc.text(cert.signatoryName || "Tom Brunskill", signX, signY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(110, 110, 110);
  
  const titleTextSign = cert.signatoryTitle || "Co-Founder of Forage";
  const titleLinesSign = doc.splitTextToSize(titleTextSign, 50);
  doc.text(titleLinesSign, signX, signY + 4, { lineHeightFactor: 1.2 });

  // 9. Verification Footer Label
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text(`Verifiable Reference ID: ${cert.verificationId}  |  Platform: Forage Work Simulation Portal`, 20, height - 12);

  return doc;
}

export function downloadCertificate(cert: Certificate): void {
  const doc = generateCertPdf(cert);
  doc.save(cert.pdfName);
}
