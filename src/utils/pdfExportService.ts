import jsPDF from 'jspdf';
import 'jspdf-autotable';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    lastAutoTable: {
      finalY: number;
    };
  }
}

class NeskaoPDFExportService {
  private doc: jsPDF;
  private currentY: number = 20;
  private pageNumber: number = 1;
  private readonly pageWidth: number = 210;
  private readonly pageHeight: number = 297;
  private readonly margin: number = 20;
  private readonly contentWidth: number = 170;

  constructor() {
    this.doc = new jsPDF('p', 'mm', 'a4');
  }

  // Ajouter les logos dans l'en-tête de chaque page
  private async addHeader() {
    // Pour l'instant on met juste du texte, on ajoutera les images après
    this.doc.setFontSize(10);
    this.doc.setTextColor(100, 100, 100);
    this.doc.text('NESKAO', this.margin, 10);
    this.doc.text('MEREYA', this.pageWidth - this.margin - 20, 10, { align: 'right' });
    
    // Ligne de séparation
    this.doc.setDrawColor(200, 200, 200);
    this.doc.line(this.margin, 15, this.pageWidth - this.margin, 15);
  }

  // Ajouter le numéro de page
  private addFooter() {
    this.doc.setFontSize(9);
    this.doc.setTextColor(150, 150, 150);
    this.doc.text(
      `Page ${this.pageNumber}`,
      this.pageWidth / 2,
      this.pageHeight - 10,
      { align: 'center' }
    );
  }

  // Vérifier si on doit passer à la page suivante
  private checkNewPage(requiredSpace: number = 30) {
    if (this.currentY + requiredSpace > this.pageHeight - 20) {
      this.addFooter();
      this.doc.addPage();
      this.pageNumber++;
      this.addHeader();
      this.currentY = 30;
    }
  }

  // Ajouter un titre de section
  private addSectionTitle(title: string) {
    this.checkNewPage(20);
    this.doc.setFontSize(16);
    this.doc.setTextColor(31, 78, 121); // Couleur bleue Neskao
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, this.margin, this.currentY);
    this.currentY += 10;
  }

  // Ajouter un paragraphe
  private addParagraph(text: string) {
    this.checkNewPage(20);
    this.doc.setFontSize(11);
    this.doc.setTextColor(60, 60, 60);
    this.doc.setFont('helvetica', 'normal');
    
    const lines = this.doc.splitTextToSize(text, this.contentWidth);
    lines.forEach((line: string) => {
      this.checkNewPage(10);
      this.doc.text(line, this.margin, this.currentY);
      this.currentY += 6;
    });
    this.currentY += 5;
  }

  // Page de garde
  private addCoverPage() {
    // Fond bleu style Mereya
    this.doc.setFillColor(91, 94, 166); // Couleur du template
    this.doc.rect(0, 0, this.pageWidth, this.pageHeight, 'F');
    
    // Titre principal
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(28);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text("Rapport d'étude stratégique", this.pageWidth / 2, 100, { align: 'center' });
    
    this.doc.setFontSize(16);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text("Élaboration d'une stratégie d'implantation d'un bureau", this.pageWidth / 2, 120, { align: 'center' });
    this.doc.text("de trading de cacao et ses dérivés.", this.pageWidth / 2, 130, { align: 'center' });
    
    // Client
    this.doc.setFontSize(20);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text("NESKAO", this.pageWidth / 2, 180, { align: 'center' });
    
    // Date
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(new Date().toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }), this.pageWidth / 2, 250, { align: 'center' });
    
    // Auteur
    this.doc.text("Auteur : Mereya Advisory", 20, 270);
    
    this.doc.addPage();
    this.pageNumber++;
  }

  // Sommaire
  private addTableOfContents() {
    this.addHeader();
    this.currentY = 40;
    
    this.doc.setFontSize(20);
    this.doc.setTextColor(31, 78, 121);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Sommaire', this.margin, this.currentY);
    this.currentY += 15;
    
    const sections = [
      { title: '1. Dashboard - Vue d\'ensemble', page: 3 },
      { title: '2. Contexte de la mission', page: 5 },
      { title: '3. Analyse réglementaire', page: 7 },
      { title: '4. Mix produits et stratégie commerciale', page: 10 },
      { title: '5. Structure des coûts (SG&A)', page: 13 },
      { title: '6. Analyse de rentabilité', page: 16 },
      { title: '7. Plan de financement', page: 19 },
      { title: '8. Impact social et ESG', page: 22 },
      { title: '9. Analyse décisionnelle', page: 25 },
      { title: '10. Gestion des risques', page: 28 },
      { title: '11. Prochaines étapes', page: 31 },
      { title: '12. Recommandations finales', page: 33 }
    ];
    
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'normal');
    sections.forEach(section => {
      this.doc.setTextColor(60, 60, 60);
      this.doc.text(section.title, this.margin, this.currentY);
      this.doc.text(section.page.toString(), this.pageWidth - this.margin - 10, this.currentY);
      
      // Ligne pointillée
      this.doc.setDrawColor(200, 200, 200);
      this.doc.setLineDashPattern([1, 1], 0);
      this.doc.line(this.margin + 100, this.currentY - 2, this.pageWidth - this.margin - 15, this.currentY - 2);
      this.doc.setLineDashPattern([], 0);
      
      this.currentY += 8;
    });
    
    this.addFooter();
    this.doc.addPage();
    this.pageNumber++;
  }

  // Dashboard section avec données réelles
  private addDashboardSection() {
    this.addHeader();
    this.currentY = 30;
    
    this.addSectionTitle('1. Dashboard - Vue d\'ensemble');
    
    this.addParagraph(
      'Cette analyse comparative évalue 12 localisations potentielles pour l\'implantation du bureau de trading de Neskao. ' +
      'L\'évaluation s\'appuie sur une approche multicritère intégrant des aspects réglementaires, financiers, opérationnels et d\'impact social.'
    );
    
    // Tableau récapitulatif Top 5
    const top5Data = [
      ['Rang', 'Ville', 'Score Global', 'Statut', 'ROI 3 ans', 'Points clés'],
      ['1', 'Paris', '7.87/10', 'RECOMMANDÉ', '171.6%', 'Proximité CI, écosystème mature'],
      ['2', 'Genève', '7.72/10', 'RECOMMANDÉ', '185.2%', 'Hub financier, expertise trading'],
      ['3', 'Amsterdam', '7.65/10', 'RECOMMANDÉ', '188.6%', 'Port européen, proximité Afrique'],
      ['4', 'Singapour', '7.49/10', 'RECOMMANDÉ', '327.5%', 'Hub Asie, ROI exceptionnel'],
      ['5', 'Hambourg', '6.78/10', 'POSSIBLE', '140.9%', 'Port majeur, liens commerciaux']
    ];
    
    this.checkNewPage(80);
    this.doc.autoTable({
      head: [top5Data[0]],
      body: top5Data.slice(1),
      startY: this.currentY,
      theme: 'grid',
      headStyles: {
        fillColor: [91, 94, 166],
        textColor: 255,
        fontSize: 10
      },
      styles: {
        fontSize: 9,
        cellPadding: 3
      },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 25 },
        2: { cellWidth: 25 },
        3: { cellWidth: 30 },
        4: { cellWidth: 25 },
        5: { cellWidth: 50 }
      }
    });
    
    this.currentY = this.doc.lastAutoTable.finalY + 10;
    
    this.addParagraph(
      'Paris se positionne comme le choix optimal avec un score pondéré de 7.87/10, combinant proximité avec la Côte d\'Ivoire, ' +
      'un écosystème financier mature et des liens historiques forts avec l\'Afrique de l\'Ouest.'
    );
    
    this.addFooter();
  }

  // Générer le rapport complet
  public async generateReport(): Blob {
    try {
      // Page de garde
      this.addCoverPage();
      
      // Sommaire
      this.addTableOfContents();
      
      // Sections du rapport
      this.addDashboardSection();
      
      // Pour l'instant on s'arrête là, on ajoutera les autres sections après
      // TODO: Ajouter les autres sections
      
      // Retourner le PDF sous forme de Blob
      return this.doc.output('blob');
    } catch (error) {
      console.error('Erreur génération PDF:', error);
      throw error;
    }
  }
}

export default NeskaoPDFExportService;