export class HtmlReportGenerator {
  private currentDate: string;

  constructor() {
    this.currentDate = new Date().toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  public generateReport(): string {
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bureau Trading International Neskao - Rapport Complet</title>
    <style>
        @page {
            size: A4;
            margin: 2.5cm 2.5cm 3cm 2.5cm;
        }
        
        @page :first {
            margin: 0;
        }
        
        @page :not(:first) {
            @top-left {
                content: url('/images/Logo NESKAO.jpeg');
                width: 35px;
                height: 35px;
            }
            
            @top-center {
                content: "Bureau Trading International Neskao - Analyse Stratégique";
                font-family: 'Calibri', 'Arial', sans-serif;
                font-size: 12pt;
                font-weight: bold;
                color: #475569;
            }
            
            @top-right {
                content: url('/images/Logo MEREYA.png');
                width: 35px;
                height: 35px;
            }
            
            @bottom-center {
                content: "Page " counter(page);
                font-family: 'Calibri', 'Arial', sans-serif;
                font-size: 10pt;
                color: #64748b;
            }
        }
        
        body {
            font-family: 'Calibri', 'Arial', sans-serif;
            font-size: 11pt;
            line-height: 1.6;
            color: #000;
            margin: 0;
            padding: 0;
            background-color: #fff;
        }
        
        /* Conteneur principal avec marges de sécurité */
        .content-container {
            padding: 20px 25px;
            max-width: 180mm;
            margin: 0 auto;
        }
        
        /* Première page avec image de garde EXACTE */
        .cover-page {
            page-break-after: always;
            width: 100vw;
            height: 100vh;
            margin: 0;
            padding: 0;
            position: relative;
            overflow: hidden;
        }
        
        .cover-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
        
        /* Table des matières */
        .toc {
            page-break-after: always;
            margin-bottom: 40px;
        }
        
        .toc-heading {
            font-size: 20pt;
            font-weight: bold;
            margin-bottom: 30px;
            text-align: center;
            color: #475569;
        }
        
        .toc-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            padding: 5px 0;
        }
        
        .toc-item-level-1 {
            font-weight: bold;
            font-size: 12pt;
            margin-top: 15px;
            color: #475569;
        }
        
        .toc-item-level-2 {
            margin-left: 20px;
            font-size: 11pt;
        }
        
        .toc-dots {
            flex-grow: 1;
            border-bottom: 1px dotted #94a3b8;
            margin: 0 10px;
            height: 1em;
        }
        
        /* Suppression des en-têtes manuels - gérés par CSS @page */
        .page-header {
            display: none;
        }
        
        /* Titres */
        h1 {
            font-size: 18pt;
            font-weight: bold;
            margin-top: 40px;
            margin-bottom: 20px;
            page-break-after: avoid;
            color: #475569;
        }
        
        h2 {
            font-size: 14pt;
            font-weight: bold;
            margin-top: 30px;
            margin-bottom: 15px;
            page-break-after: avoid;
            color: #64748b;
        }
        
        h3 {
            font-size: 12pt;
            font-weight: bold;
            margin-top: 20px;
            margin-bottom: 10px;
            page-break-after: avoid;
            color: #64748b;
        }
        
        /* Paragraphes */
        p {
            text-align: justify;
            margin-bottom: 12px;
            text-indent: 0;
        }
        
        /* Listes */
        ul, ol {
            margin-left: 20px;
            margin-bottom: 12px;
        }
        
        li {
            margin-bottom: 6px;
        }
        
        /* Tableaux */
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 10pt;
        }
        
        th {
            background-color: #475569;
            color: white;
            padding: 8px;
            text-align: left;
            font-weight: bold;
            border: 1px solid #475569;
        }
        
        td {
            border: 1px solid #e2e8f0;
            padding: 8px;
        }
        
        tr:nth-child(even) {
            background-color: #f8fafc;
        }
        
        /* Encadrés */
        .highlight-box {
            background-color: #f1f5f9;
            border-left: 4px solid #475569;
            padding: 15px;
            margin: 20px 0;
        }
        
        .recommendation-box {
            background-color: #dcfce7;
            border: 2px solid #16a34a;
            padding: 20px;
            margin: 30px 0;
            border-radius: 5px;
        }
        
        .alert-box {
            background-color: #fef2f2;
            border-left: 4px solid #dc2626;
            padding: 15px;
            margin: 20px 0;
        }
        
        .success-box {
            background-color: #dcfce7;
            border-left: 4px solid #16a34a;
            padding: 15px;
            margin: 20px 0;
        }
        
        /* Executive summary */
        .executive-summary {
            background-color: #f8fafc;
            padding: 30px;
            margin: 30px 0;
            border: 1px solid #e2e8f0;
        }
        
        .key-metrics {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin: 20px 0;
        }
        
        .metric-box {
            background-color: white;
            padding: 15px;
            border: 1px solid #e2e8f0;
            text-align: center;
        }
        
        .metric-value {
            font-size: 24pt;
            font-weight: bold;
            color: #475569;
        }
        
        .metric-label {
            font-size: 10pt;
            color: #64748b;
            margin-top: 5px;
        }
        
        /* Badges */
        .badge {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 9pt;
            font-weight: bold;
        }
        
        .badge-success {
            background-color: #dcfce7;
            color: #14532d;
        }
        
        .badge-warning {
            background-color: #fef3c7;
            color: #92400e;
        }
        
        .badge-danger {
            background-color: #fef2f2;
            color: #991b1b;
        }
        
        /* Page break */
        .page-break {
            page-break-after: always;
        }
        
        .numero {
            font-weight: bold;
            margin-right: 10px;
        }
        
        .city-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin: 20px 0;
        }
        
        .city-card {
            background-color: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .city-card h4 {
            margin: 0 0 10px 0;
            color: #475569;
            font-size: 12pt;
        }
        
        .city-metric {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
            font-size: 9pt;
        }
        
        .city-metric-label {
            color: #64748b;
        }
        
        .city-metric-value {
            font-weight: bold;
            color: #475569;
        }
        
        @media print {
            body {
                font-size: 10pt;
                line-height: 1.4;
                margin: 0;
                padding: 0;
            }
            
            .content-container {
                padding: 15px 20px;
            }
            
            .page-break {
                page-break-after: always;
            }
            
            .cover-page {
                page-break-after: always;
                width: 100%;
                height: 100vh;
                margin: 0;
                padding: 0;
            }
            
            .toc {
                page-break-after: always;
            }
            
            /* Supprimer tous les en-têtes manuels - CSS @page gère tout */
            .page-header {
                display: none !important;
            }
            
            /* Ajuster les tailles pour l'impression */
            h1 { 
                font-size: 16pt; 
                margin-top: 0;
                margin-bottom: 15px;
            }
            h2 { 
                font-size: 13pt;
                margin-top: 20px;
                margin-bottom: 12px;
            }
            h3 { 
                font-size: 11pt;
                margin-top: 15px;
                margin-bottom: 8px;
            }
            table { 
                font-size: 9pt;
                margin: 15px 0;
            }
            
            /* Éviter les coupures de page dans les tableaux */
            table, .highlight-box, .recommendation-box, .success-box, .alert-box {
                page-break-inside: avoid;
                margin: 12px 0;
            }
            
            /* Espacement optimal */
            p { margin: 8px 0; }
            ul, ol { margin: 10px 0 10px 20px; }
            li { margin: 4px 0; }
        }
    </style>
</head>
<body>
    <!-- Page de couverture avec l'image EXACTE -->
    <div class="cover-page">
        <img src="/images/PageDeGarde.png" alt="Page de garde Neskao" class="cover-image" />
    </div>

    <!-- Contenu principal avec marges -->
    <div class="content-container">
    
        <!-- Table des matières -->
        <div class="toc">
            <h1 class="toc-heading">Table des matières</h1>
        
        <div class="toc-item toc-item-level-1">
            <span><span class="numero">1.</span> Dashboard - Vue d'ensemble</span>
            <span class="toc-dots"></span>
            <span>3</span>
        </div>
        
        <div class="toc-item toc-item-level-1">
            <span><span class="numero">2.</span> Contexte de la mission</span>
            <span class="toc-dots"></span>
            <span>5</span>
        </div>
        
        <div class="toc-item toc-item-level-1">
            <span><span class="numero">3.</span> Réglementation</span>
            <span class="toc-dots"></span>
            <span>7</span>
        </div>
        
        <div class="toc-item toc-item-level-1">
            <span><span class="numero">4.</span> Mix Produits</span>
            <span class="toc-dots"></span>
            <span>12</span>
        </div>
        
        <div class="toc-item toc-item-level-1">
            <span><span class="numero">5.</span> SG&A - Coûts de structure</span>
            <span class="toc-dots"></span>
            <span>15</span>
        </div>
        
        <div class="toc-item toc-item-level-1">
            <span><span class="numero">6.</span> Rentabilité</span>
            <span class="toc-dots"></span>
            <span>18</span>
        </div>
        
        <div class="toc-item toc-item-level-1">
            <span><span class="numero">7.</span> Financement</span>
            <span class="toc-dots"></span>
            <span>21</span>
        </div>
        
        <div class="toc-item toc-item-level-1">
            <span><span class="numero">8.</span> Impact Social</span>
            <span class="toc-dots"></span>
            <span>24</span>
        </div>
        
        <div class="toc-item toc-item-level-1">
            <span><span class="numero">9.</span> Analyse Décisionnelle</span>
            <span class="toc-dots"></span>
            <span>27</span>
        </div>
        
        <div class="toc-item toc-item-level-1">
            <span><span class="numero">10.</span> Risques</span>
            <span class="toc-dots"></span>
            <span>30</span>
        </div>
        
        <div class="toc-item toc-item-level-1">
            <span><span class="numero">11.</span> Next Steps</span>
            <span class="toc-dots"></span>
            <span>33</span>
        </div>
        
        <div class="toc-item toc-item-level-1">
            <span><span class="numero">12.</span> Recommandations</span>
            <span class="toc-dots"></span>
            <span>35</span>
        </div>
    </div>

    <!-- Synthèse Exécutive -->
    <div class="executive-summary">
        <h1 style="text-align: center; margin-top: 0;">Synthèse Exécutive</h1>
        
        <div class="recommendation-box">
            <h3 style="margin-top: 0;">Recommandation principale</h3>
            <p><strong>Établir le bureau de trading international à PARIS avec un capital initial de 1.89M€</strong></p>
        </div>
        
        <div class="key-metrics">
            <div class="metric-box">
                <div class="metric-value">7.87/10</div>
                <div class="metric-label">Score global Paris</div>
            </div>
            <div class="metric-box">
                <div class="metric-value">+0.52M€</div>
                <div class="metric-label">EBITDA An 1</div>
            </div>
            <div class="metric-box">
                <div class="metric-value">171.5%</div>
                <div class="metric-label">ROI sur 3 ans</div>
            </div>
            <div class="metric-box">
                <div class="metric-value">8.5/10</div>
                <div class="metric-label">Impact social</div>
            </div>
        </div>
        
        <h3>Points clés de l'analyse</h3>
        <ul>
            <li><strong>12 localisations analysées</strong> selon 5 critères pondérés : Réglementation (25%), Impact Social (22%), ROI (20%), Financement DFI (18%) et Cash Management (15%)</li>
            <li><strong>Paris obtient le meilleur score global</strong> (7.87/10) grâce à l'équilibre optimal entre tous les critères</li>
            <li><strong>Rentabilité immédiate</strong> : EBITDA positif dès l'An 1 (+0.52M€)</li>
            <li><strong>Accès privilégié aux financements</strong> AFD/Proparco pour la mission d'impact social</li>
            <li><strong>Convention fiscale excellente</strong> avec la Côte d'Ivoire</li>
            <li><strong>Coûts SG&A compétitifs</strong> : 3.99M€ sur 3 ans, 4ème position</li>
        </ul>
    </div>

    <div class="page-break"></div>

    ${this.generateDashboardSection()}
    ${this.generateContexteSection()}
    ${this.generateReglementationSection()}
    ${this.generateProduitsSection()}
    ${this.generateSGASection()}
    ${this.generateRentabiliteSection()}
    ${this.generateFinancementSection()}
    ${this.generateImpactSocialSection()}
    ${this.generateAnalyseDecisionnelleSection()}
    ${this.generateRisquesSection()}
    ${this.generateNextStepsSection()}
    ${this.generateRecommendationsSection()}

    </div> <!-- Fermeture content-container -->

</body>
</html>`;
  }

  private generateDashboardSection(): string {
    return `
    <!-- 1. DASHBOARD -->
    <h1><span class="numero">1.</span> Dashboard - Vue d'ensemble</h1>
    
    <h2>Classement Final des 12 Localisations</h2>
    
    <table>
        <tr>
            <th>Rang</th>
            <th>Localisation</th>
            <th>Zone</th>
            <th>Score Global /10</th>
            <th>EBITDA An1</th>
            <th>Equity</th>
            <th>Statut</th>
        </tr>
        <tr style="background-color: #dcfce7;">
            <td><strong>1</strong></td>
            <td><strong>Paris</strong></td>
            <td>Europe</td>
            <td><strong>7.87</strong></td>
            <td>+0.52M€</td>
            <td>1.89M€</td>
            <td><span class="badge badge-success">RECOMMANDÉ</span></td>
        </tr>
        <tr style="background-color: #dcfce7;">
            <td><strong>2</strong></td>
            <td><strong>Genève</strong></td>
            <td>Europe</td>
            <td><strong>7.81</strong></td>
            <td>-0.23M€</td>
            <td>1.78M€</td>
            <td><span class="badge badge-success">RECOMMANDÉ</span></td>
        </tr>
        <tr style="background-color: #dcfce7;">
            <td><strong>3</strong></td>
            <td><strong>Amsterdam</strong></td>
            <td>Europe</td>
            <td><strong>7.65</strong></td>
            <td>+0.07M€</td>
            <td>1.74M€</td>
            <td><span class="badge badge-success">RECOMMANDÉ</span></td>
        </tr>
        <tr style="background-color: #fef3c7;">
            <td>4</td>
            <td>Singapour</td>
            <td>Asie</td>
            <td>7.49</td>
            <td>+0.02M€</td>
            <td>1.61M€</td>
            <td><span class="badge badge-warning">POSSIBLE</span></td>
        </tr>
        <tr style="background-color: #fef3c7;">
            <td>5</td>
            <td>Chypre</td>
            <td>Europe</td>
            <td>6.51</td>
            <td>+0.40M€</td>
            <td>2.38M€</td>
            <td><span class="badge badge-warning">POSSIBLE</span></td>
        </tr>
        <tr style="background-color: #fef3c7;">
            <td>6</td>
            <td>Londres</td>
            <td>Europe</td>
            <td>6.72</td>
            <td>0.00M€</td>
            <td>2.00M€</td>
            <td><span class="badge badge-warning">POSSIBLE</span></td>
        </tr>
        <tr style="background-color: #fee2e2;">
            <td>12</td>
            <td>Maroc CFC</td>
            <td>Zone franche</td>
            <td>2.95</td>
            <td>-1.12M€</td>
            <td>1.00M€</td>
            <td><span class="badge badge-danger">NON RECOMMANDÉ</span></td>
        </tr>
        <tr style="background-color: #fef3c7;">
            <td>7</td>
            <td>Hambourg</td>
            <td>Europe</td>
            <td>6.78</td>
            <td>+0.09M€</td>
            <td>1.85M€</td>
            <td><span class="badge badge-warning">POSSIBLE</span></td>
        </tr>
        <tr style="background-color: #fee2e2;">
            <td>8</td>
            <td>Maurice</td>
            <td>Offshore</td>
            <td>5.62</td>
            <td>0.00M€</td>
            <td>1.20M€</td>
            <td><span class="badge badge-danger">DÉCONSEILLÉ</span></td>
        </tr>
        <tr style="background-color: #fee2e2;">
            <td>11</td>
            <td>Tel Aviv</td>
            <td>Moyen-Orient</td>
            <td>3.20</td>
            <td>-0.10M€</td>
            <td>1.65M€</td>
            <td><span class="badge badge-danger">NON RECOMMANDÉ</span></td>
        </tr>
        <tr style="background-color: #fee2e2;">
            <td>10</td>
            <td>Dubai</td>
            <td>Zone franche</td>
            <td>3.85</td>
            <td>0.00M€</td>
            <td>1.70M€</td>
            <td><span class="badge badge-danger">NON RECOMMANDÉ</span></td>
        </tr>
        <tr style="background-color: #fee2e2;">
            <td>9</td>
            <td>Andorre</td>
            <td>Zone franche</td>
            <td>4.20</td>
            <td>+0.76M€</td>
            <td>1.15M€</td>
            <td><span class="badge badge-danger">DÉCONSEILLÉ</span></td>
        </tr>
    </table>
    
    <div class="highlight-box">
        <h3>Analyse du Top 3</h3>
        <p><strong>Paris (1er)</strong> : Équilibre optimal entre rentabilité immédiate, impact social et accès aux financements DFI. Seule localisation européenne avec EBITDA positif dès l'An 1.</p>
        <p><strong>Genève (2ème)</strong> : Excellent pour l'impact social et les financements, mais EBITDA négatif en An 1 (-0.23M€) et coûts SG&A élevés.</p>
        <p><strong>Amsterdam (3ème)</strong> : Bon compromis général, EBITDA légèrement positif (+0.07M€), écosystème ESG développé.</p>
    </div>

    <div class="city-grid">
        ${this.generateCityCards()}
    </div>

    <div class="page-break"></div>
    `;
  }

  private generateCityCards(): string {
    const cities = [
      { name: 'Paris', score: 7.87, ebitda: 0.52, equity: 1.89, status: 'RECOMMANDÉ', color: '#dcfce7' },
      { name: 'Genève', score: 7.81, ebitda: -0.09, equity: 1.78, status: 'RECOMMANDÉ', color: '#dcfce7' },
      { name: 'Amsterdam', score: 7.65, ebitda: 0.07, equity: 1.74, status: 'RECOMMANDÉ', color: '#dcfce7' },
      { name: 'Singapour', score: 7.49, ebitda: 0.02, equity: 1.61, status: 'POSSIBLE', color: '#fef3c7' },
      { name: 'Chypre', score: 6.51, ebitda: 0.40, equity: 2.38, status: 'POSSIBLE', color: '#fef3c7' },
      { name: 'Londres', score: 6.72, ebitda: 0.00, equity: 2.00, status: 'POSSIBLE', color: '#fef3c7' },
      { name: 'Maroc CFC', score: 2.95, ebitda: -1.12, equity: 1.00, status: 'NON RECOMMANDÉ', color: '#fee2e2' },
      { name: 'Hambourg', score: 6.78, ebitda: 0.09, equity: 1.85, status: 'POSSIBLE', color: '#fef3c7' },
      { name: 'Maurice', score: 5.62, ebitda: 0.00, equity: 1.20, status: 'DÉCONSEILLÉ', color: '#fee2e2' },
      { name: 'Tel Aviv', score: 3.20, ebitda: -0.10, equity: 1.65, status: 'NON RECOMMANDÉ', color: '#fee2e2' },
      { name: 'Dubai', score: 3.85, ebitda: 0.00, equity: 1.70, status: 'NON RECOMMANDÉ', color: '#fee2e2' },
      { name: 'Andorre', score: 4.20, ebitda: 0.76, equity: 1.15, status: 'DÉCONSEILLÉ', color: '#fee2e2' }
    ];

    return cities.map((city, index) => `
        <div class="city-card" style="background-color: ${city.color};">
            <h4>${index + 1}. ${city.name}</h4>
            <div class="city-metric">
                <span class="city-metric-label">Score Global:</span>
                <span class="city-metric-value">${city.score}/10</span>
            </div>
            <div class="city-metric">
                <span class="city-metric-label">EBITDA An1:</span>
                <span class="city-metric-value">${city.ebitda >= 0 ? '+' : ''}${city.ebitda}M€</span>
            </div>
            <div class="city-metric">
                <span class="city-metric-label">Equity:</span>
                <span class="city-metric-value">${city.equity}M€</span>
            </div>
            <div class="city-metric">
                <span class="city-metric-label">Statut:</span>
                <span class="city-metric-value">${city.status}</span>
            </div>
        </div>
    `).join('');
  }

  private generateContexteSection(): string {
    return `
    <!-- 2. CONTEXTE -->
    <h1><span class="numero">2.</span> Contexte de la mission</h1>
    
    <h2>Neskao : Pionnier africain de la transformation du cacao</h2>
    
    <div class="highlight-box">
        <p><strong>Une Innovation Entrepreneuriale Unique</strong></p>
        <p>Fondée en septembre 2013, Neskao est <strong>la première entreprise africaine</strong> à transformer les fèves de cacao hors normes en produits semi-finis de qualité. Cette société familiale fondée par Jean Pierre Roux et dirigée par Sylvie Roux a développé un modèle d'affaires révolutionnaire qui valorise les déchets de la filière cacao tout en créant de la valeur économique et sociale.</p>
    </div>
    
    <table>
        <tr>
            <th>Indicateur</th>
            <th>Valeur</th>
            <th>Impact</th>
        </tr>
        <tr>
            <td>Année de création</td>
            <td>2013</td>
            <td>1ère entreprise africaine sur ce segment</td>
        </tr>
        <tr>
            <td>Emplois directs</td>
            <td>150+</td>
            <td>8,000 emplois indirects</td>
        </tr>
        <tr>
            <td>Capacité de production</td>
            <td>32,000 tonnes/an</td>
            <td>Pâte: 12,000T, Beurre: 5,000T, Tourteau: 15,000T</td>
        </tr>
        <tr>
            <td>Certification</td>
            <td>FSSC 22000 V.5</td>
            <td>Obtenue en 2021</td>
        </tr>
        <tr>
            <td>Localisation</td>
            <td>Zone industrielle de Vridi</td>
            <td>Abidjan, Côte d'Ivoire</td>
        </tr>
    </table>
    
    <h3>L'Ambition : Du Local à l'International</h3>
    <p>Fort de son expertise unique dans la valorisation des sous-produits du cacao, Neskao ambitionne maintenant de créer un <strong>bureau de trading international</strong>. Cette évolution stratégique vise à capturer davantage de valeur sur la chaîne mondiale du cacao en passant d'un modèle de transformation locale à une présence active sur les marchés internationaux des matières premières.</p>
    
    <h2>L'environnement international du cacao</h2>
    
    <h3>Marché du Cacao 2025-2026</h3>
    <table>
        <tr>
            <th>Paramètre</th>
            <th>Valeur</th>
            <th>Unité</th>
        </tr>
        <tr>
            <td>Production CI estimée</td>
            <td>1,500,000</td>
            <td>tonnes/an</td>
        </tr>
        <tr>
            <td>Prix moyen CAZ25</td>
            <td>6,200</td>
            <td>GBP/tonne</td>
        </tr>
        <tr>
            <td>Récolte principale (Oct-Déc)</td>
            <td>900,000</td>
            <td>tonnes</td>
        </tr>
        <tr>
            <td>Récolte intermédiaire (Jan-Mar)</td>
            <td>600,000</td>
            <td>tonnes</td>
        </tr>
    </table>
    
    <div class="success-box">
        <h3>La Convergence Stratégique</h3>
        <p><strong>Pourquoi un Bureau de Trading International Maintenant ?</strong></p>
        <p>La convergence entre l'expertise unique de Neskao, les évolutions réglementaires (EUDR), la volatilité des marchés et les opportunités de financement développement créent une fenêtre d'opportunité unique pour établir un bureau de trading international.</p>
    </div>

    <div class="page-break"></div>
    `;
  }

  private generateReglementationSection(): string {
    return `
    <!-- 3. RÉGLEMENTATION -->
    <h1><span class="numero">3.</span> Réglementation</h1>
    
    <h2>Exigences CCC pour contrats Forward</h2>
    
    <p>Le Conseil du Café-Cacao (CCC) de Côte d'Ivoire impose des conditions strictes pour l'obtention d'une licence d'exportation :</p>
    
    <table>
        <tr>
            <th>Critère</th>
            <th>Exigence CCC</th>
            <th>Statut Neskao</th>
            <th>Action requise</th>
        </tr>
        <tr>
            <td>Capital minimum</td>
            <td>5M USD (10M recommandé)</td>
            <td><span class="badge badge-warning">À mobiliser</span></td>
            <td>Levée de fonds ou apport actionnaires</td>
        </tr>
        <tr>
            <td>Garantie bancaire</td>
            <td>Ligne confirmée banque 1er rang</td>
            <td><span class="badge badge-warning">À négocier</span></td>
            <td>Négociation avec banques internationales</td>
        </tr>
        <tr>
            <td>Présence locale CI</td>
            <td>Bureau ou représentant</td>
            <td><span class="badge badge-success">✓ Acquis</span></td>
            <td>Infrastructure existante à Vridi</td>
        </tr>
        <tr>
            <td>Track record</td>
            <td>3 ans minimum</td>
            <td><span class="badge badge-success">✓ Acquis</span></td>
            <td>10+ ans d'expérience</td>
        </tr>
    </table>
    
    <h2>Accès aux marchés ICE Futures</h2>
    
    <div class="highlight-box">
        <h4>Option Recommandée : Via Broker</h4>
        <ul>
            <li>Compte chez broker régulé (StoneX, Marex, ADM)</li>
            <li>Dépôt initial : 250K-500K USD</li>
            <li>Commission : 5-15 USD/contrat</li>
            <li>Accès plateforme : CQG, TT, ou propriétaire</li>
        </ul>
    </div>
    
    <h2>Fiscalité par localisation</h2>
    
    <table>
        <tr>
            <th>Localisation</th>
            <th>Taux IS</th>
            <th>Convention CI</th>
            <th>Prix Transfert</th>
            <th>Avantages spéciaux</th>
        </tr>
        <tr style="background-color: #dcfce7;">
            <td><strong>Paris</strong></td>
            <td>25% + CVAE</td>
            <td><span class="badge badge-success">OUI</span></td>
            <td><span class="badge badge-success">OUI</span></td>
            <td>Élimination double imposition</td>
        </tr>
        <tr>
            <td>Genève</td>
            <td>15.15%</td>
            <td><span class="badge badge-success">OUI</span></td>
            <td><span class="badge badge-success">OUI</span></td>
            <td>Statut auxiliaire possible</td>
        </tr>
        <tr>
            <td>Amsterdam</td>
            <td>25.8%</td>
            <td><span class="badge badge-success">OUI</span></td>
            <td><span class="badge badge-success">OUI</span></td>
            <td>Innovation box 9%</td>
        </tr>
        <tr>
            <td>Londres</td>
            <td>25%</td>
            <td><span class="badge badge-success">OUI</span></td>
            <td><span class="badge badge-danger">NON</span></td>
            <td>Centre mondial trading</td>
        </tr>
        <tr>
            <td>Singapour</td>
            <td>5-10% GTP</td>
            <td><span class="badge badge-danger">NON</span></td>
            <td><span class="badge badge-success">OUI</span></td>
            <td>Global Trader Programme</td>
        </tr>
        <tr>
            <td>Dubai</td>
            <td>0%</td>
            <td><span class="badge badge-danger">NON</span></td>
            <td><span class="badge badge-danger">NON</span></td>
            <td>Zone franche DMCC</td>
        </tr>
    </table>
    
    <div class="alert-box">
        <h4>🚨 EUDR (EU Deforestation Regulation)</h4>
        <p><strong>Deadline :</strong> 30 décembre 2025 → reportée à 2026</p>
        <ul>
            <li>Traçabilité GPS obligatoire de toutes les parcelles</li>
            <li>Due diligence renforcée sur la chaîne d'approvisionnement</li>
            <li>Reporting annuel obligatoire</li>
            <li>Pénalités : jusqu'à 4% du CA EU</li>
        </ul>
    </div>
    
    <h2>Score Réglementation</h2>
    
    <table>
        <tr>
            <th>Localisation</th>
            <th>Score /10</th>
            <th>Justification</th>
        </tr>
        <tr style="background-color: #dcfce7;">
            <td>Paris, Genève, Amsterdam, Hambourg</td>
            <td><strong>10/10</strong></td>
            <td>Convention CI + Trading autorisé + Standards UE</td>
        </tr>
        <tr style="background-color: #fef3c7;">
            <td>Londres, Singapour</td>
            <td><strong>8/10</strong></td>
            <td>Manque convention CI ou complexité post-Brexit</td>
        </tr>
        <tr style="background-color: #fef2f2;">
            <td>Maroc CFC</td>
            <td><strong>3/10</strong></td>
            <td>Restrictions changes + Margin calls T+3</td>
        </tr>
    </table>

    <div class="page-break"></div>
    `;
  }

  private generateProduitsSection(): string {
    return `
    <!-- 4. MIX PRODUITS -->
    <h1><span class="numero">4.</span> Mix Produits</h1>
    
    <h2>Hypothèses prix du cacao</h2>
    
    <table>
        <tr>
            <th>Paramètre</th>
            <th>Valeur</th>
            <th>Source</th>
        </tr>
        <tr>
            <td>CAZ25 (Londres)</td>
            <td>6,200 GBP/T</td>
            <td>ICE Futures Europe</td>
        </tr>
        <tr>
            <td>CAH26 (Londres)</td>
            <td>5,800 GBP/T</td>
            <td>ICE Futures Europe</td>
        </tr>
        <tr>
            <td>FOREX EUR/GBP</td>
            <td>1.15461</td>
            <td>BCE</td>
        </tr>
        <tr>
            <td>LID (différentiel CI)</td>
            <td>400 EUR</td>
            <td>Historique CCC</td>
        </tr>
        <tr style="background-color: #dcfce7;">
            <td><strong>Prix moyen retenu</strong></td>
            <td><strong>6,973.84 EUR/T</strong></td>
            <td>Calcul pondéré</td>
        </tr>
    </table>
    
    <h2>Rendements de transformation</h2>
    
    <div class="highlight-box">
        <ul>
            <li>Fèves → Masse : 81%</li>
            <li>Masse → Beurre : 51%</li>
            <li>Masse → Poudre : 47%</li>
            <li>Perte process : 2%</li>
        </ul>
    </div>
    
    <h2>Répartition par produit</h2>
    
    <table>
        <tr>
            <th>Produit</th>
            <th>Répartition Production CI</th>
            <th>Export vs Local</th>
            <th>Trading Desk</th>
        </tr>
        <tr>
            <td>Masse de cacao</td>
            <td>25% vente directe, 75% transformation</td>
            <td>50/50</td>
            <td>100% du volume export</td>
        </tr>
        <tr>
            <td>Beurre standard</td>
            <td>60% de la masse transformée</td>
            <td>80/20</td>
            <td>100% du volume export</td>
        </tr>
        <tr>
            <td>Beurre premium</td>
            <td>10% de la masse transformée</td>
            <td>100/0</td>
            <td>100% du volume export</td>
        </tr>
        <tr>
            <td>Poudre naturelle</td>
            <td>20% de la masse transformée</td>
            <td>70/30</td>
            <td>100% du volume export</td>
        </tr>
        <tr>
            <td>Poudre alcalinisée</td>
            <td>10% de la masse transformée</td>
            <td>100/0</td>
            <td>100% du volume export</td>
        </tr>
    </table>
    
    <h2>Prix de vente (hybride 70/30)</h2>
    
    <table>
        <tr>
            <th>Produit</th>
            <th>Prix Cost Plus</th>
            <th>Prix Market</th>
            <th>Prix Hybride (70/30)</th>
            <th>Frais Trade</th>
            <th>Prix Final NESKAO</th>
        </tr>
        <tr>
            <td>Masse de cacao</td>
            <td>8,336 EUR/T</td>
            <td>10,147 EUR/T</td>
            <td>8,879 EUR/T</td>
            <td>150 EUR/T</td>
            <td><strong>9,029 EUR/T</strong></td>
        </tr>
        <tr>
            <td>Beurre standard</td>
            <td>16,139 EUR/T</td>
            <td>14,729 EUR/T</td>
            <td>15,716 EUR/T</td>
            <td>200 EUR/T</td>
            <td><strong>15,916 EUR/T</strong></td>
        </tr>
        <tr>
            <td>Beurre premium</td>
            <td>17,753 EUR/T</td>
            <td>16,202 EUR/T</td>
            <td>17,288 EUR/T</td>
            <td>250 EUR/T</td>
            <td><strong>17,538 EUR/T</strong></td>
        </tr>
        <tr>
            <td>Poudre naturelle</td>
            <td>1,852 EUR/T</td>
            <td>10,147 EUR/T</td>
            <td>4,340 EUR/T</td>
            <td>180 EUR/T</td>
            <td><strong>4,520 EUR/T</strong></td>
        </tr>
        <tr>
            <td>Poudre alcalinisée</td>
            <td>2,058 EUR/T</td>
            <td>10,147 EUR/T</td>
            <td>4,485 EUR/T</td>
            <td>180 EUR/T</td>
            <td><strong>4,665 EUR/T</strong></td>
        </tr>
    </table>
    
    <h2>Évolution volumes et CA</h2>
    
    <table>
        <tr>
            <th>Métrique</th>
            <th>An 1</th>
            <th>An 2</th>
            <th>An 3</th>
            <th>Total 3 ans</th>
        </tr>
        <tr>
            <td><strong>Volume total (tonnes)</strong></td>
            <td>6,490</td>
            <td>13,618</td>
            <td>22,245</td>
            <td>42,353</td>
        </tr>
        <tr>
            <td><strong>CA (M€)</strong></td>
            <td>54.18</td>
            <td>132.57</td>
            <td>227.58</td>
            <td>414.33</td>
        </tr>
        <tr>
            <td><strong>Marge brute (M€)</strong></td>
            <td>1.78</td>
            <td>4.25</td>
            <td>11.55</td>
            <td>17.58</td>
        </tr>
        <tr style="background-color: #dcfce7;">
            <td><strong>Marge (%)</strong></td>
            <td>3.28%</td>
            <td>3.21%</td>
            <td>5.07%</td>
            <td>4.24%</td>
        </tr>
    </table>
    
    <div class="success-box">
        <p><strong>Points clés :</strong></p>
        <ul>
            <li>Montée en puissance progressive avec multiplication par 3.4x des volumes entre An 1 et An 3</li>
            <li>Amélioration de la marge de 3.28% à 5.07% grâce aux économies d'échelle</li>
            <li>Mix produit équilibré favorisant les produits à plus forte valeur ajoutée (beurre premium)</li>
            <li>100% des volumes export captés par le Trading Desk</li>
        </ul>
    </div>

    <div class="page-break"></div>
    `;
  }

  private generateSGASection(): string {
    return `
    <!-- 5. SG&A -->
    <h1><span class="numero">5.</span> SG&A - Coûts de structure</h1>
    
    <h2>Hypothèses par localité</h2>
    
    <table>
        <tr>
            <th>Catégorie</th>
            <th>Paris</th>
            <th>Genève</th>
            <th>Amsterdam</th>
            <th>Londres</th>
        </tr>
        <tr>
            <td><strong>PERSONNEL</strong></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>Head of Trading</td>
            <td>250K€</td>
            <td>350K€</td>
            <td>280K€</td>
            <td>350K€</td>
        </tr>
        <tr>
            <td>Traders (2)</td>
            <td>300K€</td>
            <td>400K€</td>
            <td>340K€</td>
            <td>420K€</td>
        </tr>
        <tr>
            <td>Risk/Compliance</td>
            <td>120K€</td>
            <td>150K€</td>
            <td>130K€</td>
            <td>160K€</td>
        </tr>
        <tr>
            <td>Support (3-4)</td>
            <td>140K€</td>
            <td>180K€</td>
            <td>160K€</td>
            <td>200K€</td>
        </tr>
        <tr style="background-color: #f1f5f9;">
            <td><strong>Total Personnel</strong></td>
            <td><strong>810K€</strong></td>
            <td><strong>1,080K€</strong></td>
            <td><strong>910K€</strong></td>
            <td><strong>1,130K€</strong></td>
        </tr>
        <tr>
            <td><strong>BUREAUX</strong></td>
            <td>98K€</td>
            <td>171K€</td>
            <td>128K€</td>
            <td>195K€</td>
        </tr>
        <tr>
            <td><strong>IT & SYSTÈMES</strong></td>
            <td>194K€</td>
            <td>194K€</td>
            <td>194K€</td>
            <td>208K€</td>
        </tr>
        <tr>
            <td><strong>COMPLIANCE</strong></td>
            <td>124K€</td>
            <td>142K€</td>
            <td>124K€</td>
            <td>156K€</td>
        </tr>
        <tr>
            <td><strong>AUTRES</strong></td>
            <td>64K€</td>
            <td>86K€</td>
            <td>82K€</td>
            <td>98K€</td>
        </tr>
    </table>
    
    <h2>Récapitulatif par localisation</h2>
    
    <table>
        <tr>
            <th>Rang</th>
            <th>Ville</th>
            <th>An 1 (M€)</th>
            <th>An 2 (M€)</th>
            <th>An 3 (M€)</th>
            <th>Total 3 ans</th>
            <th>€/tonne An3</th>
        </tr>
        <tr style="background-color: #dcfce7;">
            <td>1</td>
            <td><strong>Maroc CFC</strong></td>
            <td>0.69</td>
            <td>0.72</td>
            <td>0.97</td>
            <td><strong>2.38 M€</strong></td>
            <td>40</td>
        </tr>
        <tr style="background-color: #dcfce7;">
            <td>2</td>
            <td><strong>Maurice</strong></td>
            <td>0.80</td>
            <td>0.82</td>
            <td>1.09</td>
            <td><strong>2.70 M€</strong></td>
            <td>44</td>
        </tr>
        <tr style="background-color: #dcfce7;">
            <td>3</td>
            <td><strong>Andorre</strong></td>
            <td>0.87</td>
            <td>0.86</td>
            <td>1.14</td>
            <td><strong>2.87 M€</strong></td>
            <td>47</td>
        </tr>
        <tr style="background-color: #dcfce7;">
            <td>4</td>
            <td><strong>Paris</strong></td>
            <td>1.29</td>
            <td>1.22</td>
            <td>1.48</td>
            <td><strong>3.99 M€</strong></td>
            <td>60</td>
        </tr>
        <tr>
            <td>5</td>
            <td>Hambourg</td>
            <td>1.30</td>
            <td>1.25</td>
            <td>1.64</td>
            <td>4.19 M€</td>
            <td>67</td>
        </tr>
        <tr>
            <td>6</td>
            <td>Chypre</td>
            <td>1.38</td>
            <td>1.33</td>
            <td>1.68</td>
            <td>4.39 M€</td>
            <td>69</td>
        </tr>
        <tr>
            <td>7</td>
            <td>Amsterdam</td>
            <td>1.34</td>
            <td>1.32</td>
            <td>1.70</td>
            <td>4.35 M€</td>
            <td>69</td>
        </tr>
        <tr>
            <td>8</td>
            <td>Dubai</td>
            <td>1.41</td>
            <td>1.33</td>
            <td>1.71</td>
            <td>4.45 M€</td>
            <td>70</td>
        </tr>
        <tr>
            <td>9</td>
            <td>Tel Aviv</td>
            <td>1.45</td>
            <td>1.38</td>
            <td>1.82</td>
            <td>4.65 M€</td>
            <td>75</td>
        </tr>
        <tr>
            <td>10</td>
            <td>Genève</td>
            <td>1.69</td>
            <td>1.57</td>
            <td>2.00</td>
            <td>5.26 M€</td>
            <td>82</td>
        </tr>
        <tr>
            <td>11</td>
            <td>Singapour</td>
            <td>1.75</td>
            <td>1.68</td>
            <td>2.14</td>
            <td>5.57 M€</td>
            <td>88</td>
        </tr>
        <tr style="background-color: #fef2f2;">
            <td>12</td>
            <td>Londres</td>
            <td>1.86</td>
            <td>1.74</td>
            <td>2.22</td>
            <td>5.81 M€</td>
            <td>91</td>
        </tr>
    </table>
    
    <div class="highlight-box">
        <p><strong>Analyse des coûts SG&A :</strong></p>
        <ul>
            <li><strong>Paris (4ème position)</strong> : Excellent équilibre coût/qualité parmi les hubs européens majeurs</li>
            <li><strong>Économies d'échelle</strong> : Réduction du ratio €/tonne de 75% entre An 1 et An 3</li>
            <li><strong>Zones offshore</strong> (Maroc, Maurice) : Coûts les plus bas mais avec limitations opérationnelles</li>
            <li><strong>Hubs premium</strong> (Genève, Londres, Singapour) : Coûts élevés compensés par accès privilégié aux marchés</li>
        </ul>
    </div>

    <div class="page-break"></div>
    `;
  }

  private generateRentabiliteSection(): string {
    return `
    <!-- 6. RENTABILITÉ -->
    <h1><span class="numero">6.</span> Rentabilité</h1>
    
    <h2>Performance financière par localisation</h2>
    
    <table>
        <tr>
            <th>Rang</th>
            <th>Ville</th>
            <th>EBITDA An1 (M€)</th>
            <th>EBITDA An2 (M€)</th>
            <th>EBITDA An3 (M€)</th>
            <th>Résultat Net 3 ans (M€)</th>
            <th>ROI 3 ans</th>
        </tr>
        <tr style="background-color: #dcfce7;">
            <td>1</td>
            <td><strong>Paris</strong></td>
            <td><strong>+0.52</strong></td>
            <td>2.84</td>
            <td>9.93</td>
            <td>5.14</td>
            <td><strong>171.5%</strong></td>
        </tr>
        <tr>
            <td>2</td>
            <td>Maroc CFC</td>
            <td>+0.93</td>
            <td>3.33</td>
            <td>10.42</td>
            <td>7.89</td>
            <td>139.2%</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Maurice</td>
            <td>+0.82</td>
            <td>3.23</td>
            <td>10.30</td>
            <td>6.84</td>
            <td>181.9%</td>
        </tr>
        <tr>
            <td>4</td>
            <td>Andorre</td>
            <td>+0.76</td>
            <td>3.20</td>
            <td>10.25</td>
            <td>6.97</td>
            <td>242.4%</td>
        </tr>
        <tr>
            <td>5</td>
            <td>Singapour</td>
            <td>+0.02</td>
            <td>2.38</td>
            <td>9.25</td>
            <td>3.22</td>
            <td>200.0%</td>
        </tr>
        <tr>
            <td>6</td>
            <td>Chypre</td>
            <td>+0.40</td>
            <td>2.73</td>
            <td>9.71</td>
            <td>6.22</td>
            <td>248.8%</td>
        </tr>
        <tr>
            <td>7</td>
            <td>Hambourg</td>
            <td>+0.09</td>
            <td>2.56</td>
            <td>9.40</td>
            <td>3.96</td>
            <td>132.0%</td>
        </tr>
        <tr>
            <td>8</td>
            <td>Amsterdam</td>
            <td>+0.07</td>
            <td>2.56</td>
            <td>9.40</td>
            <td>4.82</td>
            <td>176.6%</td>
        </tr>
        <tr>
            <td>9</td>
            <td>Dubai</td>
            <td>0.00</td>
            <td>2.35</td>
            <td>9.18</td>
            <td>4.55</td>
            <td>175.7%</td>
        </tr>
        <tr>
            <td>10</td>
            <td>Tel Aviv</td>
            <td>-0.06</td>
            <td>2.30</td>
            <td>9.07</td>
            <td>3.85</td>
            <td>177.4%</td>
        </tr>
        <tr>
            <td>11</td>
            <td>Genève</td>
            <td>-0.23</td>
            <td>2.34</td>
            <td>9.09</td>
            <td>5.13</td>
            <td>187.4%</td>
        </tr>
        <tr style="background-color: #fef2f2;">
            <td>12</td>
            <td>Londres</td>
            <td><strong>-0.67</strong></td>
            <td>2.17</td>
            <td>8.88</td>
            <td>3.00</td>
            <td>100.0%</td>
        </tr>
    </table>
    
    <div class="key-metrics" style="margin: 30px 0;">
        <div class="metric-box">
            <h4>Classement EBITDA An1</h4>
            <ol>
                <li>Maroc CFC : +0.93 M€</li>
                <li>Maurice : +0.82 M€</li>
                <li>Andorre : +0.76 M€</li>
                <li><strong>Paris : +0.52 M€</strong></li>
                <li>Chypre : +0.40 M€</li>
                <li>Hambourg : +0.09 M€</li>
            </ol>
        </div>
        
        <div class="metric-box">
            <h4>Classement ROI 3 ans</h4>
            <ol>
                <li>Chypre : 248.8%</li>
                <li>Andorre : 242.4%</li>
                <li>Singapour : 200.0%</li>
                <li>Genève : 187.4%</li>
                <li>Maurice : 181.9%</li>
                <li><strong>Paris : 171.5%</strong></li>
            </ol>
        </div>
    </div>
    
    <div class="highlight-box">
        <h4>Analyse de la rentabilité - Pourquoi Paris ?</h4>
        <ul>
            <li><strong>Rentabilité immédiate</strong> : 4ème meilleur EBITDA An1 (+0.52M€), critère essentiel pour le lancement</li>
            <li><strong>ROI solide</strong> : 171.5% sur 3 ans, dans le top 6 des localisations</li>
            <li><strong>Stabilité</strong> : Pas de déficit en An1 contrairement à Genève (-0.23M€) et Londres (-0.67M€)</li>
            <li><strong>Équilibre</strong> : Performance financière acceptable combinée aux meilleurs scores Impact Social et DFI</li>
            <li><strong>Risque maîtrisé</strong> : Évite les juridictions offshore à fort risque réputationnel</li>
        </ul>
    </div>
    
    <div class="alert-box">
        <p><strong>⚠️ Attention :</strong> Bien que certaines localisations (Chypre, Andorre, Singapour) affichent des ROI supérieurs, elles présentent des risques ou limitations qui justifient le choix de Paris pour une approche équilibrée.</p>
    </div>

    <div class="page-break"></div>
    `;
  }

  private generateFinancementSection(): string {
    return `
    <!-- 7. FINANCEMENT -->
    <h1><span class="numero">7.</span> Structure de Financement</h1>
    
    <h2>Besoins de financement par activité</h2>
    
    <h3>Forward Trading</h3>
    <table>
        <tr>
            <th>Paramètre</th>
            <th>Europe</th>
            <th>Afrique</th>
            <th>Asie</th>
        </tr>
        <tr>
            <td>Cash Cycle</td>
            <td>60 jours</td>
            <td>72 jours</td>
            <td>65 jours</td>
        </tr>
        <tr>
            <td>Buffer volatilité</td>
            <td>30%</td>
            <td>40%</td>
            <td>30%</td>
        </tr>
        <tr>
            <td>Ratio Equity/Dette</td>
            <td>10-25% / 75-90%</td>
            <td>20-30% / 70-80%</td>
            <td>15-20% / 80-85%</td>
        </tr>
        <tr>
            <td>Taux financement</td>
            <td>EURIBOR + 2-3%</td>
            <td>LIBOR + 3-4%</td>
            <td>SOFR + 2.5%</td>
        </tr>
    </table>
    
    <h3>Futures Trading</h3>
    <table>
        <tr>
            <th>Paramètre</th>
            <th>Toutes localisations</th>
        </tr>
        <tr>
            <td>Initial Margin ICE</td>
            <td>731.79 EUR/tonne</td>
        </tr>
        <tr>
            <td>Buffer margin calls</td>
            <td>50%</td>
        </tr>
        <tr>
            <td>Ratio Equity/Dette</td>
            <td>20-25% / 75-80%</td>
        </tr>
        <tr>
            <td>Allocation hedging</td>
            <td>5% An1 → 45% An3</td>
        </tr>
        <tr>
            <td>Allocation spéculation</td>
            <td>1% An1 → 5% An3</td>
        </tr>
    </table>
    
    <h2>Besoins par localisation An1</h2>
    
    <table>
        <tr>
            <th>Ville</th>
            <th>Capital Initial</th>
            <th>Cash Forward</th>
            <th>Cash Futures</th>
            <th>Total An 1</th>
            <th>Ratio D/E</th>
        </tr>
        <tr style="background-color: #dcfce7;">
            <td><strong>Paris</strong></td>
            <td><strong>1.89 M€</strong></td>
            <td>8.52 M€</td>
            <td>5.20 M€</td>
            <td><strong>13.73 M€</strong></td>
            <td>6.25x</td>
        </tr>
        <tr>
            <td>Genève</td>
            <td>1.78 M€</td>
            <td>7.44 M€</td>
            <td>5.20 M€</td>
            <td>12.64 M€</td>
            <td>6.08x</td>
        </tr>
        <tr>
            <td>Amsterdam</td>
            <td>1.74 M€</td>
            <td>7.26 M€</td>
            <td>5.07 M€</td>
            <td>12.33 M€</td>
            <td>6.09x</td>
        </tr>
        <tr>
            <td>Londres</td>
            <td>2.00 M€</td>
            <td>6.70 M€</td>
            <td>4.98 M€</td>
            <td>11.67 M€</td>
            <td>4.84x</td>
        </tr>
        <tr>
            <td>Singapour</td>
            <td>1.61 M€</td>
            <td>6.15 M€</td>
            <td>4.98 M€</td>
            <td>11.12 M€</td>
            <td>5.91x</td>
        </tr>
    </table>
    
    <h2>Accès aux financements DFI</h2>
    
    <table>
        <tr>
            <th>Rang</th>
            <th>Ville</th>
            <th>Score /10</th>
            <th>Institutions disponibles</th>
            <th>Avantages</th>
        </tr>
        <tr style="background-color: #dcfce7;">
            <td>1</td>
            <td><strong>Paris</strong></td>
            <td><strong>10/10</strong></td>
            <td>AFD/Proparco</td>
            <td>Accès privilégié, mission CI</td>
        </tr>
        <tr style="background-color: #dcfce7;">
            <td>1</td>
            <td>Genève</td>
            <td><strong>10/10</strong></td>
            <td>Hub DFI mondial</td>
            <td>Toutes institutions présentes</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Amsterdam</td>
            <td>9/10</td>
            <td>FMO</td>
            <td>Institution néerlandaise active</td>
        </tr>
        <tr>
            <td>4</td>
            <td>Londres</td>
            <td>8/10</td>
            <td>BII/CDC</td>
            <td>Post-Brexit, plus complexe</td>
        </tr>
        <tr>
            <td>4</td>
            <td>Singapour</td>
            <td>8/10</td>
            <td>IFC Asie</td>
            <td>Hub régional IFC</td>
        </tr>
    </table>
    
    <div class="success-box">
        <h4>Avantage Paris pour le financement DFI</h4>
        <ul>
            <li><strong>AFD/Proparco</strong> : Institutions françaises spécialisées Afrique avec mission explicite de soutien à la Côte d'Ivoire</li>
            <li><strong>Taux privilégiés</strong> : -200 à -300 bps vs financement bancaire commercial</li>
            <li><strong>Programmes dédiés</strong> : Facilité cacao durable, initiative FISEA</li>
            <li><strong>Alignement mission</strong> : Objectifs d'impact social parfaitement alignés</li>
            <li><strong>Due diligence simplifiée</strong> : Connaissance approfondie de Neskao et de l'écosystème ivoirien</li>
        </ul>
    </div>
    
    <div class="alert-box">
        <p><strong>⚠️ Alerte financement :</strong> Les besoins en capital de roulement peuvent doubler en cas de stress de marché (volatilité +33%). Une ligne de backup de 15M€ minimum est recommandée.</p>
    </div>

    <div class="page-break"></div>
    `;
  }

  private generateImpactSocialSection(): string {
    return `
    <!-- 8. IMPACT SOCIAL -->
    <h1><span class="numero">8.</span> Impact Social</h1>
    
    <h2>Méthodologie d'évaluation</h2>
    
    <p>L'évaluation de l'impact social repose sur 7 critères pondérés pour mesurer la capacité de chaque localisation à créer de la valeur pour la Côte d'Ivoire :</p>
    
    <table>
        <tr>
            <th>Critère</th>
            <th>Pondération</th>
            <th>Indicateurs mesurés</th>
        </tr>
        <tr>
            <td>Proximité CI</td>
            <td>20%</td>
            <td>Liens historiques, diaspora, vols directs, langue</td>
        </tr>
        <tr>
            <td>Écosystème ESG</td>
            <td>15%</td>
            <td>ONGs, certifications, entreprises sociales</td>
        </tr>
        <tr>
            <td>Financement Impact</td>
            <td>15%</td>
            <td>DFI présents, fonds impact, programmes publics</td>
        </tr>
        <tr>
            <td>Emploi/Formation CI</td>
            <td>15%</td>
            <td>Stages, échanges universitaires, formation continue</td>
        </tr>
        <tr>
            <td>Transparence</td>
            <td>15%</td>
            <td>Standards reporting, culture business éthique</td>
        </tr>
        <tr>
            <td>Influence Policy</td>
            <td>10%</td>
            <td>Capacité à influencer standards durabilité</td>
        </tr>
        <tr>
            <td>Partenariats</td>
            <td>10%</td>
            <td>Facilité partenariats ONG/entreprises</td>
        </tr>
    </table>
    
    <h2>Classement Impact Social</h2>
    
    <table>
        <tr>
            <th>Rang</th>
            <th>Ville</th>
            <th>Score /10</th>
            <th>Forces principales</th>
            <th>Faiblesses</th>
        </tr>
        <tr style="background-color: #dcfce7;">
            <td>1</td>
            <td><strong>Maroc CFC</strong></td>
            <td><strong>8.60</strong></td>
            <td>Coopération Sud-Sud, francophone, proximité culturelle</td>
            <td>Restrictions changes</td>
        </tr>
        <tr style="background-color: #dcfce7;">
            <td>2</td>
            <td><strong>Paris</strong></td>
            <td><strong>8.50</strong></td>
            <td>Liens historiques CI, diaspora 150K, AFD/Proparco</td>
            <td>Perception néo-coloniale</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Genève</td>
            <td>7.90</td>
            <td>Hub mondial développement, standards suisses</td>
            <td>Coûts élevés, élitisme</td>
        </tr>
        <tr>
            <td>4</td>
            <td>Amsterdam</td>
            <td>7.75</td>
            <td>Tony's Chocolonely ecosystem, innovation ESG</td>
            <td>Distance culturelle</td>
        </tr>
        <tr>
            <td>5</td>
            <td>Londres</td>
            <td>7.60</td>
            <td>Fairtrade UK leader, soft power global</td>
            <td>Post-Brexit, coûts</td>
        </tr>
        <tr>
            <td>6</td>
            <td>Maurice</td>
            <td>7.50</td>
            <td>Hub africain, solidarité régionale</td>
            <td>Image offshore</td>
        </tr>
    </table>
    
    <h2>Impact économique direct pour la Côte d'Ivoire</h2>
    
    <div class="highlight-box">
        <table>
            <tr>
                <th>Indicateur</th>
                <th>An 1</th>
                <th>An 3</th>
                <th>Impact</th>
            </tr>
            <tr>
                <td>Emplois directs CI</td>
                <td>15-20</td>
                <td>35-40</td>
                <td>Formation internationale</td>
            </tr>
            <tr>
                <td>Jeunes formés/an</td>
                <td>20</td>
                <td>50+</td>
                <td>Stages et alternance</td>
            </tr>
            <tr>
                <td>Valeur ajoutée locale</td>
                <td>+8%</td>
                <td>+15%</td>
                <td>Sur prix export</td>
            </tr>
            <tr>
                <td>Revenus producteurs</td>
                <td>+5%</td>
                <td>+8-12%</td>
                <td>Via primes durabilité</td>
            </tr>
            <tr>
                <td>Investissement local</td>
                <td>2M€</td>
                <td>5M€</td>
                <td>Infrastructure & formation</td>
            </tr>
        </table>
    </div>
    
    <h2>Initiatives d'impact social prévues</h2>
    
    <div class="success-box">
        <ul>
            <li><strong>Programme "Jeunes Talents CI" :</strong> 10 stagiaires/an formés au trading international</li>
            <li><strong>Fonds de soutien producteurs :</strong> 2% des profits réinvestis localement</li>
            <li><strong>Centre de formation Abidjan :</strong> Partenariat avec universités locales</li>
            <li><strong>Traçabilité blockchain :</strong> 100% des parcelles géolocalisées d'ici 2027</li>
            <li><strong>Certification progressive :</strong> Objectif 50% volumes certifiés Rainforest Alliance</li>
        </ul>
    </div>
    
    <h2>Pourquoi Paris excellent pour l'Impact Social ?</h2>
    
    <div class="highlight-box">
        <ul>
            <li><strong>Diaspora ivoirienne</strong> : 150,000 personnes, largest in Europe, réseau d'expertise unique</li>
            <li><strong>Liens institutionnels</strong> : Ambassade, consulats, chambres de commerce spécialisées</li>
            <li><strong>AFD/Proparco</strong> : Institutions avec mandat explicite de soutien à la Côte d'Ivoire</li>
            <li><strong>Écosystème académique</strong> : Grandes écoles (HEC, ESSEC), universités avec programmes Afrique</li>
            <li><strong>Médias francophones</strong> : Portée directe vers la Côte d'Ivoire pour communication impact</li>
            <li><strong>ONG et fondations</strong> : Nombreuses organisations actives en Côte d'Ivoire</li>
        </ul>
    </div>

    <div class="page-break"></div>
    `;
  }

  private generateAnalyseDecisionnelleSection(): string {
    return `
    <!-- 9. ANALYSE DÉCISIONNELLE -->
    <h1><span class="numero">9.</span> Analyse Décisionnelle</h1>
    
    <h2>Méthodologie de scoring</h2>
    
    <div class="highlight-box">
        <h3>Pondération des critères</h3>
        <ul>
            <li><strong>Réglementation</strong> : 25% (Conformité indispensable)</li>
            <li><strong>Impact Social</strong> : 22% (Mission Neskao)</li>
            <li><strong>ROI</strong> : 20% (Viabilité financière)</li>
            <li><strong>Financement DFI</strong> : 18% (Accès capital patient)</li>
            <li><strong>Cash Management</strong> : 15% (Optimisation trésorerie)</li>
        </ul>
    </div>
    
    <h2>Classement final</h2>
    
    <table>
        <tr>
            <th>Rang</th>
            <th>Ville</th>
            <th>Statut</th>
            <th>Score Reg</th>
            <th>Impact Social</th>
            <th>Score ROI</th>
            <th>Score DFI</th>
            <th>Score Cash</th>
            <th>Score Pondéré</th>
            <th>Décision</th>
        </tr>
        <tr style="background-color: #dcfce7;">
            <td>1</td>
            <td><strong>Paris</strong></td>
            <td>GO</td>
            <td>10.00</td>
            <td>8.50</td>
            <td>5.46</td>
            <td>10.00</td>
            <td>6.66</td>
            <td><strong>7.87</strong></td>
            <td><span class="badge badge-success">RECOMMANDÉ</span></td>
        </tr>
        <tr style="background-color: #dcfce7;">
            <td>2</td>
            <td>Genève</td>
            <td>GO</td>
            <td>10.00</td>
            <td>7.90</td>
            <td>5.92</td>
            <td>10.00</td>
            <td>6.85</td>
            <td>7.81</td>
            <td><span class="badge badge-success">RECOMMANDÉ</span></td>
        </tr>
        <tr style="background-color: #dcfce7;">
            <td>3</td>
            <td>Amsterdam</td>
            <td>GO</td>
            <td>10.00</td>
            <td>7.75</td>
            <td>5.61</td>
            <td>9.00</td>
            <td>6.93</td>
            <td>7.65</td>
            <td><span class="badge badge-success">RECOMMANDÉ</span></td>
        </tr>
        <tr style="background-color: #fef3c7;">
            <td>4</td>
            <td>Singapour</td>
            <td>GO</td>
            <td>8.00</td>
            <td>6.15</td>
            <td>10.00</td>
            <td>8.00</td>
            <td>7.16</td>
            <td>7.49</td>
            <td><span class="badge badge-warning">POSSIBLE</span></td>
        </tr>
        <tr style="background-color: #fef3c7;">
            <td>5</td>
            <td>Chypre</td>
            <td>POSSIBLE</td>
            <td>8.00</td>
            <td>6.30</td>
            <td>4.95</td>
            <td>9.00</td>
            <td>5.50</td>
            <td>6.51</td>
            <td><span class="badge badge-warning">POSSIBLE</span></td>
        </tr>
        <tr style="background-color: #fef3c7;">
            <td>6</td>
            <td>Londres</td>
            <td>POSSIBLE</td>
            <td>8.00</td>
            <td>7.60</td>
            <td>3.34</td>
            <td>8.00</td>
            <td>6.47</td>
            <td>6.72</td>
            <td><span class="badge badge-warning">POSSIBLE</span></td>
        </tr>
        <tr style="background-color: #fee2e2;">
            <td>12</td>
            <td>Maroc CFC</td>
            <td>NO</td>
            <td>3.00</td>
            <td>8.60</td>
            <td>1.00</td>
            <td>2.00</td>
            <td>1.50</td>
            <td>2.95</td>
            <td><span class="badge badge-danger">NON RECOMMANDÉ</span></td>
        </tr>
        <tr style="background-color: #fef3c7;">
            <td>7</td>
            <td>Hambourg</td>
            <td>POSSIBLE</td>
            <td>10.00</td>
            <td>6.75</td>
            <td>4.19</td>
            <td>6.00</td>
            <td>6.74</td>
            <td>6.78</td>
            <td><span class="badge badge-warning">POSSIBLE</span></td>
        </tr>
        <tr style="background-color: #fee2e2;">
            <td>8</td>
            <td>Maurice</td>
            <td>NO</td>
            <td>8.00</td>
            <td>7.50</td>
            <td>2.00</td>
            <td>7.00</td>
            <td>3.80</td>
            <td>5.62</td>
            <td><span class="badge badge-danger">DÉCONSEILLÉ</span></td>
        </tr>
        <tr style="background-color: #fee2e2;">
            <td>9</td>
            <td>Andorre</td>
            <td>NO</td>
            <td>6.00</td>
            <td>3.40</td>
            <td>2.50</td>
            <td>2.00</td>
            <td>5.80</td>
            <td>4.20</td>
            <td><span class="badge badge-danger">DÉCONSEILLÉ</span></td>
        </tr>
        <tr style="background-color: #fee2e2;">
            <td>10</td>
            <td>Dubai</td>
            <td>NO</td>
            <td>7.00</td>
            <td>5.10</td>
            <td>1.50</td>
            <td>4.00</td>
            <td>3.00</td>
            <td>3.85</td>
            <td><span class="badge badge-danger">NON RECOMMANDÉ</span></td>
        </tr>
        <tr style="background-color: #fee2e2;">
            <td>11</td>
            <td>Tel Aviv</td>
            <td>NO</td>
            <td>8.00</td>
            <td>4.50</td>
            <td>1.00</td>
            <td>5.00</td>
            <td>2.50</td>
            <td>3.20</td>
            <td><span class="badge badge-danger">NON RECOMMANDÉ</span></td>
        </tr>
        <tr style="background-color: #fee2e2;">
            <td>12</td>
            <td>Maroc CFC</td>
            <td>NO</td>
            <td>3.00</td>
            <td>8.60</td>
            <td>1.00</td>
            <td>2.00</td>
            <td>1.50</td>
            <td>2.95</td>
            <td><span class="badge badge-danger">NON RECOMMANDÉ</span></td>
        </tr>
    </table>
    
    <h2>Analyse détaillée - Top 3</h2>
    
    <table>
        <tr>
            <th>Métrique</th>
            <th>#1 Paris</th>
            <th>#2 Genève</th>
            <th>#3 Amsterdam</th>
        </tr>
        <tr>
            <td>Volume An1 (tonnes)</td>
            <td>6,490</td>
            <td>6,490</td>
            <td>6,490</td>
        </tr>
        <tr>
            <td>CA An1 (M€)</td>
            <td>54.18</td>
            <td>54.18</td>
            <td>54.18</td>
        </tr>
        <tr>
            <td>SG&A An1 (M€)</td>
            <td>1.29</td>
            <td>1.69</td>
            <td>1.34</td>
        </tr>
        <tr>
            <td>EBITDA An1 (M€)</td>
            <td><strong>+0.52</strong></td>
            <td>-0.23</td>
            <td>+0.07</td>
        </tr>
        <tr>
            <td>ROI 3 ans</td>
            <td>171.5%</td>
            <td>187.4%</td>
            <td>176.6%</td>
        </tr>
        <tr>
            <td>Score Impact Social</td>
            <td><strong>8.50</strong></td>
            <td>7.90</td>
            <td>7.75</td>
        </tr>
        <tr>
            <td>Score DFI</td>
            <td><strong>10.00</strong></td>
            <td>10.00</td>
            <td>9.00</td>
        </tr>
    </table>
    
    <h2>Pourquoi Paris est-il le choix optimal ?</h2>
    
    <div class="recommendation-box">
        <h3>Les 7 arguments décisifs pour Paris</h3>
        <ol>
            <li><strong>Seul hub européen EBITDA+ en An1</strong> : +0.52M€ vs -0.23M€ pour Genève</li>
            <li><strong>Score Impact Social exceptionnel</strong> : 8.50/10, 2ème meilleur score global</li>
            <li><strong>Accès privilégié AFD/Proparco</strong> : 10/10 pour financement DFI mission</li>
            <li><strong>Réglementation parfaite</strong> : 10/10 avec convention fiscale CI optimale</li>
            <li><strong>Coûts SG&A maîtrisés</strong> : 3.99M€ sur 3 ans, excellent rapport qualité/prix</li>
            <li><strong>Écosystème diaspora unique</strong> : 150K Ivoiriens, réseau d'expertise</li>
            <li><strong>Équilibre optimal</strong> : Top 3 sur tous les critères, pas de faiblesse majeure</li>
        </ol>
    </div>
    
    <h2>Analyse des alternatives</h2>
    
    <div class="highlight-box">
        <p><strong>Genève (2ème)</strong> : Excellent pour DFI et réglementation, mais EBITDA négatif An1 (-0.23M€) et coûts SG&A 27% plus élevés que Paris.</p>
        <p><strong>Amsterdam (3ème)</strong> : Bon équilibre général, mais score Impact Social inférieur (7.75 vs 8.50) et accès DFI moins optimal que Paris.</p>
        <p><strong>Singapour (4ème)</strong> : Meilleur ROI (200%) mais impact social faible (6.15/10) et absence convention fiscale CI.</p>
    </div>

    <div class="page-break"></div>
    `;
  }

  private generateRisquesSection(): string {
    return `
    <!-- 10. RISQUES -->
    <h1><span class="numero">10.</span> Risques et Mitigation</h1>
    
    <h2>Matrice des risques prioritaires</h2>
    
    <table>
        <tr>
            <th>Risque</th>
            <th>Probabilité</th>
            <th>Impact</th>
            <th>Score</th>
            <th>Actions de mitigation</th>
        </tr>
        <tr style="background-color: #fef2f2;">
            <td><strong>Volatilité extrême cacao</strong></td>
            <td>Élevée</td>
            <td>Très élevé</td>
            <td><strong>20</strong></td>
            <td>Limites strictes, stress tests, ligne backup 15M€</td>
        </tr>
        <tr style="background-color: #fef2f2;">
            <td><strong>Défaillance contrepartie majeure</strong></td>
            <td>Moyenne</td>
            <td>Très élevé</td>
            <td><strong>15</strong></td>
            <td>Diversification, notation A- minimum, garanties</td>
        </tr>
        <tr style="background-color: #fef3c7;">
            <td><strong>Changement réglementation EUDR</strong></td>
            <td>Moyenne</td>
            <td>Élevé</td>
            <td><strong>12</strong></td>
            <td>Veille réglementaire, compliance proactive</td>
        </tr>
        <tr style="background-color: #fef3c7;">
            <td><strong>Instabilité politique CI</strong></td>
            <td>Faible</td>
            <td>Très élevé</td>
            <td><strong>12</strong></td>
            <td>Diversification origines, assurance politique</td>
        </tr>
        <tr style="background-color: #fef3c7;">
            <td><strong>Cyber-attaque systèmes trading</strong></td>
            <td>Moyenne</td>
            <td>Élevé</td>
            <td><strong>12</strong></td>
            <td>Sécurité renforcée, backup, cyber-assurance</td>
        </tr>
        <tr>
            <td>Personnel clé indisponible</td>
            <td>Moyenne</td>
            <td>Moyen</td>
            <td>9</td>
            <td>Documentation, formation croisée, succession</td>
        </tr>
        <tr>
            <td>Évolution taux de change EUR/USD</td>
            <td>Élevée</td>
            <td>Moyen</td>
            <td>9</td>
            <td>Couverture systématique, netting naturel</td>
        </tr>
    </table>
    
    <h2>Plans de contingence</h2>
    
    <h3>Scénario de crise majeure</h3>
    
    <div class="alert-box">
        <h4>🚨 Déclencheur : Volatilité cacao > 50% en 48h</h4>
        <p><strong>Plan d'action immédiat :</strong></p>
        <ol>
            <li>Activation cellule de crise (< 2h)</li>
            <li>Revue positions et margin calls (< 4h)</li>
            <li>Activation ligne de crédit backup (< 8h)</li>
            <li>Communication stakeholders (< 12h)</li>
            <li>Réduction positions spéculatives (-80%)</li>
        </ol>
    </div>
    
    <h3>Risques spécifiques Paris</h3>
    
    <table>
        <tr>
            <th>Risque</th>
            <th>Impact</th>
            <th>Mitigation</th>
        </tr>
        <tr>
            <td>Charges sociales élevées</td>
            <td>Coût +25% vs autres hubs</td>
            <td>Négociation statuts cadres, optimisation fiscale</td>
        </tr>
        <tr>
            <td>Réglementation française complexe</td>
            <td>Délais setup +2-3 mois</td>
            <td>Conseil juridique spécialisé, démarrage anticipé</td>
        </tr>
        <tr>
            <td>Perception néo-coloniale</td>
            <td>Risque réputation CI</td>
            <td>Communication transparente, partenariats locaux</td>
        </tr>
        <tr>
            <td>Grèves secteur financier</td>
            <td>Interruption temporaire</td>
            <td>Procédures backup, télétravail</td>
        </tr>
    </table>
    
    <h2>Indicateurs d'alerte précoce</h2>
    
    <div class="highlight-box">
        <h4>KPIs de surveillance</h4>
        <ul>
            <li><strong>Financiers</strong> : Margin calls > 30% positions, P&L journalier > -2%, ratio D/E > 8x</li>
            <li><strong>Opérationnels</strong> : Défaillances système > 2/mois, délais règlement > T+2</li>
            <li><strong>Réglementaires</strong> : Alertes compliance, évolutions EUDR, notifications régulateurs</li>
            <li><strong>Stratégiques</strong> : Concentration contrepartie > 25%, évolution spread CI/Londres</li>
        </ul>
    </div>
    
    <h2>Couvertures d'assurance</h2>
    
    <table>
        <tr>
            <th>Type de couverture</th>
            <th>Montant</th>
            <th>Prime annuelle</th>
            <th>Justification</th>
        </tr>
        <tr>
            <td>Responsabilité civile professionnelle</td>
            <td>10M€</td>
            <td>25K€</td>
            <td>Erreurs trading, défaut conseil</td>
        </tr>
        <tr>
            <td>Cyber-risque</td>
            <td>5M€</td>
            <td>35K€</td>
            <td>Interruption activité, vol données</td>
        </tr>
        <tr>
            <td>Risque politique Côte d'Ivoire</td>
            <td>15M€</td>
            <td>45K€</td>
            <td>Expropriation, inconvertibilité</td>
        </tr>
        <tr>
            <td>Homme-clé (dirigeants)</td>
            <td>2M€</td>
            <td>15K€</td>
            <td>Continuité expertise</td>
        </tr>
        <tr style="background-color: #dcfce7;">
            <td><strong>Total couvertures</strong></td>
            <td><strong>32M€</strong></td>
            <td><strong>120K€</strong></td>
            <td>2.3% des coûts SG&A Paris</td>
        </tr>
    </table>

    <div class="page-break"></div>
    `;
  }

  private generateNextStepsSection(): string {
    return `
    <!-- 11. NEXT STEPS -->
    <h1><span class="numero">11.</span> Next Steps - Planning d'implémentation</h1>
    
    <h2>Phase 1 : Structuration juridique et financière (Mois 1-3)</h2>
    
    <table>
        <tr>
            <th>Activité</th>
            <th>Délai</th>
            <th>Responsable</th>
            <th>Budget</th>
        </tr>
        <tr>
            <td><strong>Création entité Paris</strong></td>
            <td>M1</td>
            <td>Conseil juridique</td>
            <td>25K€</td>
        </tr>
        <tr>
            <td>Négociation ligne de crédit</td>
            <td>M1-M2</td>
            <td>CFO</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Dossier financement AFD/Proparco</td>
            <td>M2-M3</td>
            <td>CEO + consultant</td>
            <td>50K€</td>
        </tr>
        <tr>
            <td>Licences CCC Côte d'Ivoire</td>
            <td>M2-M3</td>
            <td>Équipe locale CI</td>
            <td>15K€</td>
        </tr>
        <tr>
            <td>Assurances et garanties</td>
            <td>M3</td>
            <td>Risk Manager</td>
            <td>120K€/an</td>
        </tr>
    </table>
    
    <h2>Phase 2 : Setup opérationnel (Mois 3-6)</h2>
    
    <table>
        <tr>
            <th>Activité</th>
            <th>Délai</th>
            <th>Responsable</th>
            <th>Budget</th>
        </tr>
        <tr>
            <td><strong>Recrutement équipe Paris</strong></td>
            <td>M3-M5</td>
            <td>Head Hunter</td>
            <td>80K€</td>
        </tr>
        <tr>
            <td>Location et aménagement bureaux</td>
            <td>M4-M5</td>
            <td>Facility Manager</td>
            <td>200K€</td>
        </tr>
        <tr>
            <td>Systèmes IT et trading</td>
            <td>M4-M6</td>
            <td>CTO</td>
            <td>300K€</td>
        </tr>
        <tr>
            <td>Ouverture comptes brokers</td>
            <td>M5</td>
            <td>Head of Trading</td>
            <td>500K€ dépôt</td>
        </tr>
        <tr>
            <td>Formation équipe et procédures</td>
            <td>M5-M6</td>
            <td>Consultant spécialisé</td>
            <td>40K€</td>
        </tr>
    </table>
    
    <h2>Phase 3 : Lancement commercial (Mois 6-9)</h2>
    
    <table>
        <tr>
            <th>Activité</th>
            <th>Délai</th>
            <th>Responsable</th>
            <th>Objectif</th>
        </tr>
        <tr>
            <td><strong>1ers contrats forward CCC</strong></td>
            <td>M6-M7</td>
            <td>Head of Trading</td>
            <td>1,000 tonnes</td>
        </tr>
        <tr>
            <td>Premiers hedges ICE Futures</td>
            <td>M7</td>
            <td>Traders</td>
            <td>500 tonnes</td>
        </tr>
        <tr>
            <td>Partenariats commerciaux UE</td>
            <td>M7-M9</td>
            <td>Business Development</td>
            <td>5 clients</td>
        </tr>
        <tr>
            <td>Programme formation jeunes CI</td>
            <td>M8</td>
            <td>HR + Impact Manager</td>
            <td>10 stagiaires</td>
        </tr>
        <tr>
            <td>Communication impact social</td>
            <td>M8-M9</td>
            <td>Marketing</td>
            <td>Rapport An1</td>
        </tr>
    </table>
    
    <h2>Budget total setup</h2>
    
    <div class="key-metrics">
        <div class="metric-box">
            <div class="metric-value">1.33M€</div>
            <div class="metric-label">Coûts de setup</div>
        </div>
        <div class="metric-box">
            <div class="metric-value">1.89M€</div>
            <div class="metric-label">Capital initial</div>
        </div>
        <div class="metric-box">
            <div class="metric-value">12M€</div>
            <div class="metric-label">Lignes de crédit</div>
        </div>
        <div class="metric-box">
            <div class="metric-value">15.22M€</div>
            <div class="metric-label">Total financement</div>
        </div>
    </div>
    
    <h2>Conditions de succès</h2>
    
    <div class="success-box">
        <h4>KPIs de réussite An 1</h4>
        <ul>
            <li><strong>Volume</strong> : 6,490 tonnes tradées</li>
            <li><strong>Rentabilité</strong> : EBITDA positif (+0.52M€)</li>
            <li><strong>Impact social</strong> : 20 jeunes CI formés</li>
            <li><strong>Compliance</strong> : 0 incident réglementaire</li>
            <li><strong>Clients</strong> : 5 contreparties actives</li>
        </ul>
    </div>
    
    <h2>Risques planning</h2>
    
    <div class="alert-box">
        <h4>⚠️ Facteurs de retard potentiels</h4>
        <ul>
            <li><strong>Licences CCC</strong> : Bureaucratie ivoirienne (+1-2 mois)</li>
            <li><strong>Financement DFI</strong> : Due diligence approfondie (+2-3 mois)</li>
            <li><strong>Recrutement traders</strong> : Marché tendu Paris (+1 mois)</li>
            <li><strong>Systèmes IT</strong> : Intégration complexe (+1 mois)</li>
        </ul>
    </div>

    <div class="page-break"></div>
    `;
  }

  private generateRecommendationsSection(): string {
    return `
    <!-- 12. RECOMMANDATIONS -->
    <h1><span class="numero">12.</span> Recommandations Finales</h1>
    
    <h2>Décision recommandée</h2>
    
    <div class="recommendation-box" style="text-align: center; padding: 40px;">
        <h2 style="margin-top: 0; color: #16a34a;">✓ PARIS - CHOIX OPTIMAL</h2>
        <p style="font-size: 18pt; font-weight: bold;">Établir le bureau de trading international à Paris avec un capital initial de 1.89M€</p>
        <p style="font-size: 14pt;">Score global : <strong>7.87/10</strong> | EBITDA An1 : <strong>+0.52M€</strong> | ROI 3 ans : <strong>171.5%</strong></p>
    </div>
    
    <h2>Synthèse des arguments décisifs</h2>
    
    <table>
        <tr>
            <th>Critère</th>
            <th>Score Paris</th>
            <th>Avantage concurrentiel</th>
        </tr>
        <tr style="background-color: #dcfce7;">
            <td><strong>Réglementation</strong></td>
            <td>10/10</td>
            <td>Convention fiscale CI parfaite, conformité EUDR</td>
        </tr>
        <tr style="background-color: #dcfce7;">
            <td><strong>Impact Social</strong></td>
            <td>8.50/10</td>
            <td>2ème meilleur score, diaspora 150K, liens historiques</td>
        </tr>
        <tr style="background-color: #dcfce7;">
            <td><strong>Financement DFI</strong></td>
            <td>10/10</td>
            <td>Accès privilégié AFD/Proparco, mission CI alignée</td>
        </tr>
        <tr style="background-color: #fef3c7;">
            <td><strong>ROI</strong></td>
            <td>5.46/10</td>
            <td>EBITDA+ dès An1, seul hub européen rentable immédiatement</td>
        </tr>
        <tr style="background-color: #fef3c7;">
            <td><strong>Cash Management</strong></td>
            <td>6.66/10</td>
            <td>Coûts SG&A compétitifs (4ème position), accès marchés €</td>
        </tr>
    </table>
    
    <h2>Plan d'action immédiat (30 premiers jours)</h2>
    
    <div class="highlight-box">
        <h4>Actions prioritaires</h4>
        <ol>
            <li><strong>Validation Conseil d'Administration</strong> Neskao (J+7)</li>
            <li><strong>Sélection conseil juridique</strong> spécialisé trading commodités Paris (J+10)</li>
            <li><strong>Première approche AFD/Proparco</strong> via réseau existant (J+14)</li>
            <li><strong>Prospection banques françaises</strong> pour lignes de crédit (J+21)</li>
            <li><strong>Lancement recherche Head of Trading</strong> via chasseurs de têtes (J+30)</li>
        </ol>
    </div>
    
    <h2>Alternatives de repli</h2>
    
    <table>
        <tr>
            <th>Si Paris bloqué par...</th>
            <th>Alternative recommandée</th>
            <th>Justification</th>
        </tr>
        <tr>
            <td>Problème financement DFI</td>
            <td><strong>Genève</strong></td>
            <td>Hub DFI mondial, score proche (7.81 vs 7.87)</td>
        </tr>
        <tr>
            <td>Coûts SG&A trop élevés</td>
            <td><strong>Amsterdam</strong></td>
            <td>SG&A similaires, bon impact social (7.75)</td>
        </tr>
        <tr>
            <td>Contraintes réglementaires</td>
            <td><strong>Singapour</strong></td>
            <td>Meilleur ROI (200%), hub asiatique</td>
        </tr>
    </table>
    
    <h2>Vision 3 ans</h2>
    
    <div class="success-box">
        <h4>Objectifs stratégiques 2025-2028</h4>
        <ul>
            <li><strong>Volume</strong> : Croissance 6,490 → 22,245 tonnes (+243%)</li>
            <li><strong>CA</strong> : Développement 54M€ → 228M€ (+320%)</li>
            <li><strong>Rentabilité</strong> : EBITDA 0.52M€ → 9.93M€ (+1,813%)</li>
            <li><strong>Impact social</strong> : 100+ jeunes ivoiriens formés</li>
            <li><strong>Expansion</strong> : Hub régional Europe de l'Ouest</li>
            <li><strong>Innovation</strong> : Leader blockchain traçabilité cacao</li>
        </ul>
    </div>
    
    <h2>Message aux stakeholders</h2>
    
    <div class="recommendation-box">
        <h3>Pour les actionnaires Neskao</h3>
        <p>Le bureau de trading Paris représente l'évolution naturelle de Neskao vers les marchés internationaux. Avec un ROI de 171.5% et une rentabilité dès l'An 1, c'est un investissement sûr qui amplifie notre impact social tout en générant de la croissance rentable.</p>
        
        <h3>Pour les partenaires ivoiriens</h3>
        <p>Paris nous permet de maintenir et renforcer nos liens avec la Côte d'Ivoire grâce à l'écosystème AFD/Proparco et à la diaspora. C'est le choix de l'impact social maximal avec 100+ jeunes formés et 15% d'amélioration des revenus producteurs.</p>
        
        <h3>Pour les équipes</h3>
        <p>Paris offre le meilleur environnement de travail avec accès aux talents, formation continue et reconnaissance internationale. C'est l'opportunité de construire le leader africain du trading cacao depuis l'Europe.</p>
    </div>

    <div style="text-align: center; margin-top: 50px; padding: 30px; border: 2px solid #475569;">
        <h2 style="color: #475569; margin-bottom: 20px;">Validation requise</h2>
        <p style="font-size: 14pt;"><strong>Ce rapport nécessite l'approbation du Conseil d'Administration</strong></p>
        <p style="font-size: 14pt;"><strong>pour engager la Phase 1 - Setup Paris</strong></p>
        <p style="margin-top: 30px; font-size: 10pt; color: #64748b;">
            Rapport généré le ${this.currentDate}<br>
            Classification: CONFIDENTIEL - Usage interne uniquement
        </p>
    </div>
    `;
  }
}

export default HtmlReportGenerator;