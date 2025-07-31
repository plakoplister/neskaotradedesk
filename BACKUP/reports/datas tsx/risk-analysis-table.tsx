import React, { useState } from 'react';
import { AlertTriangle, TrendingUp, Shield, AlertCircle, DollarSign, Users, Globe, Package, Zap, Award } from 'lucide-react';

const RiskAnalysisTable = () => {
  const [sortBy, setSortBy] = useState('criticite');

  // Données des risques avec scoring
  const risques = [
    {
      id: 1,
      categorie: 'Financier/Liquidité',
      description: 'Appels de marge, défaut liquidité, crise trésorerie',
      impact: 5,
      probabilite: 4,
      criticite: 20,
      icon: DollarSign,
      mitigation: [
        'Capital buffer 150% besoins estimés',
        'Lignes crédit confirmées multi-banques',
        'Stress tests mensuels liquidité',
        'Early warning system sur ratios'
      ],
      consequences: 'Faillite, perte licence trading',
      couleur: 'red'
    },
    {
      id: 2,
      categorie: 'Volatilité Marché',
      description: 'Mouvements prix extrêmes, positions adverses',
      impact: 5,
      probabilite: 5,
      criticite: 25,
      icon: TrendingUp,
      mitigation: [
        'Hedging minimum 80% positions',
        'Limites VAR strictes (max 5%/jour)',
        'Stop-loss automatiques obligatoires',
        'Diversification forward/futures'
      ],
      consequences: 'Pertes trading massives (>10M€)',
      couleur: 'red'
    },
    {
      id: 3,
      categorie: 'Expertise/Erreur Humaine',
      description: 'Mauvaise décision trading, erreur saisie, fraude',
      impact: 4,
      probabilite: 3,
      criticite: 12,
      icon: Users,
      mitigation: [
        'Double validation trades >100K€',
        'Formation continue équipe',
        'Système 4-eyes principle',
        'Audit interne trimestriel'
      ],
      consequences: 'Pertes 1-5M€, réputation',
      couleur: 'orange'
    },
    {
      id: 4,
      categorie: 'Réglementaire/Compliance',
      description: 'Non-conformité EUDR, MiFID II, sanctions',
      impact: 4,
      probabilite: 3,
      criticite: 12,
      icon: Shield,
      mitigation: [
        'Compliance officer dédié',
        'Audit compliance mensuel',
        'Formation EUDR obligatoire',
        'Système traçabilité blockchain'
      ],
      consequences: 'Amendes, suspension activité',
      couleur: 'orange'
    },
    {
      id: 5,
      categorie: 'Contrepartie',
      description: 'Défaut fournisseur/client, qualité non-conforme',
      impact: 3,
      probabilite: 4,
      criticite: 12,
      icon: Package,
      mitigation: [
        'Due diligence systématique',
        'Limites crédit par contrepartie',
        'Assurance crédit export',
        'Diversification base fournisseurs'
      ],
      consequences: 'Pertes 500K-2M€',
      couleur: 'orange'
    },
    {
      id: 6,
      categorie: 'Géopolitique',
      description: 'Instabilité CI, sanctions, changements régulation',
      impact: 4,
      probabilite: 2,
      criticite: 8,
      icon: Globe,
      mitigation: [
        'Veille géopolitique continue',
        'Plans contingence multi-scénarios',
        'Diversification géographique',
        'Relations gouvernementales CI'
      ],
      consequences: 'Arrêt activité, pertes stocks',
      couleur: 'yellow'
    },
    {
      id: 7,
      categorie: 'Technologique/Cyber',
      description: 'Panne systèmes, cyberattaque, perte données',
      impact: 3,
      probabilite: 3,
      criticite: 9,
      icon: Zap,
      mitigation: [
        'Infrastructure redondante',
        'Backup temps réel multi-sites',
        'Tests intrusion trimestriels',
        'Assurance cyber risques'
      ],
      consequences: 'Interruption 1-5 jours, pertes',
      couleur: 'yellow'
    },
    {
      id: 8,
      categorie: 'Logistique/Opérationnel',
      description: 'Retards livraison, avaries, congestion ports',
      impact: 2,
      probabilite: 4,
      criticite: 8,
      icon: Package,
      mitigation: [
        'Tracking temps réel',
        'Stocks buffer stratégiques',
        'Contrats performance SLA',
        'Routes alternatives identifiées'
      ],
      consequences: 'Pénalités retard, surcoûts',
      couleur: 'yellow'
    },
    {
      id: 9,
      categorie: 'Réputation/ESG',
      description: 'Scandale travail enfants, déforestation',
      impact: 3,
      probabilite: 2,
      criticite: 6,
      icon: Award,
      mitigation: [
        'Certification Rainforest/Fairtrade',
        'Audits sociaux fournisseurs',
        'Communication transparente',
        'Programme impact local CI'
      ],
      consequences: 'Perte clients, boycott',
      couleur: 'green'
    },
    {
      id: 10,
      categorie: 'Change (FX)',
      description: 'Volatilité EUR/USD/GBP, pertes conversion',
      impact: 2,
      probabilite: 5,
      criticite: 10,
      icon: DollarSign,
      mitigation: [
        'Hedging FX systématique',
        'Natural hedging si possible',
        'Comptes multi-devises',
        'Limites exposition par devise'
      ],
      consequences: 'Impact marge 2-5%',
      couleur: 'yellow'
    }
  ];

  // Fonction de tri
  const sortedRisques = [...risques].sort((a, b) => {
    if (sortBy === 'criticite') return b.criticite - a.criticite;
    if (sortBy === 'impact') return b.impact - a.impact;
    if (sortBy === 'probabilite') return b.probabilite - a.probabilite;
    return 0;
  });

  // Fonction pour obtenir la couleur du badge
  const getBadgeClass = (value, type) => {
    if (type === 'criticite') {
      if (value >= 20) return 'bg-red-500 text-white';
      if (value >= 12) return 'bg-orange-500 text-white';
      return 'bg-yellow-500 text-white';
    }
    if (value >= 4) return 'bg-red-500 text-white';
    if (value >= 3) return 'bg-orange-500 text-white';
    return 'bg-yellow-500 text-white';
  };

  // Statistiques
  const stats = {
    critique: risques.filter(r => r.criticite >= 20).length,
    eleve: risques.filter(r => r.criticite >= 12 && r.criticite < 20).length,
    moyen: risques.filter(r => r.criticite >= 8 && r.criticite < 12).length,
    faible: risques.filter(r => r.criticite < 8).length
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* En-tête avec statistiques */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <AlertTriangle className="text-orange-500" />
          Matrice des Risques - Bureau Trading Cacao
        </h1>
        
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-red-600">{stats.critique}</p>
            <p className="text-sm text-red-700">Risques Critiques</p>
            <p className="text-xs text-gray-600">(Score ≥ 20)</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-orange-600">{stats.eleve}</p>
            <p className="text-sm text-orange-700">Risques Élevés</p>
            <p className="text-xs text-gray-600">(Score 12-19)</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-yellow-600">{stats.moyen}</p>
            <p className="text-sm text-yellow-700">Risques Moyens</p>
            <p className="text-xs text-gray-600">(Score 8-11)</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-green-600">{stats.faible}</p>
            <p className="text-sm text-green-700">Risques Faibles</p>
            <p className="text-xs text-gray-600">(Score &lt; 8)</p>
          </div>
        </div>

        {/* Options de tri */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setSortBy('criticite')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              sortBy === 'criticite' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Trier par Criticité
          </button>
          <button
            onClick={() => setSortBy('impact')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              sortBy === 'impact' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Trier par Impact
          </button>
          <button
            onClick={() => setSortBy('probabilite')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              sortBy === 'probabilite' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Trier par Probabilité
          </button>
        </div>
      </div>

      {/* Tableau des risques */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left font-semibold">Rang</th>
                <th className="p-3 text-left font-semibold">Catégorie</th>
                <th className="p-3 text-left font-semibold">Description</th>
                <th className="p-3 text-center font-semibold">Impact</th>
                <th className="p-3 text-center font-semibold">Probabilité</th>
                <th className="p-3 text-center font-semibold">Criticité</th>
                <th className="p-3 text-left font-semibold">Stratégies de Mitigation</th>
                <th className="p-3 text-left font-semibold">Conséquences</th>
              </tr>
            </thead>
            <tbody>
              {sortedRisques.map((risque, index) => {
                const Icon = risque.icon;
                return (
                  <tr 
                    key={risque.id} 
                    className={`border-t hover:bg-gray-50 transition-colors ${
                      risque.criticite >= 20 ? 'bg-red-50' :
                      risque.criticite >= 12 ? 'bg-orange-50' :
                      risque.criticite >= 8 ? 'bg-yellow-50' :
                      'bg-white'
                    }`}
                  >
                    <td className="p-3 font-bold text-center">
                      {index + 1}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-gray-600" />
                        <span className="font-semibold">{risque.categorie}</span>
                      </div>
                    </td>
                    <td className="p-3 text-sm">
                      {risque.description}
                    </td>
                    <td className="p-3 text-center">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${getBadgeClass(risque.impact, 'impact')}`}>
                        {risque.impact}/5
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${getBadgeClass(risque.probabilite, 'probabilite')}`}>
                        {risque.probabilite}/5
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`inline-block px-3 py-1 rounded text-lg font-bold ${getBadgeClass(risque.criticite, 'criticite')}`}>
                        {risque.criticite}
                      </span>
                    </td>
                    <td className="p-3">
                      <ul className="text-sm space-y-1">
                        {risque.mitigation.map((strat, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <span className="text-green-600">•</span>
                            <span>{strat}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-3 text-sm text-red-700 font-medium">
                      {risque.consequences}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Matrice visuelle */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Matrice Impact/Probabilité</h2>
        <div className="grid grid-cols-6 gap-1">
          {/* En-têtes */}
          <div className="col-span-1"></div>
          {[1, 2, 3, 4, 5].map(prob => (
            <div key={prob} className="text-center text-sm font-semibold p-2">
              P = {prob}
            </div>
          ))}
          
          {/* Lignes de la matrice */}
          {[5, 4, 3, 2, 1].map(impact => (
            <React.Fragment key={impact}>
              <div className="text-center text-sm font-semibold p-2">
                I = {impact}
              </div>
              {[1, 2, 3, 4, 5].map(prob => {
                const score = impact * prob;
                const risquesCase = risques.filter(
                  r => r.impact === impact && r.probabilite === prob
                );
                
                return (
                  <div
                    key={`${impact}-${prob}`}
                    className={`p-2 border text-center relative min-h-[60px] ${
                      score >= 20 ? 'bg-red-200' :
                      score >= 12 ? 'bg-orange-200' :
                      score >= 8 ? 'bg-yellow-200' :
                      'bg-green-100'
                    }`}
                  >
                    <div className="text-xs font-bold">{score}</div>
                    {risquesCase.map(r => {
                      const Icon = r.icon;
                      return (
                        <Icon 
                          key={r.id} 
                          className="w-4 h-4 mx-auto mt-1" 
                          title={r.categorie}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          <p>• <strong>Impact</strong> : 1 = Négligeable | 5 = Catastrophique</p>
          <p>• <strong>Probabilité</strong> : 1 = Très rare | 5 = Très probable</p>
          <p>• <strong>Criticité</strong> = Impact × Probabilité (max 25)</p>
        </div>
      </div>

      {/* Plan d'action prioritaire */}
      <div className="bg-white rounded-lg shadow-lg border-2 border-red-500 overflow-hidden">
        <div className="bg-red-50 p-4">
          <h2 className="text-xl font-bold text-red-800 flex items-center gap-2">
            <AlertCircle />
            Actions Prioritaires Immédiates
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="p-4 bg-red-100 rounded-lg">
            <h4 className="font-bold text-red-900 mb-2">1. Volatilité Marché (Criticité: 25)</h4>
            <p className="text-sm">
              → Mettre en place immédiatement un système de hedging avec limites automatiques<br/>
              → Recruter un Risk Manager certifié avec expérience cacao<br/>
              → Établir des procédures de crise avec seuils d'alerte
            </p>
          </div>
          
          <div className="p-4 bg-red-100 rounded-lg">
            <h4 className="font-bold text-red-900 mb-2">2. Liquidité/Financement (Criticité: 20)</h4>
            <p className="text-sm">
              → Sécuriser 150% du capital nécessaire avant lancement<br/>
              → Négocier lignes de crédit confirmées multi-banques<br/>
              → Créer un comité liquidité avec reporting quotidien
            </p>
          </div>
          
          <div className="p-4 bg-orange-100 rounded-lg">
            <h4 className="font-bold text-orange-900 mb-2">3. Expertise Trading (Criticité: 12)</h4>
            <p className="text-sm">
              → Recruter équipe senior avant ouverture bureau<br/>
              → Programme de formation intensive 3 mois<br/>
              → Partenariat conseil avec trading house établie
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysisTable;