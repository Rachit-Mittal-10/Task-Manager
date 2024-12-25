## API End Points

1. `POST /auth/register`: This is the api end point for registering the user. Unprotected path.
```
    Parameters: username, email and password
```

2. `POST /auth/login`: This is the api end point to login the user. Unprotected path.
```
    Parameters: Username or Email and Password
```
3. `POST /tasks`: This is the api end point to create the new task. Protected.
```
    Parameters:
```

4. `GET /tasks`: API End point to get all the task associated with the user. Protected.
```
    Parameters:
```

5. `GET /tasks/:taskId`: API End point to get the particular task. Protected
```
    Parameters:
```

6. `PUT /tasks/:taskId`: API End Point to update the task. Protected.
```
    Parameters:
```

7. `DELETE /tasks/:taskId`: API End Point to delete the task. Protected
```
    Parameters:
```