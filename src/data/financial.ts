import { EbitdaData, EvolutionData, ScoreData, VolumeData, CaMargeData, KpiData } from '../types/index.ts';

// EBITDA data for all cities (in millions EUR)
export const ebitdaData: EbitdaData[] = [
  { ville: 'Paris', an1: 0.52, an2: 2.84, an3: 9.93, roi3ans: 171.6, irr: 38, payback: 2.3 },
  { ville: 'Genève', an1: -0.23, an2: 2.34, an3: 9.09, roi3ans: 187.5, irr: 40, payback: 2.5 },
  { ville: 'Amsterdam', an1: 0.07, an2: 2.56, an3: 9.40, roi3ans: 176.8, irr: 39, payback: 2.4 },
  { ville: 'Londres', an1: -0.67, an2: 1.86, an3: 8.47, roi3ans: 133.4, irr: 32, payback: 2.8 },
  { ville: 'Chypre', an1: -0.06, an2: 2.59, an3: 9.33, roi3ans: 165.0, irr: 37, payback: 2.4 },
  { ville: 'Hambourg', an1: 0.09, an2: 2.57, an3: 9.38, roi3ans: 141.9, irr: 34, payback: 2.6 },
  { ville: 'Andorre', an1: 0.76, an2: 3.25, an3: 10.25, roi3ans: 120.1, irr: 30, payback: 2.2 },
  { ville: 'Maurice', an1: 0.82, an2: 3.29, an3: 10.29, roi3ans: 104.4, irr: 28, payback: 2.1 },
  { ville: 'Maroc CFC', an1: 0.93, an2: 3.40, an3: 10.43, roi3ans: 95.2, irr: 25, payback: 2.0 },
  { ville: 'Dubai', an1: 0.00, an2: 2.52, an3: 9.31, roi3ans: 149.0, irr: 35, payback: 2.7 },
  { ville: 'Tel Aviv', an1: -0.06, an2: 2.44, an3: 9.16, roi3ans: 101.8, irr: 27, payback: 2.8 },
  { ville: 'Singapour', an1: 0.02, an2: 2.58, an3: 9.40, roi3ans: 200.0, irr: 42, payback: 2.5 },
  { ville: 'Casablanca', an1: 0.45, an2: 2.95, an3: 9.85, roi3ans: 155.0, irr: 36, payback: 2.3 }
];

// Evolution data for EBITDA charts
export const evolutionData: EvolutionData[] = [
  { 
    annee: 'An 1', 
    Paris: 0.52, 
    Genève: -0.23, 
    Amsterdam: 0.07,
    Londres: -0.67,
    Chypre: -0.06,
    Singapour: 0.02
  },
  { 
    annee: 'An 2', 
    Paris: 2.84, 
    Genève: 2.34, 
    Amsterdam: 2.56,
    Londres: 1.86,
    Chypre: 2.59,
    Singapour: 2.58
  },
  { 
    annee: 'An 3', 
    Paris: 9.93, 
    Genève: 9.09, 
    Amsterdam: 9.40,
    Londres: 8.47,
    Chypre: 9.33,
    Singapour: 9.40
  }
];

// Score data from decision matrix
export const scoresData: ScoreData[] = [
  { ville: 'Paris', scoreROI: 5.46, scorePondere: 7.87, statut: 'RECOMMANDÉ' },
  { ville: 'Genève', scoreROI: 5.92, scorePondere: 7.81, statut: 'RECOMMANDÉ' },
  { ville: 'Amsterdam', scoreROI: 5.61, scorePondere: 7.65, statut: 'RECOMMANDÉ' },
  { ville: 'Londres', scoreROI: 3.34, scorePondere: 6.72, statut: 'POSSIBLE' },
  { ville: 'Chypre', scoreROI: 4.95, scorePondere: 6.51, statut: 'POSSIBLE' },
  { ville: 'Hambourg', scoreROI: 4.19, scorePondere: 6.78, statut: 'POSSIBLE' },
  { ville: 'Singapour', scoreROI: 10.00, scorePondere: 7.49, statut: 'POSSIBLE' },
  { ville: 'Andorre', scoreROI: 3.00, scorePondere: 4.20, statut: 'DÉCONSEILLÉ' },
  { ville: 'Maurice', scoreROI: 1.09, scorePondere: 5.62, statut: 'DÉCONSEILLÉ' },
  { ville: 'Maroc CFC', scoreROI: 0.00, scorePondere: 0.00, statut: 'NON RECOMMANDÉ' },
  { ville: 'Dubai', scoreROI: 3.72, scorePondere: 0.00, statut: 'NON RECOMMANDÉ' },
  { ville: 'Tel Aviv', scoreROI: 2.55, scorePondere: 0.00, statut: 'NON RECOMMANDÉ' }
];

// Volume data for cocoa products (in tonnes)
export const volumesData: VolumeData[] = [
  { produit: 'Masse de cacao', an1: 0, an2: 0, an3: 0, total: 0 },
  { produit: 'Beurre standard', an1: 2323.69, an2: 6041.59, an3: 10456.59, total: 18821.87 },
  { produit: 'Beurre désodorisé', an1: 0, an2: 0, an3: 0, total: 0 },
  { produit: 'Poudre standard', an1: 706.67, an2: 1837.35, an3: 3180.03, total: 5724.05 },
  { produit: 'Poudre alcalinisée', an1: 2869.53, an2: 5739.05, an3: 8608.58, total: 17217.16 }
];

// Revenue and margin data
export const caMargesData: CaMargeData[] = [
  { 
    annee: 'An 1', 
    volume: 5899.89, 
    ca: 54.16, 
    margeForward: 1.07, 
    margeFutures: 0.71,
    margeTotal: 1.78,
    margePct: 3.28
  },
  { 
    annee: 'An 2', 
    volume: 13617.99, 
    ca: 132.57, 
    margeForward: 2.62, 
    margeFutures: 1.63,
    margeTotal: 4.25,
    margePct: 3.21
  },
  { 
    annee: 'An 3', 
    volume: 22245.21, 
    ca: 227.58, 
    margeForward: 4.41, 
    margeFutures: 7.14,
    margeTotal: 11.55,
    margePct: 5.07
  }
];

// KPIs for monitoring and tracking
export const kpisData: KpiData[] = [
  { kpi: 'VaR quotidienne', cible: '< 2%', description: 'Max risque portefeuille' },
  { kpi: 'Taux hedging', cible: '> 95%', description: 'Positions physiques' },
  { kpi: 'Limite spéculation', cible: '< 17%', description: '% du book total' },
  { kpi: 'ROE cible', cible: '> 15%', description: 'Retour sur capital' }
];