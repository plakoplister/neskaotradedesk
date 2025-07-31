import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface VolumeData {
  produit: string;
  an1: number;
  an2: number;
  an3: number;
  total: number;
}

interface CaMargeData {
  annee: string;
  volume: number;
  ca: number;
  margeForward: number;
  margeFutures: number;
  margeTotal: number;
  margePct: number;
}

/**
 * Produits component displaying comprehensive product mix analysis
 * Includes pricing, volumes, margins, and strategic positioning across all product lines
 */
const Produits: React.FC = () => {
  const [activeProduitsTab, setActiveProduitsTab] = useState('prix');

  // Volumes par produit
  const volumesData: VolumeData[] = [
    { produit: 'Masse de cacao', an1: 0, an2: 0, an3: 0, total: 0 },
    { produit: 'Beurre standard', an1: 1162, an2: 3021, an3: 6971, total: 11154 },
    { produit: 'Beurre désodorisé', an1: 0, an2: 0, an3: 0, total: 0 },
    { produit: 'Poudre standard', an1: 353, an2: 919, an3: 2120, total: 3392 },
    { produit: 'Poudre alcalinisée', an1: 1435, an2: 2870, an3: 5739, total: 10044 }
  ];

  // Données financières
  const caMargesData: CaMargeData[] = [
    { 
      annee: 'An 1', 
      volume: 2950, 
      ca: 27.08, 
      margeForward: 0.534, 
      margeFutures: 0.354,
      margeTotal: 0.888,
      margePct: 3.28
    },
    { 
      annee: 'An 2', 
      volume: 6809, 
      ca: 66.29, 
      margeForward: 1.309, 
      margeFutures: 0.817,
      margeTotal: 2.126,
      margePct: 3.21
    },
    { 
      annee: 'An 3', 
      volume: 14830, 
      ca: 151.72, 
      margeForward: 2.939, 
      margeFutures: 4.759,
      margeTotal: 7.698,
      margePct: 5.07
    }
  ];

  const renderPrixTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Prix du Cacao - Hypothèses Campagne 2025-2026</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-sky-50/30 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Production Côte d'Ivoire</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Campagne principale:</span>
                  <span className="font-bold">1,500,000 tonnes</span>
                </li>
                <li className="flex justify-between">
                  <span>Oct-Dec 2025:</span>
                  <span className="font-bold">900,000 tonnes</span>
                </li>
                <li className="flex justify-between">
                  <span>Jan-Mar 2026:</span>
                  <span className="font-bold">600,000 tonnes</span>
                </li>
                <li className="flex justify-between">
                  <span>Campagne intermédiaire:</span>
                  <span className="font-bold">400,000 tonnes</span>
                </li>
              </ul>
            </div>

            <div className="bg-teal-50/30 p-4 rounded-lg">
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
                  <span className="font-bold">400 USD</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
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
            <div className="bg-gray-100/50 p-4 rounded-lg">
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

            <div className="bg-gray-100 p-4 rounded-lg">
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

          <div className="bg-gray-100/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Volumes Trading par Produit et Marché (tonnes)</h4>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-2" rowSpan="2">Produit</th>
                  <th className="text-center p-2" colSpan="2">An 1</th>
                  <th className="text-center p-2" colSpan="2">An 2</th>
                  <th className="text-center p-2" colSpan="2">An 3</th>
                </tr>
                <tr className="border-b bg-gray-50">
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
                  <td className="p-2 text-right">1,519</td>
                  <td className="p-2 text-right">0</td>
                  <td className="p-2 text-right">3,038</td>
                  <td className="p-2 text-right">0</td>
                  <td className="p-2 text-right">6,075</td>
                  <td className="p-2 text-right">0</td>
                </tr>
                <tr className="bg-gray-50/50">
                  <td className="p-2 font-semibold">Beurre standard</td>
                  <td className="p-2 text-right">1,162</td>
                  <td className="p-2 text-right">1,162</td>
                  <td className="p-2 text-right">1,627</td>
                  <td className="p-2 text-right">3,021</td>
                  <td className="p-2 text-right">2,324</td>
                  <td className="p-2 text-right">6,971</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Beurre désodorisé</td>
                  <td className="p-2 text-right">0</td>
                  <td className="p-2 text-right">0</td>
                  <td className="p-2 text-right">0</td>
                  <td className="p-2 text-right">0</td>
                  <td className="p-2 text-right">0</td>
                  <td className="p-2 text-right">0</td>
                </tr>
                <tr className="bg-gray-50/50">
                  <td className="p-2 font-semibold">Poudre standard</td>
                  <td className="p-2 text-right">353</td>
                  <td className="p-2 text-right">353</td>
                  <td className="p-2 text-right">495</td>
                  <td className="p-2 text-right">919</td>
                  <td className="p-2 text-right">707</td>
                  <td className="p-2 text-right">2,120</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Poudre alcalinisée</td>
                  <td className="p-2 text-right">0</td>
                  <td className="p-2 text-right">1,435</td>
                  <td className="p-2 text-right">0</td>
                  <td className="p-2 text-right">2,870</td>
                  <td className="p-2 text-right">0</td>
                  <td className="p-2 text-right">5,739</td>
                </tr>
                <tr className="font-bold border-t-2">
                  <td className="p-2">Total Forward</td>
                  <td className="p-2 text-right">3,034</td>
                  <td className="p-2 text-right">2,950</td>
                  <td className="p-2 text-right">5,159</td>
                  <td className="p-2 text-right">6,809</td>
                  <td className="p-2 text-right">9,105</td>
                  <td className="p-2 text-right">14,830</td>
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
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <p className="text-sm font-semibold">Méthodologie:</p>
            <ul className="text-sm mt-1">
              <li>• Masse & Beurre: Approche Hybride (70% Cost Plus + 30% Market)</li>
              <li>• Poudres: 100% Market Pricing</li>
            </ul>
          </div>

          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 text-left">Produit</th>
                <th className="p-2 text-right">Prix Cost Plus (EUR/T)</th>
                <th className="p-2 text-right">Prix Market (EUR/T)</th>
                <th className="p-2 text-right">Prix Retenu (EUR/T)</th>
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
                <td className="p-2 text-right font-bold">9,029</td>
                <td className="p-2 text-center text-xs bg-sky-50/30">Hybride</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-2">Beurre standard</td>
                <td className="p-2 text-right">16,139</td>
                <td className="p-2 text-right">14,729</td>
                <td className="p-2 text-right">15,716</td>
                <td className="p-2 text-right font-bold">15,916</td>
                <td className="p-2 text-center text-xs bg-sky-50/30">Hybride</td>
              </tr>
              <tr>
                <td className="p-2">Beurre désodorisé</td>
                <td className="p-2 text-right">16,286</td>
                <td className="p-2 text-right">16,068</td>
                <td className="p-2 text-right">16,220</td>
                <td className="p-2 text-right font-bold">16,420</td>
                <td className="p-2 text-center text-xs bg-sky-50/30">Hybride</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-2">Poudre standard</td>
                <td className="p-2 text-right">1,911</td>
                <td className="p-2 text-right">9,470</td>
                <td className="p-2 text-right">9,470</td>
                <td className="p-2 text-right font-bold">9,650</td>
                <td className="p-2 text-center text-xs bg-teal-50/30">Market</td>
              </tr>
              <tr>
                <td className="p-2">Poudre alcalinisée</td>
                <td className="p-2 text-right">2,058</td>
                <td className="p-2 text-right">10,147</td>
                <td className="p-2 text-right">10,147</td>
                <td className="p-2 text-right font-bold">10,327</td>
                <td className="p-2 text-center text-xs bg-teal-50/30">Market</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-sky-50/30 p-4 rounded">
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
                  <tr className="bg-gray-50">
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
                    <td className="p-2 text-right">{caMargesData[0].volume.toLocaleString()}</td>
                    <td className="p-2 text-right">{caMargesData[1].volume.toLocaleString()}</td>
                    <td className="p-2 text-right">{caMargesData[2].volume.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Performance Financière</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-2 text-left">Métrique</th>
                    <th className="p-2 text-right">An 1</th>
                    <th className="p-2 text-right">An 2</th>
                    <th className="p-2 text-right">An 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50/50">
                    <td className="p-2">CA Total (M€)</td>
                    <td className="p-2 text-right">{caMargesData[0].ca}</td>
                    <td className="p-2 text-right">{caMargesData[1].ca}</td>
                    <td className="p-2 text-right">{caMargesData[2].ca}</td>
                  </tr>
                  <tr>
                    <td className="p-2">Marge Forward (M€)</td>
                    <td className="p-2 text-right">{caMargesData[0].margeForward}</td>
                    <td className="p-2 text-right">{caMargesData[1].margeForward}</td>
                    <td className="p-2 text-right">{caMargesData[2].margeForward}</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="p-2">Marge Futures (M€)</td>
                    <td className="p-2 text-right">{caMargesData[0].margeFutures}</td>
                    <td className="p-2 text-right">{caMargesData[1].margeFutures}</td>
                    <td className="p-2 text-right">{caMargesData[2].margeFutures}</td>
                  </tr>
                  <tr className="font-bold">
                    <td className="p-2">Marge Totale (M€)</td>
                    <td className="p-2 text-right">{caMargesData[0].margeTotal}</td>
                    <td className="p-2 text-right">{caMargesData[1].margeTotal}</td>
                    <td className="p-2 text-right">{caMargesData[2].margeTotal}</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="p-2">Marge %</td>
                    <td className="p-2 text-right">{caMargesData[0].margePct}%</td>
                    <td className="p-2 text-right">{caMargesData[1].margePct}%</td>
                    <td className="p-2 text-right">{caMargesData[2].margePct}%</td>
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
                <p className="text-2xl font-bold">{(caMargesData[0].margeForward + caMargesData[1].margeForward + caMargesData[2].margeForward).toFixed(1)} M€</p>
                <p className="text-sm text-gray-500">{Math.round((caMargesData[0].margeForward + caMargesData[1].margeForward + caMargesData[2].margeForward) / (caMargesData[0].margeTotal + caMargesData[1].margeTotal + caMargesData[2].margeTotal) * 100)}% du total</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-600 mb-1">Futures Trading</p>
                <p className="text-2xl font-bold">{(caMargesData[0].margeFutures + caMargesData[1].margeFutures + caMargesData[2].margeFutures).toFixed(1)} M€</p>
                <p className="text-sm text-gray-500">{Math.round((caMargesData[0].margeFutures + caMargesData[1].margeFutures + caMargesData[2].margeFutures) / (caMargesData[0].margeTotal + caMargesData[1].margeTotal + caMargesData[2].margeTotal) * 100)}% du total</p>
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

export default Produits;