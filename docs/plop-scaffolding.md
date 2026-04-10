# Plop Scaffolding Guide

This project includes a root-level Plop setup to reduce repetitive boilerplate when creating new backend features, frontend features, and reusable frontend components.

The generator configuration lives in [plopfile.cjs](../plopfile.cjs), and the templates live in the [templates](../templates) folder.

## What this gives you

- Faster feature creation with consistent file/folder structure
- Less manual copy/paste when adding backend modules or frontend screens
- A shared workflow for both frontend and backend scaffolding

## Available generators

The root [package.json](../package.json) exposes these scripts:

- `npm run scaffold:backend`
- `npm run scaffold:frontend`
- `npm run scaffold:component`
- `npm run plop` to open Plop directly

## Backend feature generator

Run:

```bash
npm run scaffold:backend
```

### Prompts

- `name`: feature folder/module name, usually plural, for example `tasks` or `projects`
- `entity`: entity/class name, usually singular, for example `task` or `project`
- `tableName`: database table name used by the repository
- `ownerColumn`: optional ownership column for scoped CRUD, for example `user_id`

### Generated files

If you enter:

- `name`: `projects`
- `entity`: `project`
- `tableName`: `projects`
- `ownerColumn`: `user_id`

Plop creates:

```text
backend/src/features/projects/
├── Projects.ts
├── controllers/
│   └── ProjectController.ts
├── middleware/
│   └── ProjectMiddleware.ts
├── models/
│   └── ProjectModel.ts
├── repository/
│   └── ProjectRepository.ts
├── routes/
│   └── ProjectRouter.ts
├── services/
│   └── ProjectService.ts
└── utils/
    └── ProjectUtils.ts
```

### What each file is for

- `Projects.ts`: composition root that wires repository, service, controller, and router together
- `*Controller.ts`: HTTP layer for CRUD actions
- `*Service.ts`: business logic layer
- `*Repository.ts`: database access layer using your base CRUD repository
- `*Router.ts`: Express route registration for CRUD endpoints
- `*Model.ts`: model object for repository results
- `*Middleware.ts`: placeholder middleware file for feature-specific logic
- `*Utils.ts`: placeholder utility file for shared feature helpers

### Owner column behavior

If you provide `ownerColumn`, the generated repository overrides `getOwnerColumn()` so your existing base repository scoping can be used automatically.

Example:

- `ownerColumn = user_id`
- generated repository restricts read/update/delete operations to the authenticated user's records when your request context provides `user_id`

If you leave it blank, no ownership helper is generated.

### After generating a backend feature

The scaffold gives you the structure, but you still need to:

- add the feature to your app routing, if needed
- update the generated model fields to match your database schema
- add validation, hooks, or middleware where needed
- create a migration if the table does not exist yet

## Frontend feature generator

Run:

```bash
npm run scaffold:frontend
```

### Prompts

- `name`: feature name, usually PascalCase-friendly, for example `Projects`
- `routePath`: backend API path segment without the leading slash, for example `projects`
- `createApi`: whether Plop should also create a matching API client under `frontend/src/api`

### What `routePath` means

`routePath` is the backend resource path used by the generated API client.

If `routePath` is `projects`, the generated API file calls:

- `POST /projects`
- `GET /projects`
- `GET /projects/:id`
- `PUT /projects/:id`
- `DELETE /projects/:id`

This is not the same as a React page route. It is the path segment used in Axios requests.

### Generated files

If you enter:

- `name`: `Projects`
- `routePath`: `projects`
- `createApi`: `yes`

Plop creates:

```text
frontend/src/features/Projects/
├── Projects.jsx
├── Projects.module.scss
└── Projects.routes.jsx

frontend/src/api/
└── ProjectsAPI.js
```

### What each file is for

- `Projects.jsx`: base page component for the feature
- `Projects.routes.jsx`: route wrapper component, matching your current feature pattern
- `Projects.module.scss`: local SCSS module for the feature
- `ProjectsAPI.js`: optional Axios-based CRUD client generated only when `createApi` is enabled

### Using the generated API file

The generated API file imports [frontend/src/api/axiosInstance.js](../frontend/src/api/axiosInstance.js) and exposes basic CRUD helpers.

Example generated functions:

- `createProjects(payload)`
- `getProjectsList()`
- `getProjectsById(id)`
- `updateProjects(id, payload)`
- `removeProjects(id)`

You can import the API file inside your feature page and call it in `useEffect`, event handlers, or form submit handlers.

Example:

```jsx
import { useEffect, useState } from "react";
import ProjectsAPI from "../../api/ProjectsAPI";

const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const loadProjects = async () => {
            const response = await ProjectsAPI.getProjectsList();
            if (response?.data) {
                setProjects(response.data);
            }
        };

        loadProjects();
    }, []);

    return <div>{projects.length} projects</div>;
};

export default ProjectsPage;
```

### After generating a frontend feature

The scaffold gives you the starting structure, but you still need to:

- add the route to your frontend router/layout
- connect the API file to the correct backend endpoint
- expand the UI with forms, tables, dialogs, or charts as needed
- update styles and authentication behavior if the page is protected

## Frontend component generator

Run:

```bash
npm run scaffold:component
```

### Prompt

- `name`: component name, for example `StatCard`

### Generated files

If you enter `StatCard`, Plop creates:

```text
frontend/src/components/StatCard/
├── StatCard.jsx
├── StatCard.module.scss
└── index.js
```

### What each file is for

- `StatCard.jsx`: component implementation
- `StatCard.module.scss`: component-local styles
- `index.js`: re-export for cleaner imports

## Template locations

- Backend templates: [templates/backend-feature](../templates/backend-feature)
- Frontend feature templates: [templates/frontend-feature](../templates/frontend-feature)
- Frontend API template: [templates/frontend-api](../templates/frontend-api)
- Frontend component templates: [templates/frontend-component](../templates/frontend-component)

You can edit those template files at any time to change what future scaffolds generate.

## Recommended naming conventions

- Backend `name`: plural resource name like `tasks`, `projects`, `tags`
- Backend `entity`: singular class name like `task`, `project`, `tag`
- Frontend `name`: PascalCase-friendly name like `Tasks`, `Projects`, `UserProfile`
- Frontend `routePath`: lowercase API resource path like `tasks`, `projects`, `users`
- Component `name`: PascalCase like `Button`, `TaskCard`, `StatCard`

## Example workflows

### Create a new backend feature

```bash
npm run scaffold:backend
```

Suggested answers:

- `name`: `projects`
- `entity`: `project`
- `tableName`: `projects`
- `ownerColumn`: `user_id`

### Create a new frontend feature with API client

```bash
npm run scaffold:frontend
```

Suggested answers:

- `name`: `Projects`
- `routePath`: `projects`
- `createApi`: `yes`

### Create a reusable frontend component

```bash
npm run scaffold:component
```

Suggested answer:

- `name`: `StatCard`

## Notes and limitations

- The generated files are starter boilerplate, not finished features
- The backend model template uses a very generic shape, so you should replace fields with explicit types once you know the schema
- The frontend API template assumes standard CRUD endpoints; custom endpoints may need manual edits
- The frontend feature generator does not automatically register routes in your router yet
- The backend generator does not automatically mount new feature routers in the app yet

## When to update the templates

Edit the templates when you want future scaffolds to include:

- auth guards by default in frontend route wrappers
- validation helpers in backend controllers/services
- custom repository methods
- test files
- more opinionated UI boilerplate

Updating a template only affects future generated files. It does not modify existing features automatically.