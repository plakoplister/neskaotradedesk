import { RiskData, ImplementationPhase } from '../types/index.ts';

// Identified risks with impact and mitigation strategies
export const risquesData: RiskData[] = [
  {
    type: 'Volatilité prix extrême',
    impact: 'Élevé',
    probabilite: 'Moyenne',
    mitigation: 'Buffer 30%, options, limites positions'
  },
  {
    type: 'Margin calls ICE',
    impact: 'Moyen',
    probabilite: 'Élevée',
    mitigation: 'Ligne dédiée 15M, monitoring 24/7'
  },
  {
    type: 'Non-conformité EUDR',
    impact: 'Élevé',
    probabilite: 'Faible',
    mitigation: 'Traçabilité GPS, audits réguliers'
  },
  {
    type: 'Double imposition',
    impact: 'Moyen',
    probabilite: 'Très Faible',
    mitigation: 'Convention France-CI active'
  },
  {
    type: 'Perte key people',
    impact: 'Moyen',
    probabilite: 'Moyenne',
    mitigation: 'Packages compétitifs, succession'
  }
];

// Implementation phases with detailed actions and budgets
export const phasesImplementation: ImplementationPhase[] = [
  {
    phase: 'Phase 1',
    nom: 'Préparation',
    duree: 'Mois 1-2',
    budget: '200K',
    actions: [
      { action: 'Création structure juridique SAS', responsable: 'Conseil juridique', livrable: 'Société immatriculée', budget: '50K' },
      { action: 'Négociation lignes bancaires', responsable: 'CFO', livrable: 'Term sheets signés', budget: '30K' },
      { action: 'Agrément CCC Côte d\'Ivoire', responsable: 'Legal', livrable: 'Dossier déposé', budget: '20K' },
      { action: 'Business plan détaillé', responsable: 'CEO', livrable: 'Document investisseurs', budget: '100K' }
    ]
  },
  {
    phase: 'Phase 2',
    nom: 'Setup',
    duree: 'Mois 3-4',
    budget: '500K',
    actions: [
      { action: 'Location bureaux La Défense', responsable: 'COO', livrable: 'Bail signé 250m²', budget: '100K' },
      { action: 'Installation IT/Trading', responsable: 'CTO', livrable: 'Systèmes opérationnels', budget: '200K' },
      { action: 'Recrutement équipe clé', responsable: 'HR', livrable: '4 postes pourvus', budget: '150K' },
      { action: 'Ouverture compte ICE', responsable: 'Head Trader', livrable: 'Accès trading actif', budget: '50K' }
    ]
  },
  {
    phase: 'Phase 3',
    nom: 'Soft Launch',
    duree: 'Mois 5-6',
    budget: '2M USD',
    description: [
      'Démarrage avec 100% trading physique back-to-back',
      'Tests systèmes risk management en conditions réelles',
      'Formation équipe sur procédures et compliance',
      'Premiers contrats avec contreparties agréées CCC'
    ]
  },
  {
    phase: 'Phase 4',
    nom: 'Full Operations',
    duree: 'Mois 7+',
    budget: '7.3M USD',
    description: [
      'Introduction progressive hedging (5% → 45% du book)',
      'Démarrage spéculation limitée (1% → 5%)',
      'Montée en volume selon plan 3 ans',
      'Expansion équipe selon croissance'
    ]
  }
];