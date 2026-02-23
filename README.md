# 💾 SARCASTICK: The MEME Vaporwave OS

Benvenuti su **Sarcastick**, un progetto nato, pensato e sviluppato unicamente per il **MEME** e per gli amanti dell'estetica Vaporwave/Windows 98. Non è un software per il business, non usa database complessi, ed è fatto "con lo sputo e la fantasia". Ma funziona. E anche maledettamente bene.

## 🚀 Come funziona questo accrocchio magico?

Questo progetto è una **Single Page Application (SPA)** puramente statica. Non c'è alcun backend tradizionale (niente Node.js in esecuzione su un server, niente database SQL o MongoDB).

I dati dell'app (come i meme caricati e gli utenti) vengono salvati in semplici file JSON all'interno della cartella `database/` (`posts.json` e `users.json`). Tutto il magico funzionamento si basa sul client (il tuo browser) e l'integrazione con le **GitHub API**.

### 🛠 Il trucco del Commit (Il nostro Database Serverless)

L'applicazione utilizza la libreria **Octokit** per dialogare direttamente con GitHub.
Ogni volta che si compie un'azione che richiede il salvataggio o l'aggiornamento di un dato persistente:

1. Il frontend interroga le API di GitHub per ottenere lo stato corrente (e il File SHA) dei file contenuti in `database/`.
2. Apporta le modifiche necessarie in locale a livello di client.
3. Effettua un **commit diretto** sul branch `main` di questa repository utilizzando un Personal Access Token (PAT).
4. E boom, abbiamo appena usato GitHub come un database documentale gratuito.

### ⚙️ L'Accrocchio su GitHub Actions (Il Deploy Infinito)

Per rendere le foto e i dati sempre accessibili online per gli altri "utenti" senza spendere un centesimo di hosting, sfruttiamo **GitHub Pages**.

Nel file di configurazione `.github/workflows/deploy.yml` si trova una GitHub Action che intercetta ogni singolo "commit" generato dall'app (i.e., ogni volta che aggiorniamo il finto database JSON). Quando ciò avviene, il workflow preleva semplicemente i file statici (`.html`, `.css`, `.js`, e i JSON aggiornati) e genera un re-deploy automatico del sito su GitHub Pages.

**Il ciclo di vita di un Meme:**

- L'utente modifica l'interfaccia aggiungendo roba e salva l'operazione.
- Lo script JS committa silenziosamente e istantaneamente la modifica sui file JSON del repository (aggirando la necessità di scaricare/ricaricare l'app).
- Il push attiva la GitHub Action "Deploy to GitHub Pages".
- L'intera repo viene esposta in hosting nel giro di un paio di minuti e la modifica è condivisa!

Zero costi di hosting, zero server backend da mantenere, 100% ingegno da meme. 🌈

## 🔑 Accesso Riservato

Per poter sbloccare ed entrare effettivamente all'interno del sistema (schermata di login), vi servirà una password di sistema "segreta".

La password da schiaffare nel prompt è la seguente:

> **`4V4NT1S4V01A`**

## 📂 Struttura "Architetturale"

- `index.html`: Entry point leggerissimo che chiama il loader.
- `js/loader.js`: Il caricatore asincrono che inietta nel server un pezzo alla volta l'HTML (`boot`, `login`, `desktop`, `modals`), per dare il "feel" di un finto boot sequence.
- `js/github.js`: Il cuore del trick per contattare la repository e aggiornare i grid element.
- `parts/`: Tutto l'interfaccia suddivisa a pezzetti per una facile manutenzione.
- `database/`: I file `.json` testuali che svolgono la funzione di database in real-time.

---

> _"Vengono fatte repository di gran lunga peggiori pur usandole per lavoro. Questa è arte."_
> Goditi l'Aesthetic! 📼
