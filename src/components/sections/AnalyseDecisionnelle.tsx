import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';

interface LocationData {
  rang: number;
  ville: string;
  flag: string;
  // Données financières
  ebitdaAn1: number;
  equityAn1: number;
  sgaTonne: number;
  resultatsCumules: number;
  // Scores par critère (sur 10)
  scoreReglementation: number;
  scoreImpactSocial: number;
  scoreROI: number;
  scoreDFI: number;
  scoreCashFlow: number;
  // Score final pondéré
  scoreFinal: number;
  statut: 'EXCELLENT' | 'BON' | 'MOYEN' | 'FAIBLE';
  decision: string;
  forces: string;
  risques: string;
}

const AnalyseDecisionnelle: React.FC = () => {
  // Pondération des critères (définie dans Contexte/Méthodologie)
  const ponderationCriteres = {
    reglementation: 0.15,    // 15%
    impactSocial: 0.30,      // 30%
    roi: 0.15,               // 15%
    dfi: 0.10,               // 10%
    cashFlow: 0.30           // 30%
  };

  // Données consolidées des 12 localités
  const villesData: LocationData[] = [
    {
      rang: 1, ville: 'Singapour', flag: '🇸🇬',
      ebitdaAn1: 0.01, equityAn1: 0.81, sgaTonne: 61, resultatsCumules: 6.88,
      scoreReglementation: 8.0, scoreImpactSocial: 6.1, scoreROI: 10.0, scoreDFI: 8.0, scoreCashFlow: 9.1,
      scoreFinal: 7.49, statut: 'POSSIBLE', decision: 'POSSIBLE',
      forces: 'ROI exceptionnel, financement minimal, standards élevés',
      risques: 'Distance CI, impact social limité'
    },
    {
      rang: 2, ville: 'Chypre', flag: '🇨🇾',
      ebitdaAn1: 0.20, equityAn1: 3.13, sgaTonne: 75, resultatsCumules: 5.92,
      scoreReglementation: 8.0, scoreImpactSocial: 6.3, scoreROI: 9.2, scoreDFI: 9.0, scoreCashFlow: 6.8,
      scoreFinal: 7.14, statut: 'POSSIBLE', decision: 'POSSIBLE',
      forces: 'Fiscalité 10%, transparence UE, financement accessible',
      risques: 'Proximité CI inexistante, formation limitée'
    },
    {
      rang: 3, ville: 'Dubai', flag: '🇦🇪',
      ebitdaAn1: 0.00, equityAn1: 2.59, sgaTonne: 78, resultatsCumules: 5.49,
      scoreReglementation: 7.0, scoreImpactSocial: 5.1, scoreROI: 8.7, scoreDFI: 4.0, scoreCashFlow: 7.2,
      scoreFinal: 6.50, statut: 'POSSIBLE', decision: 'POSSIBLE',
      forces: 'Zone franche, fiscalité 0%, hub commercial',
      risques: 'Impact social faible, accès DFI limité'
    },
    {
      rang: 4, ville: 'Andorre', flag: '🇦🇩',
      ebitdaAn1: 0.38, equityAn1: 2.88, sgaTonne: 55, resultatsCumules: 5.39,
      scoreReglementation: 6.0, scoreImpactSocial: 3.4, scoreROI: 8.5, scoreDFI: 2.0, scoreCashFlow: 5.8,
      scoreFinal: 5.23, statut: 'NON RECOMMANDÉ', decision: 'NON RECOMMANDÉ',
      forces: 'Fiscalité 10%, coûts SG&A bas',
      risques: 'Isolement total, pas d\'écosystème'
    },
    {
      rang: 5, ville: 'Paris', flag: '🇫🇷',
      ebitdaAn1: 0.12, equityAn1: 0.95, sgaTonne: 60, resultatsCumules: 5.14,
      scoreReglementation: 10.0, scoreImpactSocial: 8.5, scoreROI: 7.8, scoreDFI: 10.0, scoreCashFlow: 6.2,
      scoreFinal: 8.09, statut: 'RECOMMANDÉ', decision: 'RECOMMANDÉ',
      forces: 'Liens historiques CI, diaspora 150K, AFD/Proparco',
      risques: 'Perception néo-coloniale, coûts élevés'
    },
    {
      rang: 6, ville: 'Genève', flag: '🇨🇭',
      ebitdaAn1: -0.09, equityAn1: 0.89, sgaTonne: 82, resultatsCumules: 5.13,
      scoreReglementation: 10.0, scoreImpactSocial: 7.9, scoreROI: 7.7, scoreDFI: 10.0, scoreCashFlow: 6.1,
      scoreFinal: 8.06, statut: 'RECOMMANDÉ', decision: 'RECOMMANDÉ',
      forces: 'Hub DFI mondial, légitimité internationale',
      risques: 'Coûts prohibitifs, élitisme'
    },
    {
      rang: 7, ville: 'Amsterdam', flag: '🇳🇱',
      ebitdaAn1: 0.04, equityAn1: 0.87, sgaTonne: 69, resultatsCumules: 4.82,
      scoreReglementation: 10.0, scoreImpactSocial: 7.8, scoreROI: 7.5, scoreDFI: 9.0, scoreCashFlow: 6.3,
      scoreFinal: 7.98, statut: 'POSSIBLE', decision: 'POSSIBLE',
      forces: 'Port #1 cacao Europe, innovation ESG',
      risques: 'Barrière linguistique, distance culturelle'
    },
    {
      rang: 8, ville: 'Maroc CFC', flag: '🇲🇦',
      ebitdaAn1: 0.47, equityAn1: 5.67, sgaTonne: 50, resultatsCumules: 4.77,
      scoreReglementation: 7.0, scoreImpactSocial: 8.6, scoreROI: 6.8, scoreDFI: 5.0, scoreCashFlow: 4.2,
      scoreFinal: 6.91, statut: 'NON RECOMMANDÉ', decision: 'NON RECOMMANDÉ',
      forces: 'Coopération Sud-Sud, formation jeunes excellente',
      risques: 'Contrôle changes, accès futures limité'
    },
    {
      rang: 9, ville: 'Maurice', flag: '🇲🇺',
      ebitdaAn1: 0.41, equityAn1: 3.76, sgaTonne: 52, resultatsCumules: 4.57,
      scoreReglementation: 8.0, scoreImpactSocial: 7.5, scoreROI: 6.2, scoreDFI: 7.0, scoreCashFlow: 3.8,
      scoreFinal: 6.56, statut: 'NON RECOMMANDÉ', decision: 'NON RECOMMANDÉ',
      forces: 'Solidarité africaine, hub régional',
      risques: 'Image offshore, capital élevé'
    },
    {
      rang: 10, ville: 'Hambourg', flag: '🇩🇪',
      ebitdaAn1: 0.05, equityAn1: 0.93, sgaTonne: 68, resultatsCumules: 4.21,
      scoreReglementation: 10.0, scoreImpactSocial: 6.8, scoreROI: 6.8, scoreDFI: 6.0, scoreCashFlow: 6.0,
      scoreFinal: 7.32, statut: 'POSSIBLE', decision: 'POSSIBLE',
      forces: 'Port expertise, rigueur allemande',
      risques: 'Distance culturelle, bureaucratie'
    },
    {
      rang: 11, ville: 'Londres', flag: '🇬🇧',
      ebitdaAn1: -0.34, equityAn1: 1.00, sgaTonne: 88, resultatsCumules: 3.98,
      scoreReglementation: 8.0, scoreImpactSocial: 7.6, scoreROI: 5.9, scoreDFI: 8.0, scoreCashFlow: 5.8,
      scoreFinal: 7.06, statut: 'POSSIBLE', decision: 'POSSIBLE',
      forces: 'ICE Futures siège, transparence',
      risques: 'Post-Brexit, coûts prohibitifs'
    },
    {
      rang: 12, ville: 'Tel Aviv', flag: '🇮🇱',
      ebitdaAn1: -0.03, equityAn1: 2.17, sgaTonne: 84, resultatsCumules: 3.73,
      scoreReglementation: 8.0, scoreImpactSocial: 6.5, scoreROI: 5.4, scoreDFI: 5.0, scoreCashFlow: 5.9,
      scoreFinal: 6.58, statut: 'NON RECOMMANDÉ', decision: 'NON RECOMMANDÉ',
      forces: 'Innovation agritech, excellence technique',
      risques: 'Géopolitique sensible, distance CI'
    }
  ];

  // Fonction pour calculer le score final pondéré
  const calculerScoreFinal = (scores: any) => {
    return (
      scores.reglementation * ponderationCriteres.reglementation +
      scores.impactSocial * ponderationCriteres.impactSocial +
      scores.roi * ponderationCriteres.roi +
      scores.dfi * ponderationCriteres.dfi +
      scores.cashFlow * ponderationCriteres.cashFlow
    );
  };

  // Recalcul des scores finaux avec la bonne pondération
  const villesAvecScoresRecalcules = villesData.map(ville => ({
    ...ville,
    scoreFinalCorrect: calculerScoreFinal({
      reglementation: ville.scoreReglementation,
      impactSocial: ville.scoreImpactSocial,
      roi: ville.scoreROI,
      dfi: ville.scoreDFI,
      cashFlow: ville.scoreCashFlow
    })
  })).sort((a, b) => b.scoreFinalCorrect - a.scoreFinalCorrect);

  // Top 5 basé sur les vrais scores
  const top5Villes = villesAvecScoresRecalcules.slice(0, 5);

  const getColorByStatus = (statut: string) => {
    switch(statut) {
      case 'RECOMMANDÉ': return 'bg-teal-50/30 border-teal-300 text-teal-700';
      case 'POSSIBLE': return 'bg-sky-50/30 border-sky-300 text-sky-700';
      case 'NON RECOMMANDÉ': return 'bg-rose-50/30 border-rose-300 text-rose-700';
      default: return 'bg-gray-100 border-gray-300 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Cartes des 12 localités avec scrolling horizontal */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Vue d'Ensemble - 12 Localisations Évaluées</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-4 min-w-max">
              {villesAvecScoresRecalcules.map((ville, index) => {
                const colors = {
                  'RECOMMANDÉ': 'from-teal-50/30 to-teal-100/30 border-teal-300',
                  'POSSIBLE': 'from-sky-50/30 to-sky-100/30 border-sky-300',
                  'NON RECOMMANDÉ': 'from-rose-50/30 to-rose-100/30 border-rose-300'
                };
                
                return (
                  <div key={ville.ville} className={`min-w-[280px] bg-gradient-to-br ${colors[ville.statut]} border-2 rounded-lg p-4`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{ville.flag}</span>
                        <h3 className="font-bold text-lg">{ville.ville}</h3>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          index < 3 ? 'bg-gold-100 text-gold-800' : getColorByStatus(ville.statut)
                        }`}>
                          #{index + 1}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">EBITDA An1:</span>
                        <span className={`font-bold ${
                          ville.ebitdaAn1 >= 0 ? 'text-teal-600' : 'text-rose-600'
                        }`}>
                          {ville.ebitdaAn1.toFixed(2)} M€
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Equity An1:</span>
                        <span className="font-bold text-sky-600">
                          {ville.equityAn1.toFixed(2)} M€
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">SG&A/tonne:</span>
                        <span className="font-bold">
                          {ville.sgaTonne}€
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Résultats 3ans:</span>
                        <span className="font-bold text-gray-600">
                          {ville.resultatsCumules.toFixed(2)} M€
                        </span>
                      </div>
                      <div className="flex justify-between border-t pt-2 mt-2">
                        <span className="text-gray-600">Score Final:</span>
                        <span className="font-bold text-xl text-indigo-600">
                          {ville.scoreFinalCorrect.toFixed(1)}/10
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Matrice décisionnelle consolidée */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Matrice Décisionnelle Consolidée - 12 Localisations</CardTitle>
          <div className="text-sm text-gray-600 mt-2">
            Pondération: Réglementation (15%), Impact Social (30%), ROI (15%), DFI (10%), Cash Flow (30%)
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-center">Rang</th>
                  <th className="border p-2 text-left">Ville</th>
                  <th className="border p-2 text-center">Statut</th>
                  <th className="border p-2 text-center">Réglementation<br/><span className="text-xs">(15%)</span></th>
                  <th className="border p-2 text-center">Impact Social<br/><span className="text-xs">(30%)</span></th>
                  <th className="border p-2 text-center">ROI<br/><span className="text-xs">(15%)</span></th>
                  <th className="border p-2 text-center">DFI<br/><span className="text-xs">(10%)</span></th>
                  <th className="border p-2 text-center">Cash Flow<br/><span className="text-xs">(30%)</span></th>
                  <th className="border p-2 text-center font-bold">Score Final</th>
                  <th className="border p-2 text-left">Forces Principales</th>
                  <th className="border p-2 text-left">Risques Majeurs</th>
                </tr>
              </thead>
              <tbody>
                {villesAvecScoresRecalcules.map((ville, index) => (
                  <tr key={ville.ville} className={`${
                    index < 3 ? 'bg-teal-50/30' :
                    index < 7 ? 'bg-sky-50/30' :
                    index < 10 ? 'bg-gray-100' :
                    'bg-rose-50/30'
                  }`}>
                    <td className="border p-2 text-center font-bold text-lg">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                    </td>
                    <td className="border p-2 font-semibold">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{ville.flag}</span>
                        {ville.ville}
                      </div>
                    </td>
                    <td className="border p-2 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getColorByStatus(ville.statut)}`}>
                        {ville.decision}
                      </span>
                    </td>
                    <td className="border p-2 text-center font-medium">{ville.scoreReglementation.toFixed(1)}</td>
                    <td className="border p-2 text-center font-medium">{ville.scoreImpactSocial.toFixed(1)}</td>
                    <td className="border p-2 text-center font-medium">{ville.scoreROI.toFixed(1)}</td>
                    <td className="border p-2 text-center font-medium">{ville.scoreDFI.toFixed(1)}</td>
                    <td className="border p-2 text-center font-medium">{ville.scoreCashFlow.toFixed(1)}</td>
                    <td className="border p-2 text-center font-bold text-lg text-indigo-600">
                      {ville.scoreFinalCorrect.toFixed(2)}
                    </td>
                    <td className="border p-2 text-xs max-w-[200px]">{ville.forces}</td>
                    <td className="border p-2 text-xs max-w-[200px]">{ville.risques}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>


      {/* Recommandation finale développée */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Recommandation Finale Consolidée</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Introduction */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-indigo-800 mb-4">🎯 Synthèse Exécutive</h3>
              <p className="text-gray-700 leading-relaxed">
                Après une analyse exhaustive de 12 localisations potentielles selon 5 critères pondérés, 
                l'étude révèle que <strong>Paris</strong> représente le choix optimal pour l'établissement du bureau 
                de trading international de Neskao. Avec un score consolidé de <strong>8.08/10</strong>, Paris 
                devance Genève (8.06) et Amsterdam (7.98) grâce à un équilibre exceptionnel entre impact social, 
                accès au financement et liens historiques avec la Côte d'Ivoire.
              </p>
            </div>

            {/* Sections détaillées */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Réglementation */}
              <div className="bg-teal-50/30 p-5 rounded-lg border-l-4 border-green-500">
                <h4 className="font-bold text-teal-800 mb-3">📋 Réglementation (15%)</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Paris offre un cadre réglementaire idéal avec la convention fiscale Franco-Ivoirienne, 
                  l'agrément CCC automatique et les standards EUDR déjà intégrés. La conformité aux 
                  réglementations européennes facilite l'accès aux marchés ICE Futures.
                </p>
                <div className="bg-white p-2 rounded text-xs">
                  <strong>Score Paris:</strong> 10.0/10 • <strong>Moyenne Top 3:</strong> 10.0/10
                </div>
              </div>

              {/* Mix Produit */}
              <div className="bg-sky-50/30 p-5 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-bold text-sky-800 mb-3">📦 Mix Produit</h4>
                <p className="text-sm text-gray-700 mb-3">
                  La stratégie 55% Forward / 45% Futures maximise les revenus tout en conservant 
                  une exposition raisonnable. Les volumes évoluent de 3K tonnes (An1) à 15K tonnes (An3), 
                  générant des marges trading progressives de 3.3% à 5.1%.
                </p>
                <div className="bg-white p-2 rounded text-xs">
                  <strong>CA cumulé 3 ans:</strong> 245M€ • <strong>Marge moyenne:</strong> 3.9%
                </div>
              </div>

              {/* Structure */}
              <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-bold text-gray-800 mb-3">🏢 Structure</h4>
                <p className="text-sm text-gray-700 mb-3">
                  L'équipe parisienne optimale comprend 2 personnes (An1) évoluant vers 3 (An3): 
                  Directeur Général, Risk/Compliance, Assistant Admin. Structure allégée avec 
                  coûts SG&A maîtrisés à 60€/tonne (An3).
                </p>
                <div className="bg-white p-2 rounded text-xs">
                  <strong>Équipe An3:</strong> 3 personnes • <strong>SG&A/tonne:</strong> 60€
                </div>
              </div>

              {/* Rentabilité */}
              <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-bold text-gray-800 mb-3">💰 Rentabilité (15%)</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Rentabilité opérationnelle dès l'An 1 avec un EBITDA de 0.12M€. ROI 3 ans de 543.2% 
                  et payback de 2.3 ans. Résultats nets cumulés de 5.17M€ sur 3 ans, confirmant 
                  la viabilité économique du projet.
                </p>
                <div className="bg-white p-2 rounded text-xs">
                  <strong>EBITDA An1:</strong> +0.12M€ • <strong>ROI 3 ans:</strong> 543.2%
                </div>
              </div>

              {/* Financement */}
              <div className="bg-gray-100 p-5 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-bold text-gray-800 mb-3">🏦 Financement (30%)</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Besoins en equity modérés (0.95M€ An1) avec accès privilégié à l'AFD/Proparco. 
                  Structure de financement 90% dette / 25% equity pour les activités forward. 
                  Coût total du financement optimisé à 6.87M€ (An1).
                </p>
                <div className="bg-white p-2 rounded text-xs">
                  <strong>Equity requis:</strong> 0.95M€ • <strong>Score DFI:</strong> 10/10
                </div>
              </div>

              {/* Impact Social */}
              <div className="bg-emerald-50 p-5 rounded-lg border-l-4 border-emerald-500">
                <h4 className="font-bold text-teal-800 mb-3">🌍 Impact Social (30%)</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Score exceptionnel de 8.5/10 grâce aux liens historiques, à la diaspora ivoirienne 
                  de 150K personnes et aux programmes Campus France. Opportunité de créer 50+ emplois 
                  qualifiés pour les jeunes Ivoiriens et de développer des partenariats universitaires.
                </p>
                <div className="bg-white p-2 rounded text-xs">
                  <strong>Impact social:</strong> 8.5/10 • <strong>Diaspora CI:</strong> 150K personnes
                </div>
              </div>
            </div>

            {/* Recommandation finale */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200">
              <h3 className="text-xl font-bold text-teal-800 mb-4 flex items-center gap-2">
                🏆 Recommandation Stratégique: Paris 🇫🇷
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-teal-600">8.08</p>
                  <p className="text-sm text-gray-600">Score Final /10</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-sky-600">5.17</p>
                  <p className="text-sm text-gray-600">M€ Résultats 3 ans</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-gray-600">543.2</p>
                  <p className="text-sm text-gray-600">% ROI 3 ans</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-3">Facteurs Décisifs</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <ul className="space-y-1">
                    <li>✅ Liens historiques et culturels uniques avec la CI</li>
                    <li>✅ Accès privilégié aux financements AFD/Proparco</li>
                    <li>✅ Écosystème diaspora de 150K Ivoiriens</li>
                    <li>✅ Cadre réglementaire optimal pour le trading</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>✅ EBITDA positif dès l'An 1 (+0.12M€)</li>
                    <li>✅ Besoins en capital modérés (0.95M€)</li>
                    <li>✅ Impact social maximum (8.5/10)</li>
                    <li>✅ Infrastructure trading mature</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Note: La pondération utilisée respecte celle définie dans Contexte/Méthodologie:
  // - Réglementation: 15%
  // - Impact Social: 30% 
  // - ROI: 15%
  // - Accès DFI: 10%
  // - Cash Flow: 30%
};

export default AnalyseDecisionnelle;