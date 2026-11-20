// Vérifie que la version est identique dans package.json, src-tauri/tauri.conf.json
// et src-tauri/Cargo.toml. Avec un argument (tag vX.Y.Z), vérifie aussi le tag.
// Usage : node scripts/verifier-version.mjs [vX.Y.Z]
import { readFileSync } from "node:fs";

const lire = (chemin) => readFileSync(new URL(`../${chemin}`, import.meta.url), "utf8");

const versionCargo = () => {
  const paquet = lire("src-tauri/Cargo.toml").split(/^\[/m).find((s) => s.startsWith("package]"));
  const trouve = paquet?.match(/^version\s*=\s*"([^"]+)"/m);
  return trouve ? trouve[1] : null;
};

const versions = {
  "package.json": JSON.parse(lire("package.json")).version,
  "src-tauri/tauri.conf.json": JSON.parse(lire("src-tauri/tauri.conf.json")).version,
  "src-tauri/Cargo.toml": versionCargo(),
};

const tag = process.argv[2];
if (tag) {
  if (!/^v\d+\.\d+\.\d+$/.test(tag)) {
    console.error(`Tag « ${tag} » invalide : format attendu vX.Y.Z.`);
    process.exit(1);
  }
  versions[`tag ${tag}`] = tag.slice(1);
}

const differentes = new Set(Object.values(versions));
for (const [source, version] of Object.entries(versions)) {
  console.log(`${source.padEnd(28)} ${version ?? "(absente)"}`);
}
if (differentes.size !== 1 || differentes.has(null) || differentes.has(undefined)) {
  console.error("Versions différentes : mettez la même version partout avant de taguer.");
  process.exit(1);
}
console.log(`Version identique partout : ${[...differentes][0]}`);
