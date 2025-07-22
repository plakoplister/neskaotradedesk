import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const SGA: React.FC = () => {
  const [activeTab, setActiveTab] = useState('resources');

  // Données complètes des 12 localités (incluant Chypre, excluant Genève LCM)
  const villesData = [
    { nom: "Maroc CFC", an1: 687.870, an2: 716.538, an3: 971.143, total: 2375.551, rank: 1, zone: "Zone franche" },
    { nom: "Maurice", an1: 795.190, an2: 820.828, an3: 1086.163, total: 2702.181, rank: 2, zone: "Offshore" },
    { nom: "Andorre", an1: 873.970, an2: 858.218, an3: 1142.003, total: 2874.191, rank: 3, zone: "Zone franche" },
    { nom: "Paris", an1: 1290.093, an2: 1218.340, an3: 1478.138, total: 3986.571, rank: 4, zone: "Europe" },
    { nom: "Hambourg", an1: 1296.200, an2: 1252.598, an3: 1637.593, total: 4186.391, rank: 5, zone: "Europe" },
    { nom: "Chypre", an1: 1384.000, an2: 1330.000, an3: 1678.000, total: 4392.000, rank: 6, zone: "Europe" },
    { nom: "Amsterdam", an1: 1338.200, an2: 1318.168, an3: 1697.253, total: 4353.621, rank: 7, zone: "Europe" },
    { nom: "Dubai", an1: 1407.720, an2: 1330.658, an3: 1713.413, total: 4451.791, rank: 8, zone: "Zone franche" },
    { nom: "Tel Aviv", an1: 1451.390, an2: 1382.478, an3: 1816.743, total: 4650.611, rank: 9, zone: "Moyen-Orient" },
    { nom: "Genève", an1: 1631.945, an2: 1501.068, an3: 1928.963, total: 5061.976, rank: 10, zone: "Europe" },
    { nom: "Singapour", an1: 1754.470, an2: 1675.618, an3: 2142.973, total: 5573.061, rank: 11, zone: "Asie" },
    { nom: "Londres", an1: 1860.220, an2: 1736.338, an3: 2217.333, total: 5813.891, rank: 12, zone: "Europe" }
  ];

  // Données ressources humaines
  const ressourcesData = {
    paris: {
      postes: [
        { titre: "Directeur Général", an1: 1, an2: 1, an3: 1, salaire: 280, description: "Direction stratégique, trading senior et relations clés avec partenaires" },
        { titre: "Responsable Trading", an1: 1, an2: 1, an3: 1, salaire: 150, description: "Hedging sur ICE Futures et support commercial équipes" },
        { titre: "Trader Junior", an1: 0, an2: 0.5, an3: 1, salaire: 150, description: "Support trading et développement nouveaux marchés" },
        { titre: "Risk/Compliance", an1: 1, an2: 1, an3: 1, salaire: 120, description: "Gestion risques (50%) et comptabilité/finance (50%)" },
        { titre: "Assistant Admin", an1: 1, an2: 1, an3: 1, salaire: 80, description: "Administration, back office et support général" },
        { titre: "Stagiaire", an1: 0, an2: 0, an3: 0.5, salaire: 60, description: "Support risk management et formation" }
      ],
      totalFTE: { an1: 4, an2: 4.5, an3: 5.5 }
    },
    geneve: {
      postes: [
        { titre: "Managing Director", an1: 1, an2: 1, an3: 1, salaire: 350, description: "Direction générale et développement stratégique" },
        { titre: "Head Trader", an1: 1, an2: 1, an3: 1, salaire: 195, description: "Trading senior et gestion portefeuille" },
        { titre: "Junior Trader", an1: 0, an2: 0.5, an3: 1, salaire: 234, description: "Exécution trades et analyse marchés" },
        { titre: "Risk Manager", an1: 1, an2: 1, an3: 1.5, salaire: 156, description: "Gestion risques et reporting réglementaire" },
        { titre: "Finance/Admin", an1: 1, an2: 1, an3: 1, salaire: 104, description: "Comptabilité, finance et administration" }
      ],
      totalFTE: { an1: 4, an2: 4.5, an3: 5.5 }
    },
    amsterdam: {
      postes: [
        { titre: "Directeur", an1: 1, an2: 1, an3: 1, salaire: 308, description: "Direction et relations écosystème cacao NL" },
        { titre: "Trader/Analyst", an1: 1, an2: 1, an3: 1, salaire: 165, description: "Trading et analyse fondamentaux marché" },
        { titre: "Traders Junior", an1: 0, an2: 0.5, an3: 1, salaire: 198, description: "Support trading et développement" },
        { titre: "Risk/Compliance/Finance", an1: 1, an2: 1, an3: 1.5, salaire: 132, description: "Fonctions support intégrées" },
        { titre: "Assistant Admin", an1: 1, an2: 1, an3: 1, salaire: 88, description: "Support administratif et logistique" }
      ],
      totalFTE: { an1: 4, an2: 4.5, an3: 5.5 }
    },
    chypre: {
      postes: [
        { titre: "Managing Director", an1: 1, an2: 1, an3: 1, salaire: 300, description: "Direction et développement marché méditerranéen" },
        { titre: "Senior Trader", an1: 1, an2: 1, an3: 1, salaire: 170, description: "Trading et gestion positions Europe de l'Est" },
        { titre: "Junior Trader", an1: 0, an2: 0.5, an3: 1, salaire: 200, description: "Support trading et analyse" },
        { titre: "Risk/Compliance", an1: 1, an2: 1, an3: 1.5, salaire: 140, description: "Conformité UE et gestion risques" },
        { titre: "Finance/Admin", an1: 1, an2: 1, an3: 1, salaire: 90, description: "Administration et comptabilité" }
      ],
      totalFTE: { an1: 4, an2: 4.5, an3: 5.5 }
    }
  };

  // Données bureaux
  const bureauxData = {
    evolution: {
      an1: 115,
      an2: 130,
      an3: 150
    },
    localites: [
      { 
        ville: "Paris", 
        quartier: "La Défense", 
        coutM2: 650, 
        setup: 250,
        description: "Quartier d'affaires principal, proximité banques et institutions"
      },
      { 
        ville: "Genève", 
        quartier: "Centre-ville", 
        coutM2: 800, 
        setup: 250,
        description: "Quartier financier historique, prestige et réseau trading"
      },
      { 
        ville: "Amsterdam", 
        quartier: "Zuidas", 
        coutM2: 870, 
        setup: 220,
        description: "Nouveau CBD, proximité port et acteurs cacao"
      },
      { 
        ville: "Chypre", 
        quartier: "Limassol Business District", 
        coutM2: 600, 
        setup: 250,
        description: "Hub services financiers, proximité port méditerranéen"
      },
      { 
        ville: "Londres", 
        quartier: "City", 
        coutM2: 1300, 
        setup: 400,
        description: "Centre financier mondial, accès direct ICE Futures"
      },
      { 
        ville: "Hambourg", 
        quartier: "HafenCity", 
        coutM2: 580, 
        setup: 200,
        description: "Quartier portuaire moderne, hub logistique européen"
      },
      { 
        ville: "Singapour", 
        quartier: "CBD", 
        coutM2: 950, 
        setup: 320,
        description: "Centre financier Asie, régulation MAS favorable"
      },
      { 
        ville: "Dubai", 
        quartier: "DIFC", 
        coutM2: 800, 
        setup: 280,
        description: "Zone franche financière, 0% taxe, hub MENA"
      },
      { 
        ville: "Maroc CFC", 
        quartier: "Casablanca Finance City", 
        coutM2: 300, 
        setup: 150,
        description: "Zone franche africaine, proximité Afrique de l'Ouest"
      }
    ]
  };

  // Données autres besoins
  const autresBesoinsData = [
    {
      categorie: "IT & Systèmes",
      description: "Infrastructure technologique complète pour trading et risk management",
      details: [
        { item: "Bloomberg (3 postes)", an1: 60, an2: 60, an3: 72, note: "Terminal pro + 1 licence supplémentaire An3" },
        { item: "Accès ICE", an1: 36, an2: 36, an3: 36, note: "Connexion directe marché futures" },
        { item: "Risk Management", an1: 13, an2: 30, an3: 49, note: "Système 2$/tonne, évolutif avec volumes" },
        { item: "Cybersécurité", an1: 6.5, an2: 15, an3: 24.5, note: "Protection 1$/tonne, critique pour trading" },
        { item: "Infrastructure Cloud", an1: 8, an2: 12, an3: 13, note: "Hébergement sécurisé et backup" }
      ]
    },
    {
      categorie: "Compliance",
      description: "Conformité réglementaire et certifications obligatoires",
      details: [
        { item: "Audit Big 4", an1: 20, an2: 40, an3: 80, note: "Audit annuel obligatoire, complexité croissante" },
        { item: "EUDR/Durabilité", an1: 6.5, an2: 15, an3: 24.5, note: "Traçabilité 1$/tonne, obligatoire 2025" },
        { item: "Fiscal International", an1: 0, an2: 0, an3: 10, note: "Optimisation structure internationale" },
        { item: "MiFID II", an1: 0, an2: 15, an3: 10, note: "Obligatoire si spéculation >15% activité" },
        { item: "Certifications", an1: 25, an2: 0, an3: 0, note: "Certifications initiales RFA, UTZ, etc." }
      ]
    },
    {
      categorie: "Frais Trading",
      description: "Coûts directs liés à l'activité de trading",
      details: [
        { item: "Frais ICE", an1: 3, an2: 6.8, an3: 11.1, note: "Commission 0.5$/tonne sur futures" },
        { item: "Frais bancaires", an1: 5, an2: 10, an3: 15, note: "Virements, garanties, lettres de crédit" }
      ]
    },
    {
      categorie: "Voyages & Représentation",
      description: "Déplacements professionnels et développement commercial",
      details: [
        { item: "Voyages affaires", an1: 49.5, an2: 74.9, an3: 103.4, note: "30k€ fixe + 3$/tonne variable" },
        { item: "Marketing/Events", an1: 10, an2: 15, an3: 20, note: "Participation salons, réceptions clients" }
      ]
    },
    {
      categorie: "Assurances & Legal",
      description: "Protection juridique et assurances professionnelles",
      details: [
        { item: "RC Pro Trading", an1: 40, an2: 44, an3: 48.5, note: "Assurance activité trading obligatoire" },
        { item: "D&O Protection", an1: 20, an2: 22, an3: 24.5, note: "Protection dirigeants et administrateurs" },
        { item: "Avocat externe", an1: 20, an2: 22, an3: 24, note: "Conseil juridique contrats et litiges" }
      ]
    },
    {
      categorie: "Autres frais (3%)",
      description: "Frais généraux et imprévus",
      details: [
        { item: "Frais divers", an1: 28, an2: 33, an3: 40, note: "Télécoms, fournitures, imprévus (~3% total)" }
      ]
    }
  ];

  // Fonction de rendu des onglets
  const renderTabContent = () => {
    switch (activeTab) {
      case 'resources':
        return renderResourcesTab();
      case 'offices':
        return renderOfficesTab();
      case 'needs':
        return renderNeedsTab();
      case 'summary':
        return renderSummaryTab();
      default:
        return null;
    }
  };

  // Onglet Ressources
  const renderResourcesTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Évolution des effectifs par localisation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(ressourcesData).map(([ville, data]) => (
              <div key={ville} className="border rounded-lg p-4">
                <h3 className="font-bold text-lg mb-3 capitalize">{ville}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-2 text-left">Poste</th>
                        <th className="p-2 text-center">An 1</th>
                        <th className="p-2 text-center">An 2</th>
                        <th className="p-2 text-center">An 3</th>
                        <th className="p-2 text-right">Salaire (k€)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.postes.map((poste, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                          <td className="p-2">{poste.titre}</td>
                          <td className="p-2 text-center">{poste.an1 || '-'}</td>
                          <td className="p-2 text-center">{poste.an2 || '-'}</td>
                          <td className="p-2 text-center">{poste.an3 || '-'}</td>
                          <td className="p-2 text-right">{poste.salaire}</td>
                        </tr>
                      ))}
                      <tr className="font-bold bg-sky-50/30">
                        <td className="p-2">Total FTE</td>
                        <td className="p-2 text-center">{data.totalFTE.an1}</td>
                        <td className="p-2 text-center">{data.totalFTE.an2}</td>
                        <td className="p-2 text-center">{data.totalFTE.an3}</td>
                        <td className="p-2"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 space-y-1 text-sm text-gray-600">
                  {data.postes.map((poste, idx) => (
                    <p key={idx}><strong>{poste.titre}:</strong> {poste.description}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Points clés - Ressources humaines</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>• <strong>Montée en charge progressive:</strong> 4 FTE en An1 → 5.5 FTE en An3 pour toutes les localisations</li>
            <li>• <strong>Structure identique:</strong> 1 dirigeant + 2-3 traders + 1-2 support dans chaque bureau</li>
            <li>• <strong>Écarts salariaux significatifs:</strong> Genève +25% vs Paris, Amsterdam intermédiaire</li>
            <li>• <strong>Flexibilité:</strong> Recrutement progressif des juniors selon croissance volumes</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );

  // Onglet Bureaux
  const renderOfficesTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Évolution des surfaces nécessaires</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-sky-50/30 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Surface bureaux (m²)</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-sky-700">{bureauxData.evolution.an1}</p>
                <p className="text-sm text-gray-600">An 1</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-sky-700">{bureauxData.evolution.an2}</p>
                <p className="text-sm text-gray-600">An 2</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-sky-700">{bureauxData.evolution.an3}</p>
                <p className="text-sm text-gray-600">An 3</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comparaison des localisations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Ville</th>
                  <th className="p-2 text-left">Quartier</th>
                  <th className="p-2 text-right">Coût/m²/an</th>
                  <th className="p-2 text-right">Setup (k€)</th>
                  <th className="p-2 text-right">Coût An1 (115m²)</th>
                </tr>
              </thead>
              <tbody>
                {bureauxData.localites.map((loc, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="p-2 font-semibold">{loc.ville}</td>
                    <td className="p-2">{loc.quartier}</td>
                    <td className="p-2 text-right">{loc.coutM2}€</td>
                    <td className="p-2 text-right">{loc.setup}</td>
                    <td className="p-2 text-right font-semibold">{((loc.coutM2 * 115) / 1000).toFixed(0)}k€</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 space-y-2">
            <h4 className="font-semibold">Description des quartiers:</h4>
            {bureauxData.localites.map((loc, idx) => (
              <p key={idx} className="text-sm">
                <strong>{loc.ville} - {loc.quartier}:</strong> {loc.description}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Onglet Autres besoins
  const renderNeedsTab = () => (
    <div className="space-y-6">
      {autresBesoinsData.map((categorie, idx) => (
        <Card key={idx}>
          <CardHeader>
            <CardTitle>{categorie.categorie}</CardTitle>
            <p className="text-sm text-gray-600">{categorie.description}</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-2 text-left">Poste</th>
                    <th className="p-2 text-right">An 1 (k€)</th>
                    <th className="p-2 text-right">An 2 (k€)</th>
                    <th className="p-2 text-right">An 3 (k€)</th>
                    <th className="p-2 text-left">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {categorie.details.map((detail, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="p-2">{detail.item}</td>
                      <td className="p-2 text-right">{detail.an1}</td>
                      <td className="p-2 text-right">{detail.an2}</td>
                      <td className="p-2 text-right">{detail.an3}</td>
                      <td className="p-2 text-sm text-gray-600">{detail.note}</td>
                    </tr>
                  ))}
                  <tr className="font-bold bg-sky-50/30">
                    <td className="p-2">Sous-total</td>
                    <td className="p-2 text-right">
                      {categorie.details.reduce((sum, d) => sum + d.an1, 0).toFixed(1)}
                    </td>
                    <td className="p-2 text-right">
                      {categorie.details.reduce((sum, d) => sum + d.an2, 0).toFixed(1)}
                    </td>
                    <td className="p-2 text-right">
                      {categorie.details.reduce((sum, d) => sum + d.an3, 0).toFixed(1)}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Onglet Récapitulatif
  const renderSummaryTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Classement des localisations par coût total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-center">Rang</th>
                  <th className="p-2 text-left">Localisation</th>
                  <th className="p-2 text-right">An 1</th>
                  <th className="p-2 text-right">An 2</th>
                  <th className="p-2 text-right">An 3</th>
                  <th className="p-2 text-right">Total 3 ans</th>
                  <th className="p-2 text-center">Score SG&A</th>
                </tr>
              </thead>
              <tbody>
                {villesData.map((ville, idx) => {
                  const score = ville.rank <= 3 ? 'A' : ville.rank <= 7 ? 'B' : 'C';
                  const scoreColor = score === 'A' ? 'bg-teal-50/30 text-teal-800' : 
                                    score === 'B' ? 'bg-blue-100 text-sky-800' : 
                                    'bg-rose-50/30 text-rose-800';
                  
                  return (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="p-2 text-center font-bold">{ville.rank}</td>
                      <td className="p-2 font-semibold">{ville.nom}</td>
                      <td className="p-2 text-right">{ville.an1.toFixed(0)}k€</td>
                      <td className="p-2 text-right">{ville.an2.toFixed(0)}k€</td>
                      <td className="p-2 text-right">{ville.an3.toFixed(0)}k€</td>
                      <td className="p-2 text-right font-bold">{ville.total.toFixed(0)}k€</td>
                      <td className="p-2 text-center">
                        <span className={`px-2 py-1 rounded font-bold ${scoreColor}`}>{score}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-teal-50/30">
          <CardHeader>
            <CardTitle className="text-teal-800">Score A - Optimal</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li><strong>1. Maroc CFC:</strong> 2,376k€</li>
              <li><strong>2. Maurice:</strong> 2,702k€</li>
              <li><strong>3. Andorre:</strong> 2,874k€</li>
            </ul>
            <p className="mt-3 text-xs text-teal-700">
              Zones franches avec fiscalité avantageuse mais éloignement des marchés principaux
            </p>
          </CardContent>
        </Card>

        <Card className="bg-sky-50/30">
          <CardHeader>
            <CardTitle className="text-sky-800">Score B - Compétitif</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li><strong>4. Paris:</strong> 3,987k€</li>
              <li><strong>5. Hambourg:</strong> 4,186k€</li>
              <li><strong>6. Chypre:</strong> 4,392k€</li>
              <li><strong>7. Amsterdam:</strong> 4,354k€</li>
            </ul>
            <p className="mt-3 text-xs text-sky-700">
              Europe avec bon équilibre coût/accès marché et écosystème développé
            </p>
          </CardContent>
        </Card>

        <Card className="bg-rose-50/30">
          <CardHeader>
            <CardTitle className="text-rose-800">Score C - Premium</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li><strong>8-10. Dubai/Tel Aviv/Genève:</strong> 4.5-5.3M€</li>
              <li><strong>11-13. Singapour/Londres/Genève LCM:</strong> 5.6-5.8M€</li>
            </ul>
            <p className="mt-3 text-xs text-rose-700">
              Hubs majeurs avec coûts élevés mais prestige et réseau maximum
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recommandations finales SG&A</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-100 rounded-lg">
              <h4 className="font-bold mb-2">🎯 Recommandation principale: PARIS</h4>
              <p className="text-sm">
                Pour Neskao, Paris offre le meilleur compromis avec un coût total de 3,987k€ sur 3 ans:
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                <li>✓ Meilleur score B en Europe (21% moins cher que Genève)</li>
                <li>✓ Liens historiques forts avec la Côte d'Ivoire</li>
                <li>✓ Accès écosystème AFD/Proparco pour financement</li>
                <li>✓ Hub aérien direct vers Abidjan</li>
                <li>✓ Ratio SG&A/tonne compétitif à 60€/t en An3</li>
              </ul>
            </div>

            <div className="p-4 bg-green-100 rounded-lg">
              <h4 className="font-bold mb-2">🌍 Alternative low-cost: MAROC CFC</h4>
              <p className="text-sm">
                Si la priorité absolue est la réduction des coûts (2,376k€ sur 3 ans):
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                <li>✓ 40% moins cher que Paris</li>
                <li>✓ Zone franche 0% fiscalité</li>
                <li>✓ Proximité Afrique de l'Ouest</li>
                <li>✗ Éloignement des marchés futures européens</li>
                <li>✗ Écosystème trading moins développé</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-100 rounded-lg">
              <h4 className="font-bold mb-2">⚡ Alternative premium: GENÈVE</h4>
              <p className="text-sm">
                Si le prestige et l'accès réseau priment (5,062k€ sur 3 ans):
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                <li>✓ Hub mondial du trading de commodités</li>
                <li>✓ Crédibilité maximale auprès des banques</li>
                <li>✓ Fiscalité 15% attractive</li>
                <li>✗ 27% plus cher que Paris</li>
                <li>✗ Coûts personnel très élevés</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* En-tête avec métriques clés */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-teal-50/30 to-teal-100/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-teal-800">Coût minimum</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-teal-900">2,376k€</p>
            <p className="text-sm text-teal-700">Maroc CFC (3 ans)</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-sky-50/30 to-sky-100/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-sky-800">Recommandé</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-sky-900">3,987k€</p>
            <p className="text-sm text-sky-700">Paris (3 ans)</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-50 to-gray-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-800">Écart coûts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">2.45x</p>
            <p className="text-sm text-gray-700">Entre min et max</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-100 to-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-800">Effectifs An3</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">5.5 FTE</p>
            <p className="text-sm text-gray-700">Toutes localisations</p>
          </CardContent>
        </Card>
      </div>

      {/* Navigation par onglets */}
      <div className="border-b">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('resources')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'resources'
                ? 'border-sky-500 text-sky-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Ressources humaines
          </button>
          <button
            onClick={() => setActiveTab('offices')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'offices'
                ? 'border-sky-500 text-sky-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Bureaux
          </button>
          <button
            onClick={() => setActiveTab('needs')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'needs'
                ? 'border-sky-500 text-sky-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Autres besoins
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'summary'
                ? 'border-sky-500 text-sky-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Récapitulatif
          </button>
        </div>
      </div>

      {/* Contenu des onglets */}
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default SGA;