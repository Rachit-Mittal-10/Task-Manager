import eslintPluginReact from "eslint-plugin-react"; // React plugin
import eslintPluginPrettier from "eslint-plugin-prettier"; // Prettier plugin
import eslintPluginReactHooks from "eslint-plugin-react-hooks"; // React Hooks plugin
import eslintPluginImport from "eslint-plugin-import"; // Import plugin for managing import rules
import babelParser from "@babel/eslint-parser";

export default [
    // Base configuration for all files
    {
        languageOptions: {
            globals: {
                browser: true, // Enable browser globals
                node: true, // Enable Node.js globals
                es2021: true, // Enable ECMAScript 2021 features
            },
            parser: babelParser, // Use Babel parser to handle JSX
            parserOptions: {
                ecmaVersion: 12, // Enable ECMAScript 2021 syntax
                sourceType: "module", // Use ES modules (import/export)
                jsx: true, // Enable JSX parsing
		requireConfigFile: false
            },
        },
        plugins: {
            react: eslintPluginReact, // Define React plugin
            prettier: eslintPluginPrettier, // Define Prettier plugin
            'react-hooks': eslintPluginReactHooks, // Define React Hooks plugin
            import: eslintPluginImport, // Define import plugin
        },
        rules: {
            "no-unused-vars": "warn", // Warn for unused variables
            eqeqeq: "error", // Enforce strict equality
            "prettier/prettier": ["error"], // Enforce Prettier formatting
            "react/prop-types": "off", // Optionally turn off prop-types rule for React
            "react/jsx-uses-react": "off", // For React 17 JSX transform compatibility
            "react/jsx-uses-vars": "error", // Prevent unused variables in JSX
            "react-hooks/rules-of-hooks": "error", // Ensure hooks are used properly
            "react-hooks/exhaustive-deps": "warn", // Warn for missing hook dependencies
            "import/no-unresolved": "error", // Ensure imports are resolved correctly
            "import/named": "error", // Ensure named imports are correctly referenced
        },
        ignores: [
            "node_modules/**",
            "frontend/dist/**",
            "backend/dist/**",
            ".env",
            "**/*.md",
            "./esint.config.js",
        ],
    },
    // Configuration for backend files
    {
        files: ["backend/**/*.js"], // Target backend files in the `backend` folder
        languageOptions: {
            globals: {
                node: true, // Define Node.js globals for backend files
            },
        },
        rules: {
            "no-console": "warn", // Warn on console.log in backend
        },
    },
    // Configuration for frontend files
    {
        files: ["frontend/**/*.js", "frontend/**/*.jsx"], // Target frontend files in the `frontend` folder
        languageOptions: {
            globals: {
                browser: true, // Define browser globals for frontend files
            },
        },
        rules: {
            "react/jsx-uses-react": "off", // For React 17 JSX transform compatibility
            "react/react-in-jsx-scope": "off", // For React 17 JSX transform compatibility
        },
    },
];
