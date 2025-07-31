# 🚀 Guide de Déploiement Netlify

## Méthode 1 : Drag & Drop (Recommandé)

### 1. Build local
```bash
npm install
npm run build
```

### 2. Upload du dossier `dist/`
- Allez sur https://netlify.com
- Drag & Drop le dossier **`dist/`** directement sur Netlify
- Votre site sera en ligne instantanément !

## Méthode 2 : Git Deploy

### 1. Pousser sur GitHub/GitLab
```bash
git init
git add .
git commit -m "Deploy Neskao Trade Desk v2"
git push origin main
```

### 2. Configuration Netlify
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: `18.17.0`

## ⚠️ Points importants

### Fichiers critiques pour Netlify :
- ✅ `netlify.toml` - Configuration Netlify
- ✅ `package.json` - Scripts de build optimisés  
- ✅ `vite.config.ts` - Configuration Vite pour prod
- ✅ `.gitignore` - Exclusions propres

### Variables d'environnement (si nécessaire) :
- `NODE_VERSION`: `18.17.0`
- `NPM_VERSION`: `latest`

## 🎯 Résultat attendu

Une fois déployé, votre webapp aura :
- ✅ **URL publique** Netlify (ex: `neskao-trade-desk.netlify.app`)
- ✅ **Export PDF** fonctionnel 
- ✅ **Logos et images** chargés correctement
- ✅ **Performance optimisée** (chunks séparés)
- ✅ **HTTPS automatique**

## 🔧 Troubleshooting

### Si les images ne se chargent pas :
- Vérifiez que les images sont dans `/public/images/`
- Chemins doivent être `/images/logo.png` (pas `./images/`)

### Si le build échoue :
- Utilisez `npm run build` (sans TypeScript check)
- Vérifiez la version Node.js (>=18)

### Si le PDF ne fonctionne pas :
- Vérifiez que les popups sont autorisés
- Testez en local d'abord avec `npm run preview`