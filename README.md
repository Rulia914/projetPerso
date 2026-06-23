# L'Alchimie litteraire

Application front Vite / Tailwind / JavaScript pour aider a choisir le prochain livre d'une pile a lire.

## Etat actuel

- Interface responsive orientee bibliotheque personnelle.
- Liste de livres statique dans `src/main.js`.
- Recherche par titre, auteur, genre ou humeur.
- Filtres par genre et temps disponible.
- Pioche aleatoire dans les resultats filtres.
- Marquage lu / a lire avec sauvegarde dans `localStorage`.
- Progression de lecture affichee en haut de page.

## Scripts

```bash
npm install
npm run dev
npm run build
```

Sur Windows PowerShell, utiliser `npm.cmd` si la politique d'execution bloque `npm`.

## Prochaines etapes proposees

1. Remplacer les donnees fictives par la vraie pile a lire.
2. Ajouter un formulaire pour creer, modifier et supprimer un livre.
3. Ajouter des criteres plus fins: format, priorite, humeur, langue, serie.
4. Isoler les donnees et composants dans plusieurs modules.
5. Prevoir une exportation/importation JSON pour sauvegarder la bibliotheque.
