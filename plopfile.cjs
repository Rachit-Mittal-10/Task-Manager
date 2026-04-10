module.exports = function (plop) {
    plop.setGenerator("backend-feature", {
        description: "Scaffold a backend feature module",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "Feature folder/module name (e.g. tasks):",
                validate: (value) => {
                    return (
                        Boolean(value && value.trim()) ||
                        "Feature name is required"
                    );
                },
            },
            {
                type: "input",
                name: "entity",
                message: "Entity name for classes/files (e.g. task):",
                validate: (value) => {
                    return (
                        Boolean(value && value.trim()) ||
                        "Entity name is required"
                    );
                },
            },
            {
                type: "input",
                name: "tableName",
                message: "Database table name:",
                default: (answers) => answers.name,
            },
            {
                type: "input",
                name: "ownerColumn",
                message: "Owner column for scoped CRUD (leave blank for none):",
                default: "",
            },
        ],
        actions: [
            {
                type: "addMany",
                destination: "backend/src/features/{{kebabCase name}}",
                base: "templates/backend-feature",
                templateFiles: "templates/backend-feature/**/*.hbs",
                abortOnFail: true,
            },
        ],
    });

    plop.setGenerator("frontend-feature", {
        description: "Scaffold a frontend feature folder",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "Feature name (e.g. Tasks):",
                validate: (value) => {
                    return (
                        Boolean(value && value.trim()) ||
                        "Feature name is required"
                    );
                },
            },
            {
                type: "input",
                name: "routePath",
                message: "API route path without leading slash (optional):",
                default: (answers) => answers.name,
            },
            {
                type: "confirm",
                name: "createApi",
                message: "Create a matching frontend API client?",
                default: true,
            },
        ],
        actions: [
            {
                type: "addMany",
                destination: "frontend/src/features/{{properCase name}}",
                base: "templates/frontend-feature",
                templateFiles: "templates/frontend-feature/**/*",
                abortOnFail: true,
            },
            {
                type: "add",
                skipIfExists: true,
                path: "frontend/src/api/{{properCase name}}API.js",
                templateFile:
                    "templates/frontend-api/{{properCase name}}API.js.hbs",
                skip: (answers) =>
                    answers.createApi ? undefined : "Skipping API client",
                abortOnFail: true,
            },
        ],
    });

    plop.setGenerator("frontend-component", {
        description: "Scaffold a reusable frontend component",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "Component name:",
                validate: (value) => {
                    return (
                        Boolean(value && value.trim()) ||
                        "Component name is required"
                    );
                },
            },
        ],
        actions: [
            {
                type: "addMany",
                destination: "frontend/src/components/{{properCase name}}",
                base: "templates/frontend-component",
                templateFiles: "templates/frontend-component/**/*",
                abortOnFail: true,
            },
        ],
    });
};
