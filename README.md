# Space Object Library

## Project Goal
This project is a Star Tracker library app built with Express, MySQL, and Docker.

It supports:
- RESTful CRUD routes for `planets`, `stars`, and `galaxies`
- Both HTML and JSON responses
- Image uploads for all three resource types
- Basic styling with EJS templates and shared layout partials

## Tech Used
- Node.js
- Express
- EJS
- MySQL
- Sequelize
- Docker / Docker Compose
- Multer (image uploads)

## App Flow (Simple Version)
Client -> Express app -> Sequelize -> MySQL

The same routes can serve:
- HTML for browser requests
- JSON for API requests

## Main Features
1. Full CRUD routes for planets, stars, and galaxies
2. EJS views for:
- index
- show
- new
- edit
3. Method override pattern for HTML forms (`?_method=PUT` and `?_method=DELETE`)
4. Image upload support in create and edit forms
5. Validation and status handling:
- `200` success
- `201` created
- `400` bad request (validation issues)
- `404` not found
6. Centralized error middleware for cleaner error responses

## Quick Start
From the project root:

```bash
docker compose up -d
```

Check containers:

```bash
docker compose ps
```

Open in browser:

`http://localhost:3000`

## Install Commands (Inside Container)
If needed, open a shell in the Node container:

```bash
docker compose exec wdv442-node sh
```

Then run installs there:

```bash
npm install
npm install multer
```

## Sequelize Commands
Run these from your host terminal:

```bash
docker compose exec -T wdv442-node npx sequelize-cli db:migrate
docker compose exec -T wdv442-node npx sequelize-cli db:seed:all
docker compose exec -T wdv442-node npx sequelize-cli db:seed:undo:all
```

## Quick API Checks
```bash
curl -H "Accept: application/json" http://localhost:3000/planets
curl -H "Accept: application/json" http://localhost:3000/stars
curl -H "Accept: application/json" http://localhost:3000/galaxies
```

Validation examples:

```bash
curl -X POST http://localhost:3000/planets -H "Content-Type: application/json" -d '{}'
curl -H "Accept: application/json" http://localhost:3000/stars/not-a-number
```

## Notes
- If the Node container loops or crashes, check logs:
  `docker compose logs --tail 100 wdv442-node`
- If uploads fail with `Cannot find module 'multer'`, run:
  `docker compose exec -T wdv442-node npm install multer`

## AI Use Disclosure
AI (Codex) was used as a coding assistant for setup, debugging, and cleanup.
All changes were reviewed and tested by the developer.

## Developer
Jessica Morrison
