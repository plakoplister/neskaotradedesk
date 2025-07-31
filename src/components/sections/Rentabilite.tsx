import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const Rentabilite: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pl-details');

  // Données EBITDA pour toutes les villes incluant Chypre - DONNÉES RÉELLES (en millions EUR)
  const ebitdaData = [
    { ville: 'Paris', an1: 0.12, an2: 1.40, an3: 6.81, roi3ans: 543.2, totalResNet: 5.17, cashReqis: 0.95 },
    { ville: 'Genève', an1: -0.09, an2: 1.23, an3: 6.54, roi3ans: 570.8, totalResNet: 4.95, cashReqis: 0.89 },
    { ville: 'Amsterdam', an1: 0.04, an2: 1.34, an3: 6.68, roi3ans: 595.4, totalResNet: 5.18, cashReqis: 0.87 },
    { ville: 'Londres', an1: -0.34, an2: 1.09, an3: 6.37, roi3ans: 473.0, totalResNet: 4.73, cashReqis: 1.00 },
    { ville: 'Hambourg', an1: 0.05, an2: 1.38, an3: 6.72, roi3ans: 547.3, totalResNet: 5.07, cashReqis: 0.93 },
    { ville: 'Andorre', an1: 0.38, an2: 1.61, an3: 7.01, roi3ans: 319.4, totalResNet: 4.58, cashReqis: 1.44 },
    { ville: 'Chypre', an1: 0.20, an2: 1.33, an3: 6.65, roi3ans: 394.1, totalResNet: 4.64, cashReqis: 1.19 },
    { ville: 'Maurice', an1: 0.41, an2: 1.64, an3: 7.05, roi3ans: 234.0, totalResNet: 4.30, cashReqis: 1.88 },
    { ville: 'Maroc CFC', an1: 0.47, an2: 1.70, an3: 7.12, roi3ans: 147.2, totalResNet: 4.10, cashReqis: 2.84 },
    { ville: 'Dubai', an1: 0.00, an2: 1.33, an3: 6.67, roi3ans: 342.3, totalResNet: 4.26, cashReqis: 1.30 },
    { ville: 'Tel Aviv', an1: -0.03, an2: 1.30, an3: 6.61, roi3ans: 384.4, totalResNet: 3.86, cashReqis: 1.09 },
    { ville: 'Singapour', an1: 0.01, an2: 1.12, an3: 6.41, roi3ans: 642.0, totalResNet: 5.29, cashReqis: 0.81 }
  ];

  // Données P&L détaillées pour chaque ville (en millions EUR) - DONNÉES RÉELLES DU FICHIER
  const plDetailData = [
    {
      ville: 'Paris',
      ca: { an1: 27.08, an2: 66.29, an3: 151.72 },
      margeTrading: { an1: 0.534, an2: 1.309, an3: 2.939 },
      gainsFutures: { an1: 0.354, an2: 0.817, an3: 4.759 },
      totalRevenus: { an1: 0.888, an2: 2.126, an3: 7.698 },
      totalCharges: { an1: 0.77, an2: 0.73, an3: 0.89 },
      ebitda: { an1: 0.12, an2: 1.40, an3: 6.81 },
      resultatNet: { an1: -0.36, an2: 0.37, an3: 5.16 },
      fiscalite: '25% + CVAE'
    },
    {
      ville: 'Genève',
      ca: { an1: 27.08, an2: 66.29, an3: 151.72 },
      margeTrading: { an1: 0.534, an2: 1.309, an3: 2.939 },
      gainsFutures: { an1: 0.354, an2: 0.817, an3: 4.759 },
      totalRevenus: { an1: 0.888, an2: 2.126, an3: 7.698 },
      totalCharges: { an1: 0.98, an2: 0.90, an3: 1.16 },
      ebitda: { an1: -0.09, an2: 1.23, an3: 6.54 },
      resultatNet: { an1: -0.51, an2: 0.34, an3: 5.12 },
      fiscalite: '15.15%'
    },
    {
      ville: 'Amsterdam',
      ca: { an1: 27.08, an2: 66.29, an3: 151.72 },
      margeTrading: { an1: 0.534, an2: 1.309, an3: 2.939 },
      gainsFutures: { an1: 0.354, an2: 0.817, an3: 4.759 },
      totalRevenus: { an1: 0.888, an2: 2.126, an3: 7.698 },
      totalCharges: { an1: 0.80, an2: 0.79, an3: 1.02 },
      ebitda: { an1: 0.04, an2: 1.34, an3: 6.68 },
      resultatNet: { an1: -0.48, an2: 0.43, an3: 5.23 },
      fiscalite: '25.8%'
    },
    {
      ville: 'Londres',
      ca: { an1: 27.08, an2: 66.29, an3: 151.72 },
      margeTrading: { an1: 0.534, an2: 1.309, an3: 2.939 },
      gainsFutures: { an1: 0.354, an2: 0.817, an3: 4.759 },
      totalRevenus: { an1: 0.888, an2: 2.126, an3: 7.698 },
      totalCharges: { an1: 1.12, an2: 1.04, an3: 1.33 },
      ebitda: { an1: -0.34, an2: 1.09, an3: 6.37 },
      resultatNet: { an1: -0.71, an2: 0.31, an3: 5.13 },
      fiscalite: '19%'
    },
    {
      ville: 'Hambourg',
      ca: { an1: 27.08, an2: 66.29, an3: 151.72 },
      margeTrading: { an1: 0.534, an2: 1.309, an3: 2.939 },
      gainsFutures: { an1: 0.354, an2: 0.817, an3: 4.759 },
      totalRevenus: { an1: 0.888, an2: 2.126, an3: 7.698 },
      totalCharges: { an1: 0.78, an2: 0.75, an3: 0.98 },
      ebitda: { an1: 0.05, an2: 1.38, an3: 6.72 },
      resultatNet: { an1: -0.46, an2: 0.39, an3: 5.14 },
      fiscalite: '30%'
    },
    {
      ville: 'Andorre',
      ca: { an1: 27.08, an2: 66.29, an3: 151.72 },
      margeTrading: { an1: 0.534, an2: 1.309, an3: 2.939 },
      gainsFutures: { an1: 0.354, an2: 0.817, an3: 4.759 },
      totalRevenus: { an1: 0.888, an2: 2.126, an3: 7.698 },
      totalCharges: { an1: 0.52, an2: 0.52, an3: 0.69 },
      ebitda: { an1: 0.38, an2: 1.61, an3: 7.01 },
      resultatNet: { an1: -0.25, an2: 0.22, an3: 4.61 },
      fiscalite: '10%'
    },
    {
      ville: 'Chypre',
      ca: { an1: 27.08, an2: 66.29, an3: 151.72 },
      margeTrading: { an1: 0.534, an2: 1.309, an3: 2.939 },
      gainsFutures: { an1: 0.354, an2: 0.817, an3: 4.597 },
      totalRevenus: { an1: 0.888, an2: 2.126, an3: 7.536 },
      totalCharges: { an1: 0.83, an2: 0.80, an3: 1.01 },
      ebitda: { an1: 0.20, an2: 1.33, an3: 6.65 },
      resultatNet: { an1: -0.34, an2: 0.05, an3: 4.93 },
      fiscalite: '10%'
    },
    {
      ville: 'Maurice',
      ca: { an1: 27.08, an2: 66.29, an3: 151.72 },
      margeTrading: { an1: 0.534, an2: 1.309, an3: 2.939 },
      gainsFutures: { an1: 0.354, an2: 0.817, an3: 4.759 },
      totalRevenus: { an1: 0.888, an2: 2.126, an3: 7.698 },
      totalCharges: { an1: 0.48, an2: 0.49, an3: 0.65 },
      ebitda: { an1: 0.41, an2: 1.64, an3: 7.05 },
      resultatNet: { an1: -0.26, an2: 0.15, an3: 4.41 },
      fiscalite: '15%'
    },
    {
      ville: 'Maroc CFC',
      ca: { an1: 27.08, an2: 66.29, an3: 151.72 },
      margeTrading: { an1: 0.534, an2: 1.309, an3: 2.939 },
      gainsFutures: { an1: 0.354, an2: 0.817, an3: 4.759 },
      totalRevenus: { an1: 0.888, an2: 2.126, an3: 7.698 },
      totalCharges: { an1: 0.41, an2: 0.43, an3: 0.58 },
      ebitda: { an1: 0.47, an2: 1.70, an3: 7.12 },
      resultatNet: { an1: -0.24, an2: 0.14, an3: 4.20 },
      fiscalite: '8.75%'
    },
    {
      ville: 'Dubai',
      ca: { an1: 27.08, an2: 66.29, an3: 151.72 },
      margeTrading: { an1: 0.534, an2: 1.309, an3: 2.939 },
      gainsFutures: { an1: 0.354, an2: 0.817, an3: 4.759 },
      totalRevenus: { an1: 0.888, an2: 2.126, an3: 7.698 },
      totalCharges: { an1: 0.84, an2: 0.80, an3: 1.03 },
      ebitda: { an1: 0.00, an2: 1.33, an3: 6.67 },
      resultatNet: { an1: -0.48, an2: 0.29, an3: 4.45 },
      fiscalite: '0%'
    },
    {
      ville: 'Tel Aviv',
      ca: { an1: 27.08, an2: 66.29, an3: 151.72 },
      margeTrading: { an1: 0.534, an2: 1.309, an3: 2.939 },
      gainsFutures: { an1: 0.354, an2: 0.817, an3: 4.759 },
      totalRevenus: { an1: 0.888, an2: 2.126, an3: 7.698 },
      totalCharges: { an1: 0.87, an2: 0.83, an3: 1.09 },
      ebitda: { an1: -0.03, an2: 1.30, an3: 6.61 },
      resultatNet: { an1: -0.53, an2: 0.20, an3: 4.19 },
      fiscalite: '23%'
    },
    {
      ville: 'Singapour',
      ca: { an1: 27.08, an2: 66.29, an3: 151.72 },
      margeTrading: { an1: 0.534, an2: 1.309, an3: 2.939 },
      gainsFutures: { an1: 0.354, an2: 0.817, an3: 4.759 },
      totalRevenus: { an1: 0.888, an2: 2.126, an3: 7.698 },
      totalCharges: { an1: 1.05, an2: 1.01, an3: 1.29 },
      ebitda: { an1: 0.01, an2: 1.12, an3: 6.41 },
      resultatNet: { an1: -0.34, an2: 0.39, an3: 5.24 },
      fiscalite: '5-10%'
    }
  ];

  // Classement basé sur les données du tableau récapitulatif final
  const classementFinal = [
    { ville: 'Singapour', rang: 1, ebitdaAn1: 0.01, resultatNet3ans: 4.44, roi3ans: 678.4, pointForts: 'GTP 5-10%' },
    { ville: 'Maroc CFC', rang: 2, ebitdaAn1: 0.47, resultatNet3ans: 2.90, roi3ans: 102.8, pointForts: 'CFC 8,75%' },
    { ville: 'Maurice', rang: 3, ebitdaAn1: 0.41, resultatNet3ans: 2.75, roi3ans: 293.6, pointForts: 'Hub africain' },
    { ville: 'Andorre', rang: 4, ebitdaAn1: 0.38, resultatNet3ans: 3.28, roi3ans: 328.4, pointForts: 'Fiscalité 10%' },
    { ville: 'Genève', rang: 5, ebitdaAn1: -0.09, resultatNet3ans: 3.58, roi3ans: 403.4, pointForts: 'Finance hub' },
    { ville: 'Paris', rang: 6, ebitdaAn1: 0.12, resultatNet3ans: 3.43, roi3ans: 353.7, pointForts: 'Liens CI' },
    { ville: 'Amsterdam', rang: 7, ebitdaAn1: 0.04, resultatNet3ans: 3.41, roi3ans: 354.0, pointForts: 'Port #1' },
    { ville: 'Dubai', rang: 8, ebitdaAn1: 0.00, resultatNet3ans: 3.38, roi3ans: 365.9, pointForts: 'Zone franche' },
    { ville: 'Chypre', rang: 9, ebitdaAn1: 0.20, resultatNet3ans: 3.52, roi3ans: 332.8, pointForts: 'UE member' },
    { ville: 'Hambourg', rang: 10, ebitdaAn1: 0.05, resultatNet3ans: 2.56, roi3ans: 267.7, pointForts: 'Port #2' },
    { ville: 'Londres', rang: 11, ebitdaAn1: -0.34, resultatNet3ans: 2.53, roi3ans: 253.0, pointForts: 'Coûts élevés' },
    { ville: 'Tel Aviv', rang: 12, ebitdaAn1: -0.03, resultatNet3ans: 2.34, roi3ans: 255.0, pointForts: 'Tech hub' }
  ];

  // Données scores simplifiées pour compatibilité
  const scoresData = [
    { ville: 'Paris', scoreROI: 5.46, scorePondere: 7.87, statut: 'RECOMMANDÉ' },
    { ville: 'Genève', scoreROI: 5.92, scorePondere: 7.81, statut: 'RECOMMANDÉ' },
    { ville: 'Amsterdam', scoreROI: 5.61, scorePondere: 7.65, statut: 'RECOMMANDÉ' },
    { ville: 'Singapour', scoreROI: 10.00, scorePondere: 7.49, statut: 'RECOMMANDÉ' },
    { ville: 'Hambourg', scoreROI: 4.19, scorePondere: 6.78, statut: 'POSSIBLE' },
    { ville: 'Londres', scoreROI: 3.34, scorePondere: 6.72, statut: 'POSSIBLE' },
    { ville: 'Chypre', scoreROI: 4.95, scorePondere: 6.51, statut: 'POSSIBLE' },
    { ville: 'Maurice', scoreROI: 1.09, scorePondere: 5.62, statut: 'DÉCONSEILLÉ' },
    { ville: 'Andorre', scoreROI: 3.00, scorePondere: 4.20, statut: 'DÉCONSEILLÉ' },
    { ville: 'Dubai', scoreROI: 3.72, scorePondere: 3.50, statut: 'DÉCONSEILLÉ' },
    { ville: 'Maroc CFC', scoreROI: 0.00, scorePondere: 2.00, statut: 'NO GO' },
    { ville: 'Tel Aviv', scoreROI: 2.55, scorePondere: 1.50, statut: 'NO GO' }
  ];

  // Top 5 villes par score pondéré (classement correct basé sur l'analyse décisionnelle)
  const top5Data = [
    { 
      ville: 'Paris', rang: 1, 
      totalResNet: 5.14, roi3ans: 171.6, irr: 38, payback: 2.3,
      an1: 0.12, an2: 1.40, an3: 6.81,
      statut: 'RECOMMANDÉ', scoreROI: 5.46, scorePondere: 7.87,
      fiscalite: '25% + CVAE', pointForts: 'Liens CI, écosystème mature'
    },
    { 
      ville: 'Genève', rang: 2, 
      totalResNet: 4.74, roi3ans: 185.2, irr: 40, payback: 2.4,
      an1: -0.23, an2: 2.34, an3: 9.09,
      statut: 'RECOMMANDÉ', scoreROI: 5.84, scorePondere: 7.72,
      fiscalite: '15%', pointForts: 'Centre financier, hub trading'
    },
    { 
      ville: 'Amsterdam', rang: 3, 
      totalResNet: 5.00, roi3ans: 188.6, irr: 41, payback: 2.3,
      an1: 0.07, an2: 2.56, an3: 9.40,
      statut: 'RECOMMANDÉ', scoreROI: 5.61, scorePondere: 7.65,
      fiscalite: '25.8%', pointForts: 'Proximité Afrique, Port'
    },
    { 
      ville: 'Singapour', rang: 4, 
      totalResNet: 6.88, roi3ans: 327.5, irr: 45, payback: 2.2,
      an1: 0.02, an2: 2.58, an3: 9.40,
      statut: 'RECOMMANDÉ', scoreROI: 10.00, scorePondere: 7.49,
      fiscalite: '5-10%', pointForts: 'ROI exceptionnel, Hub Asie'
    },
    { 
      ville: 'Hambourg', rang: 5, 
      totalResNet: 4.57, roi3ans: 140.9, irr: 34, payback: 2.5,
      an1: -0.20, an2: 2.29, an3: 8.96,
      statut: 'POSSIBLE', scoreROI: 4.19, scorePondere: 6.78,
      fiscalite: '30%', pointForts: 'Port majeur, proximité CI'
    }
  ];

  // Données pour les graphiques
  const top3Data = ebitdaData.filter(v => ['Paris', 'Genève', 'Amsterdam'].includes(v.ville));
  
  // Préparer les données pour le graphique d'évolution EBITDA
  const evolutionData = [
    { 
      annee: 'An 1', 
      Paris: 0.52, 
      Genève: -0.09, 
      Amsterdam: 0.07,
      Londres: -0.67,
      Singapour: 0.02
    },
    { 
      annee: 'An 2', 
      Paris: 2.84, 
      Genève: 2.75, 
      Amsterdam: 2.56,
      Londres: 1.86,
      Singapour: 2.58
    },
    { 
      annee: 'An 3', 
      Paris: 9.93, 
      Genève: 9.62, 
      Amsterdam: 9.40,
      Londres: 8.47,
      Singapour: 9.40
    }
  ];

  // Contenu par onglet
  const renderTabContent = () => {
    switch(activeTab) {
      case 'pl-details':
        return renderPLDetails();
      case 'top5':
        return renderTop5();
      default:
        return renderPLDetails();
    }
  };

  // Vue d'ensemble (contenu original)
  const renderOverview = () => (
    <>
      {/* Métriques clés Top 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-teal-50/30 to-teal-100/30">
          <CardHeader>
            <CardTitle className="text-teal-800">Paris 🇫🇷</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-teal-600">ROI 3 ans</p>
                <p className="text-2xl font-bold text-teal-900">171.6%</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-teal-600">IRR</p>
                  <p className="font-semibold text-teal-800">38%</p>
                </div>
                <div>
                  <p className="text-teal-600">Payback</p>
                  <p className="font-semibold text-teal-800">2.3 ans</p>
                </div>
              </div>
              <div className="pt-2 border-t border-green-200">
                <p className="text-xs text-teal-700">EBITDA An 3: 9.93 M€</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-sky-50/30 to-sky-100/30">
          <CardHeader>
            <CardTitle className="text-sky-800">Genève 🇨🇭</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-sky-600">ROI 3 ans</p>
                <p className="text-2xl font-bold text-sky-900">187.5%</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-sky-600">IRR</p>
                  <p className="font-semibold text-sky-800">40%</p>
                </div>
                <div>
                  <p className="text-sky-600">Payback</p>
                  <p className="font-semibold text-sky-800">2.5 ans</p>
                </div>
              </div>
              <div className="pt-2 border-t border-blue-200">
                <p className="text-xs text-sky-700">EBITDA An 3: 9.09 M€</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-100 to-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-800">Amsterdam 🇳🇱</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">ROI 3 ans</p>
                <p className="text-2xl font-bold text-gray-900">176.8%</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-600">IRR</p>
                  <p className="font-semibold text-gray-800">39%</p>
                </div>
                <div>
                  <p className="text-gray-600">Payback</p>
                  <p className="font-semibold text-gray-800">2.4 ans</p>
                </div>
              </div>
              <div className="pt-2 border-t border-orange-200">
                <p className="text-xs text-gray-700">EBITDA An 3: 9.40 M€</p>
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
                  const statutColor = score?.statut === 'RECOMMANDÉ' ? 'bg-teal-50/30' :
                                    score?.statut === 'POSSIBLE' ? 'bg-blue-50' :
                                    score?.statut === 'DÉCONSEILLÉ' ? 'bg-gray-100' : 'bg-rose-50/30';
                  
                  return (
                    <tr key={index} className={isTop3 ? statutColor : ''}>
                      <td className="border p-2 font-semibold">{ville.ville}</td>
                      <td className="border p-2 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          score?.statut === 'RECOMMANDÉ' ? 'bg-teal-50/30 text-teal-800' :
                          score?.statut === 'POSSIBLE' ? 'bg-blue-100 text-sky-800' :
                          score?.statut === 'DÉCONSEILLÉ' ? 'bg-orange-100 text-gray-800' :
                          'bg-rose-50/30 text-rose-800'
                        }`}>
                          {score?.statut || 'N/A'}
                        </span>
                      </td>
                      <td className={`border p-2 text-right ${ville.an1 < 0 ? 'text-rose-600' : 'text-teal-600'}`}>
                        {ville.an1.toFixed(2)}
                      </td>
                      <td className="border p-2 text-right font-semibold">{ville.an3.toFixed(2)}</td>
                      <td className="border p-2 text-right font-bold">{ville.roi3ans}%</td>
                      <td className="border p-2 text-right">{ville.irr}%</td>
                      <td className="border p-2 text-right">{ville.payback} ans</td>
                      <td className="border p-2 text-right">{score?.scoreROI?.toFixed(2) || 'N/A'}</td>
                      <td className="border p-2 text-right font-bold text-sky-600">
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
                    
                    <div className="grid grid-cols-4 gap-2 font-bold text-sky-600 border-t pt-1">
                      <div>EBITDA</div>
                      <div className={`text-right ${ville.ebitda.an1 < 0 ? 'text-rose-600' : ''}`}>
                        {ville.ebitda.an1.toFixed(2)}
                      </div>
                      <div className="text-right">{ville.ebitda.an2.toFixed(2)}</div>
                      <div className="text-right">{ville.ebitda.an3.toFixed(2)}</div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 font-bold border-t pt-1">
                      <div>Résultat Net</div>
                      <div className={`text-right ${ville.resultatNet.an1 < 0 ? 'text-rose-600' : 'text-teal-600'}`}>
                        {ville.resultatNet.an1.toFixed(2)}
                      </div>
                      <div className={`text-right ${ville.resultatNet.an2 < 0 ? 'text-rose-600' : 'text-teal-600'}`}>
                        {ville.resultatNet.an2.toFixed(2)}
                      </div>
                      <div className="text-right text-teal-600">{ville.resultatNet.an3.toFixed(2)}</div>
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
                  <tr key={index} className={index === 0 ? 'bg-gray-100' : ''}>
                    <td className="border p-3 text-center font-bold text-lg">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                    </td>
                    <td className="border p-3 font-semibold">{ville.ville}</td>
                    <td className="border p-3 text-center">
                      <span className={`px-3 py-1 rounded text-sm font-semibold ${
                        ville.statut === 'RECOMMANDÉ' ? 'bg-teal-50/30 text-teal-800' :
                        'bg-blue-100 text-sky-800'
                      }`}>
                        {ville.statut}
                      </span>
                    </td>
                    <td className={`border p-3 text-right ${ville.an1 < 0 ? 'text-rose-600' : 'text-teal-600'}`}>
                      {ville.an1.toFixed(2)}
                    </td>
                    <td className="border p-3 text-right">{ville.an2.toFixed(2)}</td>
                    <td className="border p-3 text-right font-semibold">{ville.an3.toFixed(2)}</td>
                    <td className="border p-3 text-center font-bold text-teal-600">{ville.roi3ans}%</td>
                    <td className="border p-3 text-center">{ville.irr}%</td>
                    <td className="border p-3 text-center">{ville.payback} ans</td>
                    <td className="border p-3 text-center">{ville.scoreROI.toFixed(2)}</td>
                    <td className="border p-3 text-center font-bold text-sky-600 text-lg">
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
                <div key={index} className="border-l-4 border-sky-500 pl-4">
                  <h4 className="font-semibold text-sky-700">#{ville.rang} {ville.ville}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>ROI:</strong> {ville.roi3ans}% | <strong>Rés. Net 3 ans:</strong> {ville.totalResNet} M€ | {ville.pointForts}
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
                  <h4 className="font-semibold text-gray-700">#{ville.rang} {ville.ville}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {ville.ville === 'Paris' && 'Fiscalité élevée 25% + CVAE, coûts salariaux importants'}
                    {ville.ville === 'Genève' && 'Coûts opérationnels très élevés, marché saturé'}
                    {ville.ville === 'Amsterdam' && 'Fiscalité corporate 25.8%, concurrence forte'}
                    {ville.ville === 'Singapour' && 'Distance CI importante, décalage horaire, barrière culturelle'}
                    {ville.ville === 'Hambourg' && 'Fiscalité 30%, résultat net An1 négatif'}
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
              <h4 className="font-bold text-indigo-800 mb-2">Classement basé sur l'analyse décisionnelle multi-critères :</h4>
              <ol className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="font-bold text-indigo-600 mr-2">1.</span>
                  <div>
                    <strong>Paris</strong> : Meilleur score pondéré (7.87) - Proximité CI, écosystème mature, liens historiques
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-indigo-600 mr-2">2.</span>
                  <div>
                    <strong>Genève</strong> : Score 7.72 - Centre financier mondial, expertise trading reconnue
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-indigo-600 mr-2">3.</span>
                  <div>
                    <strong>Amsterdam</strong> : Score 7.65 - Port européen majeur, proximité marchés africains
                  </div>
                </li>
              </ol>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-teal-50/30 p-3 rounded">
                <p className="text-xs text-teal-600">ROI moyen Top 5</p>
                <p className="text-xl font-bold text-teal-800">168%</p>
              </div>
              <div className="bg-blue-100 p-3 rounded">
                <p className="text-xs text-sky-600">Payback moyen</p>
                <p className="text-xl font-bold text-sky-800">2.4 ans</p>
              </div>
              <div className="bg-gray-100 p-3 rounded">
                <p className="text-xs text-gray-600">Résultat Net moyen</p>
                <p className="text-xl font-bold text-gray-800">5.7 M€</p>
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
            onClick={() => setActiveTab('pl-details')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'pl-details'
                ? 'border-sky-500 text-sky-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            P&L Détaillés (12 villes)
          </button>
          <button
            onClick={() => setActiveTab('top5')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'top5'
                ? 'border-sky-500 text-sky-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Top 5 & Récapitulatif
          </button>
        </nav>
      </div>

      {/* Contenu de l'onglet actif */}
      {renderTabContent()}

    </div>
  );
};

export default Rentabilite;