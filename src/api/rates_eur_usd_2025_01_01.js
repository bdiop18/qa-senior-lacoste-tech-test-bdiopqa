const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const fetch = require('node-fetch');

const DAY = "2025-01-01";
const ACCESS_KEY = process.env.EXCHANGERATESAPI_KEY;
const BASE = "EUR";
const SYMBOLS = "USD";

const URL = `https://api.exchangeratesapi.io/v1/${DAY}?access_key=${ACCESS_KEY}&base=${BASE}&symbols=${SYMBOLS}`;

(async () => {
  if (!ACCESS_KEY) {
    console.error("Clé API manquante. Définir EXCHANGERATESAPI_KEY.");
    process.exit(1);
  }

  const res = await fetch(URL);
  assert.ok(res.ok, `HTTP ${res.status}`);
  const json = await res.json();

  assert.ok(json.rates && typeof json.rates.USD === "number", "rates.USD absent");
  assert.strictEqual(json.base, BASE);
  assert.strictEqual(json.date, DAY);

  const v = json.rates.USD;
  assert.ok(v > 0.7 && v < 1.3, `Taux EUR/USD hors bornes: ${v}`);

  const out = path.join("artifacts", "api");
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, `eur_usd_${DAY}.json`), JSON.stringify(json, null, 2));

  console.log(`OK • EUR/USD @ ${DAY} = ${v}`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
