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

          <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Prix Moyens CAF & Bord Champs</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>CAF moyen 25/26 sans LID:</span>
                  <span className="font-bold">6,974 EUR/T</span>
                </li>
                <li className="flex justify-between">
                  <span>CAF moyen 25/26 avec LID:</span>
                  <span className="font-bold">7,318 EUR/T</span>
                </li>
              </ul>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Prix Bord Champs moyen:</span>
                  <span className="font-bold">2,880 CFA/kg</span>
                </li>
                <li className="flex justify-between">
                  <span>Prix Bord Champs moyen:</span>
                  <span className="font-bold">4,391 EUR/T</span>
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
          <CardTitle className="text-xl">Mix Produits - Volumes par Marché</CardTitle>
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
              <h4 className="font-semibold mb-3">Stratégie Mix</h4>
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
                  <span>Export Trading:</span>
                  <span className="font-bold">50%</span>
                </li>
                <li className="flex justify-between">
                  <span>Ventes locales CI:</span>
                  <span className="font-bold">50%</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Volumes Trading par Produit et Marché (tonnes)</h4>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="text-left p-2" rowSpan="2">Produit</th>
                  <th className="text-center p-2" colSpan="2">An 1</th>
                  <th className="text-center p-2" colSpan="2">An 2</th>
                  <th className="text-center p-2" colSpan="2">An 3</th>
                </tr>
                <tr className="border-b bg-gray-100">
                  <th className="text-right p-2">CI</th>
                  <th className="text-right p-2">Export</th>
                  <th className="text-right p-2">CI</th>
                  <th className="text-right p-2">Export</th>
                  <th className="text-right p-2">CI</th>
                  <th className="text-right p-2">Export</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 font-semibold">Masse de cacao</td>
                  <td className="p-2 text-right">0</td>
                  <td className="p-2 text-right">0</td>
                  <td className="p-2 text-right">0</td>
                  <td className="p-2 text-right">0</td>
                  <td className="p-2 text-right">0</td>
                  <td className="p-2 text-right">0</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-2 font-semibold">Beurre standard</td>
                  <td className="p-2 text-right">1,162</td>
                  <td className="p-2 text-right">1,162</td>
                  <td className="p-2 text-right">3,021</td>
                  <td className="p-2 text-right">3,021</td>
                  <td className="p-2 text-right">5,228</td>
                  <td className="p-2 text-right">5,228</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Beurre premium</td>
                  <td className="p-2 text-right">0</td>
                  <td className="p-2 text-right">0</td>
                  <td className="p-2 text-right">0</td>
                  <td className="p-2 text-right">0</td>
                  <td className="p-2 text-right">0</td>
                  <td className="p-2 text-right">0</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-2 font-semibold">Poudre standard</td>
                  <td className="p-2 text-right">353</td>
                  <td className="p-2 text-right">353</td>
                  <td className="p-2 text-right">919</td>
                  <td className="p-2 text-right">919</td>
                  <td className="p-2 text-right">1,590</td>
                  <td className="p-2 text-right">1,590</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Poudre alcalinisée</td>
                  <td className="p-2 text-right">0</td>
                  <td className="p-2 text-right">2,870</td>
                  <td className="p-2 text-right">0</td>
                  <td className="p-2 text-right">5,739</td>
                  <td className="p-2 text-right">0</td>
                  <td className="p-2 text-right">8,609</td>
                </tr>
                <tr className="font-bold border-t-2">
                  <td className="p-2">Total Forward</td>
                  <td className="p-2 text-right">1,515</td>
                  <td className="p-2 text-right">4,385</td>
                  <td className="p-2 text-right">3,940</td>
                  <td className="p-2 text-right">9,678</td>
                  <td className="p-2 text-right">6,818</td>
                  <td className="p-2 text-right">15,427</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-gray-600 mt-2">Note: Poudre alcalinisée 100% export selon stratégie</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPricingTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Pricing et Marges - Stratégie Différenciée</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-50 p-4 rounded-lg mb-6">
            <p className="text-sm font-semibold">Méthodologie:</p>
            <ul className="text-sm mt-1">
              <li>• Masse & Beurre: Approche Hybride (70% Cost Plus + 30% Market)</li>
              <li>• Poudres: 100% Market Pricing</li>
            </ul>
          </div>

          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Produit</th>
                <th className="p-2 text-right">Prix Cost Plus (EUR/T)</th>
                <th className="p-2 text-right">Prix Market (EUR/T)</th>
                <th className="p-2 text-right">Prix Retenu (EUR/T)</th>
                <th className="p-2 text-right">Frais Trade</th>
                <th className="p-2 text-right">Prix Final NESKAO</th>
                <th className="p-2 text-center">Approche</th>
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
                <td className="p-2 text-center text-xs bg-blue-50">Hybride</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-2">Beurre standard</td>
                <td className="p-2 text-right">16,139</td>
                <td className="p-2 text-right">14,729</td>
                <td className="p-2 text-right">15,716</td>
                <td className="p-2 text-right">200</td>
                <td className="p-2 text-right font-bold">15,916</td>
                <td className="p-2 text-center text-xs bg-blue-50">Hybride</td>
              </tr>
              <tr>
                <td className="p-2">Beurre désodorisé</td>
                <td className="p-2 text-right">16,286</td>
                <td className="p-2 text-right">16,068</td>
                <td className="p-2 text-right">16,220</td>
                <td className="p-2 text-right">200</td>
                <td className="p-2 text-right font-bold">16,420</td>
                <td className="p-2 text-center text-xs bg-blue-50">Hybride</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-2">Poudre standard</td>
                <td className="p-2 text-right">1,911</td>
                <td className="p-2 text-right">9,470</td>
                <td className="p-2 text-right">9,470</td>
                <td className="p-2 text-right">180</td>
                <td className="p-2 text-right font-bold">9,650</td>
                <td className="p-2 text-center text-xs bg-green-50">Market</td>
              </tr>
              <tr>
                <td className="p-2">Poudre alcalinisée</td>
                <td className="p-2 text-right">2,058</td>
                <td className="p-2 text-right">10,147</td>
                <td className="p-2 text-right">10,147</td>
                <td className="p-2 text-right">180</td>
                <td className="p-2 text-right font-bold">10,327</td>
                <td className="p-2 text-center text-xs bg-green-50">Market</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded">
              <h5 className="font-semibold text-sm mb-3">Marges par Produit (Forward Trading)</h5>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-1">Produit</th>
                    <th className="text-right p-1">Marge %</th>
                    <th className="text-right p-1">Marge EUR/T</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-1">Masse de cacao</td>
                    <td className="p-1 text-right">2.0%</td>
                    <td className="p-1 text-right">181</td>
                  </tr>
                  <tr>
                    <td className="p-1">Beurre standard</td>
                    <td className="p-1 text-right">2.0%</td>
                    <td className="p-1 text-right">318</td>
                  </tr>
                  <tr>
                    <td className="p-1">Poudre standard</td>
                    <td className="p-1 text-right">2.0%</td>
                    <td className="p-1 text-right">193</td>
                  </tr>
                  <tr>
                    <td className="p-1">Poudre alcalinisée</td>
                    <td className="p-1 text-right">2.0%</td>
                    <td className="p-1 text-right">207</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-green-50 p-4 rounded">
              <h5 className="font-semibold text-sm mb-3">Marges Futures Trading</h5>
              <ul className="text-sm space-y-2">
                <li className="flex justify-between">
                  <span>Hedging basis gain:</span>
                  <span className="font-bold">50 EUR/T</span>
                </li>
                <li className="flex justify-between">
                  <span>Spéculation (10% volume):</span>
                  <span className="font-bold">700 EUR/T</span>
                </li>
                <li className="flex justify-between">
                  <span>Protection hedging:</span>
                  <span className="font-bold">0 EUR/T</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-orange-50 p-4 rounded-lg">
            <h5 className="font-semibold text-sm mb-2">Ratios de Marché (validation pricing)</h5>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Beurre/Fèves</p>
                <p className="font-bold">2.3x</p>
                <p className="text-xs text-gray-500">(cible: 2.2-2.5x)</p>
              </div>
              <div>
                <p className="text-gray-600">Poudre std/Fèves</p>
                <p className="font-bold">1.4x</p>
                <p className="text-xs text-gray-500">(cible: 1.3-1.5x)</p>
              </div>
              <div>
                <p className="text-gray-600">Masse/Fèves</p>
                <p className="font-bold">1.3x</p>
                <p className="text-xs text-gray-500">(cible: 1.2-1.5x)</p>
              </div>
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
            <h4 className="font-semibold mb-3">Évolution CA et Marges sur 3 ans</h4>
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

          <div className="mt-6">
            <h4 className="font-semibold mb-3">Répartition des Marges par Activité (3 ans)</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-600 mb-1">Forward Trading</p>
                <p className="text-2xl font-bold">8.1 M€</p>
                <p className="text-sm text-gray-500">46% du total</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-600 mb-1">Futures Trading</p>
                <p className="text-2xl font-bold">9.5 M€</p>
                <p className="text-sm text-gray-500">54% du total</p>
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