# QA Senior — Lacoste Technical Test

Ce dépôt livre:
1) **Test API** `exchangeratesapi.io` — taux EUR→USD au **2025-01-01**
2) **Tests Web Cypress**
   - Google → ouverture correcte de **Lacoste US**
   - **Smoke** Lacoste **FR** (éléments UI clefs)
3) **CI GitHub Actions** — exécution automatique + artifacts (JSON / screenshots / vidéos)

## 1. Prérequis
- Node.js ≥ 18
- npm ≥ 9
- Clé API `exchangeratesapi.io`

## 2. Installation
```bash
npm ci
```

## 3. Lancer les tests en local

### API
```bash
export EXCHANGERATESAPI_KEY=VOTRE_CLE
npm run test:api
```

**Endpoint**: GET `/v1/2025-01-01?base=EUR&symbols=USD&access_key=***`  
**Validation**: schéma (rates.USD number, base=EUR, date exacte) + bornes métier (0.7 < USD < 1.3)  
**Preuve**: `artifacts/api/eur_usd_2025-01-01.json`

### Web (Cypress)
```bash
npm run test:web
# ou interface:
npm run cy:open
```

## 4. CI (GitHub Actions)

**Workflow**: `.github/workflows/qa.yml`  
**Secrets requis**:
- `EXCHANGERATESAPI_KEY`

**Artifacts**:
- JSON API dans `artifacts/`
- Screenshots / vidéos Cypress

## 5. Notes de design

- Tests concis, robustes, et centrés sur l'attendu client.
- Aucune dépendance à des outils privés ou propriétaires.
- Documentation courte et actionnable.
