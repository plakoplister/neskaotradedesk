import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Cell } from 'recharts';

const Financement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('hypotheses');

  // Données d'hypothèses mises à jour
  const hypothesesData = [
    { 
      ville: 'Paris', 
      forwardBuffer: 55, 
      forwardEquity: 25,
      forwardDebt: 90,
      forwardTaux: 7.0,
      futuresBuffer: 15, 
      futuresEquity: 20,
      futuresDebt: 80,
      futuresTaux: 7.5,
      ratioDE: 6.25
    },
    { 
      ville: 'Genève', 
      forwardBuffer: 50, 
      forwardEquity: 20,
      forwardDebt: 90,
      forwardTaux: 6.5,
      futuresBuffer: 15, 
      futuresEquity: 20,
      futuresDebt: 80,
      futuresTaux: 7.0,
      ratioDE: 6.08
    },
    { 
      ville: 'Amsterdam', 
      forwardBuffer: 48, 
      forwardEquity: 22,
      forwardDebt: 90,
      forwardTaux: 6.8,
      futuresBuffer: 12, 
      futuresEquity: 20,
      futuresDebt: 80,
      futuresTaux: 7.3,
      ratioDE: 6.09
    },
    { 
      ville: 'Londres', 
      forwardBuffer: 45, 
      forwardEquity: 20,
      forwardDebt: 85,
      forwardTaux: 6.3,
      futuresBuffer: 10, 
      futuresEquity: 20,
      futuresDebt: 80,
      futuresTaux: 6.8,
      ratioDE: 4.84
    },
    { 
      ville: 'Hambourg', 
      forwardBuffer: 52, 
      forwardEquity: 25,
      forwardDebt: 90,
      forwardTaux: 6.9,
      futuresBuffer: 15, 
      futuresEquity: 20,
      futuresDebt: 80,
      futuresTaux: 7.4,
      ratioDE: 6.18
    },
    { 
      ville: 'Andorre', 
      forwardBuffer: 65, 
      forwardEquity: 35,
      forwardDebt: 85,
      forwardTaux: 8.0,
      futuresBuffer: 25, 
      futuresEquity: 20,
      futuresDebt: 80,
      futuresTaux: 8.5,
      ratioDE: 4.95
    },
    { 
      ville: 'Chypre', 
      forwardBuffer: 65, 
      forwardEquity: 35,
      forwardDebt: 85,
      forwardTaux: 7.0,
      futuresBuffer: 20, 
      futuresEquity: 25,
      futuresDebt: 75,
      futuresTaux: 7.5,
      ratioDE: 4.39
    },
    { 
      ville: 'Maurice', 
      forwardBuffer: 72, 
      forwardEquity: 35,
      forwardDebt: 80,
      forwardTaux: 8.0,
      futuresBuffer: 30, 
      futuresEquity: 20,
      futuresDebt: 80,
      futuresTaux: 8.5,
      ratioDE: 4.00
    },
    { 
      ville: 'Maroc CFC', 
      forwardBuffer: 85, 
      forwardEquity: 40,
      forwardDebt: 75,
      forwardTaux: 7.5,
      futuresBuffer: 40, 
      futuresEquity: 25,
      futuresDebt: 75,
      futuresTaux: 8.0,
      ratioDE: 3.00
    },
    { 
      ville: 'Dubai', 
      forwardBuffer: 60, 
      forwardEquity: 30,
      forwardDebt: 85,
      forwardTaux: 6.5,
      futuresBuffer: 20, 
      futuresEquity: 20,
      futuresDebt: 80,
      futuresTaux: 7.0,
      ratioDE: 4.93
    },
    { 
      ville: 'Tel Aviv', 
      forwardBuffer: 58, 
      forwardEquity: 28,
      forwardDebt: 88,
      forwardTaux: 7.2,
      futuresBuffer: 18, 
      futuresEquity: 20,
      futuresDebt: 80,
      futuresTaux: 7.5,
      ratioDE: 5.69
    },
    { 
      ville: 'Singapour', 
      forwardBuffer: 42, 
      forwardEquity: 18,
      forwardDebt: 90,
      forwardTaux: 6.0,
      futuresBuffer: 10, 
      futuresEquity: 20,
      futuresDebt: 80,
      futuresTaux: 6.5,
      ratioDE: 5.91
    }
  ];

  // Données de financement détaillé extraites du fichier
  const financementDetailData = [
    {
      ville: 'Paris',
      ranking: 5,
      an1: { forward: 8.52, futures: 5.20, equity: 1.89, dette: 11.84, frais: 0.85, total: 13.73 },
      an2: { forward: 19.68, futures: 12.01, equity: 4.37, dette: 27.32, frais: 1.96, total: 31.69 },
      an3: { forward: 32.14, futures: 19.62, equity: 7.14, dette: 44.63, frais: 3.20, total: 51.77 }
    },
    {
      ville: 'Genève',
      ranking: 3,
      an1: { forward: 7.44, futures: 5.20, equity: 1.78, dette: 10.86, frais: 0.73, total: 12.64 },
      an2: { forward: 17.17, futures: 12.01, equity: 4.12, dette: 25.07, frais: 1.68, total: 29.19 },
      an3: { forward: 28.05, futures: 19.62, equity: 6.73, dette: 40.95, frais: 2.74, total: 47.68 }
    },
    {
      ville: 'Amsterdam',
      ranking: 2,
      an1: { forward: 7.26, futures: 5.07, equity: 1.74, dette: 10.59, frais: 0.74, total: 12.33 },
      an2: { forward: 16.76, futures: 11.70, equity: 4.02, dette: 24.44, frais: 1.71, total: 28.46 },
      an3: { forward: 27.38, futures: 19.11, equity: 6.56, dette: 39.93, frais: 2.79, total: 46.49 }
    },
    {
      ville: 'Londres',
      ranking: 6,
      an1: { forward: 6.70, futures: 4.98, equity: 2.00, dette: 9.67, frais: 0.63, total: 11.67 },
      an2: { forward: 15.46, futures: 11.49, equity: 4.62, dette: 22.33, frais: 1.45, total: 26.95 },
      an3: { forward: 25.25, futures: 18.77, equity: 7.54, dette: 36.48, frais: 2.37, total: 44.02 }
    },
    {
      ville: 'Hambourg',
      ranking: 4,
      an1: { forward: 8.06, futures: 5.20, equity: 1.85, dette: 11.42, frais: 0.81, total: 13.26 },
      an2: { forward: 18.60, futures: 12.01, equity: 4.26, dette: 26.35, frais: 1.87, total: 30.62 },
      an3: { forward: 30.39, futures: 19.62, equity: 6.96, dette: 43.05, frais: 3.05, total: 50.01 }
    },
    {
      ville: 'Andorre',
      ranking: 9,
      an1: { forward: 10.88, futures: 6.22, equity: 2.88, dette: 14.23, frais: 1.16, total: 17.10 },
      an2: { forward: 25.11, futures: 14.36, equity: 6.64, dette: 32.84, frais: 2.68, total: 39.48 },
      an3: { forward: 41.03, futures: 23.46, equity: 10.85, dette: 53.64, frais: 4.39, total: 64.49 }
    },
    {
      ville: 'Chypre',
      ranking: 8,
      an1: { forward: 10.88, futures: 5.97, equity: 3.13, dette: 13.73, frais: 0.98, total: 16.86 },
      an2: { forward: 25.11, futures: 13.79, equity: 7.21, dette: 31.69, frais: 2.27, total: 38.90 },
      an3: { forward: 41.03, futures: 22.53, equity: 11.79, dette: 51.77, frais: 3.71, total: 63.55 }
    },
    {
      ville: 'Maurice',
      ranking: 10,
      an1: { forward: 12.05, futures: 6.77, equity: 3.76, dette: 15.06, frais: 1.23, total: 18.82 },
      an2: { forward: 27.82, futures: 15.62, equity: 8.69, dette: 34.75, frais: 2.84, total: 43.44 },
      an3: { forward: 45.44, futures: 25.51, equity: 14.19, dette: 56.76, frais: 4.64, total: 70.96 }
    },
    {
      ville: 'Maroc CFC',
      ranking: 11,
      an1: { forward: 14.76, futures: 7.92, equity: 5.67, dette: 17.01, frais: 1.31, total: 22.68 },
      an2: { forward: 34.06, futures: 18.28, equity: 13.09, dette: 39.26, frais: 3.01, total: 52.34 },
      an3: { forward: 55.64, futures: 29.86, equity: 21.37, dette: 64.12, frais: 4.92, total: 85.50 }
    },
    {
      ville: 'Dubai',
      ranking: 7,
      an1: { forward: 9.67, futures: 5.70, equity: 2.59, dette: 12.78, frais: 0.85, total: 15.37 },
      an2: { forward: 22.32, futures: 13.16, equity: 5.98, dette: 29.51, frais: 1.97, total: 35.49 },
      an3: { forward: 36.47, futures: 21.50, equity: 9.77, dette: 48.20, frais: 3.22, total: 57.97 }
    },
    {
      ville: 'Tel Aviv',
      ranking: 12,
      an1: { forward: 9.21, futures: 5.34, equity: 2.17, dette: 12.37, frais: 0.90, total: 14.55 },
      an2: { forward: 21.25, futures: 12.33, equity: 5.02, dette: 28.56, frais: 2.09, total: 33.58 },
      an3: { forward: 34.71, futures: 20.14, equity: 8.19, dette: 46.65, frais: 3.41, total: 54.85 }
    },
    {
      ville: 'Singapour',
      ranking: 1,
      an1: { forward: 6.15, futures: 4.98, equity: 1.61, dette: 9.51, frais: 0.59, total: 11.12 },
      an2: { forward: 14.18, futures: 11.49, equity: 3.72, dette: 21.96, frais: 1.36, total: 25.68 },
      an3: { forward: 23.17, futures: 18.77, equity: 6.07, dette: 35.87, frais: 2.23, total: 41.94 }
    }
  ];

  // Scores DFI par ville extraits du fichier
  const scoreDFI = {
    'Paris': { score: 10, afd: 'EXCELLENT', fmo: 'BON', bii: 'MOYEN', ifc: 'BON', enabel: 'EXCELLENT', oiko: 'EXCELLENT' },
    'Genève': { score: 10, afd: 'EXCELLENT', fmo: 'BON', bii: 'BON', ifc: 'EXCELLENT', enabel: 'EXCELLENT', oiko: 'EXCELLENT' },
    'Amsterdam': { score: 9, afd: 'BON', fmo: 'EXCELLENT', bii: 'BON', ifc: 'BON', enabel: 'EXCELLENT', oiko: 'EXCELLENT' },
    'Londres': { score: 8, afd: 'BON', fmo: 'BON', bii: 'EXCELLENT', ifc: 'EXCELLENT', enabel: 'BON', oiko: 'BON' },
    'Hambourg': { score: 6, afd: 'MOYEN', fmo: 'BON', bii: 'MOYEN', ifc: 'BON', enabel: 'MOYEN', oiko: 'MOYEN' },
    'Andorre': { score: 2, afd: 'FAIBLE', fmo: 'FAIBLE', bii: 'FAIBLE', ifc: 'FAIBLE', enabel: 'FAIBLE', oiko: 'FAIBLE' },
    'Chypre': { score: 7, afd: 'BON', fmo: 'BON', bii: 'BON', ifc: 'BON', enabel: 'BON', oiko: 'BON' },
    'Maurice': { score: 7, afd: 'BON', fmo: 'MOYEN', bii: 'BON', ifc: 'BON', enabel: 'MOYEN', oiko: 'MOYEN' },
    'Maroc CFC': { score: 5, afd: 'BON', fmo: 'MOYEN', bii: 'FAIBLE', ifc: 'BON', enabel: 'MOYEN', oiko: 'FAIBLE' },
    'Dubai': { score: 4, afd: 'MOYEN', fmo: 'FAIBLE', bii: 'FAIBLE', ifc: 'BON', enabel: 'FAIBLE', oiko: 'FAIBLE' },
    'Tel Aviv': { score: 5, afd: 'FAIBLE', fmo: 'FAIBLE', bii: 'FAIBLE', ifc: 'BON', enabel: 'MOYEN', oiko: 'BON' },
    'Singapour': { score: 8, afd: 'BON', fmo: 'BON', bii: 'BON', ifc: 'EXCELLENT', enabel: 'MOYEN', oiko: 'BON' }
  };

  // Top 5 basé sur le ranking de financement
  const top5Data = financementDetailData
    .sort((a, b) => a.ranking - b.ranking)
    .slice(0, 5)
    .map(ville => ({
      ...ville,
      scoreDFI: scoreDFI[ville.ville].score,
      scoreTotal: Math.min(10, (10 - (ville.ranking / 12) * 6) * 0.7 + (scoreDFI[ville.ville].score / 10) * 3),
      statut: ville.ranking <= 3 ? 'EXCELLENT' : ville.ranking <= 6 ? 'BON' : 'MOYEN'
    }));

  // Couleurs par statut
  const getColorByStatus = (rating: string) => {
    switch(rating) {
      case 'EXCELLENT': return 'bg-teal-50/30 text-teal-700';
      case 'BON': return 'bg-sky-50/30 text-sky-700';
      case 'MOYEN': return 'bg-gray-100 text-gray-700';
      case 'FAIBLE': return 'bg-rose-50/30 text-rose-700';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Vue Hypothèses
  const renderHypotheses = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Hypothèses Générales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-sky-50/30 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Paramètres de base</h4>
              <ul className="space-y-1 text-sm">
                <li>• Prix cacao: <strong>6,974 EUR/tonne</strong></li>
                <li>• Rotation annuelle: <strong>6x</strong></li>
              </ul>
            </div>
            <div className="bg-teal-50/30 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Volumes à financer</h4>
              <ul className="space-y-1 text-sm">
                <li>• <strong>An1:</strong> Hedge: <strong>5,900 T</strong> / Spec: <strong>590 T</strong></li>
                <li>• <strong>An2:</strong> Hedge: <strong>13,618 T</strong> / Spec: <strong>1,362 T</strong></li>
                <li>• <strong>An3:</strong> Hedge: <strong>22,245 T</strong> / Spec: <strong>2,225 T</strong></li>
              </ul>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Structure type</h4>
              <ul className="space-y-1 text-sm">
                <li>• Forward: <strong>85-90% dette</strong></li>
                <li>• Futures: <strong>75-80% dette</strong></li>
                <li>• Taux: <strong>6.0% - 8.5%</strong></li>
                <li>• Buffer: <strong>10% - 40%</strong></li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Paramètres par Localité</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2 text-left">Ville</th>
                  <th className="p-2 text-center" colSpan="4">Forward</th>
                  <th className="p-2 text-center" colSpan="4">Futures</th>
                  <th className="p-2 text-center">Ratio D/E</th>
                </tr>
                <tr className="bg-gray-50/50 text-xs">
                  <th className="p-2"></th>
                  <th className="p-2 text-center">Cycle (j)</th>
                  <th className="p-2 text-center">Buffer %</th>
                  <th className="p-2 text-center">Dette %</th>
                  <th className="p-2 text-center">Taux %</th>
                  <th className="p-2 text-center">Buffer %</th>
                  <th className="p-2 text-center">Equity %</th>
                  <th className="p-2 text-center">Dette %</th>
                  <th className="p-2 text-center">Taux %</th>
                  <th className="p-2 text-center">Global</th>
                </tr>
              </thead>
              <tbody>
                {hypothesesData.map((ville, index) => (
                  <tr key={ville.ville} className={index % 2 === 0 ? 'bg-gray-50/30' : ''}>
                    <td className="p-2 font-medium">{ville.ville}</td>
                    <td className="p-2 text-center">{ville.forwardBuffer}</td>
                    <td className="p-2 text-center">{ville.forwardEquity}%</td>
                    <td className="p-2 text-center">{ville.forwardDebt}%</td>
                    <td className="p-2 text-center">{ville.forwardTaux}%</td>
                    <td className="p-2 text-center">{ville.futuresBuffer}</td>
                    <td className="p-2 text-center">{ville.futuresEquity}%</td>
                    <td className="p-2 text-center">{ville.futuresDebt}%</td>
                    <td className="p-2 text-center">{ville.futuresTaux}%</td>
                    <td className="p-2 text-center font-semibold">{ville.ratioDE.toFixed(2)}x</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Vue Financement Détaillé
  const renderFinancementDetail = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Financement Détaillé - 12 Localisations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th rowSpan="2" className="p-2 text-left">Ville</th>
                  <th rowSpan="2" className="p-2 text-center">Rank</th>
                  <th colSpan="6" className="p-2 text-center border-l">An 1 (M€)</th>
                  <th colSpan="6" className="p-2 text-center border-l">An 2 (M€)</th>
                  <th colSpan="6" className="p-2 text-center border-l">An 3 (M€)</th>
                </tr>
                <tr className="bg-gray-50/50 text-xs">
                  <th className="p-2 text-center border-l">Forward</th>
                  <th className="p-2 text-center">Futures</th>
                  <th className="p-2 text-center">Equity</th>
                  <th className="p-2 text-center">Dette</th>
                  <th className="p-2 text-center">Frais</th>
                  <th className="p-2 text-center font-semibold">Total</th>
                  <th className="p-2 text-center border-l">Forward</th>
                  <th className="p-2 text-center">Futures</th>
                  <th className="p-2 text-center">Equity</th>
                  <th className="p-2 text-center">Dette</th>
                  <th className="p-2 text-center">Frais</th>
                  <th className="p-2 text-center font-semibold">Total</th>
                  <th className="p-2 text-center border-l">Forward</th>
                  <th className="p-2 text-center">Futures</th>
                  <th className="p-2 text-center">Equity</th>
                  <th className="p-2 text-center">Dette</th>
                  <th className="p-2 text-center">Frais</th>
                  <th className="p-2 text-center font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {financementDetailData
                  .sort((a, b) => a.ranking - b.ranking)
                  .map((ville, index) => (
                    <tr key={ville.ville} className={index % 2 === 0 ? 'bg-gray-50/30' : ''}>
                      <td className="p-2 font-medium">{ville.ville}</td>
                      <td className="p-2 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          ville.ranking <= 3 ? 'bg-teal-100/50 text-teal-700' :
                          ville.ranking <= 6 ? 'bg-sky-100/50 text-sky-700' :
                          ville.ranking <= 9 ? 'bg-gray-100 text-gray-700' :
                          'bg-rose-100/50 text-rose-700'
                        }`}>
                          {ville.ranking}
                        </span>
                      </td>
                      <td className="p-2 text-right border-l">{ville.an1.forward.toFixed(2)}</td>
                      <td className="p-2 text-right">{ville.an1.futures.toFixed(2)}</td>
                      <td className="p-2 text-right font-medium text-green-600">{ville.an1.equity.toFixed(2)}</td>
                      <td className="p-2 text-right">{ville.an1.dette.toFixed(2)}</td>
                      <td className="p-2 text-right text-red-600">{ville.an1.frais.toFixed(2)}</td>
                      <td className="p-2 text-right font-bold">{ville.an1.total.toFixed(2)}</td>
                      <td className="p-2 text-right border-l">{ville.an2.forward.toFixed(2)}</td>
                      <td className="p-2 text-right">{ville.an2.futures.toFixed(2)}</td>
                      <td className="p-2 text-right font-medium text-green-600">{ville.an2.equity.toFixed(2)}</td>
                      <td className="p-2 text-right">{ville.an2.dette.toFixed(2)}</td>
                      <td className="p-2 text-right text-red-600">{ville.an2.frais.toFixed(2)}</td>
                      <td className="p-2 text-right font-bold">{ville.an2.total.toFixed(2)}</td>
                      <td className="p-2 text-right border-l">{ville.an3.forward.toFixed(2)}</td>
                      <td className="p-2 text-right">{ville.an3.futures.toFixed(2)}</td>
                      <td className="p-2 text-right font-medium text-green-600">{ville.an3.equity.toFixed(2)}</td>
                      <td className="p-2 text-right">{ville.an3.dette.toFixed(2)}</td>
                      <td className="p-2 text-right text-red-600">{ville.an3.frais.toFixed(2)}</td>
                      <td className="p-2 text-right font-bold">{ville.an3.total.toFixed(2)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Graphiques comparatifs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Évolution du Financement Total - Top 6</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={financementDetailData.filter(v => v.ranking <= 6).map(v => ({
                ville: v.ville,
                'An 1': v.an1.total,
                'An 2': v.an2.total,
                'An 3': v.an3.total
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ville" />
                <YAxis />
                <Tooltip formatter={(value) => `${value} M€`} />
                <Legend />
                <Line type="monotone" dataKey="An 1" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="An 2" stroke="#82ca9d" strokeWidth={2} />
                <Line type="monotone" dataKey="An 3" stroke="#ffc658" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Répartition Forward vs Futures - An 3</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={financementDetailData.sort((a, b) => a.ranking - b.ranking).slice(0, 6).map(v => ({
                ville: v.ville,
                Forward: v.an3.forward,
                Futures: v.an3.futures
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ville" />
                <YAxis />
                <Tooltip formatter={(value) => `${value} M€`} />
                <Legend />
                <Bar dataKey="Forward" stackId="a" fill="#3b82f6" />
                <Bar dataKey="Futures" stackId="a" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Vue Top 5 & Récapitulatif
  const renderTop5 = () => (
    <div className="space-y-6">
      {/* Cards métriques Top 5 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {top5Data.map((ville, index) => {
          const colors = ['green', 'blue', 'purple', 'orange', 'yellow'];
          const color = colors[index];
          
          return (
            <Card key={index} className={`bg-gradient-to-br from-${color}-50 to-${color}-100`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>#{ville.ranking}</span>
                  <span>{ville.ville}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-gray-600">Financement An1</p>
                    <p className="text-xl font-bold">{ville.an1.total.toFixed(2)} M€</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Equity An1</p>
                    <p className="font-semibold">{ville.an1.equity.toFixed(2)} M€</p>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-gray-600">Score DFI</p>
                    <p className="font-semibold">{ville.scoreDFI}/10</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tableau détaillé Top 5 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Top 5 Localisations - Analyse Détaillée</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left">Rang</th>
                  <th className="p-3 text-left">Ville</th>
                  <th className="p-3 text-center">Statut</th>
                  <th className="p-3 text-center" colSpan="3">Equity par année (M€)</th>
                  <th className="p-3 text-center" colSpan="3">Métriques clés</th>
                  <th className="p-3 text-center">Score Final</th>
                </tr>
                <tr className="bg-gray-50/50 text-sm">
                  <th className="p-2"></th>
                  <th className="p-2"></th>
                  <th className="p-2"></th>
                  <th className="p-2">An 1</th>
                  <th className="p-2">An 2</th>
                  <th className="p-2">An 3</th>
                  <th className="p-2">Total 3ans</th>
                  <th className="p-2">Ratio D/E</th>
                  <th className="p-2">Score DFI</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {top5Data.map((ville, index) => (
                  <tr key={index} className={index === 0 ? 'bg-gray-100/50' : ''}>
                    <td className="p-3 text-center font-bold text-lg">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ville.ranking}
                    </td>
                    <td className="p-3 font-semibold">{ville.ville}</td>
                    <td className="p-3 text-center">
                      <span className={`px-3 py-1 rounded text-sm font-semibold ${
                        ville.statut === 'EXCELLENT' ? 'bg-teal-100/50 text-teal-700' :
                        ville.statut === 'BON' ? 'bg-sky-100/50 text-sky-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {ville.statut}
                      </span>
                    </td>
                    <td className="p-3 text-center">{ville.an1.equity.toFixed(2)}</td>
                    <td className="p-3 text-center">{ville.an2.equity.toFixed(2)}</td>
                    <td className="p-3 text-center">{ville.an3.equity.toFixed(2)}</td>
                    <td className="p-3 text-center font-semibold">{ville.an3.total.toFixed(2)}</td>
                    <td className="p-3 text-center">{hypothesesData.find(h => h.ville === ville.ville)?.ratioDE.toFixed(2)}x</td>
                    <td className="p-3 text-center">{ville.scoreDFI}/10</td>
                    <td className="p-3 text-center font-bold text-blue-600 text-lg">
                      {ville.scoreTotal.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Analyse qualitative */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Forces - Top 5</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {top5Data.map((ville, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-700">#{ville.ranking} {ville.ville}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {ville.ville === 'Singapour' && 'Financement minimum requis (11.12 M€), excellents taux (6-6.5%), accès IFC excellent'}
                    {ville.ville === 'Amsterdam' && 'Structure équilibrée, accès FMO excellent, hub européen du cacao'}
                    {ville.ville === 'Genève' && 'Meilleurs scores DFI (10/10), taux compétitifs, centre financier mondial'}
                    {ville.ville === 'Hambourg' && 'Port principal européen, bonne structure de coûts, accès direct marché'}
                    {ville.ville === 'Paris' && 'Accès AFD/Proparco excellent, convention fiscale CI, écosystème mature'}
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
                  <h4 className="font-semibold text-orange-700">#{ville.ranking} {ville.ville}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {ville.ville === 'Singapour' && 'Distance importante avec la CI, décalage horaire, accès DFI francophone limité'}
                    {ville.ville === 'Amsterdam' && 'Taux légèrement plus élevés (6.8-7.3%), fiscalité 25.8%'}
                    {ville.ville === 'Genève' && 'Coûts de vie élevés impactant les frais, réglementation suisse stricte'}
                    {ville.ville === 'Hambourg' && 'Score DFI moyen (6/10), fiscalité élevée 30%, bureaucratie'}
                    {ville.ville === 'Paris' && 'Besoins en capital plus élevés, fiscalité 25% + CVAE'}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accès DFI Top 5 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Accès aux Financements DFI - Top 5</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2 text-left">Ville</th>
                  <th className="p-2 text-center">AFD/Proparco</th>
                  <th className="p-2 text-center">FMO</th>
                  <th className="p-2 text-center">BII/CDC</th>
                  <th className="p-2 text-center">IFC</th>
                  <th className="p-2 text-center">Enabel/IDH/Root</th>
                  <th className="p-2 text-center">Oikocredit/Triodos</th>
                  <th className="p-2 text-center">Score Total</th>
                </tr>
              </thead>
              <tbody>
                {top5Data.map((ville, index) => {
                  const dfi = scoreDFI[ville.ville];
                  return (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="p-2 font-medium">{ville.ville}</td>
                      <td className="p-2 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getColorByStatus(dfi.afd)}`}>
                          {dfi.afd}
                        </span>
                      </td>
                      <td className="p-2 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getColorByStatus(dfi.fmo)}`}>
                          {dfi.fmo}
                        </span>
                      </td>
                      <td className="p-2 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getColorByStatus(dfi.bii)}`}>
                          {dfi.bii}
                        </span>
                      </td>
                      <td className="p-2 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getColorByStatus(dfi.ifc)}`}>
                          {dfi.ifc}
                        </span>
                      </td>
                      <td className="p-2 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getColorByStatus(dfi.enabel)}`}>
                          {dfi.enabel}
                        </span>
                      </td>
                      <td className="p-2 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getColorByStatus(dfi.oiko)}`}>
                          {dfi.oiko}
                        </span>
                      </td>
                      <td className="p-2 text-center">
                        <span className={`px-3 py-1 rounded text-sm font-bold ${
                          dfi.score >= 9 ? 'bg-teal-100/50 text-teal-700' :
                          dfi.score >= 7 ? 'bg-sky-100/50 text-sky-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {dfi.score}/10
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recommandation stratégique */}
      <Card className="bg-gradient-to-br from-indigo-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-xl">Recommandations Stratégiques Financement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-indigo-800 mb-2">Structure optimale recommandée :</h4>
              <ol className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="font-bold text-indigo-600 mr-2">1.</span>
                  <div>
                    <strong>Singapour</strong> : Besoins minimaux (11.12 M€) et taux attractifs pour démarrage rapide
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-indigo-600 mr-2">2.</span>
                  <div>
                    <strong>Mix Genève/Paris</strong> : Combiner accès DFI excellent avec structure optimisée
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-indigo-600 mr-2">3.</span>
                  <div>
                    <strong>Éviter</strong> : Maroc CFC (22.68 M€ An1) et Maurice malgré avantages fiscaux
                  </div>
                </li>
              </ol>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-teal-100/50 p-3 rounded">
                <p className="text-xs text-green-600">Equity moyen Top 5 An1</p>
                <p className="text-xl font-bold text-green-800">1.99 M€</p>
              </div>
              <div className="bg-sky-100/50 p-3 rounded">
                <p className="text-xs text-blue-600">Financement total moyen An3</p>
                <p className="text-xl font-bold text-blue-800">48.0 M€</p>
              </div>
              <div className="bg-gray-100 p-3 rounded">
                <p className="text-xs text-purple-600">Taux moyen Top 5</p>
                <p className="text-xl font-bold text-purple-800">6.8%</p>
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
            onClick={() => setActiveTab('hypotheses')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'hypotheses'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Hypothèses
          </button>
          <button
            onClick={() => setActiveTab('detail')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'detail'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Financement Détaillé
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
      {activeTab === 'hypotheses' && renderHypotheses()}
      {activeTab === 'detail' && renderFinancementDetail()}
      {activeTab === 'top5' && renderTop5()}
    </div>
  );
};

export default Financement;