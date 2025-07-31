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
      an1: { forward: 4.26, futures: 2.60, equity: 0.95, dette: 5.92, frais: 0.43, total: 6.87 },
      an2: { forward: 9.84, futures: 6.01, equity: 2.19, dette: 13.66, frais: 0.98, total: 15.85 },
      an3: { forward: 16.07, futures: 9.81, equity: 3.57, dette: 22.32, frais: 1.60, total: 25.89 }
    },
    {
      ville: 'Genève',
      ranking: 3,
      an1: { forward: 3.72, futures: 2.60, equity: 0.89, dette: 5.43, frais: 0.37, total: 6.32 },
      an2: { forward: 8.59, futures: 6.01, equity: 2.06, dette: 12.54, frais: 0.84, total: 14.60 },
      an3: { forward: 14.03, futures: 9.81, equity: 3.37, dette: 20.48, frais: 1.37, total: 23.84 }
    },
    {
      ville: 'Amsterdam',
      ranking: 2,
      an1: { forward: 3.63, futures: 2.54, equity: 0.87, dette: 5.30, frais: 0.37, total: 6.17 },
      an2: { forward: 8.38, futures: 5.85, equity: 2.01, dette: 12.22, frais: 0.86, total: 14.23 },
      an3: { forward: 13.69, futures: 9.56, equity: 3.28, dette: 19.97, frais: 1.40, total: 23.25 }
    },
    {
      ville: 'Londres',
      ranking: 6,
      an1: { forward: 3.35, futures: 2.49, equity: 1.00, dette: 4.84, frais: 0.32, total: 5.84 },
      an2: { forward: 7.73, futures: 5.75, equity: 2.31, dette: 11.17, frais: 0.73, total: 13.48 },
      an3: { forward: 12.63, futures: 9.39, equity: 3.77, dette: 18.24, frais: 1.19, total: 22.01 }
    },
    {
      ville: 'Hambourg',
      ranking: 4,
      an1: { forward: 4.03, futures: 2.60, equity: 0.93, dette: 5.71, frais: 0.41, total: 6.63 },
      an2: { forward: 9.30, futures: 6.01, equity: 2.13, dette: 13.18, frais: 0.94, total: 15.31 },
      an3: { forward: 15.20, futures: 9.81, equity: 3.48, dette: 21.53, frais: 1.53, total: 25.01 }
    },
    {
      ville: 'Andorre',
      ranking: 9,
      an1: { forward: 5.44, futures: 3.11, equity: 1.44, dette: 7.12, frais: 0.58, total: 8.55 },
      an2: { forward: 12.56, futures: 7.18, equity: 3.32, dette: 16.42, frais: 1.34, total: 19.74 },
      an3: { forward: 20.52, futures: 11.73, equity: 5.43, dette: 26.82, frais: 2.20, total: 32.25 }
    },
    {
      ville: 'Chypre',
      ranking: 8,
      an1: { forward: 5.44, futures: 2.99, equity: 1.57, dette: 6.87, frais: 0.49, total: 8.43 },
      an2: { forward: 12.56, futures: 6.90, equity: 3.61, dette: 15.85, frais: 1.14, total: 19.45 },
      an3: { forward: 20.52, futures: 11.27, equity: 5.90, dette: 25.89, frais: 1.86, total: 31.78 }
    },
    {
      ville: 'Maurice',
      ranking: 10,
      an1: { forward: 6.03, futures: 3.39, equity: 1.88, dette: 7.53, frais: 0.62, total: 9.41 },
      an2: { forward: 13.91, futures: 7.81, equity: 4.35, dette: 17.38, frais: 1.42, total: 21.72 },
      an3: { forward: 22.72, futures: 12.76, equity: 7.10, dette: 28.38, frais: 2.32, total: 35.48 }
    },
    {
      ville: 'Maroc CFC',
      ranking: 11,
      an1: { forward: 7.38, futures: 3.96, equity: 2.84, dette: 8.51, frais: 0.66, total: 11.34 },
      an2: { forward: 17.03, futures: 9.14, equity: 6.55, dette: 19.63, frais: 1.51, total: 26.17 },
      an3: { forward: 27.82, futures: 14.93, equity: 10.69, dette: 32.06, frais: 2.46, total: 42.75 }
    },
    {
      ville: 'Dubai',
      ranking: 7,
      an1: { forward: 4.84, futures: 2.85, equity: 1.30, dette: 6.39, frais: 0.43, total: 7.69 },
      an2: { forward: 11.16, futures: 6.58, equity: 2.99, dette: 14.76, frais: 0.99, total: 17.75 },
      an3: { forward: 18.24, futures: 10.75, equity: 4.89, dette: 24.10, frais: 1.61, total: 28.99 }
    },
    {
      ville: 'Tel Aviv',
      ranking: 12,
      an1: { forward: 4.61, futures: 2.67, equity: 1.09, dette: 6.19, frais: 0.45, total: 7.28 },
      an2: { forward: 10.63, futures: 6.17, equity: 2.51, dette: 14.28, frais: 1.05, total: 16.79 },
      an3: { forward: 17.36, futures: 10.07, equity: 4.10, dette: 23.33, frais: 1.71, total: 27.43 }
    },
    {
      ville: 'Singapour',
      ranking: 1,
      an1: { forward: 3.08, futures: 2.49, equity: 0.81, dette: 4.76, frais: 0.30, total: 5.56 },
      an2: { forward: 7.09, futures: 5.75, equity: 1.86, dette: 10.98, frais: 0.68, total: 12.84 },
      an3: { forward: 11.59, futures: 9.39, equity: 3.04, dette: 17.94, frais: 1.12, total: 20.97 }
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
                <li>• <strong>An1:</strong> Hedge: <strong>2,950 T</strong> / Spec: <strong>295 T</strong></li>
                <li>• <strong>An2:</strong> Hedge: <strong>6,809 T</strong> / Spec: <strong>681 T</strong></li>
                <li>• <strong>An3:</strong> Hedge: <strong>14,830 T</strong> / Spec: <strong>1,483 T</strong></li>
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
                    {ville.ville === 'Singapour' && 'Financement minimum requis (5.56 M€), excellents taux (6-6.5%), accès IFC excellent'}
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
                    <strong>Singapour</strong> : Besoins minimaux (5.56 M€) et taux attractifs pour démarrage rapide
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
                    <strong>Éviter</strong> : Maroc CFC (11.34 M€ An1) et Maurice malgré avantages fiscaux
                  </div>
                </li>
              </ol>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-teal-100/50 p-3 rounded">
                <p className="text-xs text-green-600">Equity moyen Top 5 An1</p>
                <p className="text-xl font-bold text-green-800">0.89 M€</p>
              </div>
              <div className="bg-sky-100/50 p-3 rounded">
                <p className="text-xs text-blue-600">Financement total moyen An3</p>
                <p className="text-xl font-bold text-blue-800">23.8 M€</p>
              </div>
              <div className="bg-gray-100 p-3 rounded">
                <p className="text-xs text-purple-600">Taux moyen Top 5</p>
                <p className="text-xl font-bold text-purple-800">6.6%</p>
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