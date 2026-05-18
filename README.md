# corentin-phy.github.io — Site personnel académique

Site construit avec [Quarto](https://quarto.org/), déployé sur GitHub Pages.

---

## 1. Installation de Quarto

### Linux (Ubuntu/Debian)
```bash
# Télécharge le .deb depuis https://quarto.org/docs/get-started/
wget https://github.com/quarto-dev/quarto-cli/releases/download/v1.5.57/quarto-1.5.57-linux-amd64.deb
sudo dpkg -i quarto-1.5.57-linux-amd64.deb
quarto --version   # vérifie l'installation
```

### macOS
```bash
brew install --cask quarto
```

### Vérification
```bash
quarto check
```

---

## 2. Structure du projet

```
corentin-site/
├── _quarto.yml          # Configuration principale
├── index.qmd            # Page d'accueil
├── about.qmd            # À propos
├── research.qmd         # Recherche & Projets
├── cv.qmd               # CV
├── personal.qmd         # Beyond / Personnel
├── contact.qmd          # Contact
├── assets/
│   ├── css/
│   │   ├── custom.scss  # Thème principal (couleurs, typo)
│   │   └── extra.css    # Composants spécifiques aux pages
│   ├── img/
│   │  
│   └── cv-corentin-mary.pdf   # CV PDF
└── docs/                # Généré par `quarto render` (gitignore recommandé sauf pour gh-pages)
```

---

## 3. Développement local

```bash
cd corentin-site
quarto preview          # Ouvre le site en live reload sur http://localhost:4321
```

Quarto surveille les fichiers et recharge automatiquement le navigateur à chaque sauvegarde.

---


### 5d. Workflow futur (à chaque modification)

```bash
quarto render
git add docs/
git commit -m "Update: [ce que tu as changé]"
git push
```


