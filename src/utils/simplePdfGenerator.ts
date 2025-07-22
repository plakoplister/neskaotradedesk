import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => jsPDF;
  lastAutoTable: { finalY: number };
}

export class SimplePDFGenerator {
  private doc: jsPDFWithAutoTable;
  private currentY: number = 20;
  private pageNumber: number = 1;
  private readonly pageWidth: number = 210;
  private readonly pageHeight: number = 297;
  private readonly margin: number = 12;

  constructor() {
    this.doc = new jsPDF('p', 'mm', 'a4') as jsPDFWithAutoTable;
  }

  private addHeader(neskaroLogo?: string, mereyaLogo?: string) {
    this.doc.setFontSize(8);
    this.doc.setTextColor(100, 116, 139);
    this.doc.text(`Page ${this.pageNumber}`, this.pageWidth - this.margin - 20, 8, { align: 'right' });
    this.doc.text('NESKAO - Rapport Stratégique Trading', this.margin, 8);
    
    if (neskaroLogo) {
      try {
        this.doc.addImage(neskaroLogo, 'JPEG', this.pageWidth - 35, 2, 8, 8);
      } catch (error) {
        console.warn('Logo Neskao non chargé');
      }
    }
    
    if (mereyaLogo) {
      try {
        this.doc.addImage(mereyaLogo, 'PNG', this.pageWidth - 50, 2, 8, 8);
      } catch (error) {
        console.warn('Logo Mereya non chargé');
      }
    }
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
  }

  private addSimpleTable(headers: string[], rows: string[][]) {
    this.checkNewPage(30);
    
    this.doc.autoTable({
      head: [headers],
      body: rows,
      startY: this.currentY,
      margin: { left: this.margin, right: this.margin },
      theme: 'grid',
      headStyles: { 
        fillColor: [241, 245, 249],
        textColor: [71, 85, 105],
        fontStyle: 'bold',
        fontSize: 8
      },
      bodyStyles: { 
        fontSize: 8,
        textColor: [15, 23, 42]
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      }
    });
    
    this.currentY = this.doc.lastAutoTable.finalY + 10;
  }

  public async generateSimpleReport(): Promise<Blob> {
    try {
      let neskaroLogo: string | undefined;
      let mereyaLogo: string | undefined;
      
      // En-tête du rapport
      this.addHeader(neskaroLogo, mereyaLogo);
      
      // Page de couverture
      this.doc.setFontSize(20);
      this.doc.setTextColor(71, 85, 105);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('RAPPORT STRATÉGIQUE', this.margin, 50);
      this.doc.text('Bureau de Trading International', this.margin, 65);
      
      this.doc.setFontSize(14);
      this.doc.setTextColor(100, 116, 139);
      this.doc.text('Analyse comparative de 12 localisations', this.margin, 85);
      
      this.doc.setFontSize(12);
      this.doc.setTextColor(148, 163, 184);
      this.doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, this.margin, 105);
      
      // Nouvelle page - Table des matières
      this.doc.addPage();
      this.pageNumber++;
      this.addHeader(neskaroLogo, mereyaLogo);
      this.currentY = 20;
      
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
        this.doc.setFontSize(10);
        this.doc.setTextColor(71, 85, 105);
        this.doc.text(item, this.margin + 5, this.currentY);
        this.doc.text(`${index + 3}`, this.pageWidth - this.margin - 10, this.currentY, { align: 'right' });
        this.currentY += 6;
      });
      
      // Section 1 - Dashboard
      this.doc.addPage();
      this.pageNumber++;
      this.addHeader(neskaroLogo, mereyaLogo);
      this.currentY = 20;
      
      this.addSectionTitle('1. Dashboard - Vue d\'ensemble', 'Synthèse des 12 localisations évaluées');
      
      // Données réelles du classement webapp
      const dashboardHeaders = ['Rang', 'Localisation', 'Score Final', 'EBITDA An1', 'Statut'];
      const dashboardRows = [
        ['1', 'Paris', '7.87', '+0.52 M€', 'RECOMMANDÉ'],
        ['2', 'Genève', '7.81', '-0.23 M€', 'RECOMMANDÉ'], 
        ['3', 'Amsterdam', '7.65', '+0.07 M€', 'RECOMMANDÉ'],
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
      
      this.addSimpleTable(dashboardHeaders, dashboardRows);
      
      // Section 2 - SG&A
      this.addSectionTitle('2. Analyse SG&A', 'Comparaison des coûts de structure');
      
      const sgaHeaders = ['Rang', 'Localisation', 'Total 3 ans', 'Score'];
      const sgaRows = [
        ['1', 'Maroc CFC', '2,376k€', 'A'],
        ['2', 'Maurice', '2,702k€', 'A'],
        ['3', 'Andorre', '2,874k€', 'A'],
        ['4', 'Paris', '3,987k€', 'B'],
        ['5', 'Hambourg', '4,186k€', 'B'],
        ['6', 'Chypre', '4,392k€', 'B']
      ];
      
      this.addSimpleTable(sgaHeaders, sgaRows);
      
      // Section 3 - Rentabilité
      this.addSectionTitle('3. Rentabilité - Résultats 3 ans', 'ROI et résultats nets par localisation');
      
      const rentabiliteHeaders = ['Localisation', 'EBITDA An1', 'EBITDA An3', 'Résultat Net 3 ans', 'ROI 3 ans'];
      const rentabiliteRows = [
        ['Paris', '0.52k€', '9.93k€', '5.14k€', '171.6%'],
        ['Genève', '-0.23k€', '9.09k€', '5.13k€', '187.5%'],
        ['Amsterdam', '0.07k€', '9.40k€', '4.82k€', '176.8%'],
        ['Singapour', '0.02k€', '9.40k€', '6.88k€', '327.5%'],
        ['Chypre', '0.40k€', '9.60k€', '5.59k€', 'N/A'],
        ['Londres', '-0.67k€', '8.47k€', '3.98k€', '98.8%'],
        ['Hambourg', '0.09k€', '8.96k€', '4.21k€', '127.9%'],
        ['Maroc CFC', '0.93k€', '10.43k€', '4.77k€', '-15.9%'],
        ['Maurice', '0.82k€', '10.29k€', '4.57k€', '21.5%'],
        ['Tel Aviv', '-0.06k€', '9.16k€', '3.73k€', '71.6%'],
        ['Dubai', '0.00k€', '9.31k€', '5.49k€', '112.0%'],
        ['Andorre', '0.76k€', '10.25k€', '5.39k€', '87.2%']
      ];
      
      this.addSimpleTable(rentabiliteHeaders, rentabiliteRows);
      
      // Section 4 - Recommandation finale
      this.addSectionTitle('4. Recommandation Finale');
      
      this.doc.setFontSize(10);
      this.doc.setTextColor(71, 85, 105);
      this.doc.setFont('helvetica', 'normal');
      
      const recommendationText = [
        'Après analyse exhaustive de 12 localisations selon 5 critères pondérés,',
        'PARIS s\'impose comme le choix optimal avec un score de 7.87/10.',
        '',
        'Avantages clés :',
        '• EBITDA positif dès l\'An 1 (+0.52 M€)',
        '• Liens historiques avec la Côte d\'Ivoire',
        '• Accès privilégié aux financements DFI (AFD/Proparco)',
        '• Structure SG&A compétitive (3,987k€ sur 3 ans)',
        '• Score d\'impact social excellent (8.5/10)',
        '',
        'Recommandation : Lancement immédiat du bureau à Paris.'
      ];
      
      recommendationText.forEach(line => {
        if (line === '') {
          this.currentY += 4;
        } else {
          this.checkNewPage(15);
          this.doc.text(line, this.margin, this.currentY);
          this.currentY += 6;
        }
      });
      
      this.addFooter();
      
      return this.doc.output('blob');
    } catch (error) {
      console.error('Erreur génération PDF simple:', error);
      throw error;
    }
  }
}

export default SimplePDFGenerator;