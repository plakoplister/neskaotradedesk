import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';

/**
 * Dashboard component with 12 scrollable city cards and dynamic tables
 * Shows Financement Total An1, SG&A An1, required equity An1, and general score for each city
 * Dynamic tables update based on selected city
 */
const Dashboard: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('Paris');

  // Données de financement détaillé (from Financement component)
  const financementDetailData = [
    { ville: 'Paris', an1: { total: 6.87 } },
    { ville: 'Singapour', an1: { total: 5.56 } },
    { ville: 'Genève', an1: { total: 6.32 } },
    { ville: 'Amsterdam', an1: { total: 6.17 } },
    { ville: 'Chypre', an1: { total: 8.43 } },
    { ville: 'Hambourg', an1: { total: 6.63 } },
    { ville: 'Londres', an1: { total: 5.84 } },
    { ville: 'Dubai', an1: { total: 7.69 } },
    { ville: 'Maroc CFC', an1: { total: 11.34 } },
    { ville: 'Tel Aviv', an1: { total: 7.28 } },
    { ville: 'Maurice', an1: { total: 9.41 } },
    { ville: 'Andorre', an1: { total: 8.55 } }
  ];

  // Helper function to get SG&A and Cash data
  const getSgaCashData = (ville: string) => {
    const plCity = plData[ville];
    const financementCity = financementDetailData.find(f => f.ville === ville);
    return {
      sgaAn1: plCity?.an1.sgaCosts || 0,
      cashAn1: financementCity?.an1.total || 0  // Using financement total as cash requirement
    };
  };

  // Données complètes des 12 villes - Classées par score décroissant selon Analyse Décisionnelle
  const villesData = [
    {
      nom: 'Paris',
      ebitdaAn1: 0.12,
      capitalInitial: 0.95,
      scoreGeneral: 8.08,
      statut: 'RECOMMANDÉ',
      color: 'bg-teal-50/30 border-teal-300 text-teal-700',
      flag: '🇫🇷'
    },
    {
      nom: 'Singapour',
      ebitdaAn1: 0.01,
      capitalInitial: 0.81,
      scoreGeneral: 8.06,
      statut: 'POSSIBLE',
      color: 'bg-sky-50/30 border-sky-300 text-sky-700',
      flag: '🇸🇬'
    },
    {
      nom: 'Genève',
      ebitdaAn1: -0.09,
      capitalInitial: 0.89,
      scoreGeneral: 7.86,
      statut: 'RECOMMANDÉ',
      color: 'bg-teal-50/30 border-teal-300 text-teal-700',
      flag: '🇨🇭'
    },
    {
      nom: 'Amsterdam',
      ebitdaAn1: 0.04,
      capitalInitial: 0.87,
      scoreGeneral: 7.67,
      statut: 'POSSIBLE',
      color: 'bg-sky-50/30 border-sky-300 text-sky-700',
      flag: '🇳🇱'
    },
    {
      nom: 'Chypre',
      ebitdaAn1: 0.20,
      capitalInitial: 3.13,
      scoreGeneral: 7.41,
      statut: 'POSSIBLE',
      color: 'bg-sky-50/30 border-sky-300 text-sky-700',
      flag: '🇨🇾'
    },
    {
      nom: 'Hambourg',
      ebitdaAn1: 0.05,
      capitalInitial: 0.93,
      scoreGeneral: 7.32,
      statut: 'POSSIBLE',
      color: 'bg-sky-50/30 border-sky-300 text-sky-700',
      flag: '🇩🇪'
    },
    {
      nom: 'Londres',
      ebitdaAn1: -0.34,
      capitalInitial: 1.00,
      scoreGeneral: 7.06,
      statut: 'POSSIBLE',
      color: 'bg-sky-50/30 border-sky-300 text-sky-700',
      flag: '🇬🇧'
    },
    {
      nom: 'Maroc CFC',
      ebitdaAn1: 0.47,
      capitalInitial: 5.67,
      scoreGeneral: 6.91,
      statut: 'NON RECOMMANDÉ',
      color: 'bg-rose-50/30 border-rose-300 text-rose-700',
      flag: '🇲🇦'
    },
    {
      nom: 'Tel Aviv',
      ebitdaAn1: -0.03,
      capitalInitial: 2.17,
      scoreGeneral: 6.58,
      statut: 'NON RECOMMANDÉ',
      color: 'bg-rose-50/30 border-rose-300 text-rose-700',
      flag: '🇮🇱'
    },
    {
      nom: 'Maurice',
      ebitdaAn1: 0.41,
      capitalInitial: 3.76,
      scoreGeneral: 6.56,
      statut: 'NON RECOMMANDÉ',
      color: 'bg-rose-50/30 border-rose-300 text-rose-700',
      flag: '🇲🇺'
    },
    {
      nom: 'Dubai',
      ebitdaAn1: 0.00,
      capitalInitial: 2.59,
      scoreGeneral: 6.50,
      statut: 'POSSIBLE',
      color: 'bg-sky-50/30 border-sky-300 text-sky-700',
      flag: '🇦🇪'
    },
    {
      nom: 'Andorre',
      ebitdaAn1: 0.38,
      capitalInitial: 2.88,
      scoreGeneral: 5.23,
      statut: 'NON RECOMMANDÉ',
      color: 'bg-rose-50/30 border-rose-300 text-rose-700',
      flag: '🇦🇩'
    }
  ];

  // Données P&L par ville - VRAIES DONNÉES du fichier rentabilite-updateddatas.js
  const plData: Record<string, any> = {
    Paris: {
      an1: { ca: 27.08, margeTrading: 0.89, sgaCosts: 0.77, ebitda: 0.12, resultatNet: -0.36 },
      an2: { ca: 66.29, margeTrading: 2.13, sgaCosts: 0.73, ebitda: 1.40, resultatNet: 0.37 },
      an3: { ca: 151.72, margeTrading: 7.70, sgaCosts: 0.89, ebitda: 6.81, resultatNet: 5.16 }
    },
    Genève: {
      an1: { ca: 27.08, margeTrading: 0.89, sgaCosts: 0.98, ebitda: -0.09, resultatNet: -0.51 },
      an2: { ca: 66.29, margeTrading: 2.13, sgaCosts: 0.90, ebitda: 1.23, resultatNet: 0.34 },
      an3: { ca: 151.72, margeTrading: 7.70, sgaCosts: 1.16, ebitda: 6.54, resultatNet: 5.12 }
    },
    Amsterdam: {
      an1: { ca: 27.08, margeTrading: 0.89, sgaCosts: 0.80, ebitda: 0.04, resultatNet: -0.48 },
      an2: { ca: 66.29, margeTrading: 2.13, sgaCosts: 0.79, ebitda: 1.34, resultatNet: 0.43 },
      an3: { ca: 151.72, margeTrading: 7.70, sgaCosts: 1.02, ebitda: 6.68, resultatNet: 5.23 }
    },
    Singapour: {
      an1: { ca: 27.08, margeTrading: 0.89, sgaCosts: 1.05, ebitda: 0.01, resultatNet: -0.34 },
      an2: { ca: 66.29, margeTrading: 2.13, sgaCosts: 1.01, ebitda: 1.12, resultatNet: 0.39 },
      an3: { ca: 151.72, margeTrading: 7.70, sgaCosts: 1.29, ebitda: 6.41, resultatNet: 5.24 }
    },
    Hambourg: {
      an1: { ca: 27.08, margeTrading: 0.89, sgaCosts: 0.78, ebitda: 0.05, resultatNet: -0.46 },
      an2: { ca: 66.29, margeTrading: 2.13, sgaCosts: 0.75, ebitda: 1.38, resultatNet: 0.39 },
      an3: { ca: 151.72, margeTrading: 7.70, sgaCosts: 0.98, ebitda: 6.72, resultatNet: 5.14 }
    },
    Londres: {
      an1: { ca: 27.08, margeTrading: 0.89, sgaCosts: 1.12, ebitda: -0.34, resultatNet: -0.71 },
      an2: { ca: 66.29, margeTrading: 2.13, sgaCosts: 1.04, ebitda: 1.09, resultatNet: 0.31 },
      an3: { ca: 151.72, margeTrading: 7.70, sgaCosts: 1.33, ebitda: 6.37, resultatNet: 5.13 }
    },
    Chypre: {
      an1: { ca: 27.08, margeTrading: 0.89, sgaCosts: 0.83, ebitda: 0.20, resultatNet: -0.34 },
      an2: { ca: 66.29, margeTrading: 2.13, sgaCosts: 0.80, ebitda: 1.33, resultatNet: 0.05 },
      an3: { ca: 151.72, margeTrading: 7.66, sgaCosts: 1.01, ebitda: 6.65, resultatNet: 4.93 }
    },
    Maurice: {
      an1: { ca: 27.08, margeTrading: 0.89, sgaCosts: 0.48, ebitda: 0.41, resultatNet: -0.26 },
      an2: { ca: 66.29, margeTrading: 2.13, sgaCosts: 0.49, ebitda: 1.64, resultatNet: 0.15 },
      an3: { ca: 151.72, margeTrading: 7.70, sgaCosts: 0.65, ebitda: 7.05, resultatNet: 4.41 }
    },
    Andorre: {
      an1: { ca: 27.08, margeTrading: 0.89, sgaCosts: 0.52, ebitda: 0.38, resultatNet: -0.25 },
      an2: { ca: 66.29, margeTrading: 2.13, sgaCosts: 0.52, ebitda: 1.61, resultatNet: 0.22 },
      an3: { ca: 151.72, margeTrading: 7.70, sgaCosts: 0.69, ebitda: 7.01, resultatNet: 4.61 }
    },
    Dubai: {
      an1: { ca: 27.08, margeTrading: 0.89, sgaCosts: 0.84, ebitda: 0.00, resultatNet: -0.48 },
      an2: { ca: 66.29, margeTrading: 2.13, sgaCosts: 0.80, ebitda: 1.33, resultatNet: 0.29 },
      an3: { ca: 151.72, margeTrading: 7.70, sgaCosts: 1.03, ebitda: 6.67, resultatNet: 4.45 }
    },
    'Tel Aviv': {
      an1: { ca: 27.08, margeTrading: 0.89, sgaCosts: 0.87, ebitda: -0.03, resultatNet: -0.53 },
      an2: { ca: 66.29, margeTrading: 2.13, sgaCosts: 0.83, ebitda: 1.30, resultatNet: 0.20 },
      an3: { ca: 151.72, margeTrading: 7.70, sgaCosts: 1.09, ebitda: 6.61, resultatNet: 4.19 }
    },
    'Maroc CFC': {
      an1: { ca: 27.08, margeTrading: 0.89, sgaCosts: 0.41, ebitda: 0.47, resultatNet: -0.24 },
      an2: { ca: 66.29, margeTrading: 2.13, sgaCosts: 0.43, ebitda: 1.70, resultatNet: 0.14 },
      an3: { ca: 151.72, margeTrading: 7.70, sgaCosts: 0.58, ebitda: 7.12, resultatNet: 4.20 }
    }
  };

  // Données SG&A par ville
  const sgaData: Record<string, any> = {
    Paris: {
      an1: { personnel: 378, bureaux: 39, itSystemes: 123, compliance: 51, voyages: 33, setup: 150, total: 774 },
      an2: { personnel: 423, bureaux: 44, itSystemes: 153, compliance: 70, voyages: 41, setup: 0, total: 731 },
      an3: { personnel: 486, bureaux: 49, itSystemes: 194, compliance: 124, voyages: 56, setup: 0, total: 887 }
    },
    Genève: {
      an1: { personnel: 483, bureaux: 48, itSystemes: 123, compliance: 73, voyages: 33, setup: 219, total: 979 },
      an2: { personnel: 553, bureaux: 52, itSystemes: 153, compliance: 88, voyages: 41, setup: 0, total: 901 },
      an3: { personnel: 709, bureaux: 60, itSystemes: 194, compliance: 141, voyages: 53, setup: 0, total: 1157 }
    },
    Amsterdam: {
      an1: { personnel: 416, bureaux: 52, itSystemes: 123, compliance: 51, voyages: 33, setup: 128, total: 803 },
      an2: { personnel: 475, bureaux: 56, itSystemes: 153, compliance: 70, voyages: 37, setup: 0, total: 791 },
      an3: { personnel: 607, bureaux: 64, itSystemes: 194, compliance: 124, voyages: 51, setup: 0, total: 1018 }
    },
    Singapour: {
      an1: { personnel: 510, bureaux: 55, itSystemes: 123, compliance: 65, voyages: 45, setup: 255, total: 1053 },
      an2: { personnel: 582, bureaux: 62, itSystemes: 153, compliance: 82, voyages: 53, setup: 0, total: 1005 },
      an3: { personnel: 747, bureaux: 73, itSystemes: 194, compliance: 137, voyages: 59, setup: 0, total: 1286 }
    },
    Hambourg: {
      an1: { personnel: 384, bureaux: 34, itSystemes: 123, compliance: 51, voyages: 36, setup: 150, total: 778 },
      an2: { personnel: 438, bureaux: 38, itSystemes: 153, compliance: 70, voyages: 45, setup: 0, total: 752 },
      an3: { personnel: 561, bureaux: 43, itSystemes: 194, compliance: 124, voyages: 61, setup: 0, total: 983 }
    },
    Londres: {
      an1: { personnel: 552, bureaux: 78, itSystemes: 123, compliance: 65, voyages: 39, setup: 259, total: 1116 },
      an2: { personnel: 630, bureaux: 84, itSystemes: 153, compliance: 82, voyages: 47, setup: 0, total: 1042 },
      an3: { personnel: 810, bureaux: 97, itSystemes: 194, compliance: 137, voyages: 59, setup: 0, total: 1330 }
    },
    Chypre: {
      an1: { personnel: 420, bureaux: 35, itSystemes: 123, compliance: 55, voyages: 33, setup: 164, total: 830 },
      an2: { personnel: 480, bureaux: 39, itSystemes: 153, compliance: 72, voyages: 39, setup: 0, total: 798 },
      an3: { personnel: 615, bureaux: 45, itSystemes: 194, compliance: 128, voyages: 54, setup: 0, total: 1007 }
    },
    Maurice: {
      an1: { personnel: 288, bureaux: 20, itSystemes: 123, compliance: 45, voyages: 27, setup: 74, total: 477 },
      an2: { personnel: 330, bureaux: 23, itSystemes: 153, compliance: 62, voyages: 34, setup: 0, total: 492 },
      an3: { personnel: 423, bureaux: 26, itSystemes: 194, compliance: 115, voyages: 46, setup: 0, total: 652 }
    },
    Andorre: {
      an1: { personnel: 312, bureaux: 23, itSystemes: 123, compliance: 48, voyages: 29, setup: 89, total: 524 },
      an2: { personnel: 357, bureaux: 25, itSystemes: 153, compliance: 65, voyages: 35, setup: 0, total: 515 },
      an3: { personnel: 459, bureaux: 29, itSystemes: 194, compliance: 118, voyages: 48, setup: 0, total: 685 }
    },
    Dubai: {
      an1: { personnel: 450, bureaux: 46, itSystemes: 123, compliance: 58, voyages: 35, setup: 132, total: 844 },
      an2: { personnel: 516, bureaux: 52, itSystemes: 153, compliance: 75, voyages: 41, setup: 0, total: 798 },
      an3: { personnel: 660, bureaux: 60, itSystemes: 194, compliance: 131, voyages: 55, setup: 0, total: 1028 }
    },
    'Tel Aviv': {
      an1: { personnel: 468, bureaux: 53, itSystemes: 123, compliance: 62, voyages: 36, setup: 129, total: 871 },
      an2: { personnel: 534, bureaux: 59, itSystemes: 153, compliance: 79, voyages: 42, setup: 0, total: 829 },
      an3: { personnel: 684, bureaux: 68, itSystemes: 194, compliance: 134, voyages: 57, setup: 0, total: 1090 }
    },
    'Maroc CFC': {
      an1: { personnel: 252, bureaux: 18, itSystemes: 123, compliance: 40, voyages: 25, setup: 74, total: 412 },
      an2: { personnel: 288, bureaux: 20, itSystemes: 153, compliance: 57, voyages: 31, setup: 0, total: 430 },
      an3: { personnel: 369, bureaux: 23, itSystemes: 194, compliance: 110, voyages: 43, setup: 0, total: 582 }
    }
  };

  // Données de financement par ville
  const financementData: Record<string, any> = {
    Paris: {
      an1: { total: 6.87, equity: 0.95, dette: 5.92, coutTotal: 0.43 },
      an2: { total: 15.85, equity: 2.19, dette: 13.66, coutTotal: 0.98 },
      an3: { total: 25.89, equity: 3.57, dette: 22.32, coutTotal: 1.60 }
    },
    Genève: {
      an1: { total: 6.32, equity: 0.89, dette: 5.43, coutTotal: 0.37 },
      an2: { total: 14.60, equity: 2.06, dette: 12.54, coutTotal: 0.84 },
      an3: { total: 23.84, equity: 3.37, dette: 20.48, coutTotal: 1.37 }
    },
    Amsterdam: {
      an1: { total: 6.17, equity: 0.87, dette: 5.30, coutTotal: 0.37 },
      an2: { total: 14.23, equity: 2.01, dette: 12.22, coutTotal: 0.86 },
      an3: { total: 23.25, equity: 3.28, dette: 19.97, coutTotal: 1.40 }
    },
    Singapour: {
      an1: { total: 5.56, equity: 0.81, dette: 4.76, coutTotal: 0.30 },
      an2: { total: 12.84, equity: 1.86, dette: 10.98, coutTotal: 0.68 },
      an3: { total: 20.97, equity: 3.04, dette: 17.94, coutTotal: 1.12 }
    },
    Hambourg: {
      an1: { total: 6.63, equity: 0.93, dette: 5.71, coutTotal: 0.41 },
      an2: { total: 15.31, equity: 2.13, dette: 13.18, coutTotal: 0.94 },
      an3: { total: 25.01, equity: 3.48, dette: 21.53, coutTotal: 1.53 }
    },
    Londres: {
      an1: { total: 5.84, equity: 1.00, dette: 4.84, coutTotal: 0.32 },
      an2: { total: 13.48, equity: 2.31, dette: 11.17, coutTotal: 0.73 },
      an3: { total: 22.01, equity: 3.77, dette: 18.24, coutTotal: 1.19 }
    },
    Chypre: {
      an1: { total: 8.43, equity: 3.13, dette: 5.30, coutTotal: 0.49 },
      an2: { total: 19.45, equity: 3.61, dette: 15.85, coutTotal: 1.14 },
      an3: { total: 31.78, equity: 5.90, dette: 25.89, coutTotal: 1.86 }
    },
    Maurice: {
      an1: { total: 9.41, equity: 3.76, dette: 5.65, coutTotal: 0.62 },
      an2: { total: 21.72, equity: 4.35, dette: 17.38, coutTotal: 1.42 },
      an3: { total: 35.48, equity: 7.10, dette: 28.38, coutTotal: 2.32 }
    },
    Andorre: {
      an1: { total: 8.55, equity: 2.88, dette: 5.67, coutTotal: 0.58 },
      an2: { total: 19.74, equity: 3.32, dette: 16.42, coutTotal: 1.34 },
      an3: { total: 32.25, equity: 5.43, dette: 26.82, coutTotal: 2.20 }
    },
    Dubai: {
      an1: { total: 7.69, equity: 1.30, dette: 6.39, coutTotal: 0.43 },
      an2: { total: 17.75, equity: 2.99, dette: 14.76, coutTotal: 0.99 },
      an3: { total: 28.99, equity: 4.89, dette: 24.10, coutTotal: 1.61 }
    },
    'Tel Aviv': {
      an1: { total: 7.28, equity: 2.17, dette: 5.11, coutTotal: 0.45 },
      an2: { total: 16.79, equity: 2.51, dette: 14.28, coutTotal: 1.05 },
      an3: { total: 27.43, equity: 4.10, dette: 23.33, coutTotal: 1.71 }
    },
    'Maroc CFC': {
      an1: { total: 11.34, equity: 5.67, dette: 5.67, coutTotal: 0.66 },
      an2: { total: 26.17, equity: 6.55, dette: 19.63, coutTotal: 1.51 },
      an3: { total: 42.75, equity: 10.69, dette: 32.06, coutTotal: 2.46 }
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
                    <span className="text-sm text-gray-600">Financement An1:</span>
                    <span className="font-bold text-green-600">
                      {getSgaCashData(ville.nom).cashAn1.toFixed(2)} M€
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">SG&A An1:</span>
                    <span className="font-bold text-orange-600">
                      {getSgaCashData(ville.nom).sgaAn1.toFixed(2)} M€
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