import React, { useState } from 'react';
import { Download } from 'lucide-react';
import {
  Dashboard,
  Contexte,
  Reglementation,
  Produits,
  Financement,
  SGA,
  Rentabilite,
  ImpactSocial,
  AnalyseDecisionnelle,
  Risques,
  NextSteps
} from './components/sections';
// Reference the logo from public directory - place your "Logo NESKAO.jpeg" in public/images/
const neskaroLogo = "/images/Logo NESKAO.jpeg";
const mereyaLogo = "/images/Logo MEREYA.png";

/**
 * Main application component for Neskao Trade Desk
 * A comprehensive analysis tool for evaluating potential trading locations
 */
const NeskaoTradeDesk: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  const [isExporting, setIsExporting] = useState(false);

  const sections = [
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'contexte', name: 'Contexte' },
    { id: 'reglementation', name: 'Réglementation' },
    { id: 'produits', name: 'Mix Produits' },
    { id: 'sga', name: 'SG&A' },
    { id: 'rentabilite', name: 'Rentabilité' },
    { id: 'financement', name: 'Financement' },
    { id: 'impact', name: 'Impact Social' },
    { id: 'analyse', name: 'Analyse Décisionnelle' },
    { id: 'risques', name: 'Risques' },
    { id: 'nextsteps', name: 'Next Steps' }
  ];

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      // Générer le rapport HTML complet (réplique exacte de la webapp)
      const { HtmlReportGenerator } = await import('./utils/htmlReportGenerator');
      const generator = new HtmlReportGenerator();
      const htmlContent = generator.generateReport();
      
      // Créer une nouvelle fenêtre avec le rapport HTML
      const newWindow = window.open('', '_blank', 'width=1200,height=800');
      if (newWindow) {
        newWindow.document.write(htmlContent);
        newWindow.document.close();
        
        // Attendre que le contenu soit chargé puis déclencher l'impression
        newWindow.onload = () => {
          setTimeout(() => {
            // Instructions pour l'utilisateur avant l'impression
            alert('Le rapport s\'ouvre dans la nouvelle fenêtre. Pour un PDF optimal :\n\n1. Cliquez sur "Imprimer" ou Ctrl+P\n2. Sélectionnez "Enregistrer au format PDF"\n3. Dans les options :\n   - Format : A4\n   - Marges : Normales\n   - Échelle : 100%\n   - ✅ Cochez "Graphiques d\'arrière-plan"\n   - ✅ Cochez "En-têtes et pieds de page"\n\n📄 Le PDF aura automatiquement :\n• Logos sur chaque page\n• Numéros de page\n• Marges optimales');
            newWindow.print();
          }, 1500);
        };
      } else {
        // Si popup bloqué, télécharger comme fichier HTML
        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `NESKAO_Rapport_Strategique_Complet_${new Date().toLocaleDateString('fr-FR').replace(/\//g, '-')}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Erreur export rapport HTML:', error);
      alert('Erreur lors de la génération du rapport. Vérifiez la console.');
    } finally {
      setIsExporting(false);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'contexte':
        return <Contexte />;
      case 'reglementation':
        return <Reglementation />;
      case 'produits':
        return <Produits />;
      case 'financement':
        return <Financement />;
      case 'sga':
        return <SGA />;
      case 'rentabilite':
        return <Rentabilite />;
      case 'impact':
        return <ImpactSocial />;
      case 'analyse':
        return <AnalyseDecisionnelle />;
      case 'risques':
        return <Risques />;
      case 'nextsteps':
        return <NextSteps />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <img 
                  src={neskaroLogo} 
                  alt="Neskao Logo" 
                  className="h-10 w-auto mr-3"
                />
                <h1 className="text-2xl font-bold text-gray-900">Neskao Trade Desk</h1>
              </div>
              <div className="ml-4 flex items-center">
                <span className="text-sm text-gray-600">Analyse Stratégique - Confidentiel</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExporting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Export...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </>
                )}
              </button>
              <span className="text-sm text-gray-500">v3.1</span>
              <img 
                src={mereyaLogo} 
                alt="Mereya Logo" 
                className="h-10 w-auto"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeSection === section.id
                    ? 'border-neskao-primary text-neskao-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                }`}
              >
                {section.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              © 2025 Neskao Trade Desk - Analyse Comparative des Localisations
            </div>
            <div className="text-sm text-gray-400">
              Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NeskaoTradeDesk;