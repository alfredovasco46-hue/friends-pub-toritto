# Friends Pub Toritto — Sito Web & Pannello Gestionale

Progetto completo per **Friends — Pub · Pizzeria · Braceria · Sushi** (Piazza Papa Giovanni Paolo II, 13/15 — 70020 Toritto BA).

## Architettura del Progetto

Il progetto è diviso in due applicazioni web distinte collegate in tempo reale allo stesso database **Supabase** (`wrnvorxczaxtjojgmyqe`):

1. **Sito Clienti (`index.html`, `app.js`, `styles.css`, `data.js`)**
   - **URL Live**: [https://friends-pub-toritto.vercel.app](https://friends-pub-toritto.vercel.app)
   - Home page minimal e responsive (ottimizzata per smartphone e desktop).
   - Menu digitale consultabile su richiesta (`Consulta il Menu`), suddiviso in 6 sezioni ordinate (*Stuzzichiamo & Friggiamo*, *Pizze & Panzerotti XXL*, *Hamburger + Patatine*, *Hamburger di Mare & Bao*, *Insalate & Tagliate*, *Sushi & Poke*).
   - Sistema di prenotazione tavoli in tempo reale con verifica disponibilità e selezione tavolo opzionale.
   - Sezione recensioni clienti sincronizzata con Supabase.

2. **Pannello Gestionale Admin (`admin.html`, `admin.js`, `styles.css`, `data.js`)**
   - **URL Live**: [https://friends-pub-toritto-admin.vercel.app](https://friends-pub-toritto-admin.vercel.app)
   - Accesso protetto tramite funzione RPC PostgreSQL (`verify_admin_login`) su Supabase.
   - Gestione prenotazioni per data e stato (Confermata, In attesa, Completata, Cancellata).
   - Gestione stato tavoli e creazione rapida prenotazioni telefoniche/walk-in.
   - Gestione completa del Menu (aggiunta ed eliminazione piatti in tempo reale).

## Struttura dei File

- `index.html` — Interfaccia pubblica per i clienti
- `app.js` — Logica frontend clienti (menu a sezioni, prenotazioni, recensioni)
- `admin.html` — Interfaccia gestionale riservata allo staff
- `admin.js` — Logica autenticazione e gestione sala/prenotazioni/menu
- `styles.css` — Foglio di stile condiviso (Dark luxury theme + Mobile responsive)
- `data.js` — Configurazione client Supabase, API wrapper e dati di fallback
- `logo-friends.jpg` / `sala-interna.jpg` — Asset grafici ufficiali del locale

## Avvio in Locale

Non è richiesto alcun build step. È sufficiente servire la cartella con qualsiasi server statico:

```bash
npx serve .
```
oppure aprire `index.html` / `admin.html` tramite Live Server.
