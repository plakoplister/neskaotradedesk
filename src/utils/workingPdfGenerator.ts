import { jsPDF } from 'jspdf';

export class WorkingPDFGenerator {
  private doc: jsPDF;
  private currentY: number = 20;
  private pageNumber: number = 1;
  private readonly pageWidth: number = 210;
  private readonly pageHeight: number = 297;
  private readonly margin: number = 12;

  // Couleurs webapp monochrome élégant - EXACTES
  private colors = {
    primary: [71, 85, 105] as const,      // text-slate-600
    secondary: [100, 116, 139] as const,   // text-slate-500  
    accent: [148, 163, 184] as const,      // text-slate-400
    light: [241, 245, 249] as const,       // bg-slate-100
    dark: [15, 23, 42] as const,          // text-slate-900
    teal: [20, 184, 166] as const,        // text-teal-500
    sky: [14, 165, 233] as const,         // text-sky-500
    white: [255, 255, 255] as const       // bg-white
  };

  constructor() {
    this.doc = new jsPDF('p', 'mm', 'a4');
  }

  private addHeader() {
    this.doc.setFontSize(8);
    this.doc.setTextColor(...this.colors.secondary);
    this.doc.text(`Page ${this.pageNumber}`, this.pageWidth - this.margin - 20, 8, { align: 'right' });
    this.doc.text('NESKAO - Rapport Stratégique Trading', this.margin, 8);
  }

  private addFooter() {
    this.doc.setFontSize(7);
    this.doc.setTextColor(...this.colors.accent);
    this.doc.text('Document confidentiel - Usage interne uniquement', this.margin, this.pageHeight - 8);
    this.doc.text(new Date().toLocaleDateString('fr-FR'), this.pageWidth - this.margin - 30, this.pageHeight - 8);
  }

  private checkNewPage(requiredSpace: number = 20) {
    if (this.currentY + requiredSpace > this.pageHeight - 20) {
      this.doc.addPage();
      this.pageNumber++;
      this.currentY = 20;
      this.addHeader();
      return true;
    }
    return false;
  }

  private addSectionTitle(title: string, subtitle?: string) {
    this.checkNewPage(30);
    
    this.doc.setFontSize(16);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, this.margin, this.currentY);
    this.currentY += 10;
    
    if (subtitle) {
      this.doc.setFontSize(11);
      this.doc.setTextColor(...this.colors.secondary);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(subtitle, this.margin, this.currentY);
      this.currentY += 8;
    }
    this.currentY += 5;
  }

  private addText(text: string, fontSize: number = 10, bold: boolean = false) {
    this.checkNewPage(15);
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', bold ? 'bold' : 'normal');
    this.doc.setTextColor(...this.colors.primary);
    
    const lines = this.doc.splitTextToSize(text, this.pageWidth - (2 * this.margin));
    lines.forEach((line: string) => {
      this.checkNewPage(8);
      this.doc.text(line, this.margin, this.currentY);
      this.currentY += 6;
    });
    this.currentY += 4;
  }

  private drawTable(headers: string[], rows: string[][]) {
    this.checkNewPage(60);
    
    const startY = this.currentY;
    const colWidth = (this.pageWidth - (2 * this.margin)) / headers.length;
    const rowHeight = 8;
    
    // En-tête
    this.doc.setFillColor(...this.colors.light);
    this.doc.rect(this.margin, startY, this.pageWidth - (2 * this.margin), rowHeight, 'F');
    this.doc.setDrawColor(...this.colors.accent);
    this.doc.rect(this.margin, startY, this.pageWidth - (2 * this.margin), rowHeight, 'S');
    
    this.doc.setFontSize(9);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(...this.colors.primary);
    
    headers.forEach((header, i) => {
      this.doc.text(header, this.margin + (i * colWidth) + 2, startY + 5.5);
    });
    
    let currentRowY = startY + rowHeight;
    
    // Lignes de données
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(8);
    
    rows.forEach((row, r) => {
      this.checkNewPage(rowHeight + 5);
      if (this.currentY > startY + rowHeight + (r * rowHeight)) {
        currentRowY = this.currentY;
      }
      
      // Alternance des couleurs
      if (r % 2 === 0) {
        this.doc.setFillColor(248, 250, 252);
        this.doc.rect(this.margin, currentRowY, this.pageWidth - (2 * this.margin), rowHeight, 'F');
      }
      
      // Bordure
      this.doc.setDrawColor(...this.colors.accent);
      this.doc.rect(this.margin, currentRowY, this.pageWidth - (2 * this.margin), rowHeight, 'S');
      
      this.doc.setTextColor(...this.colors.dark);
      row.forEach((cell, i) => {
        this.doc.text(cell.toString(), this.margin + (i * colWidth) + 2, currentRowY + 5.5);
      });
      
      currentRowY += rowHeight;
    });
    
    this.currentY = currentRowY + 10;
  }

  public async generateWorkingReport(): Promise<Blob> {
    try {
      // Page de garde
      this.addHeader();
      
      this.doc.setFontSize(24);
      this.doc.setTextColor(...this.colors.primary);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('RAPPORT STRATEGIQUE', this.margin, 60);
      this.doc.text('Bureau de Trading International', this.margin, 80);
      
      this.doc.setFontSize(16);
      this.doc.setTextColor(...this.colors.secondary);
      this.doc.text('Analyse comparative de 12 localisations', this.margin, 105);
      
      this.doc.setFontSize(12);
      this.doc.setTextColor(...this.colors.accent);
      this.doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, this.margin, 125);
      
      // Table des matières
      this.doc.addPage();
      this.pageNumber++;
      this.addHeader();
      this.currentY = 30;
      
      this.addSectionTitle('Table des Matières');
      
      const toc = [
        '1. Dashboard - Vue d\'ensemble',
        '2. Contexte de la mission', 
        '3. Réglementation',
        '4. Mix Produits',
        '5. SG&A',
        '6. Rentabilité',
        '7. Financement',
        '8. Impact Social',
        '9. Analyse Décisionnelle',
        '10. Risques',
        '11. Next Steps',
        '12. Recommandations'
      ];
      
      toc.forEach((item, index) => {
        this.doc.setFontSize(11);
        this.doc.setTextColor(...this.colors.primary);
        this.doc.text(item, this.margin + 5, this.currentY);
        this.doc.text(`${index + 3}`, this.pageWidth - this.margin - 10, this.currentY, { align: 'right' });
        this.currentY += 7;
      });
      
      // 1. Dashboard
      this.doc.addPage();
      this.pageNumber++;
      this.addHeader();
      this.currentY = 30;
      
      this.addSectionTitle('1. Dashboard - Vue d\'ensemble', 'Synthèse des 12 localisations évaluées');
      
      this.addText('Cette analyse comparative évalue 12 localisations potentielles selon 5 critères pondérés : réglementation (25%), impact social (22%), rentabilité (20%), financement DFI (18%) et gestion de trésorerie (15%).');
      
      // Données EXACTES du Dashboard webapp
      const dashboardHeaders = ['Rang', 'Localisation', 'Score', 'EBITDA An1', 'Statut'];
      const dashboardRows = [
        ['1', 'Paris', '7.87', '0.52k€', 'RECOMMANDÉ'],
        ['2', 'Genève', '7.81', '-0.23k€', 'RECOMMANDÉ'], 
        ['3', 'Amsterdam', '7.65', '0.07k€', 'RECOMMANDÉ'],
        ['4', 'Singapour', '7.49', '0.02k€', 'POSSIBLE'],
        ['5', 'Chypre', '7.14', '0.40k€', 'POSSIBLE'],
        ['6', 'Londres', '7.06', '-0.67k€', 'POSSIBLE'],
        ['7', 'Maroc CFC', '6.91', '0.93k€', 'POSSIBLE'],
        ['8', 'Hambourg', '6.78', '0.09k€', 'POSSIBLE'],
        ['9', 'Maurice', '6.72', '0.82k€', 'ENVISAGEABLE'],
        ['10', 'Tel Aviv', '6.58', '-0.06k€', 'ENVISAGEABLE'],
        ['11', 'Dubai', '6.50', '0.00k€', 'ENVISAGEABLE'],
        ['12', 'Andorre', '5.23', '0.76k€', 'NON RETENU']
      ];
      
      this.drawTable(dashboardHeaders, dashboardRows);
      
      // 2. SG&A - Données EXACTES du component
      this.addSectionTitle('2. Analyse SG&A - Coûts de structure', 'Comparaison des coûts sur 3 ans');
      
      this.addText('Les coûts SG&A varient de 2,376k€ (Maroc CFC) à 5,814k€ (Londres) sur 3 ans. Paris offre un excellent compromis avec 3,987k€.');
      
      const sgaHeaders = ['Rang', 'Localisation', 'Total 3 ans', 'Zone'];
      const sgaRows = [
        ['1', 'Maroc CFC', '2,376k€', 'Zone franche'],
        ['2', 'Maurice', '2,702k€', 'Offshore'],
        ['3', 'Andorre', '2,874k€', 'Zone franche'],
        ['4', 'Paris', '3,987k€', 'Europe'],
        ['5', 'Hambourg', '4,186k€', 'Europe'],
        ['6', 'Chypre', '4,392k€', 'Europe'],
        ['7', 'Amsterdam', '4,354k€', 'Europe'],
        ['8', 'Dubai', '4,452k€', 'Zone franche'],
        ['9', 'Tel Aviv', '4,651k€', 'Moyen-Orient'],
        ['10', 'Genève', '5,263k€', 'Europe'],
        ['11', 'Singapour', '5,573k€', 'Asie'],
        ['12', 'Londres', '5,814k€', 'Europe']
      ];
      
      this.drawTable(sgaHeaders, sgaRows);
      
      // 3. Rentabilité - Données EXACTES du fichier rentabilite-updateddatas.js
      this.addSectionTitle('3. Rentabilité - Performance financière', 'ROI et résultats nets sur 3 ans');
      
      this.addText('L\'analyse de rentabilité montre des ROI allant de -15.9% (Maroc CFC) à 327.5% (Singapour). Paris présente un ROI excellent de 171.6%.');
      
      const rentabiliteHeaders = ['Localisation', 'EBITDA An1', 'Résultat Net 3ans', 'ROI 3ans'];
      const rentabiliteRows = [
        ['Paris', '0.52k€', '5.14k€', '171.6%'],
        ['Genève', '-0.23k€', '5.13k€', '187.5%'],
        ['Amsterdam', '0.07k€', '4.82k€', '176.8%'],
        ['Singapour', '0.02k€', '6.88k€', '327.5%'],
        ['Chypre', '0.40k€', '5.59k€', 'N/A'],
        ['Londres', '-0.67k€', '3.98k€', '98.8%'],
        ['Hambourg', '0.09k€', '4.21k€', '127.9%'],
        ['Maroc CFC', '0.93k€', '4.77k€', '-15.9%'],
        ['Maurice', '0.82k€', '4.57k€', '21.5%'],
        ['Tel Aviv', '-0.06k€', '3.73k€', '71.6%'],
        ['Dubai', '0.00k€', '5.49k€', '112.0%'],
        ['Andorre', '0.76k€', '5.39k€', '87.2%']
      ];
      
      this.drawTable(rentabiliteHeaders, rentabiliteRows);
      
      // 4. Recommandation finale
      this.addSectionTitle('4. Recommandation Stratégique');
      
      this.addText('PARIS s\'impose comme le choix optimal avec un score de 7.87/10 :', 12, true);
      
      this.addText('✓ EBITDA positif dès l\'An 1 (+0.52k€)\n✓ Liens historiques privilégiés avec la Côte d\'Ivoire\n✓ Accès direct aux financements DFI (AFD/Proparco)\n✓ Coûts SG&A compétitifs (3,987k€ sur 3 ans)\n✓ Score d\'impact social excellent\n✓ Hub aérien direct vers Abidjan');
      
      this.addText('Le bureau parisien permettra à Neskao de développer son activité trading tout en maintenant sa mission d\'impact social en Afrique de l\'Ouest.', 11, true);
      
      this.addFooter();
      
      return this.doc.output('blob');
    } catch (error) {
      console.error('Erreur génération PDF working:', error);
      throw error;
    }
  }
}

export default WorkingPDFGenerator;