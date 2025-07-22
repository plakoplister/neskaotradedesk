import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const ImpactSocial: React.FC = () => {
  const [activeTab, setActiveTab] = useState('criteres');

  // Données extraites de impactsocial-updateddatas.txt
  const impactData = [
    {
      ville: 'Maroc CFC',
      score: 8.6,
      ranking: 1,
      region: 'Afrique/MO',
      statut: 'EXCELLENT',
      proximiteCI: 9,
      ecosystemeESG: 8,
      financementsImpact: 8,
      emploiFormation: 10,
      transparenceFiscale: 8,
      influencePolitique: 8,
      partenariats: 9,
      pointsForts: 'Coopération Sud-Sud, formation jeunes',
      pointsFaibles: 'Contrôle changes'
    },
    {
      ville: 'Paris',
      score: 8.5,
      ranking: 2,
      region: 'Europe',
      statut: 'EXCELLENT',
      proximiteCI: 9,
      ecosystemeESG: 8,
      financementsImpact: 9,
      emploiFormation: 9,
      transparenceFiscale: 8,
      influencePolitique: 8,
      partenariats: 8,
      pointsForts: 'Liens historiques, écosystème complet',
      pointsFaibles: 'Perception néo-coloniale'
    },
    {
      ville: 'Genève',
      score: 7.9,
      ranking: 3,
      region: 'Europe',
      statut: 'EXCELLENT',
      proximiteCI: 7,
      ecosystemeESG: 9,
      financementsImpact: 9,
      emploiFormation: 7,
      transparenceFiscale: 7,
      influencePolitique: 9,
      partenariats: 8,
      pointsForts: 'Légitimité internationale, DFI',
      pointsFaibles: 'Coût, élitisme'
    },
    {
      ville: 'Amsterdam',
      score: 7.8,
      ranking: 4,
      region: 'Europe',
      statut: 'BON',
      proximiteCI: 6,
      ecosystemeESG: 9,
      financementsImpact: 8,
      emploiFormation: 8,
      transparenceFiscale: 8,
      influencePolitique: 7,
      partenariats: 9,
      pointsForts: 'Innovation ESG, pragmatisme',
      pointsFaibles: 'Langue, distance culturelle'
    },
    {
      ville: 'Londres',
      score: 7.6,
      ranking: 5,
      region: 'Europe',
      statut: 'BON',
      proximiteCI: 6,
      ecosystemeESG: 9,
      financementsImpact: 8,
      emploiFormation: 6,
      transparenceFiscale: 9,
      influencePolitique: 8,
      partenariats: 8,
      pointsForts: 'Standards, transparence',
      pointsFaibles: 'Post-Brexit, coûts'
    },
    {
      ville: 'Maurice',
      score: 7.5,
      ranking: 6,
      region: 'Afrique/MO',
      statut: 'BON',
      proximiteCI: 8,
      ecosystemeESG: 7,
      financementsImpact: 8,
      emploiFormation: 9,
      transparenceFiscale: 6,
      influencePolitique: 7,
      partenariats: 7,
      pointsForts: 'Solidarité africaine, hub régional',
      pointsFaibles: 'Image offshore'
    },
    {
      ville: 'Hambourg',
      score: 6.8,
      ranking: 7,
      region: 'Europe',
      statut: 'MOYEN',
      proximiteCI: 5,
      ecosystemeESG: 7,
      financementsImpact: 7,
      emploiFormation: 6,
      transparenceFiscale: 9,
      influencePolitique: 7,
      partenariats: 7,
      pointsForts: 'Rigueur, port expertise',
      pointsFaibles: 'Distance culturelle'
    },
    {
      ville: 'Tel Aviv',
      score: 6.5,
      ranking: 8,
      region: 'Moyen-Orient',
      statut: 'MOYEN',
      proximiteCI: 5,
      ecosystemeESG: 7,
      financementsImpact: 7,
      emploiFormation: 6,
      transparenceFiscale: 8,
      influencePolitique: 5,
      partenariats: 8,
      pointsForts: 'Innovation agritech',
      pointsFaibles: 'Géopolitique sensible'
    },
    {
      ville: 'Chypre',
      score: 6.3,
      ranking: 9,
      region: 'Europe',
      statut: 'MOYEN',
      proximiteCI: 5,
      ecosystemeESG: 7,
      financementsImpact: 8,
      emploiFormation: 4,
      transparenceFiscale: 9,
      influencePolitique: 5,
      partenariats: 6,
      pointsForts: 'Transparence fiscale, Accès financier, Standards ESG européens',
      pointsFaibles: 'Proximité CI inexistante, Formation très limitée, influence politique nulle'
    },
    {
      ville: 'Singapour',
      score: 6.1,
      ranking: 10,
      region: 'Asie',
      statut: 'MOYEN',
      proximiteCI: 4,
      ecosystemeESG: 7,
      financementsImpact: 7,
      emploiFormation: 5,
      transparenceFiscale: 8,
      influencePolitique: 6,
      partenariats: 7,
      pointsForts: 'Excellence standards',
      pointsFaibles: 'Distance prohibitive'
    },
    {
      ville: 'Dubai',
      score: 5.1,
      ranking: 11,
      region: 'Moyen-Orient',
      statut: 'FAIBLE',
      proximiteCI: 5,
      ecosystemeESG: 5,
      financementsImpact: 6,
      emploiFormation: 5,
      transparenceFiscale: 4,
      influencePolitique: 6,
      partenariats: 5,
      pointsForts: 'Hub commercial',
      pointsFaibles: 'Manque dimension sociale'
    },
    {
      ville: 'Andorre',
      score: 3.4,
      ranking: 12,
      region: 'Europe',
      statut: 'INADAPTÉ',
      proximiteCI: 4,
      ecosystemeESG: 3,
      financementsImpact: 3,
      emploiFormation: 3,
      transparenceFiscale: 5,
      influencePolitique: 2,
      partenariats: 3,
      pointsForts: 'Aucun',
      pointsFaibles: 'Isolement total'
    }
  ];

  // Méthodologie et critères de scoring
  const criteresMethodologie = [
    {
      nom: 'Proximité Côte d\'Ivoire',
      poids: 20,
      description: 'Liens historiques, diaspora, accessibilité, langue',
      color: '#8b5cf6'
    },
    {
      nom: 'Écosystème ESG',
      poids: 15,
      description: 'ONGs, certifications, entreprises sociales',
      color: '#3b82f6'
    },
    {
      nom: 'Accès Financements Impact',
      poids: 15,
      description: 'DFI, fonds impact, programmes publics',
      color: '#10b981'
    },
    {
      nom: 'Emploi/Formation Jeunes CI',
      poids: 15,
      description: 'Stages, échanges universitaires, formation',
      color: '#f59e0b'
    },
    {
      nom: 'Transparence Fiscale',
      poids: 15,
      description: 'Éthique fiscale, échange info, anti-corruption',
      color: '#ef4444'
    },
    {
      nom: 'Influence Politique',
      poids: 10,
      description: 'Plaidoyer, réseaux, médias, forums',
      color: '#6366f1'
    },
    {
      nom: 'Partenariats Locaux',
      poids: 10,
      description: 'Universités, coopératives, innovation',
      color: '#14b8a6'
    }
  ];

  // Top 5 pour SWOT
  const top5Data = impactData.slice(0, 5);

  // Données pour radar chart
  const radarData = [
    {
      critere: 'Proximité CI',
      'Maroc CFC': 9,
      'Paris': 9,
      'Genève': 7,
      'Amsterdam': 6,
      'Londres': 6
    },
    {
      critere: 'Écosystème ESG',
      'Maroc CFC': 8,
      'Paris': 8,
      'Genève': 9,
      'Amsterdam': 9,
      'Londres': 9
    },
    {
      critere: 'Financements',
      'Maroc CFC': 8,
      'Paris': 9,
      'Genève': 9,
      'Amsterdam': 8,
      'Londres': 8
    },
    {
      critere: 'Emploi/Formation',
      'Maroc CFC': 10,
      'Paris': 9,
      'Genève': 7,
      'Amsterdam': 8,
      'Londres': 6
    },
    {
      critere: 'Transparence',
      'Maroc CFC': 8,
      'Paris': 8,
      'Genève': 7,
      'Amsterdam': 8,
      'Londres': 9
    },
    {
      critere: 'Influence',
      'Maroc CFC': 8,
      'Paris': 8,
      'Genève': 9,
      'Amsterdam': 7,
      'Londres': 8
    },
    {
      critere: 'Partenariats',
      'Maroc CFC': 9,
      'Paris': 8,
      'Genève': 8,
      'Amsterdam': 9,
      'Londres': 8
    }
  ];

  // Fonction pour obtenir la couleur par statut
  const getColorByStatus = (statut: string) => {
    switch(statut) {
      case 'EXCELLENT': return '#10b981';
      case 'BON': return '#3b82f6';
      case 'MOYEN': return '#f59e0b';
      case 'FAIBLE': return '#ef4444';
      case 'INADAPTÉ': return '#6b7280';
      default: return '#6b7280';
    }
  };

  // Vue Critères Détaillés
  const renderCriteresDetailles = () => (
    <div className="space-y-6">
      {/* Méthodologie */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Méthodologie de Scoring Impact Social</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-sky-50/30 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-sky-800 mb-2">Approche</h4>
            <p className="text-sm text-sky-700">
              Score sur 10 pour chaque critère, puis moyenne pondérée selon les poids définis.
              Évaluation basée sur l'impact réel sur le développement de la Côte d'Ivoire.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Critères et Pondération</h4>
              {criteresMethodologie.map((critere, index) => (
                <div key={index} className="border-l-4 pl-4" style={{borderColor: critere.color}}>
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium">{critere.nom}</h5>
                    <span className="font-bold" style={{color: critere.color}}>{critere.poids}%</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{critere.description}</p>
                </div>
              ))}
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Distribution des Poids</h4>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={criteresMethodologie.map(c => ({name: c.nom, value: c.poids, color: c.color}))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {criteresMethodologie.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tableau complet des scores */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Scores Détaillés par Critère</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Ville</th>
                  <th className="p-2 text-center">Proximité CI</th>
                  <th className="p-2 text-center">ESG</th>
                  <th className="p-2 text-center">Financements</th>
                  <th className="p-2 text-center">Emploi/Formation</th>
                  <th className="p-2 text-center">Transparence</th>
                  <th className="p-2 text-center">Influence</th>
                  <th className="p-2 text-center">Partenariats</th>
                  <th className="p-2 text-center font-bold">Score Total</th>
                </tr>
                <tr className="bg-gray-50 text-xs">
                  <th className="p-1"></th>
                  <th className="p-1 text-center">(20%)</th>
                  <th className="p-1 text-center">(15%)</th>
                  <th className="p-1 text-center">(15%)</th>
                  <th className="p-1 text-center">(15%)</th>
                  <th className="p-1 text-center">(15%)</th>
                  <th className="p-1 text-center">(10%)</th>
                  <th className="p-1 text-center">(10%)</th>
                  <th className="p-1 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {impactData.map((ville, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="p-2 font-medium">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full`} style={{backgroundColor: getColorByStatus(ville.statut)}}></span>
                        {ville.ville}
                      </div>
                    </td>
                    <td className="p-2 text-center">{ville.proximiteCI}/10</td>
                    <td className="p-2 text-center">{ville.ecosystemeESG}/10</td>
                    <td className="p-2 text-center">{ville.financementsImpact}/10</td>
                    <td className="p-2 text-center">{ville.emploiFormation}/10</td>
                    <td className="p-2 text-center">{ville.transparenceFiscale}/10</td>
                    <td className="p-2 text-center">{ville.influencePolitique}/10</td>
                    <td className="p-2 text-center">{ville.partenariats}/10</td>
                    <td className="p-2 text-center font-bold text-lg" style={{color: getColorByStatus(ville.statut)}}>
                      {ville.score.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

    </div>
  );

  // Vue Top 5 & Recommandations
  const renderTop5Recommandations = () => (
    <div className="space-y-6">
      {/* Cards du Top 5 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {top5Data.map((ville, index) => {
          const colors = ['emerald', 'blue', 'purple', 'orange', 'red'];
          const color = colors[index];
          
          return (
            <Card key={index} className={`bg-gradient-to-br from-${color}-50 to-${color}-100`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>#{ville.ranking}</span>
                  <span className="text-2xl">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅'}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-bold text-lg mb-2">{ville.ville}</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-gray-600">Score Impact</p>
                    <p className="text-xl font-bold" style={{color: getColorByStatus(ville.statut)}}>
                      {ville.score}/10
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Statut</p>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      ville.statut === 'EXCELLENT' ? 'bg-teal-50/30 text-teal-800' :
                      ville.statut === 'BON' ? 'bg-sky-50/30 text-sky-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {ville.statut}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* SWOT Analysis pour chaque ville du Top 5 */}
      {top5Data.map((ville, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-3">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold`} 
                    style={{backgroundColor: getColorByStatus(ville.statut)}}>
                #{ville.ranking}
              </span>
              Analyse SWOT - {ville.ville}
              <span className="text-lg font-normal" style={{color: getColorByStatus(ville.statut)}}>
                ({ville.score}/10)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths & Opportunities */}
              <div className="space-y-4">
                <div className="bg-teal-50/30 p-4 rounded-lg">
                  <h4 className="font-bold text-teal-800 mb-3 flex items-center gap-2">
                    <span className="text-teal-600">💪</span> Points Forts
                  </h4>
                  <p className="text-sm text-teal-700">{ville.pointsForts}</p>
                  
                  {/* Détails spécifiques par ville */}
                  <div className="mt-3 space-y-1 text-xs text-teal-600">
                    {ville.ville === 'Maroc CFC' && (
                      <>
                        <p>• Leadership africain et médiation régionale</p>
                        <p>• Bourses étudiants CI excellentes (10/10)</p>
                        <p>• Francophone avec coopération Sud-Sud naturelle</p>
                        <p>• Expertise phosphates transférable</p>
                      </>
                    )}
                    {ville.ville === 'Paris' && (
                      <>
                        <p>• 150K diaspora ivoirienne en France</p>
                        <p>• Vols directs quotidiens Abidjan-Paris</p>
                        <p>• AFD/Proparco siège social</p>
                        <p>• Campus France très actif en CI</p>
                      </>
                    )}
                    {ville.ville === 'Genève' && (
                      <>
                        <p>• Siège nombreux DFI et impact funds</p>
                        <p>• UN/ILO/WTO influence globale</p>
                        <p>• FLO International et Better Gold</p>
                        <p>• IHEID formation développement</p>
                      </>
                    )}
                    {ville.ville === 'Amsterdam' && (
                      <>
                        <p>• Tony's Chocolonely et Fairphone leaders</p>
                        <p>• WUR top agriculture mondial</p>
                        <p>• Mouvement B-Corp dynamique</p>
                        <p>• Coopératives innovation</p>
                      </>
                    )}
                    {ville.ville === 'Londres' && (
                      <>
                        <p>• Fairtrade UK leadership mondial</p>
                        <p>• Divine Chocolate modèle propriété</p>
                        <p>• Transparence fiscale leader</p>
                        <p>• Soft power et médias globaux</p>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="bg-sky-50/30 p-4 rounded-lg">
                  <h4 className="font-bold text-sky-800 mb-3 flex items-center gap-2">
                    <span className="text-sky-600">🚀</span> Opportunités
                  </h4>
                  <div className="space-y-1 text-xs text-sky-600">
                    {ville.ville === 'Maroc CFC' && (
                      <>
                        <p>• Position pont Afrique-Europe unique</p>
                        <p>• Modèle OCP applicable au cacao</p>
                        <p>• Croissance ESG émergente forte</p>
                      </>
                    )}
                    {ville.ville === 'Paris' && (
                      <>
                        <p>• Présidence COP influence climat</p>
                        <p>• Station F innovation sociale</p>
                        <p>• Ministère Développement lobbying UE</p>
                      </>
                    )}
                    {ville.ville === 'Genève' && (
                      <>
                        <p>• Geneva Impact Hub expansion</p>
                        <p>• Philanthropie privée croissante</p>
                        <p>• Standards impact internationaux</p>
                      </>
                    )}
                    {ville.ville === 'Amsterdam' && (
                      <>
                        <p>• Port Rotterdam influence supply chain</p>
                        <p>• Programmes Erasmus+ étendus</p>
                        <p>• Innovation fintech sociale</p>
                      </>
                    )}
                    {ville.ville === 'Londres' && (
                      <>
                        <p>• Post-Brexit repositionnement impact</p>
                        <p>• Tech City expansion sociale</p>
                        <p>• Commonwealth liens renforcés</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Weaknesses & Threats */}
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="text-gray-600">⚠️</span> Points Faibles
                  </h4>
                  <p className="text-sm text-gray-700">{ville.pointsFaibles}</p>
                  
                  <div className="mt-3 space-y-1 text-xs text-gray-600">
                    {ville.ville === 'Maroc CFC' && (
                      <>
                        <p>• Contrôle des changes complexe</p>
                        <p>• Accès limité aux marchés futures</p>
                        <p>• Infrastructure IT à développer</p>
                      </>
                    )}
                    {ville.ville === 'Paris' && (
                      <>
                        <p>• Perception néo-coloniale possible</p>
                        <p>• Coûts opérationnels élevés</p>
                        <p>• Bureaucratie administrative</p>
                      </>
                    )}
                    {ville.ville === 'Genève' && (
                      <>
                        <p>• Coûts de vie prohibitifs</p>
                        <p>• Élitisme et accessibilité limitée</p>
                        <p>• Barriers permis travail jeunes</p>
                      </>
                    )}
                    {ville.ville === 'Amsterdam' && (
                      <>
                        <p>• Barrière linguistique française</p>
                        <p>• Distance culturelle Afrique</p>
                        <p>• Fiscalité corporate élevée</p>
                      </>
                    )}
                    {ville.ville === 'Londres' && (
                      <>
                        <p>• Complexités visa post-Brexit</p>
                        <p>• Coûts prohibitifs personnel</p>
                        <p>• Incertitudes réglementaires</p>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="bg-rose-50/30 p-4 rounded-lg">
                  <h4 className="font-bold text-rose-800 mb-3 flex items-center gap-2">
                    <span className="text-rose-600">🚨</span> Menaces
                  </h4>
                  <div className="space-y-1 text-xs text-rose-600">
                    {ville.ville === 'Maroc CFC' && (
                      <>
                        <p>• Instabilité politique régionale</p>
                        <p>• Dépendance secteur primaire</p>
                        <p>• Concurrence autres places africaines</p>
                      </>
                    )}
                    {ville.ville === 'Paris' && (
                      <>
                        <p>• Critique anti-françafrique</p>
                        <p>• Tensions diplomatiques possibles</p>
                        <p>• Concurrence Londres/Amsterdam</p>
                      </>
                    )}
                    {ville.ville === 'Genève' && (
                      <>
                        <p>• Pression transparence fiscale</p>
                        <p>• Concurrence Singapour/Dubai</p>
                        <p>• Évolution réglementation suisse</p>
                      </>
                    )}
                    {ville.ville === 'Amsterdam' && (
                      <>
                        <p>• Brexit impact indirect</p>
                        <p>• Pression taxation multinationales</p>
                        <p>• Saturation marché ESG</p>
                      </>
                    )}
                    {ville.ville === 'Londres' && (
                      <>
                        <p>• Isolement post-Brexit</p>
                        <p>• Fuite talents vers UE</p>
                        <p>• Coûts croissants conformité</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Recommandations stratégiques */}
      <Card className="bg-gradient-to-br from-indigo-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-xl">Recommandations Stratégiques Impact Social</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-indigo-800 mb-3">Stratégie Impact Optimale :</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-teal-50/30 p-3 rounded">
                  <h5 className="font-semibold text-teal-800">Court terme (An 1)</h5>
                  <p className="text-sm text-teal-700 mt-1">
                    <strong>Maroc CFC</strong> : Lancer coopération Sud-Sud avec formation 20 jeunes CI
                  </p>
                </div>
                <div className="bg-sky-50/30 p-3 rounded">
                  <h5 className="font-semibold text-sky-800">Moyen terme (An 2-3)</h5>
                  <p className="text-sm text-sky-700 mt-1">
                    <strong>Paris</strong> : Établir hub européen avec programmes diaspora
                  </p>
                </div>
                <div className="bg-gray-100 p-3 rounded">
                  <h5 className="font-semibold text-purple-800">Long terme (An 3+)</h5>
                  <p className="text-sm text-purple-700 mt-1">
                    <strong>Genève</strong> : Légitimité internationale et standards globaux
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-sky-50/30 p-4 rounded">
                <p className="text-xs text-sky-600">Bourses formation</p>
                <p className="text-2xl font-bold text-sky-800">10</p>
                <p className="text-xs text-sky-600">en 3 ans en trading</p>
              </div>
              <div className="bg-gray-100 p-4 rounded">
                <p className="text-xs text-purple-600">Impact social score</p>
                <p className="text-2xl font-bold text-purple-800">8.0+</p>
                <p className="text-xs text-purple-600">objectif global</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Onglets */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('criteres')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'criteres'
                ? 'border-sky-500 text-sky-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Critères Détaillés
          </button>
          <button
            onClick={() => setActiveTab('top5')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'top5'
                ? 'border-sky-500 text-sky-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Top 5 & Recommandations
          </button>
        </nav>
      </div>

      {/* Contenu de l'onglet actif */}
      {activeTab === 'criteres' && renderCriteresDetailles()}
      {activeTab === 'top5' && renderTop5Recommandations()}
    </div>
  );
};

export default ImpactSocial;