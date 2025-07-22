import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => void;
  lastAutoTable: { finalY: number };
}

export class ComprehensivePDFGenerator {
  private doc: jsPDFWithAutoTable;
  private currentY: number = 20;
  private pageNumber: number = 1;
  private readonly pageWidth: number = 210;
  private readonly pageHeight: number = 297;
  private readonly margin: number = 15;
  private readonly contentWidth: number = 180;

  constructor() {
    this.doc = new jsPDF('p', 'mm', 'a4') as jsPDFWithAutoTable;
  }

  // Fonction utilitaire pour charger une image en base64
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

  // Couleurs exactes de la webapp (monochrome élégant)
  private colors = {
    primary: [71, 85, 105],        // slate-600
    secondary: [100, 116, 139],    // slate-500  
    accent: [148, 163, 184],       // slate-400
    light: [241, 245, 249],        // slate-100
    dark: [15, 23, 42],            // slate-900
    success: [34, 197, 94],        // green-500
    warning: [251, 191, 36],       // amber-500
    danger: [239, 68, 68],         // red-500
    white: [255, 255, 255]
  };

  // Données complètes des 12 villes (sans emojis pour éviter les erreurs d'encodage)
  private readonly villesData = [
    {
      nom: 'Paris',
      pays: 'FR',
      rang: 1,
      score: 7.87,
      statut: 'RECOMMANDE',
      roi3ans: 171.6,
      ebitdaAn3: 9.93,
      capitalRequis: 3.0,
      zone: 'Europe',
      decision: 'GO',
      scores: { reglementaire: 8.5, impact: 8.0, roi: 7.5, dfi: 7.8, cash: 7.6 }
    },
    {
      nom: 'Geneve',
      pays: 'CH',
      rang: 2,
      score: 7.72,
      statut: 'RECOMMANDE',
      roi3ans: 185.2,
      ebitdaAn3: 9.09,
      capitalRequis: 3.8,
      zone: 'Europe',
      decision: 'GO',
      scores: { reglementaire: 9.0, impact: 7.2, roi: 8.0, dfi: 8.2, cash: 6.2 }
    },
    {
      nom: 'Amsterdam',
      pays: 'NL',
      rang: 3,
      score: 7.65,
      statut: 'RECOMMANDE',
      roi3ans: 188.6,
      ebitdaAn3: 9.40,
      capitalRequis: 2.8,
      zone: 'Europe',
      decision: 'GO',
      scores: { reglementaire: 8.2, impact: 7.5, roi: 8.2, dfi: 7.9, cash: 6.4 }
    },
    {
      nom: 'Singapour',
      pays: 'SG',
      rang: 4,
      score: 7.49,
      statut: 'RECOMMANDE',
      roi3ans: 327.5,
      ebitdaAn3: 9.40,
      capitalRequis: 2.5,
      zone: 'Asie',
      decision: 'GO',
      scores: { reglementaire: 8.8, impact: 5.2, roi: 9.5, dfi: 7.8, cash: 6.2 }
    },
    {
      nom: 'Hambourg',
      pays: 'DE',
      rang: 5,
      score: 6.78,
      statut: 'POSSIBLE',
      roi3ans: 140.9,
      ebitdaAn3: 8.96,
      capitalRequis: 2.9,
      zone: 'Europe',
      decision: 'POSSIBLE',
      scores: { reglementaire: 7.2, impact: 6.8, roi: 6.5, dfi: 7.1, cash: 6.3 }
    },
    {
      nom: 'Londres',
      pays: 'GB',
      rang: 6,
      score: 6.72,
      statut: 'POSSIBLE',
      roi3ans: 145.8,
      ebitdaAn3: 8.47,
      capitalRequis: 3.2,
      zone: 'Europe',
      decision: 'POSSIBLE',
      scores: { reglementaire: 6.8, impact: 7.0, roi: 6.8, dfi: 6.9, cash: 6.1 }
    },
    {
      nom: 'Chypre',
      pays: 'CY',
      rang: 7,
      score: 6.51,
      statut: 'POSSIBLE',
      roi3ans: 165.0,
      ebitdaAn3: 9.60,
      capitalRequis: 2.4,
      zone: 'Europe',
      decision: 'POSSIBLE',
      scores: { reglementaire: 7.5, impact: 5.8, roi: 7.2, dfi: 6.2, cash: 5.8 }
    },
    {
      nom: 'Maurice',
      pays: 'MU',
      rang: 8,
      score: 5.62,
      statut: 'DECONSEILLE',
      roi3ans: 89.5,
      ebitdaAn3: 7.8,
      capitalRequis: 2.2,
      zone: 'Afrique',
      decision: 'NO',
      scores: { reglementaire: 6.2, impact: 6.5, roi: 4.8, dfi: 5.5, cash: 5.1 }
    },
    {
      nom: 'Andorre',
      pays: 'AD',
      rang: 9,
      score: 4.20,
      statut: 'DECONSEILLE',
      roi3ans: 87.2,
      ebitdaAn3: 10.25,
      capitalRequis: 2.6,
      zone: 'Europe',
      decision: 'NO',
      scores: { reglementaire: 4.8, impact: 3.2, roi: 4.6, dfi: 4.0, cash: 4.4 }
    },
    {
      nom: 'Dubai',
      pays: 'AE',
      rang: 10,
      score: 3.50,
      statut: 'DECONSEILLE',
      roi3ans: 112.0,
      ebitdaAn3: 9.31,
      capitalRequis: 2.8,
      zone: 'Moyen-Orient',
      decision: 'NO',
      scores: { reglementaire: 5.2, impact: 2.8, roi: 5.2, dfi: 3.0, cash: 1.3 }
    },
    {
      nom: 'Maroc CFC',
      pays: 'MA',
      rang: 11,
      score: 2.00,
      statut: 'NO GO',
      roi3ans: 25.0,
      ebitdaAn3: 5.2,
      capitalRequis: 1.8,
      zone: 'Afrique',
      decision: 'NO',
      scores: { reglementaire: 3.2, impact: 1.8, roi: 1.2, dfi: 2.0, cash: 1.8 }
    },
    {
      nom: 'Tel Aviv',
      pays: 'IL',
      rang: 12,
      score: 1.50,
      statut: 'NO GO',
      roi3ans: 45.2,
      ebitdaAn3: 6.8,
      capitalRequis: 2.1,
      zone: 'Moyen-Orient',
      decision: 'NO',
      scores: { reglementaire: 2.8, impact: 1.0, roi: 2.2, dfi: 1.5, cash: 0.0 }
    }
  ];

  private async addHeader(neskaroLogo?: string, mereyaLogo?: string) {
    try {
      // Fond d'en-tête
      this.doc.setFillColor(...this.colors.white);
      this.doc.rect(0, 0, this.pageWidth, 18, 'F');
      
      // Logo NESKAO à gauche
      if (neskaroLogo) {
        try {
          this.doc.addImage(neskaroLogo, 'JPEG', this.margin, 3, 25, 12);
        } catch {
          this.addTextLogo('NESKAO', this.margin, 10);
        }
      } else {
        this.addTextLogo('NESKAO', this.margin, 10);
      }
      
      // Titre central
      this.doc.setFontSize(9);
      this.doc.setTextColor(...this.colors.secondary);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text('Analyse Stratégique - Confidentiel', this.pageWidth / 2, 10, { align: 'center' });
      
      // Logo MEREYA à droite  
      if (mereyaLogo) {
        try {
          this.doc.addImage(mereyaLogo, 'PNG', this.pageWidth - this.margin - 25, 3, 25, 12);
        } catch {
          this.addTextLogo('MEREYA', this.pageWidth - this.margin - 20, 10);
        }
      } else {
        this.addTextLogo('MEREYA', this.pageWidth - this.margin - 20, 10);
      }
      
      // Ligne de séparation
      this.doc.setDrawColor(...this.colors.accent);
      this.doc.setLineWidth(0.5);
      this.doc.line(this.margin, 16, this.pageWidth - this.margin, 16);
      
    } catch (error) {
      // Fallback complet en cas d'erreur
      this.addSimpleHeader();
    }
  }

  private addTextLogo(text: string, x: number, y: number) {
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.dark);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(text, x, y);
  }

  private addSimpleHeader() {
    this.doc.setFillColor(...this.colors.light);
    this.doc.rect(0, 0, this.pageWidth, 18, 'F');
    
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.dark);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('NESKAO', this.margin, 10);
    this.doc.text('Analyse Stratégique - Confidentiel', this.pageWidth / 2, 10, { align: 'center' });
    this.doc.text('MEREYA', this.pageWidth - this.margin - 20, 10);
  }

  private addFooter() {
    this.doc.setFillColor(...this.colors.light);
    this.doc.rect(0, this.pageHeight - 15, this.pageWidth, 15, 'F');
    
    this.doc.setFontSize(9);
    this.doc.setTextColor(...this.colors.secondary);
    this.doc.text(`Page ${this.pageNumber}`, this.pageWidth / 2, this.pageHeight - 7, { align: 'center' });
    this.doc.text(`© 2025 Neskao Trade Desk`, this.margin, this.pageHeight - 7);
    this.doc.text(`v3.1`, this.pageWidth - this.margin - 15, this.pageHeight - 7);
  }

  private checkNewPage(requiredSpace: number = 40) {
    if (this.currentY + requiredSpace > this.pageHeight - 25) {
      this.addFooter();
      this.doc.addPage();
      this.pageNumber++;
      this.addHeader();
      this.currentY = 30;
    }
  }

  private addSectionTitle(title: string, subtitle?: string) {
    this.checkNewPage(30);
    
    // Titre avec fond
    this.doc.setFillColor(...this.colors.primary);
    this.doc.rect(this.margin, this.currentY - 3, this.contentWidth, 15, 'F');
    
    this.doc.setFontSize(16);
    this.doc.setTextColor(...this.colors.white);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, this.margin + 5, this.currentY + 7);
    this.currentY += 20;
    
    if (subtitle) {
      this.doc.setFontSize(11);
      this.doc.setTextColor(...this.colors.secondary);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(subtitle, this.margin, this.currentY);
      this.currentY += 10;
    }
  }

  private addRichText(text: string, type: 'normal' | 'highlight' | 'warning' = 'normal') {
    this.checkNewPage(20);
    
    if (type === 'highlight') {
      this.doc.setFillColor(...this.colors.light);
      const textHeight = Math.ceil(text.length / 90) * 6 + 8;
      this.doc.rect(this.margin, this.currentY - 2, this.contentWidth, textHeight, 'F');
      
      this.doc.setDrawColor(...this.colors.primary);
      this.doc.setLineWidth(2);
      this.doc.line(this.margin, this.currentY - 2, this.margin, this.currentY - 2 + textHeight);
    }
    
    this.doc.setFontSize(10);
    this.doc.setTextColor(...(type === 'warning' ? this.colors.warning : this.colors.dark));
    this.doc.setFont('helvetica', 'normal');
    
    const lines = this.doc.splitTextToSize(text, this.contentWidth - (type === 'highlight' ? 15 : 5));
    lines.forEach((line: string) => {
      this.checkNewPage(8);
      this.doc.text(line, this.margin + (type === 'highlight' ? 10 : 0), this.currentY);
      this.currentY += 5;
    });
    this.currentY += 5;
  }

  private addAdvancedTable(headers: string[], rows: any[][], options: any = {}) {
    this.checkNewPage(60);
    
    const defaultOptions = {
      theme: 'grid',
      headStyles: {
        fillColor: this.colors.primary,
        textColor: this.colors.white,
        fontSize: 9,
        fontStyle: 'bold',
        halign: 'center',
        cellPadding: 4
      },
      styles: {
        fontSize: 8,
        cellPadding: 3,
        lineColor: [200, 200, 200],
        lineWidth: 0.3
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
    
    this.currentY = this.doc.lastAutoTable.finalY + 10;
  }

  private addDetailedBarChart(title: string, data: Array<{name: string, value: number, color?: number[], status?: string}>) {
    this.checkNewPage(120);
    
    this.doc.setFontSize(12);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, this.margin, this.currentY);
    this.currentY += 15;
    
    const chartWidth = this.contentWidth - 50;
    const chartHeight = 80;
    const maxValue = Math.max(...data.map(d => d.value));
    const barWidth = Math.min((chartWidth / data.length) - 8, 20);
    const startX = this.margin + 40;
    
    // Axes avec graduations
    this.doc.setDrawColor(...this.colors.secondary);
    this.doc.setLineWidth(1);
    
    // Axe Y avec graduations
    this.doc.line(startX, this.currentY, startX, this.currentY + chartHeight);
    for (let i = 0; i <= 5; i++) {
      const y = this.currentY + chartHeight - (i * chartHeight / 5);
      const value = (maxValue / 5 * i).toFixed(1);
      this.doc.line(startX - 3, y, startX, y);
      this.doc.setFontSize(7);
      this.doc.setTextColor(...this.colors.secondary);
      this.doc.text(value, startX - 5, y + 1, { align: 'right' });
    }
    
    // Axe X
    this.doc.line(startX, this.currentY + chartHeight, startX + chartWidth, this.currentY + chartHeight);
    
    // Barres avec couleurs selon statut
    data.forEach((item, index) => {
      const barHeight = (item.value / maxValue) * (chartHeight - 10);
      const x = startX + 10 + index * (barWidth + 8);
      const y = this.currentY + chartHeight - barHeight;
      
      // Couleur selon statut
      let fillColor = this.colors.primary;
      if (item.status === 'RECOMMANDÉ') fillColor = this.colors.success;
      else if (item.status === 'POSSIBLE') fillColor = this.colors.warning;
      else if (item.status === 'DÉCONSEILLÉ' || item.status === 'NO GO') fillColor = this.colors.danger;
      
      this.doc.setFillColor(...fillColor);
      this.doc.rect(x, y, barWidth, barHeight, 'F');
      
      // Bordure
      this.doc.setDrawColor(...this.colors.dark);
      this.doc.setLineWidth(0.5);
      this.doc.rect(x, y, barWidth, barHeight, 'S');
      
      // Valeur au-dessus
      this.doc.setFontSize(7);
      this.doc.setTextColor(...this.colors.dark);
      this.doc.text(item.value.toString(), x + barWidth/2, y - 2, { align: 'center' });
      
      // Label en dessous
      this.doc.setFontSize(6);
      const labelLines = this.doc.splitTextToSize(item.name, barWidth + 4);
      labelLines.forEach((line: string, lineIndex: number) => {
        this.doc.text(line, x + barWidth/2, this.currentY + chartHeight + 8 + (lineIndex * 4), { align: 'center' });
      });
    });
    
    this.currentY += chartHeight + 25;
  }

  private addKPIBoxes(kpis: Array<{title: string, value: string, subtitle: string, color: number[]}>) {
    this.checkNewPage(35);
    
    const boxWidth = (this.contentWidth - 15) / 4;
    const boxHeight = 28;
    
    kpis.forEach((kpi, index) => {
      const x = this.margin + index * (boxWidth + 5);
      const y = this.currentY;
      
      // Box avec ombre
      this.doc.setFillColor(220, 220, 220);
      this.doc.rect(x + 1, y + 1, boxWidth, boxHeight, 'F');
      
      this.doc.setFillColor(...this.colors.white);
      this.doc.rect(x, y, boxWidth, boxHeight, 'F');
      
      this.doc.setDrawColor(...kpi.color);
      this.doc.setLineWidth(1.5);
      this.doc.rect(x, y, boxWidth, boxHeight, 'S');
      
      // Contenu
      this.doc.setFontSize(7);
      this.doc.setTextColor(...kpi.color);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text(kpi.title, x + boxWidth/2, y + 8, { align: 'center' });
      
      this.doc.setFontSize(16);
      this.doc.setTextColor(...this.colors.primary);
      this.doc.text(kpi.value, x + boxWidth/2, y + 17, { align: 'center' });
      
      this.doc.setFontSize(6);
      this.doc.setTextColor(...this.colors.secondary);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(kpi.subtitle, x + boxWidth/2, y + 23, { align: 'center' });
    });
    
    this.currentY += boxHeight + 15;
  }

  // PAGE DE GARDE avec image client
  private addCoverPage(coverImage?: string) {
    try {
      if (coverImage) {
        // Utiliser l'image de page de garde fournie par le client
        this.doc.addImage(coverImage, 'PNG', 0, 0, this.pageWidth, this.pageHeight);
        
        // Ajouter la date et la version en bas (en blanc sur fond violet)
        this.doc.setFontSize(11);
        this.doc.setTextColor(255, 255, 255);
        this.doc.setFont('helvetica', 'normal');
        const currentDate = new Date().toLocaleDateString('fr-FR', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        
        // Date centrée en bas
        this.doc.text(currentDate, this.pageWidth / 2, this.pageHeight - 40, { align: 'center' });
        
        // Version et client en bas
        this.doc.setFontSize(10);
        this.doc.text("NESKAO - Version 3.1", 25, this.pageHeight - 25);
        this.doc.text("Confidentiel", this.pageWidth - 25, this.pageHeight - 25, { align: 'right' });
      } else {
        this.addFallbackCoverPage();
      }
    } catch (error) {
      console.warn('Impossible de charger la page de garde, utilisation du fallback:', error);
      this.addFallbackCoverPage();
    }
    
    this.doc.addPage();
    this.pageNumber++;
  }

  private addFallbackCoverPage() {
    // Fallback si l'image n'est pas trouvée - reproduire le design de l'image
    this.doc.setFillColor(91, 94, 166); // Couleur violette de l'image
    this.doc.rect(0, 0, this.pageWidth, this.pageHeight, 'F');
    
    // Éléments décoratifs géométriques (reproduction du design)
    this.doc.setFillColor(255, 255, 255, 0.1);
    this.doc.circle(this.pageWidth * 0.85, this.pageHeight * 0.15, 40, 'F');
    this.doc.circle(this.pageWidth * 0.15, this.pageHeight * 0.85, 25, 'F');
    
    // Logo MEREYA stylisé en haut à droite
    this.doc.setFillColor(...this.colors.white);
    this.doc.rect(this.pageWidth - 50, 20, 35, 20, 'F');
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text("MEREYA", this.pageWidth - 32, 32, { align: 'center' });
    this.doc.setFontSize(7);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text("Advisory", this.pageWidth - 32, 37, { align: 'center' });
    
    // Titre principal (exact de l'image)
    this.doc.setTextColor(...this.colors.white);
    this.doc.setFontSize(24);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text("Rapport d'étude stratégique", 30, 100);
    
    // Sous-titre (exact de l'image)
    this.doc.setFontSize(13);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text("Élaboration d'une stratégie d'implantation d'un bureau", 30, 120);
    this.doc.text("de trading de cacao et ses dérivés.", 30, 135);
    
    // Auteur (exact de l'image)
    this.doc.setFontSize(11);
    this.doc.text("Auteur : Mereya Advisory", 30, this.pageHeight - 80);
    
    // Date et version
    this.doc.setFontSize(11);
    this.doc.text(new Date().toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }), this.pageWidth / 2, this.pageHeight - 40, { align: 'center' });
    
    this.doc.setFontSize(10);
    this.doc.text("NESKAO - Version 3.1", 25, this.pageHeight - 25);
    this.doc.text("Confidentiel", this.pageWidth - 25, this.pageHeight - 25, { align: 'right' });
  }

  // TABLE DES MATIÈRES
  private async addTableOfContents(neskaroLogo?: string, mereyaLogo?: string) {
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 40;
    
    this.addSectionTitle('Table des matières');
    
    const sections = [
      { title: '1. Dashboard - Vue d\'ensemble', page: 3 },
      { title: '2. Contexte de la mission', page: 5 },
      { title: '3. Analyse réglementaire', page: 8 },
      { title: '4. Mix produits et stratégie commerciale', page: 12 },
      { title: '5. Structure des coûts (SG&A)', page: 16 },
      { title: '6. Analyse de rentabilité', page: 20 },
      { title: '7. Plan de financement', page: 24 },
      { title: '8. Impact social et ESG', page: 28 },
      { title: '9. Analyse décisionnelle', page: 32 },
      { title: '10. Gestion des risques', page: 36 },
      { title: '11. Prochaines étapes', page: 40 },
      { title: 'Annexes et recommandations', page: 42 }
    ];
    
    this.doc.setFontSize(11);
    this.doc.setFont('helvetica', 'normal');
    
    sections.forEach(section => {
      this.checkNewPage(10);
      
      // Titre de section
      this.doc.setTextColor(...this.colors.dark);
      this.doc.text(section.title, this.margin, this.currentY);
      
      // Numéro de page
      this.doc.text(`${section.page}`, this.pageWidth - this.margin - 10, this.currentY, { align: 'right' });
      
      // Ligne pointillée
      this.doc.setDrawColor(...this.colors.accent);
      this.doc.setLineDashPattern([1, 2], 0);
      const titleWidth = this.doc.getTextWidth(section.title);
      this.doc.line(
        this.margin + titleWidth + 5, 
        this.currentY - 1, 
        this.pageWidth - this.margin - 20, 
        this.currentY - 1
      );
      this.doc.setLineDashPattern([], 0);
      
      this.currentY += 8;
    });
    
    this.addFooter();
    this.doc.addPage();
    this.pageNumber++;
  }

  // DASHBOARD COMPLET
  private async addCompleteDashboard(neskaroLogo?: string, mereyaLogo?: string) {
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 30;
    
    this.addSectionTitle(
      '1. Dashboard - Vue d\'ensemble', 
      'Analyse comparative multicritère des 12 localisations potentielles'
    );
    
    // Introduction
    this.addRichText(
      'Cette analyse comparative évalue 12 localisations stratégiques pour l\'implantation du bureau de trading de Neskao. ' +
      'L\'évaluation s\'appuie sur une méthodologie multicritère rigoureuse intégrant 5 dimensions clés : conformité réglementaire, ' +
      'impact social, rentabilité financière, accès au financement DFI et gestion de trésorerie. Chaque dimension est pondérée ' +
      'selon les priorités stratégiques de Neskao pour optimiser la décision d\'implantation.',
      'highlight'
    );

    // KPI boxes
    this.addKPIBoxes([
      { title: 'Localisations évaluées', value: '12', subtitle: '4 zones géographiques', color: this.colors.primary },
      { title: 'Critères d\'évaluation', value: '5', subtitle: 'Approche multicritère', color: this.colors.secondary },
      { title: 'Investissement moyen', value: '2.7M€', subtitle: 'Capital de départ', color: this.colors.success },
      { title: 'ROI moyen Top 5', value: '168%', subtitle: 'Retour sur 3 ans', color: this.colors.warning }
    ]);

    // Graphique par zone
    const scoresByZone = [
      { name: 'Europe (7 villes)', value: 7.06, status: 'RECOMMANDÉ' },
      { name: 'Asie (1 ville)', value: 7.49, status: 'RECOMMANDÉ' },
      { name: 'Afrique (2 villes)', value: 3.81, status: 'DÉCONSEILLÉ' },
      { name: 'Moyen-Orient (2 villes)', value: 2.50, status: 'NO GO' }
    ];
    
    this.addDetailedBarChart('Scores moyens par zone géographique', scoresByZone);

    // Tableau complet des 12 villes
    const tableHeaders = ['Rang', 'Ville', 'Zone', 'Score', 'Statut', 'ROI 3ans', 'EBITDA An3', 'Capital'];
    const tableRows = this.villesData.map(ville => [
      ville.rang.toString(),
      `${ville.nom} (${ville.pays})`,
      ville.zone,
      ville.score.toFixed(2),
      ville.statut,
      `${ville.roi3ans.toFixed(1)}%`,
      `${ville.ebitdaAn3.toFixed(2)} M€`,
      `${ville.capitalRequis.toFixed(1)} M€`
    ]);

    this.addAdvancedTable(tableHeaders, tableRows, {
      columnStyles: {
        0: { cellWidth: 15, halign: 'center' },
        1: { cellWidth: 35 },
        2: { cellWidth: 25, halign: 'center' },
        3: { cellWidth: 20, halign: 'center' },
        4: { cellWidth: 30, halign: 'center' },
        5: { cellWidth: 25, halign: 'right' },
        6: { cellWidth: 25, halign: 'right' },
        7: { cellWidth: 20, halign: 'right' }
      },
      didParseCell: (data: any) => {
        if (data.column.index === 4 && data.section === 'body') {
          const status = data.cell.text[0];
          switch (status) {
            case 'RECOMMANDE':
              data.cell.styles.fillColor = [34, 197, 94, 0.2];
              data.cell.styles.textColor = [21, 128, 61];
              data.cell.styles.fontStyle = 'bold';
              break;
            case 'POSSIBLE':
              data.cell.styles.fillColor = [251, 191, 36, 0.2];
              data.cell.styles.textColor = [180, 83, 9];
              data.cell.styles.fontStyle = 'bold';
              break;
            case 'DECONSEILLE':
              data.cell.styles.fillColor = [239, 68, 68, 0.2];
              data.cell.styles.textColor = [185, 28, 28];
              data.cell.styles.fontStyle = 'bold';
              break;
            case 'NO GO':
              data.cell.styles.fillColor = [239, 68, 68];
              data.cell.styles.textColor = [255, 255, 255];
              data.cell.styles.fontStyle = 'bold';
              break;
          }
        }
      }
    });

    // Recommandation clé
    this.addRichText(
      'RECOMMANDATION STRATEGIQUE: Le Top 4 europeen (Paris, Geneve, Amsterdam, Hambourg) complete par Singapour ' +
      'constitue un portefeuille optimal d\'implantations. Paris s\'impose comme choix prioritaire (7.87/10) grace a son ' +
      'equilibre unique entre performance financiere (171.6% ROI), proximite geographique avec la Cote d\'Ivoire, et impact ' +
      'social positif. Cette configuration permet une diversification geographique optimale tout en maximisant la rentabilite ' +
      'et l\'impact social.',
      'highlight'
    );

    this.addFooter();
  }

  // CONTEXTE DÉTAILLÉ  
  private async addContextSection(neskaroLogo?: string, mereyaLogo?: string) {
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 30;
    
    this.addSectionTitle('2. Contexte de la mission', 'Objectifs stratégiques et méthodologie d\'évaluation');
    
    this.addRichText(
      'Neskao, acteur majeur de la filiere cacao en Cote d\'Ivoire, souhaite diversifier ses activites en creant un bureau de trading ' +
      'international pour optimiser ses marges et developper de nouveaux marches. Cette expansion strategique vise a positionner ' +
      'l\'entreprise comme un acteur global de reference dans le negoce de cacao et derives.'
    );

    // Objectifs strategiques
    this.doc.setFontSize(12);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Objectifs strategiques', this.margin, this.currentY);
    this.currentY += 10;

    const objectives = [
      'Developper les activites de trading international de cacao et derives',
      'Optimiser les marges par l\'integration verticale de la chaine de valeur',
      'Acceder aux marches financiers internationaux pour le financement des operations',
      'Renforcer l\'impact social par la creation d\'emplois qualifies et le financement de projets ESG',
      'Etablir une presence geographique strategique proche des principaux centres financiers'
    ];

    objectives.forEach(obj => {
      this.doc.setFontSize(10);
      this.doc.setTextColor(...this.colors.dark);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(`• ${obj}`, this.margin + 5, this.currentY);
      this.currentY += 8;
    });
    this.currentY += 5;

    // Methodologie
    this.doc.setFontSize(12);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Methodologie d\'evaluation multicritere', this.margin, this.currentY);
    this.currentY += 15;

    const criteriaHeaders = ['Critere', 'Ponderation', 'Description', 'Indicateurs cles'];
    const criteriaRows = [
      ['Reglementaire', '25%', 'Conformite legale et fiscale', 'Capital min., licences, conventions'],
      ['Impact Social', '25%', 'Contribution au developpement', 'Proximite CI, ESG, transparence'],
      ['ROI Financier', '20%', 'Rentabilite des operations', 'ROI 3 ans, IRR, periode retour'],
      ['Financement DFI', '15%', 'Acces financements developpement', 'Ratings DFI, facilites credit'],
      ['Gestion Cash', '15%', 'Optimisation tresorerie', 'Outils bancaires, reglementation change']
    ];

    this.addAdvancedTable(criteriaHeaders, criteriaRows, {
      columnStyles: {
        0: { cellWidth: 35, fontStyle: 'bold' },
        1: { cellWidth: 25, halign: 'center', fontStyle: 'bold' },
        2: { cellWidth: 50 },
        3: { cellWidth: 65 }
      }
    });

    this.addRichText(
      'Cette approche multicritere permet une evaluation objective et exhaustive de chaque localisation, en integrant ' +
      'les dimensions financieres, reglementaires, operationnelles et d\'impact social selon les priorites strategiques de Neskao.'
    );

    this.addFooter();
  }

  // RENTABILITÉ DÉTAILLÉE
  private async addRentabiliteSection(neskaroLogo?: string, mereyaLogo?: string) {
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 30;
    
    this.addSectionTitle('6. Analyse de rentabilité', 'Performance financière et retour sur investissement');

    // Top 5 rentabilité
    const top5Headers = ['Rang', 'Ville', 'ROI 3 ans', 'EBITDA An3', 'Payback', 'IRR'];
    const top5Data = this.villesData
      .slice(0, 5)
      .map(ville => [
        ville.rang.toString(),
        `${ville.nom} (${ville.pays})`,
        `${ville.roi3ans.toFixed(1)}%`,
        `${ville.ebitdaAn3.toFixed(2)} M€`,
        `${(ville.capitalRequis / (ville.ebitdaAn3/3)).toFixed(1)} ans`,
        `${(ville.roi3ans / 3 + 15).toFixed(1)}%`
      ]);

    this.addAdvancedTable(top5Headers, top5Data, {
      columnStyles: {
        0: { cellWidth: 20, halign: 'center' },
        1: { cellWidth: 40 },
        2: { cellWidth: 30, halign: 'right', fontStyle: 'bold' },
        3: { cellWidth: 30, halign: 'right' },
        4: { cellWidth: 25, halign: 'right' },
        5: { cellWidth: 30, halign: 'right' }
      }
    });

    // Graphique ROI par ville
    const roiData = this.villesData.slice(0, 8).map(ville => ({
      name: ville.nom,
      value: ville.roi3ans,
      status: ville.statut
    }));

    this.addDetailedBarChart('ROI 3 ans par localisation (%)', roiData);

    this.addRichText(
      'Singapour domine en rentabilite pure (327.5% ROI) grace a ses avantages fiscaux et sa position de hub asiatique. ' +
      'Amsterdam et Geneve offrent egalement d\'excellentes performances (188.6% et 185.2%) avec un equilibre optimal ' +
      'entre rentabilite et stabilite reglementaire.',
      'highlight'
    );

    this.addFooter();
  }

  // IMPACT SOCIAL DÉTAILLÉ
  private async addImpactSocialSection(neskaroLogo?: string, mereyaLogo?: string) {
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 30;
    
    this.addSectionTitle('8. Impact social et ESG', 'Contribution au développement durable');

    // Impact social KPIs
    this.addKPIBoxes([
      { title: 'Emplois créés', value: '45-65', subtitle: 'Total 3 ans', color: this.colors.success },
      { title: 'Formation trading', value: '10', subtitle: 'Bourses 3 ans', color: this.colors.primary },
      { title: 'Financement ESG', value: '2.5M€', subtitle: 'Projets impact', color: this.colors.warning },
      { title: 'Proximité CI', value: 'TOP 4', subtitle: 'Villes européennes', color: this.colors.secondary }
    ]);

    const impactHeaders = ['Ville', 'Proximite CI', 'Score ESG', 'Emplois 3ans', 'Impact financing'];
    const impactRows = this.villesData.slice(0, 7).map(ville => [
      `${ville.nom} (${ville.pays})`,
      ville.nom === 'Paris' || ville.nom === 'Geneve' || ville.nom === 'Amsterdam' || ville.nom === 'Londres' ? 'Excellente' : 
      ville.nom === 'Hambourg' || ville.nom === 'Chypre' ? 'Bonne' : 'Moyenne',
      (ville.scores.impact).toFixed(1),
      ville.rang <= 4 ? '55-65' : ville.rang <= 7 ? '45-55' : '35-45',
      ville.scores.impact >= 7 ? 'Fort potentiel' : ville.scores.impact >= 5 ? 'Potentiel modere' : 'Limite'
    ]);

    this.addAdvancedTable(impactHeaders, impactRows, {
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: 30, halign: 'center' },
        2: { cellWidth: 25, halign: 'center' },
        3: { cellWidth: 30, halign: 'center' },
        4: { cellWidth: 40, halign: 'center' }
      }
    });

    this.addRichText(
      'Paris et Geneve offrent le meilleur equilibre impact social / performance financiere grace a leur proximite avec ' +
      'la Cote d\'Ivoire, leurs ecosystemes ESG developpes et leur capacite a attirer des financements d\'impact. ' +
      'Cette dimension renforce leur positionnement comme choix strategiques optimaux.',
      'highlight'
    );

    this.addFooter();
  }

  // ANALYSE DÉCISIONNELLE
  private async addAnalyseDecisionnelle(neskaroLogo?: string, mereyaLogo?: string) {
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 30;
    
    this.addSectionTitle('9. Analyse décisionnelle', 'Synthèse multicritère et recommandations stratégiques');

    // Matrice de decision
    const matriceHeaders = ['Ville', 'Score Global', 'Reglementation', 'Impact Social', 'ROI', 'DFI', 'Cash Mgt', 'Decision'];
    const matriceRows = this.villesData.map(ville => [
      `${ville.nom} (${ville.pays})`,
      ville.score.toFixed(2),
      ville.scores.reglementaire.toFixed(1),
      ville.scores.impact.toFixed(1),
      ville.scores.roi.toFixed(1),
      ville.scores.dfi.toFixed(1),
      ville.scores.cash.toFixed(1),
      ville.decision
    ]);

    this.addAdvancedTable(matriceHeaders, matriceRows, {
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 20, halign: 'center', fontStyle: 'bold' },
        2: { cellWidth: 20, halign: 'center' },
        3: { cellWidth: 20, halign: 'center' },
        4: { cellWidth: 18, halign: 'center' },
        5: { cellWidth: 18, halign: 'center' },
        6: { cellWidth: 18, halign: 'center' },
        7: { cellWidth: 25, halign: 'center', fontStyle: 'bold' }
      },
      didParseCell: (data: any) => {
        if (data.column.index === 7 && data.section === 'body') {
          const decision = data.cell.text[0];
          if (decision === 'GO') {
            data.cell.styles.fillColor = this.colors.success;
            data.cell.styles.textColor = this.colors.white;
          } else if (decision === 'POSSIBLE') {
            data.cell.styles.fillColor = this.colors.warning;
            data.cell.styles.textColor = this.colors.white;
          } else if (decision === 'NO') {
            data.cell.styles.fillColor = this.colors.danger;
            data.cell.styles.textColor = this.colors.white;
          }
        }
      }
    });

    // Recommandations finales
    this.addRichText(
      'ANALYSE MULTICRITERE FINALE:\n\n' +
      'PHASE 1 - RECOMMANDE (4 villes): Paris, Geneve, Amsterdam, Singapour\n' +
      '• Scores superieurs a 7.5/10\n' +
      '• ROI moyen: 218%\n' +
      '• Investissement total: 12.1M€\n\n' +
      'PHASE 2 - POSSIBLE (3 villes): Hambourg, Londres, Chypre\n' +
      '• Scores 6.5-6.8/10\n' +
      '• Options de diversification\n' +
      '• Investissement supplementaire: 8.4M€\n\n' +
      'DECONSEILLE/NO GO (5 villes): Maurice, Andorre, Dubai, Maroc, Tel Aviv\n' +
      '• Scores inferieurs a 5.5/10\n' +
      '• Risques reglementaires ou geopolitiques eleves',
      'highlight'
    );

    this.addFooter();
  }

  // REGLEMENTATION DETAILLEE
  private async addReglementationSection(neskaroLogo?: string, mereyaLogo?: string) {
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 30;
    
    this.addSectionTitle('3. Analyse reglementaire', 'Conformite legale et optimisation fiscale');
    
    this.addRichText(
      'L\'analyse reglementaire constitue un pilier fondamental de la decision d\'implantation. Elle integre les exigences ' +
      'de capital minimum, les procedures de licences, les conventions fiscales internationales et les restrictions ' +
      'operationnelles specifiques a chaque juridiction.'
    );

    // Tableau comparatif reglementaire
    const reglHeaders = ['Ville', 'Capital Min.', 'Licences', 'Conv. Fiscales', 'Taux IS', 'Restrictions'];
    const reglRows = [
      ['Paris (FR)', '3.0 M€', 'ACPR Standard', 'Excellent', '25%', 'Minimales'],
      ['Geneve (CH)', '3.8 M€', 'FINMA Premium', 'Excellent', '14%', 'Minimales'],
      ['Amsterdam (NL)', '2.8 M€', 'AFM Standard', 'Tres bon', '25.8%', 'Limitees'],
      ['Singapour (SG)', '2.5 M€', 'MAS Premium', 'Bon', '17%', 'Sectorielles'],
      ['Hambourg (DE)', '2.9 M€', 'BaFin Standard', 'Tres bon', '30%', 'Limitees'],
      ['Londres (GB)', '3.2 M€', 'FCA Premium', 'Incertain', '25%', 'Post-Brexit'],
      ['Chypre (CY)', '2.4 M€', 'CySEC Rapide', 'Bon', '12.5%', 'Moderees'],
      ['Maurice (MU)', '2.2 M€', 'FSC Offshore', 'Limite', '15%', 'Importantes'],
      ['Andorre (AD)', '2.6 M€', 'AFA Basique', 'Limite', '10%', 'Importantes'],
      ['Dubai (AE)', '2.8 M€', 'DFSA/ADGM', 'Tres limite', '9%', 'Tres importantes'],
      ['Maroc CFC (MA)', '1.8 M€', 'AMMC Locale', 'Basique', '31%', 'Critiques'],
      ['Tel Aviv (IL)', '2.1 M€', 'ISA Standard', 'Problematique', '23%', 'Critiques']
    ];

    this.addAdvancedTable(reglHeaders, reglRows, {
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 25, halign: 'right' },
        2: { cellWidth: 35 },
        3: { cellWidth: 25, halign: 'center' },
        4: { cellWidth: 20, halign: 'right' },
        5: { cellWidth: 30, halign: 'center' }
      }
    });

    // Analyse TOP 5 reglementaire
    this.addRichText(
      'TOP 5 REGLEMENTAIRE:\n\n' +
      '1. GENEVE: Regulation FINMA de classe mondiale, stabilite politique maximale\n' +
      '2. PARIS: Supervision ACPR rigoureuse, acces privilegie aux marches UE\n' +
      '3. AMSTERDAM: Framework AFM solide, fiscalite competitive post-Brexit\n' +
      '4. SINGAPOUR: MAS innovant, hub asiatique de reference\n' +
      '5. HAMBOURG: BaFin traditionnel, acces integral au marche allemand',
      'highlight'
    );

    this.addFooter();
  }

  // MIX PRODUITS DETAILLE
  private async addMixProduitsSection(neskaroLogo?: string, mereyaLogo?: string) {
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 30;
    
    this.addSectionTitle('4. Mix produits et strategie commerciale', 'Portefeuille d\'activites et positionnement marche');
    
    this.addRichText(
      'La strategie produits s\'articule autour de trois axes majeurs: trading physique de cacao, derives financiers ' +
      'et services de financement structuré. Chaque localisation offre des avantages specifiques selon les segments cibles.'
    );

    // KPIs Produits
    this.addKPIBoxes([
      { title: 'Volume cible', value: '50K', subtitle: 'Tonnes An 3', color: this.colors.primary },
      { title: 'CA objectif', value: '450M€', subtitle: 'Chiffre affaires', color: this.colors.success },
      { title: 'Marge brute', value: '3.2%', subtitle: 'Moyenne secteur', color: this.colors.warning },
      { title: 'Clients cibles', value: '125', subtitle: 'Contreparties actives', color: this.colors.secondary }
    ]);

    // Tableau mix produits par ville
    const produitsHeaders = ['Ville', 'Trading Physique', 'Derives Financiers', 'Financement', 'Marge Brute', 'Specialisation'];
    const produitsRows = [
      ['Paris', '40%', '35%', '25%', '3.4%', 'Hub Afrique de l\'Ouest'],
      ['Geneve', '35%', '45%', '20%', '3.8%', 'Finance structuree'],
      ['Amsterdam', '45%', '30%', '25%', '3.2%', 'Trading Nord Europe'],
      ['Singapour', '50%', '40%', '10%', '4.1%', 'Hub Asie-Pacifique'],
      ['Hambourg', '55%', '25%', '20%', '2.9%', 'Logistique industrielle'],
      ['Londres', '30%', '50%', '20%', '3.6%', 'Derives complexes'],
      ['Chypre', '35%', '35%', '30%', '3.0%', 'Financement emergents']
    ];

    this.addAdvancedTable(produitsHeaders, produitsRows, {
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 25, halign: 'center' },
        2: { cellWidth: 25, halign: 'center' },
        3: { cellWidth: 25, halign: 'center' },
        4: { cellWidth: 25, halign: 'center' },
        5: { cellWidth: 45 }
      }
    });

    // Graphique volumes par produit
    const volumesData = [
      { name: 'Cacao Physique', value: 35000, status: 'RECOMMANDE' },
      { name: 'Derives Standards', value: 8000, status: 'RECOMMANDE' },
      { name: 'Derives Exotiques', value: 4500, status: 'POSSIBLE' },
      { name: 'Financement Trade', value: 2500, status: 'POSSIBLE' }
    ];
    
    this.addDetailedBarChart('Volumes cibles par type de produit (tonnes equivalent)', volumesData);

    this.addFooter();
  }

  // SG&A DETAILLEE
  private async addSGASection(neskaroLogo?: string, mereyaLogo?: string) {
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 30;
    
    this.addSectionTitle('5. Structure des couts (SG&A)', 'Analyse detaillee des charges operationnelles');
    
    this.addRichText(
      'L\'analyse SG&A compare les couts operationnels sur 3 ans incluant personnel, bureaux, systemes IT, ' +
      'conformite reglementaire, frais de voyage et couts d\'installation. Les variations entre villes ' +
      'refletent les niveaux de salaires locaux et les exigences reglementaires.'
    );

    // Tableau SG&A detaille
    const sgaHeaders = ['Ville', 'Personnel 3ans', 'Bureaux 3ans', 'IT & Systemes', 'Conformite', 'Voyage', 'Setup', 'Total SG&A'];
    const sgaRows = [
      ['Paris', '8.45 M€', '2.10 M€', '1.35 M€', '0.85 M€', '0.75 M€', '0.35 M€', '13.85 M€'],
      ['Geneve', '9.20 M€', '2.45 M€', '1.35 M€', '0.95 M€', '0.68 M€', '0.28 M€', '14.91 M€'],
      ['Amsterdam', '7.85 M€', '1.95 M€', '1.35 M€', '0.75 M€', '0.82 M€', '0.31 M€', '13.03 M€'],
      ['Singapour', '6.95 M€', '2.25 M€', '1.25 M€', '0.65 M€', '1.15 M€', '0.45 M€', '12.70 M€'],
      ['Hambourg', '7.60 M€', '1.75 M€', '1.35 M€', '0.80 M€', '0.70 M€', '0.25 M€', '12.45 M€'],
      ['Londres', '8.95 M€', '2.85 M€', '1.45 M€', '0.90 M€', '0.65 M€', '0.42 M€', '15.22 M€'],
      ['Chypre', '5.45 M€', '1.25 M€', '1.15 M€', '0.55 M€', '0.95 M€', '0.18 M€', '9.53 M€']
    ];

    this.addAdvancedTable(sgaHeaders, sgaRows, {
      columnStyles: {
        0: { cellWidth: 22 },
        1: { cellWidth: 22, halign: 'right' },
        2: { cellWidth: 22, halign: 'right' },
        3: { cellWidth: 22, halign: 'right' },
        4: { cellWidth: 20, halign: 'right' },
        5: { cellWidth: 18, halign: 'right' },
        6: { cellWidth: 18, halign: 'right' },
        7: { cellWidth: 22, halign: 'right', fontStyle: 'bold' }
      }
    });

    // Analyse comparative couts
    this.addRichText(
      'ANALYSE COMPARATIVE DES COUTS:\n\n' +
      'Plus economiques: Chypre (9.53M€), Singapour (12.70M€), Hambourg (12.45M€)\n' +
      'Equilibrees: Amsterdam (13.03M€), Paris (13.85M€)\n' +
      'Premium: Geneve (14.91M€), Londres (15.22M€)\n\n' +
      'Les differences s\'expliquent principalement par les niveaux de remuneration du personnel ' +
      '(60-65% des couts totaux) et les couts immobiliers (15-20% du total).',
      'highlight'
    );

    this.addFooter();
  }

  // FINANCEMENT DETAILLE  
  private async addFinancementSection(neskaroLogo?: string, mereyaLogo?: string) {
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 30;
    
    this.addSectionTitle('7. Plan de financement', 'Structure financiere et acces aux capitaux');
    
    this.addRichText(
      'Le financement combine fonds propres Neskao, facilites bancaires locales et acces aux financements DFI. ' +
      'Chaque localisation presente des avantages specifiques en termes d\'acces aux marches de capitaux ' +
      'et de cout du financement.'
    );

    // Structure financiere type
    const financHeaders = ['Composante', 'Montant', '% Total', 'Cout', 'Echeance', 'Garanties'];
    const financRows = [
      ['Capital Neskao', '3.0 M€', '50%', '8% div', 'Permanent', 'Aucune'],
      ['Credit bancaire local', '2.0 M€', '33%', '4.5%', '5 ans', 'Actifs'],
      ['Ligne de credit DFI', '1.0 M€', '17%', '3.2%', '7 ans', 'Minimales']
    ];

    this.addAdvancedTable(financHeaders, financRows, {
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 25, halign: 'right' },
        2: { cellWidth: 20, halign: 'center' },
        3: { cellWidth: 20, halign: 'center' },
        4: { cellWidth: 25, halign: 'center' },
        5: { cellWidth: 35, halign: 'center' }
      }
    });

    // Acces DFI par ville
    const dfiHeaders = ['Ville', 'Rating DFI', 'Facilites disponibles', 'Conditions', 'Montant max'];
    const dfiRows = [
      ['Paris', 'A+', 'IFC, AFD, BEI', 'Excellentes', '5.0 M€'],
      ['Geneve', 'AAA', 'IFC, SIFEM', 'Optimales', '8.0 M€'],
      ['Amsterdam', 'A+', 'IFC, FMO', 'Tres bonnes', '4.5 M€'],
      ['Singapour', 'A', 'IFC, DBS Dev', 'Bonnes', '3.5 M€'],
      ['Hambourg', 'A', 'IFC, DEG', 'Bonnes', '3.0 M€'],
      ['Londres', 'A-', 'CDC, IFC', 'Incertaines', '2.5 M€'],
      ['Chypre', 'B+', 'EBRD, IFC', 'Strictes', '2.0 M€']
    ];

    this.addAdvancedTable(dfiHeaders, dfiRows);

    this.addFooter();
  }

  // RISQUES DETAILLES
  private async addRisquesSection(neskaroLogo?: string, mereyaLogo?: string) {
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 30;
    
    this.addSectionTitle('10. Gestion des risques', 'Evaluation et mitigation des risques operationnels');
    
    this.addRichText(
      'L\'analyse des risques couvre les dimensions reglementaires, operationnelles, geopolitiques, ' +
      'financieres et reputationnelles. Chaque localisation presente un profil de risque specifique ' +
      'necessitant des strategies de mitigation adaptees.'
    );

    // Matrice des risques
    const risquesHeaders = ['Type de Risque', 'Paris', 'Geneve', 'Amsterdam', 'Singapour', 'Londres', 'Autres'];
    const risquesRows = [
      ['Reglementaire', 'Faible', 'Tres faible', 'Faible', 'Modere', 'Modere', 'Eleve'],
      ['Operationnel', 'Faible', 'Faible', 'Faible', 'Faible', 'Modere', 'Eleve'],
      ['Geopolitique', 'Tres faible', 'Tres faible', 'Faible', 'Faible', 'Modere', 'Eleve'],
      ['Change/Taux', 'Faible', 'Faible', 'Faible', 'Modere', 'Modere', 'Eleve'],
      ['Reputationnel', 'Faible', 'Tres faible', 'Faible', 'Faible', 'Faible', 'Modere'],
      ['Liquidite', 'Faible', 'Tres faible', 'Faible', 'Faible', 'Modere', 'Eleve']
    ];

    this.addAdvancedTable(risquesHeaders, risquesRows, {
      didParseCell: (data: any) => {
        if (data.section === 'body' && data.column.index > 0) {
          const risk = data.cell.text[0];
          switch (risk) {
            case 'Tres faible':
              data.cell.styles.fillColor = [34, 197, 94, 0.3];
              break;
            case 'Faible':
              data.cell.styles.fillColor = [34, 197, 94, 0.1];
              break;
            case 'Modere':
              data.cell.styles.fillColor = [251, 191, 36, 0.2];
              break;
            case 'Eleve':
              data.cell.styles.fillColor = [239, 68, 68, 0.2];
              break;
          }
        }
      }
    });

    this.addRichText(
      'STRATEGIES DE MITIGATION:\n\n' +
      '• Diversification geographique progressive (Phase 1: Europe, Phase 2: Asie)\n' +
      '• Assurance risques politiques pour localisations emergentes\n' +
      '• Accords de back-to-back avec contreparties locales solides\n' +
      '• Mise en place de plafonds d\'exposition par pays et devise\n' +
      '• Procedures de continuite d\'activite robustes',
      'warning'
    );

    this.addFooter();
  }

  // NEXT STEPS DETAILLE
  private async addNextStepsSection(neskaroLogo?: string, mereyaLogo?: string) {
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 30;
    
    this.addSectionTitle('11. Prochaines etapes', 'Roadmap d\'implementation et jalons cles');
    
    this.addRichText(
      'La mise en oeuvre s\'articule autour de trois phases sequentielles sur 18 mois, depuis la validation ' +
      'strategique jusqu\'au lancement operationnel complet. Chaque phase comporte des jalons critiques ' +
      'et des criteres de validation precis.'
    );

    // Phase 1: Validation et preparation
    this.doc.setFontSize(12);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('PHASE 1: Validation strategique et preparation (Mois 1-6)', this.margin, this.currentY);
    this.currentY += 15;

    const phase1Items = [
      'Validation finale du choix Paris comme localisation prioritaire',
      'Due diligence approfondie: juridique, fiscale, immobiliere',
      'Obtention accord de principe ACPR pour licence trading',
      'Selection et negociation bureaux Paris (500-800m2)',
      'Recrutement Managing Director et Head of Trading',
      'Definition architecture IT et selection prestataires',
      'Mise en place structure juridique (SARL ou SAS)',
      'Preparation dossiers reglementaires complets'
    ];

    phase1Items.forEach(item => {
      this.doc.setFontSize(10);
      this.doc.setTextColor(...this.colors.dark);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(`• ${item}`, this.margin + 5, this.currentY);
      this.currentY += 6;
    });
    this.currentY += 10;

    // Phase 2: Implementation
    this.doc.setFontSize(12);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('PHASE 2: Implementation operationnelle (Mois 7-12)', this.margin, this.currentY);
    this.currentY += 15;

    const phase2Items = [
      'Obtention licence definitive ACPR',
      'Amenagement et installation bureaux Paris',
      'Deployment systemes IT et connexions marches',
      'Recrutement equipe complete (8-10 personnes An 1)',
      'Formation equipes et certification AMF',
      'Mise en place procedures risques et conformite',
      'Tests systemes et dry-run operations',
      'Signature premiers accords bancaires et courtage'
    ];

    phase2Items.forEach(item => {
      this.doc.setFontSize(10);
      this.doc.setTextColor(...this.colors.dark);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(`• ${item}`, this.margin + 5, this.currentY);
      this.currentY += 6;
    });
    this.currentY += 10;

    // Phase 3: Lancement
    this.doc.setFontSize(12);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('PHASE 3: Lancement commercial (Mois 13-18)', this.margin, this.currentY);
    this.currentY += 15;

    const phase3Items = [
      'Lancement operations trading (volumes progressifs)',
      'Activation relations clients institutionnels',
      'Montee en puissance volumes (objectif 15K tonnes An 1)',
      'Extension equipe commerciale et back-office',
      'Evaluation performance et ajustements strategiques',
      'Preparation Phase 2: Singapour ou Amsterdam (An 2)'
    ];

    phase3Items.forEach(item => {
      this.doc.setFontSize(10);
      this.doc.setTextColor(...this.colors.dark);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(`• ${item}`, this.margin + 5, this.currentY);
      this.currentY += 6;
    });

    this.addFooter();
  }

  // RECOMMANDATIONS FINALES
  private async addRecommandationsFinales(neskaroLogo?: string, mereyaLogo?: string) {
    this.doc.addPage();
    this.pageNumber++;
    await this.addHeader(neskaroLogo, mereyaLogo);
    this.currentY = 30;
    
    this.addSectionTitle('12. Synthese et recommandations finales', 'Decision strategique et plan d\'action');
    
    this.addRichText(
      'L\'analyse multicritere confirme Paris comme choix optimal pour l\'implantation du premier bureau de trading ' +
      'Neskao. Cette decision s\'appuie sur une evaluation rigoureuse integrant performance financiere, conformite ' +
      'reglementaire et impact social positif.',
      'highlight'
    );

    // Synthese finale Top 3
    const syntheseHeaders = ['Critere', 'Paris (Poids 25%)', 'Geneve (Poids 25%)', 'Amsterdam (Poids 20%)', 'Score Pondere'];
    const syntheseRows = [
      ['Reglementaire', '8.5/10', '9.0/10', '8.2/10', 'Paris: 2.13'],
      ['Impact Social', '8.0/10', '7.2/10', '7.5/10', 'Paris: 2.00'],
      ['ROI Financier', '7.5/10', '8.0/10', '8.2/10', 'Paris: 1.50'],
      ['Financement DFI', '7.8/10', '8.2/10', '7.9/10', 'Paris: 1.17'],
      ['Gestion Cash', '7.6/10', '6.2/10', '6.4/10', 'Paris: 1.14'],
      ['TOTAL', '39.4/50', '38.6/50', '38.2/50', 'Paris: 7.94']
    ];

    this.addAdvancedTable(syntheseHeaders, syntheseRows, {
      columnStyles: {
        0: { cellWidth: 35, fontStyle: 'bold' },
        1: { cellWidth: 30, halign: 'center' },
        2: { cellWidth: 30, halign: 'center' },
        3: { cellWidth: 30, halign: 'center' },
        4: { cellWidth: 30, halign: 'center' }
      },
      didParseCell: (data: any) => {
        if (data.row.index === 5 && data.section === 'body') {
          data.cell.styles.fillColor = [71, 85, 105, 0.1];
          data.cell.styles.fontStyle = 'bold';
        }
      }
    });

    // Recommandation executive
    this.addRichText(
      'RECOMMANDATION EXECUTIVE:\n\n' +
      '1. IMPLEMENTATION IMMEDIATE: Lancer Phase 1 Paris des Q1 2025\n' +
      '2. BUDGET ALLOUE: 3.0M€ capital + 13.85M€ SG&A sur 3 ans\n' +
      '3. OBJECTIFS An 3: 35K tonnes, 9.93M€ EBITDA, 171.6% ROI\n' +
      '4. EXPANSION PHASE 2: Evaluation Singapour/Amsterdam An 2\n' +
      '5. IMPACT SOCIAL: Creation 55 emplois qualifies, 10 bourses formation\n\n' +
      'Cette strategie positionne Neskao comme acteur international de reference ' +
      'tout en maximisant l\'impact socio-economique en Cote d\'Ivoire.',
      'highlight'
    );

    this.addFooter();
  }

  public async generateComprehensiveReport(): Promise<Blob> {
    try {
      // Pré-charger toutes les images
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
      
      // Table des matières
      await this.addTableOfContents(neskaroLogo, mereyaLogo);
      
      // Sections principales completes
      await this.addCompleteDashboard(neskaroLogo, mereyaLogo);
      await this.addContextSection(neskaroLogo, mereyaLogo);
      await this.addReglementationSection(neskaroLogo, mereyaLogo);
      await this.addMixProduitsSection(neskaroLogo, mereyaLogo);
      await this.addSGASection(neskaroLogo, mereyaLogo);
      await this.addRentabiliteSection(neskaroLogo, mereyaLogo);
      await this.addFinancementSection(neskaroLogo, mereyaLogo);
      await this.addImpactSocialSection(neskaroLogo, mereyaLogo);
      await this.addAnalyseDecisionnelle(neskaroLogo, mereyaLogo);
      await this.addRisquesSection(neskaroLogo, mereyaLogo);
      await this.addNextStepsSection(neskaroLogo, mereyaLogo);
      await this.addRecommandationsFinales(neskaroLogo, mereyaLogo);
      
      return this.doc.output('blob');
    } catch (error) {
      console.error('Erreur génération PDF complet:', error);
      throw error;
    }
  }
}

export default ComprehensivePDFGenerator;