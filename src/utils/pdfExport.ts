import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface CityData {
  nom: string;
  flag: string;
  score: number;
  statut: string;
  ebitdaAn1: number;
  equityAn1: number;
  roiTroisAns: number;
  forces: string;
  risques: string;
}

interface FinancialData {
  volumes: {
    an1: { forward: number; futures: number; total: number };
    an2: { forward: number; futures: number; total: number };
    an3: { forward: number; futures: number; total: number };
  };
  ca: { an1: number; an2: number; an3: number };
  margeTrading: { an1: number; an2: number; an3: number };
  ebitda: { an1: number; an2: number; an3: number };
}

interface RiskData {
  categorie: string;
  impact: number;
  probabilite: number;
  criticite: number;
  mitigation: string;
}

class NeskaoPDFExporter {
  private doc: jsPDF;
  private currentPage: number = 1;
  private tableOfContents: Array<{title: string, page: number}> = [];
  
  constructor() {
    this.doc = new jsPDF();
    this.setupStyles();
  }

  private setupStyles() {
    // Configuration des polices et styles
    this.doc.setFont('helvetica');
  }

  private addToTOC(title: string) {
    this.tableOfContents.push({ title, page: this.currentPage });
  }

  private addPageNumber() {
    this.doc.setFontSize(10);
    this.doc.setTextColor(128, 128, 128);
    this.doc.text(`Page ${this.currentPage}`, 190, 287, { align: 'right' });
  }

  private addHeader(title: string) {
    this.doc.setFontSize(16);
    this.doc.setTextColor(31, 41, 55); // text-gray-800
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, 20, 30);
    
    // Ligne de séparation
    this.doc.setDrawColor(229, 231, 235); // border-gray-200
    this.doc.line(20, 35, 190, 35);
    
    this.addToTOC(title);
  }

  private addCoverPage() {
    // Logo et titre (placeholder)
    this.doc.setFontSize(24);
    this.doc.setTextColor(31, 41, 55);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('NESKAO TRADE DESK', 105, 60, { align: 'center' });
    
    this.doc.setFontSize(18);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text('ÉTUDE DE FAISABILITÉ', 105, 80, { align: 'center' });
    this.doc.text('Bureau de Trading International', 105, 95, { align: 'center' });
    
    // Informations projet
    this.doc.setFontSize(12);
    this.doc.setTextColor(75, 85, 99);
    
    const projectInfo = [
      ['Client:', 'NESKAO'],
      ['Projet:', 'Analyse Comparative de Localisation'],
      ['Date:', new Date().toLocaleDateString('fr-FR')],
      ['Version:', 'v1.0'],
      ['Consultant:', 'MEREYA']
    ];

    let yPos = 120;
    projectInfo.forEach(([label, value]) => {
      this.doc.setFont('helvetica', 'bold');
      this.doc.text(label, 60, yPos);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(value, 100, yPos);
      yPos += 10;
    });

    // Cadre décoratif
    this.doc.setDrawColor(14, 165, 233); // border-sky-500
    this.doc.setLineWidth(2);
    this.doc.rect(15, 15, 180, 260);

    this.doc.addPage();
    this.currentPage++;
  }

  private addTableOfContents() {
    this.addHeader('TABLE DES MATIÈRES');
    
    let yPos = 50;
    const sections = [
      'RÉSUMÉ EXÉCUTIF',
      'CONTEXTE ET ENVIRONNEMENT',
      'MÉTHODOLOGIE D\'ANALYSE', 
      'ANALYSE COMPARATIVE DES 12 LOCALISATIONS',
      'ANALYSE RÉGLEMENTAIRE',
      'MIX PRODUITS ET STRATÉGIE',
      'STRUCTURE FINANCIÈRE',
      'ANALYSE SG&A',
      'RENTABILITÉ ET ROI',
      'IMPACT SOCIAL',
      'ANALYSE DÉCISIONNELLE',
      'GESTION DES RISQUES',
      'NEXT STEPS ET ROADMAP',
      'CONCLUSIONS ET RECOMMANDATIONS'
    ];

    this.doc.setFontSize(11);
    sections.forEach((section, index) => {
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(`${index + 1}. ${section}`, 20, yPos);
      
      // Points de suite
      const dots = '.'.repeat(40);
      this.doc.setTextColor(170, 170, 170);
      this.doc.text(dots, 80, yPos);
      
      // Numéro de page (placeholder)
      this.doc.setTextColor(31, 41, 55);
      this.doc.text((index + 4).toString(), 180, yPos, { align: 'right' });
      
      yPos += 12;
    });

    this.addPageNumber();
    this.doc.addPage();
    this.currentPage++;
  }

  private addExecutiveSummary() {
    this.addHeader('RÉSUMÉ EXÉCUTIF');
    
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(220, 38, 38); // text-red-600
    this.doc.text('RECOMMANDATION PRINCIPALE : PARIS 🇫🇷', 20, 50);
    
    this.doc.setFontSize(11);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(31, 41, 55);
    
    const summaryText = [
      'Cette étude présente une analyse exhaustive de 12 localisations potentielles pour l\'établissement',
      'du bureau de trading international de Neskao. L\'analyse multicritères évalue chaque localisation',
      'selon 5 dimensions clés : réglementation (15%), impact social (30%), ROI (15%),',
      'financement DFI (10%) et cash management (30%).',
      '',
      'Avec un score pondéré de 8.09/10, Paris représente le choix optimal grâce à :',
      '• Liens historiques privilégiés avec la Côte d\'Ivoire',
      '• Accès optimisé aux financements de développement (AFD/Proparco)',
      '• Impact social maximum (150K diaspora ivoirienne)',
      '• EBITDA positif dès l\'An 1 (+0.52M€)',
      '• Convention fiscale éliminant le risque de double imposition',
      '',
      'ALTERNATIVES CRÉDIBLES :',
      '• Genève (8.06/10) - Hub financier international, standards suisses',
      '• Amsterdam (7.98/10) - Port #1 cacao Europe, innovation ESG',
      '',
      'INVESTISSEMENT REQUIS : 1.89M€ de capital initial',
      'RENTABILITÉ : ROI 3 ans de 171.6%, payback 2.3 ans',
      'IMPACT : 50+ emplois qualifiés, formation jeunes Ivoiriens'
    ];

    let yPos = 65;
    summaryText.forEach(line => {
      if (line.startsWith('•')) {
        this.doc.setTextColor(14, 165, 233); // text-sky-600
        this.doc.text(line, 25, yPos);
        this.doc.setTextColor(31, 41, 55);
      } else if (line.includes('ALTERNATIVES') || line.includes('INVESTISSEMENT') || line.includes('RENTABILITÉ') || line.includes('IMPACT')) {
        this.doc.setFont('helvetica', 'bold');
        this.doc.text(line, 20, yPos);
        this.doc.setFont('helvetica', 'normal');
      } else {
        this.doc.text(line, 20, yPos);
      }
      yPos += 6;
    });

    this.addPageNumber();
    this.doc.addPage();
    this.currentPage++;
  }

  private addCitiesComparison(cities: CityData[]) {
    this.addHeader('ANALYSE COMPARATIVE DES 12 LOCALISATIONS');
    
    // Préparation des données pour le tableau
    const tableData = cities.map((city, index) => [
      (index + 1).toString(),
      `${city.flag} ${city.nom}`,
      `${city.score.toFixed(2)}/10`,
      city.statut,
      `${city.ebitdaAn1 >= 0 ? '+' : ''}${city.ebitdaAn1.toFixed(2)}M€`,
      `${city.equityAn1.toFixed(2)}M€`,
      `${city.roiTroisAns.toFixed(1)}%`
    ]);

    // Configuration du tableau
    (this.doc as any).autoTable({
      head: [['Rang', 'Ville', 'Score', 'Statut', 'EBITDA An1', 'Equity An1', 'ROI 3ans']],
      body: tableData,
      startY: 50,
      theme: 'grid',
      headStyles: {
        fillColor: [243, 244, 246], // bg-gray-100
        textColor: [31, 41, 55], // text-gray-800
        fontStyle: 'bold',
        fontSize: 9
      },
      bodyStyles: {
        fontSize: 8,
        textColor: [31, 41, 55]
      },
      columnStyles: {
        0: { cellWidth: 15, halign: 'center' },
        1: { cellWidth: 35 },
        2: { cellWidth: 25, halign: 'center' },
        3: { cellWidth: 30, halign: 'center' },
        4: { cellWidth: 25, halign: 'center' },
        5: { cellWidth: 25, halign: 'center' },
        6: { cellWidth: 25, halign: 'center' }
      },
      didParseCell: (data: any) => {
        if (data.section === 'body' && data.column.index === 3) {
          if (data.cell.text[0].includes('RECOMMANDÉ')) {
            data.cell.styles.textColor = [5, 150, 105]; // text-emerald-600
          } else if (data.cell.text[0].includes('POSSIBLE')) {
            data.cell.styles.textColor = [2, 132, 199]; // text-sky-600
          } else {
            data.cell.styles.textColor = [220, 38, 38]; // text-red-600
          }
        }
      }
    });

    this.addPageNumber();
    this.doc.addPage();
    this.currentPage++;
  }

  private addFinancialAnalysis(financial: FinancialData) {
    this.addHeader('ANALYSE FINANCIÈRE - PROJECTIONS 3 ANS');
    
    // Tableau des projections
    const financialTableData = [
      ['An 1', financial.volumes.an1.forward.toLocaleString(), financial.volumes.an1.futures.toLocaleString(), 
       financial.volumes.an1.total.toLocaleString(), financial.ca.an1.toFixed(2), 
       financial.margeTrading.an1.toFixed(2), financial.ebitda.an1.toFixed(2)],
      ['An 2', financial.volumes.an2.forward.toLocaleString(), financial.volumes.an2.futures.toLocaleString(),
       financial.volumes.an2.total.toLocaleString(), financial.ca.an2.toFixed(2),
       financial.margeTrading.an2.toFixed(2), financial.ebitda.an2.toFixed(2)],
      ['An 3', financial.volumes.an3.forward.toLocaleString(), financial.volumes.an3.futures.toLocaleString(),
       financial.volumes.an3.total.toLocaleString(), financial.ca.an3.toFixed(2),
       financial.margeTrading.an3.toFixed(2), financial.ebitda.an3.toFixed(2)]
    ];

    (this.doc as any).autoTable({
      head: [['Année', 'Forward (T)', 'Futures (T)', 'Total (T)', 'CA (M€)', 'Marge Trading (M€)', 'EBITDA (M€)']],
      body: financialTableData,
      startY: 50,
      theme: 'grid',
      headStyles: {
        fillColor: [243, 244, 246],
        textColor: [31, 41, 55],
        fontStyle: 'bold',
        fontSize: 9
      },
      bodyStyles: {
        fontSize: 8,
        textColor: [31, 41, 55],
        halign: 'center'
      }
    });

    // Analyse textuelle
    const analysisY = (this.doc as any).lastAutoTable.finalY + 20;
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Points Clés de l\'Analyse Financière :', 20, analysisY);
    
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    const analysisPoints = [
      '• Croissance Progressive : Montée en charge de 6,490T (An1) à 21,620T (An3)',
      '• Stratégie Hybride : Introduction graduelle des futures à partir de l\'An2', 
      '• Rentabilité Opérationnelle : EBITDA positif dès l\'An1 pour Paris',
      '• Scaling Efficace : Marge trading passant de 1.78M€ à 11.31M€',
      '• Cash Flow Positif : Génération de liquidités dès la 2ème année'
    ];

    let yPos = analysisY + 15;
    analysisPoints.forEach(point => {
      this.doc.text(point, 20, yPos);
      yPos += 8;
    });

    this.addPageNumber();
    this.doc.addPage();
    this.currentPage++;
  }

  private addRiskAnalysis(risks: RiskData[]) {
    this.addHeader('MATRICE DES RISQUES');
    
    const riskTableData = risks.map(risk => [
      risk.categorie,
      `${risk.impact}/5`,
      `${risk.probabilite}/5`,
      risk.criticite.toString(),
      risk.mitigation
    ]);

    (this.doc as any).autoTable({
      head: [['Catégorie', 'Impact', 'Probabilité', 'Criticité', 'Stratégies de Mitigation']],
      body: riskTableData,
      startY: 50,
      theme: 'grid',
      headStyles: {
        fillColor: [243, 244, 246],
        textColor: [31, 41, 55],
        fontStyle: 'bold',
        fontSize: 9
      },
      bodyStyles: {
        fontSize: 8,
        textColor: [31, 41, 55]
      },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 20, halign: 'center' },
        2: { cellWidth: 25, halign: 'center' },
        3: { cellWidth: 20, halign: 'center' },
        4: { cellWidth: 65 }
      },
      didParseCell: (data: any) => {
        if (data.section === 'body' && data.column.index === 3) {
          const criticite = parseInt(data.cell.text[0]);
          if (criticite >= 20) {
            data.cell.styles.textColor = [220, 38, 38]; // text-red-600
          } else if (criticite >= 12) {
            data.cell.styles.textColor = [245, 158, 11]; // text-amber-500
          }
        }
      }
    });

    this.addPageNumber();
    this.doc.addPage();
    this.currentPage++;
  }

  private addRecommendations() {
    this.addHeader('RECOMMANDATIONS STRATÉGIQUES');
    
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(220, 38, 38);
    this.doc.text('DÉCISION RECOMMANDÉE : PARIS', 20, 50);
    
    this.doc.setFontSize(11);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(31, 41, 55);
    
    const recommendationsText = [
      'L\'analyse exhaustive des 12 localisations confirme Paris comme choix optimal pour',
      'l\'établissement du bureau de trading international de Neskao.',
      '',
      'FACTEURS DÉCISIFS :',
      '✅ Score consolidé : 8.09/10 (1er/12)',
      '✅ Impact social maximum : 8.5/10 (liens CI, diaspora 150K)',
      '✅ Rentabilité immédiate : EBITDA +0.52M€ dès An1',
      '✅ Financement privilégié : AFD/Proparco (score 10/10)',
      '✅ Cadre réglementaire optimal : Convention fiscale CI',
      '',
      'PLAN DE DÉPLOIEMENT :',
      '• Phase 1 (Août 2024) : Fondation légale & réglementaire',
      '• Phase 2 (Sept-Nov 2024) : Structuration financière & partenariats',
      '• Phase 3 (Oct-Déc 2024) : Déploiement opérationnel',
      '',
      'INVESTISSEMENT & RETOUR :',
      '• Capital initial : 1.89M€',
      '• ROI 3 ans : 171.6%',
      '• Payback : 2.3 ans',
      '• Résultats nets cumulés : 5.14M€'
    ];

    let yPos = 65;
    recommendationsText.forEach(line => {
      if (line.startsWith('✅') || line.startsWith('•')) {
        this.doc.setTextColor(14, 165, 233);
        this.doc.text(line, 25, yPos);
        this.doc.setTextColor(31, 41, 55);
      } else if (line.includes('FACTEURS') || line.includes('PLAN') || line.includes('INVESTISSEMENT')) {
        this.doc.setFont('helvetica', 'bold');
        this.doc.text(line, 20, yPos);
        this.doc.setFont('helvetica', 'normal');
      } else {
        this.doc.text(line, 20, yPos);
      }
      yPos += 6;
    });

    this.addPageNumber();
  }

  public generateReport(): Blob {
    // Données simulées (à remplacer par les vraies données de la WebApp)
    const cities: CityData[] = [
      { nom: 'Paris', flag: '🇫🇷', score: 8.09, statut: 'RECOMMANDÉ', ebitdaAn1: 0.52, equityAn1: 1.89, roiTroisAns: 171.6, forces: 'Liens CI, Convention fiscale', risques: 'Coûts élevés' },
      { nom: 'Genève', flag: '🇨🇭', score: 8.06, statut: 'RECOMMANDÉ', ebitdaAn1: -0.23, equityAn1: 1.78, roiTroisAns: 187.5, forces: 'Hub DFI mondial', risques: 'Coûts prohibitifs' },
      { nom: 'Amsterdam', flag: '🇳🇱', score: 7.98, statut: 'RECOMMANDÉ', ebitdaAn1: 0.07, equityAn1: 1.74, roiTroisAns: 176.8, forces: 'Port #1 cacao', risques: 'Distance culturelle' },
      { nom: 'Singapour', flag: '🇸🇬', score: 7.49, statut: 'POSSIBLE', ebitdaAn1: 0.02, equityAn1: 1.61, roiTroisAns: 327.5, forces: 'ROI exceptionnel', risques: 'Distance prohibitive' },
      { nom: 'Hambourg', flag: '🇩🇪', score: 7.32, statut: 'POSSIBLE', ebitdaAn1: 0.09, equityAn1: 1.85, roiTroisAns: 168.1, forces: 'Expertise portuaire', risques: 'Bureaucratie' },
      { nom: 'Londres', flag: '🇬🇧', score: 7.06, statut: 'POSSIBLE', ebitdaAn1: -0.67, equityAn1: 2.00, roiTroisAns: 151.2, forces: 'ICE Futures', risques: 'Post-Brexit' },
      { nom: 'Chypre', flag: '🇨🇾', score: 7.14, statut: 'POSSIBLE', ebitdaAn1: 0.40, equityAn1: 2.38, roiTroisAns: 315.1, forces: 'Fiscalité 10%', risques: 'Distance CI' },
      { nom: 'Maroc CFC', flag: '🇲🇦', score: 6.91, statut: 'POSSIBLE', ebitdaAn1: 0.93, equityAn1: 5.67, roiTroisAns: 142.3, forces: 'Sud-Sud', risques: 'Contrôle changes' },
      { nom: 'Maurice', flag: '🇲🇺', score: 6.56, statut: 'POSSIBLE', ebitdaAn1: 0.82, equityAn1: 3.76, roiTroisAns: 138.7, forces: 'Hub régional', risques: 'Image offshore' },
      { nom: 'Tel Aviv', flag: '🇮🇱', score: 6.58, statut: 'ENVISAGEABLE', ebitdaAn1: -0.06, equityAn1: 2.17, roiTroisAns: 134.8, forces: 'Innovation', risques: 'Géopolitique' },
      { nom: 'Dubai', flag: '🇦🇪', score: 6.50, statut: 'ENVISAGEABLE', ebitdaAn1: 0.00, equityAn1: 2.59, roiTroisAns: 156.2, forces: 'Zone franche', risques: 'Impact social faible' },
      { nom: 'Andorre', flag: '🇦🇩', score: 5.23, statut: 'DÉCONSEILLÉ', ebitdaAn1: 0.76, equityAn1: 2.88, roiTroisAns: 147.8, forces: 'Fiscalité bas', risques: 'Isolement total' }
    ];

    const financial: FinancialData = {
      volumes: {
        an1: { forward: 6490, futures: 0, total: 6490 },
        an2: { forward: 9735, futures: 3250, total: 12985 },
        an3: { forward: 14470, futures: 7150, total: 21620 }
      },
      ca: { an1: 54.18, an2: 132.57, an3: 227.58 },
      margeTrading: { an1: 1.78, an2: 4.25, an3: 11.31 },
      ebitda: { an1: 0.40, an2: 2.91, an3: 9.60 }
    };

    const risks: RiskData[] = [
      { categorie: 'Volatilité Marché', impact: 5, probabilite: 5, criticite: 25, mitigation: 'Hedging minimum 80%, limites VAR strictes' },
      { categorie: 'Financier/Liquidité', impact: 5, probabilite: 4, criticite: 20, mitigation: 'Capital buffer 150%, lignes crédit multi-banques' },
      { categorie: 'Expertise/Erreur Humaine', impact: 4, probabilite: 3, criticite: 12, mitigation: 'Double validation trades, formation continue' },
      { categorie: 'Réglementaire/Compliance', impact: 4, probabilite: 3, criticite: 12, mitigation: 'Compliance officer dédié, audit mensuel' }
    ];

    // Génération du rapport
    this.addCoverPage();
    this.addTableOfContents();
    this.addExecutiveSummary();
    this.addCitiesComparison(cities);
    this.addFinancialAnalysis(financial);
    this.addRiskAnalysis(risks);
    this.addRecommendations();

    return this.doc.output('blob');
  }
}

export default NeskaoPDFExporter;