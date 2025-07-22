import { jsPDF } from 'jspdf';

export class SimplestPDFGenerator {
  private doc: jsPDF;
  private currentY: number = 20;

  constructor() {
    this.doc = new jsPDF('p', 'mm', 'a4');
  }

  public async generateReport(): Promise<Blob> {
    try {
      // PAGE DE GARDE
      this.doc.setFontSize(24);
      this.doc.setTextColor(71, 85, 105); // Gris-bleu
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('NESKAO', 12, 60);
      this.doc.text('ANALYSE STRATÉGIQUE', 12, 85);
      
      this.doc.setFontSize(14);
      this.doc.setTextColor(100, 116, 139);
      this.doc.text('Bureau de Trading International', 12, 110);
      this.doc.text('Évaluation de 12 localisations', 12, 125);
      
      this.doc.setFontSize(10);
      this.doc.text(`Rapport généré le ${new Date().toLocaleDateString('fr-FR')}`, 12, 150);
      
      // PAGE DASHBOARD
      this.doc.addPage();
      this.currentY = 30;
      
      this.doc.setFontSize(18);
      this.doc.setTextColor(71, 85, 105);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('1. DASHBOARD - CLASSEMENT FINAL', 12, this.currentY);
      this.currentY += 20;
      
      // Liste des 12 villes - SIMPLE
      const villes = [
        '1. PARIS (7.87) - EBITDA: +0.52k€ - RECOMMANDÉ ✓',
        '2. GENÈVE (7.81) - EBITDA: -0.23k€ - RECOMMANDÉ ✓', 
        '3. AMSTERDAM (7.65) - EBITDA: +0.07k€ - RECOMMANDÉ ✓',
        '4. SINGAPOUR (7.49) - EBITDA: +0.02k€ - POSSIBLE',
        '5. CHYPRE (7.14) - EBITDA: +0.40k€ - POSSIBLE',
        '6. LONDRES (7.06) - EBITDA: -0.67k€ - POSSIBLE',
        '7. MAROC CFC (6.91) - EBITDA: +0.93k€ - POSSIBLE',
        '8. HAMBOURG (6.78) - EBITDA: +0.09k€ - POSSIBLE',
        '9. MAURICE (6.72) - EBITDA: +0.82k€ - ENVISAGEABLE',
        '10. TEL AVIV (6.58) - EBITDA: -0.06k€ - ENVISAGEABLE',
        '11. DUBAI (6.50) - EBITDA: 0.00k€ - ENVISAGEABLE',
        '12. ANDORRE (5.23) - EBITDA: +0.76k€ - NON RETENU'
      ];
      
      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'normal');
      this.doc.setTextColor(71, 85, 105);
      
      villes.forEach(ville => {
        this.doc.text(ville, 12, this.currentY);
        this.currentY += 8;
      });
      
      // PAGE SG&A
      this.doc.addPage();
      this.currentY = 30;
      
      this.doc.setFontSize(18);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('2. SG&A - COÛTS DE STRUCTURE (3 ANS)', 12, this.currentY);
      this.currentY += 20;
      
      const sgaCouts = [
        '1. MAROC CFC: 2,376k€ (zone franche)',
        '2. MAURICE: 2,702k€ (offshore)',
        '3. ANDORRE: 2,874k€ (zone franche)',
        '4. PARIS: 3,987k€ (Europe) ← RECOMMANDÉ',
        '5. HAMBOURG: 4,186k€ (Europe)',
        '6. CHYPRE: 4,392k€ (Europe)',
        '7. AMSTERDAM: 4,354k€ (Europe)',
        '8. DUBAI: 4,452k€ (zone franche)',
        '9. TEL AVIV: 4,651k€ (Moyen-Orient)',
        '10. GENÈVE: 5,263k€ (Europe)',
        '11. SINGAPOUR: 5,573k€ (Asie)',
        '12. LONDRES: 5,814k€ (Europe)'
      ];
      
      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'normal');
      
      sgaCouts.forEach(cout => {
        this.doc.text(cout, 12, this.currentY);
        this.currentY += 8;
      });
      
      // PAGE RECOMMANDATION
      this.doc.addPage();
      this.currentY = 30;
      
      this.doc.setFontSize(18);
      this.doc.setFont('helvetica', 'bold');
      this.doc.setTextColor(20, 184, 166); // Teal
      this.doc.text('RECOMMANDATION: PARIS', 12, this.currentY);
      this.currentY += 25;
      
      this.doc.setFontSize(12);
      this.doc.setTextColor(71, 85, 105);
      this.doc.setFont('helvetica', 'normal');
      
      const recommandations = [
        '✓ Score global: 7.87/10 (1er rang)',
        '✓ EBITDA positif dès l\'An 1: +0.52k€',
        '✓ Coûts SG&A compétitifs: 3,987k€',
        '✓ Accès AFD/Proparco privilégié',
        '✓ Liens historiques Côte d\'Ivoire',
        '✓ Hub logistique optimal',
        '',
        'ROI 3 ans estimé: 171.6%',
        'Délai implémentation: 6-8 mois'
      ];
      
      recommandations.forEach(reco => {
        if (reco === '') this.currentY += 5;
        else {
          this.doc.text(reco, 12, this.currentY);
          this.currentY += 10;
        }
      });
      
      return this.doc.output('blob');
      
    } catch (error) {
      console.error('Erreur PDF simplest:', error);
      throw error;
    }
  }
}

export default SimplestPDFGenerator;