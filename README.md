# Modèle app desktop — Portal

Dépôt modèle des applications desktop de Portal : une application Windows livrée en **un seul .exe portable** (sans installation), interface web (React) dans une fenêtre native, logique en Rust (Tauri 2).

Chaque nouvelle app part de ce dépôt (bouton **Use this template**). La stack de référence est décrite dans `03_Stacks-par-type-de-projet.docx` (§ 2) ; ce dépôt en est la mise en œuvre.

## Utiliser l'application

- **Windows 10 ou 11**, x64 ou ARM64 : téléchargez le fichier qui correspond à votre PC dans la dernière [Release](../../releases/latest) (`<app>-<version>-windows-x64.exe` ou `<app>-<version>-windows-arm64.exe`), puis lancez-le. Rien à installer.
- **WebView2 est requis.** Il est déjà présent sur Windows 10 et 11 à jour. Sur un poste qui ne l'a pas, l'installer depuis le site de Microsoft (« Microsoft Edge WebView2 Runtime »).
- **L'exécutable n'est pas signé** : au premier lancement, Windows SmartScreen affiche « Windows a protégé votre ordinateur ». Cliquez sur **Informations complémentaires**, puis **Exécuter quand même**. C'est attendu tant que la signature de code n'est pas décidée pour l'app.

_Captures d'écran : à ajouter dans `docs/` par chaque app, avec ses vrais écrans._

## Créer une nouvelle app depuis ce modèle

1. Créer le dépôt depuis ce modèle (**Use this template**), public, sous `Portal-eu`.
2. Remplacer `modele-app-desktop` par le nom court de l'app (minuscules, tirets) dans :
   - `package.json` (`name`, `description`) ;
   - `src-tauri/Cargo.toml` (`name`, `description`, `repository`) et `[lib] name` (`<app>_lib`, avec des `_`), puis `src-tauri/src/main.rs` ;
   - `src-tauri/tauri.conf.json` : `productName`, `mainBinaryName`, `identifier` (**`eu.leportal.<app>`**), titre de la fenêtre ;
   - `index.html` (titre) et ce README.
3. Relancer `npm install` et `cargo generate-lockfile` (dans `src-tauri/`), puis versionner `package-lock.json` et `Cargo.lock`.
4. Garder la même version dans `package.json`, `src-tauri/tauri.conf.json` et `src-tauri/Cargo.toml` (`npm run verifier-version`).

## Organisation du code

```
src-tauri/src/
  commands/   couche fine appelée par l'interface (#[tauri::command])
  core/       logique métier, testable sans interface (cargo test)
  utils/      outils transverses (erreurs…)
src/
  components/ hooks/ stores/ types/ utils/ styles/ assets/
```

Stack : Tauri 2, Rust (édition 2021 : serde, thiserror, tokio, rayon, log, env_logger, chrono), React 19, TypeScript, Vite, Tailwind CSS 4 (plugin Vite), clsx, zustand, @tanstack/react-virtual.

## Règles du modèle

- **Versions fixées** : aucune version flottante (`latest`, `^`, `~`) ; `package-lock.json` et `Cargo.lock` sont versionnés, la CI utilise `npm ci` et `cargo --locked`. La toolchain Rust est fixée dans `rust-toolchain.toml`.
- **CSP stricte**, jamais `null` (`src-tauri/tauri.conf.json`) : uniquement les ressources de l'app et l'IPC Tauri, **aucun accès réseau externe**. La CSP de développement (`devCsp`) n'ajoute que le serveur Vite local.
- **Capabilities minimales** (`src-tauri/capabilities/default.json`) : `core:default` seul. Un plugin (`dialog`, `fs`…) ne s'ajoute que si l'app en a besoin, avec les seules permissions nécessaires ; l'accès aux fichiers reste limité aux dossiers choisis par l'utilisateur, jamais tout le disque.
- Auteur « Portal ICT », logo Portal (`src/assets/portal-logo.svg`, icônes dans `src-tauri/icons` générées par `npx tauri icon`).
- Pas de signature de code ni de mise à jour automatique : à décider par app si besoin.

## Développer

Prérequis : Node.js 24, Rust (installé automatiquement par `rustup` à la version de `rust-toolchain.toml`), et sous Windows les outils de build C++ de Visual Studio.

```bash
npm ci
npm run tauri dev      # fenêtre de développement
npm run typecheck      # tsc
cd src-tauri && cargo clippy --all-targets -- -D warnings && cargo test
```

Build local d'un exécutable portable : `npm run tauri build -- --no-bundle` (résultat dans `src-tauri/target/release/`).

## Livraison

- **À chaque PR** (workflow `Contrôles`) : version identique dans les trois fichiers, `tsc`, `cargo clippy`, `cargo test`.
- **Sur un tag `vX.Y.Z`** (workflow `Release`) : contrôle que le tag et les trois versions sont identiques, build des deux .exe portables (x64 sur `windows-latest`, ARM64 sur le runner natif `windows-11-arm`), puis publication de la Release GitHub marquée « Latest » avec `<app>-<version>-windows-x64.exe` et `<app>-<version>-windows-arm64.exe`. Seul `GITHUB_TOKEN` est utilisé : aucun secret à créer.

Publier une version : mettre la même version dans les trois fichiers, merger, puis pousser le tag (`git tag v1.2.3 && git push origin v1.2.3`).

## Licence

[GNU AGPL v3](LICENSE) — © Portal ICT.
