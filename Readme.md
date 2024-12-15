# Task Manager Application

### Prerequisites:
- Docker or MySQL locally installed
- NodeJS LTS Version

```
Note: Docker Version is preferable.
For MySQL You would need to initialise the db.
```

### For Docker Approach:
- Run `docker compose up` in root folder. This would initialise the DB with Schema.
- Then run `node backend/src/index.js` in root folder. This would start the backend server.
- Then using Postman or accessing the Frontend, API can be accessed.

### For MySQL on local machine:
- Run init.sql file to initialise the db_schema and look for correct environment variable.
- Then run `node backend/src/index.js` in root folder. This would start the backend server.
- Then using Postman or accessing the Frontend, API can be accessed.