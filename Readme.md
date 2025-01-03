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

----
----

## Backend APIs

### API End Points

1. `POST /auth/register`: This is the api end point for registering the user. Unprotected path.

- **Parameters**:
    - **username**: required
    - **email**: required
    - **password**: required

2. `POST /auth/login`: This is the api end point to login the user. Unprotected path.

- **Parameters**: Username or Email and Password
    - **password**: required
    - **username** or **email**: any one is required\
- **Returns**:
    - **token**: JSON Web Token would be provided in token key of body

3. `POST /tasks`: This is the api end point to create the new task. Protected.

- **Parameters**:
    - **id**: required. JSON Web Token that would be provided  when user login
    - **title**: required.
    - **status**: optional. default = "planned"
    - **priority**: optional. default = "not set"
    - **start_time**: optional.
    - **end_time**: optional
    - **description**: optional.

4. `GET /tasks`: API End point to get all the task associated with the user. Protected.

- **Parameters**:
    - id: required. JSON Web Token that would be provided when user login

5. `GET /tasks/:taskId`: API End point to get the particular task. Protected

- Parameters:


6. `PUT /tasks/:taskId`: API End Point to update the task. Protected.

- Parameters:


7. `DELETE /tasks/:taskId`: API End Point to delete the task. Protected

- Parameters:

8. `GET /`: API End Point to get the dashboard. Protected
- Parameters: