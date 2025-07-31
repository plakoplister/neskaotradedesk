import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { AlertCircle } from 'lucide-react';
import NextSteps from './components/sections/NextSteps';
import Risques from './components/sections/Risques';

const NeskaoTradeDesk = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeReglementationTab, setActiveReglementationTab] = useState('general');
  const [activeProduitsTab, setActiveProduitsTab] = useState('prix');
  const [activeFinancementTab, setActiveFinancementTab] = useState('structure');
  const [activeRisquesTab, setActiveRisquesTab] = useState('risques');

  const sections = [
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'contexte', name: 'Contexte' },
    { id: 'reglementation', name: 'Réglementation' },
    { id: 'produits', name: 'Mix Produits' },
    { id: 'financement', name: 'Financement' },
    { id: 'sga', name: 'SG&A' },
    { id: 'rentabilite', name: 'Rentabilité' },
    { id: 'impact', name: 'Impact Social' },
    { id: 'analyse', name: 'Analyse Décisionnelle' },
    { id: 'risques', name: 'Risques et Next Steps' }
  ];

  // Données pour le Dashboard
  const villesData = [
    { ville: 'Paris', scorePondere: 7.87, scoreTotal: 10 },
    { ville: 'Genève', scorePondere: 7.81, scoreTotal: 10 },
    { ville: 'Amsterdam', scorePondere: 7.65, scoreTotal: 10 },
    { ville: 'Singapour', scorePondere: 7.49, scoreTotal: 10 },
    { ville: 'Hambourg', scorePondere: 6.78, scoreTotal: 10 },
    { ville: 'Londres', scorePondere: 6.72, scoreTotal: 10 },
    { ville: 'Maurice', scorePondere: 5.62, scoreTotal: 10 },
    { ville: 'Andorre', scorePondere: 4.20, scoreTotal: 10 }
  ];

  const ponderationData = [
    { name: 'Impact Social', value: 30, color: '#8b5cf6' },
    { name: 'Cash Management', value: 30, color: '#3b82f6' },
    { name: 'Réglementation', value: 15, color: '#10b981' },
    { name: 'ROI', value: 15, color: '#f59e0b' },
    { name: 'Financement DFI', value: 10, color: '#ef4444' }
  ];

  const spiderData = [
    { subject: 'Réglementation', Paris: 10, Genève: 10, Amsterdam: 10 },
    { subject: 'Impact Social', Paris: 8.5, Genève: 7.9, Amsterdam: 7.75 },
    { subject: 'ROI', Paris: 5.46, Genève: 5.92, Amsterdam: 5.61 },
    { subject: 'Financement', Paris: 10, Genève: 10, Amsterdam: 9 },
    { subject: 'Cash Management', Paris: 6.66, Genève: 6.85, Amsterdam: 6.93 }
  ];

  // Section Dashboard - avec parenthèses pour return implicite
  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-800">Recommandation #1</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-bold text-blue-900">Paris 🇫🇷</h3>
            <p className="text-blue-700">Score: 7.87/10</p>
            <p className="text-sm text-blue-600 mt-2">Convention fiscale CI excellente</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader>
            <CardTitle className="text-green-800">Volume An 1</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-bold text-green-900">6,490 tonnes</h3>
            <p className="text-green-700">CA: 54.18 M€</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader>
            <CardTitle className="text-purple-800">ROI 3 ans</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-bold text-purple-900">171.5% - 187.4%</h3>
            <p className="text-purple-700">Selon localisation</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Analyse Comparative - Top 5 Villes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={villesData.slice(0, 5)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ville" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="scorePondere" fill="#4f46e5" name="Score Pondéré" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pondération des Critères</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ponderationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ponderationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analyse Multi-Critères - Top 3</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={spiderData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 10]} />
              <Radar name="Paris" dataKey="Paris" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
              <Radar name="Genève" dataKey="Genève" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              <Radar name="Amsterdam" dataKey="Amsterdam" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  // Section Contexte - avec parenthèses pour return implicite
  const renderContexte = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Contexte du Projet</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <h3 className="text-xl font-semibold mb-4">Objectifs de Neskao</h3>
          <p className="mb-4">
            Neskao, acteur majeur de la transformation du cacao en Côte d'Ivoire, cherche à établir un bureau de trading international 
            pour optimiser sa présence sur les marchés mondiaux et maximiser la valeur ajoutée de sa production.
          </p>
          
          <h3 className="text-xl font-semibold mb-4">Marché du Cacao Actuel</h3>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <ul className="space-y-2">
              <li>• Production estimée : <strong>1,500,000 tonnes</strong></li>
              <li>• Production Oct-Dec 2025 : <strong>900,000 tonnes</strong></li>
              <li>• Production Jan-Mar 2026 : <strong>600,000 tonnes</strong></li>
              <li>• Prix moyen : <strong>6,200 GBP/tonne</strong> (juillet 2025)</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-4">Enjeux Stratégiques</h3>
          <p>
            L'établissement d'un bureau de trading permettra à Neskao de :
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Accéder directement aux marchés internationaux</li>
            <li>Optimiser les marges par une meilleure gestion des risques</li>
            <li>Renforcer les partenariats avec les acheteurs mondiaux</li>
            <li>Maximiser l'impact social en Côte d'Ivoire</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );

  // Section Réglementation - avec accolades et return explicite
  const renderReglementation = () => {
    const renderGeneralTab = () => (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              🇫🇷 Paris
              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Recommandé</span>
            </h3>
            <div className="space-y-2 text-sm">
              <p>✅ Convention fiscale CI excellente</p>
              <p>✅ Accès direct AFD/Proparco</p>
              <p>✅ Écosystème commerce équitable mature</p>
              <p>⚠️ Charges sociales élevées (45%)</p>
              <p>⚠️ Fiscalité 25% + CVAE</p>
            </div>
            <div className="mt-3 pt-3 border-t">
              <p className="text-xs font-semibold">Capital minimum requis</p>
              <p className="text-sm font-bold text-blue-600">10M USD</p>
              <p className="text-xs text-gray-600">(recommandé avec buffer volatilité)</p>
            </div>
          </div>

          <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              🇨🇭 Genève
              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Recommandé</span>
            </h3>
            <div className="space-y-2 text-sm">
              <p>✅ Hub mondial développement durable</p>
              <p>✅ Standards suisses reconnus</p>
              <p>✅ Convention fiscale CI active</p>
              <p>⚠️ Coûts opérationnels très élevés</p>
              <p>⚠️ Personnel: 1,045K USD/an</p>
            </div>
            <div className="mt-3 pt-3 border-t">
              <p className="text-xs font-semibold">Capital minimum requis</p>
              <p className="text-sm font-bold text-blue-600">10M CHF</p>
              <p className="text-xs text-gray-600">pour licence trading</p>
            </div>
          </div>

          <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              🇳🇱 Amsterdam
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Alternative</span>
            </h3>
            <div className="space-y-2 text-sm">
              <p>✅ Port #1 Europe cacao</p>
              <p>✅ Tony's Chocolonely ecosystem</p>
              <p>✅ Convention fiscale CI</p>
              <p>⚠️ Fiscalité 25.8%</p>
              <p>✅ IRR 3 ans: 38%</p>
            </div>
            <div className="mt-3 pt-3 border-t">
              <p className="text-xs font-semibold">Capital minimum requis</p>
              <p className="text-sm font-bold text-blue-600">5M EUR</p>
              <p className="text-xs text-gray-600">pour activité trading</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Conclusion Score Réglementation</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Paris, Genève, Amsterdam, Hambourg</span>
              <span className="font-bold text-green-600">10/10</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Londres, Singapour</span>
              <span className="font-bold text-yellow-600">8/10</span>
            </div>
          </div>
        </div>
      </div>
    );

    const renderForwardTab = () => (
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-700">
            <strong>Références légales:</strong> AGR002_AGREMENT_EXPORT_CAFE_CACAO_EX_.pdf et Décret n°2012-1010 du 17 octobre 2012
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Exigences Conseil du Café-Cacao (CCC)</CardTitle>
          </CardHeader>
          <CardContent>
            <h4 className="font-semibold mb-3">Critères d'agrément contrepartie</h4>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Critère</th>
                  <th className="border p-2 text-left">Exigence</th>
                  <th className="border p-2 text-left">Statut NESKAO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Capital minimum</td>
                  <td className="border p-2">5M USD (10M recommandé)</td>
                  <td className="border p-2">
                    <span className="text-orange-600 font-semibold">À mobiliser</span>
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Garantie bancaire</td>
                  <td className="border p-2">Ligne confirmée banque 1er rang</td>
                  <td className="border p-2">
                    <span className="text-orange-600 font-semibold">À négocier</span>
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Présence locale</td>
                  <td className="border p-2">Bureau ou représentant CI</td>
                  <td className="border p-2">
                    <span className="text-green-600 font-semibold">✓ Acquis</span>
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Track record</td>
                  <td className="border p-2">3 ans expérience cacao</td>
                  <td className="border p-2">
                    <span className="text-green-600 font-semibold">✓ Acquis</span>
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Compliance</td>
                  <td className="border p-2">EUDR, durabilité</td>
                  <td className="border p-2">
                    <span className="text-yellow-600 font-semibold">En cours</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Processus contractuel CCC</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h5 className="font-semibold">Agrément (2-3 mois)</h5>
                  <p className="text-sm text-gray-600">Dossier candidature: statuts, états financiers, garanties</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h5 className="font-semibold">Contrats forward</h5>
                  <p className="text-sm text-gray-600">Négociation volumes/prix avec CCC</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h5 className="font-semibold">Préfinancement (T-60j)</h5>
                  <p className="text-sm text-gray-600">Mobilisation ligne crédit, LC bancaire</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h5 className="font-semibold">Livraison</h5>
                  <p className="text-sm text-gray-600">Réception Abidjan/San Pedro, B/L, certificats qualité</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );

    const renderFuturesTab = () => (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Accès ICE Futures Europe</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4 bg-purple-50">
                <h4 className="font-semibold text-lg mb-3 text-purple-800">Option 1: Membre ICE</h4>
                <p className="text-sm text-gray-600 mb-3">Pour volumes importants</p>
                <ul className="space-y-2 text-sm">
                  <li>• Capital réglementaire: <strong>730K EUR minimum</strong></li>
                  <li>• Adhésion ICE: <strong>50K USD/an</strong></li>
                  <li>• Systèmes: WebICE ou API directe</li>
                  <li>• Personnel: Compliance officer agréé FCA/AMF</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4 bg-green-50">
                <h4 className="font-semibold text-lg mb-3 text-green-800">Option 2: Via Broker</h4>
                <p className="text-sm text-gray-600 mb-3">Recommandé pour démarrer</p>
                <ul className="space-y-2 text-sm">
                  <li>• Compte chez broker régulé (StoneX, Marex, ADM)</li>
                  <li>• Dépôt initial: <strong>250K-500K USD</strong></li>
                  <li>• Commission: <strong>5-15 USD/contrat</strong></li>
                  <li>• Accès plateforme: CQG, TT, ou propriétaire</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <AlertCircle className="text-yellow-600" size={20} />
                Calcul des marges ICE Cocoa
              </h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-yellow-100">
                    <th className="p-2 text-left">Type de marge</th>
                    <th className="p-2 text-right">Montant/contrat EUR</th>
                    <th className="p-2 text-right">Par tonne EUR</th>
                    <th className="p-2 text-right">Pour 1,500T spec EUR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">Initial Margin</td>
                    <td className="p-2 text-right">7,317.94</td>
                    <td className="p-2 text-right">731.79</td>
                    <td className="p-2 text-right font-semibold">1,097,690.67</td>
                  </tr>
                  <tr>
                    <td className="p-2">Maintenance Margin</td>
                    <td className="p-2 text-right">3,500.00</td>
                    <td className="p-2 text-right">350.00</td>
                    <td className="p-2 text-right font-semibold">525,000.00</td>
                  </tr>
                  <tr>
                    <td className="p-2">Buffer sécurité (+50%)</td>
                    <td className="p-2 text-right">-</td>
                    <td className="p-2 text-right">-</td>
                    <td className="p-2 text-right font-semibold">548,845.34</td>
                  </tr>
                  <tr className="bg-yellow-100 font-bold">
                    <td className="p-2">Total requis</td>
                    <td className="p-2 text-right">-</td>
                    <td className="p-2 text-right">-</td>
                    <td className="p-2 text-right text-lg">2,171,536.01</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                <p className="text-sm text-red-700 font-semibold">
                  ⚠️ Alerte volatilité: En cas de mouvement de marché de +33% (6,000 → 8,000 £/T), 
                  les besoins de financement peuvent atteindre 47M USD additionnels.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );

    const renderComplianceTab = () => (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Exigences Compliance Clés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-lg mb-3 text-green-700">
                    EUDR (EU Deforestation Regulation)
                  </h4>
                  <div className="bg-red-50 p-2 rounded mb-3">
                    <p className="text-sm font-semibold text-red-700">
                      Deadline: 30 décembre 2025 → 2026
                    </p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li>• Traçabilité GPS des parcelles</li>
                    <li>• Due diligence renforcée</li>
                    <li>• Reporting annuel obligatoire</li>
                    <li className="text-red-600 font-semibold">• Pénalités: jusqu'à 4% du CA EU</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-lg mb-3 text-blue-700">
                    MiFID II (Europe)
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Reporting transactions temps réel</li>
                    <li>• Best execution policy</li>
                    <li>• Enregistrement communications</li>
                    <li>• Formation continue traders</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-lg mb-3 text-purple-700">
                    LCB-FT
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• KYC/AML procédures</li>
                    <li>• Screening sanctions</li>
                    <li>• Transaction monitoring</li>
                    <li>• Suspicious Activity Reports</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-lg mb-3 text-orange-700">
                    Certifications durabilité
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Rainforest Alliance</li>
                    <li>• Fairtrade</li>
                    <li>• UTZ (maintenant RA)</li>
                    <li>• ISO 34101 (cacao durable)</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Analyse Réglementaire par Localisation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700 mb-4">
                Toutes les localisations recommandées (Paris, Genève, Amsterdam) offrent un cadre 
                réglementaire solide pour l'activité de trading international, avec des spécificités 
                à prendre en compte selon le choix final.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h5 className="font-semibold text-blue-700">Paris</h5>
                  <p>AMF régulation, accès DFI français</p>
                </div>
                <div>
                  <h5 className="font-semibold text-blue-700">Genève</h5>
                  <p>FINMA supervision, standards suisses</p>
                </div>
                <div>
                  <h5 className="font-semibold text-blue-700">Amsterdam</h5>
                  <p>AFM oversight, hub logistique EU</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );

    // RETURN EXPLICITE ICI
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Analyse Réglementaire</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-b mb-6">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveReglementationTab('general')}
                  className={`pb-2 px-1 font-medium text-sm transition-colors ${
                    activeReglementationTab === 'general'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Général
                </button>
                <button
                  onClick={() => setActiveReglementationTab('forward')}
                  className={`pb-2 px-1 font-medium text-sm transition-colors ${
                    activeReglementationTab === 'forward'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Contrats Forward
                </button>
                <button
                  onClick={() => setActiveReglementationTab('futures')}
                  className={`pb-2 px-1 font-medium text-sm transition-colors ${
                    activeReglementationTab === 'futures'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Contrats Futures
                </button>
                <button
                  onClick={() => setActiveReglementationTab('compliance')}
                  className={`pb-2 px-1 font-medium text-sm transition-colors ${
                    activeReglementationTab === 'compliance'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Compliance
                </button>
              </nav>
            </div>

            {activeReglementationTab === 'general' && renderGeneralTab()}
            {activeReglementationTab === 'forward' && renderForwardTab()}
            {activeReglementationTab === 'futures' && renderFuturesTab()}
            {activeReglementationTab === 'compliance' && renderComplianceTab()}
          </CardContent>
        </Card>
      </div>
    );
  };

  // Section Management des Risques & Planning
  const renderPlanning = () => {
    return (
      <div className="space-y-6">
        {/* Tabs de navigation */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Risques et Next Steps</CardTitle>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveRisquesTab('risques')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeRisquesTab === 'risques' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  Management des Risques
                </button>
                <button
                  onClick={() => setActiveRisquesTab('nextsteps')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeRisquesTab === 'nextsteps' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  Next Steps
                </button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Contenu selon l'onglet actif */}
        {activeRisquesTab === 'risques' ? <Risques /> : <NextSteps />}
      </div>
    );
  };

  const renderPlanningOld = () => {
    // Données complètes des 11 villes extraites du fichier Excel
    const villesData = [
      { 
        rang: 1, ville: 'Paris', flag: '🇫🇷', statut: 'GO',
        scoreReg: 10.00, impactSocial: 8.50, scoreROI: 5.46, 
        scoreDFI: 10.00, scoreCash: 6.66, scorePondere: 7.87,
        decision: 'RECOMMANDÉ', 
        forces: 'Liens CI, Convention fiscale', 
        risques: 'Perception néo-coloniale'
      },
      { 
        rang: 2, ville: 'Genève', flag: '🇨🇭', statut: 'GO',
        scoreReg: 10.00, impactSocial: 7.90, scoreROI: 5.92, 
        scoreDFI: 10.00, scoreCash: 6.85, scorePondere: 7.81,
        decision: 'RECOMMANDÉ', 
        forces: 'Finance hub, Standards durabilité', 
        risques: 'Coût, élitisme'
      },
      { 
        rang: 3, ville: 'Amsterdam', flag: '🇳🇱', statut: 'GO',
        scoreReg: 10.00, impactSocial: 7.75, scoreROI: 5.61, 
        scoreDFI: 9.00, scoreCash: 6.93, scorePondere: 7.65,
        decision: 'RECOMMANDÉ', 
        forces: 'Port #1 Europe cacao', 
        risques: 'Langue, distance culturelle'
      },
      { 
        rang: 4, ville: 'Singapour', flag: '🇸🇬', statut: 'GO',
        scoreReg: 8.00, impactSocial: 6.15, scoreROI: 10.00, 
        scoreDFI: 8.00, scoreCash: 7.16, scorePondere: 7.49,
        decision: 'POSSIBLE', 
        forces: 'GTP 5-10%, Hub Asie', 
        risques: 'Distance prohibitive'
      },
      { 
        rang: 5, ville: 'Hambourg', flag: '🇩🇪', statut: 'GO',
        scoreReg: 10.00, impactSocial: 6.75, scoreROI: 4.19, 
        scoreDFI: 6.00, scoreCash: 6.74, scorePondere: 6.78,
        decision: 'POSSIBLE', 
        forces: 'Port #2 Europe', 
        risques: 'Distance culturelle'
      },
      { 
        rang: 6, ville: 'Londres', flag: '🇬🇧', statut: 'GO',
        scoreReg: 8.00, impactSocial: 7.60, scoreROI: 3.34, 
        scoreDFI: 8.00, scoreCash: 6.47, scorePondere: 6.72,
        decision: 'POSSIBLE', 
        forces: 'Place financière majeure', 
        risques: 'Post-Brexit, coûts'
      },
      { 
        rang: 7, ville: 'Maurice', flag: '🇲🇺', statut: 'GO',
        scoreReg: 10.00, impactSocial: 7.50, scoreROI: 1.09, 
        scoreDFI: 7.00, scoreCash: 3.36, scorePondere: 5.62,
        decision: 'NON RECOMMANDÉ', 
        forces: 'Hub africain', 
        risques: 'Image offshore'
      },
      { 
        rang: 8, ville: 'Andorre', flag: '🇦🇩', statut: 'GO',
        scoreReg: 7.00, impactSocial: 3.40, scoreROI: 3.00, 
        scoreDFI: 2.00, scoreCash: 4.93, scorePondere: 4.20,
        decision: 'NON RECOMMANDÉ', 
        forces: 'Fiscalité 10%', 
        risques: 'Isolement total'
      },
      { 
        rang: 9, ville: 'Maroc CFC', flag: '🇲🇦', statut: 'NO GO',
        scoreReg: 3.00, impactSocial: 8.60, scoreROI: 0.00, 
        scoreDFI: 5.00, scoreCash: 0.00, scorePondere: 0.00,
        decision: 'NON RECOMMANDÉ', 
        forces: 'CFC 8,75%', 
        risques: 'Contrôle changes'
      },
      { 
        rang: 9, ville: 'Dubai', flag: '🇦🇪', statut: 'NO GO',
        scoreReg: 6.00, impactSocial: 5.10, scoreROI: 3.72, 
        scoreDFI: 4.00, scoreCash: 5.43, scorePondere: 0.00,
        decision: 'NON RECOMMANDÉ', 
        forces: 'Zone franche', 
        risques: 'Manque dimension sociale'
      },
      { 
        rang: 9, ville: 'Tel Aviv', flag: '🇮🇱', statut: 'NO GO',
        scoreReg: 5.00, impactSocial: 6.50, scoreROI: 2.55, 
        scoreDFI: 5.00, scoreCash: 6.17, scorePondere: 0.00,
        decision: 'NON RECOMMANDÉ', 
        forces: 'Tech hub', 
        risques: 'Géopolitique sensible'
      }
    ];

    // Pondération des critères
    const ponderationData = [
      { name: 'Impact Social', value: 30, color: '#4f46e5' },
      { name: 'Cash Management', value: 30, color: '#10b981' },
      { name: 'Réglementation', value: 15, color: '#f59e0b' },
      { name: 'ROI', value: 15, color: '#ef4444' },
      { name: 'Financement DFI', value: 10, color: '#6366f1' }
    ];

    // Données pour le radar chart (top 3)
    const radarData = [
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

    // Données des risques identifiés
    const risquesData = [
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
        probabilite: 'Nulle',
        mitigation: 'Convention France-CI active'
      },
      {
        type: 'Perte key people',
        impact: 'Moyen',
        probabilite: 'Moyenne',
        mitigation: 'Packages compétitifs, succession'
      }
    ];

    // Phases d'implémentation
    const phasesImplementation = [
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

    // KPIs de suivi
    const kpisData = [
      { kpi: 'VaR quotidienne', cible: '< 2%', description: 'Max risque portefeuille' },
      { kpi: 'Taux hedging', cible: '> 95%', description: 'Positions physiques' },
      { kpi: 'Limite spéculation', cible: '< 17%', description: '% du book total' },
      { kpi: 'ROE cible', cible: '> 15%', description: 'Retour sur capital' }
    ];

    // Métriques financières top 3
    const metriquesTop3 = {
      Paris: { ebitdaAn1: 0.52, roi3ans: 171.6, sgaTonne: 199, resultat3ans: 5.14 },
      Genève: { ebitdaAn1: -0.23, roi3ans: 187.5, sgaTonne: 261, resultat3ans: 5.13 },
      Amsterdam: { ebitdaAn1: 0.07, roi3ans: 176.8, sgaTonne: 206, resultat3ans: 4.82 }
    };

    return (
      <div className="space-y-6">
        {/* Vue d'ensemble avec recommandation */}
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              🎯 Décision Stratégique - Bureau Trading International Neskao
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-blue-900">
                Recommandation principale : Établir le bureau à Paris 🇫🇷
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-700">✅ Justifications clés</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Meilleur score global (7.87/10) selon les priorités NESKAO</li>
                    <li>• Maximisation de l'impact social via liens privilégiés CI</li>
                    <li>• Accès optimal aux financements développement (AFD/Proparco)</li>
                    <li>• Convention fiscale éliminant risque double imposition</li>
                    <li>• Rentabilité positive dès année 1 malgré charges élevées</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-orange-700">⚠️ Points d'attention</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Gérer perception néo-coloniale via communication transparente</li>
                    <li>• Optimiser charges sociales élevées (45%) via structure juridique</li>
                    <li>• Mobiliser capital initial 10M USD recommandé</li>
                    <li>• Recruter équipe multiculturelle reflétant valeurs inclusives</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tableau de classement complet des 11 villes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Analyse Comparative - 11 Localisations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Rang</th>
                    <th className="border p-2 text-left">Ville</th>
                    <th className="border p-2 text-center">Score Global</th>
                    <th className="border p-2 text-center">Décision</th>
                    <th className="border p-2 text-center">Réglem.</th>
                    <th className="border p-2 text-center">Impact Social</th>
                    <th className="border p-2 text-center">ROI</th>
                    <th className="border p-2 text-center">DFI</th>
                    <th className="border p-2 text-center">Cash</th>
                    <th className="border p-2 text-left">Forces</th>
                    <th className="border p-2 text-left">Risques</th>
                  </tr>
                </thead>
                <tbody>
                  {villesData.map((ville, index) => (
                    <tr 
                      key={index} 
                      className={
                        ville.decision === 'RECOMMANDÉ' ? 'bg-green-50' : 
                        ville.decision === 'POSSIBLE' ? 'bg-yellow-50' : 
                        'bg-red-50'
                      }
                    >
                      <td className="border p-2 text-center">{ville.rang}</td>
                      <td className="border p-2 font-semibold">{ville.flag} {ville.ville}</td>
                      <td className="border p-2 text-center font-bold">
                        {ville.scorePondere > 0 ? ville.scorePondere.toFixed(2) : 'N/A'}
                      </td>
                      <td className="border p-2 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          ville.decision === 'RECOMMANDÉ' ? 'bg-green-100 text-green-800' :
                          ville.decision === 'POSSIBLE' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {ville.decision}
                        </span>
                      </td>
                      <td className="border p-2 text-center">{ville.scoreReg.toFixed(1)}</td>
                      <td className="border p-2 text-center">{ville.impactSocial.toFixed(1)}</td>
                      <td className="border p-2 text-center">{ville.scoreROI.toFixed(2)}</td>
                      <td className="border p-2 text-center">{ville.scoreDFI.toFixed(1)}</td>
                      <td className="border p-2 text-center">{ville.scoreCash.toFixed(2)}</td>
                      <td className="border p-2 text-sm">{ville.forces}</td>
                      <td className="border p-2 text-sm">{ville.risques}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Légende pondération */}
            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Pondération des critères</h4>
              <div className="flex flex-wrap gap-4">
                {ponderationData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analyse multi-critères avec radar chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Analyse Multi-Critères - Top 3</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="critere" />
                  <PolarRadiusAxis angle={90} domain={[0, 10]} />
                  <Radar name="Paris" dataKey="Paris" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                  <Radar name="Genève" dataKey="Genève" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  <Radar name="Amsterdam" dataKey="Amsterdam" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Métriques Financières - Top 3</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Paris */}
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2 text-red-900">🇫🇷 Paris</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>EBITDA An 1:</span>
                      <span className="font-semibold text-green-700">{metriquesTop3.Paris.ebitdaAn1} M€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ROI 3 ans:</span>
                      <span className="font-semibold">{metriquesTop3.Paris.roi3ans}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SG&A/tonne:</span>
                      <span className="font-semibold">{metriquesTop3.Paris.sgaTonne}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Résultat 3 ans:</span>
                      <span className="font-semibold">{metriquesTop3.Paris.resultat3ans} M€</span>
                    </div>
                  </div>
                </div>

                {/* Genève */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2 text-blue-900">🇨🇭 Genève</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>EBITDA An 1:</span>
                      <span className="font-semibold text-red-700">{metriquesTop3.Genève.ebitdaAn1} M€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ROI 3 ans:</span>
                      <span className="font-semibold">{metriquesTop3.Genève.roi3ans}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SG&A/tonne:</span>
                      <span className="font-semibold">{metriquesTop3.Genève.sgaTonne}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Résultat 3 ans:</span>
                      <span className="font-semibold">{metriquesTop3.Genève.resultat3ans} M€</span>
                    </div>
                  </div>
                </div>

                {/* Amsterdam */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2 text-green-900">🇳🇱 Amsterdam</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>EBITDA An 1:</span>
                      <span className="font-semibold text-yellow-700">{metriquesTop3.Amsterdam.ebitdaAn1} M€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ROI 3 ans:</span>
                      <span className="font-semibold">{metriquesTop3.Amsterdam.roi3ans}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SG&A/tonne:</span>
                      <span className="font-semibold">{metriquesTop3.Amsterdam.sgaTonne}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Résultat 3 ans:</span>
                      <span className="font-semibold">{metriquesTop3.Amsterdam.resultat3ans} M€</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management des risques */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Management des Risques Identifiés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Type de risque</th>
                    <th className="border p-2 text-center">Impact</th>
                    <th className="border p-2 text-center">Probabilité</th>
                    <th className="border p-2 text-left">Mitigation</th>
                  </tr>
                </thead>
                <tbody>
                  {risquesData.map((risque, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="border p-2 font-medium">{risque.type}</td>
                      <td className="border p-2 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          risque.impact === 'Élevé' ? 'bg-red-100 text-red-800' :
                          risque.impact === 'Moyen' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {risque.impact}
                        </span>
                      </td>
                      <td className="border p-2 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          risque.probabilite === 'Élevée' ? 'bg-red-100 text-red-800' :
                          risque.probabilite === 'Moyenne' ? 'bg-yellow-100 text-yellow-800' :
                          risque.probabilite === 'Faible' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {risque.probabilite}
                        </span>
                      </td>
                      <td className="border p-2 text-sm">{risque.mitigation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Plan d'implémentation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Plan d'Implémentation Détaillé</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {phasesImplementation.map((phase, phaseIndex) => (
                <div key={phaseIndex} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-blue-900">
                      {phase.phase}: {phase.nom}
                    </h3>
                    <div className="flex gap-4 text-sm">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">{phase.duree}</span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-semibold">
                        Budget: {phase.budget}
                      </span>
                    </div>
                  </div>

                  {phase.actions && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-white">
                            <th className="border p-2 text-left">Action</th>
                            <th className="border p-2 text-left">Responsable</th>
                            <th className="border p-2 text-left">Livrable</th>
                            <th className="border p-2 text-right">Budget</th>
                          </tr>
                        </thead>
                        <tbody>
                          {phase.actions.map((action, actionIndex) => (
                            <tr key={actionIndex} className="bg-white">
                              <td className="border p-2">{action.action}</td>
                              <td className="border p-2 font-medium">{action.responsable}</td>
                              <td className="border p-2 text-gray-600">{action.livrable}</td>
                              <td className="border p-2 text-right font-semibold">{action.budget}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {phase.description && (
                    <ul className="mt-3 space-y-1">
                      {phase.description.map((desc, descIndex) => (
                        <li key={descIndex} className="text-sm flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* KPIs de suivi */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">KPIs de Suivi et Gouvernance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpisData.map((kpi, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">{kpi.kpi}</h4>
                  <p className="text-2xl font-bold text-purple-700 mb-1">{kpi.cible}</p>
                  <p className="text-sm text-gray-600">{kpi.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-yellow-800">🎯 Objectifs financiers sur 3 ans</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Volume cumulé:</span>
                  <span className="ml-2 font-bold">41,763 tonnes</span>
                </div>
                <div>
                  <span className="font-medium">CA cumulé:</span>
                  <span className="ml-2 font-bold">414.3 M€</span>
                </div>
                <div>
                  <span className="font-medium">Marge totale:</span>
                  <span className="ml-2 font-bold">17.6 M€</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prochaines étapes */}
        <Card className="bg-gradient-to-br from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-xl">🚀 Prochaines Étapes Immédiates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-green-700">Actions Mois 1</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Validation finale du Board Neskao</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Sélection cabinet juridique Paris (Gide, CMS, Baker McKenzie)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Ouverture dialogue AFD/Proparco pour financement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Lancement recrutement CEO bureau Paris</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-blue-700">Budget Initial Requis</h4>
                <div className="bg-white p-4 rounded-lg">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Capital initial recommandé:</span>
                      <span className="font-bold">10M USD</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ligne de crédit trading:</span>
                      <span className="font-bold">15M USD</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frais setup (6 mois):</span>
                      <span className="font-bold">2.7M USD</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold">Total financement An 1:</span>
                      <span className="font-bold text-lg">27.7M USD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Section Analyse Décisionnelle
  const renderAnalyseDecisionnelle = () => {
    // Données complètes des 12 localités
    const villesCompletes = [
      { rang: 1, ville: 'Paris', flag: '🇫🇷', scoreReg: 10, impactSocial: 8.5, scoreROI: 5.46, scoreDFI: 10, scoreCash: 6.66, scorePondere: 7.87, statut: 'RECOMMANDÉ', forces: 'Liens CI, Convention fiscale', risques: 'Perception néo-coloniale' },
      { rang: 2, ville: 'Genève', flag: '🇨🇭', scoreReg: 10, impactSocial: 7.9, scoreROI: 5.92, scoreDFI: 10, scoreCash: 6.85, scorePondere: 7.81, statut: 'RECOMMANDÉ', forces: 'Finance hub, Standards durabilité', risques: 'Coûts élevés, élitisme' },
      { rang: 3, ville: 'Amsterdam', flag: '🇳🇱', scoreReg: 10, impactSocial: 7.75, scoreROI: 5.61, scoreDFI: 9, scoreCash: 6.93, scorePondere: 7.65, statut: 'RECOMMANDÉ', forces: 'Port #1 Europe cacao', risques: 'Langue, distance culturelle' },
      { rang: 4, ville: 'Singapour', flag: '🇸🇬', scoreReg: 8, impactSocial: 6.15, scoreROI: 10, scoreDFI: 8, scoreCash: 7.16, scorePondere: 7.49, statut: 'POSSIBLE', forces: 'GTP 5-10%, Hub Asie', risques: 'Distance prohibitive' },
      { rang: 5, ville: 'Hambourg', flag: '🇩🇪', scoreReg: 10, impactSocial: 6.75, scoreROI: 4.19, scoreDFI: 6, scoreCash: 6.74, scorePondere: 6.78, statut: 'POSSIBLE', forces: 'Port #2 Europe', risques: 'Distance culturelle' },
      { rang: 6, ville: 'Londres', flag: '🇬🇧', scoreReg: 8, impactSocial: 7.6, scoreROI: 3.34, scoreDFI: 8, scoreCash: 6.47, scorePondere: 6.72, statut: 'POSSIBLE', forces: 'Place financière majeure', risques: 'Post-Brexit, coûts élevés' },
      { rang: 7, ville: 'Maurice', flag: '🇲🇺', scoreReg: 10, impactSocial: 7.5, scoreROI: 1.09, scoreDFI: 7, scoreCash: 3.36, scorePondere: 5.62, statut: 'NON RECOMMANDÉ', forces: 'Hub africain', risques: 'Image offshore' },
      { rang: 8, ville: 'Andorre', flag: '🇦🇩', scoreReg: 7, impactSocial: 3.4, scoreROI: 3.00, scoreDFI: 2, scoreCash: 4.93, scorePondere: 4.20, statut: 'NON RECOMMANDÉ', forces: 'Fiscalité 10%', risques: 'Isolement total' },
      { rang: 9, ville: 'Maroc CFC', flag: '🇲🇦', scoreReg: 3, impactSocial: 8.6, scoreROI: 0, scoreDFI: 5, scoreCash: 0, scorePondere: 0, statut: 'NON RECOMMANDÉ', forces: 'CFC 8.75%', risques: 'Contrôle des changes' },
      { rang: 9, ville: 'Dubai', flag: '🇦🇪', scoreReg: 6, impactSocial: 5.1, scoreROI: 3.72, scoreDFI: 4, scoreCash: 5.43, scorePondere: 0, statut: 'NON RECOMMANDÉ', forces: 'Zone franche', risques: 'Manque dimension sociale' },
      { rang: 9, ville: 'Tel Aviv', flag: '🇮🇱', scoreReg: 5, impactSocial: 6.5, scoreROI: 2.55, scoreDFI: 5, scoreCash: 6.17, scorePondere: 0, statut: 'NON RECOMMANDÉ', forces: 'Tech hub', risques: 'Géopolitique sensible' }
    ];

    // Données pour le spider chart (top 5)
    const spiderData = [
      { subject: 'Réglementation', Paris: 10, Genève: 10, Amsterdam: 10, Singapour: 8, Hambourg: 10 },
      { subject: 'Impact Social', Paris: 8.5, Genève: 7.9, Amsterdam: 7.75, Singapour: 6.15, Hambourg: 6.75 },
      { subject: 'Rentabilité (ROI)', Paris: 5.46, Genève: 5.92, Amsterdam: 5.61, Singapour: 10, Hambourg: 4.19 },
      { subject: 'Financement (DFI)', Paris: 10, Genève: 10, Amsterdam: 9, Singapour: 8, Hambourg: 6 },
      { subject: 'Cash Management', Paris: 6.66, Genève: 6.85, Amsterdam: 6.93, Singapour: 7.16, Hambourg: 6.74 }
    ];

    // Pondération des critères
    const ponderationData = [
      { name: 'Impact Social', value: 30, color: '#4f46e5' },
      { name: 'Cash Management', value: 30, color: '#10b981' },
      { name: 'Réglementation', value: 15, color: '#f59e0b' },
      { name: 'ROI', value: 15, color: '#ef4444' },
      { name: 'Financement DFI', value: 10, color: '#6366f1' }
    ];

    // Métriques financières top 3
    const metriquesTop3 = {
      paris: { 
        ebitda: 0.52, 
        roi3ans: 171.5, 
        sgaTonne: 199,
        resultat3ans: 5.14,
        sgaTotal3ans: 3.99
      },
      geneve: { 
        ebitda: -0.23, 
        roi3ans: 187.4, 
        sgaTonne: 261,
        resultat3ans: 5.13,
        sgaTotal3ans: 5.26
      },
      amsterdam: { 
        ebitda: 0.07, 
        roi3ans: 176.8, 
        sgaTonne: 206,
        resultat3ans: 4.82,
        sgaTotal3ans: 4.35
      }
    };

    return (
      <div className="space-y-6">
        {/* Titre et introduction */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Analyse Décisionnelle - Bureau Trading International</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Évaluation multicritères de 12 localisations potentielles pour l'établissement du bureau de trading international Neskao.
              L'analyse intègre les dimensions réglementaires, financières, opérationnelles et d'impact social.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm font-semibold text-blue-900">Méthodologie de scoring :</p>
              <p className="text-sm text-blue-800">
                Score pondéré sur 10 points intégrant : Impact Social (30%), Cash Management (30%), 
                Réglementation (15%), ROI (15%) et Accès Financements DFI (10%)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tableau de classement complet */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Classement Global - 12 Localisations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Rang</th>
                    <th className="border p-2 text-left">Ville</th>
                    <th className="border p-2">Score Global</th>
                    <th className="border p-2">Décision</th>
                    <th className="border p-2">Réglem.</th>
                    <th className="border p-2">Impact Social</th>
                    <th className="border p-2">ROI</th>
                    <th className="border p-2">DFI</th>
                    <th className="border p-2">Cash</th>
                    <th className="border p-2 text-left">Forces</th>
                    <th className="border p-2 text-left">Risques</th>
                  </tr>
                </thead>
                <tbody>
                  {villesCompletes.map((ville, index) => (
                    <tr key={index} className={
                      ville.statut === 'RECOMMANDÉ' ? 'bg-green-50' : 
                      ville.statut === 'POSSIBLE' ? 'bg-yellow-50' : 
                      'bg-red-50'
                    }>
                      <td className="border p-2">{ville.rang}</td>
                      <td className="border p-2 font-semibold">{ville.ville} {ville.flag}</td>
                      <td className="border p-2 text-center font-bold">
                        {ville.scorePondere > 0 ? ville.scorePondere.toFixed(2) : 'N/A'}
                      </td>
                      <td className="border p-2 text-center">
                        <span className={`px-2 py-1 rounded text-sm ${
                          ville.statut === 'RECOMMANDÉ' ? 'bg-green-100 text-green-800' :
                          ville.statut === 'POSSIBLE' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {ville.statut}
                        </span>
                      </td>
                      <td className="border p-2 text-center">{ville.scoreReg}</td>
                      <td className="border p-2 text-center">{ville.impactSocial}</td>
                      <td className="border p-2 text-center">{ville.scoreROI.toFixed(2)}</td>
                      <td className="border p-2 text-center">{ville.scoreDFI}</td>
                      <td className="border p-2 text-center">{ville.scoreCash.toFixed(2)}</td>
                      <td className="border p-2 text-sm">{ville.forces}</td>
                      <td className="border p-2 text-sm">{ville.risques}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Graphiques d'analyse */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Spider Chart Top 5 */}
          <Card>
            <CardHeader>
              <CardTitle>Analyse Comparative - Top 5</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={spiderData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 10]} />
                  <Radar name="Paris" dataKey="Paris" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                  <Radar name="Genève" dataKey="Genève" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  <Radar name="Amsterdam" dataKey="Amsterdam" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  <Radar name="Singapour" dataKey="Singapour" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
                  <Radar name="Hambourg" dataKey="Hambourg" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pondération des critères */}
          <Card>
            <CardHeader>
              <CardTitle>Pondération des Critères de Décision</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={ponderationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {ponderationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Métriques clés Top 3 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Métriques Financières Clés - Top 3</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Paris */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-red-900">🇫🇷 Paris</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">EBITDA An 1</span>
                    <span className="font-bold text-green-700">0.52 M€</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">ROI 3 ans</span>
                    <span className="font-bold text-blue-700">171.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">SG&A/tonne</span>
                    <span className="font-bold">199 €</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Résultat 3 ans</span>
                    <span className="font-bold">5.14 M€</span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-red-200">
                    <p className="text-xs text-gray-600">Volume An 1: 6,490 tonnes</p>
                    <p className="text-xs text-gray-600">CA An 1: 54.18 M€</p>
                  </div>
                </div>
              </div>

              {/* Genève */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-900">🇨🇭 Genève</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">EBITDA An 1</span>
                    <span className="font-bold text-red-700">-0.23 M€</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">ROI 3 ans</span>
                    <span className="font-bold text-blue-700">187.4%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">SG&A/tonne</span>
                    <span className="font-bold">261 €</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Résultat 3 ans</span>
                    <span className="font-bold">5.13 M€</span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-blue-200">
                    <p className="text-xs text-gray-600">Volume An 1: 6,490 tonnes</p>
                    <p className="text-xs text-gray-600">CA An 1: 54.18 M€</p>
                  </div>
                </div>
              </div>

              {/* Amsterdam */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-green-900">🇳🇱 Amsterdam</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">EBITDA An 1</span>
                    <span className="font-bold text-yellow-700">0.07 M€</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">ROI 3 ans</span>
                    <span className="font-bold text-blue-700">176.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">SG&A/tonne</span>
                    <span className="font-bold">206 €</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Résultat 3 ans</span>
                    <span className="font-bold">4.82 M€</span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-green-200">
                    <p className="text-xs text-gray-600">Volume An 1: 6,490 tonnes</p>
                    <p className="text-xs text-gray-600">CA An 1: 54.18 M€</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommandation finale */}
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="text-2xl">🎯 Recommandation Finale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-xl font-bold mb-3 text-blue-900">
                  Établir le bureau de trading à Paris 🇫🇷
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold mb-2 text-green-700">✅ Justification principale :</h5>
                    <ul className="space-y-2 text-sm">
                      <li>• Meilleur score global (7.87/10) selon les priorités NESKAO</li>
                      <li>• Maximisation de l'impact social via liens privilégiés CI</li>
                      <li>• Accès optimal aux financements développement (AFD/Proparco)</li>
                      <li>• Convention fiscale éliminant risque double imposition</li>
                      <li>• Rentabilité positive dès année 1 (EBITDA: 0.52 M€)</li>
                      <li>• Écosystème commerce équitable mature</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2 text-orange-700">⚠️ Points d'attention :</h5>
                    <ul className="space-y-2 text-sm">
                      <li>• Gérer perception néo-coloniale via communication transparente</li>
                      <li>• Optimiser charges sociales élevées (45%) via structure juridique</li>
                      <li>• Mobiliser capital initial 10M USD recommandé</li>
                      <li>• Recruter équipe multiculturelle reflétant valeurs inclusives</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">🔄 Alternative: Genève</h5>
                  <p className="text-sm">
                    Si l'image est prioritaire, Genève offre la neutralité suisse et un meilleur ROI (187.4%),
                    mais avec des coûts opérationnels prohibitifs (SG&A: 261€/tonne).
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">🚢 Option pragmatique: Amsterdam</h5>
                  <p className="text-sm">
                    Pour une approche logistique pure, Amsterdam combine infrastructure portuaire #1 
                    et équilibre coûts/bénéfices, mais avec moins d'impact social.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Section Impact Social
  const renderImpact = () => {
    // Données complètes pour les 12 localités
    const impactScores = [
      { ville: 'Maroc CFC', score: 8.6, region: 'Afrique/MO', statut: 'NO GO', color: '#dc2626' },
      { ville: 'Paris', score: 8.5, region: 'Europe', statut: 'RECOMMANDÉ', color: '#10b981' },
      { ville: 'Genève', score: 7.9, region: 'Europe', statut: 'RECOMMANDÉ', color: '#10b981' },
      { ville: 'Amsterdam', score: 7.75, region: 'Europe', statut: 'RECOMMANDÉ', color: '#10b981' },
      { ville: 'Londres', score: 7.6, region: 'Europe', statut: 'POSSIBLE', color: '#f59e0b' },
      { ville: 'Maurice', score: 7.5, region: 'Afrique/MO', statut: 'POSSIBLE', color: '#f59e0b' },
      { ville: 'Hambourg', score: 6.75, region: 'Europe', statut: 'POSSIBLE', color: '#f59e0b' },
      { ville: 'Tel Aviv', score: 6.5, region: 'Afrique/MO', statut: 'NO GO', color: '#dc2626' },
      { ville: 'Singapour', score: 6.15, region: 'Asie', statut: 'POSSIBLE', color: '#f59e0b' },
      { ville: 'Dubai', score: 5.1, region: 'Afrique/MO', statut: 'NO GO', color: '#dc2626' },
      { ville: 'Andorre', score: 3.4, region: 'Europe', statut: 'NO GO', color: '#dc2626' }
    ];

    // Données de pondération des critères
    const criteresData = [
      { name: 'Proximité CI', value: 20, color: '#8b5cf6' },
      { name: 'Écosystème ESG', value: 15, color: '#3b82f6' },
      { name: 'Financements Impact', value: 15, color: '#10b981' },
      { name: 'Emploi/Formation CI', value: 15, color: '#f59e0b' },
      { name: 'Transparence Fiscale', value: 15, color: '#ef4444' },
      { name: 'Influence Politique', value: 10, color: '#6366f1' },
      { name: 'Partenariats Locaux', value: 10, color: '#14b8a6' }
    ];

    // Détails par ville
    const villesDetails = {
      'Paris': {
        scores: {
          proximite: 9,
          ecosysteme: 8,
          financement: 9,
          emploi: 9,
          transparence: 8,
          influence: 8,
          partenariats: 8
        },
        forces: [
          'Liens historiques forts avec CI',
          '150K diaspora ivoirienne',
          'Vols directs quotidiens',
          'AFD/Proparco siège',
          'Campus France actif'
        ],
        risques: [
          'Perception néo-coloniale',
          'Charges sociales élevées'
        ]
      },
      'Genève': {
        scores: {
          proximite: 7,
          ecosysteme: 9,
          financement: 9,
          emploi: 7,
          transparence: 7,
          influence: 9,
          partenariats: 8
        },
        forces: [
          'Hub mondial développement',
          'Siège nombreux DFI',
          'Standards suisses reconnus',
          'UN/ILO/WTO présence'
        ],
        risques: [
          'Coûts très élevés',
          'Image élitiste',
          'Barrières permis travail'
        ]
      },
      'Amsterdam': {
        scores: {
          proximite: 6,
          ecosysteme: 9,
          financement: 8,
          emploi: 8,
          transparence: 8,
          influence: 7,
          partenariats: 9
        },
        forces: [
          'Port #1 Europe cacao',
          'Tony\'s Chocolonely ecosystem',
          'Innovation ESG leader',
          'Pragmatisme business'
        ],
        risques: [
          'Barrière linguistique',
          'Distance culturelle'
        ]
      },
      'Londres': {
        scores: {
          proximite: 6,
          ecosysteme: 9,
          financement: 8,
          emploi: 6,
          transparence: 9,
          influence: 8,
          partenariats: 8
        },
        forces: [
          'Fairtrade UK leader',
          'Standards transparence',
          'Soft power global',
          'Divine Chocolate model'
        ],
        risques: [
          'Post-Brexit complexités',
          'Coûts prohibitifs'
        ]
      },
      'Hambourg': {
        scores: {
          proximite: 5,
          ecosysteme: 7,
          financement: 7,
          emploi: 6,
          transparence: 9,
          influence: 7,
          partenariats: 7
        },
        forces: [
          'Port expertise',
          'Rigueur allemande',
          'KfW DEG présence'
        ],
        risques: [
          'Distance culturelle',
          'Peu de liens CI',
          'Barrière langue'
        ]
      },
      'Maurice': {
        scores: {
          proximite: 8,
          ecosysteme: 7,
          financement: 8,
          emploi: 9,
          transparence: 6,
          influence: 7,
          partenariats: 7
        },
        forces: [
          'Solidarité africaine',
          'Hub régional Afrique',
          'Échanges Sud-Sud naturels',
          'Francophone'
        ],
        risques: [
          'Image offshore',
          'Capacités limitées'
        ]
      },
      'Maroc CFC': {
        scores: {
          proximite: 9,
          ecosysteme: 8,
          financement: 9,
          emploi: 10,
          transparence: 6,
          influence: 8,
          partenariats: 9
        },
        forces: [
          'Coopération Sud-Sud authentique',
          'Francophone',
          'Bourses étudiants CI',
          'OCP modèle ESG'
        ],
        risques: [
          'Contrôle des changes',
          'Statut NO GO (fiscal)'
        ]
      },
      'Tel Aviv': {
        scores: {
          proximite: 5,
          ecosysteme: 9,
          financement: 7,
          emploi: 5,
          transparence: 7,
          influence: 6,
          partenariats: 8
        },
        forces: [
          'Innovation agritech leader',
          'Netafim modèle',
          'VC ecosystem fort'
        ],
        risques: [
          'Géopolitique sensible',
          'Distance culturelle'
        ]
      },
      'Singapour': {
        scores: {
          proximite: 4,
          ecosysteme: 8,
          financement: 8,
          emploi: 5,
          transparence: 7,
          influence: 8,
          partenariats: 7
        },
        forces: [
          'Excellence standards',
          'Hub trading Asie',
          'Stabilité juridique'
        ],
        risques: [
          'Distance prohibitive',
          'Peu de liens CI'
        ]
      },
      'Dubai': {
        scores: {
          proximite: 4,
          ecosysteme: 5,
          financement: 6,
          emploi: 5,
          transparence: 6,
          influence: 5,
          partenariats: 5
        },
        forces: [
          'Hub commercial régional',
          'Infrastructures modernes'
        ],
        risques: [
          'Manque dimension sociale',
          'Distance culturelle'
        ]
      },
      'Andorre': {
        scores: {
          proximite: 4,
          ecosysteme: 3,
          financement: 3,
          emploi: 3,
          transparence: 5,
          influence: 2,
          partenariats: 3
        },
        forces: [
          'Fiscalité attractive'
        ],
        risques: [
          'Isolement total',
          'Écosystème minimal',
          'Aucun lien CI'
        ]
      }
    };

    // Spider data pour top 5
    const spiderData = [
      { 
        critere: 'Proximité CI',
        Paris: villesDetails['Paris'].scores.proximite,
        Genève: villesDetails['Genève'].scores.proximite,
        Amsterdam: villesDetails['Amsterdam'].scores.proximite,
        Londres: villesDetails['Londres'].scores.influence,
        Maurice: villesDetails['Maurice'].scores.proximite
      },
      { 
        critere: 'Écosystème ESG',
        Paris: villesDetails['Paris'].scores.ecosysteme,
        Genève: villesDetails['Genève'].scores.ecosysteme,
        Amsterdam: villesDetails['Amsterdam'].scores.ecosysteme,
        Londres: villesDetails['Londres'].scores.ecosysteme,
        Maurice: villesDetails['Maurice'].scores.ecosysteme
      },
      { 
        critere: 'Financements',
        Paris: villesDetails['Paris'].scores.financement,
        Genève: villesDetails['Genève'].scores.financement,
        Amsterdam: villesDetails['Amsterdam'].scores.financement,
        Londres: villesDetails['Londres'].scores.financement,
        Maurice: villesDetails['Maurice'].scores.financement
      },
      { 
        critere: 'Emploi/Formation',
        Paris: villesDetails['Paris'].scores.emploi,
        Genève: villesDetails['Genève'].scores.emploi,
        Amsterdam: villesDetails['Amsterdam'].scores.emploi,
        Londres: villesDetails['Londres'].scores.emploi,
        Maurice: villesDetails['Maurice'].scores.emploi
      },
      { 
        critere: 'Transparence',
        Paris: villesDetails['Paris'].scores.transparence,
        Genève: villesDetails['Genève'].scores.transparence,
        Amsterdam: villesDetails['Amsterdam'].scores.transparence,
        Londres: villesDetails['Londres'].scores.transparence,
        Maurice: villesDetails['Maurice'].scores.transparence
      },
      { 
        critere: 'Influence',
        Paris: villesDetails['Paris'].scores.influence,
        Genève: villesDetails['Genève'].scores.influence,
        Amsterdam: villesDetails['Amsterdam'].scores.influence,
        Londres: villesDetails['Londres'].scores.influence,
        Maurice: villesDetails['Maurice'].scores.influence
      }
    ];

    return (
      <div className="space-y-6">
        {/* Vue d'ensemble */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Analyse d'Impact Social</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-gray-600">
                Évaluation de l'impact social du bureau de trading sur la Côte d'Ivoire et les communautés cacaoyères.
                Score basé sur 7 critères pondérés mesurant la capacité à créer de la valeur partagée.
              </p>
            </div>

            {/* Graphique comparatif des 12 villes */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Scores d'Impact Social - 12 Localisations</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={impactScores} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="ville" 
                    angle={-45} 
                    textAnchor="end" 
                    height={100}
                  />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Bar 
                    dataKey="score" 
                    fill={(entry) => entry.color}
                    label={{ position: 'top' }}
                  >
                    {impactScores.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Légende des statuts */}
            <div className="flex gap-4 justify-center mb-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm">Recommandé</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-sm">Possible</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-600 rounded"></div>
                <span className="text-sm">Non recommandé</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Critères d'évaluation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Pondération des Critères</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={criteresData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {criteresData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Description des Critères</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold text-purple-600">Proximité CI (20%):</span>
                  <p className="text-gray-600">Liens historiques, diaspora, accessibilité, langue</p>
                </div>
                <div>
                  <span className="font-semibold text-blue-600">Écosystème ESG (15%):</span>
                  <p className="text-gray-600">ONGs, certifications, entreprises sociales</p>
                </div>
                <div>
                  <span className="font-semibold text-green-600">Financements Impact (15%):</span>
                  <p className="text-gray-600">DFI, fonds impact, programmes publics</p>
                </div>
                <div>
                  <span className="font-semibold text-yellow-600">Emploi/Formation CI (15%):</span>
                  <p className="text-gray-600">Stages, échanges universitaires, formation</p>
                </div>
                <div>
                  <span className="font-semibold text-red-600">Transparence Fiscale (15%):</span>
                  <p className="text-gray-600">Éthique fiscale, échange info, anti-corruption</p>
                </div>
                <div>
                  <span className="font-semibold text-indigo-600">Influence Politique (10%):</span>
                  <p className="text-gray-600">Plaidoyer, réseaux, médias, forums</p>
                </div>
                <div>
                  <span className="font-semibold text-teal-600">Partenariats Locaux (10%):</span>
                  <p className="text-gray-600">Universités, coopératives, innovation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analyse comparative Top 5 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Analyse Multi-Critères - Top 5</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={spiderData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="critere" />
                <PolarRadiusAxis angle={90} domain={[0, 10]} />
                <Radar name="Paris" dataKey="Paris" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                <Radar name="Genève" dataKey="Genève" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Radar name="Amsterdam" dataKey="Amsterdam" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                <Radar name="Londres" dataKey="Londres" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                <Radar name="Maurice" dataKey="Maurice" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top 3 détaillé */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Top 3 - Analyse Détaillée</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Paris */}
            <Card className="border-2 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>🇫🇷 Paris</span>
                  <span className="text-2xl font-bold text-green-700">8.5/10</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Forces principales</h4>
                    <ul className="text-sm space-y-1">
                      {villesDetails['Paris'].forces.map((force, i) => (
                        <li key={i}>✅ {force}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-700 mb-2">Points d'attention</h4>
                    <ul className="text-sm space-y-1">
                      {villesDetails['Paris'].risques.map((risque, i) => (
                        <li key={i}>⚠️ {risque}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Genève */}
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>🇨🇭 Genève</span>
                  <span className="text-2xl font-bold text-blue-700">7.9/10</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Forces principales</h4>
                    <ul className="text-sm space-y-1">
                      {villesDetails['Genève'].forces.map((force, i) => (
                        <li key={i}>✅ {force}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-700 mb-2">Points d'attention</h4>
                    <ul className="text-sm space-y-1">
                      {villesDetails['Genève'].risques.map((risque, i) => (
                        <li key={i}>⚠️ {risque}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amsterdam */}
            <Card className="border-2 border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>🇳🇱 Amsterdam</span>
                  <span className="text-2xl font-bold text-yellow-700">7.75/10</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-yellow-700 mb-2">Forces principales</h4>
                    <ul className="text-sm space-y-1">
                      {villesDetails['Amsterdam'].forces.map((force, i) => (
                        <li key={i}>✅ {force}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-700 mb-2">Points d'attention</h4>
                    <ul className="text-sm space-y-1">
                      {villesDetails['Amsterdam'].risques.map((risque, i) => (
                        <li key={i}>⚠️ {risque}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Impact économique Côte d'Ivoire */}
        <Card className="bg-purple-50 border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="text-xl text-purple-800">Impact Économique pour la Côte d'Ivoire</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Emplois directs CI</p>
                <p className="text-3xl font-bold text-purple-700">15-20</p>
                <p className="text-xs text-gray-500">An 1</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Jeunes formés/an</p>
                <p className="text-3xl font-bold text-purple-700">50+</p>
                <p className="text-xs text-gray-500">Stages & alternance</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Valeur ajoutée locale</p>
                <p className="text-3xl font-bold text-purple-700">+15%</p>
                <p className="text-xs text-gray-500">Sur prix export</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Revenus producteurs</p>
                <p className="text-3xl font-bold text-purple-700">+8-12%</p>
                <p className="text-xs text-gray-500">Via primes durabilité</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <h4 className="font-semibold text-purple-800">Bénéfices stratégiques pour la CI</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">▸</span>
                  <span><strong>Montée en compétences:</strong> Formation d'une nouvelle génération de traders ivoiriens sur les marchés internationaux</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">▸</span>
                  <span><strong>Visibilité internationale:</strong> Positionnement de la CI comme acteur sophistiqué du marché mondial</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">▸</span>
                  <span><strong>Transfert de technologie:</strong> Introduction des meilleures pratiques de trading et gestion des risques</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">▸</span>
                  <span><strong>Accès aux financements:</strong> Mobilisation de capitaux internationaux pour le secteur cacao</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Recommandations finales */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Recommandations Impact Social</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-green-100 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Recommandation principale</h4>
                <p className="text-sm">
                  <strong>Paris</strong> offre le meilleur équilibre entre impact social élevé (8.5/10) et faisabilité opérationnelle. 
                  Les liens historiques et la présence de l'AFD/Proparco créent un écosystème unique pour maximiser l'impact sur les communautés cacaoyères.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-2">Actions prioritaires</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Établir partenariat avec Campus France</li>
                    <li>• Créer programme stages grandes écoles</li>
                    <li>• Développer filière formation trading CI</li>
                    <li>• Mobiliser diaspora comme ambassadeurs</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-yellow-800 mb-2">KPIs à suivre</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Nombre de jeunes CI formés</li>
                    <li>• % revenus réinvestis en CI</li>
                    <li>• Primes durabilité versées</li>
                    <li>• Partenariats locaux actifs</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Section Rentabilité
  const renderRentabilite = () => {
    // Données EBITDA pour toutes les villes (en millions EUR)
    const ebitdaData = [
      { ville: 'Paris', an1: 0.52, an2: 2.84, an3: 9.93, roi3ans: 171.6, irr: 38, payback: 2.3 },
      { ville: 'Genève', an1: -0.23, an2: 2.34, an3: 9.09, roi3ans: 187.5, irr: 40, payback: 2.5 },
      { ville: 'Amsterdam', an1: 0.07, an2: 2.56, an3: 9.40, roi3ans: 176.8, irr: 39, payback: 2.4 },
      { ville: 'Londres', an1: -0.67, an2: 1.86, an3: 8.47, roi3ans: 133.4, irr: 32, payback: 2.8 },
      { ville: 'Hambourg', an1: 0.09, an2: 2.57, an3: 9.38, roi3ans: 141.9, irr: 34, payback: 2.6 },
      { ville: 'Andorre', an1: 0.76, an2: 3.25, an3: 10.25, roi3ans: 120.1, irr: 30, payback: 2.2 },
      { ville: 'Maurice', an1: 0.82, an2: 3.29, an3: 10.29, roi3ans: 104.4, irr: 28, payback: 2.1 },
      { ville: 'Maroc CFC', an1: 0.93, an2: 3.40, an3: 10.43, roi3ans: 95.2, irr: 25, payback: 2.0 },
      { ville: 'Dubai', an1: 0.00, an2: 2.52, an3: 9.31, roi3ans: 149.0, irr: 35, payback: 2.7 },
      { ville: 'Tel Aviv', an1: -0.06, an2: 2.44, an3: 9.16, roi3ans: 101.8, irr: 27, payback: 2.8 },
      { ville: 'Singapour', an1: 0.02, an2: 2.58, an3: 9.40, roi3ans: 200.0, irr: 42, payback: 2.5 },
      { ville: 'Casablanca', an1: 0.45, an2: 2.95, an3: 9.85, roi3ans: 155.0, irr: 36, payback: 2.3 }
    ];

    // Données pour les graphiques
    const top3Data = ebitdaData.filter(v => ['Paris', 'Genève', 'Amsterdam'].includes(v.ville));
    
    // Préparer les données pour le graphique d'évolution EBITDA
    const evolutionData = [
      { 
        annee: 'An 1', 
        Paris: 0.52, 
        Genève: -0.23, 
        Amsterdam: 0.07,
        Londres: -0.67,
        Singapour: 0.02
      },
      { 
        annee: 'An 2', 
        Paris: 2.84, 
        Genève: 2.34, 
        Amsterdam: 2.56,
        Londres: 1.86,
        Singapour: 2.58
      },
      { 
        annee: 'An 3', 
        Paris: 9.93, 
        Genève: 9.09, 
        Amsterdam: 9.40,
        Londres: 8.47,
        Singapour: 9.40
      }
    ];

    // Données scores (sur 10) depuis la matrice décisionnelle
    const scoresData = [
      { ville: 'Paris', scoreROI: 5.46, scorePondere: 7.87, statut: 'RECOMMANDÉ' },
      { ville: 'Genève', scoreROI: 5.92, scorePondere: 7.81, statut: 'RECOMMANDÉ' },
      { ville: 'Amsterdam', scoreROI: 5.61, scorePondere: 7.65, statut: 'RECOMMANDÉ' },
      { ville: 'Londres', scoreROI: 3.34, scorePondere: 6.72, statut: 'POSSIBLE' },
      { ville: 'Hambourg', scoreROI: 4.19, scorePondere: 6.78, statut: 'POSSIBLE' },
      { ville: 'Singapour', scoreROI: 10.00, scorePondere: 7.49, statut: 'POSSIBLE' },
      { ville: 'Andorre', scoreROI: 3.00, scorePondere: 4.20, statut: 'DÉCONSEILLÉ' },
      { ville: 'Maurice', scoreROI: 1.09, scorePondere: 5.62, statut: 'DÉCONSEILLÉ' },
      { ville: 'Maroc CFC', scoreROI: 0.00, scorePondere: 0.00, statut: 'NON RECOMMANDÉ' },
      { ville: 'Dubai', scoreROI: 3.72, scorePondere: 0.00, statut: 'NON RECOMMANDÉ' },
      { ville: 'Tel Aviv', scoreROI: 2.55, scorePondere: 0.00, statut: 'NON RECOMMANDÉ' },
      { ville: 'Casablanca', scoreROI: 3.88, scorePondere: 5.45, statut: 'DÉCONSEILLÉ' }
    ];

    return (
      <div className="space-y-6">
        {/* Métriques clés Top 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader>
              <CardTitle className="text-green-800">Paris 🇫🇷</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-green-600">ROI 3 ans</p>
                  <p className="text-2xl font-bold text-green-900">171.6%</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-green-600">IRR</p>
                    <p className="font-semibold text-green-800">38%</p>
                  </div>
                  <div>
                    <p className="text-green-600">Payback</p>
                    <p className="font-semibold text-green-800">2.3 ans</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-green-200">
                  <p className="text-xs text-green-700">EBITDA An 3: 9.93 M€</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-800">Genève 🇨🇭</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-blue-600">ROI 3 ans</p>
                  <p className="text-2xl font-bold text-blue-900">187.5%</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-blue-600">IRR</p>
                    <p className="font-semibold text-blue-800">40%</p>
                  </div>
                  <div>
                    <p className="text-blue-600">Payback</p>
                    <p className="font-semibold text-blue-800">2.5 ans</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-blue-200">
                  <p className="text-xs text-blue-700">EBITDA An 3: 9.09 M€</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
            <CardHeader>
              <CardTitle className="text-orange-800">Amsterdam 🇳🇱</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-orange-600">ROI 3 ans</p>
                  <p className="text-2xl font-bold text-orange-900">176.8%</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-orange-600">IRR</p>
                    <p className="font-semibold text-orange-800">39%</p>
                  </div>
                  <div>
                    <p className="text-orange-600">Payback</p>
                    <p className="font-semibold text-orange-800">2.4 ans</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-orange-200">
                  <p className="text-xs text-orange-700">EBITDA An 3: 9.40 M€</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Évolution EBITDA */}
          <Card>
            <CardHeader>
              <CardTitle>Évolution EBITDA - Top 5 Villes</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={evolutionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="annee" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value} M€`} />
                  <Legend />
                  <Line type="monotone" dataKey="Paris" stroke="#10b981" strokeWidth={3} />
                  <Line type="monotone" dataKey="Genève" stroke="#3b82f6" strokeWidth={3} />
                  <Line type="monotone" dataKey="Amsterdam" stroke="#f97316" strokeWidth={3} />
                  <Line type="monotone" dataKey="Londres" stroke="#6366f1" strokeWidth={2} strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="Singapour" stroke="#ec4899" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Comparaison ROI */}
          <Card>
            <CardHeader>
              <CardTitle>ROI 3 ans - Toutes Localisations</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                  data={ebitdaData.sort((a, b) => b.roi3ans - a.roi3ans)}
                  layout="horizontal"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="roi3ans" />
                  <YAxis dataKey="ville" type="category" width={80} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Bar dataKey="roi3ans" fill="#4f46e5">
                    {ebitdaData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={
                          entry.roi3ans >= 170 ? '#10b981' : 
                          entry.roi3ans >= 140 ? '#f59e0b' : 
                          '#ef4444'
                        } 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Tableau comparatif complet */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Analyse Comparative - 12 Localisations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Ville</th>
                    <th className="border p-2 text-center">Statut</th>
                    <th className="border p-2 text-right">EBITDA An1 (M€)</th>
                    <th className="border p-2 text-right">EBITDA An3 (M€)</th>
                    <th className="border p-2 text-right">ROI 3 ans</th>
                    <th className="border p-2 text-right">IRR</th>
                    <th className="border p-2 text-right">Payback</th>
                    <th className="border p-2 text-right">Score ROI /10</th>
                    <th className="border p-2 text-right">Score Final</th>
                  </tr>
                </thead>
                <tbody>
                  {ebitdaData.map((ville, index) => {
                    const score = scoresData.find(s => s.ville === ville.ville);
                    const isTop3 = ['Paris', 'Genève', 'Amsterdam'].includes(ville.ville);
                    const statutColor = score?.statut === 'RECOMMANDÉ' ? 'bg-green-50' :
                                      score?.statut === 'POSSIBLE' ? 'bg-blue-50' :
                                      score?.statut === 'DÉCONSEILLÉ' ? 'bg-orange-50' : 'bg-red-50';
                    
                    return (
                      <tr key={index} className={isTop3 ? statutColor : ''}>
                        <td className="border p-2 font-semibold">{ville.ville}</td>
                        <td className="border p-2 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            score?.statut === 'RECOMMANDÉ' ? 'bg-green-100 text-green-800' :
                            score?.statut === 'POSSIBLE' ? 'bg-blue-100 text-blue-800' :
                            score?.statut === 'DÉCONSEILLÉ' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {score?.statut || 'N/A'}
                          </span>
                        </td>
                        <td className={`border p-2 text-right ${ville.an1 < 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {ville.an1.toFixed(2)}
                        </td>
                        <td className="border p-2 text-right font-semibold">{ville.an3.toFixed(2)}</td>
                        <td className="border p-2 text-right font-bold">{ville.roi3ans}%</td>
                        <td className="border p-2 text-right">{ville.irr}%</td>
                        <td className="border p-2 text-right">{ville.payback} ans</td>
                        <td className="border p-2 text-right">{score?.scoreROI?.toFixed(2) || 'N/A'}</td>
                        <td className="border p-2 text-right font-bold text-blue-600">
                          {score?.scorePondere?.toFixed(2) || 'N/A'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Analyse et conclusions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Points Clés - Rentabilité</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-700">Leaders de rentabilité</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Singapour affiche le meilleur ROI (200%) mais avec des contraintes réglementaires. 
                    Genève présente le meilleur équilibre avec un ROI de 187.5% et un statut recommandé.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-700">Payback rapide</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Toutes les localisations recommandées offrent un payback entre 2.3 et 2.5 ans, 
                    avec une rentabilité positive dès l'An 2.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-orange-700">Risques An 1</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Genève, Londres et Tel Aviv présentent un EBITDA négatif en An 1 
                    nécessitant une trésorerie suffisante pour couvrir les pertes initiales.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-700">Croissance exponentielle</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    L'EBITDA est multiplié par 15-20x entre l'An 1 et l'An 3 pour toutes les 
                    localisations, démontrant la forte scalabilité du modèle.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Recommandations Financières</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">1. Paris - Choix optimal</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• ROI solide de 171.6% sur 3 ans</li>
                    <li>• EBITDA positif dès l'An 1 (0.52 M€)</li>
                    <li>• Payback le plus rapide (2.3 ans)</li>
                    <li>• Score pondéré le plus élevé (7.87/10)</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">2. Financement requis</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Capital initial: 5-10 M€ selon localisation</li>
                    <li>• Ligne de crédit: 15-20 M€ pour volatilité</li>
                    <li>• Buffer trésorerie An 1: 2-3 M€</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">3. Optimisation fiscale</h4>
                  <p className="text-sm text-purple-700">
                    Privilégier les juridictions avec conventions fiscales favorables 
                    et taux d'imposition optimisés (Andorre 10%, Maurice 15%, Genève 15.15%).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // Section SG&A
  const renderSGA = () => {
    // Données complètes des 12 localités extraites du fichier Excel
    const villesData = [
      { 
        nom: "Maroc CFC", 
        an1: 687.870, an2: 716.538, an3: 971.143, 
        total: 2375.551, rank: 1,
        zone: "Zone franche",
        avantages: "Coûts les plus bas, proximité CI",
        fiscalite: "0%",
        categorie: "optimal"
      },
      { 
        nom: "Maurice", 
        an1: 795.190, an2: 820.828, an3: 1086.163, 
        total: 2702.181, rank: 2,
        zone: "Offshore",
        avantages: "Hub financier Afrique, anglophone",
        fiscalite: "3%",
        categorie: "optimal"
      },
      { 
        nom: "Andorre", 
        an1: 873.970, an2: 858.218, an3: 1142.003, 
        total: 2874.191, rank: 3,
        zone: "Zone franche",
        avantages: "Fiscalité attractive, UE proximité",
        fiscalite: "10%",
        categorie: "optimal"
      },
      { 
        nom: "Paris", 
        an1: 1290.093, an2: 1218.340, an3: 1478.138, 
        total: 3986.571, rank: 4,
        zone: "Europe",
        avantages: "Liens CI, écosystème AFD",
        fiscalite: "25%",
        categorie: "competitif"
      },
      { 
        nom: "Hambourg", 
        an1: 1296.200, an2: 1252.598, an3: 1637.593, 
        total: 4186.391, rank: 5,
        zone: "Europe",
        avantages: "Port majeur, logistique",
        fiscalite: "30%",
        categorie: "competitif"
      },
      { 
        nom: "Amsterdam", 
        an1: 1338.200, an2: 1318.168, an3: 1697.253, 
        total: 4353.621, rank: 6,
        zone: "Europe",
        avantages: "Port #1 cacao, Tony's ecosystem",
        fiscalite: "25.8%",
        categorie: "competitif"
      },
      { 
        nom: "Dubai", 
        an1: 1407.720, an2: 1330.658, an3: 1713.413, 
        total: 4451.791, rank: 7,
        zone: "Zone franche",
        avantages: "Hub global, 0% tax",
        fiscalite: "0%",
        categorie: "premium"
      },
      { 
        nom: "Tel Aviv", 
        an1: 1451.390, an2: 1382.478, an3: 1816.743, 
        total: 4650.611, rank: 8,
        zone: "Moyen-Orient",
        avantages: "Tech avancée, innovation",
        fiscalite: "23%",
        categorie: "premium"
      },
      { 
        nom: "Genève", 
        an1: 1693.000, an2: 1567.478, an3: 2002.513, 
        total: 5262.991, rank: 9,
        zone: "Europe",
        avantages: "Hub trading mondial, standards",
        fiscalite: "15%",
        categorie: "premium"
      },
      { 
        nom: "Singapour", 
        an1: 1754.470, an2: 1675.618, an3: 2142.973, 
        total: 5573.061, rank: 10,
        zone: "Asie",
        avantages: "Hub Asie, MAS régulation",
        fiscalite: "17%",
        categorie: "premium"
      },
      { 
        nom: "Londres", 
        an1: 1860.220, an2: 1736.338, an3: 2217.333, 
        total: 5813.891, rank: 11,
        zone: "Europe",
        avantages: "ICE Futures, finance globale",
        fiscalite: "25%",
        categorie: "premium"
      },
      { 
        nom: "Genève LCM", 
        an1: 1859.250, an2: 1715.618, an3: 2198.573, 
        total: 5773.441, rank: 12,
        zone: "Europe",
        avantages: "Premium services",
        fiscalite: "15%",
        categorie: "premium"
      }
    ];

    // Données détaillées pour les 3 villes principales
    const sgaDetail = {
      paris: {
        personnel: { an1: 630, an2: 705, an3: 810 },
        bureaux: { an1: 74.75, an2: 87.75, an3: 97.5 },
        itSystemes: { an1: 123.47, an2: 152.94, an3: 194.41 },
        compliance: { an1: 51.49, an2: 69.98, an3: 124.47 },
        autres: { an1: 160.38, an2: 202.67, an3: 251.76 },
        setup: { an1: 250, an2: 0, an3: 0 }
      },
      geneve: {
        personnel: { an1: 805, an2: 922, an3: 1182 },
        bureaux: { an1: 133, an2: 149, an3: 171 },
        itSystemes: { an1: 123.47, an2: 152.94, an3: 194.41 },
        compliance: { an1: 73.49, an2: 87.98, an3: 141.47 },
        autres: { an1: 208.04, an2: 255.56, an3: 313.52 },
        setup: { an1: 350, an2: 0, an3: 0 }
      },
      amsterdam: {
        personnel: { an1: 693, an2: 792, an3: 1012 },
        bureaux: { an1: 100, an2: 112, an3: 128 },
        itSystemes: { an1: 123.47, an2: 152.94, an3: 194.41 },
        compliance: { an1: 51.49, an2: 69.98, an3: 124.47 },
        autres: { an1: 150.24, an2: 192.25, an3: 238.37 },
        setup: { an1: 220, an2: 0, an3: 0 }
      }
    };

    // Volumes de référence
    const volumes = {
      an1: 6490,
      an2: 14980,
      an3: 24470
    };

    // Calculer les ratios pour toutes les villes
    const ratiosData = villesData.map(ville => ({
      nom: ville.nom,
      an1: (ville.an1 * 1000 / volumes.an1).toFixed(0),
      an2: (ville.an2 * 1000 / volumes.an2).toFixed(0),
      an3: (ville.an3 * 1000 / volumes.an3).toFixed(0),
      total: ville.total,
      rank: ville.rank,
      categorie: ville.categorie
    }));

    // Données pour graphique évolution 3 ans (top 6)
    const evolutionData = [
      { annee: 'An 1' },
      { annee: 'An 2' },
      { annee: 'An 3' }
    ];

    villesData.slice(0, 6).forEach(ville => {
      evolutionData[0][ville.nom] = ville.an1;
      evolutionData[1][ville.nom] = ville.an2;
      evolutionData[2][ville.nom] = ville.an3;
    });

    // Données pour graphique comparatif en barres
    const comparaisonData = villesData.map(ville => ({
      ville: ville.nom,
      'Coût total': ville.total,
      categorie: ville.categorie
    }));

    // Couleurs par catégorie
    const getCategoryColor = (categorie) => {
      switch(categorie) {
        case 'optimal': return '#10b981';
        case 'competitif': return '#3b82f6';
        case 'premium': return '#ef4444';
        default: return '#6b7280';
      }
    };

    return (
      <div className="space-y-6">
        {/* Cartes métriques clés */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader>
              <CardTitle className="text-green-800">Coût minimum</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-2xl font-bold text-green-900">Maroc CFC</h3>
              <p className="text-green-700">2,376 k€ (3 ans)</p>
              <p className="text-sm text-green-600 mt-2">40 €/tonne (An3)</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-800">Meilleur Europe</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-2xl font-bold text-blue-900">Paris</h3>
              <p className="text-blue-700">3,987 k€ (3 ans)</p>
              <p className="text-sm text-blue-600 mt-2">60 €/tonne (An3)</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <CardHeader>
              <CardTitle className="text-purple-800">Écart min-max</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-2xl font-bold text-purple-900">2.45x</h3>
              <p className="text-purple-700">Maroc vs Londres</p>
              <p className="text-sm text-purple-600 mt-2">3,438 k€ de différence</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
            <CardHeader>
              <CardTitle className="text-orange-800">Économie d'échelle</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-2xl font-bold text-orange-900">-75%</h3>
              <p className="text-orange-700">Ratio €/t (An1→An3)</p>
              <p className="text-sm text-orange-600 mt-2">Toutes localisations</p>
            </CardContent>
          </Card>
        </div>

        {/* Tableau comparatif complet */}
        <Card>
          <CardHeader>
            <CardTitle>Comparaison complète des 12 localisations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Rang</th>
                    <th className="border p-2 text-left">Localisation</th>
                    <th className="border p-2 text-left">Zone</th>
                    <th className="border p-2 text-right">An 1 (k€)</th>
                    <th className="border p-2 text-right">An 2 (k€)</th>
                    <th className="border p-2 text-right">An 3 (k€)</th>
                    <th className="border p-2 text-right">Total 3 ans</th>
                    <th className="border p-2 text-right">Ratio An3 (€/t)</th>
                    <th className="border p-2 text-left">Fiscalité</th>
                    <th className="border p-2 text-left">Avantages clés</th>
                  </tr>
                </thead>
                <tbody>
                  {villesData.map((ville, index) => (
                    <tr key={ville.nom} className={
                      ville.categorie === 'optimal' ? 'bg-green-50' :
                      ville.categorie === 'competitif' ? 'bg-blue-50' :
                      'bg-red-50'
                    }>
                      <td className="border p-2 text-center font-bold">{ville.rank}</td>
                      <td className="border p-2 font-semibold">{ville.nom}</td>
                      <td className="border p-2">{ville.zone}</td>
                      <td className="border p-2 text-right">{ville.an1.toFixed(0)}</td>
                      <td className="border p-2 text-right">{ville.an2.toFixed(0)}</td>
                      <td className="border p-2 text-right">{ville.an3.toFixed(0)}</td>
                      <td className="border p-2 text-right font-bold">{ville.total.toFixed(0)}</td>
                      <td className="border p-2 text-right font-semibold">
                        {(ville.an3 * 1000 / volumes.an3).toFixed(0)}
                      </td>
                      <td className="border p-2">{ville.fiscalite}</td>
                      <td className="border p-2 text-sm">{ville.avantages}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-100 p-3 rounded">
                <h4 className="font-semibold text-green-800 mb-1">Zones optimales (&lt;3M€)</h4>
                <p className="text-sm text-green-700">Maroc CFC, Maurice, Andorre</p>
              </div>
              <div className="bg-blue-100 p-3 rounded">
                <h4 className="font-semibold text-blue-800 mb-1">Europe compétitive (3-4.5M€)</h4>
                <p className="text-sm text-blue-700">Paris, Hambourg, Amsterdam</p>
              </div>
              <div className="bg-red-100 p-3 rounded">
                <h4 className="font-semibold text-red-800 mb-1">Hubs premium (&gt;4.5M€)</h4>
                <p className="text-sm text-red-700">Dubai, Tel Aviv, Genève, Singapour, Londres</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des coûts - Top 6</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={evolutionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="annee" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value.toFixed(0)} k€`} />
                  <Legend />
                  <Line type="monotone" dataKey="Maroc CFC" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="Maurice" stroke="#06b6d4" strokeWidth={2} />
                  <Line type="monotone" dataKey="Andorre" stroke="#8b5cf6" strokeWidth={2} />
                  <Line type="monotone" dataKey="Paris" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="Hambourg" stroke="#f59e0b" strokeWidth={2} />
                  <Line type="monotone" dataKey="Amsterdam" stroke="#ec4899" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comparaison des coûts totaux (3 ans)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparaisonData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="ville" type="category" width={80} />
                  <Tooltip formatter={(value) => `${value.toFixed(0)} k€`} />
                  <Bar dataKey="Coût total" fill={(entry) => getCategoryColor(entry.categorie)}>
                    {comparaisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getCategoryColor(entry.categorie)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Détail des 3 villes principales */}
        <Card>
          <CardHeader>
            <CardTitle>Décomposition détaillée - Top 3 recommandées pour Neskao</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Paris */}
              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-lg mb-3 text-blue-700">Paris 🇫🇷</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Personnel</span>
                    <span className="font-semibold">{sgaDetail.paris.personnel.an3}k€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bureaux</span>
                    <span className="font-semibold">{sgaDetail.paris.bureaux.an3.toFixed(0)}k€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IT & Systèmes</span>
                    <span className="font-semibold">{sgaDetail.paris.itSystemes.an3.toFixed(0)}k€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Compliance</span>
                    <span className="font-semibold">{sgaDetail.paris.compliance.an3.toFixed(0)}k€</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-bold">
                    <span>Total An3</span>
                    <span>1,478k€</span>
                  </div>
                  <div className="mt-3 p-2 bg-blue-50 rounded">
                    <p className="text-xs">Ratio: 60€/t • Total 3 ans: 3,987k€</p>
                  </div>
                </div>
              </div>

              {/* Genève */}
              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-lg mb-3 text-red-700">Genève 🇨🇭</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Personnel</span>
                    <span className="font-semibold">{sgaDetail.geneve.personnel.an3}k€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bureaux</span>
                    <span className="font-semibold">{sgaDetail.geneve.bureaux.an3}k€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IT & Systèmes</span>
                    <span className="font-semibold">{sgaDetail.geneve.itSystemes.an3.toFixed(0)}k€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Compliance</span>
                    <span className="font-semibold">{sgaDetail.geneve.compliance.an3.toFixed(0)}k€</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-bold">
                    <span>Total An3</span>
                    <span>2,003k€</span>
                  </div>
                  <div className="mt-3 p-2 bg-red-50 rounded">
                    <p className="text-xs">Ratio: 82€/t • Total 3 ans: 5,263k€</p>
                  </div>
                </div>
              </div>

              {/* Amsterdam */}
              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-lg mb-3 text-green-700">Amsterdam 🇳🇱</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Personnel</span>
                    <span className="font-semibold">{sgaDetail.amsterdam.personnel.an3}k€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bureaux</span>
                    <span className="font-semibold">{sgaDetail.amsterdam.bureaux.an3}k€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IT & Systèmes</span>
                    <span className="font-semibold">{sgaDetail.amsterdam.itSystemes.an3.toFixed(0)}k€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Compliance</span>
                    <span className="font-semibold">{sgaDetail.amsterdam.compliance.an3.toFixed(0)}k€</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-bold">
                    <span>Total An3</span>
                    <span>1,697k€</span>
                  </div>
                  <div className="mt-3 p-2 bg-green-50 rounded">
                    <p className="text-xs">Ratio: 69€/t • Total 3 ans: 4,354k€</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analyse et recommandations */}
        <Card>
          <CardHeader>
            <CardTitle>Analyse SG&A et recommandations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3 text-green-700">📊 Principaux enseignements</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span><strong>Économies d'échelle massives:</strong> Réduction de 75% du ratio €/tonne entre An1 et An3 pour toutes les localisations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span><strong>Écart de coûts significatif:</strong> Les zones franches (Maroc, Maurice) offrent 40-50% d'économies vs Europe</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span><strong>Personnel = 55-65% des coûts:</strong> Principal poste de dépense, avec des écarts salariaux importants entre zones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span><strong>Compliance en hausse:</strong> Multiplication par 2.4 entre An1 et An3 (EUDR, MiFID II)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-blue-700">🎯 Recommandation stratégique SG&A</h4>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="mb-3">
                    Pour Neskao, en considérant uniquement les coûts SG&A, trois options se distinguent :
                  </p>
                  <ol className="space-y-2 text-sm">
                    <li><strong>1. Option low-cost (Maroc CFC):</strong> 2,376k€ sur 3 ans, mais éloignement des marchés principaux</li>
                    <li><strong>2. Option équilibrée (Paris):</strong> 3,987k€ sur 3 ans, meilleur rapport coût/accès marché en Europe</li>
                    <li><strong>3. Option premium (Genève):</strong> 5,263k€ sur 3 ans, crédibilité maximale mais coûts élevés</li>
                  </ol>
                  <p className="mt-3 font-semibold">
                    Paris offre le meilleur compromis coût/bénéfice pour une entreprise ivoirienne cherchant à s'établir en Europe.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-orange-700">⚠️ Facteurs à considérer au-delà des coûts</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Accès aux marchés:</strong> Proximité ICE Futures (Londres/Amsterdam)</li>
                  <li>• <strong>Écosystème trading:</strong> Concentration d'acteurs à Genève/Londres</li>
                  <li>• <strong>Financement:</strong> Disponibilité DFI (Paris pour AFD/Proparco)</li>
                  <li>• <strong>Impact social:</strong> Perception et liens historiques avec la Côte d'Ivoire</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Section Financement
  const renderFinancement = () => {
    // Données complètes pour les 12 localités
    const donneesFinancement = {
      'Paris': {
        capitalInitial: 1.89,
        scoreDFI: 10,
        scoreCash: 6.66,
        ranking: 5,
        forwardEquityPct: 10,
        futuresEquityPct: 20,
        tauxForward: 7.0,
        tauxFutures: 7.5,
        an1: { total: 13.73, cashForward: 8.52, cashFutures: 5.20, equity: 1.89, dette: 11.84, coutTotal: 0.85 },
        an2: { total: 31.69, cashForward: 19.68, cashFutures: 12.01, equity: 4.37, dette: 27.32, coutTotal: 1.96 },
        an3: { total: 51.77, cashForward: 32.14, cashFutures: 19.62, equity: 7.14, dette: 44.63, coutTotal: 3.20 },
        ratioDE: 6.25,
        dfi: { afd: 'EXCELLENT', fmo: 'BON', bii: 'MOYEN', ifc: 'BON', autres1: 'EXCELLENT', autres2: 'EXCELLENT' }
      },
      'Genève': {
        capitalInitial: 1.78,
        scoreDFI: 10,
        scoreCash: 6.85,
        ranking: 3,
        forwardEquityPct: 10,
        futuresEquityPct: 20,
        tauxForward: 6.5,
        tauxFutures: 7.0,
        an1: { total: 12.64, cashForward: 7.44, cashFutures: 5.20, equity: 1.78, dette: 10.86, coutTotal: 0.73 },
        an2: { total: 29.19, cashForward: 17.17, cashFutures: 12.01, equity: 4.13, dette: 25.05, coutTotal: 1.68 },
        an3: { total: 47.68, cashForward: 28.05, cashFutures: 19.62, equity: 6.75, dette: 40.93, coutTotal: 2.74 },
        ratioDE: 6.08,
        dfi: { afd: 'EXCELLENT', fmo: 'BON', bii: 'BON', ifc: 'EXCELLENT', autres1: 'EXCELLENT', autres2: 'EXCELLENT' }
      },
      'Amsterdam': {
        capitalInitial: 1.74,
        scoreDFI: 9,
        scoreCash: 6.93,
        ranking: 2,
        forwardEquityPct: 10,
        futuresEquityPct: 20,
        tauxForward: 7.0,
        tauxFutures: 7.5,
        an1: { total: 12.33, cashForward: 7.26, cashFutures: 5.07, equity: 1.74, dette: 10.59, coutTotal: 0.74 },
        an2: { total: 28.46, cashForward: 16.77, cashFutures: 11.69, equity: 4.02, dette: 24.44, coutTotal: 1.71 },
        an3: { total: 46.49, cashForward: 27.40, cashFutures: 19.09, equity: 6.57, dette: 39.92, coutTotal: 2.79 },
        ratioDE: 6.09,
        dfi: { afd: 'BON', fmo: 'EXCELLENT', bii: 'BON', ifc: 'BON', autres1: 'EXCELLENT', autres2: 'EXCELLENT' }
      },
      'Londres': {
        capitalInitial: 2.00,
        scoreDFI: 8,
        scoreCash: 6.47,
        ranking: 6,
        forwardEquityPct: 15,
        futuresEquityPct: 20,
        tauxForward: 7.0,
        tauxFutures: 6.5,
        an1: { total: 11.67, cashForward: 6.70, cashFutures: 4.98, equity: 2.00, dette: 9.67, coutTotal: 0.63 },
        an2: { total: 26.95, cashForward: 15.46, cashFutures: 11.49, equity: 4.61, dette: 22.33, coutTotal: 1.45 },
        an3: { total: 44.02, cashForward: 25.25, cashFutures: 18.77, equity: 7.53, dette: 36.49, coutTotal: 2.37 },
        ratioDE: 4.84,
        dfi: { afd: 'BON', fmo: 'BON', bii: 'EXCELLENT', ifc: 'EXCELLENT', autres1: 'BON', autres2: 'BON' }
      },
      'Hambourg': {
        capitalInitial: 1.85,
        scoreDFI: 6,
        scoreCash: 6.74,
        ranking: 4,
        forwardEquityPct: 10,
        futuresEquityPct: 20,
        tauxForward: 7.0,
        tauxFutures: 7.5,
        an1: { total: 13.26, cashForward: 8.06, cashFutures: 5.20, equity: 1.85, dette: 11.42, coutTotal: 0.81 },
        an2: { total: 30.62, cashForward: 18.60, cashFutures: 12.01, equity: 4.26, dette: 26.36, coutTotal: 1.87 },
        an3: { total: 50.01, cashForward: 30.39, cashFutures: 19.62, equity: 6.96, dette: 43.06, coutTotal: 3.05 },
        ratioDE: 6.18,
        dfi: { afd: 'MOYEN', fmo: 'BON', bii: 'MOYEN', ifc: 'BON', autres1: 'MOYEN', autres2: 'MOYEN' }
      },
      'Andorre': {
        capitalInitial: 2.88,
        scoreDFI: 2,
        scoreCash: 4.93,
        ranking: 9,
        forwardEquityPct: 15,
        futuresEquityPct: 20,
        tauxForward: 8.0,
        tauxFutures: 8.5,
        an1: { total: 17.10, cashForward: 10.88, cashFutures: 6.22, equity: 2.88, dette: 14.23, coutTotal: 1.16 },
        an2: { total: 39.48, cashForward: 25.12, cashFutures: 14.36, equity: 6.64, dette: 32.84, coutTotal: 2.69 },
        an3: { total: 64.49, cashForward: 41.03, cashFutures: 23.46, equity: 10.85, dette: 53.64, coutTotal: 4.39 },
        ratioDE: 4.95,
        dfi: { afd: 'FAIBLE', fmo: 'FAIBLE', bii: 'FAIBLE', ifc: 'FAIBLE', autres1: 'FAIBLE', autres2: 'FAIBLE' }
      },
      'Maurice': {
        capitalInitial: 3.76,
        scoreDFI: 7,
        scoreCash: 3.36,
        ranking: 10,
        forwardEquityPct: 20,
        futuresEquityPct: 20,
        tauxForward: 8.0,
        tauxFutures: 8.0,
        an1: { total: 18.82, cashForward: 12.05, cashFutures: 6.77, equity: 3.76, dette: 15.06, coutTotal: 1.23 },
        an2: { total: 43.44, cashForward: 27.82, cashFutures: 15.62, equity: 8.69, dette: 34.75, coutTotal: 2.84 },
        an3: { total: 70.96, cashForward: 45.44, cashFutures: 25.51, equity: 14.19, dette: 56.76, coutTotal: 4.64 },
        ratioDE: 4.00,
        dfi: { afd: 'BON', fmo: 'MOYEN', bii: 'BON', ifc: 'BON', autres1: 'MOYEN', autres2: 'MOYEN' }
      },
      'Maroc CFC': {
        capitalInitial: 5.67,
        scoreDFI: 5,
        scoreCash: 0,
        ranking: 11,
        forwardEquityPct: 25,
        futuresEquityPct: 25,
        tauxForward: 7.5,
        tauxFutures: 8.0,
        an1: { total: 22.68, cashForward: 14.76, cashFutures: 7.92, equity: 5.67, dette: 17.01, coutTotal: 1.31 },
        an2: { total: 52.34, cashForward: 34.05, cashFutures: 18.29, equity: 13.09, dette: 39.26, coutTotal: 3.01 },
        an3: { total: 85.50, cashForward: 55.63, cashFutures: 29.87, equity: 21.37, dette: 64.12, coutTotal: 4.92 },
        ratioDE: 3.00,
        dfi: { afd: 'BON', fmo: 'MOYEN', bii: 'FAIBLE', ifc: 'BON', autres1: 'MOYEN', autres2: 'FAIBLE' }
      },
      'Dubai': {
        capitalInitial: 2.59,
        scoreDFI: 4,
        scoreCash: 5.43,
        ranking: 8,
        forwardEquityPct: 15,
        futuresEquityPct: 20,
        tauxForward: 6.5,
        tauxFutures: 7.0,
        an1: { total: 15.37, cashForward: 9.67, cashFutures: 5.70, equity: 2.59, dette: 12.78, coutTotal: 0.85 },
        an2: { total: 35.49, cashForward: 22.33, cashFutures: 13.16, equity: 5.98, dette: 29.51, coutTotal: 1.97 },
        an3: { total: 57.97, cashForward: 36.47, cashFutures: 21.50, equity: 9.77, dette: 48.20, coutTotal: 3.22 },
        ratioDE: 4.93,
        dfi: { afd: 'MOYEN', fmo: 'FAIBLE', bii: 'FAIBLE', ifc: 'BON', autres1: 'FAIBLE', autres2: 'FAIBLE' }
      },
      'Tel Aviv': {
        capitalInitial: 2.17,
        scoreDFI: 5,
        scoreCash: 6.17,
        ranking: 7,
        forwardEquityPct: 12,
        futuresEquityPct: 20,
        tauxForward: 7.5,
        tauxFutures: 7.5,
        an1: { total: 14.55, cashForward: 9.21, cashFutures: 5.34, equity: 2.17, dette: 12.37, coutTotal: 0.90 },
        an2: { total: 33.58, cashForward: 21.25, cashFutures: 12.32, equity: 5.01, dette: 28.56, coutTotal: 2.09 },
        an3: { total: 54.85, cashForward: 34.71, cashFutures: 20.13, equity: 8.19, dette: 46.65, coutTotal: 3.41 },
        ratioDE: 5.69,
        dfi: { afd: 'FAIBLE', fmo: 'FAIBLE', bii: 'FAIBLE', ifc: 'BON', autres1: 'MOYEN', autres2: 'BON' }
      },
      'Singapour': {
        capitalInitial: 1.61,
        scoreDFI: 8,
        scoreCash: 7.16,
        ranking: 1,
        forwardEquityPct: 10,
        futuresEquityPct: 20,
        tauxForward: 6.5,
        tauxFutures: 6.5,
        an1: { total: 11.12, cashForward: 6.15, cashFutures: 4.98, equity: 1.61, dette: 9.51, coutTotal: 0.59 },
        an2: { total: 25.68, cashForward: 14.18, cashFutures: 11.49, equity: 3.72, dette: 21.96, coutTotal: 1.36 },
        an3: { total: 41.94, cashForward: 23.17, cashFutures: 18.77, equity: 6.07, dette: 35.87, coutTotal: 2.23 },
        ratioDE: 5.91,
        dfi: { afd: 'BON', fmo: 'BON', bii: 'BON', ifc: 'EXCELLENT', autres1: 'MOYEN', autres2: 'BON' }
      },
      'New York': {
        capitalInitial: 3.41,
        scoreDFI: 4,
        scoreCash: 6.80,
        ranking: 12,
        forwardEquityPct: 20,
        futuresEquityPct: 25,
        tauxForward: 7.5,
        tauxFutures: 7.5,
        an1: { total: 15.13, cashForward: 8.35, cashFutures: 6.78, equity: 3.41, dette: 11.72, coutTotal: 0.88 },
        an2: { total: 34.93, cashForward: 19.28, cashFutures: 15.65, equity: 7.86, dette: 27.07, coutTotal: 2.03 },
        an3: { total: 57.07, cashForward: 31.50, cashFutures: 25.57, equity: 12.84, dette: 44.23, coutTotal: 3.32 },
        ratioDE: 3.44,
        dfi: { afd: 'MOYEN', fmo: 'FAIBLE', bii: 'FAIBLE', ifc: 'BON', autres1: 'FAIBLE', autres2: 'FAIBLE' }
      }
    };

    // Couleurs pour les DFI ratings
    const dfiColors = {
      'EXCELLENT': 'text-green-700 bg-green-100',
      'BON': 'text-blue-700 bg-blue-100',
      'MOYEN': 'text-yellow-700 bg-yellow-100',
      'FAIBLE': 'text-red-700 bg-red-100'
    };

    // Préparer les données pour les graphiques
    const villesArray = Object.entries(donneesFinancement).map(([ville, data]) => ({
      ville,
      ...data
    }));

    // Données pour graphique comparatif An1
    const comparatifAn1Data = villesArray.map(v => ({
      ville: v.ville,
      cashForward: v.an1.cashForward,
      cashFutures: v.an1.cashFutures,
      total: v.an1.total
    })).sort((a, b) => a.total - b.total);

    // Données pour évolution 3 ans
    const evolution3ansData = ['Paris', 'Genève', 'Amsterdam', 'Londres', 'Singapour'].map(ville => ({
      ville,
      'An 1': donneesFinancement[ville].an1.total,
      'An 2': donneesFinancement[ville].an2.total,
      'An 3': donneesFinancement[ville].an3.total
    }));

    // Données pour scores
    const scoresData = villesArray.map(v => ({
      ville: v.ville,
      'Score Cash': v.scoreCash,
      'Score DFI': v.scoreDFI
    })).sort((a, b) => (b['Score Cash'] + b['Score DFI']) - (a['Score Cash'] + a['Score DFI']));

    const renderStructureTab = () => (
      <div className="space-y-6">
        {/* Hypothèses de base */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Hypothèses de Base</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Activité Forward</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Cycle de cash: <strong>60 jours</strong></li>
                  <li>• Rotation: <strong>6x par an</strong></li>
                  <li>• Buffer volatilité: <strong>30%</strong></li>
                  <li>• Financement: <strong>90% dette / 10-25% equity</strong></li>
                </ul>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Activité Futures</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Initial Margin ICE: <strong>697.38 EUR/T</strong></li>
                  <li>• Buffer margin calls: <strong>15%</strong></li>
                  <li>• Financement: <strong>80% dette / 20-25% equity</strong></li>
                  <li>• Prix cacao: <strong>6,973.84 EUR/T</strong></li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Taux de Financement</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Trade Finance: <strong>6.5% - 8.0%</strong></li>
                  <li>• Ligne revolving: <strong>6.5% - 8.5%</strong></li>
                  <li>• Variation selon notation pays</li>
                  <li>• Meilleurs taux: Genève, Singapour</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Structure détaillée par ville */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Structure de Financement par Localité (An 1)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Ville</th>
                    <th className="p-2 text-center">Ranking</th>
                    <th className="p-2 text-right">Capital (M€)</th>
                    <th className="p-2 text-right">Cash Forward</th>
                    <th className="p-2 text-right">Cash Futures</th>
                    <th className="p-2 text-right">Total (M€)</th>
                    <th className="p-2 text-center">Ratio D/E</th>
                    <th className="p-2 text-right">Coût (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {villesArray.sort((a, b) => a.ranking - b.ranking).map((ville, index) => (
                    <tr key={ville.ville} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="p-2 font-medium">{ville.ville}</td>
                      <td className="p-2 text-center">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                          ville.ranking <= 3 ? 'bg-green-100 text-green-800' :
                          ville.ranking <= 6 ? 'bg-blue-100 text-blue-800' :
                          ville.ranking <= 9 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {ville.ranking}
                        </span>
                      </td>
                      <td className="p-2 text-right">{ville.capitalInitial.toFixed(2)}</td>
                      <td className="p-2 text-right">{ville.an1.cashForward.toFixed(2)}</td>
                      <td className="p-2 text-right">{ville.an1.cashFutures.toFixed(2)}</td>
                      <td className="p-2 text-right font-semibold">{ville.an1.total.toFixed(2)}</td>
                      <td className="p-2 text-center">{ville.ratioDE.toFixed(2)}x</td>
                      <td className="p-2 text-right">{((ville.an1.coutTotal / ville.an1.dette) * 100).toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Ratios Equity/Dette par Type d'Activité</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">Forward - Standard (Paris, Genève, Amsterdam)</span>
                    <span className="font-semibold">90/10</span>
                  </div>
                  <div className="flex items-center justify-between p-2">
                    <span className="text-sm">Forward - Risque modéré (Londres, Dubai)</span>
                    <span className="font-semibold">85/15</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">Forward - Risque élevé (Maurice, Maroc)</span>
                    <span className="font-semibold">80/20 à 75/25</span>
                  </div>
                  <div className="flex items-center justify-between p-2">
                    <span className="text-sm">Futures - Toutes localisations</span>
                    <span className="font-semibold">80/20</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Évolution du Financement Total</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={evolution3ansData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ville" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="An 1" fill="#3b82f6" />
                    <Bar dataKey="An 2" fill="#10b981" />
                    <Bar dataKey="An 3" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );

    const renderRecapTab = () => (
      <div className="space-y-6">
        {/* Vue comparative An 1 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Récapitulatif Financement An 1 - 12 Localisations</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={comparatifAn1Data} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ville" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cashForward" stackId="a" fill="#3b82f6" name="Cash Forward" />
                <Bar dataKey="cashFutures" stackId="a" fill="#10b981" name="Cash Futures" />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Financement minimum</p>
                <p className="text-2xl font-bold text-blue-700">Singapour</p>
                <p className="text-lg font-semibold">11.12 M€</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Financement médian</p>
                <p className="text-2xl font-bold text-green-700">Tel Aviv</p>
                <p className="text-lg font-semibold">14.55 M€</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Financement maximum</p>
                <p className="text-2xl font-bold text-red-700">Maroc CFC</p>
                <p className="text-lg font-semibold">22.68 M€</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Répartition détaillée */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Répartition Equity/Dette par Localité (An 1)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {villesArray.map(ville => {
                const equityPct = (ville.an1.equity / ville.an1.total) * 100;
                const dettePct = (ville.an1.dette / ville.an1.total) * 100;
                
                return (
                  <div key={ville.ville} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">{ville.ville}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Total financement:</span>
                        <span className="font-semibold">{ville.an1.total.toFixed(2)} M€</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div className="flex h-full">
                          <div 
                            className="bg-green-500" 
                            style={{ width: `${equityPct}%` }}
                            title={`Equity: ${equityPct.toFixed(1)}%`}
                          />
                          <div 
                            className="bg-blue-500" 
                            style={{ width: `${dettePct}%` }}
                            title={`Dette: ${dettePct.toFixed(1)}%`}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-green-600">Equity: {equityPct.toFixed(1)}%</span>
                        <span className="text-blue-600">Dette: {dettePct.toFixed(1)}%</span>
                      </div>
                      <div className="pt-2 border-t text-sm">
                        <div className="flex justify-between">
                          <span>Coût financement:</span>
                          <span className="font-semibold">{ville.an1.coutTotal.toFixed(2)} M€</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Taux effectif:</span>
                          <span className="font-semibold">
                            {((ville.an1.coutTotal / ville.an1.dette) * 100).toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );

    const renderScoringTab = () => (
      <div className="space-y-6">
        {/* Scores comparatifs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Scoring Financement - 12 Localisations</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={scoresData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ville" angle={-45} textAnchor="end" height={80} />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Score Cash" fill="#10b981" />
                <Bar dataKey="Score DFI" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Top 5 - Score Cash</h4>
                <div className="space-y-2">
                  {villesArray
                    .sort((a, b) => b.scoreCash - a.scoreCash)
                    .slice(0, 5)
                    .map((ville, index) => (
                      <div key={ville.ville} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="flex items-center gap-2">
                          <span className="font-semibold text-gray-500">{index + 1}.</span>
                          {ville.ville}
                        </span>
                        <span className="font-bold text-green-600">{ville.scoreCash.toFixed(2)}/10</span>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Top 5 - Score DFI</h4>
                <div className="space-y-2">
                  {villesArray
                    .sort((a, b) => b.scoreDFI - a.scoreDFI)
                    .slice(0, 5)
                    .map((ville, index) => (
                      <div key={ville.ville} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="flex items-center gap-2">
                          <span className="font-semibold text-gray-500">{index + 1}.</span>
                          {ville.ville}
                        </span>
                        <span className="font-bold text-blue-600">{ville.scoreDFI}/10</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accès DFI détaillé */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Accès aux Financements DFI par Localisation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Ville</th>
                    <th className="p-2 text-center">AFD/Proparco</th>
                    <th className="p-2 text-center">FMO</th>
                    <th className="p-2 text-center">BII/CDC</th>
                    <th className="p-2 text-center">IFC</th>
                    <th className="p-2 text-center">Enabel/IDH/Root</th>
                    <th className="p-2 text-center">Oikocredit/Triodos</th>
                    <th className="p-2 text-center">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {villesArray
                    .sort((a, b) => b.scoreDFI - a.scoreDFI)
                    .map((ville, index) => (
                      <tr key={ville.ville} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td className="p-2 font-medium">{ville.ville}</td>
                        <td className="p-2 text-center">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${dfiColors[ville.dfi.afd]}`}>
                            {ville.dfi.afd}
                          </span>
                        </td>
                        <td className="p-2 text-center">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${dfiColors[ville.dfi.fmo]}`}>
                            {ville.dfi.fmo}
                          </span>
                        </td>
                        <td className="p-2 text-center">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${dfiColors[ville.dfi.bii]}`}>
                            {ville.dfi.bii}
                          </span>
                        </td>
                        <td className="p-2 text-center">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${dfiColors[ville.dfi.ifc]}`}>
                            {ville.dfi.ifc}
                          </span>
                        </td>
                        <td className="p-2 text-center">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${dfiColors[ville.dfi.autres1]}`}>
                            {ville.dfi.autres1}
                          </span>
                        </td>
                        <td className="p-2 text-center">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${dfiColors[ville.dfi.autres2]}`}>
                            {ville.dfi.autres2}
                          </span>
                        </td>
                        <td className="p-2 text-center">
                          <span className={`inline-block px-3 py-1 rounded text-sm font-bold ${
                            ville.scoreDFI >= 9 ? 'bg-green-100 text-green-800' :
                            ville.scoreDFI >= 7 ? 'bg-blue-100 text-blue-800' :
                            ville.scoreDFI >= 5 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {ville.scoreDFI}/10
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Analyse des Scores</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-green-700 mb-1">Leaders DFI (Score 9-10)</p>
                  <p>Paris et Genève offrent un accès excellent à l'ensemble des DFI, avec une présence forte de l'AFD/Proparco et des institutions de finance durable.</p>
                </div>
                <div>
                  <p className="font-semibold text-blue-700 mb-1">Score Cash vs Score DFI</p>
                  <p>Singapour combine le meilleur score cash (7.16) avec un bon accès DFI (8/10), offrant l'équilibre optimal pour le financement.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Analyse du Financement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-b mb-6">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveFinancementTab('structure')}
                  className={`pb-2 px-1 font-medium text-sm transition-colors ${
                    activeFinancementTab === 'structure'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Structure & Hypothèses
                </button>
                <button
                  onClick={() => setActiveFinancementTab('recap')}
                  className={`pb-2 px-1 font-medium text-sm transition-colors ${
                    activeFinancementTab === 'recap'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Récapitulatif
                </button>
                <button
                  onClick={() => setActiveFinancementTab('scoring')}
                  className={`pb-2 px-1 font-medium text-sm transition-colors ${
                    activeFinancementTab === 'scoring'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Scoring
                </button>
              </nav>
            </div>

            {activeFinancementTab === 'structure' && renderStructureTab()}
            {activeFinancementTab === 'recap' && renderRecapTab()}
            {activeFinancementTab === 'scoring' && renderScoringTab()}
          </CardContent>
        </Card>
      </div>
    );
  }; // FERMETURE CORRECTE

  // Section Mix Produits
  const renderProduits = () => {
    // Volumes par produit
    const volumesData = [
      { produit: 'Masse de cacao', an1: 0, an2: 0, an3: 0, total: 0 },
      { produit: 'Beurre standard', an1: 2323.69, an2: 6041.59, an3: 10456.59, total: 18821.87 },
      { produit: 'Beurre désodorisé', an1: 0, an2: 0, an3: 0, total: 0 },
      { produit: 'Poudre standard', an1: 706.67, an2: 1837.35, an3: 3180.03, total: 5724.05 },
      { produit: 'Poudre alcalinisée', an1: 2869.53, an2: 5739.05, an3: 8608.58, total: 17217.16 }
    ];

    // Données financières
    const caMargesData = [
      { 
        annee: 'An 1', 
        volume: 5899.89, 
        ca: 54.16, 
        margeForward: 1.07, 
        margeFutures: 0.71,
        margeTotal: 1.78,
        margePct: 3.28
      },
      { 
        annee: 'An 2', 
        volume: 13617.99, 
        ca: 132.57, 
        margeForward: 2.62, 
        margeFutures: 1.63,
        margeTotal: 4.25,
        margePct: 3.21
      },
      { 
        annee: 'An 3', 
        volume: 22245.21, 
        ca: 227.58, 
        margeForward: 4.41, 
        margeFutures: 7.14,
        margeTotal: 11.55,
        margePct: 5.07
      }
    ];

    const renderPrixTab = () => (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Prix du Cacao - Hypothèses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Production Côte d'Ivoire</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Production totale estimée:</span>
                    <span className="font-bold">1,500,000 tonnes</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Production Oct-Dec 2025:</span>
                    <span className="font-bold">900,000 tonnes</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Production Jan-Mar 2026:</span>
                    <span className="font-bold">600,000 tonnes</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Prix de Marché</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>CAZ25 (Londres):</span>
                    <span className="font-bold">6,200 GBP/T</span>
                  </li>
                  <li className="flex justify-between">
                    <span>CAH26 (Londres):</span>
                    <span className="font-bold">5,800 GBP/T</span>
                  </li>
                  <li className="flex justify-between">
                    <span>FOREX EUR/GBP:</span>
                    <span className="font-bold">1.15461</span>
                  </li>
                  <li className="flex justify-between">
                    <span>LID (différentiel):</span>
                    <span className="font-bold">400 EUR</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );

    const renderMixTab = () => (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Mix Produits - Hypothèses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Rendements de Transformation</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Fèves → Masse:</span>
                    <span className="font-bold">81%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Masse → Beurre:</span>
                    <span className="font-bold">51%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Masse → Poudre:</span>
                    <span className="font-bold">47%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Perte process:</span>
                    <span className="font-bold">2%</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Répartition Production CI</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Masse vendue directe:</span>
                    <span className="font-bold">25%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Masse → transformation:</span>
                    <span className="font-bold">75%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Export vs Local:</span>
                    <span className="font-bold">50/50</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Poudre alcalinisée:</span>
                    <span className="font-bold">100% export</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Base de Transformation (60,000T fèves/an)</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Produit</th>
                    <th className="text-right p-2">Volume An1 (T)</th>
                    <th className="text-right p-2">Volume An2 (T)</th>
                    <th className="text-right p-2">Volume An3 (T)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">Masse produite</td>
                    <td className="p-2 text-right">12,150</td>
                    <td className="p-2 text-right">24,300</td>
                    <td className="p-2 text-right">36,450</td>
                  </tr>
                  <tr>
                    <td className="p-2">Beurre total</td>
                    <td className="p-2 text-right">4,647</td>
                    <td className="p-2 text-right">9,295</td>
                    <td className="p-2 text-right">13,942</td>
                  </tr>
                  <tr>
                    <td className="p-2">Poudre totale</td>
                    <td className="p-2 text-right">4,283</td>
                    <td className="p-2 text-right">8,566</td>
                    <td className="p-2 text-right">12,849</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    );

    const renderPricingTab = () => (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Pricing et Marges - Approche Hybride</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-yellow-50 p-4 rounded-lg mb-6">
              <p className="text-sm font-semibold">Méthodologie: 70% Cost Plus + 30% Market Ratio</p>
            </div>

            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Produit</th>
                  <th className="p-2 text-right">Prix Cost Plus (EUR/T)</th>
                  <th className="p-2 text-right">Prix Market (EUR/T)</th>
                  <th className="p-2 text-right">Prix Hybride (EUR/T)</th>
                  <th className="p-2 text-right">Frais Trade</th>
                  <th className="p-2 text-right">Prix Final NESKAO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">Masse de cacao</td>
                  <td className="p-2 text-right">8,336</td>
                  <td className="p-2 text-right">10,147</td>
                  <td className="p-2 text-right">8,879</td>
                  <td className="p-2 text-right">150</td>
                  <td className="p-2 text-right font-bold">9,029</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-2">Beurre standard</td>
                  <td className="p-2 text-right">16,139</td>
                  <td className="p-2 text-right">14,729</td>
                  <td className="p-2 text-right">15,716</td>
                  <td className="p-2 text-right">200</td>
                  <td className="p-2 text-right font-bold">15,916</td>
                </tr>
                <tr>
                  <td className="p-2">Beurre désodorisé</td>
                  <td className="p-2 text-right">16,286</td>
                  <td className="p-2 text-right">16,068</td>
                  <td className="p-2 text-right">16,220</td>
                  <td className="p-2 text-right">200</td>
                  <td className="p-2 text-right font-bold">16,420</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-2">Poudre standard</td>
                  <td className="p-2 text-right">1,911</td>
                  <td className="p-2 text-right">9,470</td>
                  <td className="p-2 text-right">4,179</td>
                  <td className="p-2 text-right">180</td>
                  <td className="p-2 text-right font-bold">4,359</td>
                </tr>
                <tr>
                  <td className="p-2">Poudre alcalinisée</td>
                  <td className="p-2 text-right">2,058</td>
                  <td className="p-2 text-right">10,147</td>
                  <td className="p-2 text-right">4,485</td>
                  <td className="p-2 text-right">180</td>
                  <td className="p-2 text-right font-bold">4,665</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded">
                <h5 className="font-semibold text-sm">Marges Trading</h5>
                <ul className="text-sm mt-2 space-y-1">
                  <li>• Forward: 2%</li>
                  <li>• Futures Hedge: 50 EUR/T</li>
                  <li>• Futures Spéculation: 700 EUR/T</li>
                </ul>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <h5 className="font-semibold text-sm">Ratios Market Standards</h5>
                <ul className="text-sm mt-2 space-y-1">
                  <li>• Beurre/Fèves: 2.2-2.5x</li>
                  <li>• Poudre/Fèves: 0.35-0.4x</li>
                  <li>• Masse/Fèves: 1.1-1.5x</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );

    const renderRecapTab = () => (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Récapitulatif Volume, CA et Marges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Évolution sur 3 ans</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={caMargesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="annee" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="ca" fill="#8884d8" name="CA (M€)" />
                  <Bar yAxisId="right" dataKey="margeTotal" fill="#82ca9d" name="Marge (M€)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Volumes Forward Trade par Produit (tonnes)</h4>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">Produit</th>
                      <th className="p-2 text-right">An 1</th>
                      <th className="p-2 text-right">An 2</th>
                      <th className="p-2 text-right">An 3</th>
                    </tr>
                  </thead>
                  <tbody>
                    {volumesData.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td className="p-2">{item.produit}</td>
                        <td className="p-2 text-right">{item.an1.toLocaleString()}</td>
                        <td className="p-2 text-right">{item.an2.toLocaleString()}</td>
                        <td className="p-2 text-right">{item.an3.toLocaleString()}</td>
                      </tr>
                    ))}
                    <tr className="font-bold border-t">
                      <td className="p-2">Total Forward</td>
                      <td className="p-2 text-right">5,900</td>
                      <td className="p-2 text-right">13,618</td>
                      <td className="p-2 text-right">22,245</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Performance Financière</h4>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">Métrique</th>
                      <th className="p-2 text-right">An 1</th>
                      <th className="p-2 text-right">An 2</th>
                      <th className="p-2 text-right">An 3</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray-50">
                      <td className="p-2">CA Total (M€)</td>
                      <td className="p-2 text-right">54.2</td>
                      <td className="p-2 text-right">132.6</td>
                      <td className="p-2 text-right">227.6</td>
                    </tr>
                    <tr>
                      <td className="p-2">Marge Forward (M€)</td>
                      <td className="p-2 text-right">1.07</td>
                      <td className="p-2 text-right">2.62</td>
                      <td className="p-2 text-right">4.41</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-2">Marge Futures (M€)</td>
                      <td className="p-2 text-right">0.71</td>
                      <td className="p-2 text-right">1.63</td>
                      <td className="p-2 text-right">7.14</td>
                    </tr>
                    <tr className="font-bold">
                      <td className="p-2">Marge Totale (M€)</td>
                      <td className="p-2 text-right">1.78</td>
                      <td className="p-2 text-right">4.25</td>
                      <td className="p-2 text-right">11.55</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="p-2">Marge %</td>
                      <td className="p-2 text-right">3.28%</td>
                      <td className="p-2 text-right">3.21%</td>
                      <td className="p-2 text-right">5.07%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Synthèse 3 ans</h4>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">CA Total</p>
                  <p className="text-2xl font-bold text-green-700">414.3 M€</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Marge Totale</p>
                  <p className="text-2xl font-bold text-green-700">17.6 M€</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Marge Moyenne</p>
                  <p className="text-2xl font-bold text-green-700">4.24%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Volume Total</p>
                  <p className="text-2xl font-bold text-green-700">41,763 T</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Mix Produits & Volumes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-b mb-6">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveProduitsTab('prix')}
                  className={`pb-2 px-1 font-medium text-sm transition-colors ${
                    activeProduitsTab === 'prix'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Prix du Cacao
                </button>
                <button
                  onClick={() => setActiveProduitsTab('mix')}
                  className={`pb-2 px-1 font-medium text-sm transition-colors ${
                    activeProduitsTab === 'mix'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Mix Produits
                </button>
                <button
                  onClick={() => setActiveProduitsTab('pricing')}
                  className={`pb-2 px-1 font-medium text-sm transition-colors ${
                    activeProduitsTab === 'pricing'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Pricing & Marges
                </button>
                <button
                  onClick={() => setActiveProduitsTab('recap')}
                  className={`pb-2 px-1 font-medium text-sm transition-colors ${
                    activeProduitsTab === 'recap'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Récapitulatif
                </button>
              </nav>
            </div>

            {activeProduitsTab === 'prix' && renderPrixTab()}
            {activeProduitsTab === 'mix' && renderMixTab()}
            {activeProduitsTab === 'pricing' && renderPricingTab()}
            {activeProduitsTab === 'recap' && renderRecapTab()}
          </CardContent>
        </Card>
      </div>
    );
  };

  // Fonction renderContent avec accolades et return explicite
  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'contexte':
        return renderContexte();
      case 'reglementation':
        return renderReglementation();
      case 'produits':
        return renderProduits();
      case 'financement':
        return renderFinancement();
      case 'sga':
        return renderSGA();
      case 'rentabilite':
        return renderRentabilite();
      case 'impact':
        return renderImpact();
      case 'analyse':
        return renderAnalyseDecisionnelle();
      case 'risques':
        return renderPlanning();
      default:
        return (
          <Card>
            <CardContent>
              <p>Section {activeSection} à intégrer</p>
            </CardContent>
          </Card>
        );
    }
  }; // FERMETURE CORRECTE

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold">Neskao Trade Desk</h1>
        </div>
        <nav className="p-4">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full p-3 text-left rounded mb-2 ${
                activeSection === section.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'hover:bg-gray-100'
              }`}
            >
              {section.name}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default NeskaoTradeDesk;