module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended', // if using TypeScript
        'plugin:mdx/recommended', // Add this for MDX support
    ],
    parser: '@typescript-eslint/parser', // if using TypeScript
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint', // if using TypeScript
    ],
    rules: {
        // Place to specify ESLint rules - can be used to overwrite rules specified from the extended configs
        // e.g., 'linebreak-style': ['error', 'unix']
    },
    overrides: [
        {
            files: ['*.mdx'], // Target MDX files specifically
            rules: {
                'semi': 'off', // Example of overriding a rule for MDX files
                // Add other MDX-specific rules or overrides here
            },
        },
    ],
};
