import { EbitdaData, EvolutionData, ScoreData, VolumeData, CaMargeData, KpiData } from '../types/index.ts';

// EBITDA data for all cities (in millions EUR)
export const ebitdaData: EbitdaData[] = [
  { ville: 'Paris', an1: 0.12, an2: 1.40, an3: 6.81, roi3ans: 543.2, irr: 65, payback: 1.8 },
  { ville: 'Genève', an1: -0.09, an2: 1.23, an3: 6.54, roi3ans: 570.8, irr: 68, payback: 1.9 },
  { ville: 'Amsterdam', an1: 0.04, an2: 1.34, an3: 6.68, roi3ans: 595.4, irr: 70, payback: 1.7 },
  { ville: 'Londres', an1: -0.34, an2: 1.09, an3: 6.37, roi3ans: 473.0, irr: 58, payback: 2.1 },
  { ville: 'Chypre', an1: 0.20, an2: 1.33, an3: 6.65, roi3ans: 394.1, irr: 55, payback: 1.9 },
  { ville: 'Hambourg', an1: 0.05, an2: 1.38, an3: 6.72, roi3ans: 547.3, irr: 66, payback: 1.8 },
  { ville: 'Andorre', an1: 0.38, an2: 1.61, an3: 7.01, roi3ans: 319.4, irr: 48, payback: 1.6 },
  { ville: 'Maurice', an1: 0.41, an2: 1.64, an3: 7.05, roi3ans: 234.0, irr: 42, payback: 1.5 },
  { ville: 'Maroc CFC', an1: 0.47, an2: 1.70, an3: 7.12, roi3ans: 147.2, irr: 35, payback: 1.4 },
  { ville: 'Dubai', an1: 0.00, an2: 1.33, an3: 6.67, roi3ans: 342.3, irr: 52, payback: 2.0 },
  { ville: 'Tel Aviv', an1: -0.03, an2: 1.30, an3: 6.61, roi3ans: 384.4, irr: 54, payback: 2.0 },
  { ville: 'Singapour', an1: 0.01, an2: 1.12, an3: 6.41, roi3ans: 642.0, irr: 75, payback: 1.6 },
  { ville: 'Casablanca', an1: 0.24, an2: 1.48, an3: 6.92, roi3ans: 456.0, irr: 60, payback: 1.7 }
];

// Evolution data for EBITDA charts
export const evolutionData: EvolutionData[] = [
  { 
    annee: 'An 1', 
    Paris: 0.12, 
    Genève: -0.09, 
    Amsterdam: 0.04,
    Londres: -0.34,
    Chypre: 0.20,
    Singapour: 0.01
  },
  { 
    annee: 'An 2', 
    Paris: 1.40, 
    Genève: 1.23, 
    Amsterdam: 1.34,
    Londres: 1.09,
    Chypre: 1.33,
    Singapour: 1.12
  },
  { 
    annee: 'An 3', 
    Paris: 6.81, 
    Genève: 6.54, 
    Amsterdam: 6.68,
    Londres: 6.37,
    Chypre: 6.65,
    Singapour: 6.41
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
  { produit: 'Beurre standard', an1: 1162, an2: 3021, an3: 6971, total: 11154 },
  { produit: 'Beurre désodorisé', an1: 0, an2: 0, an3: 0, total: 0 },
  { produit: 'Poudre standard', an1: 353, an2: 919, an3: 2120, total: 3392 },
  { produit: 'Poudre alcalinisée', an1: 1435, an2: 2870, an3: 5739, total: 10044 }
];

// Revenue and margin data
export const caMargesData: CaMargeData[] = [
  { 
    annee: 'An 1', 
    volume: 2950, 
    ca: 27.08, 
    margeForward: 0.534, 
    margeFutures: 0.354,
    margeTotal: 0.888,
    margePct: 3.28
  },
  { 
    annee: 'An 2', 
    volume: 6809, 
    ca: 66.29, 
    margeForward: 1.309, 
    margeFutures: 0.817,
    margeTotal: 2.126,
    margePct: 3.21
  },
  { 
    annee: 'An 3', 
    volume: 14830, 
    ca: 151.72, 
    margeForward: 2.939, 
    margeFutures: 4.759,
    margeTotal: 7.698,
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