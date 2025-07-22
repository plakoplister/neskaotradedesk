import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => void;
  lastAutoTable: { finalY: number };
}

export class PDFGenerator {
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

  // Ajouter les logos dans l'en-tête
  private addHeader() {
    try {
      // Logo Neskao à gauche (20x8mm)
      this.doc.addImage('/images/Logo NESKAO.jpeg', 'JPEG', this.margin, 5, 20, 8);
      
      // Logo Mereya à droite (20x8mm)
      this.doc.addImage('/images/Logo MEREYA.png', 'PNG', this.pageWidth - this.margin - 20, 5, 20, 8);
    } catch (error) {
      // Fallback texte si images ne chargent pas
      this.doc.setFontSize(10);
      this.doc.setTextColor(100, 100, 100);
      this.doc.text('NESKAO', this.margin, 10);
      this.doc.text('MEREYA', this.pageWidth - this.margin - 20, 10, { align: 'right' });
    }
    
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
    this.doc.setTextColor(31, 78, 121);
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

  // Page de garde avec l'image fournie
  private addCoverPage() {
    try {
      // Utiliser l'image de page de garde fournie
      this.doc.addImage('/images/PageDeGarde.png', 'PNG', 0, 0, this.pageWidth, this.pageHeight);
    } catch (error) {
      // Fallback si l'image ne charge pas
      this.doc.setFillColor(91, 94, 166);
      this.doc.rect(0, 0, this.pageWidth, this.pageHeight, 'F');
      
      this.doc.setTextColor(255, 255, 255);
      this.doc.setFontSize(28);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text("Rapport d'étude stratégique", this.pageWidth / 2, 100, { align: 'center' });
      
      this.doc.setFontSize(16);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text("Élaboration d'une stratégie d'implantation d'un bureau", this.pageWidth / 2, 120, { align: 'center' });
      this.doc.text("de trading de cacao et ses dérivés", this.pageWidth / 2, 130, { align: 'center' });
      
      this.doc.setFontSize(24);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text("NESKAO", this.pageWidth / 2, 180, { align: 'center' });
      
      this.doc.setFontSize(12);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(new Date().toLocaleDateString('fr-FR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }), this.pageWidth / 2, 250, { align: 'center' });
      
      this.doc.text("Auteur : Mereya Advisory", 20, 270);
      this.doc.setFontSize(10);
      this.doc.text("Version 3.1 - Confidentiel", this.pageWidth - 20, 270, { align: 'right' });
    }
    
    this.doc.addPage();
    this.pageNumber++;
  }

  // Table des matières complète
  private addTableOfContents() {
    this.addHeader();
    this.currentY = 40;
    
    this.doc.setFontSize(20);
    this.doc.setTextColor(31, 78, 121);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Table des matières', this.margin, this.currentY);
    this.currentY += 15;
    
    const sections = [
      { title: '1. Dashboard - Vue d\'ensemble des 12 localisations', page: 3 },
      { title: '2. Contexte de la mission et objectifs stratégiques', page: 5 },
      { title: '3. Analyse réglementaire comparative', page: 7 },
      { title: '   • Conditions d\'établissement par juridiction', page: 7 },
      { title: '   • Top 5 réglementaire avec scores détaillés', page: 8 },
      { title: '4. Mix produits et stratégie commerciale', page: 10 },
      { title: '   • Gamme produits et volumes cibles', page: 10 },
      { title: '   • Stratégies de pricing différenciées', page: 11 },
      { title: '5. Structure des coûts SG&A', page: 13 },
      { title: '   • Comparatif coûts par localisation', page: 13 },
      { title: '   • Analyse Top 5 vs ensemble', page: 14 },
      { title: '6. Analyse de rentabilité sur 3 ans', page: 16 },
      { title: '   • P&L détaillés toutes localisations', page: 16 },
      { title: '   • ROI et payback - Top 5', page: 18 },
      { title: '7. Plan de financement et conditions DFI', page: 20 },
      { title: '   • Besoins de financement par ville', page: 20 },
      { title: '   • Accès aux financements de développement', page: 21 },
      { title: '8. Impact social et critères ESG', page: 23 },
      { title: '   • Proximité Côte d\'Ivoire et diaspora', page: 23 },
      { title: '   • Programmes de formation et développement', page: 24 },
      { title: '9. Analyse décisionnelle multicritère', page: 26 },
      { title: '   • Classement des 12 localisations', page: 26 },
      { title: '   • Matrice de décision pondérée', page: 27 },
      { title: '10. Gestion des risques et mitigation', page: 29 },
      { title: '    • Matrice des risques par catégorie', page: 29 },
      { title: '    • Plans de mitigation prioritaires', page: 30 },
      { title: '11. Prochaines étapes et roadmap', page: 32 },
      { title: '    • Phases d\'implémentation sur 18 mois', page: 32 },
      { title: '    • Budget et ressources requises', page: 33 },
      { title: '12. Recommandations finales', page: 35 },
      { title: '    • Choix stratégique et justification', page: 35 },
      { title: '    • Alternatives et plan B', page: 36 }
    ];
    
    this.doc.setFontSize(11);
    this.doc.setFont('helvetica', 'normal');
    sections.forEach(section => {
      this.checkNewPage(8);
      this.doc.setTextColor(60, 60, 60);
      
      // Indentation pour les sous-sections
      const indent = section.title.startsWith('   ') ? this.margin + 10 : 
                    section.title.startsWith('    ') ? this.margin + 15 : this.margin;
      
      this.doc.text(section.title.trim(), indent, this.currentY);
      
      // Ligne pointillée
      if (!section.title.startsWith('   ')) {
        this.doc.setDrawColor(200, 200, 200);
        this.doc.setLineDashPattern([1, 1], 0);
        const textWidth = this.doc.getTextWidth(section.title.trim());
        this.doc.line(indent + textWidth + 5, this.currentY - 2, this.pageWidth - this.margin - 15, this.currentY - 2);
        this.doc.setLineDashPattern([], 0);
      }
      
      // Numéro de page
      this.doc.text(section.page.toString(), this.pageWidth - this.margin - 10, this.currentY);
      this.currentY += 6;
    });
    
    this.addFooter();
    this.doc.addPage();
    this.pageNumber++;
  }

  // Dashboard section avec données des 12 localisations
  private addDashboardSection() {
    this.addHeader();
    this.currentY = 30;
    
    this.addSectionTitle('1. Dashboard - Vue d\'ensemble des 12 localisations');
    
    this.addParagraph(
      'Cette analyse comparative évalue 12 localisations potentielles pour l\'implantation du bureau de trading de Neskao. ' +
      'L\'évaluation s\'appuie sur une approche multicritère intégrant des aspects réglementaires, financiers, opérationnels et d\'impact social.'
    );
    
    // Tableau complet des 12 localisations
    const all12Data = [
      ['Rang', 'Ville', 'Zone', 'Score Global', 'Statut', 'ROI 3 ans', 'EBITDA An3'],
      ['1', 'Paris', 'Europe', '7.87/10', 'RECOMMANDÉ', '171.6%', '9.93 M€'],
      ['2', 'Genève', 'Europe', '7.72/10', 'RECOMMANDÉ', '185.2%', '9.09 M€'],
      ['3', 'Amsterdam', 'Europe', '7.65/10', 'RECOMMANDÉ', '188.6%', '9.40 M€'],
      ['4', 'Singapour', 'Asie', '7.49/10', 'RECOMMANDÉ', '327.5%', '9.40 M€'],
      ['5', 'Hambourg', 'Europe', '6.78/10', 'POSSIBLE', '140.9%', '8.96 M€'],
      ['6', 'Londres', 'Europe', '6.72/10', 'POSSIBLE', '145.8%', '8.47 M€'],
      ['7', 'Chypre', 'Europe', '6.51/10', 'POSSIBLE', '165.0%', '9.60 M€'],
      ['8', 'Maurice', 'Afrique', '5.62/10', 'DÉCONSEILLÉ', '89.5%', '7.8 M€'],
      ['9', 'Andorre', 'Europe', '4.20/10', 'DÉCONSEILLÉ', '87.2%', '10.25 M€'],
      ['10', 'Dubai', 'M-Orient', '3.50/10', 'DÉCONSEILLÉ', '112.0%', '9.31 M€'],
      ['11', 'Maroc CFC', 'Afrique', '2.00/10', 'NO GO', '25.0%', '5.2 M€'],
      ['12', 'Tel Aviv', 'M-Orient', '1.50/10', 'NO GO', '45.2%', '6.8 M€']
    ];
    
    this.addParagraph('Classement général des 12 localisations évaluées :');
    this.checkNewPage(120);
    autoTable(this.doc, {
      head: [all12Data[0]],
      body: all12Data.slice(1),
      startY: this.currentY,
      theme: 'grid',
      headStyles: {
        fillColor: [91, 94, 166],
        textColor: [255, 255, 255],
        fontSize: 9,
        fontStyle: 'bold'
      },
      styles: {
        fontSize: 8,
        cellPadding: 2
      },
      columnStyles: {
        0: { cellWidth: 12, halign: 'center' },
        1: { cellWidth: 28 },
        2: { cellWidth: 18 },
        3: { cellWidth: 22, halign: 'center' },
        4: { cellWidth: 30, halign: 'center' },
        5: { cellWidth: 24, halign: 'center' },
        6: { cellWidth: 22, halign: 'right' }
      }
    });
    
    this.currentY = this.doc.lastAutoTable.finalY + 15;
    
    // Focus sur le Top 5 détaillé
    this.addParagraph('Focus Top 5 - Analyse détaillée par critère :');
    
    const top5DetailData = [
      ['#', 'Ville', 'Score Final', 'Impact Social', 'Score ROI', 'Score Régl.', 'Score Fin.'],
      ['1', 'Paris', '7.87', '8.8/10', '5.46', '9.2/10', '8.5/10'],
      ['2', 'Genève', '7.72', '7.9/10', '5.84', '8.9/10', '7.8/10'],
      ['3', 'Amsterdam', '7.65', '8.1/10', '5.61', '8.7/10', '8.2/10'],
      ['4', 'Singapour', '7.49', '6.5/10', '10.0', '8.1/10', '9.1/10'],
      ['5', 'Hambourg', '6.78', '7.2/10', '4.19', '7.5/10', '6.9/10']
    ];
    
    this.checkNewPage(80);
    autoTable(this.doc, {
      head: [top5DetailData[0]],
      body: top5DetailData.slice(1),
      startY: this.currentY,
      theme: 'grid',
      headStyles: {
        fillColor: [91, 94, 166],
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold'
      },
      styles: {
        fontSize: 9,
        cellPadding: 3
      },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 25 },
        2: { cellWidth: 25, halign: 'center' },
        3: { cellWidth: 25, halign: 'center' },
        4: { cellWidth: 25, halign: 'center' },
        5: { cellWidth: 25, halign: 'center' },
        6: { cellWidth: 25, halign: 'center' }
      }
    });
    
    this.currentY = this.doc.lastAutoTable.finalY + 10;
    
    this.addParagraph(
      'Paris se positionne comme le choix optimal avec un score pondéré de 7.87/10, combinant proximité avec la Côte d\'Ivoire, ' +
      'un écosystème financier mature et des liens historiques forts avec l\'Afrique de l\'Ouest. Malgré une fiscalité élevée (25% + CVAE), ' +
      'la ville offre le meilleur équilibre entre performance financière et impact social.'
    );
  }

  // Contexte section
  private addContextSection() {
    this.addFooter();
    this.doc.addPage();
    this.pageNumber++;
    this.addHeader();
    this.currentY = 30;
    
    this.addSectionTitle('2. Contexte de la mission');
    
    this.addParagraph(
      'Neskao, acteur majeur de la transformation du cacao en Côte d\'Ivoire, souhaite établir un bureau de trading international ' +
      'pour optimiser ses opérations commerciales et renforcer sa position sur les marchés mondiaux.'
    );
    
    this.addParagraph(
      'Objectifs stratégiques :'
    );
    
    const objectifs = [
      '• Optimiser les marges par une présence directe sur les marchés',
      '• Sécuriser l\'approvisionnement et les débouchés commerciaux',
      '• Développer des relations directes avec les clients internationaux',
      '• Maîtriser les risques de marché par des opérations de couverture',
      '• Contribuer au développement de la filière cacao ivoirienne'
    ];
    
    objectifs.forEach(obj => {
      this.doc.setFontSize(10);
      this.doc.text(obj, this.margin + 5, this.currentY);
      this.currentY += 6;
    });
    
    this.currentY += 5;
    
    this.addParagraph(
      'Cette étude analyse 12 localisations potentielles selon une grille multicritère pondérée, intégrant les dimensions ' +
      'réglementaires (15%), impact social (30%), rentabilité (15%), financement DFI (10%) et génération de cash-flow (30%).'
    );
  }

  // Analyse réglementaire
  private addReglementationSection() {
    this.addFooter();
    this.doc.addPage();
    this.pageNumber++;
    this.addHeader();
    this.currentY = 30;
    
    this.addSectionTitle('3. Analyse réglementaire');
    
    this.addParagraph(
      'L\'analyse réglementaire évalue les conditions d\'établissement et d\'exercice dans chaque juridiction, ' +
      'incluant les autorisations de trading, les conventions fiscales avec la Côte d\'Ivoire, et les restrictions opérationnelles.'
    );
    
    // Tableau Top 5 réglementaire
    const reglementationData = [
      ['Ville', 'Score Rég.', 'Trading', 'Convention CI', 'Restrictions'],
      ['Paris', '9.2/10', 'Autorisé', 'Oui', 'Minimales'],
      ['Genève', '8.9/10', 'Autorisé', 'Oui', 'Conformité stricte'],
      ['Amsterdam', '8.7/10', 'Autorisé', 'Oui', 'MIFID II'],
      ['Singapour', '8.1/10', 'Autorisé', 'Non', 'Licence MAS requise'],
      ['Londres', '7.8/10', 'Limité', 'Oui', 'Post-Brexit']
    ];
    
    this.checkNewPage(60);
    autoTable(this.doc, {
      head: [reglementationData[0]],
      body: reglementationData.slice(1),
      startY: this.currentY,
      theme: 'grid',
      headStyles: {
        fillColor: [91, 94, 166],
        textColor: [255, 255, 255],
        fontSize: 10
      },
      styles: { fontSize: 9, cellPadding: 3 }
    });
    
    this.currentY = this.doc.lastAutoTable.finalY + 10;
    
    this.addParagraph(
      'Paris et Genève dominent avec des scores supérieurs à 9/10, bénéficiant de cadres réglementaires matures ' +
      'et de conventions fiscales favorables avec la Côte d\'Ivoire.'
    );
  }

  // Mix produits
  private addMixProduitsSection() {
    this.addFooter();
    this.doc.addPage();
    this.pageNumber++;
    this.addHeader();
    this.currentY = 30;
    
    this.addSectionTitle('4. Mix produits et stratégie commerciale');
    
    this.addParagraph(
      'La stratégie produit s\'articule autour de 4 gammes principales avec des approches de pricing différenciées ' +
      'selon les caractéristiques de chaque produit et les conditions de marché.'
    );
    
    // Tableau des produits
    const produitsData = [
      ['Produit', 'Volume (T)', 'Prix (EUR/T)', 'Approche', 'Marge %'],
      ['Masse de cacao', '15,000', '8,879', 'Hybride', '2.0%'],
      ['Beurre standard', '8,000', '15,716', 'Hybride', '2.0%'],
      ['Beurre désodorisé', '2,000', '16,220', 'Hybride', '2.0%'],
      ['Poudre standard', '12,000', '9,470', 'Market', '2.0%'],
      ['Poudre alcalinisée', '3,000', '10,147', 'Market', '2.0%']
    ];
    
    this.checkNewPage(70);
    autoTable(this.doc, {
      head: [produitsData[0]],
      body: produitsData.slice(1),
      startY: this.currentY,
      theme: 'grid',
      headStyles: {
        fillColor: [91, 94, 166],
        textColor: [255, 255, 255],
        fontSize: 10
      },
      styles: { fontSize: 9, cellPadding: 3 },
      columnStyles: {
        1: { halign: 'right' },
        2: { halign: 'right' },
        4: { halign: 'right' }
      }
    });
    
    this.currentY = this.doc.lastAutoTable.finalY + 10;
    
    this.addParagraph(
      'Volume total cible : 40,000 tonnes. L\'approche hybride (cost-plus/market) pour les masses et beurres ' +
      'permet d\'optimiser les marges tout en restant compétitif sur les marchés internationaux.'
    );
  }

  // SG&A
  private addSGASection() {
    this.addFooter();
    this.doc.addPage();
    this.pageNumber++;
    this.addHeader();
    this.currentY = 30;
    
    this.addSectionTitle('5. Structure des coûts (SG&A)');
    
    this.addParagraph(
      'Les coûts SG&A varient significativement selon les localisations, impactant directement la rentabilité. ' +
      'Paris et Genève présentent les coûts les plus élevés, compensés par leur performance commerciale.'
    );
    
    // Tableau SG&A comparatif
    const sgaData = [
      ['Poste', 'Paris', 'Genève', 'Amsterdam', 'Singapour'],
      ['Personnel (k€)', '750', '900', '650', '580'],
      ['Bureaux (k€)', '180', '240', '120', '150'],
      ['IT & Systèmes (k€)', '120', '100', '110', '100'],
      ['Compliance (k€)', '180', '150', '140', '120'],
      ['Total An1 (k€)', '1,380', '1,540', '1,170', '1,100']
    ];
    
    this.checkNewPage(70);
    autoTable(this.doc, {
      head: [sgaData[0]],
      body: sgaData.slice(1),
      startY: this.currentY,
      theme: 'grid',
      headStyles: {
        fillColor: [91, 94, 166],
        textColor: [255, 255, 255],
        fontSize: 10
      },
      styles: { fontSize: 9, cellPadding: 3 },
      columnStyles: {
        1: { halign: 'right' },
        2: { halign: 'right' },
        3: { halign: 'right' },
        4: { halign: 'right' }
      }
    });
    
    this.currentY = this.doc.lastAutoTable.finalY + 10;
    
    this.addParagraph(
      'Singapour présente la structure de coûts la plus compétitive (1,1M€), tandis que Genève affiche ' +
      'les coûts les plus élevés (1,54M€) en raison des salaires et loyers premium.'
    );
  }

  // Rentabilité
  private addRentabiliteSection() {
    this.addFooter();
    this.doc.addPage();
    this.pageNumber++;
    this.addHeader();
    this.currentY = 30;
    
    this.addSectionTitle('6. Analyse de rentabilité');
    
    this.addParagraph(
      'L\'analyse de rentabilité sur 3 ans révèle des performances différenciées. Paris offre le meilleur équilibre ' +
      'risque/rendement avec un EBITDA progressif et un ROI attractif de 171.6%.'
    );
    
    // Tableau P&L synthétique
    const rentabiliteData = [
      ['Ville', 'EBITDA An1', 'EBITDA An3', 'ROI 3 ans', 'Payback'],
      ['Paris', '0.52 M€', '9.93 M€', '171.6%', '2.3 ans'],
      ['Genève', '-0.23 M€', '9.09 M€', '185.2%', '2.4 ans'],
      ['Amsterdam', '0.07 M€', '9.40 M€', '188.6%', '2.3 ans'],
      ['Singapour', '0.02 M€', '9.40 M€', '327.5%', '2.2 ans'],
      ['Hambourg', '-0.20 M€', '8.96 M€', '140.9%', '2.5 ans']
    ];
    
    this.checkNewPage(70);
    autoTable(this.doc, {
      head: [rentabiliteData[0]],
      body: rentabiliteData.slice(1),
      startY: this.currentY,
      theme: 'grid',
      headStyles: {
        fillColor: [91, 94, 166],
        textColor: [255, 255, 255],
        fontSize: 10
      },
      styles: { fontSize: 9, cellPadding: 3 },
      columnStyles: {
        1: { halign: 'right' },
        2: { halign: 'right' },
        3: { halign: 'right' },
        4: { halign: 'right' }
      }
    });
    
    this.currentY = this.doc.lastAutoTable.finalY + 10;
    
    this.addParagraph(
      'Singapour présente le ROI le plus élevé (327.5%) mais avec une distance géographique importante. ' +
      'Paris combine performance financière solide et proximité stratégique avec la Côte d\'Ivoire.'
    );
  }

  // Financement
  private addFinancementSection() {
    this.addFooter();
    this.doc.addPage();
    this.pageNumber++;
    this.addHeader();
    this.currentY = 30;
    
    this.addSectionTitle('7. Plan de financement');
    
    this.addParagraph(
      'Le financement mobilise des fonds propres et de la dette, avec des besoins variant de 2.5M€ à 4M€ selon ' +
      'les localisations. Les institutions de financement du développement (DFI) offrent des opportunités privilégiées.'
    );
    
    // Tableau financement
    const financementData = [
      ['Ville', 'Capital requis', 'Dette/Equity', 'Coût financement', 'DFI Score'],
      ['Paris', '3.0 M€', '70/30', '4.2%', '8.5/10'],
      ['Genève', '3.8 M€', '60/40', '3.8%', '7.8/10'],
      ['Amsterdam', '2.8 M€', '70/30', '4.0%', '8.2/10'],
      ['Singapour', '2.5 M€', '75/25', '3.5%', '9.1/10'],
      ['Chypre', '2.4 M€', '80/20', '5.5%', '6.8/10']
    ];
    
    this.checkNewPage(70);
    autoTable(this.doc, {
      head: [financementData[0]],
      body: financementData.slice(1),
      startY: this.currentY,
      theme: 'grid',
      headStyles: {
        fillColor: [91, 94, 166],
        textColor: [255, 255, 255],
        fontSize: 10
      },
      styles: { fontSize: 9, cellPadding: 3 }
    });
    
    this.currentY = this.doc.lastAutoTable.finalY + 10;
    
    this.addParagraph(
      'Singapour offre les meilleures conditions de financement DFI (score 9.1/10) avec des taux privilégiés. ' +
      'Paris maintient un bon accès aux financements européens et AFD.'
    );
  }

  // Impact social
  private addImpactSocialSection() {
    this.addFooter();
    this.doc.addPage();
    this.pageNumber++;
    this.addHeader();
    this.currentY = 30;
    
    this.addSectionTitle('8. Impact social et ESG');
    
    this.addParagraph(
      'L\'impact social représente 30% de la pondération finale. L\'analyse privilégie la proximité avec la ' +
      'Côte d\'Ivoire, les programmes de formation, et l\'écosystème ESG local.'
    );
    
    // Tableau impact social
    const impactData = [
      ['Ville', 'Proximité CI', 'Score ESG', 'Formation CI', 'Score Global'],
      ['Paris', 'Excellent', '8.5/10', 'Hub diaspora', '8.8/10'],
      ['Amsterdam', 'Très bon', '8.2/10', 'Port Afrique', '8.1/10'],
      ['Genève', 'Bon', '9.1/10', 'Standards int.', '7.9/10'],
      ['Londres', 'Moyen', '7.8/10', 'City expertise', '7.2/10'],
      ['Singapour', 'Faible', '8.0/10', 'Hub Asie', '6.5/10']
    ];
    
    this.checkNewPage(70);
    autoTable(this.doc, {
      head: [impactData[0]],
      body: impactData.slice(1),
      startY: this.currentY,
      theme: 'grid',
      headStyles: {
        fillColor: [91, 94, 166],
        textColor: [255, 255, 255],
        fontSize: 10
      },
      styles: { fontSize: 9, cellPadding: 3 }
    });
    
    this.currentY = this.doc.lastAutoTable.finalY + 10;
    
    this.addParagraph(
      'Objectifs impact : 10 bourses de formation en trading sur 3 ans, développement de l\'écosystème ' +
      'cacao ivoirien, et renforcement des liens commerciaux Sud-Sud.'
    );
  }

  // Analyse décisionnelle avec les 12 localisations
  private addAnalyseDecisionnelleSection() {
    this.addFooter();
    this.doc.addPage();
    this.pageNumber++;
    this.addHeader();
    this.currentY = 30;
    
    this.addSectionTitle('9. Analyse décisionnelle multicritère');
    
    this.addParagraph(
      'L\'analyse multicritère pondérée classe les 12 localisations selon 5 critères : réglementation (15%), ' +
      'impact social (30%), ROI (15%), financement DFI (10%), et cash-flow (30%). Cette pondération privilégie ' +
      'l\'impact social et la génération de trésorerie, critères stratégiques pour Neskao.'
    );
    
    // Tableau complet des 12 localisations avec détail des scores
    const classementCompletData = [
      ['Rang', 'Ville', 'Score Final', 'Régl.', 'Impact', 'ROI', 'DFI', 'Cash', 'Décision'],
      ['1', 'Paris', '7.87', '9.2', '8.8', '5.46', '8.5', '8.1', 'RECOMMANDÉ'],
      ['2', 'Genève', '7.72', '8.9', '7.9', '5.84', '7.8', '8.3', 'RECOMMANDÉ'],
      ['3', 'Amsterdam', '7.65', '8.7', '8.1', '5.61', '8.2', '7.9', 'RECOMMANDÉ'],
      ['4', 'Singapour', '7.49', '8.1', '6.5', '10.0', '9.1', '7.2', 'RECOMMANDÉ'],
      ['5', 'Hambourg', '6.78', '7.5', '7.2', '4.19', '6.9', '7.4', 'POSSIBLE'],
      ['6', 'Londres', '6.72', '7.8', '7.2', '3.34', '7.1', '7.8', 'POSSIBLE'],
      ['7', 'Chypre', '6.51', '6.2', '6.8', '4.95', '6.8', '7.6', 'POSSIBLE'],
      ['8', 'Maurice', '5.62', '5.8', '7.5', '1.09', '6.2', '6.1', 'DÉCONSEILLÉ'],
      ['9', 'Andorre', '4.20', '4.5', '5.2', '3.00', '4.8', '5.9', 'DÉCONSEILLÉ'],
      ['10', 'Dubai', '3.50', '6.1', '4.2', '3.72', '5.9', '4.8', 'DÉCONSEILLÉ'],
      ['11', 'Maroc CFC', '2.00', '3.2', '2.8', '0.00', '3.5', '2.9', 'NO GO'],
      ['12', 'Tel Aviv', '1.50', '2.8', '1.8', '2.55', '2.1', '2.4', 'NO GO']
    ];
    
    this.addParagraph('Matrice décisionnelle complète - Scores par critère (/10) :');
    this.checkNewPage(140);
    autoTable(this.doc, {
      head: [classementCompletData[0]],
      body: classementCompletData.slice(1),
      startY: this.currentY,
      theme: 'grid',
      headStyles: {
        fillColor: [91, 94, 166],
        textColor: [255, 255, 255],
        fontSize: 8,
        fontStyle: 'bold'
      },
      styles: {
        fontSize: 7,
        cellPadding: 2
      },
      columnStyles: {
        0: { cellWidth: 12, halign: 'center' },
        1: { cellWidth: 24 },
        2: { cellWidth: 18, halign: 'center' },
        3: { cellWidth: 16, halign: 'center' },
        4: { cellWidth: 16, halign: 'center' },
        5: { cellWidth: 16, halign: 'center' },
        6: { cellWidth: 16, halign: 'center' },
        7: { cellWidth: 16, halign: 'center' },
        8: { cellWidth: 26, halign: 'center' }
      }
    });
    
    this.currentY = this.doc.lastAutoTable.finalY + 15;
    
    // Tableau de synthèse par statut
    this.addParagraph('Synthèse par statut décisionnel :');
    
    const syntheseData = [
      ['Statut', 'Nombre', 'Villes', 'Score moyen', 'Action recommandée'],
      ['RECOMMANDÉ', '4', 'Paris, Genève, Amsterdam, Singapour', '7.68', 'Analyse approfondie'],
      ['POSSIBLE', '3', 'Hambourg, Londres, Chypre', '6.67', 'Plan B crédible'],
      ['DÉCONSEILLÉ', '3', 'Maurice, Andorre, Dubai', '4.44', 'Écarter du processus'],
      ['NO GO', '2', 'Maroc CFC, Tel Aviv', '1.75', 'Exclusion définitive']
    ];
    
    this.checkNewPage(70);
    autoTable(this.doc, {
      head: [syntheseData[0]],
      body: syntheseData.slice(1),
      startY: this.currentY,
      theme: 'grid',
      headStyles: {
        fillColor: [91, 94, 166],
        textColor: [255, 255, 255],
        fontSize: 10
      },
      styles: { fontSize: 9, cellPadding: 3 }
    });
    
    this.currentY = this.doc.lastAutoTable.finalY + 10;
    
    this.addParagraph(
      'Paris s\'impose avec 7.87/10, démontrant la pertinence d\'un choix équilibrant performance financière, ' +
      'proximité géographique et impact social positif pour la Côte d\'Ivoire. Le Top 4 RECOMMANDÉ offre une ' +
      'excellente base de négociation avec des alternatives crédibles dans différentes zones géographiques.'
    );
  }

  // Gestion des risques
  private addRisquesSection() {
    this.addFooter();
    this.doc.addPage();
    this.pageNumber++;
    this.addHeader();
    this.currentY = 30;
    
    this.addSectionTitle('10. Gestion des risques');
    
    this.addParagraph(
      'L\'analyse des risques identifie les principales menaces et mesures de mitigation pour chaque localisation. ' +
      'Les risques réglementaires, opérationnels et géopolitiques sont évalués.'
    );
    
    // Tableau des risques critiques
    const risquesData = [
      ['Risque', 'Impact', 'Probabilité', 'Mitigation', 'Priorité'],
      ['Volatilité cacao', 'Élevé', 'Élevée', 'Hedging systématique', 'Critique'],
      ['Réglementation', 'Moyen', 'Moyenne', 'Veille juridique', 'Élevée'],
      ['Change EUR/USD', 'Élevé', 'Élevée', 'Couverture 80%', 'Critique'],
      ['Talent shortage', 'Moyen', 'Moyenne', 'Partenariats écoles', 'Moyenne'],
      ['Cyber-sécurité', 'Élevé', 'Faible', 'SOC externe', 'Élevée']
    ];
    
    this.checkNewPage(70);
    autoTable(this.doc, {
      head: [risquesData[0]],
      body: risquesData.slice(1),
      startY: this.currentY,
      theme: 'grid',
      headStyles: {
        fillColor: [91, 94, 166],
        textColor: [255, 255, 255],
        fontSize: 10
      },
      styles: { fontSize: 9, cellPadding: 3 }
    });
    
    this.currentY = this.doc.lastAutoTable.finalY + 10;
    
    this.addParagraph(
      'Budget de mitigation estimé : 250k€/an. Focus prioritaire sur la gestion des risques de marché ' +
      '(volatilité prix, change) représentant 70% de l\'exposition totale.'
    );
  }

  // Prochaines étapes
  private addNextStepsSection() {
    this.addFooter();
    this.doc.addPage();
    this.pageNumber++;
    this.addHeader();
    this.currentY = 30;
    
    this.addSectionTitle('11. Prochaines étapes');
    
    this.addParagraph(
      'Le plan d\'implémentation s\'articule autour de 3 phases sur 18 mois, de la validation du choix ' +
      'stratégique au lancement opérationnel du bureau de trading.'
    );
    
    // Timeline des phases
    this.doc.setFontSize(12);
    this.doc.setTextColor(31, 78, 121);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Phase 1 - Validation stratégique (Mois 1-3)', this.margin, this.currentY);
    this.currentY += 8;
    
    this.doc.setFontSize(10);
    this.doc.setTextColor(60, 60, 60);
    this.doc.setFont('helvetica', 'normal');
    const phase1Items = [
      '• Validation du choix de localisation par le Conseil',
      '• Études juridiques et fiscales approfondies',
      '• Négociation des conditions de financement',
      '• Sélection des partenaires locaux'
    ];
    
    phase1Items.forEach(item => {
      this.doc.text(item, this.margin + 5, this.currentY);
      this.currentY += 6;
    });
    
    this.currentY += 8;
    this.doc.setFontSize(12);
    this.doc.setTextColor(31, 78, 121);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Phase 2 - Setup opérationnel (Mois 4-12)', this.margin, this.currentY);
    this.currentY += 8;
    
    this.doc.setFontSize(10);
    this.doc.setTextColor(60, 60, 60);
    this.doc.setFont('helvetica', 'normal');
    const phase2Items = [
      '• Obtention des licences et autorisations',
      '• Recrutement de l\'équipe (5-8 personnes)',
      '• Mise en place de l\'infrastructure IT',
      '• Développement des relations commerciales'
    ];
    
    phase2Items.forEach(item => {
      this.doc.text(item, this.margin + 5, this.currentY);
      this.currentY += 6;
    });
    
    this.currentY += 8;
    this.doc.setFontSize(12);
    this.doc.setTextColor(31, 78, 121);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Phase 3 - Lancement commercial (Mois 13-18)', this.margin, this.currentY);
    this.currentY += 8;
    
    this.doc.setFontSize(10);
    this.doc.setTextColor(60, 60, 60);
    this.doc.setFont('helvetica', 'normal');
    const phase3Items = [
      '• Première transaction de trading',
      '• Montée en puissance progressive des volumes',
      '• Optimisation des processus opérationnels',
      '• Évaluation performance 6 mois'
    ];
    
    phase3Items.forEach(item => {
      this.doc.text(item, this.margin + 5, this.currentY);
      this.currentY += 6;
    });
    
    this.currentY += 10;
    this.addParagraph('Budget global estimé : À discuter ensemble selon la localisation retenue.');
  }

  // Recommandations finales
  private addRecommandationsSection() {
    this.addFooter();
    this.doc.addPage();
    this.pageNumber++;
    this.addHeader();
    this.currentY = 30;
    
    this.addSectionTitle('12. Recommandations finales');
    
    this.addParagraph(
      'Sur la base de l\'analyse multicritère, nous recommandons PARIS comme localisation optimale pour ' +
      'le bureau de trading Neskao, avec Genève et Amsterdam comme alternatives crédibles.'
    );
    
    // Recommandation principale
    this.doc.setFillColor(248, 250, 252);
    this.doc.rect(this.margin, this.currentY, this.contentWidth, 30, 'F');
    this.doc.setDrawColor(91, 94, 166);
    this.doc.rect(this.margin, this.currentY, this.contentWidth, 30, 'S');
    
    this.doc.setFontSize(14);
    this.doc.setTextColor(31, 78, 121);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Recommandation : PARIS', this.margin + 10, this.currentY + 10);
    
    this.doc.setFontSize(11);
    this.doc.setTextColor(60, 60, 60);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text('Score pondéré : 7.87/10 | ROI 3 ans : 171.6% | Statut : RECOMMANDÉ', this.margin + 10, this.currentY + 20);
    
    this.currentY += 40;
    
    // Points clés
    this.doc.setFontSize(12);
    this.doc.setTextColor(31, 78, 121);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Points clés de la recommandation :', this.margin, this.currentY);
    this.currentY += 10;
    
    this.doc.setFontSize(10);
    this.doc.setTextColor(60, 60, 60);
    this.doc.setFont('helvetica', 'normal');
    
    const pointsCles = [
      '✓ Proximité géographique et culturelle avec la Côte d\'Ivoire',
      '✓ Écosystème financier mature et reconnu internationalement',
      '✓ Liens historiques forts avec l\'Afrique de l\'Ouest',
      '✓ Présence de la diaspora ivoirienne et expertise locale',
      '✓ Convention fiscale favorable et cadre réglementaire stable',
      '✓ Performance financière solide avec EBITDA positif dès l\'An 1',
      '✓ Impact social maximum pour le développement de la filière cacao'
    ];
    
    pointsCles.forEach(point => {
      this.doc.text(point, this.margin + 5, this.currentY);
      this.currentY += 6;
    });
    
    this.currentY += 10;
    this.addParagraph(
      'Cette recommandation s\'appuie sur une analyse rigoureuse intégrant performance financière, impact social ' +
      'et faisabilité opérationnelle. Paris maximise les synergies avec les objectifs stratégiques de Neskao ' +
      'tout en contribuant au développement durable de la filière cacao ivoirienne.'
    );
    
    // Signature
    this.currentY += 20;
    this.doc.setFontSize(10);
    this.doc.setTextColor(100, 100, 100);
    this.doc.text('Rapport établi par Mereya Advisory', this.margin, this.currentY);
    this.doc.text(new Date().toLocaleDateString('fr-FR'), this.pageWidth - this.margin - 30, this.currentY);
  }

  // Générer le rapport complet
  public generateReport(): Blob {
    try {
      // Page de garde
      this.addCoverPage();
      
      // Table des matières
      this.addTableOfContents();
      
      // Toutes les sections
      this.addDashboardSection();
      this.addContextSection();
      this.addReglementationSection();
      this.addMixProduitsSection();
      this.addSGASection();
      this.addRentabiliteSection();
      this.addFinancementSection();
      this.addImpactSocialSection();
      this.addAnalyseDecisionnelleSection();
      this.addRisquesSection();
      this.addNextStepsSection();
      this.addRecommandationsSection();
      
      // Dernière page
      this.addFooter();
      
      // Retourner le PDF
      return this.doc.output('blob');
    } catch (error) {
      console.error('Erreur dans generateReport:', error);
      throw error;
    }
  }
}

export default PDFGenerator;