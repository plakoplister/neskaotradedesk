import { jsPDF } from 'jspdf';

export class BasicPDFGenerator {
  private doc: jsPDF;
  private currentY: number = 20;
  private pageNumber: number = 1;
  private readonly pageWidth: number = 210;
  private readonly pageHeight: number = 297;
  private readonly margin: number = 12;

  constructor() {
    this.doc = new jsPDF('p', 'mm', 'a4');
  }

  private addHeader() {
    this.doc.setFontSize(8);
    this.doc.setTextColor(100, 116, 139);
    this.doc.text(`Page ${this.pageNumber}`, this.pageWidth - this.margin - 20, 8, { align: 'right' });
    this.doc.text('NESKAO - Rapport Stratégique Trading', this.margin, 8);
  }

  private addFooter() {
    this.doc.setFontSize(7);
    this.doc.setTextColor(148, 163, 184);
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
    
    this.doc.setFontSize(14);
    this.doc.setTextColor(71, 85, 105);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, this.margin, this.currentY);
    this.currentY += 8;
    
    if (subtitle) {
      this.doc.setFontSize(10);
      this.doc.setTextColor(100, 116, 139);
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
    this.doc.setTextColor(71, 85, 105);
    
    const lines = this.doc.splitTextToSize(text, this.pageWidth - (2 * this.margin));
    lines.forEach((line: string) => {
      this.checkNewPage(8);
      this.doc.text(line, this.margin, this.currentY);
      this.currentY += 6;
    });
    this.currentY += 3;
  }

  private addSimpleTable(data: string[][]) {
    this.checkNewPage(50);
    
    const startY = this.currentY;
    const colWidth = (this.pageWidth - (2 * this.margin)) / data[0].length;
    const rowHeight = 8;
    
    // Headers
    this.doc.setFontSize(9);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFillColor(241, 245, 249);
    this.doc.rect(this.margin, startY, this.pageWidth - (2 * this.margin), rowHeight, 'F');
    
    data[0].forEach((header, i) => {
      this.doc.setTextColor(71, 85, 105);
      this.doc.text(header, this.margin + (i * colWidth) + 2, startY + 5);
    });
    
    let currentRowY = startY + rowHeight;
    
    // Data rows
    this.doc.setFont('helvetica', 'normal');
    for (let r = 1; r < data.length; r++) {
      this.checkNewPage(rowHeight + 5);
      if (this.currentY !== startY + rowHeight + ((r-1) * rowHeight)) {
        currentRowY = this.currentY;
      }
      
      // Alternating row colors
      if (r % 2 === 0) {
        this.doc.setFillColor(248, 250, 252);
        this.doc.rect(this.margin, currentRowY, this.pageWidth - (2 * this.margin), rowHeight, 'F');
      }
      
      data[r].forEach((cell, i) => {
        this.doc.setTextColor(15, 23, 42);
        this.doc.text(cell, this.margin + (i * colWidth) + 2, currentRowY + 5);
      });
      
      currentRowY += rowHeight;
    }
    
    this.currentY = currentRowY + 10;
  }

  public async generateBasicReport(): Promise<Blob> {
    try {
      // En-tête du rapport
      this.addHeader();
      
      // Page de couverture
      this.doc.setFontSize(20);
      this.doc.setTextColor(71, 85, 105);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('RAPPORT STRATEGIQUE', this.margin, 50);
      this.doc.text('Bureau de Trading International', this.margin, 65);
      
      this.doc.setFontSize(14);
      this.doc.setTextColor(100, 116, 139);
      this.doc.text('Analyse comparative de 12 localisations', this.margin, 85);
      
      this.doc.setFontSize(12);
      this.doc.setTextColor(148, 163, 184);
      this.doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, this.margin, 105);
      
      // Nouvelle page - Résultats
      this.doc.addPage();
      this.pageNumber++;
      this.addHeader();
      this.currentY = 20;
      
      this.addSectionTitle('Dashboard - Vue d\'ensemble', 'Synthèse des 12 localisations évaluées');
      
      this.addText('Cette analyse comparative évalue 12 localisations potentielles pour l\'implantation du bureau de trading Neskao selon 5 critères pondérés: réglementation (25%), impact social (22%), rentabilité (20%), financement DFI (18%) et gestion de trésorerie (15%).', 10);
      
      // Tableau de classement
      const dashboardData = [
        ['Rang', 'Localisation', 'Score Final', 'EBITDA An1', 'Statut'],
        ['1', 'Paris', '7.87', '+0.52 M€', 'RECOMMANDE'],
        ['2', 'Genève', '7.81', '-0.23 M€', 'RECOMMANDE'], 
        ['3', 'Amsterdam', '7.65', '+0.07 M€', 'RECOMMANDE'],
        ['4', 'Singapour', '7.49', '+0.02 M€', 'POSSIBLE'],
        ['5', 'Chypre', '7.14', '+0.40 M€', 'POSSIBLE'],
        ['6', 'Londres', '7.06', '-0.67 M€', 'POSSIBLE'],
        ['7', 'Maroc CFC', '6.91', '+0.93 M€', 'POSSIBLE'],
        ['8', 'Hambourg', '6.78', '+0.09 M€', 'POSSIBLE'],
        ['9', 'Maurice', '6.72', '+0.82 M€', 'ENVISAGEABLE'],
        ['10', 'Tel Aviv', '6.58', '-0.06 M€', 'ENVISAGEABLE'],
        ['11', 'Dubai', '6.50', '0.00 M€', 'ENVISAGEABLE'],
        ['12', 'Andorre', '5.23', '+0.76 M€', 'NON RETENU']
      ];
      
      this.addSimpleTable(dashboardData);
      
      // Section SG&A
      this.addSectionTitle('Analyse SG&A - Coûts de structure', 'Comparaison des coûts sur 3 ans');
      
      this.addText('Les coûts SG&A varient significativement selon les localisations, de 2,376k€ (Maroc CFC) à 5,814k€ (Londres) sur 3 ans. Les zones franches offrent les coûts les plus compétitifs mais avec des contraintes d\'éloignement des marchés.', 10);
      
      const sgaData = [
        ['Rang', 'Localisation', 'Total 3 ans', 'Score', 'Zone'],
        ['1', 'Maroc CFC', '2,376k€', 'A', 'Zone franche'],
        ['2', 'Maurice', '2,702k€', 'A', 'Offshore'],
        ['3', 'Andorre', '2,874k€', 'A', 'Zone franche'],
        ['4', 'Paris', '3,987k€', 'B', 'Europe'],
        ['5', 'Hambourg', '4,186k€', 'B', 'Europe'],
        ['6', 'Chypre', '4,392k€', 'B', 'Europe']
      ];
      
      this.addSimpleTable(sgaData);
      
      // Section Rentabilité  
      this.addSectionTitle('Rentabilité - Performance financière', 'ROI et résultats nets sur 3 ans');
      
      this.addText('L\'analyse de rentabilité montre des performances variables avec des ROI allant de -15.9% (Maroc CFC) à 327.5% (Singapour). Paris présente un excellent équilibre avec un ROI de 171.6% et une rentabilité dès l\'année 1.', 10);
      
      const rentabiliteData = [
        ['Localisation', 'EBITDA An1', 'Résultat Net 3 ans', 'ROI 3 ans'],
        ['Paris', '0.52k€', '5.14k€', '171.6%'],
        ['Genève', '-0.23k€', '5.13k€', '187.5%'],
        ['Amsterdam', '0.07k€', '4.82k€', '176.8%'],
        ['Singapour', '0.02k€', '6.88k€', '327.5%'],
        ['Chypre', '0.40k€', '5.59k€', 'N/A'],
        ['Londres', '-0.67k€', '3.98k€', '98.8%']
      ];
      
      this.addSimpleTable(rentabiliteData);
      
      // Recommandation finale
      this.addSectionTitle('Recommandation Finale');
      
      this.addText('PARIS s\'impose comme le choix optimal avec un score de 7.87/10 pour les raisons suivantes:', 10, true);
      
      this.addText('• EBITDA positif dès l\'An 1 (+0.52 M€)\n• Liens historiques privilégiés avec la Côte d\'Ivoire\n• Accès direct aux financements DFI (AFD/Proparco)\n• Coûts SG&A compétitifs (3,987k€ sur 3 ans)\n• Score d\'impact social excellent (8.5/10)\n• Hub aérien direct vers Abidjan', 10);
      
      this.addText('Le bureau parisien permettra à Neskao de développer son activité trading tout en maintenant sa mission d\'impact social en Afrique de l\'Ouest.', 10, true);
      
      this.addFooter();
      
      return this.doc.output('blob');
    } catch (error) {
      console.error('Erreur génération PDF basic:', error);
      throw error;
    }
  }
}

export default BasicPDFGenerator;