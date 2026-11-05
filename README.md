# Portfolio — Paul Glatt

Portfolio personnel de Paul Glatt, Développeur Web. Site construit avec React, Vite et Lucide.

## Prérequis

- Node.js (version LTS recommandée)
- npm

## Lancer le projet en local

```bash
npm install
npm run dev
```

Vite affiche l'adresse locale dans le terminal (généralement http://localhost:5173).

## Vérifier la version de production

```bash
npm run build
npm run preview
```

Le dossier `dist/` contient les fichiers statiques générés.

## Déployer le portfolio (première mise en ligne)

Le portfolio utilise React + Vite : il peut être hébergé sur Vercel, Netlify ou un hébergement statique compatible.

### Avec Vercel

1. Créer un compte sur https://vercel.com/.
2. Envoyer le dossier du projet dans un dépôt GitHub (ne pas envoyer `node_modules/`).
3. Dans Vercel, choisir **Add New → Project**, puis importer le dépôt GitHub.
4. Vercel détecte généralement Vite automatiquement. Vérifier :
   - Framework Preset : `Vite`
   - Build Command : `npm run build`
   - Output Directory : `dist`
5. Cliquer sur **Deploy**.
6. Une fois le déploiement terminé, tester l'adresse fournie sur ordinateur et mobile.

À chaque `git push` sur la branche configurée, Vercel pourra reconstruire et publier le site automatiquement.

## À vérifier avant publication

- Vérifier que les deux entreprises autorisent l'utilisation de leur nom, de leur marque et des visuels dans ce portfolio.
- Remplacer les aperçus graphiques illustratifs par des captures réelles si tu disposes des droits nécessaires.
- Vérifier les huit liens de pôles Byfect et leur disponibilité.
- Décider si tu souhaites afficher publiquement ton adresse e-mail et ton numéro de téléphone. Le numéro de téléphone du CV n'est pas repris ici.
- Ajouter un lien vers un CV expurgé de toute information que tu ne souhaites pas rendre publique, si tu le souhaites.

## Contenu

- `src/main.jsx` : contenu, projets, compétences et navigation.
- `src/style.css` : styles et responsive design.
- `index.html` : titre, description et métadonnées de partage.

Le portfolio distingue les compétences déjà présentes dans le CV de l'apprentissage du déploiement, présenté comme un objectif de progression et non comme une compétence acquise.
