# Task Manager Application

### Prerequisites:
- Docker or MySQL locally installed
- NodeJS Version 24.5.0

```
Note: Docker Version is preferable.
For MySQL You would need to initialise the db.
```

### For Docker Approach:
- Run `docker compose -f docker-compose-dev.yaml up --build` in the root folder. This initializes the DB schema and starts backend and frontend using their own application directories.

### For MySQL on local machine:
- Run init.sql file to initialise the db_schema and look for correct environment variable.
- Run `npm install` inside `backend/`, then start the API with `npm run dev:ts` from `backend/`.
- Run `npm install` inside `frontend/`, then start the UI with `npm run dev` from `frontend/`.
- The frontend and backend now keep separate `package-lock.json` files.

### Scaffolding new code
- This project includes Plop generators for backend features, frontend features, and reusable frontend components.
- See [docs/plop-scaffolding.md](docs/plop-scaffolding.md) for commands, prompts, generated files, and examples.
