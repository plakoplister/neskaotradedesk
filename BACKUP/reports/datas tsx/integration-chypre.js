// IntegrationChypre.jsx
// Module d'intégration de Chypre comme 12ème localisation dans Neskao Trade Desk
// Créé le : 19/07/2025

export const DONNEES_CHYPRE = {
  // IDENTITÉ
  identite: {
    nom: 'Chypre',
    flag: '🇨🇾',
    rang: 7,  // Position dans le classement global
    statut: 'GO',
    decision: 'POSSIBLE',
    zone: 'Europe',
    fiscalite: '12.5%',
    fuseau: 'UTC+2'
  },

  // SCORES D'ÉVALUATION
  scores: {
    scoreReg: 8.0,
    impactSocial: 6.3,
    scoreROI: 4.95,
    scoreDFI: 9.0,
    scoreCash: 5.5,
    scorePondere: 6.51
  },

  // ANALYSE DÉCISIONNELLE
  analyse: {
    forces: 'Membre UE, fiscalité 12.5%, hub services financiers',
    risques: 'Pas de convention CI, coûts dirigeants élevés',
    avantagesClés: 'Fiscalité UE attractive, anglophone, standards européens'
  },

  // DONNÉES FINANCIÈRES P&L (M€)
  financieres: {
    // Volumes identiques pour toutes les villes
    volumes: {
      an1: 6489.88,
      an2: 14979.64,
      an3: 24470.15
    },
    // CA identique pour toutes les villes
    ca: {
      an1: 54.16,
      an2: 132.57,
      an3: 227.58
    },
    // Marges spécifiques
    margeForward: {
      an1: 1.07,
      an2: 2.62,
      an3: 4.41
    },
    margeFutures: {
      an1: 0.65,
      an2: 1.58,
      an3: 6.90
    },
    totalRevenus: {
      an1: 1.72,
      an2: 4.20,
      an3: 11.31
    },
    // Coûts et résultats
    totalSGA: {
      an1: 1.384,
      an2: 1.330,
      an3: 1.678
    },
    amortInteret: {
      an1: 0.10,
      an2: 0.23,
      an3: 0.37
    },
    impots: {
      an1: 0,
      an2: 0.32,
      an3: 1.17
    },
    ebitda: {
      an1: -0.06,
      an2: 2.59,
      an3: 9.33
    },
    cashFlow: {
      an1: -0.16,
      an2: 2.04,
      an3: 7.79
    }
  },

  // DONNÉES RENTABILITÉ
  rentabilite: {
    roi3ans: 165.0,
    irr: 37,
    payback: 2.4
  },

  // STRUCTURE DE FINANCEMENT (M€)
  financement: {
    capitalInitial: 3.12,
    ranking: 9,
    forwardEquityPct: 15,
    futuresEquityPct: 25,
    tauxForward: 7.0,
    tauxFutures: 7.5,
    ratioDE: 4.39,
    // An 1
    an1: {
      total: 16.84,
      cashForward: 10.87,
      cashFutures: 5.97,
      equity: 3.12,
      dette: 13.72,
      coutTotal: 0.98
    },
    // An 2
    an2: {
      total: 38.86,
      cashForward: 25.10,
      cashFutures: 13.76,
      equity: 7.20,
      dette: 31.66,
      coutTotal: 2.26
    },
    // An 3
    an3: {
      total: 63.48,
      cashForward: 41.01,
      cashFutures: 22.47,
      equity: 11.76,
      dette: 51.72,
      coutTotal: 3.69
    },
    // Ratings DFI
    dfi: {
      afd: 'MOYEN',
      fmo: 'BON',
      bii: 'BON',
      ifc: 'EXCELLENT',
      autres1: 'EXCELLENT',
      autres2: 'BON'
    }
  },

  // DONNÉES SG&A (000 EUR)
  sga: {
    // Totaux
    totaux: {
      an1: 1384,
      an2: 1330,
      an3: 1678,
      total3ans: 4392
    },
    // Détail des coûts
    detail: {
      personnel: {
        an1: 620,
        an2: 695,
        an3: 870
      },
      bureaux: {
        an1: 70,
        an2: 84,
        an3: 105
      },
      itSystemes: {
        an1: 124,
        an2: 171,
        an3: 218
      },
      compliance: {
        an1: 80,
        an2: 110,
        an3: 160
      },
      voyages: {
        an1: 150,
        an2: 170,
        an3: 200
      },
      autres: {
        an1: 90,
        an2: 100,
        an3: 125
      },
      setup: {
        an1: 250,
        an2: 0,
        an3: 0
      }
    },
    // Méta-données
    rank: 6,
    categorie: 'competitif',
    ratioAn3: 69  // €/tonne
  },

  // DONNÉES RÉGLEMENTAIRES
  reglementation: {
    capitalMinimum: '10M EUR',
    licences: ['MiFID II', 'Licence Trading Commodities', 'AML/KYC'],
    conventionFiscaleCI: false,
    restrictions: 'Standards UE complets, reporting EUDR obligatoire',
    noteReglementaire: 8.0,
    specificitesLocales: {
      langues: ['Anglais', 'Grec'],
      deviseLocale: 'EUR',
      stabiliteJuridique: 'Excellente',
      infrastructureBancaire: 'Développée'
    }
  },

  // IMPACT SOCIAL DÉTAILLÉ
  impactSocial: {
    scoreGlobal: 6.3,
    details: {
      proximiteCI: 5,
      ecosystemeESG: 7,
      financementsImpact: 8,
      emploiFormationCI: 4,
      transparenceFiscale: 9,
      influencePolitique: 5,
      partenariatsLocaux: 6
    },
    forces: [
      'Standards européens ESG',
      'Transparence fiscale UE',
      'Accès financements verts EIB/EBRD'
    ],
    faiblesses: [
      'Distance culturelle CI importante',
      'Pas de diaspora ivoirienne',
      'Influence limitée sur politiques CI'
    ]
  },

  // DONNÉES SPÉCIFIQUES CHYPRE
  specificitesChypre: {
    infrastructure: {
      ports: 'Limassol - hub méditerranéen',
      aeroports: 'Larnaca, Paphos - connexions européennes',
      connectiviteCI: 'Pas de vols directs, transit via Paris/Istanbul'
    },
    ecosystemeFinancier: {
      banquesInternationales: ['Bank of Cyprus', 'Hellenic Bank', 'RCB Bank'],
      servicesFinanciers: 'Développés, standards européens',
      talentPool: 'Limité pour trading commodities, recrutement international nécessaire'
    },
    avantagesFiscaux: {
      tauxIS: 12.5,
      dividendes: 0,
      plusValues: 0,
      conventionsFiscales: 'Plus de 60 conventions (mais pas CI)'
    }
  }
};

// INSTRUCTIONS D'INTÉGRATION
export const INTEGRATION_INSTRUCTIONS = {
  etapes: [
    {
      numero: 1,
      titre: "Ajouter Chypre dans les données du Dashboard",
      fichier: "NeskaoTradeDesk.jsx - Section Dashboard",
      action: "Ajouter dans villesData",
      code: `{ ville: 'Chypre', scorePondere: 6.51, scoreTotal: 10 }`
    },
    {
      numero: 2,
      titre: "Intégrer dans l'Analyse Décisionnelle",
      fichier: "renderAnalyseDecisionnelle()",
      action: "Ajouter dans villesCompletes",
      code: `{ 
        rang: 7, ville: 'Chypre', flag: '🇨🇾', 
        scoreReg: 8.0, impactSocial: 6.3, scoreROI: 4.95, 
        scoreDFI: 9.0, scoreCash: 5.5, scorePondere: 6.51, 
        statut: 'POSSIBLE', 
        forces: 'Membre UE, fiscalité 12.5%, hub services financiers', 
        risques: 'Pas de convention CI, coûts dirigeants élevés' 
      }`
    },
    {
      numero: 3,
      titre: "Ajouter dans la section Financement",
      fichier: "renderFinancement() - donneesFinancement",
      action: "Ajouter l'objet complet Chypre",
      details: "Utiliser DONNEES_CHYPRE.financement"
    },
    {
      numero: 4,
      titre: "Intégrer dans SG&A",
      fichier: "renderSGA() - villesData",
      action: "Ajouter dans le tableau villesData",
      code: `{ 
        nom: "Chypre", 
        an1: 1384, an2: 1330, an3: 1678, 
        total: 4392, rank: 6,
        zone: "Europe",
        avantages: "Fiscalité UE attractive, anglophone",
        fiscalite: "12.5%",
        categorie: "competitif"
      }`
    },
    {
      numero: 5,
      titre: "Ajouter dans Rentabilité",
      fichier: "renderRentabilite() - ebitdaData",
      action: "Ajouter dans le tableau ebitdaData",
      code: `{ 
        ville: 'Chypre', 
        an1: -0.06, an2: 2.59, an3: 9.33, 
        roi3ans: 165.0, irr: 37, payback: 2.4 
      }`
    },
    {
      numero: 6,
      titre: "Intégrer dans Impact Social",
      fichier: "renderImpact() - impactScores",
      action: "Ajouter dans le tableau avec le bon ordre de score",
      code: `{ 
        ville: 'Chypre', 
        score: 6.3, 
        region: 'Europe', 
        statut: 'POSSIBLE', 
        color: '#f59e0b' 
      }`
    },
    {
      numero: 7,
      titre: "Ajouter dans Réglementation",
      fichier: "renderReglementation() - renderGeneralTab()",
      action: "Ajouter une carte pour Chypre",
      template: "Utiliser le modèle des autres villes avec les spécificités Chypre"
    },
    {
      numero: 8,
      titre: "Mettre à jour les graphiques",
      action: "Vérifier que Chypre apparaît dans tous les graphiques comparatifs",
      details: "Notamment: évolution EBITDA, comparaison financement, radar chart si top 5"
    },
    {
      numero: 9,
      titre: "Ajouter dans la section Risques",
      fichier: "renderPlanning() - risquesData",
      action: "Ajouter Chypre dans le tableau des risques par ville"
    },
    {
      numero: 10,
      titre: "Mise à jour des compteurs",
      action: "Changer '11 localisations' en '12 localisations' partout dans l'app"
    }
  ],

  verifications: [
    "Vérifier que le score pondéré est correctement calculé (6.51)",
    "S'assurer que Chypre apparaît au rang 7 dans les classements",
    "Confirmer que tous les graphiques incluent Chypre",
    "Vérifier la cohérence des couleurs (POSSIBLE = orange/yellow)",
    "Tester que les totaux et moyennes sont mis à jour"
  ],

  notes: [
    "Chypre se positionne entre Londres et Maurice",
    "Statut 'POSSIBLE' avec couleur orange (#f59e0b)",
    "Pas de convention fiscale avec CI = impact négatif sur Score Reg",
    "Excellent accès DFI européennes = Score DFI élevé",
    "Coûts SG&A dans la moyenne européenne"
  ]
};

// FONCTION HELPER POUR L'INTÉGRATION
export function getChypreDataForSection(section) {
  switch(section) {
    case 'dashboard':
      return { ville: 'Chypre', scorePondere: 6.51, scoreTotal: 10 };
    
    case 'analyse':
      return {
        rang: 7,
        ville: 'Chypre',
        flag: '🇨🇾',
        scoreReg: 8.0,
        impactSocial: 6.3,
        scoreROI: 4.95,
        scoreDFI: 9.0,
        scoreCash: 5.5,
        scorePondere: 6.51,
        statut: 'GO',
        decision: 'POSSIBLE',
        forces: 'Membre UE, fiscalité 12.5%, hub services financiers',
        risques: 'Pas de convention CI, coûts dirigeants élevés'
      };
    
    case 'financement':
      return DONNEES_CHYPRE.financement;
    
    case 'sga':
      return {
        nom: "Chypre",
        an1: 1384,
        an2: 1330,
        an3: 1678,
        total: 4392,
        rank: 6,
        zone: "Europe",
        avantages: "Fiscalité UE attractive, anglophone",
        fiscalite: "12.5%",
        categorie: "competitif"
      };
    
    case 'rentabilite':
      return {
        ville: 'Chypre',
        an1: -0.06,
        an2: 2.59,
        an3: 9.33,
        roi3ans: 165.0,
        irr: 37,
        payback: 2.4
      };
    
    case 'impact':
      return {
        ville: 'Chypre',
        score: 6.3,
        region: 'Europe',
        statut: 'POSSIBLE',
        color: '#f59e0b'
      };
    
    default:
      return DONNEES_CHYPRE;
  }
}

// Export par défaut
export default DONNEES_CHYPRE;