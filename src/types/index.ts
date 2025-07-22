export interface City {
  ville: string;
  scorePondere: number;
  scoreTotal: number;
}

export interface LocationAnalysis {
  rang: number;
  ville: string;
  flag: string;
  scoreReg: number;
  impactSocial: number;
  scoreROI: number;
  scoreDFI: number;
  scoreCash: number;
  scorePondere: number;
  statut: 'GO' | 'POSSIBLE' | 'NO';
  decision?: string;
  forces: string;
  risques: string;
}

export interface PonderationData {
  name: string;
  value: number;
  color: string;
}

export interface SpiderData {
  subject: string;
  Paris: number;
  Genève: number;
  Amsterdam: number;
  Singapour?: number;
  Chypre?: number;
}

export interface RiskData {
  type: string;
  impact: 'Élevé' | 'Moyen' | 'Faible';
  probabilite: 'Élevée' | 'Moyenne' | 'Faible' | 'Très Faible';
  mitigation: string;
}

export interface ImplementationPhase {
  phase: string;
  nom: string;
  duree: string;
  budget: string;
  description?: string[];
  actions?: ImplementationAction[];
}

export interface ImplementationAction {
  action: string;
  responsable: string;
  livrable: string;
  budget: string;
}

export interface FinancialMetrics {
  ebitdaAn1: number;
  roi3ans: number;
  sgaTonne: number;
  resultat3ans: number;
}

export interface RadarData {
  critere: string;
  Paris: number;
  Genève: number;
  Amsterdam: number;
}

export interface EbitdaData {
  ville: string;
  an1: number;
  an2: number;
  an3: number;
  roi3ans: number;
  irr: number;
  payback: number;
}

export interface EvolutionData {
  annee: string;
  Paris: number;
  Genève: number;
  Amsterdam: number;
  Londres: number;
  Singapour: number;
  Chypre?: number;
}

export interface ScoreData {
  ville: string;
  scoreROI: number;
  scorePondere: number;
  statut: string;
}

export interface VolumeData {
  produit: string;
  an1: number;
  an2: number;
  an3: number;
  total: number;
}

export interface CaMargeData {
  annee: string;
  volume: number;
  ca: number;
  margeForward: number;
  margeFutures: number;
  margeTotal: number;
  margePct: number;
}

export interface KpiData {
  kpi: string;
  cible: string;
  description: string;
}