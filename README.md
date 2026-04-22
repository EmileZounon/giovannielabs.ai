# giovannielabs.ai

Giovannie Labs landing page plus the ABSI marketing subsite. Deployed via GitHub Pages at https://giovannielabs.ai/.

## Structure

```
giovannielabs.ai/
├── index.html          # Giovannie Labs landing (EGZ brand system)
├── CNAME               # giovannielabs.ai (for GitHub Pages custom domain)
├── absi/               # ABSI marketing site, served at /absi/
│   ├── index.html
│   ├── styles.css
│   └── assets/
├── naomi/              # Naomi chatbot app, OWN repo + Vercel (gitignored here)
└── .gitignore
```

Static products live as subfolders. Dynamic apps get their own repo + subdomain (`naomi.giovannielabs.ai` pattern).

## Deployment

GitHub Pages → custom domain → Let's Encrypt cert. Push to `main` → Pages rebuild → live within a minute.

**DNS (Cloudflare):** 4 A records to GitHub Pages IPs, DNS-only (gray cloud). Proxy must stay OFF or Let's Encrypt provisioning breaks.

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Plus a CNAME on `www` to `emilezounon.github.io.` for the alt domain.

## Local preview

```bash
cd ~/ClaudeProjects/giovannielabs.ai
python3 -m http.server 9000
# open http://localhost:9000/ and http://localhost:9000/absi/
```

## Troubleshooting

### HTTPS certificate stuck: `NET::ERR_CERT_COMMON_NAME_INVALID`

**Symptom:** Browser shows "Your connection is not private" with `ERR_CERT_COMMON_NAME_INVALID`. `openssl` confirms the server is serving a `*.github.io` cert instead of a `giovannielabs.ai` cert, even hours after DNS is correctly pointed at GitHub Pages.

**Why:** GitHub Pages queues a Let's Encrypt cert request once when a custom domain is first configured. If that initial request fails (LE rate limit, DNS timing, network blip) there is no retry loop. The domain just sits there serving GitHub's fallback `*.github.io` cert forever.

**Diagnose:**

```bash
# Should say is_https_eligible: true, https_error: peer_failed_verification
gh api repos/EmileZounon/giovannielabs.ai/pages/health

# Should show subject=/CN=*.github.io (wrong), not CN=giovannielabs.ai
echo | openssl s_client -servername giovannielabs.ai -connect 185.199.108.153:443 2>/dev/null \
  | openssl x509 -noout -subject -issuer
```

**Fix:** Unset and re-set the custom domain. That retriggers a fresh Let's Encrypt request.

```bash
cd ~/ClaudeProjects/giovannielabs.ai
git config user.email "emile.giovannie@gmail.com"

# 1. Remove CNAME, push, wait for Pages to register the unset
git rm CNAME
git commit -m "Temporarily remove CNAME to re-trigger Pages cert provisioning"
git push
sleep 45

# 2. Restore CNAME, push, wait for cert
echo "giovannielabs.ai" > CNAME
git add CNAME
git commit -m "Restore CNAME (kicks fresh Let's Encrypt cert provisioning)"
git push
sleep 60

# 3. Verify cert is now correct
echo | openssl s_client -servername giovannielabs.ai -connect 185.199.108.153:443 2>/dev/null \
  | openssl x509 -noout -subject
# Should now say: subject=/CN=giovannielabs.ai, issuer=Let's Encrypt

# 4. Enable HTTPS enforcement (HTTP auto-redirects to HTTPS)
gh api -X PUT repos/EmileZounon/giovannielabs.ai/pages -F https_enforced=true
```

Chrome caches cert failures hard. After the fix, test from an incognito window or a different device for a clean check.

### Other gotchas

- **Do not enable Cloudflare proxy** (orange cloud) on `giovannielabs.ai`. It intercepts the Let's Encrypt challenge and provisioning will hang. DNS-only / gray cloud is required.
- **No AAAA records.** GitHub Pages serves IPv4 only for custom domains. Stray AAAA records cause intermittent TLS errors.
- **No MX records on the apex.** Hosting email on the apex breaks some Pages validation checks.
- **Don't commit `naomi/`.** It is a separate repo. The root `.gitignore` excludes it.

## Authoring

- Always commit as `emile.giovannie@gmail.com` (Vercel and brand attribution).
- No em dashes or en dashes in copy. Use commas, periods, or colons.
