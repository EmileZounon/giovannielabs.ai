# Construire votre site web avec Claude

**Le guide officiel du KodjoLive · 19 avril 2026 · par Emile Zounon.**

Version en ligne : emilezounon.com/KodjoLive

Vous avez assisté à la démo. Voici le guide complet pour le refaire vous-même, chez vous, à votre rythme. Deux chemins, au choix selon votre niveau. Le résultat : un vrai site web en ligne que vous pouvez partager aujourd'hui.

---

## Choisissez votre chemin

| | Option 1 : Claude (app mobile / web) | Option 2 : Claude pour ordinateur (mode Code) |
|---|---|---|
| Pour qui | Tous, même débutants | Ceux qui veulent aller plus loin |
| Plateforme | claude.ai ou app iOS / Android | App Claude pour Mac ou Windows |
| Pré-requis | Un compte gratuit | Un compte Claude payant (20 $ / mois et plus) |
| Temps | 15 à 30 minutes | 20 à 40 minutes |
| Résultat | Un fichier HTML | Un projet complet pret à déployer |

Les deux construisent le même type de site. La difference, c'est l'outil.

---

# OPTION 1 : Construire avec Claude (l'application)

## Étape 1. Installer et ouvrir Claude

**Sur téléphone :** cherchez Claude (icône orange, éditeur Anthropic) sur l'App Store ou Google Play. Telechargez et créez un compte gratuit.

**Sur ordinateur :** allez sur claude.ai et connectez-vous.

## Étape 2. Copier le prompt maitre

Ouvrez une nouvelle conversation. Vous avez deux options : commencer par le **modele vierge** à remplir avec vos propres détails, ou copier l'**exemple LinguaLibre** complet pour voir ce qu'Emile à construit sur scene.

### 🧩 Modele à remplir (votre projet)

Remplacez les crochets `[]` par les détails de votre projet.

```
Crée un site web complet en UN SEUL fichier HTML (HTML + CSS +
JavaScript inline, rien d'externe sauf Google Fonts). Affiche-le
comme un artefact pour que je puisse le voir en direct.

Marque: "[NOM DE VOTRE MARQUE]" — [UNE PHRASE POUR DECRIRE VOTRE PRODUIT OU SERVICE].
Fondateur / fondatrice: [VOTRE NOM].
Promesse: [LA PROMESSE PRINCIPALE, EN UNE LIGNE].
Public cible: [QUI S'EN SERT].

Toute la copie en [LANGUE].

Sections dans cet ordre precis:
1. Barre de navigation sticky: logo à gauche, liens ([LISTE DE VOS LIENS]), bouton CTA "[TEXTE DU BOUTON]" à droite. Menu hamburger sous 768px.
2. Hero plein ecran: grand titre "[VOTRE TITRE PRINCIPAL]", sous-titre de 2 lignes, vignette vidéo ou image placeholder, bouton CTA principal.
3. Bandeau de preuves sociales: [NOMBRE] mentions ou logos fictifs.
4. [VOTRE SECTION METHODE / PRODUIT] : [DECRIRE LA GRILLE OU LE FORMAT].
5. Temoignages: grille de [NOMBRE] cartes avec portrait placeholder, prenom, citation.
6. "Qui est [VOTRE NOM]": portrait placeholder à gauche, 3 paragraphes à droite, une citation mise en avant.
7. Tarifs: [NOMBRE] offres avec prix, points cles, offre du milieu en avant.
8. FAQ avec accordeon: [NOMBRE] questions, clic pour deplier.
9. CTA final: titre fort, bouton.
10. Pied de page: liens, réseaux sociaux, copyright.

Direction artistique:
- Palette: [COULEUR PRINCIPALE] en couleur principale, [COULEUR ACCENT] en accent, fond [COULEUR FOND], texte [COULEUR TEXTE].
- Typographie: [NOM DE POLICE] via Google Fonts, gras pour les titres.
- Style moderne, editorial, premium. Beaucoup d'espace blanc. Coins arrondis. Ombres subtiles.
- Entièrement responsive jusqu'à 360px de large.
- Scroll fluide sur les liens d'ancre. Accordeon FAQ fonctionnel. Effets hover sur boutons et cartes.

Images: uniquement des SVG ou degrades CSS comme placeholders, jamais d'URL externe.

Interdictions:
- Pas de tirets cadratins ou demi-cadratins. Utilise virgules, points ou deux-points.
- Rien d'externe sauf Google Fonts.

Avant de coder, propose-moi d'abord le plan détaillé complet de ce que tu vas construire. Ne commence pas à ecrire le code avant ma validation.
```

### 📘 Exemple complet rempli : LinguaLibre

Le prompt exact qu'Emile utilise sur scene. **Voir le résultat en direct** : [emilezounon.com/lingualibre-demo/](https://emilezounon.com/lingualibre-demo/) Parfait comme reference pour voir à quoi ressemble un prompt entièrement rempli.

```
Crée un site web complet en UN SEUL fichier HTML (HTML + CSS +
JavaScript inline, rien d'externe sauf Google Fonts). Affiche-le
comme un artefact pour que je puisse le voir en direct.

Marque: "LinguaLibre" — un programme de coaching en anglais en ligne
pour les professionnels francophones d'Afrique et d'Europe. Fondatrice:
Aminata Diallo. Promesse: parler anglais couramment en 90 jours.

Toute la copie en français.

Sections dans cet ordre precis:
1. Barre de navigation sticky en haut: logo à gauche, liens (Programme,
   Temoignages, Coach, Tarifs, Contact), bouton CTA "Commencer" a
   droite. Menu hamburger sous 768px.
2. Hero plein ecran: grand titre "Parlez anglais couramment en 90
   jours", sous-titre de 2 lignes, vignette vidéo placeholder a
   droite avec un bouton play, bouton CTA principal.
3. Bandeau de preuves sociales: 5 mentions de presse fictives en
   texte (ex: "Vu dans Jeune Afrique", "Cite par RFI").
4. Grille 3 colonnes presentant la methode: immersion, coaching prive,
   communaute. Chaque colonne: icône SVG, titre, 2 phrases.
5. Temoignages: grille responsive de 6 cartes style vidéo, chaque
   carte avec un portrait placeholder (degrade colore), prenom,
   emoji drapeau pays, citation courte.
6. Section "Qui est Aminata": grand portrait placeholder à gauche,
   son histoire à droite en 3 paragraphes courts et une citation mise
   en valeur.
7. Tarifs: 3 offres (Essentiel, Pro, Immersion Totale) avec prix en
   euros, 4 à 6 points chacune, offre du milieu mise en avant avec
   badge "Le plus populaire".
8. FAQ avec accordeon: 6 questions, clic pour deplier.
9. CTA final: titre fort, bouton.
10. Pied de page: liens de navigation, icônes réseaux sociaux en SVG,
    copyright.

Direction artistique:
- Palette: bleu marine profond (#0B2545) en couleur principale, or
  chaud (#F4B942) en accent, fond blanc, texte gris fonce.
- Typographie: Poppins via Google Fonts, gras pour les titres.
- Style moderne, editorial, premium. Beaucoup d'espace blanc. Coins
  arrondis sur les cartes et boutons. Ombres subtiles.
- Entièrement responsive jusqu'à 360px de large.
- Scroll fluide sur les liens d'ancre. Accordeon FAQ fonctionnel.
  Effets hover sur tous les boutons et cartes.

Images: uniquement des SVG ou degrades CSS comme placeholders, jamais
d'URL externe. Rends-les elegants, pas brises.

Interdictions:
- Pas de tirets cadratins ou demi-cadratins. Utilise virgules,
  points ou deux-points.
- Rien d'externe sauf Google Fonts Poppins.

Tout doit tenir dans UN fichier artefact HTML unique et fonctionner
tout de suite.
```

## Étape 3. Valider ou corriger le plan

Avant de laisser Claude coder, vérifiez :

- [ ] Les sections sont dans le bon ordre pour convaincre
- [ ] Le message principal est clair
- [ ] La palette et la typographie correspondent à ma marque

**Si oui, dites :** *"Parfait. Construis maintenant le site complet en un seul fichier HTML avec tout inline (CSS et JavaScript). Affiche-le comme artefact."*

**Si non :** *"Retire la section FAQ. Ajoute des temoignages avant les tarifs. Change la palette en bleu et blanc."*

## Étape 4. Dire oui à Claude

Si le plan vous convient tel quel, pas besoin de recopier un long prompt. Une courte phrase suffit, Claude à déjà tout le contexte :

```
Parfait, le plan me convient. Construis le site maintenant et affiche-le comme artefact.
```

### Option avancée (facultative)

Si vous voulez ajouter une exigence ou renforcer les règles, utilisez ce prompt plus détaillé à la place :

```
Parfait, le plan me convient. Construis maintenant le site complet
en UN SEUL fichier HTML avec tout inline (HTML + CSS + JavaScript).
Rien d'externe sauf Google Fonts.

Respecte integralement le plan que tu viens de proposer :
- Toutes les sections dans l'ordre
- La palette et la typographie décidées
- Les elements interactifs prevus (menu hamburger, scroll fluide,
  accordeon FAQ, effets hover)
- Entièrement responsive jusqu'à 360px de large
- Boutons minimum 44px de haut pour le mobile
- Placeholders SVG ou degrades CSS pour toutes les images,
  jamais d'URL externe

Affiche le résultat comme un artefact.

Interdictions :
- Pas de tirets cadratins ou demi-cadratins. Utilise virgules,
  points ou deux-points.
- Pas de Lorem ipsum. Ecris de vrais textes pour chaque section.

À la fin, fais un court bilan en 3 points :
1. Ce que tu as construit
2. Les choix que tu as faits (couleurs, typo, structure)
3. Ce que je peux te demander de modifier en premier
```

## Étape 5. Laisser Claude construire

Sur ordinateur : le site apparait dans le panneau de droite. Sur téléphone : tapez sur la carte de l'artefact pour l'apercu plein ecran. Attendez la fin de la generation.

## Étape 6. Jeter un oeil rapide à l'artefact

Avec Claude, vous voyez le site se construire directement dans l'artefact. Pas besoin de checklist technique : regardez le résultat et posez-vous trois questions simples.

**Vérification express**
- [ ] Le résultat ressemble à ce que j'avais imagine
- [ ] Les textes sont corrects, les prix sont les bons
- [ ] Sur téléphone, tout reste lisible et les boutons sont cliquables

Si un détail vous chiffonne, passez directement à l'étape suivante pour demander une correction.

> La vraie checklist détaillée (contenu, design, mobile) se trouve dans l'Option 2, car c'est la qu'on manipule un vrai projet multi-fichiers.

## Étape 7. Iterer, un changement à la fois

```
Sur mobile, le titre deborde de l'ecran. Corrige uniquement ce point.
Le bouton "Commencer" est trop petit sur téléphone. Rends-le plus grand.
Ajoute une section temoignages entre la methode et les tarifs.
Change la palette pour du vert foret et du beige.
```

## Étape 8. Sauvegarder le code

Sur l'artefact, cliquez sur **Copy** ou **Download**. Collez dans un fichier nomme `index.html`. Double-cliquez : le site s'ouvre dans votre navigateur sans internet.

**Pret à le mettre en ligne ? Passez à la section "Publier votre site" en bas.**

---

# OPTION 2 : Construire avec l'application Claude pour ordinateur (mode Code)

L'application Claude pour Mac et Windows à un mode **Code**. C'est comme un chat classique, mais Claude crée et modifie des fichiers directement sur votre ordinateur, dans un dossier que vous choisissez. Le **Plan Mode** est intégré, activable en un clic. Aucun terminal, aucune ligne de commande.

![L'application Claude en mode Code avec Plan mode](img/claude-app-code-mode.png)

*L'application Claude pour ordinateur en mode Code. Notez le bouton "Plan mode" en bas à gauche, et le selecteur de dossier (Local / emilegio) au-dessus du champ de saisie.*

## Étape 1. Installer l'application Claude

1. **Télécharger l'app** : allez sur claude.ai/download. Choisissez votre systeme (Mac ou Windows). Installez comme n'importe quelle application.
2. **Se connecter** : ouvrez l'application, connectez-vous avec votre compte Claude.
3. **Activer le mode Code** : en haut à gauche, cliquez sur l'onglet **Code** (icône </>).

## Étape 2. Créer un dossier pour votre projet

1. Sur votre ordinateur, créez un dossier nomme `monsite` (Finder sur Mac, Explorateur sur Windows). Bureau ou Documents, au choix.
2. Dans l'app Claude, au-dessus de la zone de saisie, cliquez sur **Local** puis l'icône dossier. Choisissez votre dossier. Claude travaillera desormais dedans.

## Étape 3. Activer le PLAN MODE

Plan Mode force Claude à reflechir et proposer un plan AVANT de toucher le moindre fichier.

1. **En bas à gauche**, cliquez sur **Plan mode**. Le libelle passe en actif.
2. Dans la barre laterale, cliquez sur **New session** pour commencer proprement.

## Étape 4. Decrire votre projet

Collez un prompt dans le champ *"Describe à task or ask à question"*. Deux options : le **modele vierge** à remplir, ou l'**exemple LinguaLibre** complet.

### 🧩 Modele à remplir (votre projet)

Remplacez les crochets `[]` par les détails de votre projet.

```
Crée un site web complet en UN SEUL fichier HTML (HTML + CSS +
JavaScript inline, rien d'externe sauf Google Fonts).

Marque: "[NOM DE VOTRE MARQUE]" — [UNE PHRASE POUR DECRIRE VOTRE PRODUIT].
Fondateur / fondatrice: [VOTRE NOM].
Promesse: [LA PROMESSE PRINCIPALE].
Public cible: [QUI S'EN SERT].

Toute la copie en [LANGUE].

Sections dans cet ordre precis:
1. Navigation sticky: logo, liens, CTA.
2. Hero: titre principal, sous-titre, visuel placeholder, CTA.
3. Preuves sociales: [NOMBRE] mentions fictives.
4. [VOTRE SECTION PRINCIPALE].
5. Temoignages: [NOMBRE] cartes avec portrait placeholder, prenom, citation.
6. "Qui est [VOTRE NOM]": portrait + 3 paragraphes.
7. Tarifs: [NOMBRE] offres, offre du milieu en avant.
8. FAQ accordeon: [NOMBRE] questions.
9. CTA final.
10. Pied de page.

Direction artistique:
- Palette: [COULEUR PRINCIPALE] + [COULEUR ACCENT] + fond [COULEUR FOND].
- Typographie: [NOM DE POLICE] via Google Fonts.
- Moderne, editorial, premium. Responsive jusqu'à 360px.
- Scroll fluide, accordeon fonctionnel, hover sur boutons et cartes.

Images: SVG ou degrades CSS uniquement.

Interdictions:
- Pas de tirets cadratins ou demi-cadratins.
- Rien d'externe sauf Google Fonts.

Avant de coder, propose-moi d'abord le plan détaillé complet. Ne commence pas à ecrire le code avant ma validation.
```

### 📘 Exemple complet rempli : LinguaLibre

Le prompt exact qu'Emile utilise sur scene. **Voir le résultat en direct** : [emilezounon.com/lingualibre-demo/](https://emilezounon.com/lingualibre-demo/)

```
Crée un site web complet en UN SEUL fichier HTML (HTML + CSS +
JavaScript inline, rien d'externe sauf Google Fonts). Affiche-le
comme un artefact pour que je puisse le voir en direct.

Marque: "LinguaLibre" — un programme de coaching en anglais en ligne
pour les professionnels francophones d'Afrique et d'Europe. Fondatrice:
Aminata Diallo. Promesse: parler anglais couramment en 90 jours.

Toute la copie en français.

Sections dans cet ordre precis:
1. Barre de navigation sticky en haut: logo à gauche, liens (Programme,
   Temoignages, Coach, Tarifs, Contact), bouton CTA "Commencer" a
   droite. Menu hamburger sous 768px.
2. Hero plein ecran: grand titre "Parlez anglais couramment en 90
   jours", sous-titre de 2 lignes, vignette vidéo placeholder a
   droite avec un bouton play, bouton CTA principal.
3. Bandeau de preuves sociales: 5 mentions de presse fictives en
   texte (ex: "Vu dans Jeune Afrique", "Cite par RFI").
4. Grille 3 colonnes presentant la methode: immersion, coaching prive,
   communaute. Chaque colonne: icône SVG, titre, 2 phrases.
5. Temoignages: grille responsive de 6 cartes style vidéo, chaque
   carte avec un portrait placeholder (degrade colore), prenom,
   emoji drapeau pays, citation courte.
6. Section "Qui est Aminata": grand portrait placeholder à gauche,
   son histoire à droite en 3 paragraphes courts et une citation mise
   en valeur.
7. Tarifs: 3 offres (Essentiel, Pro, Immersion Totale) avec prix en
   euros, 4 à 6 points chacune, offre du milieu mise en avant avec
   badge "Le plus populaire".
8. FAQ avec accordeon: 6 questions, clic pour deplier.
9. CTA final: titre fort, bouton.
10. Pied de page: liens de navigation, icônes réseaux sociaux en SVG,
    copyright.

Direction artistique:
- Palette: bleu marine profond (#0B2545) en couleur principale, or
  chaud (#F4B942) en accent, fond blanc, texte gris fonce.
- Typographie: Poppins via Google Fonts, gras pour les titres.
- Style moderne, editorial, premium. Beaucoup d'espace blanc. Coins
  arrondis sur les cartes et boutons. Ombres subtiles.
- Entièrement responsive jusqu'à 360px de large.
- Scroll fluide sur les liens d'ancre. Accordeon FAQ fonctionnel.
  Effets hover sur tous les boutons et cartes.

Images: uniquement des SVG ou degrades CSS comme placeholders, jamais
d'URL externe. Rends-les elegants, pas brises.

Interdictions:
- Pas de tirets cadratins ou demi-cadratins. Utilise virgules,
  points ou deux-points.
- Rien d'externe sauf Google Fonts Poppins.

Tout doit tenir dans UN fichier artefact HTML unique et fonctionner
tout de suite.
```

> **Astuce :** en mode Code, Claude va tout de même créer le fichier `index.html` dans votre dossier local. Le mot "artefact" oriente Claude vers un livrable unique et autonome, facile à déployer ensuite sur GitHub Pages.

## Étape 5. Valider le plan

Claude propose un plan. Lisez-le. Demandez des ajustements si necessaire. Quand c'est bon, **desactivez Plan mode** (même bouton en bas à gauche), puis dites :

*"Parfait, le plan me va. Construis le site maintenant dans mon dossier monsite."*

## Étape 6. Laisser Claude construire

Claude crée `index.html`, `styles.css`, `script.js` directement dans votre dossier. Vous voyez les fichiers apparaitre en direct dans Finder / Explorateur.

## Étape 7. Valider le site (la vraie checklist)

Double-cliquez sur `index.html` : le site s'ouvre dans votre navigateur. Contrairement à l'artefact de l'Option 1, ici vous avez un vrai projet multi-fichiers. Passez en revue chaque categorie.

**Contenu**
- [ ] Titre principal clair et accrocheur
- [ ] Chaque section à un but evident
- [ ] Aucun texte "Lorem ipsum" oublie
- [ ] Prix et informations exactes

**Design**
- [ ] Couleurs correspondent à ma marque
- [ ] Texte lisible, bon contraste
- [ ] Images et icônes s'affichent
- [ ] Espacement aere

**Mobile (testez vraiment sur votre téléphone)**
- [ ] Tout est lisible sur un ecran de téléphone
- [ ] Boutons assez grands pour le doigt (44px minimum)
- [ ] Aucune image ne deborde
- [ ] Menu hamburger fonctionne

Pour une validation automatique plus poussée, demandez à Claude :

```
Fais une auto-validation du site : verifie que le HTML est valide,
que tous les liens fonctionnent, que le CSS n'à pas d'erreurs,
que le site est bien responsive.
Liste chaque problème trouve avec la ligne exacte à corriger.
```

## Étape 8. Iterer avec Plan Mode pour les gros changements

- **Petit ajustement** : demandez directement ("change la couleur du bouton en or").
- **Changement structurel** : reactivez Plan mode, faites proposer un plan, validez, desactivez, laissez executer.

## Étape 9. Pret à publier ?

Passez à la section "Publier votre site" en bas. L'app Claude peut vous guider :

```
Guide-moi étape par étape, avec les boutons exacts à cliquer, pour :
1. Créer un compte GitHub si je n'en ai pas
2. Créer un nouveau depot public nomme mon-site
3. Uploader mon fichier index.html
4. Activer GitHub Pages dans les parametres
5. Trouver et copier mon URL publique finale

Je suis débutant total, je n'ai jamais utilise GitHub. Sois très precis.
```

---

# PUBLIER VOTRE SITE SUR GITHUB PAGES

Gratuit, pour toujours, sans carte bancaire, sans limite. Tout se passe dans le navigateur.

## Étape 1. Créer un compte GitHub (si vous n'en avez pas)

Allez sur github.com/signup. Créez un compte avec votre email. Choisissez un nom d'utilisateur court et professionnel, il apparaitra dans votre URL publique.

## Étape 2. Créer un nouveau depot (repository)

1. Allez sur **github.com/new**.
2. **Nom du depot** : `mon-site` (court, sans espace).
3. Cochez **Public** (obligatoire pour GitHub Pages gratuit).
4. Cochez **Add à README file**.
5. Cliquez **Create repository**.

## Étape 3. Ajouter votre fichier HTML

1. Sur la page du depot, cliquez **Add file** (en haut à droite) → **Upload files**.
2. Glissez-deposez votre fichier. **Il DOIT s'appeler `index.html`** (minuscules, sans accent). Renommez-le avant si necessaire.
3. Descendez en bas de page, cliquez **Commit changes**.

> **Si vous avez déjà uploade un fichier avec un mauvais nom** : cliquez dessus, puis sur l'icône crayon, renommez en `index.html`, validez.

## Étape 4. Activer GitHub Pages

1. Dans votre depot, cliquez sur l'onglet **Settings** (tout en haut à droite, à côté d'Insights).
2. Dans le menu de gauche, cliquez sur **Pages**.
3. Sous *"Build and deployment" → "Source"*, laissez **Deploy from à branch**.
4. Sous *"Branch"*, selectionnez **main** et le dossier **/ (root)**.
5. Cliquez **Save**.

## Étape 5. Trouver votre lien public (le moment magique)

1. **Attendre 60 à 90 secondes.** GitHub construit votre site.
2. **Rafraichir** la page Settings → Pages.
3. Un **encadre vert** apparait en haut avec le message : *"Your site is live at..."* suivi de votre URL.
4. Le lien ressemble a : `https://VOTRE-NOM.github.io/mon-site/`
5. Cliquez sur le lien pour tester, puis sur l'icône **copier** pour le partager partout.

> **Astuce visuelle :** vous pouvez aussi voir votre lien sur la page d'accueil du depot. Regardez à droite, sous *"About"*, GitHub affiche un lien globe 🌐 vers votre site une fois Pages active.

## Étape 6. Modifier votre site plus tard

Pas besoin de refaire toutes les étapes. Pour chaque mise à jour :

1. Dans votre depot, cliquez sur `index.html`.
2. Cliquez sur l'icône **crayon** pour editer, OU supprimez et uploadez une nouvelle version.
3. Validez (Commit changes). GitHub redeploie automatiquement en 30 secondes. Rafraichissez votre URL publique.

## Bonus pro : domaine personnalise

Connectez un nom de domaine comme `monsite.com` gratuitement via *Settings → Pages → Custom domain*. Votre registraire (OVH, GoDaddy, Namecheap) vous dira quoi pointer. Demandez à Claude : *"Guide-moi pour connecter mon domaine monsite.com à GitHub Pages."*

---

# LE PROMPT MAITRE À GARDER POUR TOUJOURS

Copiez-le dans vos notes. Changez les crochets. Reutilisez-le pour chaque nouveau projet.

```
Je veux construire un site web d'une page pour [PROJET].
Public : [CIBLE].
Objectif : [ACTION SOUHAITEE].

ETAPE 1 : Propose-moi un plan détaillé (sections, messages, palette, typographie).
Ne code rien avant ma validation.

ETAPE 2 : Après validation, construis le site complet.
- Option Claude (app mobile / web) : UN SEUL fichier HTML, tout inline, Google Fonts autorise, affiche en artefact.
- Option Claude pour ordinateur (mode Code) : structure propre (index.html, styles.css, script.js) dans mon dossier local.

ETAPE 3 : Assure-toi que le site est parfaitement responsive et utilisable sur téléphone
(boutons minimum 44px, texte lisible, pas de debordement).

ETAPE 4 : Fais une auto-validation : liste les points OK et les points à corriger.

Pas de tirets cadratins (— ou –). Utilise virgules, points ou deux-points.
```

---

# LES 3 REGLES D'OR

1. **Planifier avant de coder.** Toujours. Un bon plan evite trois mauvais builds.
2. **Un changement à la fois.** Dire "change tout" donne du chaos. Dire "change la couleur du bouton" donne un résultat precis.
3. **Tester sur téléphone.** La moitie de vos visiteurs seront sur mobile. Si ca ne marche pas sur téléphone, ca ne marche pas.

---

**KodjoLive x Emile Zounon.** Construit en direct. Partage avec amour.

Ressources :
- Guide en ligne : emilezounon.com/KodjoLive
- Claude : claude.ai
- Claude pour ordinateur : claude.ai/download
- GitHub : github.com
