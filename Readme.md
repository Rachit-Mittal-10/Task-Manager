# Task Manager Application

### Prerequisites:
- Docker or MySQL locally installed
- NodeJS Version 24.5.0

```
Note: Docker Version is preferable.
For MySQL You would need to initialise the db.
```

### For Docker Approach:
- Run `docker compose up` in root folder. This would initialise the DB Schema and then further start the backend and frontend server.

### For MySQL on local machine:
- Run init.sql file to initialise the db_schema and look for correct environment variable.
- Then run `node backend/src/index.js` in root folder. This would start the backend server.
- Then using Postman or accessing the Frontend, API can be accessed.

### Scaffolding new code
- This project includes Plop generators for backend features, frontend features, and reusable frontend components.
- See [docs/plop-scaffolding.md](docs/plop-scaffolding.md) for commands, prompts, generated files, and examples.
