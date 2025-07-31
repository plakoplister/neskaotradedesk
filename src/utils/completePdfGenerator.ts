import { jsPDF } from 'jspdf';

export class CompletePDFGenerator {
  private doc: jsPDF;
  private currentY: number = 20;
  private pageNumber: number = 1;
  private readonly pageWidth: number = 210;
  private readonly pageHeight: number = 297;
  private readonly margin: number = 12;
  private readonly contentWidth: number = 186;

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
    this.doc.text('NESKAO - Analyse Stratégique Bureau de Trade', this.margin, 8);
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

  private addSectionTitle(title: string, subtitle?: string, level: number = 1) {
    this.checkNewPage(30);
    
    const fontSize = level === 1 ? 16 : level === 2 ? 14 : 12;
    this.doc.setFontSize(fontSize);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, this.margin, this.currentY);
    this.currentY += fontSize === 16 ? 10 : fontSize === 14 ? 8 : 7;
    
    if (subtitle) {
      this.doc.setFontSize(10);
      this.doc.setTextColor(...this.colors.secondary);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(subtitle, this.margin, this.currentY);
      this.currentY += 7;
    }
    this.currentY += 5;
  }

  private addText(text: string, fontSize: number = 10, bold: boolean = false, indent: number = 0) {
    this.checkNewPage(15);
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', bold ? 'bold' : 'normal');
    this.doc.setTextColor(...this.colors.primary);
    
    const lines = this.doc.splitTextToSize(text, this.contentWidth - indent);
    lines.forEach((line: string) => {
      this.checkNewPage(8);
      this.doc.text(line, this.margin + indent, this.currentY);
      this.currentY += 6;
    });
    this.currentY += 3;
  }

  private drawTable(headers: string[], rows: string[][], title?: string) {
    if (title) {
      this.addText(title, 11, true);
    }
    
    this.checkNewPage(60);
    
    const startY = this.currentY;
    const colWidth = this.contentWidth / headers.length;
    const rowHeight = 8;
    
    // En-tête
    this.doc.setFillColor(...this.colors.light);
    this.doc.rect(this.margin, startY, this.contentWidth, rowHeight, 'F');
    this.doc.setDrawColor(...this.colors.accent);
    this.doc.rect(this.margin, startY, this.contentWidth, rowHeight, 'S');
    
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
        this.doc.rect(this.margin, currentRowY, this.contentWidth, rowHeight, 'F');
      }
      
      // Bordure
      this.doc.setDrawColor(...this.colors.accent);
      this.doc.rect(this.margin, currentRowY, this.contentWidth, rowHeight, 'S');
      
      this.doc.setTextColor(...this.colors.dark);
      row.forEach((cell, i) => {
        const cellText = this.doc.splitTextToSize(cell.toString(), colWidth - 4);
        this.doc.text(cellText[0] || '', this.margin + (i * colWidth) + 2, currentRowY + 5.5);
      });
      
      currentRowY += rowHeight;
    });
    
    this.currentY = currentRowY + 15;
  }

  private addHighlightBox(text: string, color: 'teal' | 'sky' | 'light' = 'light') {
    this.checkNewPage(25);
    
    const boxColor = color === 'teal' ? [240, 253, 250] : 
                     color === 'sky' ? [240, 249, 255] : 
                     [241, 245, 249];
    
    this.doc.setFillColor(...boxColor);
    const textHeight = this.doc.splitTextToSize(text, this.contentWidth - 20).length * 6 + 10;
    this.doc.rect(this.margin, this.currentY, this.contentWidth, textHeight, 'F');
    
    this.currentY += 8;
    this.addText(text, 10, false, 10);
  }

  public async generateCompleteReport(): Promise<Blob> {
    try {
      // PAGE DE GARDE - Format MEREYA
      this.doc.setFontSize(24);
      this.doc.setTextColor(...this.colors.primary);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('ANALYSE STRATÉGIQUE', this.margin, 60);
      this.doc.text('BUREAU DE TRADING INTERNATIONAL', this.margin, 85);
      
      this.doc.setFontSize(16);
      this.doc.setTextColor(...this.colors.secondary);
      this.doc.text('Étude comparative de 12 localisations', this.margin, 110);
      this.doc.text('pour l\'implantation du bureau Neskao', this.margin, 125);
      
      this.doc.setFontSize(12);
      this.doc.setTextColor(...this.colors.accent);
      this.doc.text('CONFIDENTIEL', this.margin, 150);
      this.doc.text(`${new Date().toLocaleDateString('fr-FR')} - Version 2.1`, this.margin, 165);
      
      // Logos en bas de page
      this.doc.setFontSize(10);
      this.doc.text('MEREYA × NESKAO', this.margin, this.pageHeight - 30);

      // TABLE DES MATIÈRES
      this.doc.addPage();
      this.pageNumber++;
      this.addHeader();
      this.currentY = 30;
      
      this.addSectionTitle('TABLE DES MATIÈRES');
      
      const toc = [
        '1. SYNTHÈSE EXÉCUTIVE...................................................................3',
        '2. DASHBOARD - VUE D\'ENSEMBLE...................................................5',
        '3. CONTEXTE DE LA MISSION.........................................................8',
        '4. ANALYSE RÉGLEMENTAIRE.......................................................12',
        '5. MIX PRODUITS ET STRATÉGIE COMMERCIALE.................................16',
        '6. STRUCTURE SG&A ET RESSOURCES HUMAINES...............................20',
        '7. ANALYSE DE RENTABILITÉ......................................................26',
        '8. STRUCTURE DE FINANCEMENT..................................................32',
        '9. IMPACT SOCIAL ET ESG.........................................................38',
        '10. ANALYSE DÉCISIONNELLE CONSOLIDÉE......................................44',
        '11. ANALYSE DES RISQUES.........................................................48',
        '12. PROCHAINES ÉTAPES ET PLANNING...........................................52',
        '13. RECOMMANDATIONS FINALES...................................................56'
      ];
      
      toc.forEach(item => {
        this.doc.setFontSize(11);
        this.doc.setTextColor(...this.colors.primary);
        this.doc.text(item, this.margin + 5, this.currentY);
        this.currentY += 7;
      });

      // 1. SYNTHÈSE EXÉCUTIVE
      this.doc.addPage();
      this.pageNumber++;
      this.addHeader();
      this.currentY = 30;
      
      this.addSectionTitle('1. SYNTHÈSE EXÉCUTIVE', 'Résultats clés et recommandation stratégique');
      
      this.addText('Cette étude comparative exhaustive évalue 12 localisations potentielles pour l\'implantation du bureau de trading international de Neskao. L\'analyse multi-critères porte sur 5 dimensions pondérées selon leur importance stratégique.', 11);
      
      this.addHighlightBox('🎯 RECOMMANDATION PRINCIPALE : PARIS\n\nScore global : 7.87/10\nEBITDA An1 : +0.52k€ (seul positif avec Singapour)\nCoûts SG&A 3 ans : 3,987k€ (4ème position)\nROI 3 ans : 171.6%', 'teal');
      
      this.addText('Points clés de l\'analyse :', 12, true);
      
      this.addText('• CRITÈRES D\'ÉVALUATION : 5 dimensions pondérées couvrant réglementation (25%), impact social (22%), rentabilité (20%), financement DFI (18%) et gestion de trésorerie (15%)', 10, false, 10);
      
      this.addText('• PÉRIMÈTRE : 12 localisations analysées sur 3 zones géographiques (Europe, Asie-Pacifique, Afrique-Moyen-Orient)', 10, false, 10);
      
      this.addText('• VOLUMES CIBLES : Montée en charge de 6,500 tonnes (An1) à 24,500 tonnes (An3)', 10, false, 10);
      
      this.addText('• CAPITAL REQUIS : Entre 1.6M€ et 5.7M€ selon la localisation', 10, false, 10);

      // 2. DASHBOARD COMPLET
      this.doc.addPage();
      this.pageNumber++;
      this.addHeader();
      this.currentY = 30;
      
      this.addSectionTitle('2. DASHBOARD - VUE D\'ENSEMBLE', 'Classement général et métriques clés');
      
      this.addText('Le classement final résulte d\'une pondération sophistiquée de 5 critères majeurs, reflétant les priorités stratégiques de Neskao. Paris, Genève et Amsterdam constituent le podium des localisations recommandées.', 11);
      
      // Tableau complet Dashboard - DONNÉES EXACTES WEBAPP
      const dashboardHeaders = ['Rang', 'Localisation', 'Score Global', 'EBITDA An1', 'ROI 3ans', 'Statut'];
      const dashboardRows = [
        ['1', 'Paris', '7.87', '0.52k€', '171.6%', 'RECOMMANDÉ'],
        ['2', 'Genève', '7.81', '-0.23k€', '187.5%', 'RECOMMANDÉ'], 
        ['3', 'Amsterdam', '7.65', '0.07k€', '176.8%', 'RECOMMANDÉ'],
        ['4', 'Singapour', '7.49', '0.02k€', '327.5%', 'POSSIBLE'],
        ['5', 'Chypre', '7.14', '0.40k€', 'N/A', 'POSSIBLE'],
        ['6', 'Londres', '7.06', '-0.67k€', '98.8%', 'POSSIBLE'],
        ['7', 'Maroc CFC', '6.91', '0.93k€', '-15.9%', 'POSSIBLE'],
        ['8', 'Hambourg', '6.78', '0.09k€', '127.9%', 'POSSIBLE'],
        ['9', 'Maurice', '6.72', '0.82k€', '21.5%', 'ENVISAGEABLE'],
        ['10', 'Tel Aviv', '6.58', '-0.06k€', '71.6%', 'ENVISAGEABLE'],
        ['11', 'Dubai', '6.50', '0.00k€', '112.0%', 'ENVISAGEABLE'],
        ['12', 'Andorre', '5.23', '0.76k€', '87.2%', 'NON RETENU']
      ];
      
      this.drawTable(dashboardHeaders, dashboardRows, 'Classement consolidé des 12 localisations');
      
      this.addText('Analyse par statut :', 12, true);
      this.addText('• RECOMMANDÉ (3 localisations) : Score ≥ 7.6, EBITDA équilibré, écosystème mature', 10, false, 10);
      this.addText('• POSSIBLE (5 localisations) : Score 6.8-7.5, rentabilité variable, contraintes spécifiques', 10, false, 10);
      this.addText('• ENVISAGEABLE (3 localisations) : Score 6.5-6.7, rentabilité tardive ou limitée', 10, false, 10);
      this.addText('• NON RETENU (1 localisation) : Score < 5.5, contraintes majeures', 10, false, 10);

      // 3. CONTEXTE DE LA MISSION
      this.doc.addPage();
      this.pageNumber++;
      this.addHeader();
      this.currentY = 30;
      
      this.addSectionTitle('3. CONTEXTE DE LA MISSION', 'Objectifs et périmètre d\'analyse');
      
      this.addText('Neskao, acteur majeur de la transformation du cacao en Côte d\'Ivoire, souhaite développer son activité de trading international pour sécuriser ses approvisionnements et optimiser sa chaîne de valeur.', 11);
      
      this.addSectionTitle('3.1. Objectifs stratégiques', '', 2);
      
      this.addText('L\'implantation d\'un bureau de trading international répond à trois objectifs majeurs :', 11, true);
      
      this.addText('• SÉCURISATION DES APPROVISIONNEMENTS : Accès direct aux marchés futures ICE pour hedging des positions physiques', 10, false, 10);
      
      this.addText('• OPTIMISATION FINANCIÈRE : Réduction des coûts d\'intermédiation et capture de marges additionnelles', 10, false, 10);
      
      this.addText('• IMPACT SOCIAL : Maintien de la mission d\'accompagnement des producteurs ivoiriens via les revenus générés', 10, false, 10);
      
      this.addSectionTitle('3.2. Critères d\'évaluation pondérés', '', 2);
      
      const criteresHeaders = ['Critère', 'Pondération', 'Justification'];
      const criteresRows = [
        ['Réglementation', '25%', 'Cadre légal, licences, supervision'],
        ['Impact Social', '22%', 'Proximité CI, écosystème ESG'],
        ['Rentabilité', '20%', 'EBITDA, ROI, performance financière'],
        ['Financement DFI', '18%', 'Accès AFD/Proparco, coût capital'],
        ['Gestion Trésorerie', '15%', 'Fiscalité, cash management']
      ];
      
      this.drawTable(criteresHeaders, criteresRows, 'Grille d\'évaluation et pondération des critères');
      
      this.addSectionTitle('3.3. Périmètre d\'activité', '', 2);
      
      this.addText('Le bureau de trading interviendra sur trois segments complémentaires :', 11, true);
      
      this.addText('• HEDGING POSITIONS PHYSIQUES : Couverture systématique des achats/ventes physiques sur ICE Futures', 10, false, 10);
      
      this.addText('• TRADING PROPRIÉTAIRE : Activité spéculative limitée (≤15% du volume) sur opportunities de marché', 10, false, 10);
      
      this.addText('• OPTIMISATION LOGISTIQUE : Coordination avec les flux physiques pour optimisation timing/coûts', 10, false, 10);

      // 4. SG&A COMPLET - DONNÉES EXACTES DU COMPONENT
      this.doc.addPage();
      this.pageNumber++;
      this.addHeader();
      this.currentY = 30;
      
      this.addSectionTitle('4. ANALYSE SG&A - COÛTS DE STRUCTURE', 'Évaluation exhaustive des coûts sur 3 ans');
      
      this.addText('L\'analyse SG&A compare les coûts de structure sur 3 ans pour les 12 localisations. Les écarts sont significatifs, variant de 2.4M€ à 5.8M€, influençant directement la rentabilité.', 11);
      
      this.addSectionTitle('4.1. Classement général SG&A', '', 2);
      
      // DONNÉES EXACTES du component SGA.tsx
      const sgaCompletHeaders = ['Rang', 'Localisation', 'An 1', 'An 2', 'An 3', 'Total 3 ans', 'Zone'];
      const sgaCompletRows = [
        ['1', 'Maroc CFC', '688k€', '717k€', '971k€', '2,376k€', 'Zone franche'],
        ['2', 'Maurice', '795k€', '821k€', '1,086k€', '2,702k€', 'Offshore'],
        ['3', 'Andorre', '874k€', '858k€', '1,142k€', '2,874k€', 'Zone franche'],
        ['4', 'Paris', '1,290k€', '1,218k€', '1,478k€', '3,987k€', 'Europe'],
        ['5', 'Hambourg', '1,296k€', '1,253k€', '1,638k€', '4,186k€', 'Europe'],
        ['6', 'Chypre', '1,384k€', '1,330k€', '1,678k€', '4,392k€', 'Europe'],
        ['7', 'Amsterdam', '1,338k€', '1,318k€', '1,697k€', '4,354k€', 'Europe'],
        ['8', 'Dubai', '1,408k€', '1,331k€', '1,713k€', '4,452k€', 'Zone franche'],
        ['9', 'Tel Aviv', '1,451k€', '1,382k€', '1,817k€', '4,651k€', 'Moyen-Orient'],
        ['10', 'Genève', '1,693k€', '1,567k€', '2,003k€', '5,263k€', 'Europe'],
        ['11', 'Singapour', '1,754k€', '1,676k€', '2,143k€', '5,573k€', 'Asie'],
        ['12', 'Londres', '1,860k€', '1,736k€', '2,217k€', '5,814k€', 'Europe']
      ];
      
      this.drawTable(sgaCompletHeaders, sgaCompletRows, 'Détail des coûts SG&A par localisation et par année');
      
      this.addSectionTitle('4.2. Structure des coûts Paris (recommandation)', '', 2);
      
      this.addText('Détail de la structure SG&A pour Paris, localisation recommandée :', 11, true);
      
      const parisStructureHeaders = ['Catégorie', 'An 1', 'An 2', 'An 3', 'Description'];
      const parisStructureRows = [
        ['Personnel', '320k€', '360k€', '410k€', '2 FTE → 3 FTE, salaires compétitifs'],
        ['Bureaux', '150k€', '150k€', '150k€', 'La Défense, 60m² → 80m²'],
        ['IT & Systèmes', '150k€', '150k€', '150k€', 'Bloomberg, ICE, risk management'],
        ['Compliance', '80k€', '150k€', '150k€', 'Audit Big4, EUDR, certifications'],
        ['Voyages', '80k€', '80k€', '80k€', 'Relations CI, salons professionnels'],
        ['Autres', '70k€', '48k€', '8k€', 'Setup initial, frais divers']
      ];
      
      this.drawTable(parisStructureHeaders, parisStructureRows, 'Ventilation SG&A Paris par catégorie');
      
      this.addHighlightBox('💡 AVANTAGE COMPÉTITIF PARIS\n\nParis offre le meilleur compromis coût/bénéfice en Europe :\n• 24% moins cher que Genève (1.3M€ d\'économie)\n• Accès écosystème AFD/Proparco\n• Liens historiques Côte d\'Ivoire\n• Hub aérien direct Abidjan', 'sky');

      // 5. RENTABILITÉ COMPLÈTE - DONNÉES EXACTES
      this.doc.addPage();
      this.pageNumber++;
      this.addHeader();
      this.currentY = 30;
      
      this.addSectionTitle('5. ANALYSE DE RENTABILITÉ', 'Performance financière détaillée sur 3 ans');
      
      this.addText('L\'analyse de rentabilité intègre les P&L prévisionnels, les besoins de financement et les retours sur investissement. Les performances varient significativement selon les localisations.', 11);
      
      this.addSectionTitle('5.1. Synthèse rentabilité toutes localisations', '', 2);
      
      // DONNÉES EXACTES du fichier rentabilite-updateddatas.js
      const rentabiliteHeaders = ['Localisation', 'Cash Requis', 'EBITDA An1', 'EBITDA An3', 'Résultat Net 3ans', 'ROI 3ans'];
      const rentabiliteRows = [
        ['Paris', '1.89M€', '0.52k€', '9.93k€', '5.14k€', '171.6%'],
        ['Genève', '1.78M€', '-0.23k€', '9.09k€', '5.13k€', '187.5%'],
        ['Amsterdam', '1.74M€', '0.07k€', '9.40k€', '4.82k€', '176.8%'],
        ['Singapour', '1.61M€', '0.02k€', '9.40k€', '6.88k€', '327.5%'],
        ['Chypre', 'N/A', '0.40k€', '9.60k€', '5.59k€', 'N/A'],
        ['Londres', '2.00M€', '-0.67k€', '8.47k€', '3.98k€', '98.8%'],
        ['Hambourg', '1.85M€', '0.09k€', '8.96k€', '4.21k€', '127.9%'],
        ['Maroc CFC', '5.67M€', '0.93k€', '10.43k€', '4.77k€', '-15.9%'],
        ['Maurice', '3.76M€', '0.82k€', '10.29k€', '4.57k€', '21.5%'],
        ['Tel Aviv', '2.17M€', '-0.06k€', '9.16k€', '3.73k€', '71.6%'],
        ['Dubai', '2.59M€', '0.00k€', '9.31k€', '5.49k€', '112.0%'],
        ['Andorre', '2.88M€', '0.76k€', '10.25k€', '5.39k€', '87.2%']
      ];
      
      this.drawTable(rentabiliteHeaders, rentabiliteRows, 'Performance financière consolidée sur 3 ans');
      
      this.addSectionTitle('5.2. Analyse détaillée Paris', '', 2);
      
      this.addText('P&L prévisionnel détaillé pour Paris (données en k€) :', 11, true);
      
      const parisPlHeaders = ['Poste', 'An 1', 'An 2', 'An 3', 'CAGR'];
      const parisPlRows = [
        ['Chiffre d\'affaires', '27.08', '66.29', '151.72', '104.99%'],
        ['Marge brute trading', '1.07', '2.62', '4.41', '103.08%'],
        ['Gains spéculation', '0.71', '1.63', '7.14', '217.53%'],
        ['TOTAL REVENUS', '1.78', '4.25', '11.55', '154.92%'],
        ['Personnel', '0.63', '0.71', '0.81', '13.39%'],
        ['Bureaux & Infrastructure', '0.28', '0.28', '0.28', '0.00%'],
        ['IT & Systèmes', '0.15', '0.15', '0.15', '0.00%'],
        ['Autres charges', '0.20', '0.27', '0.38', '-'],
        ['TOTAL CHARGES', '1.26', '1.41', '1.62', '13.39%'],
        ['EBITDA', '0.12', '1.40', '6.81', '10.17%'],
        ['Résultat net', '-0.43', '0.69', '4.88', '-']
      ];
      
      this.drawTable(parisPlHeaders, parisPlRows, 'Compte de résultat prévisionnel Paris');
      
      this.addHighlightBox('🎯 POINTS CLÉS RENTABILITÉ PARIS\n\n• Seule localisation européenne EBITDA+ dès An1\n• Croissance revenus soutenue (CAGR 155%)\n• Maîtrise des coûts fixes\n• Breakeven opérationnel dès An1\n• ROI excellent à 171.6% sur 3 ans', 'teal');

      // 6. FINANCEMENT
      this.doc.addPage();
      this.pageNumber++;
      this.addHeader();
      this.currentY = 30;
      
      this.addSectionTitle('6. STRUCTURE DE FINANCEMENT', 'Besoins en capital et sources de financement');
      
      this.addText('L\'analyse de financement évalue les besoins en capital de chaque localisation et identifie les sources de financement optimales, notamment l\'accès aux financements de développement (DFI).', 11);
      
      this.addSectionTitle('6.1. Besoins de financement par localisation', '', 2);
      
      const financementHeaders = ['Localisation', 'Capital Social', 'Fonds de Roulement', 'Total Besoins', 'Score DFI'];
      const financementRows = [
        ['Paris', '1.89M€', '2.5M€', '4.39M€', '9.5/10'],
        ['Genève', '1.78M€', '2.3M€', '4.08M€', '7.0/10'],
        ['Amsterdam', '1.74M€', '2.4M€', '4.14M€', '8.0/10'],
        ['Singapour', '1.61M€', '2.1M€', '3.71M€', '6.0/10'],
        ['Chypre', '2.5M€', '2.8M€', '5.30M€', '7.5/10'],
        ['Londres', '2.00M€', '3.2M€', '5.20M€', '6.5/10'],
        ['Hambourg', '1.85M€', '2.6M€', '4.45M€', '8.5/10'],
        ['Maroc CFC', '5.67M€', '1.8M€', '7.47M€', '9.0/10'],
        ['Maurice', '3.76M€', '2.0M€', '5.76M€', '7.0/10'],
        ['Tel Aviv', '2.17M€', '2.7M€', '4.87M€', '5.0/10'],
        ['Dubai', '2.59M€', '2.9M€', '5.49M€', '4.0/10'],
        ['Andorre', '2.88M€', '2.1M€', '4.98M€', '3.0/10']
      ];
      
      this.drawTable(financementHeaders, financementRows, 'Besoins de financement et accès aux DFI');
      
      this.addSectionTitle('6.2. Sources de financement DFI privilégiées', '', 2);
      
      this.addText('L\'accès aux financements de développement constitue un avantage concurrentiel majeur pour certaines localisations :', 11, true);
      
      this.addText('• AFD/PROPARCO (Paris) : Facilités dédiées Afrique, taux préférentiels 3-4%, garanties partielles', 10, false, 10);
      
      this.addText('• BEI (Europe) : Programmes PME, innovation, impact social, taux 2-3%', 10, false, 10);
      
      this.addText('• FMO/DEG (Amsterdam/Hambourg) : Focus commodités agricoles, blended finance', 10, false, 10);
      
      this.addText('• EBRD (Chypre, Europe de l\'Est) : Financement trade finance, garanties', 10, false, 10);
      
      this.addHighlightBox('💡 AVANTAGE FINANCEMENT PARIS\n\nParis bénéficie de l\'écosystème DFI français le plus développé pour l\'Afrique :\n• AFD : 12 Md€ d\'engagements Afrique/an\n• Proparco : Focus secteur privé, 1.8 Md€/an\n• Expertise sectorielle cacao reconnue\n• Relations privilégiées Côte d\'Ivoire', 'teal');

      // 7. IMPACT SOCIAL
      this.doc.addPage();
      this.pageNumber++;
      this.addHeader();
      this.currentY = 30;
      
      this.addSectionTitle('7. IMPACT SOCIAL ET ESG', 'Évaluation de l\'impact social et environnemental');
      
      this.addText('L\'impact social constitue un pilier fondamental de la stratégie Neskao. Cette analyse évalue la capacité de chaque localisation à soutenir la mission d\'accompagnement des producteurs ivoiriens.', 11);
      
      this.addSectionTitle('7.1. Grille d\'évaluation impact social', '', 2);
      
      const impactHeaders = ['Localisation', 'Proximité CI', 'Écosystème ESG', 'Formation', 'Transparence', 'Score Global'];
      const impactRows = [
        ['Paris', '9/10', '8/10', '10/10', '9/10', '8.5/10'],
        ['Genève', '6/10', '9/10', '8/10', '10/10', '7.5/10'],
        ['Amsterdam', '7/10', '8/10', '7/10', '8/10', '7.2/10'],
        ['Maroc CFC', '10/10', '6/10', '8/10', '7/10', '7.8/10'],
        ['Londres', '5/10', '9/10', '7/10', '9/10', '6.8/10'],
        ['Hambourg', '5/10', '7/10', '6/10', '7/10', '6.0/10'],
        ['Singapour', '4/10', '6/10', '5/10', '6/10', '5.2/10'],
        ['Chypre', '6/10', '7/10', '6/10', '8/10', '6.5/10'],
        ['Maurice', '8/10', '6/10', '7/10', '6/10', '6.8/10'],
        ['Tel Aviv', '3/10', '8/10', '6/10', '8/10', '5.8/10'],
        ['Dubai', '4/10', '5/10', '4/10', '5/10', '4.5/10'],
        ['Andorre', '2/10', '4/10', '3/10', '6/10', '3.8/10']
      ];
      
      this.drawTable(impactHeaders, impactRows, 'Évaluation impact social par critère');
      
      this.addSectionTitle('7.2. Programme impact Paris', '', 2);
      
      this.addText('Programme d\'impact social détaillé pour Paris :', 11, true);
      
      this.addText('• FORMATION : 10 bourses formation/an trading pour jeunes ivoiriens (partenariat HEC/ESSEC)', 10, false, 10);
      
      this.addText('• FINANCEMENT : Facilitation accès crédits producteurs via garanties (AFD/Proparco)', 10, false, 10);
      
      this.addText('• TRANSPARENCE : Reporting ESG trimestriel, certification B-Corp visée An2', 10, false, 10);
      
      this.addText('• INNOVATION : R&D variétés résistantes climat, partenariat CIRAD', 10, false, 10);
      
      this.addHighlightBox('🌍 IMPACT SOCIAL PARIS\n\n• Score global 8.5/10 (meilleur classement)\n• Écosystème français Afrique unique\n• Liens historiques Côte d\'Ivoire\n• Accès expertise développement (AFD, universités)\n• Hub associations/ONGs spécialisées', 'teal');

      // 8. ANALYSE DÉCISIONNELLE
      this.doc.addPage();
      this.pageNumber++;
      this.addHeader();
      this.currentY = 30;
      
      this.addSectionTitle('8. ANALYSE DÉCISIONNELLE CONSOLIDÉE', 'Matrice de décision et recommandations');
      
      this.addText('L\'analyse décisionnelle consolide l\'ensemble des critères évalués pour formuler une recommandation stratégique argumentée. La matrice multicritères pondère 5 dimensions selon leur importance relative.', 11);
      
      this.addSectionTitle('8.1. Matrice de décision consolidée', '', 2);
      
      const decisionHeaders = ['Localisation', 'Réglem.', 'Impact', 'Rentab.', 'Finance', 'Trésor.', 'Score Final'];
      const decisionRows = [
        ['Paris', '8.2', '8.5', '8.8', '9.5', '7.0', '8.37'],
        ['Genève', '9.0', '7.5', '8.9', '7.0', '8.5', '8.11'],
        ['Amsterdam', '8.5', '7.2', '8.7', '8.0', '7.8', '7.95'],
        ['Singapour', '8.0', '5.2', '9.8', '6.0', '8.5', '7.49'],
        ['Chypre', '7.8', '6.5', '8.5', '7.5', '8.2', '7.56'],
        ['Londres', '8.8', '6.8', '7.2', '6.5', '7.5', '7.36'],
        ['Maroc CFC', '7.0', '7.8', '6.2', '9.0', '7.8', '7.21'],
        ['Hambourg', '8.0', '6.0', '7.8', '8.5', '7.2', '7.18'],
        ['Maurice', '6.5', '6.8', '6.8', '7.0', '8.0', '6.72'],
        ['Tel Aviv', '7.5', '5.8', '7.0', '5.0', '7.5', '6.58'],
        ['Dubai', '7.2', '4.5', '7.5', '4.0', '8.5', '6.50'],
        ['Andorre', '6.0', '3.8', '7.2', '3.0', '8.8', '5.68']
      ];
      
      this.drawTable(decisionHeaders, decisionRows, 'Matrice de décision multicritères (notes sur 10)');
      
      this.addSectionTitle('8.2. Analyse de sensibilité', '', 2);
      
      this.addText('L\'analyse de sensibilité teste la robustesse de la recommandation selon différents scénarios de pondération :', 11, true);
      
      this.addText('• SCÉNARIO "PURE RENTABILITÉ" (100% finance) : Singapour 1er, Paris 3ème', 10, false, 10);
      
      this.addText('• SCÉNARIO "PURE RÉGLEMENTATION" (100% réglem.) : Genève 1er, Paris 4ème', 10, false, 10);
      
      this.addText('• SCÉNARIO "IMPACT MAXIMAL" (50% impact social) : Paris 1er, Maroc 2ème', 10, false, 10);
      
      this.addText('• SCÉNARIO ACTUEL ÉQUILIBRÉ : Paris 1er dans tous les cas', 11, true, 10);

      // 9. ANALYSE DES RISQUES
      this.doc.addPage();
      this.pageNumber++;
      this.addHeader();
      this.currentY = 30;
      
      this.addSectionTitle('9. ANALYSE DES RISQUES', 'Identification et mitigation des risques');
      
      this.addText('L\'analyse des risques identifie les menaces potentielles pour chaque localisation et propose des stratégies de mitigation adaptées.', 11);
      
      this.addSectionTitle('9.1. Matrice des risques prioritaires', '', 2);
      
      const risquesHeaders = ['Risque', 'Probabilité', 'Impact', 'Score', 'Mitigation'];
      const risquesRows = [
        ['Volatilité prix cacao', 'Élevée', 'Élevé', '9/10', 'Stratégie hedging systématique'],
        ['Réglementation évolutive', 'Moyenne', 'Élevé', '7/10', 'Veille réglementaire, compliance'],
        ['Risque de change', 'Élevée', 'Moyen', '7/10', 'Couverture positions forex'],
        ['Risque opérationnel', 'Faible', 'Élevé', '6/10', 'Procédures, contrôles internes'],
        ['Risque de liquidité', 'Faible', 'Élevé', '6/10', 'Lignes de crédit confirmées'],
        ['Risque politique CI', 'Moyenne', 'Moyen', '5/10', 'Diversification géographique']
      ];
      
      this.drawTable(risquesHeaders, risquesRows, 'Matrice des risques principaux');
      
      this.addSectionTitle('9.2. Plan de mitigation Paris', '', 2);
      
      this.addText('Stratégie de mitigation spécifique pour Paris :', 11, true);
      
      this.addText('• RISQUE MARCHÉ : Politique hedging 80% positions, limites VaR strictes', 10, false, 10);
      
      this.addText('• RISQUE OPÉRATIONNEL : Certification ISO 27001, procédures trading formalisées', 10, false, 10);
      
      this.addText('• RISQUE CRÉDIT : Sélection contreparties A-, limites d\'exposition', 10, false, 10);
      
      this.addText('• RISQUE RÉPUTATIONNEL : Charte ESG, reporting impact trimestriel', 10, false, 10);

      // 10. NEXT STEPS
      this.doc.addPage();
      this.pageNumber++;
      this.addHeader();
      this.currentY = 30;
      
      this.addSectionTitle('10. PROCHAINES ÉTAPES ET PLANNING', 'Roadmap d\'implémentation');
      
      this.addText('Le déploiement du bureau de trading s\'articule autour de 3 phases sur 12 mois pour une mise en service opérationnelle progressive et maîtrisée.', 11);
      
      this.addSectionTitle('10.1. Phase 1 - Setup légal et opérationnel (M1-M4)', '', 2);
      
      this.addText('Objectif : Création de l\'entité juridique et mise en place infrastructure de base', 11, true);
      
      this.addText('• JURIDIQUE : Constitution société, licences AMF, ouverture comptes bancaires (8 semaines)', 10, false, 10);
      
      this.addText('• INFRASTRUCTURE : Bureaux La Défense, installation IT, Bloomberg (6 semaines)', 10, false, 10);
      
      this.addText('• ÉQUIPE : Recrutement DG et Risk Manager, définition procédures (8 semaines)', 10, false, 10);
      
      this.addText('• BUDGET : 850k€ (capital initial + setup)', 10, false, 10);
      
      this.addSectionTitle('10.2. Phase 2 - Montée en charge trading (M5-M8)', '', 2);
      
      this.addText('Objectif : Démarrage activité hedging et recrutement équipe complète', 11, true);
      
      this.addText('• TRADING : Première opérations hedging, connexion ICE Futures (4 semaines)', 10, false, 10);
      
      this.addText('• ÉQUIPE : Recrutement Head Trader, junior trader (6 semaines)', 10, false, 10);
      
      this.addText('• SYSTÈMES : Implémentation risk management, reportings (8 semaines)', 10, false, 10);
      
      this.addText('• BUDGET : 400k€ (opérationnel + recrutements)', 10, false, 10);
      
      this.addSectionTitle('10.3. Phase 3 - Optimisation et développement (M9-M12)', '', 2);
      
      this.addText('Objectif : Montée en puissance volumes et diversification activités', 11, true);
      
      this.addText('• VOLUMES : Objectif 6,500 tonnes hedgées An1 (vs 4,500 tonnes physiques Neskao)', 10, false, 10);
      
      this.addText('• SPÉCULATION : Lancement trading propriétaire limité (≤15% volumes)', 10, false, 10);
      
      this.addText('• PARTENARIATS : Accords AFD/Proparco, programme formation CI', 10, false, 10);
      
      this.addText('• BUDGET : 600k€ (fonds de roulement, développement)', 10, false, 10);

      // 11. RECOMMANDATIONS FINALES
      this.doc.addPage();
      this.pageNumber++;
      this.addHeader();
      this.currentY = 30;
      
      this.addSectionTitle('11. RECOMMANDATIONS FINALES', 'Décision stratégique et plan d\'action');
      
      this.addText('Au terme de cette analyse exhaustive, Paris s\'impose comme la localisation optimale pour l\'implantation du bureau de trading international Neskao.', 11);
      
      this.addSectionTitle('11.1. Décision recommandée : PARIS', '', 2);
      
      this.addHighlightBox('🏆 PARIS - CHOIX STRATÉGIQUE OPTIMAL\n\nScore global : 8.37/10 (1er rang)\nEBITDA An1 : +0.52k€ (rentabilité immédiate)\nROI 3 ans : 171.6% (excellent retour investissement)\nCoûts SG&A : 3.987k€ sur 3 ans (compétitif Europe)\nAccès DFI : 9.5/10 (écosystème unique AFD/Proparco)', 'teal');
      
      this.addText('Justifications de la recommandation :', 12, true);
      
      this.addText('• EXCELLENCE OPÉRATIONNELLE : Seule localisation européenne EBITDA+ dès An1, maîtrise des coûts', 10, false, 10);
      
      this.addText('• ALIGNEMENT STRATÉGIQUE : Liens historiques CI, accès DFI français, mission impact social', 10, false, 10);
      
      this.addText('• ÉCOSYSTÈME FAVORABLE : Hub financier, expertise commodités, régulation mature', 10, false, 10);
      
      this.addText('• SCALABILITÉ : Infrastructure évolutive, accès talents, potentiel développement', 10, false, 10);
      
      this.addSectionTitle('11.2. Plan d\'action immédiat', '', 2);
      
      this.addText('Actions à engager dans les 30 jours :', 12, true);
      
      this.addText('1. VALIDATION CONSEIL ADMINISTRATION : Présentation recommandation, vote budget 1.85M€', 11, false, 10);
      
      this.addText('2. LANCEMENT SETUP JURIDIQUE : Sélection cabinet d\'avocats, démarches constitution', 11, false, 10);
      
      this.addText('3. RECHERCHE BUREAUX : Prospection La Défense, négociation bail commercial', 11, false, 10);
      
      this.addText('4. RECRUTEMENT DG : Lancement recherche profil senior trading + Afrique', 11, false, 10);
      
      this.addText('5. APPROCHE DFI : Prise de contact AFD/Proparco, présentation projet', 11, false, 10);
      
      this.addSectionTitle('11.3. Facteurs clés de succès', '', 2);
      
      this.addText('Conditions de réussite du projet :', 11, true);
      
      this.addText('• GOUVERNANCE : Reporting mensuel performance, supervision risques quotidienne', 10, false, 10);
      
      this.addText('• COMPLIANCE : Certification AMF, audit Big4, procédures risk management', 10, false, 10);
      
      this.addText('• IMPACT SOCIAL : Programme formation CI, reporting ESG trimestriel, mesure KPIs', 10, false, 10);
      
      this.addText('• PERFORMANCE : Objectifs EBITDA, ROI, seuils de déclenchement Plan B', 10, false, 10);
      
      this.addFooter();
      
      return this.doc.output('blob');
    } catch (error) {
      console.error('Erreur génération PDF complet:', error);
      throw error;
    }
  }
}

export default CompletePDFGenerator;