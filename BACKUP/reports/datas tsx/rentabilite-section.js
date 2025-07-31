const renderRentabilite = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Données EBITDA pour toutes les villes incluant Chypre (en millions EUR)
  const ebitdaData = [
    { ville: 'Paris', an1: 0.52, an2: 2.84, an3: 9.93, roi3ans: 171.6, irr: 38, payback: 2.3 },
    { ville: 'Genève', an1: -0.23, an2: 2.34, an3: 9.09, roi3ans: 187.5, irr: 40, payback: 2.5 },
    { ville: 'Amsterdam', an1: 0.07, an2: 2.56, an3: 9.40, roi3ans: 176.8, irr: 39, payback: 2.4 },
    { ville: 'Londres', an1: -0.67, an2: 1.86, an3: 8.47, roi3ans: 98.8, irr: 32, payback: 2.8 },
    { ville: 'Hambourg', an1: 0.09, an2: 2.57, an3: 9.38, roi3ans: 127.9, irr: 34, payback: 2.6 },
    { ville: 'Andorre', an1: 0.76, an2: 3.25, an3: 10.25, roi3ans: 87.2, irr: 30, payback: 2.2 },
    { ville: 'Chypre', an1: -0.06, an2: 2.59, an3: 9.33, roi3ans: 165.0, irr: 37, payback: 2.4 },
    { ville: 'Maurice', an1: 0.82, an2: 3.29, an3: 10.29, roi3ans: 21.5, irr: 28, payback: 2.1 },
    { ville: 'Maroc CFC', an1: 0.93, an2: 3.40, an3: 10.43, roi3ans: -15.9, irr: 25, payback: 2.0 },
    { ville: 'Dubai', an1: 0.00, an2: 2.52, an3: 9.31, roi3ans: 112.0, irr: 35, payback: 2.7 },
    { ville: 'Tel Aviv', an1: -0.06, an2: 2.44, an3: 9.16, roi3ans: 71.6, irr: 27, payback: 2.8 },
    { ville: 'Singapour', an1: 0.02, an2: 2.58, an3: 9.40, roi3ans: 327.5, irr: 42, payback: 2.5 }
  ];

  // Données P&L détaillées pour chaque ville (en millions EUR) - DONNÉES RÉELLES DU FICHIER
  const plDetailData = [
    {
      ville: 'Paris',
      ca: { an1: 54.16, an2: 132.57, an3: 227.58 },
      margeTrading: { an1: 1.07, an2: 2.62, an3: 4.41 },
      gainsFutures: { an1: 0.71, an2: 1.63, an3: 7.14 },
      totalRevenus: { an1: 1.78, an2: 4.25, an3: 11.55 },
      totalCharges: { an1: 1.26, an2: 1.41, an3: 1.62 },
      ebitda: { an1: 0.52, an2: 2.84, an3: 9.93 },
      resultatNet: { an1: -0.43, an2: 0.69, an3: 4.88 },
      fiscalite: '25% + CVAE'
    },
    {
      ville: 'Genève',
      ca: { an1: 54.16, an2: 132.57, an3: 227.58 },
      margeTrading: { an1: 1.07, an2: 2.62, an3: 4.41 },
      gainsFutures: { an1: 0.71, an2: 1.63, an3: 7.14 },
      totalRevenus: { an1: 1.78, an2: 4.25, an3: 11.55 },
      totalCharges: { an1: 2.01, an2: 1.91, an3: 2.46 },
      ebitda: { an1: -0.23, an2: 2.34, an3: 9.09 },
      resultatNet: { an1: -0.96, an2: 0.66, an3: 5.43 },
      fiscalite: '15.15%'
    },
    {
      ville: 'Amsterdam',
      ca: { an1: 54.16, an2: 132.57, an3: 227.58 },
      margeTrading: { an1: 1.07, an2: 2.62, an3: 4.41 },
      gainsFutures: { an1: 0.71, an2: 1.63, an3: 7.14 },
      totalRevenus: { an1: 1.78, an2: 4.25, an3: 11.55 },
      totalCharges: { an1: 1.70, an2: 1.69, an3: 2.15 },
      ebitda: { an1: 0.07, an2: 2.56, an3: 9.40 },
      resultatNet: { an1: -0.77, an2: 0.75, an3: 4.83 },
      fiscalite: '25.8%'
    },
    {
      ville: 'Londres',
      ca: { an1: 54.16, an2: 132.57, an3: 227.58 },
      margeTrading: { an1: 1.07, an2: 2.62, an3: 4.41 },
      gainsFutures: { an1: 0.71, an2: 1.63, an3: 7.14 },
      totalRevenus: { an1: 1.78, an2: 4.25, an3: 11.55 },
      totalCharges: { an1: 2.44, an2: 2.39, an3: 3.08 },
      ebitda: { an1: -0.67, an2: 1.86, an3: 8.47 },
      resultatNet: { an1: -1.40, an2: 0.31, an3: 5.06 },
      fiscalite: '19%'
    },
    {
      ville: 'Hambourg',
      ca: { an1: 54.16, an2: 132.57, an3: 227.58 },
      margeTrading: { an1: 1.07, an2: 2.62, an3: 4.41 },
      gainsFutures: { an1: 0.71, an2: 1.63, an3: 7.14 },
      totalRevenus: { an1: 1.78, an2: 4.25, an3: 11.55 },
      totalCharges: { an1: 1.68, an2: 1.68, an3: 2.17 },
      ebitda: { an1: 0.09, an2: 2.57, an3: 9.38 },
      resultatNet: { an1: -0.82, an2: 0.60, an3: 4.42 },
      fiscalite: '30%'
    },
    {
      ville: 'Andorre',
      ca: { an1: 54.16, an2: 132.57, an3: 227.58 },
      margeTrading: { an1: 1.07, an2: 2.62, an3: 4.41 },
      gainsFutures: { an1: 0.71, an2: 1.63, an3: 7.14 },
      totalRevenus: { an1: 1.78, an2: 4.25, an3: 11.55 },
      totalCharges: { an1: 1.01, an2: 1.00, an3: 1.30 },
      ebitda: { an1: 0.76, an2: 3.25, an3: 10.25 },
      resultatNet: { an1: -0.40, an2: 0.53, an3: 5.26 },
      fiscalite: '10%'
    },
    {
      ville: 'Chypre',
      ca: { an1: 54.16, an2: 132.57, an3: 227.58 },
      margeTrading: { an1: 1.07, an2: 2.62, an3: 4.41 },
      gainsFutures: { an1: 0.65, an2: 1.58, an3: 6.90 },
      totalRevenus: { an1: 1.72, an2: 4.20, an3: 11.31 },
      totalCharges: { an1: 1.38, an2: 1.33, an3: 1.68 },
      ebitda: { an1: -0.06, an2: 2.59, an3: 9.33 },
      resultatNet: { an1: -0.16, an2: 2.04, an3: 7.79 },
      fiscalite: '12.5%'
    },
    {
      ville: 'Maurice',
      ca: { an1: 54.16, an2: 132.57, an3: 227.58 },
      margeTrading: { an1: 1.07, an2: 2.62, an3: 4.41 },
      gainsFutures: { an1: 0.71, an2: 1.63, an3: 7.14 },
      totalRevenus: { an1: 1.78, an2: 4.25, an3: 11.55 },
      totalCharges: { an1: 0.95, an2: 0.97, an3: 1.26 },
      ebitda: { an1: 0.82, an2: 3.29, an3: 10.29 },
      resultatNet: { an1: -0.51, an2: 0.34, an3: 4.74 },
      fiscalite: '15%'
    },
    {
      ville: 'Maroc CFC',
      ca: { an1: 54.16, an2: 132.57, an3: 227.58 },
      margeTrading: { an1: 1.07, an2: 2.62, an3: 4.41 },
      gainsFutures: { an1: 0.71, an2: 1.63, an3: 7.14 },
      totalRevenus: { an1: 1.78, an2: 4.25, an3: 11.55 },
      totalCharges: { an1: 0.84, an2: 0.85, an3: 1.12 },
      ebitda: { an1: 0.93, an2: 3.40, an3: 10.43 },
      resultatNet: { an1: -0.47, an2: 0.29, an3: 4.95 },
      fiscalite: '8.75%'
    },
    {
      ville: 'Dubai',
      ca: { an1: 54.16, an2: 132.57, an3: 227.58 },
      margeTrading: { an1: 1.07, an2: 2.62, an3: 4.41 },
      gainsFutures: { an1: 0.71, an2: 1.63, an3: 7.14 },
      totalRevenus: { an1: 1.78, an2: 4.25, an3: 11.55 },
      totalCharges: { an1: 1.77, an2: 1.73, an3: 2.24 },
      ebitda: { an1: 0.00, an2: 2.52, an3: 9.31 },
      resultatNet: { an1: -0.95, an2: 0.45, an3: 5.99 },
      fiscalite: '0%'
    },
    {
      ville: 'Tel Aviv',
      ca: { an1: 54.16, an2: 132.57, an3: 227.58 },
      margeTrading: { an1: 1.07, an2: 2.62, an3: 4.41 },
      gainsFutures: { an1: 0.71, an2: 1.63, an3: 7.14 },
      totalRevenus: { an1: 1.78, an2: 4.25, an3: 11.55 },
      totalCharges: { an1: 1.84, an2: 1.81, an3: 2.39 },
      ebitda: { an1: -0.06, an2: 2.44, an3: 9.16 },
      resultatNet: { an1: -1.06, an2: 0.25, an3: 4.54 },
      fiscalite: '23%'
    },
    {
      ville: 'Singapour',
      ca: { an1: 54.16, an2: 132.57, an3: 227.58 },
      margeTrading: { an1: 1.07, an2: 2.62, an3: 4.41 },
      gainsFutures: { an1: 0.71, an2: 1.63, an3: 7.14 },
      totalRevenus: { an1: 1.78, an2: 4.25, an3: 11.55 },
      totalCharges: { an1: 1.75, an2: 1.68, an3: 2.14 },
      ebitda: { an1: 0.02, an2: 2.58, an3: 9.40 },
      resultatNet: { an1: -0.67, an2: 1.00, an3: 6.55 },
      fiscalite: '5-10%'
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
    { ville: 'Chypre', scoreROI: 4.95, scorePondere: 6.51, statut: 'POSSIBLE' },
    { ville: 'Andorre', scoreROI: 3.00, scorePondere: 4.20, statut: 'DÉCONSEILLÉ' },
    { ville: 'Maurice', scoreROI: 1.09, scorePondere: 5.62, statut: 'DÉCONSEILLÉ' },
    { ville: 'Maroc CFC', scoreROI: 0.00, scorePondere: 0.00, statut: 'NO GO' },
    { ville: 'Dubai', scoreROI: 3.72, scorePondere: 0.00, statut: 'NO GO' },
    { ville: 'Tel Aviv', scoreROI: 2.55, scorePondere: 0.00, statut: 'NO GO' }
  ];

  // Top 5 villes par score pondéré
  const top5Data = scoresData
    .filter(v => v.scorePondere > 0)
    .sort((a, b) => b.scorePondere - a.scorePondere)
    .slice(0, 5)
    .map(score => {
      const ebitda = ebitdaData.find(e => e.ville === score.ville);
      const pl = plDetailData.find(p => p.ville === score.ville);
      return { ...score, ...ebitda, ...pl };
    });

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

  // Contenu par onglet
  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return renderOverview();
      case 'pl-details':
        return renderPLDetails();
      case 'top5':
        return renderTop5();
      default:
        return renderOverview();
    }
  };

  // Vue d'ensemble (contenu original)
  const renderOverview = () => (
    <>
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
    </>
  );

  // P&L détaillés
  const renderPLDetails = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">P&L Détaillés - 12 Localisations</CardTitle>
          <p className="text-sm text-gray-600 mt-2">Tous les montants en millions EUR</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {plDetailData.map((ville, index) => (
              <Card key={index} className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex justify-between items-center">
                    <span>{ville.ville}</span>
                    <span className="text-sm font-normal text-gray-500">Fiscalité: {ville.fiscalite}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-4 gap-2 font-semibold text-gray-600 border-b pb-1">
                      <div>Poste</div>
                      <div className="text-right">An 1</div>
                      <div className="text-right">An 2</div>
                      <div className="text-right">An 3</div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2">
                      <div>CA</div>
                      <div className="text-right">{ville.ca.an1.toFixed(2)}</div>
                      <div className="text-right">{ville.ca.an2.toFixed(2)}</div>
                      <div className="text-right">{ville.ca.an3.toFixed(2)}</div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2">
                      <div>Marge Trading</div>
                      <div className="text-right">{ville.margeTrading.an1.toFixed(2)}</div>
                      <div className="text-right">{ville.margeTrading.an2.toFixed(2)}</div>
                      <div className="text-right">{ville.margeTrading.an3.toFixed(2)}</div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2">
                      <div>Gains Futures</div>
                      <div className="text-right">{ville.gainsFutures.an1.toFixed(2)}</div>
                      <div className="text-right">{ville.gainsFutures.an2.toFixed(2)}</div>
                      <div className="text-right">{ville.gainsFutures.an3.toFixed(2)}</div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 font-semibold border-t pt-1">
                      <div>Total Revenus</div>
                      <div className="text-right">{ville.totalRevenus.an1.toFixed(2)}</div>
                      <div className="text-right">{ville.totalRevenus.an2.toFixed(2)}</div>
                      <div className="text-right">{ville.totalRevenus.an3.toFixed(2)}</div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2">
                      <div>Total Charges</div>
                      <div className="text-right">{ville.totalCharges.an1.toFixed(2)}</div>
                      <div className="text-right">{ville.totalCharges.an2.toFixed(2)}</div>
                      <div className="text-right">{ville.totalCharges.an3.toFixed(2)}</div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 font-bold text-blue-600 border-t pt-1">
                      <div>EBITDA</div>
                      <div className={`text-right ${ville.ebitda.an1 < 0 ? 'text-red-600' : ''}`}>
                        {ville.ebitda.an1.toFixed(2)}
                      </div>
                      <div className="text-right">{ville.ebitda.an2.toFixed(2)}</div>
                      <div className="text-right">{ville.ebitda.an3.toFixed(2)}</div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 font-bold border-t pt-1">
                      <div>Résultat Net</div>
                      <div className={`text-right ${ville.resultatNet.an1 < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {ville.resultatNet.an1.toFixed(2)}
                      </div>
                      <div className={`text-right ${ville.resultatNet.an2 < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {ville.resultatNet.an2.toFixed(2)}
                      </div>
                      <div className="text-right text-green-600">{ville.resultatNet.an3.toFixed(2)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Top 5 récapitulatif
  const renderTop5 = () => (
    <div className="space-y-6">
      {/* Cards métriques Top 5 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {top5Data.map((ville, index) => {
          const colors = ['green', 'blue', 'orange', 'purple', 'pink'];
          const color = colors[index];
          
          return (
            <Card key={index} className={`bg-gradient-to-br from-${color}-50 to-${color}-100`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>#{index + 1}</span>
                  <span>{ville.ville}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-gray-600">Score Final</p>
                    <p className="text-2xl font-bold">{ville.scorePondere.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-gray-600">ROI 3 ans</p>
                      <p className="font-semibold">{ville.roi3ans}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">IRR</p>
                      <p className="font-semibold">{ville.irr}%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tableau récapitulatif détaillé */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Analyse Approfondie - Top 5 Localisations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Rang</th>
                  <th className="border p-3 text-left">Ville</th>
                  <th className="border p-3 text-center">Statut</th>
                  <th className="border p-3 text-center" colSpan="3">EBITDA (M€)</th>
                  <th className="border p-3 text-center" colSpan="3">Métriques Clés</th>
                  <th className="border p-3 text-center" colSpan="2">Scores /10</th>
                  <th className="border p-3 text-center">Fiscalité</th>
                </tr>
                <tr className="bg-gray-50 text-sm">
                  <th className="border p-2"></th>
                  <th className="border p-2"></th>
                  <th className="border p-2"></th>
                  <th className="border p-2">An 1</th>
                  <th className="border p-2">An 2</th>
                  <th className="border p-2">An 3</th>
                  <th className="border p-2">ROI 3 ans</th>
                  <th className="border p-2">IRR</th>
                  <th className="border p-2">Payback</th>
                  <th className="border p-2">ROI</th>
                  <th className="border p-2">Final</th>
                  <th className="border p-2"></th>
                </tr>
              </thead>
              <tbody>
                {top5Data.map((ville, index) => (
                  <tr key={index} className={index === 0 ? 'bg-yellow-50' : ''}>
                    <td className="border p-3 text-center font-bold text-lg">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                    </td>
                    <td className="border p-3 font-semibold">{ville.ville}</td>
                    <td className="border p-3 text-center">
                      <span className={`px-3 py-1 rounded text-sm font-semibold ${
                        ville.statut === 'RECOMMANDÉ' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {ville.statut}
                      </span>
                    </td>
                    <td className={`border p-3 text-right ${ville.an1 < 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {ville.an1.toFixed(2)}
                    </td>
                    <td className="border p-3 text-right">{ville.an2.toFixed(2)}</td>
                    <td className="border p-3 text-right font-semibold">{ville.an3.toFixed(2)}</td>
                    <td className="border p-3 text-center font-bold text-green-600">{ville.roi3ans}%</td>
                    <td className="border p-3 text-center">{ville.irr}%</td>
                    <td className="border p-3 text-center">{ville.payback} ans</td>
                    <td className="border p-3 text-center">{ville.scoreROI.toFixed(2)}</td>
                    <td className="border p-3 text-center font-bold text-blue-600 text-lg">
                      {ville.scorePondere.toFixed(2)}
                    </td>
                    <td className="border p-3 text-center text-sm">{ville.fiscalite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Analyse comparative Top 5 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Forces & Avantages - Top 5</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {top5Data.map((ville, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-700">{ville.ville}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {ville.ville === 'Paris' && 'Écosystème financier mature, convention fiscale CI, proximité culturelle'}
                    {ville.ville === 'Genève' && 'Hub trading mondial, fiscalité attractive 15.15%, talents internationaux'}
                    {ville.ville === 'Amsterdam' && 'Infrastructure portuaire, écosystème ESG développé, accès UE'}
                    {ville.ville === 'Hambourg' && 'Premier port européen cacao, expertise logistique, réseau existant'}
                    {ville.ville === 'Singapour' && 'Hub Asie-Pacifique, ROI exceptionnel 200%, environnement pro-business'}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Points d'Attention - Top 5</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {top5Data.map((ville, index) => (
                <div key={index} className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-orange-700">{ville.ville}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {ville.ville === 'Paris' && 'Fiscalité élevée 25% + CVAE, coûts salariaux importants'}
                    {ville.ville === 'Genève' && 'EBITDA négatif An 1, coûts de vie très élevés'}
                    {ville.ville === 'Amsterdam' && 'Fiscalité 25.8%, concurrence locale forte'}
                    {ville.ville === 'Hambourg' && 'Fiscalité 30% élevée, bureaucratie complexe'}
                    {ville.ville === 'Singapour' && 'Distance CI importante, décalage horaire, barrière culturelle'}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommandation finale */}
      <Card className="bg-gradient-to-br from-indigo-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-xl">Recommandation Stratégique</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-indigo-800 mb-2">Approche recommandée :</h4>
              <ol className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="font-bold text-indigo-600 mr-2">1.</span>
                  <div>
                    <strong>Phase 1 - Paris</strong> : Lancement avec la meilleure combinaison score/risque (7.87/10)
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-indigo-600 mr-2">2.</span>
                  <div>
                    <strong>Phase 2 - Genève ou Amsterdam</strong> : Expansion européenne en An 2
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-indigo-600 mr-2">3.</span>
                  <div>
                    <strong>Phase 3 - Singapour</strong> : Conquête Asie-Pacifique si succès confirmé
                  </div>
                </li>
              </ol>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-green-100 p-3 rounded">
                <p className="text-xs text-green-600">ROI moyen Top 5</p>
                <p className="text-xl font-bold text-green-800">169%</p>
              </div>
              <div className="bg-blue-100 p-3 rounded">
                <p className="text-xs text-blue-600">Payback moyen</p>
                <p className="text-xl font-bold text-blue-800">2.5 ans</p>
              </div>
              <div className="bg-purple-100 p-3 rounded">
                <p className="text-xs text-purple-600">EBITDA An 3 moyen</p>
                <p className="text-xl font-bold text-purple-800">9.5 M€</p>
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
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Vue d'ensemble
          </button>
          <button
            onClick={() => setActiveTab('pl-details')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'pl-details'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            P&L Détaillés (12 villes)
          </button>
          <button
            onClick={() => setActiveTab('top5')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'top5'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Top 5 & Récapitulatif
          </button>
        </nav>
      </div>

      {/* Contenu de l'onglet actif */}
      {renderTabContent()}

      {/* Points clés et recommandations (toujours visibles) */}
      {activeTab === 'overview' && (
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
                    Genève, Londres, Chypre et Tel Aviv présentent un EBITDA négatif en An 1 
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
                    et taux d'imposition optimisés (Dubai 0%, Singapour 5-10%, Maroc CFC 8.75%, Andorre 10%, Chypre 12.5%, Maurice 15%, Genève 15.15%).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};