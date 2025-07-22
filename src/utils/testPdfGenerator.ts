import { jsPDF } from 'jspdf';

export class TestPDFGenerator {
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

  // Données test des 12 villes
  private readonly villesData = [
    { nom: 'Paris', score: 7.87, ebitdaAn1: 0.52, equity: 1.89, statut: 'RECOMMANDE' },
    { nom: 'Genève', score: 7.81, ebitdaAn1: -0.23, equity: 1.78, statut: 'RECOMMANDE' },
    { nom: 'Amsterdam', score: 7.65, ebitdaAn1: 0.07, equity: 1.74, statut: 'RECOMMANDE' },
    { nom: 'Singapour', score: 7.49, ebitdaAn1: 0.02, equity: 1.61, statut: 'POSSIBLE' },
    { nom: 'Chypre', score: 7.14, ebitdaAn1: 0.40, equity: 2.5, statut: 'POSSIBLE' },
    { nom: 'Londres', score: 7.06, ebitdaAn1: -0.67, equity: 2.00, statut: 'POSSIBLE' },
    { nom: 'Maroc CFC', score: 6.91, ebitdaAn1: 0.93, equity: 5.67, statut: 'POSSIBLE' },
    { nom: 'Hambourg', score: 6.78, ebitdaAn1: 0.09, equity: 1.85, statut: 'POSSIBLE' },
    { nom: 'Maurice', score: 6.72, ebitdaAn1: 0.82, equity: 3.76, statut: 'ENVISAGEABLE' },
    { nom: 'Tel Aviv', score: 6.58, ebitdaAn1: -0.06, equity: 2.17, statut: 'ENVISAGEABLE' },
    { nom: 'Dubai', score: 6.50, ebitdaAn1: 0.00, equity: 2.59, statut: 'ENVISAGEABLE' },
    { nom: 'Andorre', score: 5.23, ebitdaAn1: 0.76, equity: 2.88, statut: 'NON RETENU' }
  ];

  constructor() {
    this.doc = new jsPDF('p', 'mm', 'a4');
  }

  private addCityCard(city: any, rank: number, x: number, y: number) {
    const cardWidth = 85;
    const cardHeight = 60;
    
    // Cadre principal avec ombre
    this.doc.setFillColor(...this.colors.light);
    this.doc.rect(x + 1, y + 1, cardWidth, cardHeight, 'F'); // Ombre
    
    this.doc.setFillColor(...this.colors.white);
    this.doc.setDrawColor(...this.colors.accent);
    this.doc.setLineWidth(0.5);
    this.doc.rect(x, y, cardWidth, cardHeight, 'FD');
    
    // Bande de couleur selon le statut
    let statusColor = this.colors.accent;
    if (city.statut === 'RECOMMANDE') statusColor = this.colors.teal;
    else if (city.statut === 'POSSIBLE') statusColor = this.colors.sky;
    
    this.doc.setFillColor(...statusColor);
    this.doc.rect(x, y, cardWidth, 8, 'F');
    
    // Rang dans un cercle
    this.doc.setFillColor(...this.colors.primary);
    this.doc.circle(x + 15, y + 15, 8, 'F');
    this.doc.setTextColor(...this.colors.white);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(12);
    this.doc.text(rank.toString(), x + 15, y + 18, { align: 'center' });
    
    // Nom de la ville
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(14);
    this.doc.text(city.nom, x + 28, y + 18);
    
    // Score global
    this.doc.setTextColor(...this.colors.secondary);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(10);
    this.doc.text('Score Global:', x + 8, y + 30);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(12);
    this.doc.text(city.score.toFixed(2), x + 45, y + 30);
    
    // EBITDA An1
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(10);
    this.doc.text('EBITDA An1:', x + 8, y + 42);
    this.doc.setFont('helvetica', 'bold');
    
    if (city.ebitdaAn1 >= 0) {
      this.doc.setTextColor(...this.colors.teal);
    } else {
      this.doc.setTextColor(239, 68, 68); // Rouge
    }
    this.doc.text(`${city.ebitdaAn1 >= 0 ? '+' : ''}${city.ebitdaAn1.toFixed(2)}k€`, x + 45, y + 42);
    
    // Equity An1
    this.doc.setTextColor(...this.colors.secondary);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(10);
    this.doc.text('Equity:', x + 8, y + 54);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(`${city.equity.toFixed(2)}M€`, x + 35, y + 54);
  }

  private addSectionTitle(title: string, subtitle?: string) {
    this.doc.addPage();
    this.pageNumber++;
    this.currentY = 20;
    
    this.doc.setFontSize(18);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, this.margin, this.currentY);
    this.currentY += 12;
    
    if (subtitle) {
      this.doc.setFontSize(12);
      this.doc.setTextColor(...this.colors.secondary);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(subtitle, this.margin, this.currentY);
      this.currentY += 10;
    }
    this.currentY += 10;
  }

  private addTextParagraph(text: string, fontSize: number = 10, bold: boolean = false) {
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', bold ? 'bold' : 'normal');
    this.doc.setTextColor(...this.colors.primary);
    
    const lines = this.doc.splitTextToSize(text, this.contentWidth);
    lines.forEach((line: string) => {
      if (this.currentY > 270) {
        this.doc.addPage();
        this.pageNumber++;
        this.currentY = 20;
      }
      this.doc.text(line, this.margin, this.currentY);
      this.currentY += 6;
    });
    this.currentY += 5;
  }

  private addSubTitle(title: string) {
    this.doc.setFontSize(14);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, this.margin, this.currentY);
    this.currentY += 10;
  }

  private async addSGASection() {
    this.addSectionTitle('2. SG&A - RESSOURCES NÉCESSAIRES SUR 3 ANS', 'Coûts de structure par localisation');
    
    // Données SG&A exactes de la webapp
    const sgaData = [
      { ville: 'Maroc CFC', an1: 688, an2: 717, an3: 971, total: 2376, zone: 'Zone franche' },
      { ville: 'Maurice', an1: 795, an2: 821, an3: 1086, total: 2702, zone: 'Offshore' },
      { ville: 'Andorre', an1: 874, an2: 858, an3: 1142, total: 2874, zone: 'Zone franche' },
      { ville: 'Paris', an1: 1290, an2: 1218, an3: 1478, total: 3987, zone: 'Europe' },
      { ville: 'Hambourg', an1: 1296, an2: 1253, an3: 1638, total: 4186, zone: 'Europe' },
      { ville: 'Chypre', an1: 1384, an2: 1330, an3: 1678, total: 4392, zone: 'Europe' },
      { ville: 'Amsterdam', an1: 1338, an2: 1318, an3: 1697, total: 4354, zone: 'Europe' },
      { ville: 'Dubai', an1: 1408, an2: 1331, an3: 1713, total: 4452, zone: 'Zone franche' },
      { ville: 'Tel Aviv', an1: 1451, an2: 1382, an3: 1817, total: 4651, zone: 'Moyen-Orient' },
      { ville: 'Genève', an1: 1632, an2: 1501, an3: 1929, total: 5062, zone: 'Europe' },
      { ville: 'Singapour', an1: 1754, an2: 1676, an3: 2143, total: 5573, zone: 'Asie' },
      { ville: 'Londres', an1: 1860, an2: 1736, an3: 2217, total: 5814, zone: 'Europe' }
    ];

    this.addSubTitle('2.1. Analyse des Coûts de Structure (SG&A)');
    
    this.addTextParagraph(
      'Les coûts SG&A (Selling, General & Administrative) représentent l\'investissement structurel nécessaire pour l\'établissement et le fonctionnement du bureau de trading sur 3 ans. Cette analyse détaillée permet d\'identifier les localisations offrant le meilleur rapport qualité/coût pour notre stratégie de croissance.'
    );

    // Tableau des coûts SG&A
    this.addSubTitle('2.2. Classement par Coût Total sur 3 Ans');
    
    sgaData.forEach((location, index) => {
      if (this.currentY > 250) {
        this.doc.addPage();
        this.pageNumber++;
        this.currentY = 20;
      }
      
      // Ligne avec détails
      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', location.ville === 'Paris' ? 'bold' : 'normal');
      this.doc.setTextColor(...this.colors.primary);
      
      const rank = `${index + 1}.`;
      const ville = `${location.ville} (${location.zone})`;
      const couts = `An1: ${location.an1}k€ | An2: ${location.an2}k€ | An3: ${location.an3}k€`;
      const total = `TOTAL: ${location.total}k€`;
      
      this.doc.text(rank, this.margin, this.currentY);
      this.doc.text(ville, this.margin + 15, this.currentY);
      this.doc.text(couts, this.margin + 70, this.currentY);
      
      // Couleur selon recommandation
      if (location.ville === 'Paris') {
        this.doc.setTextColor(...this.colors.teal);
        this.doc.text(`${total} ← RECOMMANDÉ`, this.margin + 140, this.currentY);
      } else {
        this.doc.setTextColor(...this.colors.secondary);
        this.doc.text(total, this.margin + 140, this.currentY);
      }
      
      this.currentY += 8;
    });

    this.addSubTitle('2.3. Analyse par Zone Géographique');
    
    this.addTextParagraph(
      'ZONES FRANCHES (2,376k€ - 4,452k€) :', 11, true
    );
    this.addTextParagraph(
      '• Maroc CFC: 2,376k€ - Le plus économique grâce aux avantages fiscaux\n' +
      '• Andorre: 2,874k€ - Coûts maîtrisés mais réglementation restrictive\n' +
      '• Dubai: 4,452k€ - Hub Moyen-Orient mais coûts personnels élevés'
    );

    this.addTextParagraph(
      'EUROPE (3,987k€ - 5,814k€) :', 11, true
    );
    this.addTextParagraph(
      '• Paris: 3,987k€ - CHOIX OPTIMAL - Équilibre coût/bénéfice\n' +
      '• Hambourg: 4,186k€ - Légèrement plus cher, moins d\'avantages\n' +
      '• Amsterdam/Chypre: ~4,350k€ - Coûts similaires\n' +
      '• Genève: 5,263k€ - Premium mais accès financements privilégiés\n' +
      '• Londres: 5,814k€ - Le plus cher post-Brexit'
    );

    this.addTextParagraph(
      'OFFSHORE/AUTRES (2,702k€ - 5,573k€) :', 11, true
    );
    this.addTextParagraph(
      '• Maurice: 2,702k€ - Économique mais éloignement géographique\n' +
      '• Tel Aviv: 4,651k€ - Coûts élevés, instabilité géopolitique\n' +
      '• Singapour: 5,573k€ - Hub Asie premium, très cher'
    );
  }

  private async addContexteSection() {
    this.addSectionTitle('3. CONTEXTE DE LA MISSION', 'Histoire, environnement international et stratégie');
    
    // 3.1 HISTOIRE DE NESKAO
    this.addSubTitle('3.1. Histoire de Neskao - Pionnier Africain du Cacao');
    
    this.addTextParagraph(
      'Créée en 2013 par une équipe d\'entrepreneurs visionnaires, Neskao s\'est positionnée comme la première entreprise africaine de transformation de cacao avec une spécialisation unique dans le traitement des fèves hors normes et déchets de cacao. Cette position de pionnier confère à Neskao un avantage concurrentiel majeur dans un marché en pleine consolidation.'
    );

    this.addTextParagraph(
      'INDICATEURS CLÉS NESKAO :', 11, true
    );
    
    this.addTextParagraph(
      '• Année de création : 2013 (1ère entreprise africaine du secteur)\n' +
      '• Emplois directs : 150+ collaborateurs\n' +
      '• Emplois indirects : 8,000+ (impact socio-économique majeur)\n' +
      '• Capacité de production : 32,000 tonnes/an\n' +
      '• Certification : FSSC 22000 V.5 (2021) - standards internationaux\n' +
      '• Spécialisation unique : Valorisation fèves hors normes et déchets cacao'
    );

    // 2.2 ENVIRONNEMENT INTERNATIONAL DU CACAO
    this.addSubTitle('2.2. Environnement International du Cacao');
    
    this.addTextParagraph(
      'Le marché mondial du cacao connaît une transformation structurelle majeure avec la concentration croissante des acteurs et l\'émergence de nouvelles réglementations durabilité. Cette évolution crée des opportunités uniques pour les transformateurs africains innovants comme Neskao.'
    );

    this.addTextParagraph(
      'DYNAMIQUES CLÉS DU MARCHÉ :', 11, true
    );

    this.addTextParagraph(
      '• Production mondiale : 5.2M tonnes (Côte d\'Ivoire 40%, Ghana 20%)\n' +
      '• Croissance annuelle demande : +2.8% (tirée par Asie +5.4%)\n' +
      '• Prix ICE Futures : Volatilité 25-35% (hedging critique)\n' +
      '• Réglementation EUDR : Traçabilité obligatoire 2025\n' +
      '• Consolidation amont : 3 majors contrôlent 60% négoce\n' +
      '• Primes durabilité : +200-400 USD/tonne (opportunité Afrique)'
    );

    this.addTextParagraph(
      'POSITIONNEMENT CONCURRENTIEL NESKAO :', 11, true
    );

    this.addTextParagraph(
      '• Niche unique : Spécialiste fèves hors normes (30% des volumes Côte d\'Ivoire)\n' +
      '• Avantage géographique : Proximité bassins production\n' +
      '• Expertise technique : Transformation optimisée déchets cacao\n' +
      '• Impact social : Valorisation revenus producteurs (+15-25%)\n' +
      '• Certification : Standards internationaux (FSSC, UTZ, RFA)\n' +
      '• Innovation : R&D variétés résistantes climat'
    );

    // 2.3 CONVERGENCE ET OBJECTIFS STRATÉGIQUES
    this.addSubTitle('2.3. Convergence et Objectifs Stratégiques');
    
    this.addTextParagraph(
      'L\'implantation d\'un bureau de trading international s\'inscrit dans une stratégie de convergence entre l\'expertise industrielle de Neskao et les opportunités du négoce international. Cette convergence répond à trois objectifs stratégiques majeurs.'
    );

    this.addTextParagraph(
      'OBJECTIF 1 : SÉCURISATION DES APPROVISIONNEMENTS', 11, true
    );
    
    this.addTextParagraph(
      '• Accès direct aux marchés futures ICE London pour hedging systématique des positions physiques\n' +
      '• Réduction de 40-60% des coûts d\'intermédiation actuels\n' +
      '• Optimisation timing achats selon cycles saisonniers\n' +
      '• Diversification sources approvisionnement (Côte d\'Ivoire, Ghana, Équateur)\n' +
      '• Couverture risque de change EUR/USD automatisée'
    );

    this.addTextParagraph(
      'OBJECTIF 2 : OPTIMISATION FINANCIÈRE', 11, true
    );
    
    this.addTextParagraph(
      '• Capture marges trading 50-80 USD/tonne (vs 25-30 USD actuellement)\n' +
      '• Génération revenus spéculation contrôlée (≤15% activité)\n' +
      '• Accès financements DFI (AFD/Proparco) : -200-300 bps vs bancaire classique\n' +
      '• Optimisation trésorerie : gestion centralisée EUR/USD/XOF\n' +
      '• ROI cible 3 ans : 150-200% selon localisation'
    );

    this.addTextParagraph(
      'OBJECTIF 3 : MISSION D\'IMPACT SOCIAL', 11, true
    );
    
    this.addTextParagraph(
      '• Maintien programmes formation : 10 bourses trading/an pour jeunes ivoiriens\n' +
      '• Financement projets développement : 2-3% revenus trading dédiés\n' +
      '• Amélioration revenus producteurs : Élimination intermédiaires\n' +
      '• Transparence prix : Reporting public conditions achat\n' +
      '• Certification impact : B-Corp visée An2'
    );

    // 2.4 MÉTHODOLOGIE UTILISÉE
    this.addSubTitle('2.4. Méthodologie d\'Évaluation');
    
    this.addTextParagraph(
      'L\'évaluation des 12 localisations repose sur une méthodologie d\'analyse multicritères rigoureuse, développée spécifiquement pour le secteur du négoce de commodités agricoles avec composante d\'impact social.'
    );

    this.addTextParagraph(
      'GRILLE D\'ÉVALUATION - 5 CRITÈRES PONDÉRÉS :', 11, true
    );
    
    this.addTextParagraph(
      '1. RÉGLEMENTATION (25%) : Cadre légal, licences, supervision financière\n' +
      '2. IMPACT SOCIAL (22%) : Proximité Côte d\'Ivoire, écosystème ESG, programmes formation\n' +
      '3. RENTABILITÉ (20%) : EBITDA, ROI, performance financière 3 ans\n' +
      '4. FINANCEMENT DFI (18%) : Accès AFD/Proparco/BEI, coût du capital\n' +
      '5. GESTION TRÉSORERIE (15%) : Fiscalité, cash management, optimisation'
    );

    this.addTextParagraph(
      'MÉTHODOLOGIE DE NOTATION :', 11, true
    );
    
    this.addTextParagraph(
      '• Échelle : 0-10 points par critère\n' +
      '• Pondération : Application coefficients selon importance stratégique\n' +
      '• Validation croisée : 3 sources expertes par critère\n' +
      '• Analyse sensibilité : Tests robustesse selon scenarios\n' +
      '• Benchmarking : Comparaison pratiques marché\n' +
      '• Score final : Moyenne pondérée /10 avec décision GO/POSSIBLE/NO'
    );
  }

  public async generateTestReport(): Promise<Blob> {
    try {
      // Page de garde simple
      this.doc.setFontSize(20);
      this.doc.setTextColor(...this.colors.primary);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('TEST - DASHBOARD AVEC CADRES', this.margin, 60);
      
      this.doc.setFontSize(14);
      this.doc.setTextColor(...this.colors.secondary);
      this.doc.text('12 localisations en cadres élégants', this.margin, 80);
      
      // Page 1 - TOP 4
      this.doc.addPage();
      this.pageNumber++;
      this.currentY = 20;
      
      this.doc.setFontSize(16);
      this.doc.setTextColor(...this.colors.primary);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('TOP 4 - LOCALISATIONS RECOMMANDÉES', this.margin, this.currentY);
      this.currentY += 20;
      
      // Première ligne (1-2)
      this.addCityCard(this.villesData[0], 1, this.margin, this.currentY);
      this.addCityCard(this.villesData[1], 2, this.margin + 95, this.currentY);
      
      this.currentY += 70;
      
      // Deuxième ligne (3-4)
      this.addCityCard(this.villesData[2], 3, this.margin, this.currentY);
      this.addCityCard(this.villesData[3], 4, this.margin + 95, this.currentY);
      
      // Page 2 - RANGS 5-8
      this.doc.addPage();
      this.pageNumber++;
      this.currentY = 20;
      
      this.doc.setFontSize(16);
      this.doc.setTextColor(...this.colors.primary);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('RANGS 5-8 - LOCALISATIONS POSSIBLES', this.margin, this.currentY);
      this.currentY += 20;
      
      // Ligne 1 (5-6)
      this.addCityCard(this.villesData[4], 5, this.margin, this.currentY);
      this.addCityCard(this.villesData[5], 6, this.margin + 95, this.currentY);
      
      this.currentY += 70;
      
      // Ligne 2 (7-8)
      this.addCityCard(this.villesData[6], 7, this.margin, this.currentY);
      this.addCityCard(this.villesData[7], 8, this.margin + 95, this.currentY);
      
      // Page 3 - RANGS 9-12
      this.doc.addPage();
      this.pageNumber++;
      this.currentY = 20;
      
      this.doc.setFontSize(16);
      this.doc.setTextColor(...this.colors.primary);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('RANGS 9-12 - AUTRES LOCALISATIONS', this.margin, this.currentY);
      this.currentY += 20;
      
      // Ligne 1 (9-10)
      this.addCityCard(this.villesData[8], 9, this.margin, this.currentY);
      this.addCityCard(this.villesData[9], 10, this.margin + 95, this.currentY);
      
      this.currentY += 70;
      
      // Ligne 2 (11-12)
      this.addCityCard(this.villesData[10], 11, this.margin, this.currentY);
      this.addCityCard(this.villesData[11], 12, this.margin + 95, this.currentY);
      
      // SECTION SG&A - RESSOURCES 3 ANS
      await this.addSGASection();
      
      // SECTION CONTEXTE
      await this.addContexteSection();
      
      return this.doc.output('blob');
    } catch (error) {
      console.error('Erreur génération PDF test:', error);
      throw error;
    }
  }
}

export default TestPDFGenerator;