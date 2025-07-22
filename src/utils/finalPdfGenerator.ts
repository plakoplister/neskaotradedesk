import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => jsPDF;
  lastAutoTable: { finalY: number };
}

export class FinalPDFGenerator {
  private doc: jsPDFWithAutoTable;
  private currentY: number = 20;
  private pageNumber: number = 1;
  private readonly pageWidth: number = 210;
  private readonly pageHeight: number = 297;
  private readonly margin: number = 12;

  // UNIQUEMENT couleurs monochrome élégant - PAS DE MARRON
  private colors = {
    primary: [71, 85, 105],      // Gris-bleu foncé
    secondary: [100, 116, 139],  // Gris-bleu moyen  
    accent: [148, 163, 184],     // Gris-bleu clair
    light: [241, 245, 249],      // Gris très clair
    teal: [20, 184, 166],        // Vert-bleu (succès)
    sky: [14, 165, 233],         // Bleu (info)
    white: [255, 255, 255]       // Blanc
  };

  constructor() {
    this.doc = new jsPDF('p', 'mm', 'a4') as jsPDFWithAutoTable;
  }

  private addHeader() {
    this.doc.setFontSize(8);
    this.doc.setTextColor(100, 116, 139);
    this.doc.text(`Page ${this.pageNumber}`, this.pageWidth - 20, 8, { align: 'right' });
    this.doc.text('NESKAO - Analyse Stratégique', this.margin, 8);
  }

  private addFooter() {
    this.doc.setFontSize(7);
    this.doc.setTextColor(148, 163, 184);
    this.doc.text('Confidentiel - Usage interne', this.margin, this.pageHeight - 8);
    this.doc.text(new Date().toLocaleDateString('fr-FR'), this.pageWidth - 30, this.pageHeight - 8, { align: 'right' });
  }

  private checkNewPage(space = 30) {
    if (this.currentY + space > this.pageHeight - 20) {
      this.doc.addPage();
      this.pageNumber++;
      this.currentY = 20;
      this.addHeader();
    }
  }

  private addTitle(title: string, subtitle?: string) {
    this.checkNewPage(40);
    
    this.doc.setFontSize(16);
    this.doc.setTextColor(71, 85, 105);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, this.margin, this.currentY);
    this.currentY += 12;
    
    if (subtitle) {
      this.doc.setFontSize(11);
      this.doc.setTextColor(100, 116, 139);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(subtitle, this.margin, this.currentY);
      this.currentY += 8;
    }
    this.currentY += 10;
  }

  private addTable(headers: string[], rows: string[][]) {
    this.checkNewPage(50);
    
    this.doc.autoTable({
      head: [headers],
      body: rows,
      startY: this.currentY,
      margin: { left: this.margin, right: this.margin },
      theme: 'grid',
      headStyles: { 
        fillColor: [71, 85, 105],    // Gris-bleu foncé
        textColor: [255, 255, 255],   // Blanc
        fontStyle: 'bold'
      },
      bodyStyles: { 
        textColor: [15, 23, 42],      // Très foncé
        fontSize: 9
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]    // Très clair
      }
    });
    
    this.currentY = this.doc.lastAutoTable.finalY + 15;
  }

  public async generateFinalReport(): Promise<Blob> {
    try {
      // PAGE DE GARDE
      this.doc.setFontSize(24);
      this.doc.setTextColor(71, 85, 105);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('NESKAO', this.margin, 60);
      this.doc.text('ANALYSE STRATÉGIQUE', this.margin, 80);
      this.doc.text('BUREAU DE TRADING', this.margin, 100);
      
      this.doc.setFontSize(14);
      this.doc.setTextColor(100, 116, 139);
      this.doc.text('Rapport d\'évaluation - 12 localisations', this.margin, 130);
      
      this.doc.setFontSize(10);
      this.doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, this.margin, 150);
      
      // TABLE DES MATIÈRES
      this.doc.addPage();
      this.pageNumber++;
      this.addHeader();
      this.currentY = 30;
      
      this.addTitle('TABLE DES MATIÈRES');
      
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
      
      toc.forEach((item, i) => {
        this.doc.setFontSize(11);
        this.doc.setTextColor(71, 85, 105);
        this.doc.text(item, this.margin + 5, this.currentY);
        this.doc.text(`${i + 3}`, this.pageWidth - 20, this.currentY, { align: 'right' });
        this.currentY += 8;
      });

      // 1. DASHBOARD
      this.doc.addPage();
      this.pageNumber++;
      this.addHeader();
      this.currentY = 30;
      
      this.addTitle('1. Dashboard - Vue d\'ensemble', 'Classement des 12 localisations');
      
      // TABLEAU COMPLET DES 12 VILLES - DONNÉES EXACTES WEBAPP
      const dashboardHeaders = ['Rang', 'Ville', 'Zone', 'Score', 'EBITDA An1', 'Equity', 'Statut'];
      const dashboardRows = [
        ['1', 'Paris', 'Europe', '7.87', '0.52k€', '1.89M€', 'RECOMMANDÉ'],
        ['2', 'Genève', 'Europe', '7.81', '-0.23k€', '1.78M€', 'RECOMMANDÉ'],
        ['3', 'Amsterdam', 'Europe', '7.65', '0.07k€', '1.74M€', 'RECOMMANDÉ'],
        ['4', 'Singapour', 'Asie', '7.49', '0.02k€', '1.61M€', 'POSSIBLE'],
        ['5', 'Chypre', 'Europe', '7.14', '0.40k€', '2.5M€', 'POSSIBLE'],
        ['6', 'Londres', 'Europe', '7.06', '-0.67k€', '2.00M€', 'POSSIBLE'],
        ['7', 'Maroc CFC', 'Zone franche', '6.91', '0.93k€', '5.67M€', 'POSSIBLE'],
        ['8', 'Hambourg', 'Europe', '6.78', '0.09k€', '1.85M€', 'POSSIBLE'],
        ['9', 'Maurice', 'Offshore', '6.72', '0.82k€', '3.76M€', 'ENVISAGEABLE'],
        ['10', 'Tel Aviv', 'Moyen-Orient', '6.58', '-0.06k€', '2.17M€', 'ENVISAGEABLE'],
        ['11', 'Dubai', 'Zone franche', '6.50', '0.00k€', '2.59M€', 'ENVISAGEABLE'],
        ['12', 'Andorre', 'Zone franche', '5.23', '0.76k€', '2.88M€', 'NON RETENU']
      ];
      
      this.addTable(dashboardHeaders, dashboardRows);

      // 2. CONTEXTE
      this.doc.addPage(); 
      this.pageNumber++;
      this.addHeader();
      this.currentY = 30;
      
      this.addTitle('2. Contexte de la mission', 'Objectifs et environnement');
      
      this.doc.setFontSize(10);
      this.doc.setTextColor(71, 85, 105);
      this.doc.setFont('helvetica', 'normal');
      
      const contexteText = [
        'Neskao, créée en 2013, est la première entreprise africaine de transformation',
        'de cacao avec une spécialisation dans les fèves hors normes.',
        '',
        'Objectifs du bureau de trading :',
        '• Sécurisation des approvisionnements via hedging ICE Futures',
        '• Optimisation financière et capture de marges trading', 
        '• Maintien de la mission d\'impact social en Côte d\'Ivoire'
      ];
      
      contexteText.forEach(line => {
        if (line === '') this.currentY += 4;
        else {
          this.doc.text(line, this.margin, this.currentY);
          this.currentY += 6;
        }
      });

      // 3. SG&A RÉSUMÉ
      this.doc.addPage();
      this.pageNumber++;
      this.addHeader(); 
      this.currentY = 30;
      
      this.addTitle('3. SG&A - Coûts de structure', 'Comparatif 12 localisations sur 3 ans');
      
      // DONNÉES SG&A EXACTES du component
      const sgaHeaders = ['Rang', 'Localisation', 'An 1', 'An 2', 'An 3', 'Total 3 ans'];
      const sgaRows = [
        ['1', 'Maroc CFC', '688k€', '717k€', '971k€', '2,376k€'],
        ['2', 'Maurice', '795k€', '821k€', '1,086k€', '2,702k€'],
        ['3', 'Andorre', '874k€', '858k€', '1,142k€', '2,874k€'],
        ['4', 'Paris', '1,290k€', '1,218k€', '1,478k€', '3,987k€'],
        ['5', 'Hambourg', '1,296k€', '1,253k€', '1,638k€', '4,186k€'],
        ['6', 'Chypre', '1,384k€', '1,330k€', '1,678k€', '4,392k€'],
        ['7', 'Amsterdam', '1,338k€', '1,318k€', '1,697k€', '4,354k€'],
        ['8', 'Dubai', '1,408k€', '1,331k€', '1,713k€', '4,452k€'],
        ['9', 'Tel Aviv', '1,451k€', '1,382k€', '1,817k€', '4,651k€'],
        ['10', 'Genève', '1,693k€', '1,567k€', '2,003k€', '5,263k€'],
        ['11', 'Singapour', '1,754k€', '1,676k€', '2,143k€', '5,573k€'],
        ['12', 'Londres', '1,860k€', '1,736k€', '2,217k€', '5,814k€']
      ];
      
      this.addTable(sgaHeaders, sgaRows);

      // 4. RECOMMANDATION FINALE
      this.doc.addPage();
      this.pageNumber++;
      this.addHeader();
      this.currentY = 30;
      
      this.addTitle('4. Recommandation Finale');
      
      this.doc.setFontSize(12);
      this.doc.setTextColor(20, 184, 166); // Teal
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('PARIS - CHOIX RECOMMANDÉ', this.margin, this.currentY);
      this.currentY += 15;
      
      this.doc.setFontSize(10);
      this.doc.setTextColor(71, 85, 105);
      this.doc.setFont('helvetica', 'normal');
      
      const recoText = [
        'Score global : 7.87/10 (1er rang)',
        'EBITDA positif dès l\'An 1 : +0.52k€',
        'Coûts SG&A compétitifs : 3,987k€ sur 3 ans',
        'Accès privilégié aux financements DFI (AFD/Proparco)',
        'Liens historiques exceptionnels avec la Côte d\'Ivoire',
        'Hub logistique et financier optimal pour l\'activité trading'
      ];
      
      recoText.forEach(line => {
        this.doc.text(`• ${line}`, this.margin, this.currentY);
        this.currentY += 8;
      });

      this.addFooter();
      return this.doc.output('blob');
      
    } catch (error) {
      console.error('Erreur PDF final:', error);
      throw error;
    }
  }
}

export default FinalPDFGenerator;