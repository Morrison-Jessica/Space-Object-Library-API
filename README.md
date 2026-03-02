# ✨Space Object Library API✨      

---

## 💙 Purpose / Goal
Build a REST API for managing space objects data for planets, stars, and galaxies.

---

## 💚 Big Picture Diagram

[Client ] → [Express API] → [MySQL Database in Docker]

- API routes handle requests (`/planets`, `/stars`, `/galaxies`)
- Sequelize models + associations connect data across tables
- Docker keeps Node + MySQL running together

---

## 💛 Steps / Process
1. Set up models for `Planet`, `Star`, and `Galaxy`.
2. Added associations:
   - Planet belongs to many Stars
   - Star belongs to Galaxy
   - Galaxy has many Stars
3. Created explicit join model `StarsPlanets` for many-to-many.
4. Ran migrations to add fields (`name`, `description`, `galaxyId`) and relation tables.
5. Generated and filled seed files for planets, stars, galaxies, and join-table links.
6. Updated controllers to full RESTful CRUD with proper status codes.
7. Updated routers to map all CRUD routes.
8. Added middleware in `index.js` for JSON + form body parsing.

---

## 💜 Challenges / Debug Notes
- ⚠️ Migration order issue (association migration ran too early) was fixed by adjusting timestamp order.
- 🔁 Node container got stuck in a nodemon restart loop. Root cause was file-change noise from mounted MySQL data; fixed by using a named Docker volume for MySQL storage in `docker-compose.yml`.

---

## 💖 Takeaways
- Docker running does not always mean app networking is correct from every environment.
- Sequelize migrations are order-sensitive, so timestamps matter.
- Many-to-many can use an explicit join model when required.

---

## 💙 Quick Reference / Snippets
```bash
# Start containers

docker compose up -d

# Run migrations (inside Node container)
docker compose exec -T wdv442-node npx sequelize-cli db:migrate

# Run seeders (inside Node container)
docker compose exec -T wdv442-node npx sequelize-cli db:seed:all

# Undo all seeders
docker compose exec -T wdv442-node npx sequelize-cli db:seed:undo:all
```

```bash
# Example API checks
curl http://localhost:3000/planets
curl http://localhost:3000/stars
curl http://localhost:3000/galaxies
```

---
## 🤖 AI Disclosure
AI (Codex) was used as a coding assistant for setup, debugging, and code updates.
All code and output were reviewed and validated by the developer.

---
**Developer:** ✨Jessica Morrison✨
