import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => jsPDF;
  lastAutoTable: { finalY: number };
}

export class ExhaustivePDFGenerator {
  private doc: jsPDFWithAutoTable;
  private currentY: number = 20;
  private pageNumber: number = 1;
  private readonly pageWidth: number = 210;
  private readonly pageHeight: number = 297;
  private readonly margin: number = 12;
  private readonly contentWidth: number = 186;

  constructor() {
    this.doc = new jsPDF('p', 'mm', 'a4') as jsPDFWithAutoTable;
  }

  // Couleurs webapp exactes - Palette Monochrome Élégant
  private colors = {
    primary: [71, 85, 105] as const,      // text-slate-600 - tons gris-bleu principaux
    secondary: [100, 116, 139] as const,   // text-slate-500
    accent: [148, 163, 184] as const,      // text-slate-400
    light: [241, 245, 249] as const,       // bg-slate-100
    dark: [15, 23, 42] as const,          // text-slate-900
    teal: [20, 184, 166] as const,        // text-teal-500 - pour succès/recommandé
    sky: [14, 165, 233] as const,         // text-sky-500 - pour info/possible
    gray: [107, 114, 128] as const,       // text-gray-500 - pour neutre
    white: [255, 255, 255] as const       // bg-white
  };

  // DONNEES COMPLETES DE LA WEBAPP - DASHBOARD
  private readonly dashboardData = {
    villes: [
      {
        nom: 'Paris', pays: 'FR', score: 7.87, statut: 'RECOMMANDE', 
        ebitdaAn1: 0.52, equity: 1.89, zone: 'Europe',
        pl: {
          an1: { ca: 54.16, revenus: 1.78, charges: 1.26, ebitda: 0.52, rn: -0.43 },
          an2: { ca: 132.57, revenus: 4.25, charges: 1.41, ebitda: 2.84, rn: 0.69 },
          an3: { ca: 227.58, revenus: 11.55, charges: 1.62, ebitda: 9.93, rn: 4.88 }
        },
        sga: { personnel: 8.45, bureaux: 2.10, it: 1.35, compliance: 0.85, voyage: 0.75, setup: 0.35, total: 13.85 },
        financement: { besoins: 13.73, equity: 1.89, dette: 11.84, cout: 6.5, ratio: 6.27 },
        impact: { proximite: 9, esg: 8, formation: 10, transparence: 9, emplois: 7, influence: 8, partenariats: 8 }
      },
      {
        nom: 'Geneve', pays: 'CH', score: 7.81, statut: 'RECOMMANDE',
        ebitdaAn1: -0.23, equity: 1.78, zone: 'Europe',
        pl: {
          an1: { ca: 54.16, revenus: 1.78, charges: 2.01, ebitda: -0.23, rn: -2.18 },
          an2: { ca: 132.57, revenus: 4.25, charges: 2.26, ebitda: 1.99, rn: -1.16 },
          an3: { ca: 227.58, revenus: 11.55, charges: 2.46, ebitda: 9.09, rn: 6.63 }
        },
        sga: { personnel: 9.20, bureaux: 2.45, it: 1.35, compliance: 0.95, voyage: 0.68, setup: 0.28, total: 14.91 },
        financement: { besoins: 12.64, equity: 1.78, dette: 10.86, cout: 6.0, ratio: 6.10 },
        impact: { proximite: 6, esg: 9, formation: 8, transparence: 10, emplois: 6, influence: 9, partenariats: 7 }
      },
      {
        nom: 'Amsterdam', pays: 'NL', score: 7.65, statut: 'RECOMMANDE',
        ebitdaAn1: 0.07, equity: 1.74, zone: 'Europe',
        pl: {
          an1: { ca: 54.16, revenus: 1.78, charges: 1.71, ebitda: 0.07, rn: -1.68 },
          an2: { ca: 132.57, revenus: 4.25, charges: 1.86, ebitda: 2.39, rn: 0.64 },
          an3: { ca: 227.58, revenus: 11.55, charges: 2.15, ebitda: 9.40, rn: 7.25 }
        },
        sga: { personnel: 7.85, bureaux: 1.95, it: 1.35, compliance: 0.75, voyage: 0.82, setup: 0.31, total: 13.03 },
        financement: { besoins: 12.33, equity: 1.74, dette: 10.59, cout: 6.2, ratio: 6.09 },
        impact: { proximite: 7, esg: 8, formation: 7, transparence: 8, emplois: 8, influence: 7, partenariats: 9 }
      },
      {
        nom: 'Singapour', pays: 'SG', score: 7.49, statut: 'POSSIBLE',
        ebitdaAn1: 0.02, equity: 1.61, zone: 'Asie',
        pl: {
          an1: { ca: 54.16, revenus: 1.78, charges: 1.76, ebitda: 0.02, rn: -1.73 },
          an2: { ca: 132.57, revenus: 4.25, charges: 1.91, ebitda: 2.34, rn: 0.61 },
          an3: { ca: 227.58, revenus: 11.55, charges: 2.15, ebitda: 9.40, rn: 7.27 }
        },
        sga: { personnel: 6.95, bureaux: 2.25, it: 1.25, compliance: 0.65, voyage: 1.15, setup: 0.45, total: 12.70 },
        financement: { besoins: 11.12, equity: 1.61, dette: 9.51, cout: 7.0, ratio: 5.91 },
        impact: { proximite: 4, esg: 6, formation: 5, transparence: 6, emplois: 6, influence: 5, partenariats: 4 }
      },
      {
        nom: 'Hambourg', pays: 'DE', score: 6.78, statut: 'POSSIBLE',
        ebitdaAn1: 0.09, equity: 1.85, zone: 'Europe',
        pl: {
          an1: { ca: 54.16, revenus: 1.78, charges: 1.69, ebitda: 0.09, rn: -1.66 },
          an2: { ca: 132.57, revenus: 4.25, charges: 1.84, ebitda: 2.41, rn: 0.66 },
          an3: { ca: 227.58, revenus: 11.55, charges: 2.59, ebitda: 8.96, rn: 6.71 }
        },
        sga: { personnel: 7.60, bureaux: 1.75, it: 1.35, compliance: 0.80, voyage: 0.70, setup: 0.25, total: 12.45 },
        financement: { besoins: 13.26, equity: 1.85, dette: 11.41, cout: 6.8, ratio: 6.17 },
        impact: { proximite: 5, esg: 7, formation: 6, transparence: 7, emplois: 7, influence: 6, partenariats: 6 }
      },
      {
        nom: 'Londres', pays: 'GB', score: 6.72, statut: 'POSSIBLE',
        ebitdaAn1: -0.67, equity: 2.00, zone: 'Europe',
        pl: {
          an1: { ca: 54.16, revenus: 1.78, charges: 2.45, ebitda: -0.67, rn: -2.42 },
          an2: { ca: 132.57, revenus: 4.25, charges: 2.70, ebitda: 1.55, rn: -0.20 },
          an3: { ca: 227.58, revenus: 11.55, charges: 3.08, ebitda: 8.47, rn: 6.35 }
        },
        sga: { personnel: 8.95, bureaux: 2.85, it: 1.45, compliance: 0.90, voyage: 0.65, setup: 0.42, total: 15.22 },
        financement: { besoins: 14.42, equity: 2.00, dette: 12.42, cout: 7.5, ratio: 6.21 },
        impact: { proximite: 6, esg: 8, formation: 7, transparence: 9, emplois: 8, influence: 8, partenariats: 6 }
      },
      {
        nom: 'Chypre', pays: 'CY', score: 6.51, statut: 'POSSIBLE',
        ebitdaAn1: 0.40, equity: 2.38, zone: 'Europe',
        pl: {
          an1: { ca: 54.16, revenus: 1.78, charges: 1.38, ebitda: 0.40, rn: -1.23 },
          an2: { ca: 132.57, revenus: 4.25, charges: 1.56, ebitda: 2.69, rn: 1.06 },
          an3: { ca: 227.58, revenus: 11.55, charges: 1.95, ebitda: 9.60, rn: 8.40 }
        },
        sga: { personnel: 5.45, bureaux: 1.25, it: 1.15, compliance: 0.55, voyage: 0.95, setup: 0.18, total: 9.53 },
        financement: { besoins: 17.33, equity: 2.38, dette: 14.95, cout: 8.5, ratio: 6.28 },
        impact: { proximite: 4, esg: 5, formation: 4, transparence: 6, emplois: 5, influence: 4, partenariats: 4 }
      }
    ]
  };

  private async addHeader(neskaroLogo?: string, mereyaLogo?: string) {
    try {
      this.doc.setFillColor(...this.colors.white);
      this.doc.rect(0, 0, this.pageWidth, 15, 'F');
      
      if (neskaroLogo) {
        try {
          this.doc.addImage(neskaroLogo, 'JPEG', this.margin, 2, 20, 10);
        } catch {
          this.addTextLogo('NESKAO', this.margin, 8);
        }
      } else {
        this.addTextLogo('NESKAO', this.margin, 8);
      }
      
      this.doc.setFontSize(8);
      this.doc.setTextColor(...this.colors.secondary);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text('Analyse Strategique - Confidentiel', this.pageWidth / 2, 8, { align: 'center' });
      
      if (mereyaLogo) {
        try {
          this.doc.addImage(mereyaLogo, 'PNG', this.pageWidth - this.margin - 20, 2, 20, 10);
        } catch {
          this.addTextLogo('MEREYA', this.pageWidth - this.margin - 15, 8);
        }
      } else {
        this.addTextLogo('MEREYA', this.pageWidth - this.margin - 15, 8);
      }
      
      this.doc.setDrawColor(...this.colors.accent);
      this.doc.setLineWidth(0.3);
      this.doc.line(this.margin, 13, this.pageWidth - this.margin, 13);
      
    } catch (error) {
      this.addSimpleHeader();
    }
  }

  private addTextLogo(text: string, x: number, y: number) {
    this.doc.setFontSize(8);
    this.doc.setTextColor(...this.colors.dark);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(text, x, y);
  }

  private addSimpleHeader() {
    this.doc.setFillColor(...this.colors.light);
    this.doc.rect(0, 0, this.pageWidth, 15, 'F');
    
    this.doc.setFontSize(8);
    this.doc.setTextColor(...this.colors.dark);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('NESKAO', this.margin, 8);
    this.doc.text('Analyse Strategique - Confidentiel', this.pageWidth / 2, 8, { align: 'center' });
    this.doc.text('MEREYA', this.pageWidth - this.margin - 15, 8);
  }

  private addFooter() {
    this.doc.setFillColor(...this.colors.light);
    this.doc.rect(0, this.pageHeight - 12, this.pageWidth, 12, 'F');
    
    this.doc.setFontSize(8);
    this.doc.setTextColor(...this.colors.secondary);
    this.doc.text(`Page ${this.pageNumber}`, this.pageWidth / 2, this.pageHeight - 6, { align: 'center' });
    this.doc.text(`© 2025 Neskao Trade Desk`, this.margin, this.pageHeight - 6);
    this.doc.text(`v3.1`, this.pageWidth - this.margin - 10, this.pageHeight - 6);
  }

  private checkNewPage(requiredSpace: number = 30) {
    if (this.currentY + requiredSpace > this.pageHeight - 20) {
      this.addFooter();
      this.doc.addPage();
      this.pageNumber++;
      this.addHeader();
      this.currentY = 25;
    }
  }

  private addSectionTitle(title: string, subtitle?: string) {
    this.checkNewPage(25);
    
    this.doc.setFillColor(...this.colors.primary);
    this.doc.rect(this.margin, this.currentY - 2, this.contentWidth, 12, 'F');
    
    this.doc.setFontSize(12);
    this.doc.setTextColor(...this.colors.white);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, this.margin + 3, this.currentY + 5);
    this.currentY += 15;
    
    if (subtitle) {
      this.doc.setFontSize(9);
      this.doc.setTextColor(...this.colors.secondary);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(subtitle, this.margin, this.currentY);
      this.currentY += 8;
    }
  }

  private addRichText(text: string, type: 'normal' | 'highlight' = 'normal') {
    this.checkNewPage(15);
    
    if (type === 'highlight') {
      this.doc.setFillColor(...this.colors.light);
      const textHeight = Math.ceil(text.length / 100) * 5 + 6;
      this.doc.rect(this.margin, this.currentY - 1, this.contentWidth, textHeight, 'F');
      
      this.doc.setDrawColor(...this.colors.primary);
      this.doc.setLineWidth(1.5);
      this.doc.line(this.margin, this.currentY - 1, this.margin, this.currentY - 1 + textHeight);
    }
    
    this.doc.setFontSize(9);
    this.doc.setTextColor(...this.colors.dark);
    this.doc.setFont('helvetica', 'normal');
    
    const lines = this.doc.splitTextToSize(text, this.contentWidth - (type === 'highlight' ? 8 : 3));
    lines.forEach((line: string) => {
      this.checkNewPage(6);
      this.doc.text(line, this.margin + (type === 'highlight' ? 6 : 0), this.currentY);
      this.currentY += 4.5;
    });
    this.currentY += 3;
  }

  private addCompactTable(headers: string[], rows: any[][], options: any = {}) {
    this.checkNewPage(40);
    
    const defaultOptions = {
      theme: 'grid',
      headStyles: {
        fillColor: this.colors.primary,
        textColor: this.colors.white,
        fontSize: 7,
        fontStyle: 'bold',
        halign: 'center',
        cellPadding: 2
      },
      styles: {
        fontSize: 7,
        cellPadding: 2,
        lineColor: [200, 200, 200],
        lineWidth: 0.2
      },
      alternateRowStyles: {
        fillColor: this.colors.light
      },
      columnStyles: options.columnStyles || {},
      margin: { top: this.currentY },
      ...options
    };

    autoTable(this.doc, {
      head: [headers],
      body: rows,
      startY: this.currentY,
      ...defaultOptions
    });
    
    this.currentY = this.doc.lastAutoTable.finalY + 8;
  }

  private addCoverPage(coverImage?: string) {
    try {
      if (coverImage) {
        this.doc.addImage(coverImage, 'PNG', 0, 0, this.pageWidth, this.pageHeight);
        
        this.doc.setFontSize(9);
        this.doc.setTextColor(...this.colors.white);
        this.doc.setFont('helvetica', 'normal');
        const currentDate = new Date().toLocaleDateString('fr-FR', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        
        this.doc.text(currentDate, this.pageWidth / 2, this.pageHeight - 30, { align: 'center' });
        this.doc.setFontSize(8);
        this.doc.text("NESKAO - Version 3.1", 20, this.pageHeight - 20);
        this.doc.text("Confidentiel", this.pageWidth - 20, this.pageHeight - 20, { align: 'right' });
      } else {
        this.addFallbackCoverPage();
      }
    } catch (error) {
      this.addFallbackCoverPage();
    }
    
    this.doc.addPage();
    this.pageNumber++;
  }

  private addFallbackCoverPage() {
    this.doc.setFillColor(...this.colors.primary);
    this.doc.rect(0, 0, this.pageWidth, this.pageHeight, 'F');
    
    this.doc.setFillColor(...this.colors.light);
    this.doc.circle(this.pageWidth * 0.85, this.pageHeight * 0.15, 30, 'F');
    this.doc.circle(this.pageWidth * 0.15, this.pageHeight * 0.85, 20, 'F');
    
    this.doc.setFillColor(...this.colors.white);
    this.doc.rect(this.pageWidth - 40, 15, 30, 15, 'F');
    this.doc.setFontSize(8);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text("MEREYA", this.pageWidth - 25, 24, { align: 'center' });
    
    this.doc.setTextColor(...this.colors.white);
    this.doc.setFontSize(20);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text("Rapport d'etude strategique", 25, 80);
    
    this.doc.setFontSize(11);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text("Elaboration d'une strategie d'implantation d'un bureau", 25, 100);
    this.doc.text("de trading de cacao et ses derives.", 25, 115);
    
    this.doc.setFontSize(9);
    this.doc.text("Auteur : Mereya Advisory", 25, this.pageHeight - 60);
    
    this.doc.setFontSize(9);
    this.doc.text(new Date().toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }), this.pageWidth / 2, this.pageHeight - 30, { align: 'center' });
    
    this.doc.setFontSize(8);
    this.doc.text("NESKAO - Version 3.1", 20, this.pageHeight - 20);
    this.doc.text("Confidentiel", this.pageWidth - 20, this.pageHeight - 20, { align: 'right' });
  }

  private async addTableOfContents(neskaroLogo?: string, mereyaLogo?: string) {
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 30;
    
    this.addSectionTitle('Table des matieres');
    
    const sections = [
      { title: '1. Dashboard - Vue d\'ensemble', page: 3 },
      { title: '2. Contexte de la mission', page: 8 },
      { title: '3. Analyse reglementaire', page: 12 },
      { title: '4. Mix produits et strategie commerciale', page: 20 },
      { title: '5. Structure des couts (SG&A)', page: 28 },
      { title: '6. Analyse de rentabilite', page: 34 },
      { title: '7. Plan de financement', page: 40 },
      { title: '8. Impact social et ESG', page: 46 },
      { title: '9. Analyse decisionnelle', page: 52 },
      { title: '10. Gestion des risques', page: 56 },
      { title: '11. Prochaines etapes', page: 60 },
      { title: '12. Recommandations finales', page: 64 }
    ];
    
    this.doc.setFontSize(9);
    this.doc.setFont('helvetica', 'normal');
    
    sections.forEach(section => {
      this.checkNewPage(8);
      
      this.doc.setTextColor(...this.colors.dark);
      this.doc.text(section.title, this.margin, this.currentY);
      
      this.doc.text(`${section.page}`, this.pageWidth - this.margin - 8, this.currentY, { align: 'right' });
      
      this.doc.setDrawColor(...this.colors.accent);
      this.doc.setLineDashPattern([1, 1], 0);
      const titleWidth = this.doc.getTextWidth(section.title);
      this.doc.line(
        this.margin + titleWidth + 3, 
        this.currentY - 1, 
        this.pageWidth - this.margin - 15, 
        this.currentY - 1
      );
      this.doc.setLineDashPattern([], 0);
      
      this.currentY += 6;
    });
    
    this.addFooter();
    this.doc.addPage();
    this.pageNumber++;
  }

  // Nouvelle méthode pour créer des cadres élégants pour chaque ville
  private addCityCard(city: any, rank: number, x: number, y: number) {
    const cardWidth = 85;
    const cardHeight = 60;
    
    // Cadre principal avec ombre
    this.doc.setFillColor(...this.colors.light); // Couleur de fond légère
    this.doc.rect(x + 1, y + 1, cardWidth, cardHeight, 'F'); // Ombre
    
    this.doc.setFillColor(...this.colors.white);
    this.doc.setDrawColor(...this.colors.accent);
    this.doc.setLineWidth(0.5);
    this.doc.rect(x, y, cardWidth, cardHeight, 'FD');
    
    // Bande de couleur selon le statut
    let statusColor = this.colors.gray;
    if (city.statut === 'RECOMMANDE') statusColor = this.colors.teal;
    else if (city.statut === 'POSSIBLE') statusColor = this.colors.sky;
    
    this.doc.setFillColor(...statusColor);
    this.doc.rect(x, y, cardWidth, 8, 'F');
    
    // Rang dans un cercle
    this.doc.setFillColor(...this.colors.primary);
    this.doc.circle(x + 15, y + 15, 8, 'F');
    this.doc.setTextColor(...this.colors.white);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(12);
    this.doc.text(rank.toString(), x + 15, y + 18, { align: 'center' });
    
    // Nom de la ville
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(14);
    this.doc.text(city.nom, x + 28, y + 18);
    
    // Score global
    this.doc.setTextColor(...this.colors.secondary);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(10);
    this.doc.text('Score Global:', x + 8, y + 30);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(12);
    this.doc.text(city.score.toFixed(2), x + 45, y + 30);
    
    // EBITDA An1
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(10);
    this.doc.text('EBITDA An1:', x + 8, y + 42);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(city.ebitdaAn1 >= 0 ? this.colors.teal[0] : 239, city.ebitdaAn1 >= 0 ? this.colors.teal[1] : 68, city.ebitdaAn1 >= 0 ? this.colors.teal[2] : 68);
    this.doc.text(`${city.ebitdaAn1 >= 0 ? '+' : ''}${city.ebitdaAn1.toFixed(2)}k€`, x + 45, y + 42);
    
    // Equity An1
    this.doc.setTextColor(...this.colors.secondary);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(10);
    this.doc.text('Equity:', x + 8, y + 54);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(`${city.equity.toFixed(2)}M€`, x + 35, y + 54);
  }

  // DASHBOARD COMPLET AVEC TOUTES LES DONNEES - VERSION CADRES ÉLÉGANTS
  private async addExhaustiveDashboard(neskaroLogo?: string, mereyaLogo?: string) {
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 20;
    
    this.addSectionTitle('1. Dashboard - Vue d\'ensemble', 'Analyse comparative des 12 localisations stratégiques');
    
    // Introduction simple
    this.doc.setFontSize(11);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'normal');
    const introText = 'Cette analyse présente l\'évaluation complète de 12 localisations stratégiques pour l\'implantation du bureau de trading Neskao. Chaque localisation est analysée selon 5 critères pondérés et classée par score global avec les métriques financières clés.';
    const lines = this.doc.splitTextToSize(introText, this.contentWidth);
    lines.forEach((line: string) => {
      this.doc.text(line, this.margin, this.currentY);
      this.currentY += 6;
    });
    
    this.currentY += 15;

    // Tableau resume des 12 villes
    const dashboardHeaders = ['Ville', 'Zone', 'Score', 'Statut', 'EBITDA An1', 'Equity', 'ROI 3ans'];
    const dashboardRows = this.dashboardData.villes.map(ville => [
      `${ville.nom} (${ville.pays})`,
      ville.zone,
      ville.score.toFixed(2),
      ville.statut,
      `${ville.ebitdaAn1.toFixed(2)} M€`,
      `${ville.equity.toFixed(2)} M€`,
      ville.nom === 'Paris' ? '171.6%' : 
      ville.nom === 'Geneve' ? '187.5%' : 
      ville.nom === 'Amsterdam' ? '176.8%' : 
      ville.nom === 'Singapour' ? '327.5%' : '140-165%'
    ]);

    this.addCompactTable(dashboardHeaders, dashboardRows, {
      columnStyles: {
        0: { cellWidth: 28 },
        1: { cellWidth: 22, halign: 'center' },
        2: { cellWidth: 18, halign: 'center' },
        3: { cellWidth: 25, halign: 'center' },
        4: { cellWidth: 22, halign: 'right' },
        5: { cellWidth: 18, halign: 'right' },
        6: { cellWidth: 20, halign: 'right' }
      },
      didParseCell: (data: any) => {
        if (data.column.index === 3 && data.section === 'body') {
          const status = data.cell.text[0];
          switch (status) {
            case 'RECOMMANDE':
              data.cell.styles.fillColor = [34, 197, 94, 0.2];
              data.cell.styles.textColor = [21, 128, 61];
              break;
            case 'POSSIBLE':
              data.cell.styles.fillColor = [251, 191, 36, 0.2];
              data.cell.styles.textColor = [180, 83, 9];
              break;
            default:
              data.cell.styles.fillColor = [239, 68, 68, 0.2];
              data.cell.styles.textColor = [185, 28, 28];
              break;
          }
        }
      }
    });

    // Nouvelle page pour details Paris (exemple de selection dynamique)
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 20;
    
    this.addSectionTitle('Dashboard - Selection PARIS', 'Analyse detaillee de la localisation recommandee #1');
    
    const paris = this.dashboardData.villes[0]; // Paris
    
    // P&L Paris
    const plHeaders = ['Indicateur', 'An 1', 'An 2', 'An 3', 'Total 3ans'];
    const plRows = [
      ['Chiffre d\'affaires', `${paris.pl.an1.ca.toFixed(2)} M€`, `${paris.pl.an2.ca.toFixed(2)} M€`, `${paris.pl.an3.ca.toFixed(2)} M€`, `${(paris.pl.an1.ca + paris.pl.an2.ca + paris.pl.an3.ca).toFixed(2)} M€`],
      ['Total Revenus', `${paris.pl.an1.revenus.toFixed(2)} M€`, `${paris.pl.an2.revenus.toFixed(2)} M€`, `${paris.pl.an3.revenus.toFixed(2)} M€`, `${(paris.pl.an1.revenus + paris.pl.an2.revenus + paris.pl.an3.revenus).toFixed(2)} M€`],
      ['Total Charges', `${paris.pl.an1.charges.toFixed(2)} M€`, `${paris.pl.an2.charges.toFixed(2)} M€`, `${paris.pl.an3.charges.toFixed(2)} M€`, `${(paris.pl.an1.charges + paris.pl.an2.charges + paris.pl.an3.charges).toFixed(2)} M€`],
      ['EBITDA', `${paris.pl.an1.ebitda.toFixed(2)} M€`, `${paris.pl.an2.ebitda.toFixed(2)} M€`, `${paris.pl.an3.ebitda.toFixed(2)} M€`, `${(paris.pl.an1.ebitda + paris.pl.an2.ebitda + paris.pl.an3.ebitda).toFixed(2)} M€`],
      ['Resultat Net', `${paris.pl.an1.rn.toFixed(2)} M€`, `${paris.pl.an2.rn.toFixed(2)} M€`, `${paris.pl.an3.rn.toFixed(2)} M€`, `${(paris.pl.an1.rn + paris.pl.an2.rn + paris.pl.an3.rn).toFixed(2)} M€`]
    ];

    this.addCompactTable(plHeaders, plRows, {
      columnStyles: {
        0: { cellWidth: 40, fontStyle: 'bold' },
        1: { cellWidth: 30, halign: 'right' },
        2: { cellWidth: 30, halign: 'right' },
        3: { cellWidth: 30, halign: 'right' },
        4: { cellWidth: 35, halign: 'right', fontStyle: 'bold' }
      }
    });

    // SG&A Paris detaille
    const sgaHeaders = ['Poste SG&A', 'Montant 3ans', '% du total'];
    const sgaTotalParis = paris.sga.total;
    const sgaRows = [
      ['Personnel', `${paris.sga.personnel.toFixed(2)} M€`, `${((paris.sga.personnel/sgaTotalParis)*100).toFixed(1)}%`],
      ['Bureaux', `${paris.sga.bureaux.toFixed(2)} M€`, `${((paris.sga.bureaux/sgaTotalParis)*100).toFixed(1)}%`],
      ['IT & Systemes', `${paris.sga.it.toFixed(2)} M€`, `${((paris.sga.it/sgaTotalParis)*100).toFixed(1)}%`],
      ['Compliance', `${paris.sga.compliance.toFixed(2)} M€`, `${((paris.sga.compliance/sgaTotalParis)*100).toFixed(1)}%`],
      ['Voyages', `${paris.sga.voyage.toFixed(2)} M€`, `${((paris.sga.voyage/sgaTotalParis)*100).toFixed(1)}%`],
      ['Setup', `${paris.sga.setup.toFixed(2)} M€`, `${((paris.sga.setup/sgaTotalParis)*100).toFixed(1)}%`],
      ['TOTAL SG&A', `${paris.sga.total.toFixed(2)} M€`, '100.0%']
    ];

    this.addCompactTable(sgaHeaders, sgaRows, {
      columnStyles: {
        0: { cellWidth: 60, fontStyle: 'bold' },
        1: { cellWidth: 40, halign: 'right' },
        2: { cellWidth: 25, halign: 'center' }
      },
      didParseCell: (data: any) => {
        if (data.row.index === 6 && data.section === 'body') {
          data.cell.styles.fillColor = [71, 85, 105, 0.1];
          data.cell.styles.fontStyle = 'bold';
        }
      }
    });

    // Structure financement Paris
    const financHeaders = ['Element', 'Montant', '% Structure'];
    const financRows = [
      ['Besoins totaux An1', `${paris.financement.besoins.toFixed(2)} M€`, '100.0%'],
      ['Fonds propres', `${paris.financement.equity.toFixed(2)} M€`, `${((paris.financement.equity/paris.financement.besoins)*100).toFixed(1)}%`],
      ['Dette bancaire', `${paris.financement.dette.toFixed(2)} M€`, `${((paris.financement.dette/paris.financement.besoins)*100).toFixed(1)}%`],
      ['Cout financement', `${paris.financement.cout.toFixed(1)}%`, ''],
      ['Ratio D/E', `${paris.financement.ratio.toFixed(2)}x`, '']
    ];

    this.addCompactTable(financHeaders, financRows, {
      columnStyles: {
        0: { cellWidth: 60, fontStyle: 'bold' },
        1: { cellWidth: 40, halign: 'right' },
        2: { cellWidth: 30, halign: 'center' }
      }
    });

    // Impact social Paris
    const impactHeaders = ['Critere Impact', 'Score /10', 'Evaluation'];
    const impactRows = [
      ['Proximite CI', `${paris.impact.proximite}/10`, paris.impact.proximite >= 8 ? 'Excellent' : 'Bon'],
      ['Ecosysteme ESG', `${paris.impact.esg}/10`, paris.impact.esg >= 8 ? 'Excellent' : 'Bon'],
      ['Formation CI', `${paris.impact.formation}/10`, paris.impact.formation >= 8 ? 'Excellent' : 'Bon'],
      ['Transparence', `${paris.impact.transparence}/10`, paris.impact.transparence >= 8 ? 'Excellent' : 'Bon'],
      ['Emplois locaux', `${paris.impact.emplois}/10`, paris.impact.emplois >= 8 ? 'Excellent' : 'Bon'],
      ['Influence politique', `${paris.impact.influence}/10`, paris.impact.influence >= 8 ? 'Excellent' : 'Bon'],
      ['Partenariats', `${paris.impact.partenariats}/10`, paris.impact.partenariats >= 8 ? 'Excellent' : 'Bon']
    ];

    this.addCompactTable(impactHeaders, impactRows, {
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 30, halign: 'center', fontStyle: 'bold' },
        2: { cellWidth: 35, halign: 'center' }
      },
      didParseCell: (data: any) => {
        if (data.column.index === 2 && data.section === 'body') {
          const evaluation = data.cell.text[0];
          if (evaluation === 'Excellent') {
            data.cell.styles.fillColor = [34, 197, 94, 0.2];
            data.cell.styles.textColor = [21, 128, 61];
          }
        }
      }
    });

    this.addFooter();
  }

  // Continuera avec les autres sections...
  // [Le reste du code continuerait avec les autres méthodes pour chaque section]

  // CONTEXTE COMPLET
  private async addContexteSection(neskaroLogo?: string, mereyaLogo?: string) {
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 20;
    
    this.addSectionTitle('2. Contexte de la mission', 'Objectifs strategiques et environnement concurrentiel');
    
    // 1. Neskao - Pionnier Africain
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('2.1 Neskao - Pionnier Africain du Cacao', this.margin, this.currentY);
    this.currentY += 10;
    
    this.addRichText(
      'Creee en 2013, Neskao s\'est positionnee comme la premiere entreprise africaine de transformation de cacao, ' +
      'avec une specialisation unique dans le traitement des feves hors normes et dechets de cacao. Cette position ' +
      'de pionnier lui confere un avantage concurrentiel majeur dans un marche en pleine consolidation.',
      'highlight'
    );

    // Donnees cles Neskao
    const neskaroHeaders = ['Indicateur', 'Valeur', 'Position Marche'];
    const neskaroRows = [
      ['Annee creation', '2013', '1ere entreprise africaine'],
      ['Emplois directs', '150+', 'Leader regional Cote d\'Ivoire'],
      ['Emplois indirects', '8,000+', 'Impact socio-economique majeur'],
      ['Capacite production', '32K tonnes/an', 'Top 3 transformateurs CI'],
      ['Certification', 'FSSC 22000 V.5 (2021)', 'Standards internationaux'],
      ['Specialisation', 'Feves hors normes', 'Niche unique mondiale']
    ];

    this.addCompactTable(neskaroHeaders, neskaroRows, {
      columnStyles: {
        0: { cellWidth: 50, fontStyle: 'bold' },
        1: { cellWidth: 40, halign: 'center' },
        2: { cellWidth: 65 }
      }
    });

    // 2. Environnement International
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('2.2 Environnement International du Cacao', this.margin, this.currentY);
    this.currentY += 10;

    this.addRichText(
      'Le marche mondial du cacao traverse une periode de transformation structurelle avec l\'emergence de nouvelles ' +
      'reglementations (EUDR), la financiarisation croissante des matieres premieres et la consolidation des acteurs. ' +
      'La Cote d\'Ivoire, premier producteur mondial avec 2.0M tonnes/an, developpe rapidement ses capacites de ' +
      'transformation locale pour capturer plus de valeur ajoutee.'
    );

    const marcheHeaders = ['Dimension', 'Situation Actuelle', 'Horizon 2029', 'Impact Neskao'];
    const marcheRows = [
      ['Production mondiale', '4.5M tonnes/an', '5.2M tonnes/an', 'Demande soutenue'],
      ['Production CI', '2.0M tonnes/an', '2.3M tonnes/an', 'Base approvisionnement'],
      ['Capacite transformation CI', '980K tonnes', '1.9M tonnes', 'Concurrence accrue'],
      ['Prix volatilite', 'Moyenne 15-20%', 'Hausse prevue 25%', 'Besoin hedging'],
      ['Reglementation EUDR', 'Phase pilote', 'Obligation totale', 'Opportunite premiums'],
      ['Financiarisation', 'ETF +40% 2023', 'Acceleration', 'Trading necessaire']
    ];

    this.addCompactTable(marcheHeaders, marcheRows, {
      columnStyles: {
        0: { cellWidth: 40, fontStyle: 'bold' },
        1: { cellWidth: 35 },
        2: { cellWidth: 35 },
        3: { cellWidth: 40 }
      }
    });

    // Nouvelle page pour la suite
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 20;

    // 3. Convergence Strategique
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('2.3 Convergence Strategique - Forces et Opportunites', this.margin, this.currentY);
    this.currentY += 15;

    // Forces Neskao
    this.doc.setFontSize(9);
    this.doc.setTextColor(...this.colors.secondary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('FORCES NESKAO:', this.margin, this.currentY);
    this.currentY += 8;

    const forces = [
      'Leader mondial transformation feves hors normes (positionnement unique)',
      'Certification FSSC 22000 reconnue internationalement',
      'Implantation strategique Cote d\'Ivoire (acces direct producteurs)',
      'Maitrise complete chaine transformation (masse, beurre, poudres)',
      'Relations privilegiees CCC/UEMOA (facilitation export)',
      'Expertise technique 10+ ans (savoir-faire eprouve)'
    ];

    forces.forEach(force => {
      this.doc.setFontSize(8);
      this.doc.setTextColor(...this.colors.dark);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(`• ${force}`, this.margin + 3, this.currentY);
      this.currentY += 5;
    });
    this.currentY += 5;

    // Opportunites marche
    this.doc.setFontSize(9);
    this.doc.setTextColor(...this.colors.secondary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('OPPORTUNITES MARCHE:', this.margin, this.currentY);
    this.currentY += 8;

    const opportunites = [
      'ICE Futures acces direct (elimination intermediaires)',
      'Diversification revenus (trading + transformation)',
      'Hedging risque prix (protection marges)',
      'EUDR premiums produits traces (avantage concurrentiel)',
      'Vente directe B2B internationale (marges ameliorees)',
      'Financement DFI disponible (impact social)'
    ];

    opportunites.forEach(opp => {
      this.doc.setFontSize(8);
      this.doc.setTextColor(...this.colors.dark);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(`• ${opp}`, this.margin + 3, this.currentY);
      this.currentY += 5;
    });
    this.currentY += 5;

    // 4. Methodologie etude
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('2.4 Plan d\'Etude et Methodologie', this.margin, this.currentY);
    this.currentY += 15;

    this.addRichText(
      'L\'analyse suit une approche multi-criteres rigoureuse evaluant 12 localisations selon 5 dimensions cles. ' +
      'La ponderation reflete les priorites strategiques de Neskao: maximiser l\'impact social (30%) et optimiser ' +
      'la gestion de tresorerie (30%) tout en assurant la conformite reglementaire (15%) et la rentabilite (15%). ' +
      'L\'acces aux financements DFI complete l\'evaluation (10%).',
      'highlight'
    );

    const methodoHeaders = ['Critere', 'Ponderation', 'Description', 'Indicateurs Cles'];
    const methodoRows = [
      ['Reglementaire', '15%', 'Conformite legale et fiscale', 'Licences, capital min, conventions'],
      ['Impact Social', '30%', 'Contribution developpement CI', 'Proximite, ESG, formation, transparence'],
      ['ROI Financier', '15%', 'Rentabilite operations', 'ROI 3ans, IRR, payback'],
      ['Financement DFI', '10%', 'Acces financements impact', 'Ratings DFI, facilites disponibles'],
      ['Cash Management', '30%', 'Optimisation tresorerie', 'Couts financement, outils bancaires']
    ];

    this.addCompactTable(methodoHeaders, methodoRows, {
      columnStyles: {
        0: { cellWidth: 35, fontStyle: 'bold' },
        1: { cellWidth: 20, halign: 'center', fontStyle: 'bold' },
        2: { cellWidth: 50 },
        3: { cellWidth: 50 }
      }
    });

    // Recommandation preliminaire
    this.addRichText(
      'RECOMMANDATION PRELIMINAIRE: Paris emerge comme choix optimal avec un score de 78/100, combinant ' +
      'un ROI exceptionnel de 187%, un impact social de 8.5/10 et une conformite reglementaire exemplaire. ' +
      'Cette analyse detaillee confirme la pertinence strategique de cette implantation.',
      'highlight'
    );

    this.addFooter();
  }

  // REGLEMENTATION COMPLETE (4 onglets)
  private async addReglementationComplete(neskaroLogo?: string, mereyaLogo?: string) {
    // Onglet 1 - Vue Generale
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 20;
    
    this.addSectionTitle('3. Analyse Reglementaire', 'Vue generale - Conformite legale et optimisation fiscale');
    
    this.addRichText(
      'L\'analyse reglementaire constitue le socle de la decision d\'implantation. Elle evalue 12 localisations ' +
      'reparties sur 4 zones geographiques selon leur capacite a faciliter les operations de trading international ' +
      'tout en optimisant la charge fiscale et administrative. Cette analyse identifie 2 destinations recommandees, ' +
      '5 destinations possibles et 3 destinations non recommandees.',
      'highlight'
    );

    // Tableau comparatif reglementaire complet
    const reglHeaders = ['Ville', 'Score /10', 'Trading Autorise', 'Convention CI', 'Prix Transfert', 'Restrictions', 'Statut'];
    const reglRows = [
      ['Paris (FR)', '8.5', 'Oui - ACPR', 'Excellence', 'OCDE Standard', 'Minimales', 'RECOMMANDE'],
      ['Geneve (CH)', '9.0', 'Oui - FINMA', 'Excellence', 'Favorable', 'Minimales', 'RECOMMANDE'],
      ['Amsterdam (NL)', '8.2', 'Oui - AFM', 'Tres bon', 'OCDE Standard', 'Limitees', 'RECOMMANDE'],
      ['Singapour (SG)', '8.8', 'Oui - MAS', 'Bon', 'Favorable', 'Sectorielles', 'POSSIBLE'],
      ['Hambourg (DE)', '7.2', 'Oui - BaFin', 'Tres bon', 'OCDE Standard', 'Limitees', 'POSSIBLE'],
      ['Londres (GB)', '6.8', 'Oui - FCA', 'Incertain', 'Post-Brexit', 'Post-Brexit', 'POSSIBLE'],
      ['Chypre (CY)', '7.5', 'Oui - CySEC', 'Bon', 'UE Standard', 'Moderees', 'POSSIBLE'],
      ['Maurice (MU)', '6.2', 'Limite - FSC', 'Limite', 'Blacklist UE', 'Importantes', 'DECONSEILLE'],
      ['Andorre (AD)', '4.8', 'Limite - AFA', 'Limite', 'Progres recents', 'Importantes', 'DECONSEILLE'],
      ['Dubai (AE)', '5.2', 'Oui - DFSA', 'Tres limite', 'Pas de convention', 'Tres importantes', 'DECONSEILLE'],
      ['Maroc CFC (MA)', '3.2', 'CFC uniquement', 'Basique', 'Surveillance', 'Critiques', 'NON RECOMMANDE'],
      ['Tel Aviv (IL)', '2.8', 'Oui - ISA', 'Problematique', 'Complexe', 'Critiques', 'NON RECOMMANDE']
    ];

    this.addCompactTable(reglHeaders, reglRows, {
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 15, halign: 'center' },
        2: { cellWidth: 22 },
        3: { cellWidth: 20, halign: 'center' },
        4: { cellWidth: 22, halign: 'center' },
        5: { cellWidth: 20, halign: 'center' },
        6: { cellWidth: 25, halign: 'center' }
      },
      didParseCell: (data: any) => {
        if (data.column.index === 6 && data.section === 'body') {
          const status = data.cell.text[0];
          switch (status) {
            case 'RECOMMANDE':
              data.cell.styles.fillColor = [34, 197, 94, 0.2];
              data.cell.styles.textColor = [21, 128, 61];
              break;
            case 'POSSIBLE':
              data.cell.styles.fillColor = [251, 191, 36, 0.2];
              data.cell.styles.textColor = [180, 83, 9];
              break;
            default:
              data.cell.styles.fillColor = [239, 68, 68, 0.2];
              data.cell.styles.textColor = [185, 28, 28];
              break;
          }
        }
      }
    });

    // Nouvelle page - Onglet 2 Forward
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 20;
    
    this.addSectionTitle('3.2 Reglementation Forward', 'Contrats CCC - Exigences et processus');

    this.addRichText(
      'Le trading forward via les contrats CCC necessite un agrement specifique et le respect d\'exigences strictes. ' +
      'Neskao beneficie deja de certains acquis (presence locale CI, track record) mais doit completer le dispositif ' +
      'reglementaire pour le bureau international.',
      'highlight'
    );

    const forwardHeaders = ['Exigence CCC', 'Standard Requis', 'Recommandation', 'Statut Neskao'];
    const forwardRows = [
      ['Capital reglementaire', '5M USD minimum', '10M USD recommande', 'A completer'],
      ['Garantie bancaire', 'Ligne confirmee', 'Multi-banques', 'A negocier'],
      ['Presence locale CI', 'Bureau ou filiale', 'Filiale preferee', 'ACQUIS'],
      ['Track record', '3 ans minimum', '5 ans optimal', 'ACQUIS (10 ans)'],
      ['Compliance EUDR', 'Tracabilite GPS', 'Due diligence', 'EN COURS'],
      ['Reporting CCC', 'Mensuel detaille', 'Automatise', 'A mettre en place']
    ];

    this.addCompactTable(forwardHeaders, forwardRows, {
      columnStyles: {
        0: { cellWidth: 40, fontStyle: 'bold' },
        1: { cellWidth: 35 },
        2: { cellWidth: 35 },
        3: { cellWidth: 35, halign: 'center' }
      },
      didParseCell: (data: any) => {
        if (data.column.index === 3 && data.section === 'body') {
          const status = data.cell.text[0];
          if (status === 'ACQUIS') {
            data.cell.styles.fillColor = [34, 197, 94, 0.2];
            data.cell.styles.textColor = [21, 128, 61];
          } else if (status === 'EN COURS') {
            data.cell.styles.fillColor = [251, 191, 36, 0.2];
            data.cell.styles.textColor = [180, 83, 9];
          }
        }
      }
    });

    // Processus agrement
    this.doc.setFontSize(9);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('PROCESSUS AGREMENT CCC (4 etapes):', this.margin, this.currentY);
    this.currentY += 10;

    const processus = [
      'ETAPE 1 - AGREMENT (2-3 mois): Dossier complet, due diligence CCC, validation capacites',
      'ETAPE 2 - CONTRATS FORWARD: Signature accords-cadres, parametrage systemes, formation equipes',
      'ETAPE 3 - PREFINANCEMENT (T-60j): Ligne de credit confirme, garanties bancaires, cash management',
      'ETAPE 4 - LIVRAISON: Execution physique, controle qualite, transfert propriete, reglement'
    ];

    processus.forEach(etape => {
      this.doc.setFontSize(8);
      this.doc.setTextColor(...this.colors.dark);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(`• ${etape}`, this.margin + 3, this.currentY);
      this.currentY += 6;
    });

    // Nouvelle page - Onglet 3 Futures
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 20;
    
    this.addSectionTitle('3.3 Reglementation Futures', 'ICE Europe - Options et exigences');

    this.addRichText(
      'L\'acces aux marches futures ICE offre deux options: membre direct (investissement lourd) ou via broker ' +
      '(solution recommandee). Les marges ICE sont substancielles et necessitent une gestion rigoureuse du risque.',
      'highlight'
    );

    const futuresHeaders = ['Option', 'Capital Requis', 'Couts Annuels', 'Avantages', 'Inconvenients'];
    const futuresRows = [
      ['Membre ICE', '730K EUR', '50K USD/an', 'Acces direct, prix optimaux', 'Investissement lourd, complexite'],
      ['Via Broker', '250-500K USD', '5-15 USD/contrat', 'Flexibilite, simplicite', 'Commission, dependance']
    ];

    this.addCompactTable(futuresHeaders, futuresRows, {
      columnStyles: {
        0: { cellWidth: 30, fontStyle: 'bold' },
        1: { cellWidth: 30, halign: 'right' },
        2: { cellWidth: 30, halign: 'right' },
        3: { cellWidth: 45 },
        4: { cellWidth: 40 }
      }
    });

    // Calcul marges ICE
    this.doc.setFontSize(9);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('CALCUL MARGES ICE COCOA (exemple 1,500T):', this.margin, this.currentY);
    this.currentY += 10;

    const margesHeaders = ['Type Marge', 'EUR/Contrat', 'EUR/Tonne', 'Total 1,500T', 'Avec Buffer 25%'];
    const margesRows = [
      ['Initial Margin', '7,318', '731.79', '1.1M EUR', '1.4M EUR'],
      ['Maintenance', '3,500', '350.00', '525K EUR', '656K EUR'],
      ['TOTAL REQUIS', '-', '-', '1.8M EUR', '2.3M EUR']
    ];

    this.addCompactTable(margesHeaders, margesRows, {
      columnStyles: {
        0: { cellWidth: 35, fontStyle: 'bold' },
        1: { cellWidth: 25, halign: 'right' },
        2: { cellWidth: 25, halign: 'right' },
        3: { cellWidth: 25, halign: 'right' },
        4: { cellWidth: 30, halign: 'right', fontStyle: 'bold' }
      },
      didParseCell: (data: any) => {
        if (data.row.index === 2 && data.section === 'body') {
          data.cell.styles.fillColor = [71, 85, 105, 0.1];
          data.cell.styles.fontStyle = 'bold';
        }
      }
    });

    // Nouvelle page - Onglet 4 Compliance
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 20;
    
    this.addSectionTitle('3.4 Compliance et Certifications', 'Exigences reglementaires transversales');

    this.addRichText(
      'La conformite reglementaire couvre plusieurs dimensions: EUDR (tracabilite), MiFID II (trading), ' +
      'LCB-FT (anti-blanchiment) et certifications qualite. Chaque aspect necessite des procedures specifiques ' +
      'et des investissements dedies.',
      'highlight'
    );

    const complianceHeaders = ['Reglementation', 'Deadline', 'Exigences Principales', 'Impact Neskao', 'Cout Annuel'];
    const complianceRows = [
      ['EUDR', '2025->2026', 'Tracabilite GPS, due diligence', 'Avantage concurrentiel', '15-25K EUR'],
      ['MiFID II', 'Immediat', 'Reporting, best execution', 'Obligation trading UE', '10-20K EUR'],
      ['LCB-FT', 'Permanent', 'KYC/AML, monitoring', 'Risque reputationnel', '5-15K EUR'],
      ['Certifications', 'Renouvellement', 'Rainforest, Fairtrade, UTZ', 'Premiums clients', '8-12K EUR']
    ];

    this.addCompactTable(complianceHeaders, complianceRows, {
      columnStyles: {
        0: { cellWidth: 25, fontStyle: 'bold' },
        1: { cellWidth: 20, halign: 'center' },
        2: { cellWidth: 50 },
        3: { cellWidth: 35 },
        4: { cellWidth: 25, halign: 'right' }
      }
    });

    this.addRichText(
      'RECOMMANDATION COMPLIANCE: Privilegier les juridictions avec frameworks etablis (Paris, Geneve) ' +
      'pour minimiser les risques reglementaires et beneficier d\'une supervision claire et predictible.',
      'highlight'
    );

    this.addFooter();
  }

  // MIX PRODUITS COMPLET (4 onglets)
  private async addMixProduitsComplet(neskaroLogo?: string, mereyaLogo?: string) {
    // Onglet 1 - Prix du Cacao
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 20;
    
    this.addSectionTitle('4. Mix Produits et Strategie', 'Prix du cacao - Analyse de marche et volatilite');
    
    this.addRichText(
      'L\'analyse des prix constitue le fondement de la strategie trading. La campagne 2025-2026 presente ' +
      'des fondamentaux robustes avec une production CI estimee a 1.9M tonnes repartie entre campagne ' +
      'principale (Oct-Dec: 900K T) et intermediaire (Jan-Mar: 600K T, Avr-Sep: 400K T).',
      'highlight'
    );

    // Production et prix
    const prixHeaders = ['Composante', 'Volume/Prix', 'Periode', 'Impact Trading'];
    const prixRows = [
      ['Campagne principale', '900K tonnes', 'Oct-Dec 2025', 'Pic activite forward'],
      ['Campagne intermediaire 1', '600K tonnes', 'Jan-Mar 2026', 'Opportunites arbitrage'],
      ['Campagne intermediaire 2', '400K tonnes', 'Avr-Sep 2026', 'Gestion stocks'],
      ['CAZ25 (Dec 2025)', '6,200 GBP/T', 'Echeance proche', 'Hedging prioritaire'],
      ['CAH26 (Mar 2026)', '5,800 GBP/T', 'Contango 400pts', 'Arbitrage temporel'],
      ['FOREX EUR/GBP', '1.15461', 'Volatilite 8-12%', 'Risque change'],
      ['LID (Living Income)', '400 USD/T', 'Obligatoire 2024', 'Cout supplementaire']
    ];

    this.addCompactTable(prixHeaders, prixRows, {
      columnStyles: {
        0: { cellWidth: 45, fontStyle: 'bold' },
        1: { cellWidth: 30, halign: 'center' },
        2: { cellWidth: 35, halign: 'center' },
        3: { cellWidth: 40 }
      }
    });

    // Prix rendus usine
    this.doc.setFontSize(9);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('PRIX RENDUS USINE NESKAO:', this.margin, this.currentY);
    this.currentY += 10;

    const prixUsineHeaders = ['Composante Prix', 'Sans LID', 'Avec LID', 'Marge Bord Champs'];
    const prixUsineRows = [
      ['CAF moyen EUR/T', '6,974 EUR', '7,318 EUR', 'Base calcul'],
      ['Prix Bord Champs', '2,880 CFA/kg', '4,391 EUR/T', '40% reduction'],
      ['Marge brute theorique', '2,583 EUR/T', '2,927 EUR/T', '37-40%'],
      ['Frais logistique/transfo', '800-1,000 EUR/T', '800-1,000 EUR/T', 'Couts fixes'],
      ['Marge nette disponible', '1,583-1,783 EUR/T', '1,927-2,127 EUR/T', 'Potentiel trading']
    ];

    this.addCompactTable(prixUsineHeaders, prixUsineRows, {
      columnStyles: {
        0: { cellWidth: 45, fontStyle: 'bold' },
        1: { cellWidth: 30, halign: 'right' },
        2: { cellWidth: 30, halign: 'right' },
        3: { cellWidth: 40, halign: 'center' }
      }
    });

    // Nouvelle page - Onglet 2 Mix Produits
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 20;
    
    this.addSectionTitle('4.2 Mix Produits et Rendements', 'Optimisation portfolio et rendements transformation');

    this.addRichText(
      'La strategie mix s\'articule autour de la transformation selective: 25% masse directe (marge faible, ' +
      'volume eleve) et 75% transformation complete (marges elevees). La repartition 50/50 entre export ' +
      'trading et ventes locales CI optimise les revenus et diversifie les risques.',
      'highlight'
    );

    // Rendements transformation
    const rendementHeaders = ['Etape Transformation', 'Rendement %', 'Input Tonnes', 'Output Tonnes', 'Pertes %'];
    const rendementRows = [
      ['Feves -> Masse de cacao', '81%', '1,000', '810', '19%'],
      ['Masse -> Beurre de cacao', '51%', '810', '413', '4%'],
      ['Masse -> Poudre de cacao', '47%', '810', '381', '4%'],
      ['Total transformation', '98%', '1,000', '794+16', '2%'],
      ['Pertes process global', '2%', '1,000', '16', '2%']
    ];

    this.addCompactTable(rendementHeaders, rendementRows, {
      columnStyles: {
        0: { cellWidth: 45, fontStyle: 'bold' },
        1: { cellWidth: 25, halign: 'center' },
        2: { cellWidth: 25, halign: 'right' },
        3: { cellWidth: 25, halign: 'right' },
        4: { cellWidth: 25, halign: 'center' }
      }
    });

    // Volumes par produit 3 ans
    const volumesHeaders = ['Produit', 'An 1', 'An 2', 'An 3', 'Total 3ans', 'Mix %'];
    const volumesRows = [
      ['Masse de cacao', '0', '0', '0', '0', '0%'],
      ['Beurre standard', '2,324', '6,042', '10,457', '18,823', '30.8%'],
      ['Poudre standard', '707', '1,837', '3,180', '5,724', '9.4%'],
      ['Poudre alcalinisee', '2,870', '5,739', '8,609', '17,218', '28.2%'],
      ['TOTAL FORWARD', '5,900', '13,618', '22,245', '41,763', '68.4%'],
      ['FUTURES (equivalent)', '3,540', '8,171', '13,347', '25,058', '41.0%']
    ];

    this.addCompactTable(volumesHeaders, volumesRows, {
      columnStyles: {
        0: { cellWidth: 35, fontStyle: 'bold' },
        1: { cellWidth: 20, halign: 'right' },
        2: { cellWidth: 20, halign: 'right' },
        3: { cellWidth: 20, halign: 'right' },
        4: { cellWidth: 25, halign: 'right' },
        5: { cellWidth: 20, halign: 'center' }
      }
    });

    // Nouvelle page - Onglet 3 Pricing & Marges
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 20;
    
    this.addSectionTitle('4.3 Pricing et Marges', 'Methodologie hybride et optimisation revenus');

    this.addRichText(
      'La methodologie pricing combine approches Cost Plus (70%) et Market (30%) pour masse et beurre, ' +
      '100% Market pour poudres. Cette hybridation assure une competitivite prix tout en preservant les marges.',
      'highlight'
    );

    // Prix finaux NESKAO
    const pricingHeaders = ['Produit NESKAO', 'Prix EUR/T', 'Methodologie', 'Benchmark Marche', 'Marge Trading'];
    const pricingRows = [
      ['Masse de cacao', '9,029', '70% Cost + 30% Market', '8,800-9,200', '181 EUR/T (2.0%)'],
      ['Beurre standard', '15,916', '70% Cost + 30% Market', '15,500-16,200', '318 EUR/T (2.0%)'],
      ['Beurre desodorise', '16,420', '70% Cost + 30% Market', '16,000-16,800', '328 EUR/T (2.0%)'],
      ['Poudre standard', '9,650', '100% Market', '9,400-9,900', '193 EUR/T (2.0%)'],
      ['Poudre alcalinisee', '10,327', '100% Market', '10,100-10,600', '206 EUR/T (2.0%)']
    ];

    this.addCompactTable(pricingHeaders, pricingRows, {
      columnStyles: {
        0: { cellWidth: 35, fontStyle: 'bold' },
        1: { cellWidth: 25, halign: 'right' },
        2: { cellWidth: 35, halign: 'center' },
        3: { cellWidth: 35, halign: 'center' },
        4: { cellWidth: 35, halign: 'right' }
      }
    });

    // Marges futures
    this.doc.setFontSize(9);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('MARGES FUTURES TRADING:', this.margin, this.currentY);
    this.currentY += 10;

    const futuresMargesHeaders = ['Type Trading', 'Marge EUR/T', 'Risque', 'Volume Cible An3', 'Revenus An3'];
    const futuresMargesRows = [
      ['Hedging (protection)', '50', 'Tres faible', '22,245 T', '1.11 M EUR'],
      ['Speculation (profit)', '700', 'Eleve', '8,609 T', '6.03 M EUR'],
      ['TOTAL FUTURES', '-', '-', '30,854 T', '7.14 M EUR']
    ];

    this.addCompactTable(futuresMargesHeaders, futuresMargesRows, {
      columnStyles: {
        0: { cellWidth: 40, fontStyle: 'bold' },
        1: { cellWidth: 25, halign: 'right' },
        2: { cellWidth: 25, halign: 'center' },
        3: { cellWidth: 25, halign: 'right' },
        4: { cellWidth: 30, halign: 'right' }
      }
    });

    // Nouvelle page - Onglet 4 Recapitulatif
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 20;
    
    this.addSectionTitle('4.4 Recapitulatif Performance', 'Synthese revenus et evolution 3 ans');

    this.addRichText(
      'La performance 3 ans montre une montee en puissance remarquable: CA passe de 54.2M EUR (An1) a 227.6M EUR (An3), ' +
      'avec une marge totale evoluant de 3.28% a 5.07%. La repartition finale privilegie les futures (54% des revenus) ' +
      'confirmant l\'interet de la diversification trading.',
      'highlight'
    );

    // Performance 3 ans
    const perfHeaders = ['Indicateur', 'An 1', 'An 2', 'An 3', 'Total 3ans', 'Evolution'];
    const perfRows = [
      ['CA Total (M EUR)', '54.16', '132.57', '227.58', '414.31', '+320%'],
      ['Marge Forward (M EUR)', '1.07', '2.62', '4.41', '8.10', '+312%'],
      ['Marge Futures (M EUR)', '0.71', '1.63', '7.14', '9.48', '+906%'],
      ['Marge Totale (M EUR)', '1.78', '4.25', '11.55', '17.58', '+549%'],
      ['Marge % CA', '3.28%', '3.21%', '5.07%', '4.24%', '+55%'],
      ['Volume equiv tonnes', '9,440', '21,789', '35,592', '66,821', '+277%']
    ];

    this.addCompactTable(perfHeaders, perfRows, {
      columnStyles: {
        0: { cellWidth: 40, fontStyle: 'bold' },
        1: { cellWidth: 25, halign: 'right' },
        2: { cellWidth: 25, halign: 'right' },
        3: { cellWidth: 25, halign: 'right' },
        4: { cellWidth: 25, halign: 'right' },
        5: { cellWidth: 25, halign: 'right', fontStyle: 'bold' }
      }
    });

    // Repartition finale
    this.doc.setFontSize(9);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('REPARTITION REVENUS 3 ANS:', this.margin, this.currentY);
    this.currentY += 10;

    const repartitionHeaders = ['Source Revenus', 'Montant 3ans', '% Total', 'Caracteristiques'];
    const repartitionRows = [
      ['Forward Trading', '8.10 M EUR', '46%', 'Revenus recurrents, risque limite'],
      ['Futures Trading', '9.48 M EUR', '54%', 'Revenus variables, potentiel eleve'],
      ['TOTAL', '17.58 M EUR', '100%', 'Diversification optimale']
    ];

    this.addCompactTable(repartitionHeaders, repartitionRows, {
      columnStyles: {
        0: { cellWidth: 40, fontStyle: 'bold' },
        1: { cellWidth: 30, halign: 'right' },
        2: { cellWidth: 20, halign: 'center' },
        3: { cellWidth: 55 }
      }
    });

    this.addRichText(
      'CONCLUSION MIX PRODUITS: La strategie diversifiee Forward/Futures offre un equilibre optimal entre ' +
      'securite (forward) et potentiel (futures), avec une montee en puissance progressive reduisant les risques ' +
      'de demarrage.',
      'highlight'
    );

    this.addFooter();
  }

  // 5. SG&A COMPLETE - 4 onglets
  private async addSGAComplete(neskaroLogo?: string, mereyaLogo?: string) {
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 20;
    
    this.addSectionTitle('5. Charges SG&A - Structure des Couts', 'Analyse detaillee des charges generales et administratives');
    
    // Introduction SG&A
    this.addRichText(
      'L\'analyse SG&A examine les charges de structure necessaires au fonctionnement du bureau de trading. ' +
      'Ces couts, exprimés en euros par tonne traitee, constituent un facteur critique de competitivite. ' +
      'L\'objectif est d\'atteindre une structure efficace permettant de maintenir des couts SG&A inferieurs ' +
      'a 70EUR/tonne des l\'An 3, tout en assurant la conformite reglementaire et operationnelle.',
      'normal'
    );

    // 5.1 Vue d'ensemble SG&A
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('5.1 Vue d\'ensemble - Comparaison des structures SG&A', this.margin, this.currentY);
    this.currentY += 8;

    // Tableau comparatif SG&A toutes villes - DONNEES REELLES DE LA WEBAPP
    const sgaHeaders = ['Rang', 'Localisation', 'An 1 (k EUR)', 'An 2 (k EUR)', 'An 3 (k EUR)', 'Total 3ans (k EUR)', 'Score'];
    const sgaAllRows = [
      ['1', 'Maroc CFC', '688', '717', '971', '2,376', 'A'],
      ['2', 'Maurice', '795', '821', '1,086', '2,702', 'A'],
      ['3', 'Andorre', '874', '858', '1,142', '2,874', 'A'],
      ['4', 'Paris', '1,290', '1,218', '1,478', '3,987', 'B'],
      ['5', 'Hambourg', '1,296', '1,253', '1,638', '4,186', 'B'],
      ['6', 'Chypre', '1,384', '1,330', '1,678', '4,392', 'B'],
      ['7', 'Amsterdam', '1,338', '1,318', '1,697', '4,354', 'B'],
      ['8', 'Dubai', '1,408', '1,331', '1,713', '4,452', 'C'],
      ['9', 'Tel Aviv', '1,451', '1,382', '1,817', '4,651', 'C'],
      ['10', 'Geneve', '1,693', '1,567', '2,003', '5,263', 'C'],
      ['11', 'Singapour', '1,754', '1,676', '2,143', '5,573', 'C'],
      ['12', 'Londres', '1,860', '1,736', '2,217', '5,814', 'C']
    ];

    this.addCompactTable(sgaHeaders, sgaAllRows, {
      columnStyles: {
        0: { cellWidth: 15, halign: 'center', fontStyle: 'bold' },
        1: { cellWidth: 30, fontStyle: 'bold' },
        2: { cellWidth: 20, halign: 'right' },
        3: { cellWidth: 20, halign: 'right' },
        4: { cellWidth: 20, halign: 'right' },
        5: { cellWidth: 25, halign: 'right', fontStyle: 'bold' },
        6: { cellWidth: 15, halign: 'center' }
      },
      didParseCell: (data: any) => {
        if (data.row.index === 3 && data.section === 'body') { // Paris = rang 4
          data.cell.styles.fillColor = [20, 184, 166, 0.2]; // teal
        }
        if (data.column.index === 6 && data.section === 'body') {
          const score = data.cell.text[0];
          if (score === 'A') {
            data.cell.styles.fillColor = [20, 184, 166, 0.2];
            data.cell.styles.textColor = [6, 95, 70];
          } else if (score === 'B') {
            data.cell.styles.fillColor = [14, 165, 233, 0.2];
            data.cell.styles.textColor = [7, 89, 133];
          } else if (score === 'C') {
            data.cell.styles.fillColor = [107, 114, 128, 0.2];
            data.cell.styles.textColor = [55, 65, 81];
          }
        }
      }
    });

    // 5.2 Structure équipe Paris détaillée
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('5.2 Structure Equipe Paris - Evolution 3 ans', this.margin, this.currentY);
    this.currentY += 8;

    // DONNEES REELLES DE LA WEBAPP - Structure équipe Paris
    const equipeHeaders = ['Poste', 'An 1', 'An 2', 'An 3', 'Salaire (k EUR)', 'Description'];
    const equipeRows = [
      ['Directeur General', '1', '1', '1', '280', 'Direction strategique, trading senior et relations cles'],
      ['Responsable Trading', '1', '1', '1', '150', 'Hedging sur ICE Futures et support commercial equipes'],
      ['Trader Junior', '0', '0.5', '1', '150', 'Support trading et developpement nouveaux marches'],
      ['Risk/Compliance', '1', '1', '1', '120', 'Gestion risques (50%) et comptabilite/finance (50%)'],
      ['Assistant Admin', '1', '1', '1', '80', 'Administration, back office et support general'],
      ['Stagiaire', '0', '0', '0.5', '60', 'Support risk management et formation'],
      ['TOTAL FTE', '4', '4.5', '5.5', '', 'Montee en charge progressive']
    ];

    this.addCompactTable(equipeHeaders, equipeRows, {
      columnStyles: {
        0: { cellWidth: 35, fontStyle: 'bold' },
        1: { cellWidth: 15, halign: 'center' },
        2: { cellWidth: 15, halign: 'center' },
        3: { cellWidth: 15, halign: 'center' },
        4: { cellWidth: 20, halign: 'right' },
        5: { cellWidth: 50 }
      },
      didParseCell: (data: any) => {
        if (data.row.index === 6 && data.section === 'body') {
          data.cell.styles.fillColor = [14, 165, 233, 0.1];
          data.cell.styles.fontStyle = 'bold';
        }
      }
    });

    // 5.3 Bureaux et infrastructure
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('5.3 Bureaux et Infrastructure - Specifications Paris', this.margin, this.currentY);
    this.currentY += 8;

    // DONNEES REELLES DE LA WEBAPP - Bureaux par ville
    const bureauxHeaders = ['Ville', 'Quartier', 'Cout/m²/an (EUR)', 'Setup (k EUR)', 'Cout An1 115m²'];
    const bureauxRows = [
      ['Paris', 'La Defense', '650', '250', '75k EUR'],
      ['Geneve', 'Centre-ville', '800', '250', '92k EUR'],
      ['Amsterdam', 'Zuidas', '870', '220', '100k EUR'],
      ['Chypre', 'Limassol Business District', '600', '250', '69k EUR'],
      ['Londres', 'City', '1,300', '400', '150k EUR'],
      ['Hambourg', 'HafenCity', '580', '200', '67k EUR'],
      ['Singapour', 'CBD', '950', '320', '109k EUR'],
      ['Dubai', 'DIFC', '800', '280', '92k EUR'],
      ['Maroc CFC', 'Casablanca Finance City', '300', '150', '35k EUR']
    ];

    this.addCompactTable(bureauxHeaders, bureauxRows, {
      columnStyles: {
        0: { cellWidth: 25, fontStyle: 'bold' },
        1: { cellWidth: 50 },
        2: { cellWidth: 25, halign: 'right' },
        3: { cellWidth: 20, halign: 'right' },
        4: { cellWidth: 25, halign: 'right' }
      },
      didParseCell: (data: any) => {
        if (data.row.index === 0 && data.section === 'body') { // Paris
          data.cell.styles.fillColor = [20, 184, 166, 0.2];
        }
      }
    });

    // 5.4 IT et systemes
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('5.4 IT et Systemes - Infrastructure technologique', this.margin, this.currentY);
    this.currentY += 8;

    // DONNEES REELLES DE LA WEBAPP - IT et systemes
    const itHeaders = ['Systeme', 'An 1 (k EUR)', 'An 2 (k EUR)', 'An 3 (k EUR)', 'Note'];
    const itRows = [
      ['Bloomberg (3 postes)', '60', '60', '72', 'Terminal pro + 1 licence supplementaire An3'],
      ['Acces ICE', '36', '36', '36', 'Connexion directe marche futures'],
      ['Risk Management', '13', '30', '49', 'Systeme 2$/tonne, evolutif avec volumes'],
      ['Cybersecurite', '6.5', '15', '24.5', 'Protection 1$/tonne, critique pour trading'],
      ['Infrastructure Cloud', '8', '12', '13', 'Hebergement securise et backup']
    ];

    this.addCompactTable(itHeaders, itRows, {
      columnStyles: {
        0: { cellWidth: 35, fontStyle: 'bold' },
        1: { cellWidth: 20, halign: 'right' },
        2: { cellWidth: 20, halign: 'right' },
        3: { cellWidth: 20, halign: 'right' },
        4: { cellWidth: 50 }
      }
    });

    this.addRichText(
      'CONCLUSION SG&A: Paris presente une structure SG&A competitive a 60EUR/tonne, permettant de maintenir ' +
      'des marges operationnelles saines tout en investissant dans l\'infrastructure necessaire a un trading ' +
      'professionnel conforme aux standards europeens.',
      'highlight'
    );

    this.addFooter();
  }

  // 6. RENTABILITE COMPLETE - 2 vues
  private async addRentabiliteComplete(neskaroLogo?: string, mereyaLogo?: string) {
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 20;
    
    this.addSectionTitle('6. Analyse de Rentabilite', 'Performance financiere et retour sur investissement');
    
    // Introduction rentabilité
    this.addRichText(
      'L\'analyse de rentabilite evalue la performance economique des 12 localisations sur un horizon de 3 ans. ' +
      'Les metriques cles incluent l\'EBITDA, le ROI, la periode de remboursement et la valeur actualisee nette. ' +
      'Cette analyse permet d\'identifier les localisations offrant le meilleur equilibre risque/rendement.',
      'normal'
    );

    // 6.1 Top 5 Rentabilité
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('6.1 Top 5 Rentabilite - Classement par Score Pondere', this.margin, this.currentY);
    this.currentY += 8;

    // DONNEES REELLES DE LA WEBAPP - Top 5 basé sur les scores pondérés corrects
    const top5Headers = ['Rang', 'Localisation', 'Score Final', 'EBITDA An1', 'ROI 3ans', 'Resultat Net 3ans', 'Cash requis'];
    const top5Rows = [
      ['1', 'Paris', '7.87', '+0.52 M EUR', '171.6%', '5.14 M EUR', '1.89 M EUR'],
      ['2', 'Geneve', '7.72', '-0.23 M EUR', '187.5%', '5.13 M EUR', '1.78 M EUR'],
      ['3', 'Amsterdam', '7.65', '+0.07 M EUR', '176.8%', '4.82 M EUR', '1.74 M EUR'],
      ['4', 'Singapour', '7.49', '+0.02 M EUR', '327.5%', '6.88 M EUR', '1.61 M EUR'],
      ['5', 'Hambourg', '6.78', '+0.09 M EUR', '127.9%', '4.21 M EUR', '1.85 M EUR']
    ];

    this.addCompactTable(top5Headers, top5Rows, {
      columnStyles: {
        0: { cellWidth: 15, halign: 'center', fontStyle: 'bold' },
        1: { cellWidth: 30, fontStyle: 'bold' },
        2: { cellWidth: 20, halign: 'center', fontStyle: 'bold' },
        3: { cellWidth: 25, halign: 'right' },
        4: { cellWidth: 25, halign: 'right' },
        5: { cellWidth: 20, halign: 'center' },
        6: { cellWidth: 25, halign: 'center' }
      },
      didParseCell: (data: any) => {
        if (data.row.index === 0 && data.section === 'body') {
          data.cell.styles.fillColor = [34, 197, 94, 0.2];
        }
        if (data.column.index === 6 && data.section === 'body') {
          const statut = data.cell.text[0];
          if (statut === 'RECOMMANDE') {
            data.cell.styles.fillColor = [34, 197, 94, 0.2];
            data.cell.styles.textColor = [21, 128, 61];
          }
        }
      }
    });

    // 6.2 Analyse détaillée Paris
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('6.2 Paris - Analyse Detaillee de Rentabilite', this.margin, this.currentY);
    this.currentY += 8;

    // DONNEES REELLES WEBAPP - P&L Paris 3 ans
    const plHeaders = ['Compte de Resultat', 'An 1', 'An 2', 'An 3', 'Total 3 ans', '% Moy. CA'];
    const plRows = [
      ['Chiffre d\'affaires', '54.16 M EUR', '132.57 M EUR', '227.58 M EUR', '414.31 M EUR', '100.0%'],
      ['Marge Trading', '1.07 M EUR', '2.62 M EUR', '4.41 M EUR', '8.10 M EUR', '2.0%'],
      ['Gains Futures', '0.71 M EUR', '1.63 M EUR', '7.14 M EUR', '9.48 M EUR', '2.3%'],
      ['Total Revenus', '1.78 M EUR', '4.25 M EUR', '11.55 M EUR', '17.58 M EUR', '4.2%'],
      ['Total Charges SGA', '1.26 M EUR', '1.41 M EUR', '1.62 M EUR', '4.29 M EUR', '1.0%'],
      ['EBITDA', '0.52 M EUR', '2.84 M EUR', '9.93 M EUR', '13.29 M EUR', '3.2%'],
      ['Resultat Net', '-0.43 M EUR', '0.69 M EUR', '4.88 M EUR', '5.14 M EUR', '1.2%']
    ];

    this.addCompactTable(plHeaders, plRows, {
      columnStyles: {
        0: { cellWidth: 35, fontStyle: 'bold' },
        1: { cellWidth: 25, halign: 'right' },
        2: { cellWidth: 25, halign: 'right' },
        3: { cellWidth: 25, halign: 'right' },
        4: { cellWidth: 25, halign: 'right', fontStyle: 'bold' },
        5: { cellWidth: 20, halign: 'right' }
      },
      didParseCell: (data: any) => {
        if (data.row.index === 3 || data.row.index === 4) {
          if (data.section === 'body') {
            data.cell.styles.fillColor = [71, 85, 105, 0.1];
            data.cell.styles.fontStyle = 'bold';
          }
        }
      }
    });

    // DONNEES REELLES WEBAPP - Metriques de rentabilite Paris
    const metricHeaders = ['Metrique', 'Valeur Paris', 'Benchmark', 'Evaluation'];
    const metricRows = [
      ['ROI 3 ans', '171.6%', '>150%', 'Excellent'],
      ['EBITDA An1', '+0.52 M EUR', '>0', 'Positif des An1'],
      ['EBITDA An3/CA An3', '4.4%', '>3%', 'Satisfaisant'],
      ['Marge revenus/CA moy.', '4.2%', '3-5%', 'Dans la cible'],
      ['Croissance CA An1-An3', '+320%', '>200%', 'Forte'],
      ['Cash Flow Net cumule', '+5.14 M EUR', '>0', 'Creation valeur'],
      ['Cash initialement requis', '1.89 M EUR', 'Minimiser', 'Competitif'],
      ['Fiscalite France', '25% + CVAE', '15-30%', 'Standard Europe']
    ];

    this.addCompactTable(metricHeaders, metricRows, {
      columnStyles: {
        0: { cellWidth: 40, fontStyle: 'bold' },
        1: { cellWidth: 25, halign: 'right', fontStyle: 'bold' },
        2: { cellWidth: 25, halign: 'right' },
        3: { cellWidth: 25, halign: 'center' }
      },
      didParseCell: (data: any) => {
        if (data.column.index === 3 && data.section === 'body') {
          const evaluation = data.cell.text[0];
          if (evaluation === 'Excellent' || evaluation === 'Optimal') {
            data.cell.styles.fillColor = [34, 197, 94, 0.2];
            data.cell.styles.textColor = [21, 128, 61];
          }
        }
      }
    });

    this.addRichText(
      'CONCLUSION RENTABILITE: Paris se positionne comme la localisation la plus rentable avec un ROI de 171.6% ' +
      'et une rentabilite operationnelle des l\'An 1. La progression des marges et la maitrise des couts SG&A ' +
      'garantissent une creation de valeur durable.',
      'highlight'
    );

    this.addFooter();
  }

  // 7. FINANCEMENT COMPLETE - 3 vues
  private async addFinancementComplete(neskaroLogo?: string, mereyaLogo?: string) {
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 20;
    
    this.addSectionTitle('7. Structure de Financement', 'Besoins en capital et solutions de financement');
    
    // Introduction financement
    this.addRichText(
      'La structure de financement determine la viabilite et la competitivite du projet. L\'analyse porte sur ' +
      'les besoins en capital pour les activités de trading (forward et futures), les sources de financement ' +
      'disponibles (banques commerciales, DFI) et l\'optimisation de la structure debt/equity. L\'acces aux ' +
      'financements DFI constitue un avantage concurrentiel majeur.',
      'normal'
    );

    // 7.1 Hypothèses de financement
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('7.1 Hypotheses de Financement - Parametres de base', this.margin, this.currentY);
    this.currentY += 8;

    const hypoHeaders = ['Parametre', 'Forward Trading', 'Futures Trading', 'SG&A/Setup'];
    const hypoRows = [
      ['Financement requis', '90% dette / 10% equity', '100% equity', '100% equity'],
      ['Taux dette commerciale', '4.5% - 6.5%', 'N/A', 'N/A'],
      ['Taux DFI (AFD/Proparco)', '2.5% - 4.0%', 'N/A', 'N/A'],
      ['Marge bancaire', '200-400 bps', 'N/A', 'N/A'],
      ['Garanties', 'Stock + receivables', 'Margin call', 'Aucune'],
      ['Duree', '6-12 mois renouvelable', 'J+2', 'Permanent']
    ];

    this.addCompactTable(hypoHeaders, hypoRows, {
      columnStyles: {
        0: { cellWidth: 45, fontStyle: 'bold' },
        1: { cellWidth: 45 },
        2: { cellWidth: 35 },
        3: { cellWidth: 25 }
      }
    });

    // 7.2 Besoins détaillés par localisation
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('7.2 Besoins de Financement - Comparaison Top 5', this.margin, this.currentY);
    this.currentY += 8;

    // DONNEES REELLES WEBAPP - Besoins de financement An1
    const besoinsHeaders = ['Ranking', 'Localisation', 'Equity An1', 'Dette An1', 'Total An1', 'Frais', 'Ratio D/E'];
    const besoinsRows = [
      ['5', 'Paris', '1.89 M EUR', '11.84 M EUR', '13.73 M EUR', '0.85 M EUR', '6.25'],
      ['3', 'Geneve', '1.78 M EUR', '10.86 M EUR', '12.64 M EUR', '0.73 M EUR', '6.10'],
      ['2', 'Amsterdam', '1.74 M EUR', '10.59 M EUR', '12.33 M EUR', '0.74 M EUR', '6.09'],
      ['6', 'Londres', '2.00 M EUR', '9.67 M EUR', '11.67 M EUR', '0.63 M EUR', '4.84'],
      ['4', 'Hambourg', '1.85 M EUR', '11.41 M EUR', '13.26 M EUR', '0.91 M EUR', '6.17'],
      ['1', 'Singapour', '1.61 M EUR', '9.51 M EUR', '11.12 M EUR', '0.67 M EUR', '5.91']
    ];

    this.addCompactTable(besoinsHeaders, besoinsRows, {
      columnStyles: {
        0: { cellWidth: 25, fontStyle: 'bold' },
        1: { cellWidth: 25, halign: 'right' },
        2: { cellWidth: 25, halign: 'right' },
        3: { cellWidth: 25, halign: 'right', fontStyle: 'bold' },
        4: { cellWidth: 20, halign: 'right' },
        5: { cellWidth: 20, halign: 'center' }
      },
      didParseCell: (data: any) => {
        if (data.row.index === 0 && data.section === 'body') {
          data.cell.styles.fillColor = [34, 197, 94, 0.2];
        }
      }
    });

    // 7.3 Sources de financement Paris
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('7.3 Sources de Financement Paris - Institutions cibles', this.margin, this.currentY);
    this.currentY += 8;

    const sourcesHeaders = ['Institution', 'Type', 'Capacite', 'Taux indicatif', 'Avantages'];
    const sourcesRows = [
      ['AFD', 'DFI', '50-200 M EUR', '2.5-3.5%', 'Taux preferentiel, mission developpement'],
      ['Proparco', 'DFI', '20-100 M EUR', '3.0-4.0%', 'Financement prive, expertise Afrique'],
      ['BNP Paribas', 'Commercial', '20-50 M EUR', '5.0-6.0%', 'Connaissance marche, rapidite'],
      ['Societe Generale', 'Commercial', '20-50 M EUR', '4.8-5.8%', 'Expertise commodities'],
      ['Credit Agricole', 'Commercial', '15-30 M EUR', '5.2-6.2%', 'Reseau international'],
      ['IFC World Bank', 'DFI', '10-50 M EUR', '3.5-4.5%', 'Standards ESG, credibilite']
    ];

    this.addCompactTable(sourcesHeaders, sourcesRows, {
      columnStyles: {
        0: { cellWidth: 30, fontStyle: 'bold' },
        1: { cellWidth: 20, halign: 'center' },
        2: { cellWidth: 25, halign: 'right' },
        3: { cellWidth: 25, halign: 'right' },
        4: { cellWidth: 45 }
      },
      didParseCell: (data: any) => {
        if (data.column.index === 1 && data.section === 'body') {
          const type = data.cell.text[0];
          if (type === 'DFI') {
            data.cell.styles.fillColor = [34, 197, 94, 0.2];
            data.cell.styles.textColor = [21, 128, 61];
          }
        }
      }
    });

    // Structure financiere optimale Paris
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Structure Financiere Optimale Paris - Repartition cible', this.margin, this.currentY);
    this.currentY += 8;

    const optimalHeaders = ['Source', 'Montant', '% Total', 'Cout', 'Utilisation'];
    const optimalRows = [
      ['Fonds propres Neskao', '1.89 M EUR', '13.8%', '12%', 'Setup + equity futures'],
      ['Dette DFI (AFD)', '6.00 M EUR', '43.7%', '3.2%', 'Financement forward principal'],
      ['Dette commerciale', '4.00 M EUR', '29.1%', '5.5%', 'Complement trading working capital'],
      ['Ligne credit revolving', '1.84 M EUR', '13.4%', '6.0%', 'Flexibilite operationnelle'],
      ['TOTAL', '13.73 M EUR', '100.0%', '4.8%', 'Structure equilibree']
    ];

    this.addCompactTable(optimalHeaders, optimalRows, {
      columnStyles: {
        0: { cellWidth: 40, fontStyle: 'bold' },
        1: { cellWidth: 25, halign: 'right' },
        2: { cellWidth: 20, halign: 'right' },
        3: { cellWidth: 20, halign: 'right' },
        4: { cellWidth: 40 }
      },
      didParseCell: (data: any) => {
        if (data.row.index === 4 && data.section === 'body') {
          data.cell.styles.fillColor = [71, 85, 105, 0.1];
          data.cell.styles.fontStyle = 'bold';
        }
      }
    });

    this.addRichText(
      'CONCLUSION FINANCEMENT: Paris beneficie d\'un acces privilegie aux financements DFI (AFD/Proparco) ' +
      'permettant d\'optimiser le cout du capital a 4.8% vs 6-7% pour les autres localisations. Cette structure ' +
      'competitive renforce significativement la rentabilite du projet.',
      'highlight'
    );

    this.addFooter();
  }

  // 8. IMPACT SOCIAL COMPLETE - 2 vues
  private async addImpactSocialComplete(neskaroLogo?: string, mereyaLogo?: string) {
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 20;
    
    this.addSectionTitle('8. Impact Social et ESG', 'Contribution au developpement et objectifs ESG');
    
    // Introduction impact social
    this.addRichText(
      'L\'impact social represente 30% de la ponderation dans l\'evaluation des localisations, reflectant ' +
      'l\'engagement de Neskao envers le developpement durable. L\'analyse examine la proximite avec la ' +
      'Cote d\'Ivoire, l\'ecosysteme ESG, les opportunites de formation, la transparence et les partenariats ' +
      'possibles avec les institutions locales.',
      'normal'
    );

    // 8.1 Critères détaillés
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('8.1 Criteres Detailles - Evaluation Impact Social', this.margin, this.currentY);
    this.currentY += 8;

    // Tableau détaillé impact social toutes villes
    const impactHeaders = ['Localisation', 'Proximite CI', 'Ecosys. ESG', 'Formation', 'Transparence', 'Partenariats', 'Score final'];
    const impactRows = [
      ['Paris', '9/10', '8/10', '10/10', '9/10', '8/10', '8.5/10'],
      ['Geneve', '6/10', '9/10', '8/10', '10/10', '7/10', '7.9/10'],
      ['Amsterdam', '7/10', '8/10', '7/10', '8/10', '9/10', '7.8/10'],
      ['Maurice', '8/10', '7/10', '8/10', '7/10', '7/10', '7.5/10'],
      ['Hambourg', '5/10', '7/10', '6/10', '7/10', '6/10', '6.8/10'],
      ['Maroc CFC', '9/10', '8/10', '10/10', '8/10', '8/10', '8.6/10']
    ];

    this.addCompactTable(impactHeaders, impactRows, {
      columnStyles: {
        0: { cellWidth: 25, fontStyle: 'bold' },
        1: { cellWidth: 20, halign: 'center' },
        2: { cellWidth: 20, halign: 'center' },
        3: { cellWidth: 20, halign: 'center' },
        4: { cellWidth: 20, halign: 'center' },
        5: { cellWidth: 20, halign: 'center' },
        6: { cellWidth: 20, halign: 'center', fontStyle: 'bold' }
      },
      didParseCell: (data: any) => {
        if (data.row.index === 0 && data.section === 'body') {
          data.cell.styles.fillColor = [34, 197, 94, 0.2];
        }
      }
    });

    // 8.2 Focus Paris - Détail des programmes
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('8.2 Focus Paris - Programmes d\'Impact Specifiques', this.margin, this.currentY);
    this.currentY += 8;

    const programHeaders = ['Programme', 'Cible', 'Duree', 'Budget 3ans', 'Impact mesurable'];
    const programRows = [
      ['Bourses formation trading', '10 bourses/3ans', '6 mois/bourse', '0.15 M EUR', '10 jeunes Ivoiriens formes'],
      ['Partenariat universites', 'ENSEA-Yamoussoukro', 'Permanent', '0.08 M EUR', '2 echanges/an master/stage'],
      ['Mentoring diaspora', '150K Ivoiriens France', 'Continu', '0.05 M EUR', '20 mentors actifs/an'],
      ['Certification producteurs', 'Cooperatives CI', '3 ans', '0.12 M EUR', '500 producteurs certifies'],
      ['Innovation agtech', 'Startups CI', '3 ans', '0.10 M EUR', '5 projets finances'],
      ['TOTAL PROGRAMMES', '', '', '0.50 M EUR', 'Impact systematique mesure']
    ];

    this.addCompactTable(programHeaders, programRows, {
      columnStyles: {
        0: { cellWidth: 35, fontStyle: 'bold' },
        1: { cellWidth: 30 },
        2: { cellWidth: 25, halign: 'center' },
        3: { cellWidth: 25, halign: 'right' },
        4: { cellWidth: 40 }
      },
      didParseCell: (data: any) => {
        if (data.row.index === 5 && data.section === 'body') {
          data.cell.styles.fillColor = [71, 85, 105, 0.1];
          data.cell.styles.fontStyle = 'bold';
        }
      }
    });

    // KPIs impact social
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('KPIs Impact Social - Metriques de suivi', this.margin, this.currentY);
    this.currentY += 8;

    const kpiHeaders = ['KPI', 'Cible An1', 'Cible An2', 'Cible An3', 'Methode mesure'];
    const kpiRows = [
      ['Emplois crees Ivoiriens', '3', '6', '8', 'RH + attestations'],
      ['Heures formation dispensees', '500h', '800h', '1200h', 'Registre formation'],
      ['Stagiaires accueillis', '2', '4', '6', 'Conventions stages'],
      ['Cooperatives certifiees', '50', '200', '500', 'Certificats Rainforest'],
      ['Projets innovation finances', '1', '3', '5', 'Contrats financement'],
      ['Budget impact/CA', '0.8%', '0.6%', '0.4%', 'Comptabilite analytique']
    ];

    this.addCompactTable(kpiHeaders, kpiRows, {
      columnStyles: {
        0: { cellWidth: 40, fontStyle: 'bold' },
        1: { cellWidth: 20, halign: 'center' },
        2: { cellWidth: 20, halign: 'center' },
        3: { cellWidth: 20, halign: 'center' },
        4: { cellWidth: 40 }
      }
    });

    // 8.3 Comparaison avec concurrents
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('8.3 Benchmark ESG - Comparaison Trading Houses', this.margin, this.currentY);
    this.currentY += 8;

    const benchmarkHeaders = ['Trading House', 'Localisation', 'Budget ESG/CA', 'Programmes phares', 'Certification'];
    const benchmarkRows = [
      ['Cargill', 'Geneve', '0.3%', 'Cocoa Promise', 'UTZ/Rainforest'],
      ['Barry Callebaut', 'Zurich', '0.5%', 'Forever Chocolate', 'UTZ/Bio'],
      ['Olam Cocoa', 'Singapour', '0.4%', 'AtSource', 'Rainforest/ISO14001'],
      ['ECOM', 'Pully', '0.2%', 'ECOM Foundation', 'UTZ'],
      ['Neskao (cible)', 'Paris', '0.6%', 'Trading for Impact', 'Rainforest/Fair Trade']
    ];

    this.addCompactTable(benchmarkHeaders, benchmarkRows, {
      columnStyles: {
        0: { cellWidth: 30, fontStyle: 'bold' },
        1: { cellWidth: 25 },
        2: { cellWidth: 25, halign: 'right' },
        3: { cellWidth: 35 },
        4: { cellWidth: 30 }
      },
      didParseCell: (data: any) => {
        if (data.row.index === 4 && data.section === 'body') {
          data.cell.styles.fillColor = [34, 197, 94, 0.2];
        }
      }
    });

    this.addRichText(
      'CONCLUSION IMPACT SOCIAL: Paris offre le meilleur potentiel d\'impact social avec un score de 8.5/10, ' +
      'grace aux liens historiques avec la CI, à l\'ecosysteme diaspora et aux partenariats institutionnels ' +
      '(AFD, Campus France). Cette dimension renforce la legitimite et la durabilite du projet.',
      'highlight'
    );

    this.addFooter();
  }

  // 9. ANALYSE DECISIONNELLE COMPLETE
  private async addAnalyseDecisionnelleComplete(neskaroLogo?: string, mereyaLogo?: string) {
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 20;
    
    this.addSectionTitle('9. Analyse Decisionnelle', 'Synthese multicriteres et recommandation finale');
    
    // Introduction analyse décisionnelle
    this.addRichText(
      'L\'analyse decisionnelle consolide l\'evaluation des 12 localisations selon la methodologie multicriteres ' +
      'ponderee. La ponderation reflete les priorites strategiques: Impact Social (30%), Cash Flow (30%), ' +
      'Reglementation (15%), ROI (15%), Acces DFI (10%). Cette approche systematique garantit l\'objectivite ' +
      'de la recommandation finale.',
      'normal'
    );

    // 9.1 Matrice consolidée complète
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('9.1 Matrice Decisionnelle Consolidee - 12 Localisations', this.margin, this.currentY);
    this.currentY += 8;

    // Tableau matrice complète (version compacte pour PDF)
    const matriceHeaders = ['Rang', 'Ville', 'Reglem.', 'Impact', 'ROI', 'DFI', 'Cash', 'Score', 'Decision'];
    const matriceRows = [
      ['1', 'Paris', '10.0', '8.5', '7.8', '10.0', '6.2', '8.09', 'RECOMMANDE'],
      ['2', 'Geneve', '10.0', '7.9', '7.7', '10.0', '6.1', '8.06', 'RECOMMANDE'],
      ['3', 'Amsterdam', '10.0', '7.8', '7.5', '9.0', '6.3', '7.98', 'RECOMMANDE'],
      ['4', 'Singapour', '8.0', '6.1', '10.0', '8.0', '9.1', '7.49', 'POSSIBLE'],
      ['5', 'Hambourg', '10.0', '6.8', '6.8', '6.0', '6.0', '7.32', 'POSSIBLE'],
      ['6', 'Chypre', '8.0', '6.3', '9.2', '9.0', '6.8', '7.14', 'POSSIBLE'],
      ['7', 'Londres', '8.0', '7.6', '5.9', '8.0', '5.8', '7.06', 'POSSIBLE'],
      ['8', 'Maroc CFC', '7.0', '8.6', '6.8', '5.0', '4.2', '6.91', 'POSSIBLE'],
      ['9', 'Tel Aviv', '8.0', '6.5', '5.4', '5.0', '5.9', '6.58', 'ENVISAGEABLE'],
      ['10', 'Maurice', '8.0', '7.5', '6.2', '7.0', '3.8', '6.56', 'ENVISAGEABLE'],
      ['11', 'Dubai', '7.0', '5.1', '8.7', '4.0', '7.2', '6.50', 'ENVISAGEABLE'],
      ['12', 'Andorre', '6.0', '3.4', '8.5', '2.0', '5.8', '5.23', 'NON RETENU']
    ];

    this.addCompactTable(matriceHeaders, matriceRows, {
      columnStyles: {
        0: { cellWidth: 12, halign: 'center', fontStyle: 'bold' },
        1: { cellWidth: 22, fontStyle: 'bold' },
        2: { cellWidth: 15, halign: 'center' },
        3: { cellWidth: 15, halign: 'center' },
        4: { cellWidth: 15, halign: 'center' },
        5: { cellWidth: 15, halign: 'center' },
        6: { cellWidth: 15, halign: 'center' },
        7: { cellWidth: 15, halign: 'center', fontStyle: 'bold' },
        8: { cellWidth: 22, halign: 'center' }
      },
      didParseCell: (data: any) => {
        if (data.row.index <= 2 && data.section === 'body') {
          data.cell.styles.fillColor = [34, 197, 94, 0.2];
        }
        if (data.column.index === 8 && data.section === 'body') {
          const decision = data.cell.text[0];
          if (decision === 'RECOMMANDE') {
            data.cell.styles.fillColor = [34, 197, 94, 0.2];
            data.cell.styles.textColor = [21, 128, 61];
          }
        }
      }
    });

    // 9.2 Analyse de sensibilité
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('9.2 Analyse de Sensibilite - Impact des Ponderations', this.margin, this.currentY);
    this.currentY += 8;

    const sensibiliteHeaders = ['Scenario', 'Paris', 'Geneve', 'Amsterdam', 'Classement'];
    const sensibiliteRows = [
      ['Base (Impact 30%)', '8.09', '8.06', '7.98', 'Paris > Geneve > Amsterdam'],
      ['Focus ROI (ROI 40%)', '7.96', '7.94', '7.83', 'Paris > Geneve > Amsterdam'],
      ['Focus Reglem. (Reg 40%)', '8.85', '8.85', '8.75', 'Paris = Geneve > Amsterdam'],
      ['Focus Social (Impact 50%)', '8.35', '7.95', '7.90', 'Paris > Geneve > Amsterdam'],
      ['Equilibre (20% chacun)', '8.26', '8.24', '8.12', 'Paris > Geneve > Amsterdam']
    ];

    this.addCompactTable(sensibiliteHeaders, sensibiliteRows, {
      columnStyles: {
        0: { cellWidth: 40, fontStyle: 'bold' },
        1: { cellWidth: 20, halign: 'center' },
        2: { cellWidth: 20, halign: 'center' },
        3: { cellWidth: 20, halign: 'center' },
        4: { cellWidth: 50 }
      },
      didParseCell: (data: any) => {
        if (data.row.index === 0 && data.section === 'body') {
          data.cell.styles.fillColor = [71, 85, 105, 0.1];
        }
      }
    });

    // 9.3 Recommandation stratégique finale
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('9.3 Recommandation Strategique Finale', this.margin, this.currentY);
    this.currentY += 8;

    // Résumé exécutif
    const executiveHeaders = ['Critere Decision', 'Paris', 'Avantage Competitif', 'Justification'];
    const executiveRows = [
      ['Score global', '8.09/10', '#1 sur 12', 'Meilleur equilibre multicriteres'],
      ['Impact social', '8.5/10', 'Diaspora 150K', 'Liens historiques CI uniques'],
      ['Financement DFI', '10/10', 'AFD/Proparco', 'Cout capital optimal 4.8%'],
      ['Rentabilite An1', '+0.52M EUR', 'EBITDA positif', 'Seule ville rentable immediate'],
      ['Cadre juridique', '10/10', 'Convention CI', 'Agrement CCC automatique'],
      ['Risque execution', 'Faible', 'Infrastructure', 'Ecosysteme mature trading']
    ];

    this.addCompactTable(executiveHeaders, executiveRows, {
      columnStyles: {
        0: { cellWidth: 30, fontStyle: 'bold' },
        1: { cellWidth: 25, halign: 'center', fontStyle: 'bold' },
        2: { cellWidth: 30 },
        3: { cellWidth: 50 }
      }
    });

    this.addRichText(
      'DECISION FINALE: Paris s\'impose comme le choix strategique optimal pour l\'etablissement du bureau ' +
      'de trading Neskao. La convergence des avantages (impact social, financement DFI, cadre reglementaire, ' +
      'rentabilite immediate) cree un avantage concurrentiel durable et aligné sur la mission de l\'entreprise.',
      'highlight'
    );

    this.addFooter();
  }

  // 10. RISQUES COMPLETE
  private async addRisquesComplete(neskaroLogo?: string, mereyaLogo?: string) {
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 20;
    
    this.addSectionTitle('10. Gestion des Risques', 'Identification, evaluation et strategies de mitigation');
    
    // Introduction risques
    this.addRichText(
      'La gestion des risques constitue un pilier fondamental du bureau de trading. L\'analyse identifie ' +
      '10 categories de risques majeurs, evalues selon leur impact (1-5) et probabilite (1-5). Le score ' +
      'de criticite (Impact x Probabilite) oriente les priorites de mitigation. Les risques critiques ' +
      '(score ≥20) necessitent une attention immediate.',
      'normal'
    );

    // 10.1 Matrice des risques prioritaires
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('10.1 Matrice des Risques - Top 6 Criticites', this.margin, this.currentY);
    this.currentY += 8;

    const risquesHeaders = ['Rang', 'Categorie Risque', 'Impact', 'Probab.', 'Criticite', 'Statut'];
    const risquesRows = [
      ['1', 'Volatilite Marche', '5', '5', '25', 'CRITIQUE'],
      ['2', 'Liquidite/Finance', '5', '4', '20', 'CRITIQUE'],
      ['3', 'Expertise Trading', '4', '3', '12', 'ELEVE'],
      ['4', 'Compliance/Reglem.', '4', '3', '12', 'ELEVE'],
      ['5', 'Contrepartie', '3', '4', '12', 'ELEVE'],
      ['6', 'Change (FX)', '2', '5', '10', 'MOYEN']
    ];

    this.addCompactTable(risquesHeaders, risquesRows, {
      columnStyles: {
        0: { cellWidth: 15, halign: 'center', fontStyle: 'bold' },
        1: { cellWidth: 40, fontStyle: 'bold' },
        2: { cellWidth: 20, halign: 'center' },
        3: { cellWidth: 20, halign: 'center' },
        4: { cellWidth: 20, halign: 'center', fontStyle: 'bold' },
        5: { cellWidth: 25, halign: 'center' }
      },
      didParseCell: (data: any) => {
        if (data.column.index === 5 && data.section === 'body') {
          const statut = data.cell.text[0];
          if (statut === 'CRITIQUE') {
            data.cell.styles.fillColor = [239, 68, 68, 0.2];
            data.cell.styles.textColor = [153, 27, 27];
          }
        }
      }
    });

    // 10.2 Stratégies de mitigation détaillées
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('10.2 Strategies de Mitigation - Actions Prioritaires', this.margin, this.currentY);
    this.currentY += 8;

    const mitigationHeaders = ['Risque', 'Actions Mitigation', 'Responsable', 'Echeance', 'Budget'];
    const mitigationRows = [
      ['Volatilite Marche', 'Hedging min 80% + VAR limits + Stop-loss auto', 'Risk Manager', 'J+1', '0.15 M EUR'],
      ['Liquidite Finance', 'Capital buffer 150% + Lignes multi-banques', 'CFO', 'M-2', '0.25 M EUR'],
      ['Expertise Trading', 'Double validation trades + Formation 40h/an', 'Head Trading', 'M-1', '0.08 M EUR'],
      ['Compliance', 'Officer dedie + Audit mensuel + Formation EUDR', 'Compliance', 'M-1', '0.12 M EUR'],
      ['Contrepartie', 'Due diligence + Limites credit + Assurance', 'Credit Team', 'Continue', '0.06 M EUR'],
      ['Change FX', 'Hedging systematique + Comptes multi-devises', 'Treasury', 'Quotidien', '0.04 M EUR']
    ];

    this.addCompactTable(mitigationHeaders, mitigationRows, {
      columnStyles: {
        0: { cellWidth: 25, fontStyle: 'bold' },
        1: { cellWidth: 50 },
        2: { cellWidth: 22 },
        3: { cellWidth: 18, halign: 'center' },
        4: { cellWidth: 20, halign: 'right' }
      }
    });

    // 10.3 Gouvernance des risques
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('10.3 Gouvernance des Risques - Organisation et Controles', this.margin, this.currentY);
    this.currentY += 8;

    const gouvernanceHeaders = ['Niveau', 'Instance', 'Frequence', 'Participants', 'Scope'];
    const gouvernanceRows = [
      ['Strategique', 'Comite Risques Board', 'Mensuel', 'CEO, CFO, Admin', 'Risques strategiques majeurs'],
      ['Operationnel', 'Comite Risques Ops', 'Hebdomadaire', 'Risk, Trading, Ops', 'Risques quotidiens trading'],
      ['Technique', 'Risk Committee', 'Quotidien', 'Risk Manager, Traders', 'VAR, limites, positions'],
      ['Controle', 'Audit Interne', 'Trimestriel', 'Auditeur + Management', 'Conformite procedures'],
      ['Externe', 'Audit Externe', 'Annuel', 'Big4 + Board', 'Certification ISO 31000']
    ];

    this.addCompactTable(gouvernanceHeaders, gouvernanceRows, {
      columnStyles: {
        0: { cellWidth: 25, fontStyle: 'bold' },
        1: { cellWidth: 30 },
        2: { cellWidth: 22, halign: 'center' },
        3: { cellWidth: 25 },
        4: { cellWidth: 40 }
      }
    });

    // 10.4 KPIs et surveillance
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('10.4 KPIs de Surveillance - Seuils d\'Alerte', this.margin, this.currentY);
    this.currentY += 8;

    const kpiRiskHeaders = ['KPI Risque', 'Seuil Vert', 'Seuil Orange', 'Seuil Rouge', 'Action'];
    const kpiRiskRows = [
      ['VAR 95% quotidien', '<3% capital', '3-5% capital', '>5% capital', 'Stop trading immediat'],
      ['Ratio liquidite', '>150%', '120-150%', '<120%', 'Injection capital'],
      ['% Hedging positions', '>80%', '60-80%', '<60%', 'Hedging force'],
      ['Nb violations limites', '0', '1-2/mois', '>2/mois', 'Revision procedures'],
      ['Incidents compliance', '0', '1/trimestre', '>1/trimestre', 'Audit externe'],
      ['Defauts contreparties', '0%', '<2%', '>2%', 'Revision limites credit']
    ];

    this.addCompactTable(kpiRiskHeaders, kpiRiskRows, {
      columnStyles: {
        0: { cellWidth: 35, fontStyle: 'bold' },
        1: { cellWidth: 22, halign: 'center' },
        2: { cellWidth: 22, halign: 'center' },
        3: { cellWidth: 22, halign: 'center' },
        4: { cellWidth: 35 }
      },
      didParseCell: (data: any) => {
        if (data.column.index === 1 && data.section === 'body') {
          data.cell.styles.fillColor = [34, 197, 94, 0.2];
        }
        if (data.column.index === 3 && data.section === 'body') {
          data.cell.styles.fillColor = [239, 68, 68, 0.2];
        }
      }
    });

    this.addRichText(
      'CONCLUSION RISQUES: La mise en place d\'un dispositif de gestion des risques robuste des le lancement ' +
      'est critique. Les deux risques prioritaires (volatilite marche et liquidite) necessitent une attention ' +
      'immediate avec des mesures de mitigation operationnelles des J+1.',
      'highlight'
    );

    this.addFooter();
  }

  // 11. NEXT STEPS COMPLETE
  private async addNextStepsComplete(neskaroLogo?: string, mereyaLogo?: string) {
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 20;
    
    this.addSectionTitle('11. Prochaines Etapes', 'Roadmap de lancement et plan d\'execution');
    
    // Introduction next steps
    this.addRichText(
      'Le plan d\'execution s\'articule autour de 3 phases sequentielles sur 5 mois (Aout-Decembre 2024). ' +
      'La Phase 1 (fondation legale) est critique car elle conditionne toute la suite. Chaque phase comprend ' +
      'des jalons specifiques avec des livrables mesurables et des responsabilites definies.',
      'normal'
    );

    // 11.1 Vue d'ensemble roadmap
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('11.1 Roadmap General - 3 Phases de Lancement', this.margin, this.currentY);
    this.currentY += 8;

    const roadmapHeaders = ['Phase', 'Periode', 'Objectif Principal', 'Responsable', 'Jalons'];
    const roadmapRows = [
      ['Phase 1', 'Fin Aout 2024', 'Fondation Legale & Reglementaire', 'Direction Neskao', '31 Aout 2024'],
      ['Phase 2', 'Sept-Nov 2024', 'Structuration Financiere & Partenariats', 'Julien Consultant', '30 Nov 2024'],
      ['Phase 3', 'Oct-Dec 2024', 'Deploiement Operationnel', 'Julien Consultant', '31 Dec 2024']
    ];

    this.addCompactTable(roadmapHeaders, roadmapRows, {
      columnStyles: {
        0: { cellWidth: 20, fontStyle: 'bold', halign: 'center' },
        1: { cellWidth: 30, halign: 'center' },
        2: { cellWidth: 50 },
        3: { cellWidth: 35 },
        4: { cellWidth: 25, halign: 'center' }
      }
    });

    // 11.2 Phase 1 détaillée
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('11.2 Phase 1 - Fondation Legale & Reglementaire (Fin Aout)', this.margin, this.currentY);
    this.currentY += 8;

    const phase1Headers = ['Activite', 'Description', 'Delivrables', 'Duree', 'Budget'];
    const phase1Rows = [
      ['Choix localisation', 'Validation finale Paris + formalisation', 'Decision Board validee', '1 semaine', 'Interne'],
      ['Creation societe', 'Constitution juridique + statuts + gouvernance', 'Immatriculation + comptes bancaires', '3 semaines', '15k EUR'],
      ['Depot dossier CCC', 'Soumission Contrepartie Internationale CI', 'Agrement CCC obtenu', '4 semaines', '25k EUR'],
      ['Setup initial', 'Preparation infrastructure minimale', 'Bureaux temporaires + IT basic', '2 semaines', '35k EUR']
    ];

    this.addCompactTable(phase1Headers, phase1Rows, {
      columnStyles: {
        0: { cellWidth: 30, fontStyle: 'bold' },
        1: { cellWidth: 45 },
        2: { cellWidth: 40 },
        3: { cellWidth: 20, halign: 'center' },
        4: { cellWidth: 20, halign: 'right' }
      }
    });

    // 11.3 Phase 2 détaillée
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('11.3 Phase 2 - Structuration Financiere (Sept-Nov)', this.margin, this.currentY);
    this.currentY += 8;

    const phase2Headers = ['Activite', 'Description', 'Delivrables', 'Duree', 'Budget'];
    const phase2Rows = [
      ['Pitch investisseurs', 'Creation deck + modele financier 3 ans', 'Presentation investor-ready', '3 semaines', '20k EUR'],
      ['Business Plan 2026', 'Elaboration BP detaille + budgets', 'BP complet + projections', '4 semaines', '25k EUR'],
      ['Levee de fonds', 'Rencontres banques + DFI + investisseurs', 'Term sheets signees', '8 semaines', '30k EUR'],
      ['Due diligence', 'Validation technique + legale par financeurs', 'Financements confirmes', '3 semaines', '15k EUR']
    ];

    this.addCompactTable(phase2Headers, phase2Rows, {
      columnStyles: {
        0: { cellWidth: 30, fontStyle: 'bold' },
        1: { cellWidth: 45 },
        2: { cellWidth: 40 },
        3: { cellWidth: 20, halign: 'center' },
        4: { cellWidth: 20, halign: 'right' }
      }
    });

    // 11.4 Phase 3 détaillée
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('11.4 Phase 3 - Deploiement Operationnel (Oct-Dec)', this.margin, this.currentY);
    this.currentY += 8;

    const phase3Headers = ['Activite', 'Description', 'Delivrables', 'Duree', 'Budget'];
    const phase3Rows = [
      ['Bureaux definitifs', 'Recherche + bail + amenagement La Defense', 'Bureaux operationnels', '6 semaines', '150k EUR'],
      ['Recrutements cles', 'Trading Manager + Risk Manager + equipe', 'Equipe core constituee', '8 semaines', '45k EUR'],
      ['Systemes IT', 'Plateforme trading + risk + ERP + cyber', 'Infrastructure complete', '8 semaines', '280k EUR'],
      ['Tests operationnels', 'Procedures + formations + tests', 'Certification operationnelle', '3 semaines', '25k EUR']
    ];

    this.addCompactTable(phase3Headers, phase3Rows, {
      columnStyles: {
        0: { cellWidth: 30, fontStyle: 'bold' },
        1: { cellWidth: 45 },
        2: { cellWidth: 40 },
        3: { cellWidth: 20, halign: 'center' },
        4: { cellWidth: 20, halign: 'right' }
      }
    });

    // 11.5 Budget récapitulatif
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('11.5 Budget Recapitulatif - Investissement Lancement', this.margin, this.currentY);
    this.currentY += 8;

    const budgetHeaders = ['Poste', 'Phase 1', 'Phase 2', 'Phase 3', 'Total', '% Total'];
    const budgetRows = [
      ['Legal & Reglementaire', '40k EUR', '15k EUR', '25k EUR', '80k EUR', '11.4%'],
      ['Financement & Conseil', '0k EUR', '75k EUR', '0k EUR', '75k EUR', '10.7%'],
      ['Infrastructure & IT', '35k EUR', '0k EUR', '280k EUR', '315k EUR', '45.0%'],
      ['Bureaux & Amenagement', '0k EUR', '0k EUR', '150k EUR', '150k EUR', '21.4%'],
      ['Recrutement & Formation', '0k EUR', '0k EUR', '45k EUR', '45k EUR', '6.4%'],
      ['Divers & Contingence', '5k EUR', '10k EUR', '20k EUR', '35k EUR', '5.0%'],
      ['TOTAL', '80k EUR', '100k EUR', '520k EUR', '700k EUR', '100.0%']
    ];

    this.addCompactTable(budgetHeaders, budgetRows, {
      columnStyles: {
        0: { cellWidth: 35, fontStyle: 'bold' },
        1: { cellWidth: 20, halign: 'right' },
        2: { cellWidth: 20, halign: 'right' },
        3: { cellWidth: 20, halign: 'right' },
        4: { cellWidth: 25, halign: 'right', fontStyle: 'bold' },
        5: { cellWidth: 20, halign: 'right' }
      },
      didParseCell: (data: any) => {
        if (data.row.index === 6 && data.section === 'body') {
          data.cell.styles.fillColor = [71, 85, 105, 0.1];
          data.cell.styles.fontStyle = 'bold';
        }
      }
    });

    this.addRichText(
      'CONCLUSION NEXT STEPS: Le succes du projet repose sur une execution rigoureuse des 3 phases. ' +
      'La Phase 1 est critique car elle conditionne l\'ensemble. Budget total de lancement: 700k EUR. ' +
      'Demarrage recommande: immediatement avec validation Board de la localisation Paris.',
      'highlight'
    );

    this.addFooter();
  }

  // 12. RECOMMANDATIONS FINALES
  private async addRecommandationsFinales(neskaroLogo?: string, mereyaLogo?: string) {
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 20;
    
    this.addSectionTitle('12. Recommandations Finales', 'Decision strategique et plan d\'action');
    
    // Synthèse exécutive
    this.addRichText(
      'Après une analyse exhaustive de 12 localisations selon 5 criteres ponderes, Paris s\'impose comme ' +
      'le choix optimal pour l\'etablissement du bureau de trading international de Neskao. Cette recommandation ' +
      's\'appuie sur des avantages competitifs durables et une alignement parfait avec la mission de l\'entreprise.',
      'normal'
    );

    // 12.1 Résumé de la décision
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('12.1 Decision Strategique - Paris comme Hub Trading International', this.margin, this.currentY);
    this.currentY += 8;

    const decisionHeaders = ['Critere', 'Paris', 'Avantage vs Concurrents', 'Impact Business'];
    const decisionRows = [
      ['Score global', '8.09/10', '+0.03 vs Geneve (#2)', 'Meilleur equilibre multicriteres'],
      ['Impact social', '8.5/10', '+0.6 vs Amsterdam (#3)', 'Legitimite et mission alignee'],
      ['Acces financement', '10/10', 'Exclusif AFD/Proparco', 'Cout capital optimal -150bps'],
      ['Rentabilite An1', '+0.52M EUR', 'Seule ville EBITDA positif', 'Retour investissement rapide'],
      ['Cadre reglementaire', '10/10', 'Convention fiscale CI', 'Agrement trading automatique'],
      ['Ecosysteme', 'Mature', 'Infrastructure complete', 'Risque execution minimal']
    ];

    this.addCompactTable(decisionHeaders, decisionRows, {
      columnStyles: {
        0: { cellWidth: 35, fontStyle: 'bold' },
        1: { cellWidth: 25, halign: 'center', fontStyle: 'bold' },
        2: { cellWidth: 45 },
        3: { cellWidth: 40 }
      }
    });

    // 12.2 Validation financière
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('12.2 Validation Financiere - Business Case Paris', this.margin, this.currentY);
    this.currentY += 8;

    const businessHeaders = ['Metrique', 'An 1', 'An 2', 'An 3', 'Total/Moy', 'Benchmark'];
    const businessRows = [
      ['Chiffre d\'affaires', '54.2 M EUR', '132.6 M EUR', '227.6 M EUR', '414.3 M EUR', '> objectifs'],
      ['EBITDA', '0.52 M EUR', '2.84 M EUR', '9.93 M EUR', '13.29 M EUR', '3.2% CA moyen'],
      ['Investissement', '1.89 M EUR', '0.85 M EUR', '1.15 M EUR', '3.89 M EUR', 'Capital efficient'],
      ['ROI cumule', '-23%', '+36%', '+172%', '172% sur 3 ans', 'Excellent >150%'],
      ['Payback', '', '', '2.3 ans', '2.3 ans', 'Très bon <3 ans'],
      ['Cash Flow libre', '-0.43 M EUR', '+0.69 M EUR', '+4.88 M EUR', '+5.14 M EUR', 'Creation valeur']
    ];

    this.addCompactTable(businessHeaders, businessRows, {
      columnStyles: {
        0: { cellWidth: 35, fontStyle: 'bold' },
        1: { cellWidth: 22, halign: 'right' },
        2: { cellWidth: 22, halign: 'right' },
        3: { cellWidth: 22, halign: 'right' },
        4: { cellWidth: 25, halign: 'right', fontStyle: 'bold' },
        5: { cellWidth: 25 }
      }
    });

    // 12.3 Actions immédiates
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('12.3 Actions Immediates - Checklist de Demarrage', this.margin, this.currentY);
    this.currentY += 8;

    const actionsHeaders = ['Action', 'Responsable', 'Echeance', 'Criticite', 'Prerequis'];
    const actionsRows = [
      ['Validation Board Paris', 'CEO Neskao', 'Semaine 1', 'CRITIQUE', 'Presentation interne'],
      ['Nomination Project Manager', 'Board', 'Semaine 1', 'CRITIQUE', 'Resources dediees'],
      ['Constitution equipe projet', 'PM', 'Semaine 2', 'ELEVE', 'Budget approuve'],
      ['Demarrage due diligence', 'Legal Counsel', 'Semaine 2', 'ELEVE', 'Validation Board'],
      ['Premiers contacts AFD', 'CFO', 'Semaine 3', 'ELEVE', 'Teaser prepare'],
      ['Preparation dossier CCC', 'Ops Manager', 'Semaine 3', 'MOYEN', 'Documentation CI']
    ];

    this.addCompactTable(actionsHeaders, actionsRows, {
      columnStyles: {
        0: { cellWidth: 35, fontStyle: 'bold' },
        1: { cellWidth: 25 },
        2: { cellWidth: 22, halign: 'center' },
        3: { cellWidth: 22, halign: 'center' },
        4: { cellWidth: 32 }
      },
      didParseCell: (data: any) => {
        if (data.column.index === 3 && data.section === 'body') {
          const criticite = data.cell.text[0];
          if (criticite === 'CRITIQUE') {
            data.cell.styles.fillColor = [239, 68, 68, 0.2];
            data.cell.styles.textColor = [153, 27, 27];
          }
        }
      }
    });

    // 12.4 Facteurs clés de succès
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('12.4 Facteurs Cles de Succes - Conditions de Reussite', this.margin, this.currentY);
    this.currentY += 8;

    const successHeaders = ['Facteur', 'Description', 'Responsabilite', 'KPI Suivi'];
    const successRows = [
      ['Engagement Management', 'Support total direction + ressources', 'CEO + Board', 'Budget respecte'],
      ['Execution Phase 1', 'Agrement CCC obtenu dans les delais', 'Project Manager', '31 Aout 2024'],
      ['Financement DFI', 'Terme sheet AFD/Proparco signee', 'CFO', 'Cout <4% confirme'],
      ['Recrutement equipe', 'Trading Manager + Risk recrutes', 'HR + Head Trading', 'Equipe en place J-30'],
      ['Systemes operationnels', 'Infrastructure IT + trading active', 'IT + Ops', 'Tests validés'],
      ['Premiers trades', 'Contrats forward executes avec succes', 'Trading Team', 'Volume An1 >10K tonnes']
    ];

    this.addCompactTable(successHeaders, successRows, {
      columnStyles: {
        0: { cellWidth: 35, fontStyle: 'bold' },
        1: { cellWidth: 45 },
        2: { cellWidth: 25 },
        3: { cellWidth: 30 }
      }
    });

    // Message final
    this.addRichText(
      'DECISION FINALE: Nous recommandons le lancement immediat du bureau de trading Neskao à Paris. ' +
      'Cette decision s\'appuie sur une analyse rigoureuse et objective privilegiant l\'impact social, ' +
      'la viabilite economique et l\'alignement strategique. Paris offre l\'ecosystem optimal pour faire ' +
      'de Neskao un acteur de reference du trading durable de cacao.',
      'highlight'
    );

    this.addFooter();
  }

  public async generateExhaustiveReport(): Promise<Blob> {
    try {
      let coverImage: string | undefined;
      let neskaroLogo: string | undefined;
      let mereyaLogo: string | undefined;
      
      try {
        coverImage = await this.loadImageAsBase64('./images/PageDeGarde.png');
      } catch (error) {
        console.warn('Impossible de charger la page de garde:', error);
      }
      
      try {
        neskaroLogo = await this.loadImageAsBase64('./images/Logo NESKAO.jpeg');
      } catch (error) {
        console.warn('Impossible de charger le logo Neskao:', error);
      }
      
      try {
        mereyaLogo = await this.loadImageAsBase64('./images/Logo MEREYA.png');
      } catch (error) {
        console.warn('Impossible de charger le logo Mereya:', error);
      }
      
      // Page de garde
      this.addCoverPage(coverImage);
      
      // Table des matieres
      await this.addTableOfContents(neskaroLogo, mereyaLogo);
      
      // TOUTES LES SECTIONS - Version exhaustive complète
      await this.addExhaustiveDashboard(neskaroLogo, mereyaLogo);
      await this.addContexteSection(neskaroLogo, mereyaLogo);
      await this.addReglementationComplete(neskaroLogo, mereyaLogo);
      await this.addMixProduitsComplet(neskaroLogo, mereyaLogo);
      await this.addSGAComplete(neskaroLogo, mereyaLogo);
      await this.addRentabiliteComplete(neskaroLogo, mereyaLogo);
      await this.addFinancementComplete(neskaroLogo, mereyaLogo);
      await this.addImpactSocialComplete(neskaroLogo, mereyaLogo);
      await this.addAnalyseDecisionnelleComplete(neskaroLogo, mereyaLogo);
      await this.addRisquesComplete(neskaroLogo, mereyaLogo);
      await this.addNextStepsComplete(neskaroLogo, mereyaLogo);
      await this.addRecommandationsFinales(neskaroLogo, mereyaLogo);
      
      return this.doc.output('blob');
    } catch (error) {
      console.error('Erreur génération PDF exhaustif:', error);
      throw error;
    }
  }

  private async loadImageAsBase64(imagePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Impossible de créer le contexte canvas'));
          return;
        }
        
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };
      
      img.onerror = () => reject(new Error(`Impossible de charger l'image: ${imagePath}`));
      img.src = imagePath;
    });
  }
}

export default ExhaustivePDFGenerator;