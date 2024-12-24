import eslintPluginReact from 'eslint-plugin-react'; // React plugin
import eslintPluginPrettier from 'eslint-plugin-prettier'; // Prettier plugin

export default [
  // Base configuration for all files
  {
    languageOptions: {
      globals: {
        browser: true, // Enable browser globals
        node: true,    // Enable Node.js globals
        es2021: true,  // Enable ECMAScript 2021 features
      },
      parserOptions: {
        ecmaVersion: 12,   // Enable ECMAScript 2021 syntax
        sourceType: 'module', // Use ES modules (import/export)
      },
    },
    plugins: {
      react: eslintPluginReact, // Define React plugin
      prettier: eslintPluginPrettier, // Define Prettier plugin
    },
    rules: {
      'no-unused-vars': 'warn',
      'eqeqeq': 'error', // Enforce strict equality
      'prettier/prettier': ['error'], // Enforce Prettier formatting
      'react/prop-types': 'off',  // Optionally turn off prop-types rule for React
    },
    ignores: [
      'node_modules/**',
      'frontend/dist/**',
      'backend/dist/**',
      '.env',
      '**/*.md',
      './esint.config.js'
    ],
  },
  // Configuration for backend files
  {
    files: ['backend/**/*.js'], // Target backend files in the `backend` folder
    languageOptions: {
      globals: {
        node: true, // Define Node.js globals for backend files
      },
    },
    rules: {
      'no-console': 'warn', // Warn on console.log in backend
    },
  },
  // Configuration for frontend files
  {
    files: ['frontend/**/*.js', 'frontend/**/*.jsx'], // Target frontend files in the `frontend` folder
    languageOptions: {
      globals: {
        browser: true, // Define browser globals for frontend files
      },
    },
    rules: {
      'react/jsx-uses-react': 'off', // For React 17 JSX transform compatibility
    },
  },
];
