import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';

/**
 * Dashboard component with 12 scrollable city cards and dynamic tables
 * Shows EBITDA An1, required equity An1, and general score for each city
 * Dynamic tables update based on selected city
 */
const Dashboard: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('Paris');

  // Données complètes des 12 villes
  const villesData = [
    {
      nom: 'Paris',
      ebitdaAn1: 0.52,
      capitalInitial: 1.89,
      scoreGeneral: 7.87,
      statut: 'RECOMMANDÉ',
      color: 'bg-teal-50/30 border-teal-300 text-teal-700',
      flag: '🇫🇷'
    },
    {
      nom: 'Genève',
      ebitdaAn1: -0.09,
      capitalInitial: 1.78,
      scoreGeneral: 7.81,
      statut: 'RECOMMANDÉ',
      color: 'bg-teal-50/30 border-teal-300 text-teal-700',
      flag: '🇨🇭'
    },
    {
      nom: 'Amsterdam',
      ebitdaAn1: 0.07,
      capitalInitial: 1.74,
      scoreGeneral: 7.65,
      statut: 'RECOMMANDÉ',
      color: 'bg-teal-50/30 border-teal-300 text-teal-700',
      flag: '🇳🇱'
    },
    {
      nom: 'Singapour',
      ebitdaAn1: 0.02,
      capitalInitial: 1.61,
      scoreGeneral: 7.49,
      statut: 'POSSIBLE',
      color: 'bg-sky-50/30 border-sky-300 text-sky-700',
      flag: '🇸🇬'
    },
    {
      nom: 'Hambourg',
      ebitdaAn1: 0.09,
      capitalInitial: 1.85,
      scoreGeneral: 6.78,
      statut: 'POSSIBLE',
      color: 'bg-sky-50/30 border-sky-300 text-sky-700',
      flag: '🇩🇪'
    },
    {
      nom: 'Londres',
      ebitdaAn1: -0.67,
      capitalInitial: 2.00,
      scoreGeneral: 6.72,
      statut: 'POSSIBLE',
      color: 'bg-sky-50/30 border-sky-300 text-sky-700',
      flag: '🇬🇧'
    },
    {
      nom: 'Chypre',
      ebitdaAn1: 0.40,
      capitalInitial: 2.38,
      scoreGeneral: 6.51,
      statut: 'POSSIBLE',
      color: 'bg-sky-50/30 border-sky-300 text-sky-700',
      flag: '🇨🇾'
    },
    {
      nom: 'Maurice',
      ebitdaAn1: 0.82,
      capitalInitial: 1.20,
      scoreGeneral: 5.62,
      statut: 'DÉCONSEILLÉ',
      color: 'bg-gray-100 border-gray-300 text-gray-700',
      flag: '🇲🇺'
    },
    {
      nom: 'Andorre',
      ebitdaAn1: 0.76,
      capitalInitial: 1.15,
      scoreGeneral: 4.20,
      statut: 'DÉCONSEILLÉ',
      color: 'bg-gray-100 border-gray-300 text-gray-700',
      flag: '🇦🇩'
    },
    {
      nom: 'Dubai',
      ebitdaAn1: 0.00,
      capitalInitial: 1.70,
      scoreGeneral: 3.85,
      statut: 'NON RECOMMANDÉ',
      color: 'bg-rose-50/30 border-rose-300 text-rose-700',
      flag: '🇦🇪'
    },
    {
      nom: 'Tel Aviv',
      ebitdaAn1: -0.06,
      capitalInitial: 1.65,
      scoreGeneral: 3.20,
      statut: 'NON RECOMMANDÉ',
      color: 'bg-rose-50/30 border-rose-300 text-rose-700',
      flag: '🇮🇱'
    },
    {
      nom: 'Maroc CFC',
      ebitdaAn1: 0.93,
      capitalInitial: 1.00,
      scoreGeneral: 2.95,
      statut: 'NON RECOMMANDÉ',
      color: 'bg-rose-50/30 border-rose-300 text-rose-700',
      flag: '🇲🇦'
    }
  ];

  // Données P&L par ville - VRAIES DONNÉES du fichier rentabilite-updateddatas.js
  const plData: Record<string, any> = {
    Paris: {
      an1: { ca: 54.16, margeTrading: 1.78, sgaCosts: 1.26, ebitda: 0.52, resultatNet: -0.43 },
      an2: { ca: 132.57, margeTrading: 4.25, sgaCosts: 1.41, ebitda: 2.84, resultatNet: 0.69 },
      an3: { ca: 227.58, margeTrading: 11.55, sgaCosts: 1.62, ebitda: 9.93, resultatNet: 4.88 }
    },
    Genève: {
      an1: { ca: 54.16, margeTrading: 1.78, sgaCosts: 1.63, ebitda: -0.09, resultatNet: -0.82 },
      an2: { ca: 132.57, margeTrading: 4.25, sgaCosts: 1.50, ebitda: 2.75, resultatNet: 1.07 },
      an3: { ca: 227.58, margeTrading: 11.55, sgaCosts: 1.93, ebitda: 9.62, resultatNet: 5.96 }
    },
    Amsterdam: {
      an1: { ca: 54.16, margeTrading: 1.78, sgaCosts: 1.70, ebitda: 0.07, resultatNet: -0.77 },
      an2: { ca: 132.57, margeTrading: 4.25, sgaCosts: 1.69, ebitda: 2.56, resultatNet: 0.75 },
      an3: { ca: 227.58, margeTrading: 11.55, sgaCosts: 2.15, ebitda: 9.40, resultatNet: 4.83 }
    },
    Singapour: {
      an1: { ca: 54.16, margeTrading: 1.78, sgaCosts: 1.75, ebitda: 0.02, resultatNet: -0.67 },
      an2: { ca: 132.57, margeTrading: 4.25, sgaCosts: 1.68, ebitda: 2.58, resultatNet: 1.00 },
      an3: { ca: 227.58, margeTrading: 11.55, sgaCosts: 2.14, ebitda: 9.40, resultatNet: 6.55 }
    },
    Hambourg: {
      an1: { ca: 54.16, margeTrading: 1.78, sgaCosts: 1.68, ebitda: 0.09, resultatNet: -0.82 },
      an2: { ca: 132.57, margeTrading: 4.25, sgaCosts: 1.68, ebitda: 2.57, resultatNet: 0.60 },
      an3: { ca: 227.58, margeTrading: 11.55, sgaCosts: 2.17, ebitda: 9.38, resultatNet: 4.42 }
    },
    Londres: {
      an1: { ca: 54.16, margeTrading: 1.78, sgaCosts: 2.44, ebitda: -0.67, resultatNet: -1.40 },
      an2: { ca: 132.57, margeTrading: 4.25, sgaCosts: 2.39, ebitda: 1.86, resultatNet: 0.31 },
      an3: { ca: 227.58, margeTrading: 11.55, sgaCosts: 3.08, ebitda: 8.47, resultatNet: 5.06 }
    },
    Chypre: {
      an1: { ca: 54.16, margeTrading: 1.78, sgaCosts: 1.38, ebitda: 0.40, resultatNet: -0.51 },
      an2: { ca: 132.57, margeTrading: 4.25, sgaCosts: 1.34, ebitda: 2.91, resultatNet: 0.84 },
      an3: { ca: 227.58, margeTrading: 11.31, sgaCosts: 1.71, ebitda: 9.60, resultatNet: 5.59 }
    },
    Maurice: {
      an1: { ca: 54.16, margeTrading: 1.78, sgaCosts: 0.95, ebitda: 0.82, resultatNet: -0.51 },
      an2: { ca: 132.57, margeTrading: 4.25, sgaCosts: 0.97, ebitda: 3.29, resultatNet: 0.34 },
      an3: { ca: 227.58, margeTrading: 11.55, sgaCosts: 1.26, ebitda: 10.29, resultatNet: 4.74 }
    },
    Andorre: {
      an1: { ca: 54.16, margeTrading: 1.78, sgaCosts: 1.01, ebitda: 0.76, resultatNet: -0.40 },
      an2: { ca: 132.57, margeTrading: 4.25, sgaCosts: 1.00, ebitda: 3.25, resultatNet: 0.53 },
      an3: { ca: 227.58, margeTrading: 11.55, sgaCosts: 1.30, ebitda: 10.25, resultatNet: 5.26 }
    },
    Dubai: {
      an1: { ca: 54.16, margeTrading: 1.78, sgaCosts: 1.77, ebitda: 0.00, resultatNet: -0.95 },
      an2: { ca: 132.57, margeTrading: 4.25, sgaCosts: 1.73, ebitda: 2.52, resultatNet: 0.45 },
      an3: { ca: 227.58, margeTrading: 11.55, sgaCosts: 2.24, ebitda: 9.31, resultatNet: 5.99 }
    },
    'Tel Aviv': {
      an1: { ca: 54.16, margeTrading: 1.78, sgaCosts: 1.84, ebitda: -0.06, resultatNet: -1.06 },
      an2: { ca: 132.57, margeTrading: 4.25, sgaCosts: 1.81, ebitda: 2.44, resultatNet: 0.25 },
      an3: { ca: 227.58, margeTrading: 11.55, sgaCosts: 2.39, ebitda: 9.16, resultatNet: 4.54 }
    },
    'Maroc CFC': {
      an1: { ca: 54.16, margeTrading: 1.78, sgaCosts: 0.84, ebitda: 0.93, resultatNet: -0.47 },
      an2: { ca: 132.57, margeTrading: 4.25, sgaCosts: 0.85, ebitda: 3.40, resultatNet: 0.29 },
      an3: { ca: 227.58, margeTrading: 11.55, sgaCosts: 1.12, ebitda: 10.43, resultatNet: 4.95 }
    }
  };

  // Données SG&A par ville
  const sgaData: Record<string, any> = {
    Paris: {
      an1: { personnel: 630, bureaux: 75, itSystemes: 123, compliance: 51, voyages: 60, setup: 250, total: 1290 },
      an2: { personnel: 705, bureaux: 88, itSystemes: 153, compliance: 70, voyages: 75, setup: 0, total: 1218 },
      an3: { personnel: 810, bureaux: 98, itSystemes: 194, compliance: 124, voyages: 103, setup: 0, total: 1478 }
    },
    Genève: {
      an1: { personnel: 805, bureaux: 92, itSystemes: 123, compliance: 73, voyages: 60, setup: 250, total: 1632 },
      an2: { personnel: 922, bureaux: 104, itSystemes: 153, compliance: 88, voyages: 75, setup: 0, total: 1501 },
      an3: { personnel: 1182, bureaux: 120, itSystemes: 194, compliance: 141, voyages: 103, setup: 0, total: 1929 }
    },
    Amsterdam: {
      an1: { personnel: 693, bureaux: 100, itSystemes: 123, compliance: 51, voyages: 60, setup: 220, total: 1338 },
      an2: { personnel: 792, bureaux: 112, itSystemes: 153, compliance: 70, voyages: 75, setup: 0, total: 1318 },
      an3: { personnel: 1012, bureaux: 128, itSystemes: 194, compliance: 124, voyages: 103, setup: 0, total: 1697 }
    },
    Singapour: {
      an1: { personnel: 850, bureaux: 109, itSystemes: 123, compliance: 65, voyages: 75, setup: 320, total: 1754 },
      an2: { personnel: 970, bureaux: 123, itSystemes: 153, compliance: 82, voyages: 89, setup: 0, total: 1676 },
      an3: { personnel: 1245, bureaux: 146, itSystemes: 194, compliance: 137, voyages: 118, setup: 0, total: 2143 }
    },
    Hambourg: {
      an1: { personnel: 640, bureaux: 67, itSystemes: 123, compliance: 51, voyages: 60, setup: 200, total: 1296 },
      an2: { personnel: 730, bureaux: 75, itSystemes: 153, compliance: 70, voyages: 75, setup: 0, total: 1253 },
      an3: { personnel: 935, bureaux: 87, itSystemes: 194, compliance: 124, voyages: 103, setup: 0, total: 1638 }
    },
    Londres: {
      an1: { personnel: 920, bureaux: 150, itSystemes: 123, compliance: 65, voyages: 75, setup: 400, total: 1860 },
      an2: { personnel: 1050, bureaux: 169, itSystemes: 153, compliance: 82, voyages: 89, setup: 0, total: 1736 },
      an3: { personnel: 1350, bureaux: 195, itSystemes: 194, compliance: 137, voyages: 118, setup: 0, total: 2217 }
    },
    Chypre: {
      an1: { personnel: 700, bureaux: 69, itSystemes: 123, compliance: 55, voyages: 65, setup: 250, total: 1384 },
      an2: { personnel: 800, bureaux: 78, itSystemes: 153, compliance: 72, voyages: 78, setup: 0, total: 1330 },
      an3: { personnel: 1025, bureaux: 90, itSystemes: 194, compliance: 128, voyages: 108, setup: 0, total: 1678 }
    },
    Maurice: {
      an1: { personnel: 480, bureaux: 40, itSystemes: 123, compliance: 45, voyages: 55, setup: 150, total: 795 },
      an2: { personnel: 550, bureaux: 45, itSystemes: 153, compliance: 62, voyages: 68, setup: 0, total: 821 },
      an3: { personnel: 705, bureaux: 52, itSystemes: 194, compliance: 115, voyages: 93, setup: 0, total: 1086 }
    },
    Andorre: {
      an1: { personnel: 520, bureaux: 45, itSystemes: 123, compliance: 48, voyages: 58, setup: 160, total: 874 },
      an2: { personnel: 595, bureaux: 50, itSystemes: 153, compliance: 65, voyages: 71, setup: 0, total: 858 },
      an3: { personnel: 765, bureaux: 58, itSystemes: 194, compliance: 118, voyages: 96, setup: 0, total: 1142 }
    },
    Dubai: {
      an1: { personnel: 750, bureaux: 92, itSystemes: 123, compliance: 58, voyages: 70, setup: 280, total: 1408 },
      an2: { personnel: 860, bureaux: 104, itSystemes: 153, compliance: 75, voyages: 83, setup: 0, total: 1331 },
      an3: { personnel: 1100, bureaux: 120, itSystemes: 194, compliance: 131, voyages: 111, setup: 0, total: 1713 }
    },
    'Tel Aviv': {
      an1: { personnel: 780, bureaux: 105, itSystemes: 123, compliance: 62, voyages: 72, setup: 300, total: 1451 },
      an2: { personnel: 890, bureaux: 118, itSystemes: 153, compliance: 79, voyages: 85, setup: 0, total: 1382 },
      an3: { personnel: 1140, bureaux: 136, itSystemes: 194, compliance: 134, voyages: 114, setup: 0, total: 1817 }
    },
    'Maroc CFC': {
      an1: { personnel: 420, bureaux: 35, itSystemes: 123, compliance: 40, voyages: 50, setup: 150, total: 688 },
      an2: { personnel: 480, bureaux: 39, itSystemes: 153, compliance: 57, voyages: 63, setup: 0, total: 717 },
      an3: { personnel: 615, bureaux: 45, itSystemes: 194, compliance: 110, voyages: 86, setup: 0, total: 971 }
    }
  };

  // Données de financement par ville
  const financementData: Record<string, any> = {
    Paris: {
      an1: { total: 13.73, equity: 1.89, dette: 11.84, coutTotal: 0.85 },
      an2: { total: 31.69, equity: 4.37, dette: 27.32, coutTotal: 1.96 },
      an3: { total: 51.77, equity: 7.14, dette: 44.63, coutTotal: 3.20 }
    },
    Genève: {
      an1: { total: 12.64, equity: 1.78, dette: 10.86, coutTotal: 0.73 },
      an2: { total: 29.19, equity: 4.13, dette: 25.05, coutTotal: 1.68 },
      an3: { total: 47.68, equity: 6.75, dette: 40.93, coutTotal: 2.74 }
    },
    Amsterdam: {
      an1: { total: 12.33, equity: 1.74, dette: 10.59, coutTotal: 0.74 },
      an2: { total: 28.46, equity: 4.02, dette: 24.44, coutTotal: 1.71 },
      an3: { total: 46.49, equity: 6.57, dette: 39.92, coutTotal: 2.79 }
    },
    Singapour: {
      an1: { total: 11.67, equity: 1.61, dette: 9.67, coutTotal: 0.63 },
      an2: { total: 26.95, equity: 4.61, dette: 22.33, coutTotal: 1.45 },
      an3: { total: 44.02, equity: 7.53, dette: 36.49, coutTotal: 2.37 }
    },
    Hambourg: {
      an1: { total: 13.26, equity: 1.85, dette: 11.42, coutTotal: 0.81 },
      an2: { total: 30.62, equity: 4.26, dette: 26.36, coutTotal: 1.87 },
      an3: { total: 50.01, equity: 6.96, dette: 43.06, coutTotal: 3.05 }
    },
    Londres: {
      an1: { total: 11.67, equity: 2.00, dette: 9.67, coutTotal: 0.63 },
      an2: { total: 26.95, equity: 4.61, dette: 22.33, coutTotal: 1.45 },
      an3: { total: 44.02, equity: 7.53, dette: 36.49, coutTotal: 2.37 }
    },
    Chypre: {
      an1: { total: 13.26, equity: 1.85, dette: 11.42, coutTotal: 0.81 },
      an2: { total: 30.62, equity: 4.26, dette: 26.36, coutTotal: 1.87 },
      an3: { total: 50.01, equity: 6.96, dette: 43.06, coutTotal: 3.05 }
    },
    Maurice: {
      an1: { total: 10.50, equity: 1.20, dette: 9.30, coutTotal: 0.55 },
      an2: { total: 24.25, equity: 2.78, dette: 21.47, coutTotal: 1.25 },
      an3: { total: 39.60, equity: 4.54, dette: 35.06, coutTotal: 2.04 }
    },
    Andorre: {
      an1: { total: 10.15, equity: 1.15, dette: 9.00, coutTotal: 0.51 },
      an2: { total: 23.45, equity: 2.65, dette: 20.80, coutTotal: 1.17 },
      an3: { total: 38.30, equity: 4.34, dette: 33.96, coutTotal: 1.92 }
    },
    Dubai: {
      an1: { total: 12.10, equity: 1.70, dette: 10.40, coutTotal: 0.69 },
      an2: { total: 27.95, equity: 3.94, dette: 24.01, coutTotal: 1.59 },
      an3: { total: 45.65, equity: 6.43, dette: 39.22, coutTotal: 2.60 }
    },
    'Tel Aviv': {
      an1: { total: 11.75, equity: 1.65, dette: 10.10, coutTotal: 0.64 },
      an2: { total: 27.15, equity: 3.82, dette: 23.33, coutTotal: 1.48 },
      an3: { total: 44.35, equity: 6.25, dette: 38.10, coutTotal: 2.41 }
    },
    'Maroc CFC': {
      an1: { total: 9.00, equity: 1.00, dette: 8.00, coutTotal: 0.45 },
      an2: { total: 20.80, equity: 2.31, dette: 18.49, coutTotal: 1.04 },
      an3: { total: 34.00, equity: 3.78, dette: 30.22, coutTotal: 1.70 }
    }
  };

  // Données d'impact social par ville
  const impactSocialData: Record<string, any> = {
    Paris: {
      proximiteCI: 'Excellente',
      scoreESG: 8.5,
      projetsImpact: 12,
      emploisLocaux: 650,
      formationCI: 'Très élevée',
      transparence: 'Maximale'
    },
    Genève: {
      proximiteCI: 'Bonne',
      scoreESG: 7.9,
      projetsImpact: 8,
      emploisLocaux: 580,
      formationCI: 'Élevée',
      transparence: 'Très élevée'
    },
    Amsterdam: {
      proximiteCI: 'Moyenne',
      scoreESG: 7.75,
      projetsImpact: 6,
      emploisLocaux: 520,
      formationCI: 'Moyenne',
      transparence: 'Élevée'
    },
    Singapour: {
      proximiteCI: 'Faible',
      scoreESG: 7.2,
      projetsImpact: 4,
      emploisLocaux: 480,
      formationCI: 'Faible',
      transparence: 'Moyenne'
    },
    Hambourg: {
      proximiteCI: 'Moyenne',
      scoreESG: 7.4,
      projetsImpact: 5,
      emploisLocaux: 510,
      formationCI: 'Moyenne',
      transparence: 'Élevée'
    },
    Londres: {
      proximiteCI: 'Bonne',
      scoreESG: 6.8,
      projetsImpact: 7,
      emploisLocaux: 540,
      formationCI: 'Élevée',
      transparence: 'Élevée'
    },
    Chypre: {
      proximiteCI: 'Moyenne',
      scoreESG: 6.3,
      projetsImpact: 3,
      emploisLocaux: 420,
      formationCI: 'Moyenne',
      transparence: 'Moyenne'
    },
    Maurice: {
      proximiteCI: 'Bonne',
      scoreESG: 5.8,
      projetsImpact: 8,
      emploisLocaux: 380,
      formationCI: 'Élevée',
      transparence: 'Moyenne'
    },
    Andorre: {
      proximiteCI: 'Faible',
      scoreESG: 4.2,
      projetsImpact: 2,
      emploisLocaux: 290,
      formationCI: 'Faible',
      transparence: 'Faible'
    },
    Dubai: {
      proximiteCI: 'Très faible',
      scoreESG: 3.5,
      projetsImpact: 1,
      emploisLocaux: 350,
      formationCI: 'Très faible',
      transparence: 'Faible'
    },
    'Tel Aviv': {
      proximiteCI: 'Très faible',
      scoreESG: 3.2,
      projetsImpact: 1,
      emploisLocaux: 320,
      formationCI: 'Très faible',
      transparence: 'Faible'
    },
    'Maroc CFC': {
      proximiteCI: 'Excellente',
      scoreESG: 6.5,
      projetsImpact: 15,
      emploisLocaux: 450,
      formationCI: 'Très élevée',
      transparence: 'Moyenne'
    }
  };

  const selectedCityData = villesData.find(ville => ville.nom === selectedCity);


  return (
    <div className="space-y-6">
      {/* Cartes scrollables des 12 villes */}
      <div className="w-full">
        <h2 className="text-xl font-bold mb-4">Sélectionnez une ville pour voir les détails</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {villesData.map((ville) => (
            <button
              key={ville.nom}
              className={`min-w-64 cursor-pointer transition-all duration-200 border-2 rounded-lg ${
                selectedCity === ville.nom
                  ? 'ring-2 ring-blue-500 shadow-lg'
                  : 'hover:shadow-md'
              } ${ville.color}`}
              onClick={() => setSelectedCity(ville.nom)}
            >
              <Card className="w-full h-full border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="text-2xl">{ville.flag}</span>
                  {ville.nom}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">EBITDA An1:</span>
                    <span className={`font-bold ${ville.ebitdaAn1 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {ville.ebitdaAn1.toFixed(2)} M€
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Fonds propres An1:</span>
                    <span className="font-bold text-blue-600">
                      {ville.capitalInitial.toFixed(2)} M€
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Score général:</span>
                    <span className="font-bold text-purple-600">
                      {ville.scoreGeneral.toFixed(2)}/10
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      ville.statut === 'RECOMMANDÉ' ? 'bg-teal-100/50 text-teal-700' :
                      ville.statut === 'POSSIBLE' ? 'bg-sky-100/50 text-sky-700' :
                      ville.statut === 'DÉCONSEILLÉ' ? 'bg-gray-200 text-gray-700' :
                      'bg-rose-100/50 text-rose-700'
                    }`}>
                      {ville.statut}
                    </span>
                  </div>
                </div>
              </CardContent>
              </Card>
            </button>
          ))}
        </div>
      </div>

      {/* Tableaux dynamiques */}
      {selectedCityData && (
        <div className="space-y-6">
          <div className="text-center p-4 bg-gray-100 rounded-lg">
            <h2 className="text-2xl font-bold text-blue-800">
              Données détaillées pour {selectedCityData.flag} {selectedCity}
            </h2>
            <p className="text-blue-600">Score général: {selectedCityData.scoreGeneral}/10 • {selectedCityData.statut}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tableau P&L */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800">📊 Compte de Résultat (P&L)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50/50">
                        <th className="p-2 text-left">Poste</th>
                        <th className="p-2 text-right">An 1</th>
                        <th className="p-2 text-right">An 2</th>
                        <th className="p-2 text-right">An 3</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 font-semibold">Chiffre d'affaires</td>
                        <td className="p-2 text-right">{plData[selectedCity]?.an1?.ca?.toFixed(2) || 'N/A'} M€</td>
                        <td className="p-2 text-right">{plData[selectedCity]?.an2?.ca?.toFixed(2) || 'N/A'} M€</td>
                        <td className="p-2 text-right">{plData[selectedCity]?.an3?.ca?.toFixed(2) || 'N/A'} M€</td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="p-2">Marge Trading</td>
                        <td className="p-2 text-right">{plData[selectedCity]?.an1?.margeTrading?.toFixed(2) || 'N/A'} M€</td>
                        <td className="p-2 text-right">{plData[selectedCity]?.an2?.margeTrading?.toFixed(2) || 'N/A'} M€</td>
                        <td className="p-2 text-right">{plData[selectedCity]?.an3?.margeTrading?.toFixed(2) || 'N/A'} M€</td>
                      </tr>
                      <tr>
                        <td className="p-2">Coûts SG&A</td>
                        <td className="p-2 text-right">-{plData[selectedCity]?.an1?.sgaCosts?.toFixed(2) || 'N/A'} M€</td>
                        <td className="p-2 text-right">-{plData[selectedCity]?.an2?.sgaCosts?.toFixed(2) || 'N/A'} M€</td>
                        <td className="p-2 text-right">-{plData[selectedCity]?.an3?.sgaCosts?.toFixed(2) || 'N/A'} M€</td>
                      </tr>
                      <tr className="bg-sky-50/30 font-bold">
                        <td className="p-2">EBITDA</td>
                        <td className={`p-2 text-right ${(plData[selectedCity]?.an1?.ebitda || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {plData[selectedCity]?.an1?.ebitda?.toFixed(2) || 'N/A'} M€
                        </td>
                        <td className={`p-2 text-right ${(plData[selectedCity]?.an2?.ebitda || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {plData[selectedCity]?.an2?.ebitda?.toFixed(2) || 'N/A'} M€
                        </td>
                        <td className={`p-2 text-right ${(plData[selectedCity]?.an3?.ebitda || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {plData[selectedCity]?.an3?.ebitda?.toFixed(2) || 'N/A'} M€
                        </td>
                      </tr>
                      <tr className="bg-teal-50/30 font-bold">
                        <td className="p-2">Résultat Net</td>
                        <td className={`p-2 text-right ${(plData[selectedCity]?.an1?.resultatNet || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {plData[selectedCity]?.an1?.resultatNet?.toFixed(2) || 'N/A'} M€
                        </td>
                        <td className={`p-2 text-right ${(plData[selectedCity]?.an2?.resultatNet || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {plData[selectedCity]?.an2?.resultatNet?.toFixed(2) || 'N/A'} M€
                        </td>
                        <td className={`p-2 text-right ${(plData[selectedCity]?.an3?.resultatNet || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {plData[selectedCity]?.an3?.resultatNet?.toFixed(2) || 'N/A'} M€
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Tableau SG&A */}
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-800">💼 Coûts SG&A</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50/50">
                        <th className="p-2 text-left">Poste</th>
                        <th className="p-2 text-right">An 1</th>
                        <th className="p-2 text-right">An 2</th>
                        <th className="p-2 text-right">An 3</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 font-semibold">Personnel</td>
                        <td className="p-2 text-right">{sgaData[selectedCity]?.an1.personnel}k€</td>
                        <td className="p-2 text-right">{sgaData[selectedCity]?.an2.personnel}k€</td>
                        <td className="p-2 text-right">{sgaData[selectedCity]?.an3.personnel}k€</td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="p-2">Bureaux</td>
                        <td className="p-2 text-right">{sgaData[selectedCity]?.an1.bureaux}k€</td>
                        <td className="p-2 text-right">{sgaData[selectedCity]?.an2.bureaux}k€</td>
                        <td className="p-2 text-right">{sgaData[selectedCity]?.an3.bureaux}k€</td>
                      </tr>
                      <tr>
                        <td className="p-2">IT & Systèmes</td>
                        <td className="p-2 text-right">{sgaData[selectedCity]?.an1.itSystemes}k€</td>
                        <td className="p-2 text-right">{sgaData[selectedCity]?.an2.itSystemes}k€</td>
                        <td className="p-2 text-right">{sgaData[selectedCity]?.an3.itSystemes}k€</td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="p-2">Compliance</td>
                        <td className="p-2 text-right">{sgaData[selectedCity]?.an1.compliance}k€</td>
                        <td className="p-2 text-right">{sgaData[selectedCity]?.an2.compliance}k€</td>
                        <td className="p-2 text-right">{sgaData[selectedCity]?.an3.compliance}k€</td>
                      </tr>
                      <tr>
                        <td className="p-2">Voyages</td>
                        <td className="p-2 text-right">{sgaData[selectedCity]?.an1.voyages}k€</td>
                        <td className="p-2 text-right">{sgaData[selectedCity]?.an2.voyages}k€</td>
                        <td className="p-2 text-right">{sgaData[selectedCity]?.an3.voyages}k€</td>
                      </tr>
                      <tr className="bg-gray-100/50">
                        <td className="p-2">Setup</td>
                        <td className="p-2 text-right">{sgaData[selectedCity]?.an1.setup}k€</td>
                        <td className="p-2 text-right">-</td>
                        <td className="p-2 text-right">-</td>
                      </tr>
                      <tr className="bg-sky-50/30 font-bold">
                        <td className="p-2">Total SG&A</td>
                        <td className="p-2 text-right">{sgaData[selectedCity]?.an1.total}k€</td>
                        <td className="p-2 text-right">{sgaData[selectedCity]?.an2.total}k€</td>
                        <td className="p-2 text-right">{sgaData[selectedCity]?.an3.total}k€</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Tableau Financement */}
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-800">💰 Structure de Financement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50/50">
                        <th className="p-2 text-left">Poste</th>
                        <th className="p-2 text-right">An 1</th>
                        <th className="p-2 text-right">An 2</th>
                        <th className="p-2 text-right">An 3</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 font-semibold">Besoins totaux</td>
                        <td className="p-2 text-right">{financementData[selectedCity]?.an1.total.toFixed(2)} M€</td>
                        <td className="p-2 text-right">{financementData[selectedCity]?.an2.total.toFixed(2)} M€</td>
                        <td className="p-2 text-right">{financementData[selectedCity]?.an3.total.toFixed(2)} M€</td>
                      </tr>
                      <tr className="bg-teal-50/30">
                        <td className="p-2">Fonds propres</td>
                        <td className="p-2 text-right">{financementData[selectedCity]?.an1.equity.toFixed(2)} M€</td>
                        <td className="p-2 text-right">{financementData[selectedCity]?.an2.equity.toFixed(2)} M€</td>
                        <td className="p-2 text-right">{financementData[selectedCity]?.an3.equity.toFixed(2)} M€</td>
                      </tr>
                      <tr className="bg-gray-100/50">
                        <td className="p-2">Dette</td>
                        <td className="p-2 text-right">{financementData[selectedCity]?.an1.dette.toFixed(2)} M€</td>
                        <td className="p-2 text-right">{financementData[selectedCity]?.an2.dette.toFixed(2)} M€</td>
                        <td className="p-2 text-right">{financementData[selectedCity]?.an3.dette.toFixed(2)} M€</td>
                      </tr>
                      <tr className="bg-sky-50/30 font-bold">
                        <td className="p-2">Coût financement</td>
                        <td className="p-2 text-right">{financementData[selectedCity]?.an1.coutTotal.toFixed(2)} M€</td>
                        <td className="p-2 text-right">{financementData[selectedCity]?.an2.coutTotal.toFixed(2)} M€</td>
                        <td className="p-2 text-right">{financementData[selectedCity]?.an3.coutTotal.toFixed(2)} M€</td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="p-2">Ratio Equity</td>
                        <td className="p-2 text-right">
                          {((financementData[selectedCity]?.an1.equity / financementData[selectedCity]?.an1.total) * 100).toFixed(1)}%
                        </td>
                        <td className="p-2 text-right">
                          {((financementData[selectedCity]?.an2.equity / financementData[selectedCity]?.an2.total) * 100).toFixed(1)}%
                        </td>
                        <td className="p-2 text-right">
                          {((financementData[selectedCity]?.an3.equity / financementData[selectedCity]?.an3.total) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Tableau Impact Social */}
            <Card>
              <CardHeader>
                <CardTitle className="text-orange-800">🌍 Impact Social</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-sky-50/30 p-3 rounded">
                      <h4 className="font-semibold text-sm text-blue-800">Proximité Côte d'Ivoire</h4>
                      <p className="text-lg font-bold text-blue-700">{impactSocialData[selectedCity]?.proximiteCI}</p>
                    </div>
                    <div className="bg-teal-50/30 p-3 rounded">
                      <h4 className="font-semibold text-sm text-green-800">Score ESG</h4>
                      <p className="text-lg font-bold text-green-700">{impactSocialData[selectedCity]?.scoreESG}/10</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-sky-50/30 p-3 rounded">
                      <h4 className="font-semibold text-sm text-yellow-800">Formation CI</h4>
                      <p className="text-lg font-bold text-yellow-700">{impactSocialData[selectedCity]?.formationCI}</p>
                    </div>
                    <div className="bg-gray-100/50 p-3 rounded">
                      <h4 className="font-semibold text-sm text-gray-800">Transparence</h4>
                      <p className="text-lg font-bold text-gray-700">{impactSocialData[selectedCity]?.transparence}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;