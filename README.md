# Proefexamen Node.js – F1 API

REST-API met Formule 1-data (piloten, teams, races en circuits), gemaakt als proefexamen Node.js in februari 2025. De API leest de data uit MongoDB en verrijkt ze voor een frontend, bijvoorbeeld met piloteninfo en vlaggen.

*English: Express + TypeScript REST API with MongoDB serving Formula 1 drivers, teams, races and circuits (practice exam, February 2025).*

## Wat erin zit
- Endpoints `GET /drivers`, `GET /teams`, `GET /races` en `GET /circuits`
- Zoeken zonder hoofdlettergevoeligheid met `?search=` op voor- en achternaam van piloten en op circuitnaam
- Races worden verrijkt met de gegevens van de piloot per resultaat; `?format=true` zet racetijden om naar een leesbaar formaat
- Vlag-URL per piloot, team en race op basis van de landcode
- Mongoose-modellen met TypeScript-interfaces in `src/models`
- Middleware voor request-logging, 404-afhandeling en centrale foutafhandeling

## Techniek
Node.js, Express 4, TypeScript, Mongoose (MongoDB), dotenv, tsx, pkgroll.

## Lokaal draaien
```bash
npm install
npm install mongoose
cp .env.example .env
npm run dev
```
Vul in `.env` `MONGODB_URI` in met de verbinding naar je eigen MongoDB-database (`f1db`); `PORT` is standaard 3000. `mongoose` wordt in de code gebruikt maar staat niet in `package.json`, vandaar de aparte installatie.

## Status
Proefexamen, februari 2025. Afgewerkt, niet meer in ontwikkeling.

---
_Nagekeken in november 2026 door Robin, met hulp van een AI-agent._
