import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';
import { Calendar, Users, MapPin, Building2, FileText, Shield, DollarSign, Clock, CheckCircle } from 'lucide-react';

const NextSteps: React.FC = () => {
  const etapesData = [
    {
      id: 1,
      titre: "Phase 1 - Fondation Légale & Réglementaire",
      periode: "Fin Août 2025",
      responsable: "Direction de Neskao",
      couleur: "blue",
      icon: Building2,
      activites: [
        {
          nom: "Choix de la localisation",
          description: "Validation finale de Paris comme localisation optimale et formalisation de la décision",
          icon: MapPin,
          delivrables: ["Décision Board validée", "Due diligence réglementaire complète"]
        },
        {
          nom: "Création de la Société",
          description: "Constitution juridique de la société trading avec statuts et structure de gouvernance",
          icon: FileText,
          delivrables: ["Statuts déposés", "Immatriculation effectuée", "Comptes bancaires ouverts"]
        },
        {
          nom: "Dépôt dossier CCC",
          description: "Soumission du dossier de Contrepartie Internationale auprès du Conseil du Café-Cacao",
          icon: CheckCircle,
          delivrables: ["Dossier CCC complet", "Agrément obtenu", "Licence trading validée"]
        }
      ],
      budget: "À discuter avec Mereya",
      risques: ["Délais administratifs", "Complexité réglementaire"],
      jalons: "31 Août 2025"
    },
    {
      id: 2,
      titre: "Phase 2 - Structuration Financière & Partenariats",
      periode: "Septembre - Novembre 2025",
      responsable: "Julien Consultant",
      couleur: "green",
      icon: Shield,
      activites: [
        {
          nom: "Pitch Neskao Trading",
          description: "Création d'un pitch investisseurs professionnel présentant l'opportunité trading",
          icon: FileText,
          delivrables: ["Deck investisseur finalisé", "Modèle financier 3 ans", "Proposition de valeur"]
        },
        {
          nom: "Business Plan & Budget 2026",
          description: "Élaboration détaillée du business plan et budgets prévisionnels jusqu'en 2026",
          icon: DollarSign,
          delivrables: ["Business plan complet", "Budgets détaillés", "Projections cash-flow"]
        },
        {
          nom: "Levée de fonds",
          description: "Rencontres avec banques, DFIs et investisseurs pour validation des financements",
          icon: Shield,
          delivrables: ["Term sheets signées", "Financements confirmés", "Partenariats DFI actifs"]
        }
      ],
      budget: "À discuter avec Mereya",
      risques: ["Conditions de financement", "Timing marché"],
      jalons: "30 Novembre 2025"
    },
    {
      id: 3,
      titre: "Phase 3 - Déploiement Opérationnel",
      periode: "Octobre - Décembre 2025",
      responsable: "Julien Consultant",
      couleur: "purple",
      icon: Users,
      activites: [
        {
          nom: "Bureaux & Infrastructure",
          description: "Recherche et sécurisation des locaux parisiens avec infrastructure adaptée",
          icon: Building2,
          delivrables: ["Bail signé", "Aménagement terminé", "Infrastructure opérationnelle"]
        },
        {
          nom: "Recrutements clés",
          description: "Lancement du processus de recrutement pour les postes critiques de l'équipe",
          icon: Users,
          delivrables: ["Trading Manager recruté", "Risk Manager identifié", "Équipe core constituée"]
        },
        {
          nom: "Systèmes IT",
          description: "Mise en place des systèmes informatiques, trading et gestion des risques",
          icon: CheckCircle,
          delivrables: ["Plateforme trading active", "Systèmes risk opérationnels", "Connectivité ICE"]
        }
      ],
      budget: "À discuter avec Mereya",
      risques: ["Délais d'installation", "Disponibilité talents"],
      jalons: "31 Décembre 2025"
    }
  ];

  const getColorClasses = (couleur: string) => {
    switch(couleur) {
      case 'blue': return {
        bg: 'from-blue-50 to-blue-100',
        border: 'border-blue-200',
        text: 'text-sky-800',
        accent: 'bg-sky-500'
      };
      case 'green': return {
        bg: 'from-green-50 to-green-100',
        border: 'border-teal-200',
        text: 'text-teal-800',
        accent: 'bg-teal-500'
      };
      case 'purple': return {
        bg: 'from-purple-50 to-purple-100',
        border: 'border-purple-200',
        text: 'text-gray-800',
        accent: 'bg-gray-500'
      };
      default: return {
        bg: 'from-gray-50 to-gray-100',
        border: 'border-gray-200',
        text: 'text-gray-800',
        accent: 'bg-gray-500'
      };
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Calendar className="text-sky-500" />
            Prochaines Étapes - Roadmap de Lancement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-indigo-800 mb-4">🎯 Objectif</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Lancer le bureau de trading international de Neskao à Paris d'ici fin 2025, 
              avec toutes les autorisations réglementaires, financements sécurisés et équipe opérationnelle.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded text-center">
                <p className="text-2xl font-bold text-sky-600">3</p>
                <p className="text-sm text-gray-600">Phases principales</p>
              </div>
              <div className="bg-white p-3 rounded text-center">
                <p className="text-2xl font-bold text-teal-600">5</p>
                <p className="text-sm text-gray-600">Mois de déploiement</p>
              </div>
              <div className="bg-white p-3 rounded text-center">
                <p className="text-2xl font-bold text-gray-600">9</p>
                <p className="text-sm text-gray-600">Activités clés</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline des phases */}
      <div className="space-y-6">
        {etapesData.map((etape, index) => {
          const colors = getColorClasses(etape.couleur);
          const Icon = etape.icon;
          
          return (
            <Card key={etape.id} className={`bg-gradient-to-br ${colors.bg} border-2 ${colors.border}`}>
              <CardHeader>
                <CardTitle className={`text-xl ${colors.text} flex items-center gap-3`}>
                  <div className={`p-2 rounded-full ${colors.accent} text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  {etape.titre}
                </CardTitle>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="font-medium">{etape.periode}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span className="font-medium">{etape.responsable}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-600" />
                    <span className="font-medium">{etape.budget}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  {/* Activités détaillées */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-4">Activités Principales</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      {etape.activites.map((activite, actIndex) => {
                        const ActivityIcon = activite.icon;
                        return (
                          <div key={actIndex} className="bg-white p-4 rounded-lg shadow-sm border">
                            <div className="flex items-center gap-2 mb-3">
                              <ActivityIcon className="w-5 h-5 text-gray-600" />
                              <h5 className="font-semibold text-gray-800">{activite.nom}</h5>
                            </div>
                            <p className="text-sm text-gray-700 mb-3">{activite.description}</p>
                            <div>
                              <p className="text-xs font-semibold text-gray-600 mb-2">Délivrables:</p>
                              <ul className="text-xs text-gray-600 space-y-1">
                                {activite.delivrables.map((delivrable, delIndex) => (
                                  <li key={delIndex} className="flex items-start gap-1">
                                    <span className="text-teal-500">•</span>
                                    <span>{delivrable}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Risques et jalons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                      <h5 className="font-semibold text-gray-800 mb-2">⚠️ Risques Identifiés</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {etape.risques.map((risque, riskIndex) => (
                          <li key={riskIndex} className="flex items-start gap-1">
                            <span>•</span>
                            <span>{risque}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-teal-50/30 p-4 rounded-lg border border-teal-200">
                      <h5 className="font-semibold text-teal-800 mb-2">🎯 Jalon Critique</h5>
                      <p className="text-sm text-teal-700 font-medium">{etape.jalons}</p>
                      <p className="text-xs text-teal-600 mt-1">
                        Toutes les activités doivent être finalisées avant cette date
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Synthèse et recommandations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Recommandations Stratégiques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">Facteurs Critiques de Succès</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-800">Synchronisation des phases</p>
                      <p className="text-sm text-gray-600">Coordonner les activités légales, financières et opérationnelles</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-sky-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-800">Validation early-stage</p>
                      <p className="text-sm text-gray-600">Sécuriser l'agrément CCC avant les investissements lourds</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-800">Ressources dédiées</p>
                      <p className="text-sm text-gray-600">Affecter des ressources senior à temps plein sur le projet</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">Métriques de Suivi</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-indigo-600">75%</p>
                      <p className="text-xs text-gray-600">Taux d'avancement cible fin Oct</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-teal-600">100%</p>
                      <p className="text-xs text-gray-600">Objectif fin Décembre</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Agrément CCC</span>
                      <span className="font-medium">Fin Août</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Financement confirmé</span>
                      <span className="font-medium">Fin Novembre</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Équipe opérationnelle</span>
                      <span className="font-medium">Fin Décembre</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500">
              <h4 className="font-bold text-indigo-800 mb-3">🚀 Point de Démarrage</h4>
              <p className="text-indigo-700 leading-relaxed">
                Le succès de ce projet repose sur une exécution rigoureuse et coordonnée des trois phases. 
                La <strong>Phase 1</strong> est critique car elle conditionne toute la suite du déploiement. 
                Nous recommandons de commencer immédiatement par la validation Board de la localisation Paris 
                et la préparation du dossier CCC en parallèle.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NextSteps;