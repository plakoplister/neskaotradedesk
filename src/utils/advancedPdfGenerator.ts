import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => void;
  lastAutoTable: { finalY: number };
}

export class AdvancedPDFGenerator {
  private doc: jsPDFWithAutoTable;
  private currentY: number = 20;
  private pageNumber: number = 1;
  private readonly pageWidth: number = 210;
  private readonly pageHeight: number = 297;
  private readonly margin: number = 20;
  private readonly contentWidth: number = 170;

  constructor() {
    this.doc = new jsPDF('p', 'mm', 'a4') as jsPDFWithAutoTable;
  }

  // Couleurs de la charte graphique Neskao/Mereya
  private colors = {
    primary: [91, 94, 166],      // Bleu Mereya
    secondary: [31, 78, 121],    // Bleu foncé
    success: [34, 197, 94],      // Vert
    warning: [251, 191, 36],     // Orange
    danger: [239, 68, 68],       // Rouge
    light: [248, 250, 252],      // Gris clair
    dark: [31, 41, 55]           // Gris foncé
  };

  private addHeader() {
    try {
      this.doc.addImage('/images/Logo NESKAO.jpeg', 'JPEG', this.margin, 5, 25, 10);
      this.doc.addImage('/images/Logo MEREYA.png', 'PNG', this.pageWidth - this.margin - 25, 5, 25, 10);
    } catch (error) {
      // Fallback avec logos stylisés
      this.doc.setFillColor(...this.colors.primary);
      this.doc.rect(this.margin, 5, 25, 10, 'F');
      this.doc.setFontSize(8);
      this.doc.setTextColor(255, 255, 255);
      this.doc.text('NESKAO', this.margin + 3, 11);
      
      this.doc.setFillColor(...this.colors.secondary);
      this.doc.rect(this.pageWidth - this.margin - 25, 5, 25, 10, 'F');
      this.doc.text('MEREYA', this.pageWidth - this.margin - 22, 11);
    }
    
    this.doc.setDrawColor(...this.colors.light);
    this.doc.setLineWidth(0.5);
    this.doc.line(this.margin, 18, this.pageWidth - this.margin, 18);
  }

  private addFooter() {
    this.doc.setFontSize(9);
    this.doc.setTextColor(150, 150, 150);
    this.doc.text(`Page ${this.pageNumber}`, this.pageWidth / 2, this.pageHeight - 10, { align: 'center' });
    
    // Ligne de bas de page
    this.doc.setDrawColor(...this.colors.light);
    this.doc.line(this.margin, this.pageHeight - 15, this.pageWidth - this.margin, this.pageHeight - 15);
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

  // Titre de section avec design amélioré
  private addSectionTitle(title: string, subtitle?: string) {
    this.checkNewPage(25);
    
    // Fond coloré pour le titre
    this.doc.setFillColor(...this.colors.primary);
    this.doc.rect(this.margin, this.currentY - 5, this.contentWidth, 12, 'F');
    
    this.doc.setFontSize(14);
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, this.margin + 5, this.currentY + 3);
    this.currentY += 15;
    
    if (subtitle) {
      this.doc.setFontSize(11);
      this.doc.setTextColor(...this.colors.secondary);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(subtitle, this.margin, this.currentY);
      this.currentY += 8;
    }
  }

  // Paragraphe avec formatage amélioré
  private addRichParagraph(text: string, type: 'normal' | 'highlight' | 'warning' = 'normal') {
    this.checkNewPage(20);
    
    if (type === 'highlight') {
      this.doc.setFillColor(...this.colors.light);
      const textHeight = Math.ceil(text.length / 80) * 6 + 10;
      this.doc.rect(this.margin, this.currentY - 3, this.contentWidth, textHeight, 'F');
      this.doc.setDrawColor(...this.colors.primary);
      this.doc.setLineWidth(2);
      this.doc.line(this.margin, this.currentY - 3, this.margin, this.currentY - 3 + textHeight);
    }
    
    this.doc.setFontSize(10);
    this.doc.setTextColor(type === 'warning' ? 180 : 60, 60, 60);
    this.doc.setFont('helvetica', 'normal');
    
    const lines = this.doc.splitTextToSize(text, this.contentWidth - 10);
    lines.forEach((line: string) => {
      this.checkNewPage(8);
      this.doc.text(line, this.margin + (type === 'highlight' ? 10 : 0), this.currentY);
      this.currentY += 5;
    });
    this.currentY += 5;
  }

  // Tableau stylisé avec données riches
  private addStyledTable(data: any[], options: any = {}) {
    const defaultOptions = {
      theme: 'grid',
      headStyles: {
        fillColor: this.colors.primary,
        textColor: [255, 255, 255],
        fontSize: 9,
        fontStyle: 'bold',
        halign: 'center'
      },
      styles: {
        fontSize: 8,
        cellPadding: 4,
        lineColor: [200, 200, 200],
        lineWidth: 0.5
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      },
      margin: { top: this.currentY },
      ...options
    };

    this.checkNewPage(60);
    autoTable(this.doc, {
      head: [data[0]],
      body: data.slice(1),
      startY: this.currentY,
      ...defaultOptions
    });
    
    this.currentY = this.doc.lastAutoTable.finalY + 10;
  }

  // Graphique simple en barres (simulé avec rectangles)
  private addBarChart(title: string, data: Array<{name: string, value: number, color?: number[]}>) {
    this.checkNewPage(100);
    
    this.doc.setFontSize(12);
    this.doc.setTextColor(...this.colors.secondary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, this.margin, this.currentY);
    this.currentY += 15;
    
    const chartWidth = this.contentWidth - 40;
    const chartHeight = 60;
    const maxValue = Math.max(...data.map(d => d.value));
    const barWidth = chartWidth / data.length - 5;
    
    // Axes
    this.doc.setDrawColor(100, 100, 100);
    this.doc.setLineWidth(1);
    // Axe Y
    this.doc.line(this.margin + 30, this.currentY, this.margin + 30, this.currentY + chartHeight);
    // Axe X
    this.doc.line(this.margin + 30, this.currentY + chartHeight, this.margin + 30 + chartWidth, this.currentY + chartHeight);
    
    // Barres
    data.forEach((item, index) => {
      const barHeight = (item.value / maxValue) * (chartHeight - 10);
      const x = this.margin + 35 + index * (barWidth + 5);
      const y = this.currentY + chartHeight - barHeight;
      
      this.doc.setFillColor(...(item.color || this.colors.primary));
      this.doc.rect(x, y, barWidth, barHeight, 'F');
      
      // Étiquettes
      this.doc.setFontSize(7);
      this.doc.setTextColor(60, 60, 60);
      this.doc.text(item.name, x + barWidth/2, this.currentY + chartHeight + 8, { align: 'center' });
      this.doc.text(item.value.toString(), x + barWidth/2, y - 2, { align: 'center' });
    });
    
    this.currentY += chartHeight + 20;
  }

  // Page de garde avec l'image
  private addCoverPage() {
    try {
      this.doc.addImage('/images/PageDeGarde.png', 'PNG', 0, 0, this.pageWidth, this.pageHeight);
    } catch (error) {
      // Version améliorée du fallback
      const gradient = this.doc.linearGradient([this.colors.primary, this.colors.secondary]);
      this.doc.setFillColor(...this.colors.primary);
      this.doc.rect(0, 0, this.pageWidth, this.pageHeight, 'F');
      
      // Formes géométriques décoratives
      this.doc.setFillColor(255, 255, 255, 0.1);
      this.doc.circle(this.pageWidth * 0.8, this.pageHeight * 0.2, 50, 'F');
      this.doc.circle(this.pageWidth * 0.2, this.pageHeight * 0.8, 30, 'F');
      
      // Contenu
      this.doc.setTextColor(255, 255, 255);
      this.doc.setFontSize(32);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text("Rapport d'étude", this.pageWidth / 2, 80, { align: 'center' });
      this.doc.text("stratégique", this.pageWidth / 2, 100, { align: 'center' });
      
      this.doc.setFontSize(16);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text("Élaboration d'une stratégie d'implantation", this.pageWidth / 2, 130, { align: 'center' });
      this.doc.text("d'un bureau de trading de cacao", this.pageWidth / 2, 145, { align: 'center' });
      
      // Logo NESKAO stylisé
      this.doc.setFillColor(255, 255, 255);
      this.doc.rect(this.pageWidth/2 - 30, 170, 60, 20, 'F');
      this.doc.setFontSize(24);
      this.doc.setTextColor(...this.colors.primary);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text("NESKAO", this.pageWidth / 2, 185, { align: 'center' });
      
      // Informations
      this.doc.setFontSize(12);
      this.doc.setTextColor(255, 255, 255);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(new Date().toLocaleDateString('fr-FR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }), this.pageWidth / 2, 250, { align: 'center' });
      
      this.doc.text("Mereya Advisory", 20, 270);
      this.doc.setFontSize(10);
      this.doc.text("Version 3.1 - Confidentiel", this.pageWidth - 20, 270, { align: 'right' });
    }
    
    this.doc.addPage();
    this.pageNumber++;
  }

  // Dashboard enrichi avec graphiques
  private addEnrichedDashboard() {
    this.addHeader();
    this.currentY = 30;
    
    this.addSectionTitle('1. Dashboard - Vue d\'ensemble', 'Analyse comparative des 12 localisations potentielles');
    
    this.addRichParagraph(
      'Cette analyse comparative évalue 12 localisations potentielles selon une méthodologie multicritère rigoureuse. ' +
      'Chaque ville est notée sur 5 dimensions clés avec une pondération reflétant les priorités stratégiques de Neskao.',
      'highlight'
    );
    
    // Métriques clés visuelles
    this.addMetricsBoxes([
      { title: 'Localisations évaluées', value: '12', subtitle: '4 zones géographiques', color: this.colors.primary },
      { title: 'Critères d\'analyse', value: '5', subtitle: 'Approche multicritère', color: this.colors.secondary },
      { title: 'Investissement', value: '2.5-4M€', subtitle: 'Capital requis', color: this.colors.success },
      { title: 'ROI moyen Top 5', value: '168%', subtitle: 'Retour sur 3 ans', color: this.colors.warning }
    ]);
    
    // Graphique des scores par zone
    const scoresByZone = [
      { name: 'Europe', value: 7.2, color: this.colors.success },
      { name: 'Asie', value: 7.5, color: this.colors.primary },
      { name: 'Afrique', value: 3.8, color: this.colors.warning },
      { name: 'M-Orient', value: 2.5, color: this.colors.danger }
    ];
    
    this.addBarChart('Scores moyens par zone géographique', scoresByZone);
    
    // Tableau des 12 localisations avec style amélioré
    const all12Data = [
      ['Rang', 'Ville', 'Zone', 'Score', 'Statut', 'ROI 3ans', 'EBITDA An3', 'Capital'],
      ['1', 'Paris 🇫🇷', 'Europe', '7.87', 'RECOMMANDÉ', '171.6%', '9.93 M€', '3.0 M€'],
      ['2', 'Genève 🇨🇭', 'Europe', '7.72', 'RECOMMANDÉ', '185.2%', '9.09 M€', '3.8 M€'],
      ['3', 'Amsterdam 🇳🇱', 'Europe', '7.65', 'RECOMMANDÉ', '188.6%', '9.40 M€', '2.8 M€'],
      ['4', 'Singapour 🇸🇬', 'Asie', '7.49', 'RECOMMANDÉ', '327.5%', '9.40 M€', '2.5 M€'],
      ['5', 'Hambourg 🇩🇪', 'Europe', '6.78', 'POSSIBLE', '140.9%', '8.96 M€', '2.9 M€'],
      ['6', 'Londres 🇬🇧', 'Europe', '6.72', 'POSSIBLE', '145.8%', '8.47 M€', '3.2 M€'],
      ['7', 'Chypre 🇨🇾', 'Europe', '6.51', 'POSSIBLE', '165.0%', '9.60 M€', '2.4 M€'],
      ['8', 'Maurice 🇲🇺', 'Afrique', '5.62', 'DÉCONSEILLÉ', '89.5%', '7.8 M€', '2.2 M€'],
      ['9', 'Andorre 🇦🇩', 'Europe', '4.20', 'DÉCONSEILLÉ', '87.2%', '10.25 M€', '2.6 M€'],
      ['10', 'Dubai 🇦🇪', 'M-Orient', '3.50', 'DÉCONSEILLÉ', '112.0%', '9.31 M€', '2.8 M€'],
      ['11', 'Maroc CFC 🇲🇦', 'Afrique', '2.00', 'NO GO', '25.0%', '5.2 M€', '1.8 M€'],
      ['12', 'Tel Aviv 🇮🇱', 'M-Orient', '1.50', 'NO GO', '45.2%', '6.8 M€', '2.1 M€']
    ];

    this.addStyledTable(all12Data, {
      columnStyles: {
        0: { cellWidth: 12, halign: 'center' },
        1: { cellWidth: 30 },
        2: { cellWidth: 20, halign: 'center' },
        3: { cellWidth: 18, halign: 'center' },
        4: { cellWidth: 28, halign: 'center' },
        5: { cellWidth: 20, halign: 'right' },
        6: { cellWidth: 22, halign: 'right' },
        7: { cellWidth: 20, halign: 'right' }
      },
      didParseCell: (data: any) => {
        if (data.column.index === 4 && data.section === 'body') {
          switch (data.cell.text[0]) {
            case 'RECOMMANDÉ':
              data.cell.styles.fillColor = [34, 197, 94, 0.2];
              data.cell.styles.textColor = [21, 128, 61];
              break;
            case 'POSSIBLE':
              data.cell.styles.fillColor = [251, 191, 36, 0.2];
              data.cell.styles.textColor = [180, 83, 9];
              break;
            case 'DÉCONSEILLÉ':
              data.cell.styles.fillColor = [239, 68, 68, 0.2];
              data.cell.styles.textColor = [185, 28, 28];
              break;
            case 'NO GO':
              data.cell.styles.fillColor = [239, 68, 68];
              data.cell.styles.textColor = [255, 255, 255];
              break;
          }
        }
      }
    });

    this.addRichParagraph(
      '🎯 RECOMMANDATION CLÉE: Paris s\'impose comme le choix optimal (7.87/10) grâce à son équilibre unique entre ' +
      'performance financière, proximité géographique avec la Côte d\'Ivoire, et impact social positif. Le Top 4 européen ' +
      'domine le classement, complété par Singapour qui excelle en rentabilité pure.',
      'highlight'
    );
  }

  // Métriques boxes visuelles
  private addMetricsBoxes(metrics: Array<{title: string, value: string, subtitle: string, color: number[]}>) {
    this.checkNewPage(40);
    
    const boxWidth = (this.contentWidth - 15) / 4;
    const boxHeight = 25;
    
    metrics.forEach((metric, index) => {
      const x = this.margin + index * (boxWidth + 5);
      const y = this.currentY;
      
      // Box colorée
      this.doc.setFillColor(...metric.color, 0.1);
      this.doc.rect(x, y, boxWidth, boxHeight, 'F');
      this.doc.setDrawColor(...metric.color);
      this.doc.setLineWidth(1);
      this.doc.rect(x, y, boxWidth, boxHeight, 'S');
      
      // Contenu
      this.doc.setFontSize(8);
      this.doc.setTextColor(...metric.color);
      this.doc.text(metric.title, x + boxWidth/2, y + 6, { align: 'center' });
      
      this.doc.setFontSize(14);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text(metric.value, x + boxWidth/2, y + 14, { align: 'center' });
      
      this.doc.setFontSize(7);
      this.doc.setFont('helvetica', 'normal');
      this.doc.setTextColor(100, 100, 100);
      this.doc.text(metric.subtitle, x + boxWidth/2, y + 20, { align: 'center' });
    });
    
    this.currentY += boxHeight + 15;
  }

  // Version basique pour tester
  public generateReport(): Blob {
    try {
      this.addCoverPage();
      this.addEnrichedDashboard();
      
      this.addFooter();
      return this.doc.output('blob');
    } catch (error) {
      console.error('Erreur génération PDF avancé:', error);
      throw error;
    }
  }
}

export default AdvancedPDFGenerator;