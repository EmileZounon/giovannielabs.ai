# Plan de test du bot d'engagement

Objectif : valider chaque piece du workflow avant de le montrer a Kodjo.

Duree totale : environ 45 minutes la premiere fois.

---

## Phase 0 · Preparation (20 min)

Fais ces 6 choses dans l'ordre. Note les tokens et IDs au fur et a mesure dans un fichier texte temporaire, tu en auras besoin a la phase 1.

### 0.1 Creer un bot Telegram

1. Sur Telegram, cherche **@BotFather** et envoie-lui `/newbot`.
2. Nom : `KodjoEngagementBotTest` (ou ce que tu veux).
3. Username : doit finir par `bot`, ex. `kodjo_test_bot`.
4. Copie le **token** qu'il te donne, garde-le precieusement.
5. Envoie `/setprivacy` a BotFather → choisis ton bot → **Disable**.
   - Critique : sans ca, le bot ne lira que les commandes, pas les messages normaux.

### 0.2 Creer un groupe Telegram de test

1. Cree un nouveau groupe Telegram "Test KodjoBot" (toi + un ami ou ton autre compte Telegram).
2. Ajoute ton bot comme **administrateur** du groupe (Parametres > Administrateurs > Ajouter).
3. Envoie un message dans le groupe ("test") pour verifier que le bot est bien membre.

### 0.3 Creer le Google Sheet

1. Cree un nouveau Google Sheet nomme `kodjo-engagement-test`.
2. Cree 3 onglets exactement nommes : `students`, `messages`, `outreach_log`.
3. Ajoute les en-tetes dans chaque onglet (ligne 1) :

**Onglet `students` :**
```
telegram_user_id | telegram_username | first_name | email | active
```

**Onglet `messages` :**
```
timestamp | telegram_user_id | telegram_username | first_name | message_text | chat_id
```

**Onglet `outreach_log` :**
```
timestamp | telegram_user_id | first_name | channel | days_silent | message_sent
```

4. Copie l'**ID du Sheet** depuis l'URL : `docs.google.com/spreadsheets/d/ICI_C_EST_L_ID/edit`

### 0.4 Recuperer ton propre telegram_user_id

Besoin pour t'ajouter comme eleve de test.

1. Sur Telegram, cherche **@userinfobot** et envoie-lui n'importe quel message.
2. Il te retourne ton `user id`. Copie ce numero (ex. `123456789`).

### 0.5 Recuperer une cle API Anthropic

1. Va sur `console.anthropic.com` → API Keys → Create Key.
2. Copie la cle (elle ne s'affichera qu'une fois).

### 0.6 Noter tout ca

Dans un fichier temporaire :

```
TELEGRAM_BOT_TOKEN = ...
GOOGLE_SHEET_ID = ...
MON_TELEGRAM_USER_ID = ...
ANTHROPIC_API_KEY = ...
```

---

## Phase 1 · Importer le workflow dans n8n (5 min)

1. Ouvre ton n8n Cloud → **Workflows** → **Add workflow** → **Import from File**.
2. Choisis `kodjo-engagement-bot.json` (depuis `~/ClaudeProjects/EmileZounon.github.io/KodjoLive/`).
3. Le workflow s'ouvre avec 12 nodes visibles.

### 1.1 Brancher les credentials

Clique sur chacun de ces nodes, et attache le credential correspondant :

| Node | Credential a creer ou choisir |
|---|---|
| Telegram: on group message | **Telegram API** → colle ton `TELEGRAM_BOT_TOKEN` |
| Google Sheets: log message | **Google Sheets OAuth2** → connecte ton compte Google |
| Read students | Meme credential Google Sheets |
| Read messages | Meme credential Google Sheets |
| Log outreach | Meme credential Google Sheets |
| Claude: generate nudge | **Anthropic API** → colle ton `ANTHROPIC_API_KEY` |
| Telegram: send DM | Meme credential Telegram |
| Gmail: send email | **Gmail OAuth2** → connecte ton compte Gmail |

### 1.2 Remplacer l'ID du Google Sheet

Dans chacun des 4 nodes Google Sheets, remplace `REPLACE_WITH_GOOGLE_SHEET_ID` par ton vrai Sheet ID (il apparait comme un champ de selection, colle l'ID et choisis le bon fichier).

### 1.3 Sauvegarder

Clique sur **Save** (icone disquette en haut a droite).

---

## Phase 2 · Test Flow 1 (capture des messages) — 5 min

Objectif : verifier que le bot ecoute bien le groupe et remplit l'onglet `messages`.

1. **Active le workflow** : bascule le toggle en haut a droite sur **Active** (vert).
2. Va dans ton groupe Telegram de test et envoie un message : *"ceci est un test"*.
3. Reviens dans n8n → onglet **Executions** (barre de gauche).
4. Tu dois voir une nouvelle execution avec un statut vert "Success".
5. Ouvre ton Google Sheet → onglet `messages`.
6. Tu dois voir une nouvelle ligne avec ton message et ton `telegram_user_id`.

**Si ca ne marche pas :**
- Verifie que le toggle est bien sur Active.
- Verifie que tu as bien desactive privacy mode (cf. 0.1 etape 5).
- Verifie que le bot est admin du groupe.
- Ouvre le node "Telegram: on group message" → test with trigger data → execute.

---

## Phase 3 · Test Flow 2 (nudge des silencieux) — 10 min

Objectif : forcer une situation de silence > 48h et verifier que le bot envoie bien un email et un DM Telegram.

### 3.1 Creer un eleve de test (toi)

Dans l'onglet `students`, ajoute une ligne avec tes vraies infos :

| telegram_user_id | telegram_username | first_name | email | active |
|---|---|---|---|---|
| `MON_TELEGRAM_USER_ID` | `@ton_username` | `Emile` | `ton.email@gmail.com` | `TRUE` |

### 3.2 Falsifier un vieux message

Dans l'onglet `messages`, ajoute une ligne avec ton user_id mais un timestamp volontairement ancien :

| timestamp | telegram_user_id | ... |
|---|---|---|
| `2026-04-15 10:00:00` | `MON_TELEGRAM_USER_ID` | ... |

(Cette date est dans le passe, donc le bot va te voir comme silencieux depuis 4 jours.)

### 3.3 Demarrer le bot en DM (obligatoire pour Telegram)

1. Ouvre une conversation directe avec ton bot (cherche son username dans Telegram).
2. Envoie `/start`. Le bot ne repondra pas, mais il "existe" maintenant dans ta liste de chats. Sans cette etape, le DM echouera et le bot enverra un email a la place (c'est le fallback qu'on veut tester aussi).

### 3.4 Executer le Flow 2 manuellement

1. Dans n8n, ouvre le workflow.
2. Clique sur le node **Daily at 09:00** (le Schedule Trigger).
3. En haut, clique sur **Execute Workflow** (bouton Play) — ca declenche toute la chaine de ce trigger.
4. Regarde chaque node s'executer visuellement.

**Ce que tu dois voir :**
- "Read students" → 1 item (toi).
- "Read messages" → 1 item.
- "Compute inactive students" → 1 item avec `hours_silent` > 48.
- "Claude: generate nudge" → 1 item avec un message francais genere.
- "Route by channel" → 1 item qui part vers la branche **telegram**.
- "Telegram: send DM" → Success (tu recois le DM dans Telegram !) OU Error (si tu n'as pas fait /start, le fallback email prend le relais).
- "Gmail: send email" → execute uniquement si le DM Telegram a echoue.
- "Log outreach" → Success.

### 3.5 Verifier les effets

1. Regarde ton Telegram — tu dois avoir recu un message en DM de ton bot, style "Emile, on pense a toi...".
2. Regarde l'onglet `outreach_log` de ton Sheet — une nouvelle ligne avec le message envoye.
3. Si tu as saute l'etape /start, regarde ton email a la place — tu dois avoir recu le nudge.

---

## Phase 4 · Test des edge cases (10 min)

### 4.1 Test du fallback email

1. Ajoute un deuxieme eleve de test dans `students` avec un `telegram_user_id` valide mais **sans avoir jamais fait /start** au bot.
2. Ajoute un vieux message pour lui dans `messages`.
3. Execute manuellement le Flow 2.
4. Verifie : le Telegram DM doit echouer, et l'email doit partir a la place.

### 4.2 Test de la desactivation

1. Pour un eleve de test, mets la colonne `active` a `FALSE`.
2. Execute le Flow 2.
3. Verifie : aucun message ne part pour cet eleve.

### 4.3 Test de l'etudiant sans Telegram

1. Ajoute un eleve dans `students` avec seulement email (colonne telegram_user_id vide).
2. Ajoute un vieux message pour lui... wait, sans telegram_user_id il n'y aura pas de match. C'est normal : v1 ne suit l'engagement que via Telegram. Les eleves email-only ne peuvent pas etre detectes comme silencieux puisqu'ils ne sont pas dans le groupe Telegram.
3. C'est une limite connue de v1 — la gestion complete multi-canal d'entree viendra en v2 avec WhatsApp.

---

## Phase 5 · Activer le cron quotidien (1 min)

Une fois tous les tests passes :

1. Dans le node **Daily at 09:00**, verifie que le cron est bien `0 9 * * *` (tous les jours a 9h).
2. Ajuste le fuseau horaire du workflow : **Workflow settings** (icone engrenage en haut) → Timezone → `Africa/Abidjan` (ou le fuseau de Kodjo).
3. Le workflow est deja Active. Il tournera demain a 9h automatiquement.

---

## Checklist finale avant de montrer a Kodjo

- [ ] Flow 1 capte les messages en temps reel
- [ ] Flow 2 detecte les silencieux > 48h
- [ ] Claude genere un message dans le ton voulu (doux, encourageant)
- [ ] Telegram DM fonctionne pour les eleves qui ont /start
- [ ] Fallback email fonctionne pour les autres
- [ ] Outreach_log remplit correctement
- [ ] Le cron est configure au bon fuseau horaire
- [ ] Tu as nettoye les donnees de test (supprime toi-meme de `students`, supprime les vieux messages fake)

---

## Si quelque chose casse

| Symptome | Cause probable | Fix |
|---|---|---|
| Messages pas captures | Privacy mode pas desactive | BotFather → /setprivacy → Disable |
| "Chat not found" sur Telegram DM | Student n'a pas fait /start | C'est attendu, le fallback email prend le relais |
| Claude renvoie du vide | Mauvais credential Anthropic | Refaire le credential |
| Google Sheet pas ecrit | OAuth Google expire | Reconnecter le credential Google |
| Cron ne declenche pas | Fuseau horaire | Workflow settings → Timezone |

---

**Une fois tout valide, tu peux :**

1. Nettoyer le Sheet de test.
2. Dupliquer le workflow en `kodjo-engagement-PROD`.
3. Demander a Kodjo d'ajouter ses vrais eleves dans `students`.
4. Ajouter le bot a son vrai groupe Telegram (admin, privacy off).
5. Laisser tourner pendant 2-3 semaines avant d'ajouter WhatsApp en v2.
