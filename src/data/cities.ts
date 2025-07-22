import { City, SpiderData, RadarData, FinancialMetrics, PonderationData } from '../types/index.ts';

// City ranking data with scores
export const villesData: City[] = [
  { ville: 'Paris', scorePondere: 7.87, scoreTotal: 10 },
  { ville: 'Genève', scorePondere: 7.81, scoreTotal: 10 },
  { ville: 'Amsterdam', scorePondere: 7.65, scoreTotal: 10 },
  { ville: 'Singapour', scorePondere: 7.49, scoreTotal: 10 },
  { ville: 'Hambourg', scorePondere: 6.78, scoreTotal: 10 },
  { ville: 'Londres', scorePondere: 6.72, scoreTotal: 10 },
  { ville: 'Chypre', scorePondere: 6.51, scoreTotal: 10 },
  { ville: 'Maurice', scorePondere: 5.62, scoreTotal: 10 },
  { ville: 'Andorre', scorePondere: 4.20, scoreTotal: 10 }
];

// Weighting data for analysis criteria
export const ponderationData: PonderationData[] = [
  { name: 'Impact Social', value: 30, color: '#8b5cf6' },
  { name: 'Cash Management', value: 30, color: '#3b82f6' },
  { name: 'Réglementation', value: 15, color: '#10b981' },
  { name: 'ROI', value: 15, color: '#f59e0b' },
  { name: 'Financement DFI', value: 10, color: '#ef4444' }
];

// Spider chart data for comparing cities across different criteria
export const spiderData: SpiderData[] = [
  { subject: 'Réglementation', Paris: 10, Genève: 10, Amsterdam: 10, Singapour: 9, Chypre: 8 },
  { subject: 'Impact Social', Paris: 8.5, Genève: 7.9, Amsterdam: 7.75, Singapour: 7.2, Chypre: 6.3 },
  { subject: 'ROI', Paris: 5.46, Genève: 5.92, Amsterdam: 5.61, Singapour: 5.8, Chypre: 4.95 },
  { subject: 'Financement', Paris: 10, Genève: 10, Amsterdam: 9, Singapour: 8.5, Chypre: 9 },
  { subject: 'Cash Management', Paris: 6.66, Genève: 6.85, Amsterdam: 6.93, Singapour: 6.2, Chypre: 5.5 }
];

// Radar chart data for detailed city comparison
export const radarData: RadarData[] = [
  { 
    critere: 'Réglementation',
    Paris: 10.00,
    Genève: 10.00,
    Amsterdam: 10.00
  },
  { 
    critere: 'Impact Social',
    Paris: 8.50,
    Genève: 7.90,
    Amsterdam: 7.75
  },
  { 
    critere: 'ROI',
    Paris: 5.46,
    Genève: 5.92,
    Amsterdam: 5.61
  },
  { 
    critere: 'Financement DFI',
    Paris: 10.00,
    Genève: 10.00,
    Amsterdam: 9.00
  },
  { 
    critere: 'Cash Management',
    Paris: 6.66,
    Genève: 6.85,
    Amsterdam: 6.93
  }
];

// Financial metrics for top 3 cities
export const metriquesTop3: Record<string, FinancialMetrics> = {
  Paris: { ebitdaAn1: 0.52, roi3ans: 171.6, sgaTonne: 199, resultat3ans: 5.14 },
  Genève: { ebitdaAn1: -0.23, roi3ans: 187.5, sgaTonne: 261, resultat3ans: 5.13 },
  Amsterdam: { ebitdaAn1: 0.07, roi3ans: 176.8, sgaTonne: 206, resultat3ans: 4.82 }
};