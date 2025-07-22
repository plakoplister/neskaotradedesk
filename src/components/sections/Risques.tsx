import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';
import { AlertTriangle, TrendingUp, Shield, AlertCircle, DollarSign, Users, Globe, Package, Zap, Award } from 'lucide-react';

interface RiskData {
  id: number;
  categorie: string;
  description: string;
  impact: number; // 1-5
  probabilite: number; // 1-5
  criticite: number; // impact * probabilite
  icon: any;
  mitigation: string[];
  consequences: string;
  couleur: string;
}

interface ImplementationPhase {
  phase: string;
  nom: string;
  duree: string;
  budget: string;
  description?: string[];
}

const Risques: React.FC = () => {
  const [sortBy, setSortBy] = useState('criticite');

  // Données des risques basées sur risk-analysis-table.tsx
  const risquesData: RiskData[] = [
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

  const phasesImplementation: ImplementationPhase[] = [
    {
      phase: "Phase 1",
      nom: "Foundation (M1-M6)",
      duree: "6 mois",
      budget: "2.5M€",
      description: [
        "Incorporation société + licences",
        "Recrutement équipe core (5 personnes)",
        "Mise en place systèmes IT/Risk",
        "Premiers contrats forward (500T)"
      ]
    },
    {
      phase: "Phase 2", 
      nom: "Scale-up (M7-M18)",
      duree: "12 mois",
      budget: "8.5M€",
      description: [
        "Montée en charge équipe (15 personnes)",
        "Développement réseau clients EU",
        "Introduction futures ICE (1000T)", 
        "Certification durable complète"
      ]
    },
    {
      phase: "Phase 3",
      nom: "Expansion (M19-M36)", 
      duree: "18 mois",
      budget: "15M€",
      description: [
        "Équipe complète (25+ personnes)",
        "Diversification produits dérivés",
        "Expansion géographique ciblée",
        "Leadership ESG secteur"
      ]
    }
  ];

  // Fonction de tri
  const sortedRisques = [...risquesData].sort((a, b) => {
    if (sortBy === 'criticite') return b.criticite - a.criticite;
    if (sortBy === 'impact') return b.impact - a.impact;
    if (sortBy === 'probabilite') return b.probabilite - a.probabilite;
    return 0;
  });

  // Fonction pour obtenir la couleur du badge
  const getBadgeClass = (value: number, type: string) => {
    if (type === 'criticite') {
      if (value >= 20) return 'bg-rose-500 text-white';
      if (value >= 12) return 'bg-gray-500 text-white';
      return 'bg-gray-400 text-white';
    }
    if (value >= 4) return 'bg-rose-500 text-white';
    if (value >= 3) return 'bg-gray-500 text-white';
    return 'bg-gray-400 text-white';
  };

  // Statistiques
  const stats = {
    critique: risquesData.filter(r => r.criticite >= 20).length,
    eleve: risquesData.filter(r => r.criticite >= 12 && r.criticite < 20).length,
    moyen: risquesData.filter(r => r.criticite >= 8 && r.criticite < 12).length,
    faible: risquesData.filter(r => r.criticite < 8).length
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec statistiques */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <AlertTriangle className="text-gray-500" />
            Matrice des Risques - Bureau Trading Cacao
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-rose-50/30 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-rose-600">{stats.critique}</p>
              <p className="text-sm text-rose-700">Risques Critiques</p>
              <p className="text-xs text-gray-600">(Score ≥ 20)</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-gray-600">{stats.eleve}</p>
              <p className="text-sm text-gray-700">Risques Élevés</p>
              <p className="text-xs text-gray-600">(Score 12-19)</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-gray-600">{stats.moyen}</p>
              <p className="text-sm text-gray-700">Risques Moyens</p>
              <p className="text-xs text-gray-600">(Score 8-11)</p>
            </div>
            <div className="bg-teal-50/30 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-teal-600">{stats.faible}</p>
              <p className="text-sm text-teal-700">Risques Faibles</p>
              <p className="text-xs text-gray-600">(Score &lt; 8)</p>
            </div>
          </div>

          {/* Options de tri */}
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setSortBy('criticite')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                sortBy === 'criticite' 
                  ? 'bg-sky-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Trier par Criticité
            </button>
            <button
              onClick={() => setSortBy('impact')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                sortBy === 'impact' 
                  ? 'bg-sky-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Trier par Impact
            </button>
            <button
              onClick={() => setSortBy('probabilite')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                sortBy === 'probabilite' 
                  ? 'bg-sky-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Trier par Probabilité
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Tableau des risques détaillé */}
      <Card>
        <CardHeader>
          <CardTitle>Analyse Détaillée des Risques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Rang</th>
                  <th className="border p-3 text-left">Catégorie</th>
                  <th className="border p-3 text-left">Description</th>
                  <th className="border p-3 text-center">Impact</th>
                  <th className="border p-3 text-center">Probabilité</th>
                  <th className="border p-3 text-center">Criticité</th>
                  <th className="border p-3 text-left">Stratégies de Mitigation</th>
                  <th className="border p-3 text-left">Conséquences</th>
                </tr>
              </thead>
              <tbody>
                {sortedRisques.map((risque, index) => {
                  const Icon = risque.icon;
                  return (
                    <tr 
                      key={risque.id} 
                      className={`border-t hover:bg-gray-50 transition-colors ${
                        risque.criticite >= 20 ? 'bg-rose-50/30' :
                        risque.criticite >= 12 ? 'bg-gray-100' :
                        risque.criticite >= 8 ? 'bg-gray-100' :
                        'bg-white'
                      }`}
                    >
                      <td className="border p-3 font-bold text-center">
                        {index + 1}
                      </td>
                      <td className="border p-3">
                        <div className="flex items-center gap-2">
                          <Icon className="w-5 h-5 text-gray-600" />
                          <span className="font-semibold">{risque.categorie}</span>
                        </div>
                      </td>
                      <td className="border p-3 text-sm">
                        {risque.description}
                      </td>
                      <td className="border p-3 text-center">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${getBadgeClass(risque.impact, 'impact')}`}>
                          {risque.impact}/5
                        </span>
                      </td>
                      <td className="border p-3 text-center">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${getBadgeClass(risque.probabilite, 'probabilite')}`}>
                          {risque.probabilite}/5
                        </span>
                      </td>
                      <td className="border p-3 text-center">
                        <span className={`inline-block px-3 py-1 rounded text-lg font-bold ${getBadgeClass(risque.criticite, 'criticite')}`}>
                          {risque.criticite}
                        </span>
                      </td>
                      <td className="border p-3">
                        <ul className="text-sm space-y-1">
                          {risque.mitigation.map((strat, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="text-teal-600">•</span>
                              <span>{strat}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="border p-3 text-sm text-rose-700 font-medium">
                        {risque.consequences}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Matrice visuelle */}
      <Card>
        <CardHeader>
          <CardTitle>Matrice Impact/Probabilité</CardTitle>
        </CardHeader>
        <CardContent>
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
                  const risquesCase = risquesData.filter(
                    r => r.impact === impact && r.probabilite === prob
                  );
                  
                  return (
                    <div
                      key={`${impact}-${prob}`}
                      className={`p-2 border text-center relative min-h-[60px] ${
                        score >= 20 ? 'bg-red-200' :
                        score >= 12 ? 'bg-gray-200' :
                        score >= 8 ? 'bg-gray-200' :
                        'bg-teal-50/30'
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
        </CardContent>
      </Card>

      {/* Plan d'action prioritaire */}
      <Card className="border-2 border-red-500">
        <CardHeader className="bg-rose-50/30">
          <CardTitle className="text-xl text-red-800 flex items-center gap-2">
            <AlertCircle />
            Actions Prioritaires
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="p-4 bg-red-100 rounded-lg">
            <h4 className="font-bold text-red-900 mb-2">🔴 Priorité 1 - Volatilité Marché (Criticité: 25)</h4>
            <p className="text-sm">
              → Définir la politique de hedging avec limites automatiques dès la conception<br/>
              → Planifier le recrutement d'un Risk Manager certifié avec expérience cacao<br/>
              → Concevoir les procédures de gestion de crise avec seuils d'alerte
            </p>
          </div>
          
          <div className="p-4 bg-red-100 rounded-lg">
            <h4 className="font-bold text-red-900 mb-2">🔴 Priorité 2 - Liquidité/Financement (Criticité: 20)</h4>
            <p className="text-sm">
              → Sécuriser 150% du capital nécessaire dans la structure de financement<br/>
              → Négocier les lignes de crédit confirmées multi-banques en amont<br/>
              → Prévoir la création d'un comité liquidité avec reporting quotidien
            </p>
          </div>
          
          <div className="p-4 bg-gray-100 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-2">🟠 Priorité 3 - Expertise Trading (Criticité: 12)</h4>
            <p className="text-sm">
              → Identifier et préqualifier l'équipe senior avant l'ouverture du bureau<br/>
              → Structurer un programme de formation intensive de 3 mois<br/>
              → Établir un partenariat conseil avec une trading house établie
            </p>
          </div>
        </CardContent>
      </Card>


      {/* KPIs et suivi */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>KPIs de Suivi des Risques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-rose-50/30 p-3 rounded">
                <h4 className="font-semibold text-red-800">Risques Critiques</h4>
                <ul className="text-sm text-rose-700 space-y-1 mt-2">
                  <li>• VaR 95% quotidien (seuil: 5% capital)</li>
                  <li>• Ratio liquidité (minimum 150%)</li>
                  <li>• % hedging positions (minimum 80%)</li>
                  <li>• Nb violations limites trading</li>
                </ul>
              </div>

              <div className="bg-gray-100 p-3 rounded">
                <h4 className="font-semibold text-gray-800">Risques Élevés</h4>
                <ul className="text-sm text-gray-700 space-y-1 mt-2">
                  <li>• Incidents compliance (cible: 0)</li>
                  <li>• Erreurs humaines (seuil: 2/mois)</li>
                  <li>• Défauts contreparties (suivi mensuel)</li>
                  <li>• Formation équipe (40h/an minimum)</li>
                </ul>
              </div>

              <div className="bg-gray-100 p-3 rounded">
                <h4 className="font-semibold text-gray-800">Risques Moyens</h4>
                <ul className="text-sm text-gray-700 space-y-1 mt-2">
                  <li>• Incidents cyber (tests trimestriels)</li>
                  <li>• Retards logistiques (suivi SLA)</li>
                  <li>• Exposition FX nette (seuil: 10%)</li>
                  <li>• Veille géopolitique (hebdomadaire)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gouvernance des Risques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Comité de Risques</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Fréquence:</strong> Hebdomadaire</li>
                  <li>• <strong>Participants:</strong> CEO, CFO, Risk Manager, Head Trading</li>
                  <li>• <strong>Reporting:</strong> Dashboard temps réel</li>
                  <li>• <strong>Escalade:</strong> Board mensuel</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Audit & Contrôle</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Audit interne:</strong> Trimestriel</li>
                  <li>• <strong>Audit externe:</strong> Annuel (Big4)</li>
                  <li>• <strong>Tests stress:</strong> Mensuels</li>
                  <li>• <strong>Certification:</strong> ISO 31000</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Plans de Continuité</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>BCP:</strong> RTO 4h, RPO 1h</li>
                  <li>• <strong>Site backup:</strong> Opérationnel 24h</li>
                  <li>• <strong>Tests:</strong> Semestriels</li>
                  <li>• <strong>Communication:</strong> Procédures crise</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default Risques;