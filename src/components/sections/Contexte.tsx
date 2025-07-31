import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';

/**
 * Contexte component displaying comprehensive background about Neskao and the trading office project
 * Contains company history, market environment, strategic opportunities, and study methodology
 */
const Contexte: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Introduction et Histoire de Neskao */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Neskao : Pionnier Africain de la Transformation du Cacao</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Une Innovation Entrepreneuriale Unique</h3>
            <p className="text-gray-700 mb-4">
              Fondée en septembre 2013, Neskao est <strong>la première entreprise africaine</strong> à transformer 
              les fèves de cacao hors normes en produits semi-finis de qualité. Cette société familiale fondée par 
              Jean Pierre Roux et dirigée par Sylvie Roux a développé un modèle d'affaires révolutionnaire qui valorise les déchets de la 
              filière cacao tout en créant de la valeur économique et sociale.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                <p className="text-3xl font-bold text-gray-700">2013</p>
                <p className="text-sm font-semibold">Création</p>
                <p className="text-xs text-gray-600">1ère en Afrique</p>
              </div>
              <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                <p className="text-3xl font-bold text-gray-700">150+</p>
                <p className="text-sm font-semibold">Emplois directs</p>
                <p className="text-xs text-gray-600">8000 indirects</p>
              </div>
              <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                <p className="text-3xl font-bold text-gray-700">32K</p>
                <p className="text-sm font-semibold">Tonnes/an</p>
                <p className="text-xs text-gray-600">Capacité totale</p>
              </div>
              <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                <p className="text-3xl font-bold text-gray-700">FSSC</p>
                <p className="text-sm font-semibold">22000 V.6</p>
                <p className="text-xs text-gray-600">Certifié 2024</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-lg mb-2">Un Modèle d'Affaires Innovant</h4>
              <p className="text-gray-700">
                Neskao se distingue par sa spécialisation unique : la transformation de <strong>fèves hors normes</strong> 
                (brisures, fèves noires, plates ou moisies) et de déchets de masse de cacao en produits de qualité. 
                Cette approche pionnière permet de valoriser des matériaux qui seraient autrement interdits à l'exportation 
                ou considérés comme des déchets.
              </p>
            </div>

            <div className="bg-sky-50/30 p-4 rounded-lg">
              <h4 className="font-semibold text-sky-700 mb-2">Capacités de Production Actuelles</h4>
              <ul className="space-y-1 text-sm">
                <li>• <strong>Pâte de cacao :</strong> 12 000 tonnes/an</li>
                <li>• <strong>Beurre de cacao :</strong> 5 000 tonnes/an</li>
                <li>• <strong>Tourteau de cacao :</strong> 15 000 tonnes/an</li>
                <li>• <strong>Localisation :</strong> Zone industrielle de Vridi, Abidjan</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">L'Ambition : Du Local à l'International</h4>
              <p className="text-gray-700">
                Fort de son expertise unique dans la valorisation des sous-produits du cacao, Neskao ambitionne 
                maintenant de créer un <strong>bureau de trading international</strong>. Cette évolution stratégique 
                vise à capturer davantage de valeur sur la chaîne mondiale du cacao en passant d'un modèle de 
                transformation locale à une présence active sur les marchés internationaux des matières premières.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Environnement International du Cacao */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Environnement International du Cacao</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Marché actuel */}
            <div className="bg-sky-50/30 p-6 rounded-lg">
              <h4 className="font-semibold text-lg mb-4 text-sky-700">Chiffres Internationaux du Cacao</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">Production mondiale</p>
                  <p className="text-2xl font-bold text-sky-700">4.5M</p>
                  <p className="text-xs text-gray-500">tonnes/an</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">Production Côte d'Ivoire</p>
                  <p className="text-2xl font-bold text-sky-700">2.0M</p>
                  <p className="text-xs text-gray-500">tonnes/an</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">Capacité Transformation</p>
                  <p className="text-2xl font-bold text-sky-700">980K</p>
                  <p className="text-xs text-gray-500">tonnes installée</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">Horizon 2029</p>
                  <p className="text-2xl font-bold text-sky-700">1.9M</p>
                  <p className="text-xs text-gray-500">tonnes capacité</p>
                </div>
              </div>
            </div>

            {/* Tendances du marché */}
            <div>
              <h4 className="font-semibold text-lg mb-3">Évolutions Majeures du Marché International</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📈</span>
                  <div>
                    <p className="font-semibold">Volatilité Accrue des Prix</p>
                    <p className="text-sm text-gray-600">
                      Les marchés du cacao connaissent une volatilité historique, nécessitant des outils sophistiqués 
                      de gestion des risques (forwards et futures).
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🌱</span>
                  <div>
                    <p className="font-semibold">Réglementation EUDR</p>
                    <p className="text-sm text-gray-600">
                      L'Union Européenne impose de nouvelles exigences de traçabilité et durabilité, 
                      créant des opportunités pour les acteurs conformes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💹</span>
                  <div>
                    <p className="font-semibold">Financiarisation du Marché</p>
                    <p className="text-sm text-gray-600">
                      Les instruments financiers (ICE Futures) deviennent essentiels pour la compétitivité 
                      et la gestion optimale des flux physiques.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🤝</span>
                  <div>
                    <p className="font-semibold">Consolidation des Acteurs</p>
                    <p className="text-sm text-gray-600">
                      Les traders internationaux se consolidlent, créant une fenêtre d'opportunité 
                      pour de nouveaux entrants africains bien positionnés. De plus en plus de chocolatiers 
                      cherchent à raccourcir les chaînes de valeur et contacter directement les producteurs locaux.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Convergence et Opportunité */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">La Convergence Stratégique</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-teal-50/30 to-teal-100/30 p-6 rounded-lg">
            <h4 className="font-semibold text-lg mb-4 text-teal-700">
              Pourquoi un Bureau de Trading International Maintenant ?
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-teal-700 mb-3">Forces de Neskao</h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600">✓</span>
                    <span>Leader mondial dans la transformation de cacao hors normes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600">✓</span>
                    <span>Certification FSSC 22000 garantissant les standards internationaux</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600">✓</span>
                    <span>Agréments CCC et nomenclature douanière UEMOA depuis 2014</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600">✓</span>
                    <span>Infrastructure industrielle moderne (25 000 m², équipements Bühler)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600">✓</span>
                    <span>Track record de 10+ ans dans le secteur cacao</span>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-teal-700 mb-3">Opportunités de Marché</h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600">→</span>
                    <span>Accès direct aux marchés internationaux (ICE Futures)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600">→</span>
                    <span>Diversification au-delà du segment hors normes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600">→</span>
                    <span>Capture de marges via hedging et futures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600">→</span>
                    <span>Positionnement sur les primes durabilité EUDR</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600">→</span>
                    <span>Développement de partenariats B2B directs</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg">
              <div className="text-center">
                <h5 className="font-semibold text-teal-700 mb-4">Objectifs Stratégiques</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-teal-50/30 p-4 rounded-lg">
                    <p className="font-semibold text-teal-700 mb-2">1. Développement Commercial</p>
                    <p className="text-sm text-gray-700">
                      Développer les partenariats commerciaux et augmenter les capacités de 
                      <strong>15,000 tonnes à 60,000 tonnes</strong> dans le futur
                    </p>
                  </div>
                  <div className="bg-teal-50/30 p-4 rounded-lg">
                    <p className="font-semibold text-teal-700 mb-2">2. Activités Futures</p>
                    <p className="text-sm text-gray-700">
                      Développer les activités futures pour <strong>hedger les positions physiques</strong> 
                      et créer un nouveau <strong>flux de revenus spéculatifs</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan et Méthodologie */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Plan de l'Étude et Méthodologie</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Méthodologie */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="font-semibold text-lg mb-4 text-purple-900">Méthodologie d'Analyse</h4>
              <p className="text-sm text-gray-700 mb-4">
                Cette étude décisionnelle utilise une approche multi-critères pour identifier la localisation 
                optimale du bureau de trading international de Neskao.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="bg-white p-3 rounded-lg text-center">
                  <p className="font-bold text-purple-700">15%</p>
                  <p className="text-xs">Réglementation</p>
                </div>
                <div className="bg-white p-3 rounded-lg text-center">
                  <p className="font-bold text-purple-700">30%</p>
                  <p className="text-xs">Impact Social</p>
                </div>
                <div className="bg-white p-3 rounded-lg text-center">
                  <p className="font-bold text-purple-700">15%</p>
                  <p className="text-xs">ROI</p>
                </div>
                <div className="bg-white p-3 rounded-lg text-center">
                  <p className="font-bold text-purple-700">10%</p>
                  <p className="text-xs">Accès DFI</p>
                </div>
                <div className="bg-white p-3 rounded-lg text-center">
                  <p className="font-bold text-purple-700">30%</p>
                  <p className="text-xs">Cash-flow</p>
                </div>
              </div>
            </div>

            {/* Structure de l'analyse */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Structure de l'Analyse Décisionnelle</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-700 mb-3">📊 Analyses Quantitatives</h5>
                  <ul className="space-y-2 text-sm">
                    <li>• Modélisation financière sur 3 ans</li>
                    <li>• Analyse des coûts SG&A par localisation</li>
                    <li>• Projections de volumes et marges</li>
                    <li>• Calcul des besoins en financement</li>
                    <li>• Évaluation ROI et métriques de rentabilité</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h5 className="font-semibold text-teal-700 mb-3">🌍 Analyses Qualitatives</h5>
                  <ul className="space-y-2 text-sm">
                    <li>• Conformité réglementaire (CCC, EUDR)</li>
                    <li>• Impact social et perception locale</li>
                    <li>• Accès aux financements développement</li>
                    <li>• Écosystème trading et partenariats</li>
                    <li>• Gestion des risques opérationnels</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Résultat clé */}
            <div className="bg-gradient-to-r from-neskao-primary to-blue-700 text-white p-6 rounded-lg">
              <h4 className="font-bold text-xl mb-3">🎯 Recommandation Principale</h4>
              <p className="text-lg mb-2">
                L'analyse approfondie de 12 localisations potentielles révèle que <strong>Paris</strong> offre 
                le meilleur équilibre pour établir le bureau de trading international de Neskao.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-white/20 p-3 rounded text-center">
                  <p className="font-bold text-xl">78/100</p>
                  <p className="text-sm">Score Global</p>
                </div>
                <div className="bg-white/20 p-3 rounded text-center">
                  <p className="font-bold text-xl">187%</p>
                  <p className="text-sm">ROI 3 ans</p>
                </div>
                <div className="bg-white/20 p-3 rounded text-center">
                  <p className="font-bold text-xl">8.5/10</p>
                  <p className="text-sm">Impact Social</p>
                </div>
                <div className="bg-white/20 p-3 rounded text-center">
                  <p className="font-bold text-xl">An 1</p>
                  <p className="text-sm">Rentabilité</p>
                </div>
              </div>
            </div>

            {/* Navigation vers les sections */}
            <div className="mt-6 p-4 bg-gray-100/50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                Explorez les sections suivantes pour découvrir l'analyse détaillée de chaque dimension 
                et comprendre pourquoi Paris émerge comme le choix optimal pour Neskao.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contexte;