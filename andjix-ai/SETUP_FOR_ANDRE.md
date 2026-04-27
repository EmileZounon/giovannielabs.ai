# Mise en route Andjix AI — Pour André

Trois services à activer avant que le bot soit pleinement fonctionnel. Compter 20 minutes au total.

---

## 1. Calendly (5 min) — pour que les utilisateurs puissent réserver

1. Aller sur [calendly.com](https://calendly.com), cliquer **Sign up**
2. Choisir **Sign up with Google** et utiliser `info.andjix@gmail.com`
3. Compléter le profil :
   - Nom de l'entreprise : `Andjix Consulting Inc.`
   - Lien personnalisé : `andjix-consulting` (URL deviendra `calendly.com/andjix-consulting`)
   - Fuseau horaire : `Eastern Time (Toronto)`
4. Créer un type d'événement :
   - Cliquer **+ Create** → **Event Type** → **One-on-One**
   - Nom : `Consultation Andjix (30 min)`
   - Durée : **30 minutes**
   - Description : *Consultation gratuite de 30 minutes pour discuter de votre situation administrative, fiscale ou professionnelle.*
   - Disponibilités : tes plages habituelles (modifiables après)
5. Sauvegarder. L'URL ressemble à : `https://calendly.com/andjix-consulting/consultation`
6. **Envoyer cette URL à Giovannie** — elle l'ajoutera dans la variable `NEXT_PUBLIC_CALENDLY_URL` du bot.

---

## 2. Resend (5 min) — pour recevoir les leads par courriel

Resend est un service qui permet au bot d'envoyer un courriel à `info.andjix@gmail.com` chaque fois qu'un utilisateur veut réserver un appel.

1. Aller sur [resend.com](https://resend.com), cliquer **Sign up**
2. S'inscrire avec `info.andjix@gmail.com`
3. Une fois connecté, aller dans **API Keys** (menu de gauche)
4. Cliquer **Create API Key**, choisir **Full access**, nom : `andjix-bot-prod`
5. **Copier la clé** (commence par `re_...`) — elle ne sera plus visible après. Garde-la dans un endroit sûr.
6. **Envoyer cette clé à Giovannie** — elle l'ajoutera dans la variable `RESEND_API_KEY`.

> Resend gratuit : 3 000 courriels par mois, largement suffisant pour démarrer.

### Vérification du domaine d'envoi (à faire avec Giovannie)

Pour que les courriels n'aboutissent pas dans les spams, Resend doit "vérifier" un domaine. Si tu as un domaine (ex. `andjix.ca`), Giovannie t'aidera à ajouter trois enregistrements DNS (DKIM, SPF, DMARC). Sans cela, on peut quand même envoyer depuis un sous-domaine de `giovannielabs.ai` au démarrage.

---

## 3. Anthropic API (5 min) — pour faire fonctionner l'agent IA

C'est ce qui permet au bot de comprendre les questions et de répondre intelligemment.

1. Aller sur [console.anthropic.com](https://console.anthropic.com), cliquer **Sign up**
2. S'inscrire avec `info.andjix@gmail.com`
3. Ajouter un mode de paiement (carte de crédit). Les premiers mois coûtent peu : compter ~5-15 USD/mois pour 100-300 conversations.
4. Aller dans **API Keys** (menu de gauche)
5. Cliquer **Create Key**, nom : `andjix-bot-prod`
6. **Copier la clé** (commence par `sk-ant-...`)
7. **Envoyer cette clé à Giovannie** — elle l'ajoutera dans la variable `ANTHROPIC_API_KEY`.

### Astuce pour limiter les coûts

Dans la console Anthropic, va dans **Limits** et fixe une limite mensuelle (ex. 30 USD/mois) pour ne jamais avoir de surprise.

---

## Résumé : ce qu'on doit envoyer à Giovannie

| Élément | Format |
|---|---|
| URL Calendly | `https://calendly.com/andjix-consulting/consultation` |
| Clé Resend | `re_...` |
| Clé Anthropic | `sk-ant-...` |

Une fois ces trois éléments transmis, Giovannie déploie le bot et l'URL `andjix-ai.giovannielabs.ai` devient pleinement fonctionnelle.

---

## Sécurité

- **Ne partage jamais ces clés par texto, WhatsApp ou Slack non chiffré.** Utilise un coffre-fort de mots de passe (1Password, Bitwarden) ou un courriel chiffré.
- **Si tu soupçonnes qu'une clé a été exposée**, retourne dans la console (Anthropic / Resend / Calendly) et clique **Revoke** pour la désactiver. Crée-en une nouvelle.
