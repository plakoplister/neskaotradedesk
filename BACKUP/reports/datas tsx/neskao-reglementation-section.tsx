import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, XCircle, AlertCircle, TrendingUp, Shield, Globe, Building2, FileText, Scale, AlertTriangle, ChevronRight } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';

const renderReglementation = () => {
  const [activeTab, setActiveTab] = useState('general');

  // Données complètes des 12 localités avec Chypre
  const localisationsCompletes = [
    {
      ville: 'Paris',
      flag: '🇫🇷',
      scoreReg: 10,
      tradingAutorises: 'OUI',
      conventionCI: 'OUI',
      conventionPrixTransfert: 'OUI',
      restrictions: 'AUCUNE',
      tauxIS: '25% + CVAE',
      capitalMinimum: '10M USD',
      statut: 'RECOMMANDÉ',
      avantagesSpeciaux: 'CIR, JEI possible',
      forces: ['Convention fiscale CI excellente', 'Accès AFD/Proparco', 'Écosystème commerce équitable mature'],
      faiblesses: ['Charges sociales élevées (45%)', 'Fiscalité 25% + CVAE'],
      zone: 'Europe'
    },
    {
      ville: 'Genève',
      flag: '🇨🇭',
      scoreReg: 10,
      tradingAutorises: 'OUI',
      conventionCI: 'OUI',
      conventionPrixTransfert: 'OUI',
      restrictions: 'AUCUNE',
      tauxIS: '14.0%',
      capitalMinimum: '10M CHF',
      statut: 'RECOMMANDÉ',
      avantagesSpeciaux: 'Statut auxiliaire possible',
      forces: ['Hub mondial développement durable', 'Standards suisses reconnus', 'Convention fiscale CI active'],
      faiblesses: ['Coûts opérationnels très élevés', 'Personnel: 1,045K USD/an'],
      zone: 'Europe'
    },
    {
      ville: 'Amsterdam',
      flag: '🇳🇱',
      scoreReg: 10,
      tradingAutorises: 'OUI',
      conventionCI: 'OUI',
      conventionPrixTransfert: 'OUI',
      restrictions: 'AUCUNE',
      tauxIS: '25.8%',
      capitalMinimum: '5M EUR',
      statut: 'ALTERNATIVE',
      avantagesSpeciaux: 'Innovation box 9%',
      forces: ['Port #1 Europe cacao', 'Tony\'s Chocolonely ecosystem', 'Convention fiscale CI'],
      faiblesses: ['Fiscalité 25.8%', 'IRR 3 ans: 38%'],
      zone: 'Europe'
    },
    {
      ville: 'Londres',
      flag: '🇬🇧',
      scoreReg: 8,
      tradingAutorises: 'OUI',
      conventionCI: 'OUI',
      conventionPrixTransfert: 'NON',
      restrictions: 'POST BREXIT',
      tauxIS: '19%',
      capitalMinimum: '10M GBP',
      statut: 'POSSIBLE',
      avantagesSpeciaux: 'Centre mondial trading',
      forces: ['Centre mondial cacao éthique', 'Expertise trading maximale', 'Transparence absolue'],
      faiblesses: ['Coûts prohibitifs (1700K personnel)', 'Perte année 1 (-130K)', 'Post-Brexit complications'],
      zone: 'Europe'
    },
    {
      ville: 'Hambourg',
      flag: '🇩🇪',
      scoreReg: 10,
      tradingAutorises: 'OUI',
      conventionCI: 'OUI',
      conventionPrixTransfert: 'OUI',
      restrictions: 'AUCUNE',
      tauxIS: '30%',
      capitalMinimum: '10M EUR',
      statut: 'POSSIBLE',
      avantagesSpeciaux: 'Port trading historique',
      forces: ['Port historique cacao', 'Expertise logistique'],
      faiblesses: ['Fiscalité élevée', 'Coûts opérationnels'],
      zone: 'Europe'
    },
    {
      ville: 'Andorre',
      flag: '🇦🇩',
      scoreReg: 7,
      tradingAutorises: 'OUI',
      conventionCI: 'OUI',
      conventionPrixTransfert: 'NON',
      restrictions: 'SUBSTANCE',
      tauxIS: '10%',
      capitalMinimum: '3M EUR',
      statut: 'RISQUÉ',
      avantagesSpeciaux: 'Fiscalité attractive',
      forces: ['Fiscalité très attractive', 'Proximité France'],
      faiblesses: ['Exigences de substance', 'Taille limitée'],
      zone: 'Europe'
    },
    {
      ville: 'Chypre',
      flag: '🇨🇾',
      scoreReg: 8,
      tradingAutorises: 'OUI',
      conventionCI: 'NON',
      conventionPrixTransfert: 'OUI',
      restrictions: 'Standards UE complets',
      tauxIS: '12.5%',
      capitalMinimum: '10M EUR',
      statut: 'POSSIBLE',
      avantagesSpeciaux: 'Fiscalité UE attractive',
      forces: ['Membre UE', 'Fiscalité 12.5%', 'Hub services financiers'],
      faiblesses: ['Pas de convention CI', 'Coûts dirigeants élevés'],
      zone: 'Europe'
    },
    {
      ville: 'Maurice',
      flag: '🇲🇺',
      scoreReg: 10,
      tradingAutorises: 'OUI',
      conventionCI: 'OUI',
      conventionPrixTransfert: 'OUI',
      restrictions: 'AUCUNE',
      tauxIS: '15%',
      capitalMinimum: '5M USD',
      statut: 'POSSIBLE',
      avantagesSpeciaux: 'Gateway Afrique',
      forces: ['Hub financier africain reconnu', 'Francophonie + Common Law', 'Convention CI active'],
      faiblesses: ['Distance CI (7000km)', 'Cycle cash long (72j)', 'Écosystème cacao limité'],
      zone: 'Afrique'
    },
    {
      ville: 'Maroc CFC',
      flag: '🇲🇦',
      scoreReg: 3,
      tradingAutorises: 'LIMITÉ',
      conventionCI: 'OUI',
      conventionPrixTransfert: 'NON',
      restrictions: 'CHANGES, MARGIN CALLS T+3',
      tauxIS: '8.75% (5 ans)',
      capitalMinimum: '1M MAD',
      statut: 'NON RECOMMANDÉ',
      avantagesSpeciaux: 'CFC status',
      forces: ['Fiscalité CFC attractive', 'Proximité Europe'],
      faiblesses: ['Restrictions changes', 'Margin calls T+3', 'Trading limité'],
      zone: 'Afrique'
    },
    {
      ville: 'Dubai',
      flag: '🇦🇪',
      scoreReg: 6,
      tradingAutorises: 'OUI',
      conventionCI: 'NON',
      conventionPrixTransfert: 'NON',
      restrictions: 'AUCUNE',
      tauxIS: '0%',
      capitalMinimum: '5M AED',
      statut: 'RISQUÉ',
      avantagesSpeciaux: 'Zone franche',
      forces: ['0% impôt sociétés', 'Coûts bas (697K personnel)', 'Pas de contrôle changes'],
      faiblesses: ['Aucune convention CI', 'Distance standards durables', 'Image paradis fiscal'],
      zone: 'Moyen-Orient'
    },
    {
      ville: 'Tel Aviv',
      flag: '🇮🇱',
      scoreReg: 5,
      tradingAutorises: 'OUI',
      conventionCI: 'NON',
      conventionPrixTransfert: 'NON',
      restrictions: 'GÉOPOLITIQUE',
      tauxIS: '23%',
      capitalMinimum: '10M ILS',
      statut: 'NON RECOMMANDÉ',
      avantagesSpeciaux: 'Tech innovation',
      forces: ['Innovation technologique', 'Écosystème fintech'],
      faiblesses: ['Risques géopolitiques', 'Pas de convention CI'],
      zone: 'Moyen-Orient'
    },
    {
      ville: 'Singapour',
      flag: '🇸🇬',
      scoreReg: 8,
      tradingAutorises: 'OUI',
      conventionCI: 'OUI',
      conventionPrixTransfert: 'NON',
      restrictions: 'AUCUNE',
      tauxIS: '5-10% (GTP)',
      capitalMinimum: '5M SGD',
      statut: 'POSSIBLE',
      avantagesSpeciaux: 'Global Trader Programme',
      forces: ['Hub trading Asie', 'Global Trader Programme', 'Infrastructure A+'],
      faiblesses: ['Distance CI importante', 'Coûts élevés'],
      zone: 'Asie'
    }
  ];

  // Regroupement par statut
  const localisationsParStatut = {
    'RECOMMANDÉ': localisationsCompletes.filter(l => l.statut === 'RECOMMANDÉ'),
    'ALTERNATIVE': localisationsCompletes.filter(l => l.statut === 'ALTERNATIVE'),
    'POSSIBLE': localisationsCompletes.filter(l => l.statut === 'POSSIBLE'),
    'RISQUÉ': localisationsCompletes.filter(l => l.statut === 'RISQUÉ'),
    'NON RECOMMANDÉ': localisationsCompletes.filter(l => l.statut === 'NON RECOMMANDÉ')
  };

  // Données pour le radar chart (top 6 par score)
  const topLocalisations = localisationsCompletes
    .sort((a, b) => b.scoreReg - a.scoreReg)
    .slice(0, 6);

  const radarData = [
    { 
      critere: 'Score Réglementaire', 
      ...Object.fromEntries(topLocalisations.map(loc => [loc.ville, loc.scoreReg * 10]))
    },
    { 
      critere: 'Convention CI', 
      ...Object.fromEntries(topLocalisations.map(loc => [loc.ville, loc.conventionCI === 'OUI' ? 100 : 0]))
    },
    { 
      critere: 'Prix Transfert', 
      ...Object.fromEntries(topLocalisations.map(loc => [loc.ville, loc.conventionPrixTransfert === 'OUI' ? 100 : 0]))
    },
    { 
      critere: 'Trading Autorisé', 
      ...Object.fromEntries(topLocalisations.map(loc => [loc.ville, loc.tradingAutorises === 'OUI' ? 100 : loc.tradingAutorises === 'LIMITÉ' ? 50 : 0]))
    },
    { 
      critere: 'Restrictions', 
      ...Object.fromEntries(topLocalisations.map(loc => [loc.ville, loc.restrictions === 'AUCUNE' ? 100 : 30]))
    }
  ];

  const radarColors = {
    'Paris': '#ef4444',
    'Genève': '#3b82f6', 
    'Amsterdam': '#10b981',
    'Hambourg': '#f59e0b',
    'Maurice': '#8b5cf6',
    'Londres': '#ec4899'
  };

  // Données pour les onglets
  const forwardData = {
    criteres: [
      { critere: 'Capital minimum', exigence: '5M USD (10M recommandé)', statut: 'À mobiliser', icon: '💰' },
      { critere: 'Garantie bancaire', exigence: 'Ligne confirmée banque 1er rang', statut: 'À négocier', icon: '🏦' },
      { critere: 'Présence locale', exigence: 'Bureau ou représentant CI', statut: '✓ Acquis', icon: '🏢' },
      { critere: 'Track record', exigence: '3 ans expérience cacao', statut: '✓ Acquis', icon: '📊' },
      { critere: 'Compliance', exigence: 'EUDR, durabilité', statut: 'En cours', icon: '📋' }
    ],
    processus: [
      { etape: 1, titre: 'Agrément (2-3 mois)', description: 'Dossier candidature: statuts, états financiers, garanties' },
      { etape: 2, titre: 'Contrats forward', description: 'Négociation volumes/prix avec CCC' },
      { etape: 3, titre: 'Préfinancement (T-60j)', description: 'Mobilisation ligne crédit, LC bancaire' },
      { etape: 4, titre: 'Livraison', description: 'Réception Abidjan/San Pedro, B/L, certificats qualité' }
    ]
  };

  const futuresData = {
    options: [
      {
        titre: 'Option 1: Membre ICE',
        pour: 'Volumes importants',
        details: [
          'Capital réglementaire: 730K EUR minimum',
          'Adhésion ICE: 50K USD/an',
          'Systèmes: WebICE ou API directe',
          'Personnel: Compliance officer agréé FCA/AMF'
        ]
      },
      {
        titre: 'Option 2: Via Broker',
        pour: 'Recommandé pour démarrer',
        details: [
          'Compte chez broker régulé (StoneX, Marex, ADM)',
          'Dépôt initial: 250K-500K USD',
          'Commission: 5-15 USD/contrat',
          'Accès plateforme: CQG, TT, ou propriétaire'
        ]
      }
    ],
    marges: [
      { type: 'Initial Margin', montantContrat: 7317.94, parTonne: 731.79, pour1500T: 1097691 },
      { type: 'Maintenance Margin', montantContrat: 3500, parTonne: 350, pour1500T: 525000 },
      { type: 'Buffer sécurité (+50%)', montantContrat: '-', parTonne: '-', pour1500T: 548845 },
      { type: 'Total requis', montantContrat: '-', parTonne: '-', pour1500T: 2171536 }
    ]
  };

  const complianceData = {
    eudr: {
      deadline: '30 décembre 2025 → 2026',
      exigences: [
        'Traçabilité GPS des parcelles',
        'Due diligence renforcée',
        'Reporting annuel obligatoire',
        'Pénalités: jusqu\'à 4% du CA EU'
      ]
    },
    mifid: {
      titre: 'MiFID II (Europe)',
      exigences: [
        'Reporting transactions temps réel',
        'Best execution policy',
        'Enregistrement communications',
        'Formation continue traders'
      ]
    },
    lcbft: {
      titre: 'LCB-FT',
      exigences: [
        'KYC/AML procédures',
        'Screening sanctions',
        'Transaction monitoring',
        'Suspicious Activity Reports'
      ]
    },
    certifications: {
      titre: 'Certifications durabilité',
      liste: [
        'Rainforest Alliance',
        'Fairtrade',
        'UTZ (maintenant RA)',
        'ISO 34101 (cacao durable)'
      ]
    }
  };

  // Fonction pour obtenir la couleur du statut
  const getStatutColor = (statut) => {
    switch(statut) {
      case 'RECOMMANDÉ': return 'bg-green-100 text-green-800';
      case 'ALTERNATIVE': return 'bg-blue-100 text-blue-800';
      case 'POSSIBLE': return 'bg-yellow-100 text-yellow-800';
      case 'RISQUÉ': return 'bg-orange-100 text-orange-800';
      case 'NON RECOMMANDÉ': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Onglet Général
  const renderGeneralTab = () => (
    <div className="space-y-6">
      {/* Métriques clés */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">
              <Globe className="h-4 w-4 inline mr-2" />
              Localisations analysées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">12</div>
            <p className="text-xs text-blue-600">4 zones géographiques</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-800">
              <CheckCircle2 className="h-4 w-4 inline mr-2" />
              Recommandées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{localisationsParStatut['RECOMMANDÉ'].length}</div>
            <p className="text-xs text-green-600">Paris, Genève</p>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">
              <AlertCircle className="h-4 w-4 inline mr-2" />
              Possibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">{localisationsParStatut['POSSIBLE'].length}</div>
            <p className="text-xs text-yellow-600">Dont Chypre (nouveau)</p>
          </CardContent>
        </Card>

        <Card className="bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-800">
              <XCircle className="h-4 w-4 inline mr-2" />
              Non recommandées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">{localisationsParStatut['NON RECOMMANDÉ'].length}</div>
            <p className="text-xs text-red-600">Restrictions majeures</p>
          </CardContent>
        </Card>
      </div>

      {/* Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Analyse comparative - Top 6 localisations</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid strokeDasharray="3 3" />
              <PolarAngleAxis dataKey="critere" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              {topLocalisations.map((loc, index) => (
                <Radar
                  key={loc.ville}
                  name={loc.ville}
                  dataKey={loc.ville}
                  stroke={radarColors[loc.ville] || '#6b7280'}
                  fill={radarColors[loc.ville] || '#6b7280'}
                  fillOpacity={0.3}
                />
              ))}
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tableau comparatif complet */}
      <Card>
        <CardHeader>
          <CardTitle>Tableau comparatif des 12 localisations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-2 text-left">Localisation</th>
                  <th className="border p-2 text-center">Score (/10)</th>
                  <th className="border p-2 text-center">Trading</th>
                  <th className="border p-2 text-center">Convention CI</th>
                  <th className="border p-2 text-center">Prix Transfert</th>
                  <th className="border p-2 text-center">Taux IS</th>
                  <th className="border p-2 text-center">Restrictions</th>
                  <th className="border p-2 text-center">Statut</th>
                </tr>
              </thead>
              <tbody>
                {localisationsCompletes.map((loc, index) => (
                  <tr key={loc.ville} className={loc.statut === 'RECOMMANDÉ' ? 'bg-green-50' : ''}>
                    <td className="border p-2">
                      <span className="font-medium">{loc.flag} {loc.ville}</span>
                    </td>
                    <td className="border p-2 text-center">
                      <Badge variant="outline" className={loc.scoreReg >= 8 ? 'border-green-500' : 'border-gray-500'}>
                        {loc.scoreReg}
                      </Badge>
                    </td>
                    <td className="border p-2 text-center">
                      {loc.tradingAutorises === 'OUI' ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                      ) : loc.tradingAutorises === 'LIMITÉ' ? (
                        <AlertCircle className="h-5 w-5 text-yellow-600 mx-auto" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 mx-auto" />
                      )}
                    </td>
                    <td className="border p-2 text-center">
                      {loc.conventionCI === 'OUI' ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 mx-auto" />
                      )}
                    </td>
                    <td className="border p-2 text-center">
                      {loc.conventionPrixTransfert === 'OUI' ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 mx-auto" />
                      )}
                    </td>
                    <td className="border p-2 text-center text-sm">{loc.tauxIS}</td>
                    <td className="border p-2 text-center text-sm">{loc.restrictions}</td>
                    <td className="border p-2 text-center">
                      <Badge className={getStatutColor(loc.statut)}>
                        {loc.statut}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Cartes détaillées par statut */}
      <div className="space-y-6">
        {Object.entries(localisationsParStatut).map(([statut, villes]) => (
          villes.length > 0 && (
            <div key={statut}>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Badge className={`${getStatutColor(statut)} mr-2`}>{statut}</Badge>
                <span className="text-gray-600">({villes.length} localisation{villes.length > 1 ? 's' : ''})</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {villes.map(ville => (
                  <Card key={ville.ville} className={statut === 'RECOMMANDÉ' ? 'border-green-200' : ''}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span>{ville.flag} {ville.ville}</span>
                        <Badge variant="outline">Score: {ville.scoreReg}/10</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Taux IS:</span>
                          <span className="font-medium">{ville.tauxIS}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Capital minimum:</span>
                          <span className="font-medium">{ville.capitalMinimum}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Zone:</span>
                          <span className="font-medium">{ville.zone}</span>
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t">
                        <p className="text-sm font-medium text-gray-700 mb-1">Forces:</p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {ville.forces.slice(0, 3).map((force, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-green-500 mr-1">•</span>
                              {force}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {ville.faiblesses.length > 0 && (
                        <div className="pt-2">
                          <p className="text-sm font-medium text-gray-700 mb-1">Points d'attention:</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {ville.faiblesses.slice(0, 2).map((faiblesse, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-orange-500 mr-1">•</span>
                                {faiblesse}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {ville.avantagesSpeciaux && (
                        <div className="pt-2">
                          <Badge variant="outline" className="text-xs">
                            {ville.avantagesSpeciaux}
                          </Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );

  // Onglet Forward
  const renderForwardTab = () => (
    <div className="space-y-6">
      <Alert className="border-blue-200 bg-blue-50">
        <FileText className="h-4 w-4" />
        <AlertDescription>
          Références: AGR002_AGREMENT_EXPORT_CAFE_CACAO_EX_.pdf et Décret n°2012-1010 du 17 octobre 2012
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Exigences Conseil du Café-Cacao (CCC)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {forwardData.criteres.map((critere, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{critere.icon}</span>
                  <div>
                    <p className="font-medium">{critere.critere}</p>
                    <p className="text-sm text-gray-600">{critere.exigence}</p>
                  </div>
                </div>
                <Badge 
                  className={
                    critere.statut.includes('✓') 
                      ? 'bg-green-100 text-green-800' 
                      : critere.statut === 'En cours'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }
                >
                  {critere.statut}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Processus contractuel CCC</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {forwardData.processus.map((etape, index) => (
              <div key={etape.etape} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {etape.etape}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{etape.titre}</h4>
                  <p className="text-sm text-gray-600">{etape.description}</p>
                </div>
                {index < forwardData.processus.length - 1 && (
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Onglet Futures
  const renderFuturesTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Accès ICE Futures Europe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {futuresData.options.map((option, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-lg">{option.titre}</h4>
                  <Badge variant="outline">{option.pour}</Badge>
                </div>
                <ul className="space-y-2">
                  {option.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Calcul des marges ICE Cocoa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-2 text-left">Type de marge</th>
                  <th className="border p-2 text-right">Montant/contrat (EUR)</th>
                  <th className="border p-2 text-right">Par tonne (EUR)</th>
                  <th className="border p-2 text-right">Pour 1,500T spec (EUR)</th>
                </tr>
              </thead>
              <tbody>
                {futuresData.marges.map((marge, index) => (
                  <tr key={index} className={index === futuresData.marges.length - 1 ? 'bg-blue-50 font-semibold' : ''}>
                    <td className="border p-2">{marge.type}</td>
                    <td className="border p-2 text-right">
                      {typeof marge.montantContrat === 'number' 
                        ? marge.montantContrat.toLocaleString('fr-FR', { minimumFractionDigits: 2 })
                        : marge.montantContrat}
                    </td>
                    <td className="border p-2 text-right">
                      {typeof marge.parTonne === 'number'
                        ? marge.parTonne.toLocaleString('fr-FR', { minimumFractionDigits: 2 })
                        : marge.parTonne}
                    </td>
                    <td className="border p-2 text-right">
                      {typeof marge.pour1500T === 'number'
                        ? marge.pour1500T.toLocaleString('fr-FR')
                        : marge.pour1500T}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Alert className="mt-4 border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Alerte volatilité:</strong> En cas de mouvement de marché de +33% (6,000 → 8,000 £/T), 
              les besoins de financement peuvent atteindre 47M USD additionnels.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );

  // Onglet Compliance
  const renderComplianceTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              EUDR (EU Deforestation Regulation)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                <span className="font-medium">Deadline:</span>
                <Badge className="bg-red-100 text-red-800">{complianceData.eudr.deadline}</Badge>
              </div>
              <ul className="space-y-2">
                {complianceData.eudr.exigences.map((exigence, idx) => (
                  <li key={idx} className="flex items-start text-sm">
                    <AlertCircle className="h-4 w-4 text-orange-500 mr-2 mt-0.5" />
                    {exigence}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Scale className="h-5 w-5 mr-2" />
              {complianceData.mifid.titre}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {complianceData.mifid.exigences.map((exigence, idx) => (
                <li key={idx} className="flex items-start text-sm">
                  <CheckCircle2 className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                  {exigence}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              {complianceData.lcbft.titre}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {complianceData.lcbft.exigences.map((exigence, idx) => (
                <li key={idx} className="flex items-start text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  {exigence}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="h-5 w-5 mr-2" />
              {complianceData.certifications.titre}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {complianceData.certifications.liste.map((cert, idx) => (
                <Badge key={idx} variant="outline" className="justify-center">
                  {cert}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Scale className="h-6 w-6 mr-2" />
            Analyse Réglementaire - 12 Localisations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">Vue Générale</TabsTrigger>
              <TabsTrigger value="forward">Forward</TabsTrigger>
              <TabsTrigger value="futures">Futures</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="mt-6">
              {renderGeneralTab()}
            </TabsContent>

            <TabsContent value="forward" className="mt-6">
              {renderForwardTab()}
            </TabsContent>

            <TabsContent value="futures" className="mt-6">
              {renderFuturesTab()}
            </TabsContent>

            <TabsContent value="compliance" className="mt-6">
              {renderComplianceTab()}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

// Export de la fonction
export default renderReglementation;