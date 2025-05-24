// eslint.config.js
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

// mimic CommonJS variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a require function for CommonJS modules
const require = createRequire(import.meta.url);

// Load the .eslintrc.cjs file
const eslintrcContent = require('./.eslintrc.cjs');

const compat = new FlatCompat({
    baseDirectory: __dirname,
    resolvePluginsRelativeTo: __dirname // To help find plugins referenced in .eslintrc.cjs
});

export default [
    // Translate .eslintrc.cjs content
    ...compat.config(eslintrcContent).map(config => ({
        ...config,
        files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'], // Ensure it applies to relevant files
        ignores: [
            'node_modules/**',
            '.bundle/**',
            'android/**',
            'ios/**',
            'eslint.config.js', // Ignore this file itself
            'babel.config.js',
            'metro.config.js',
            'jest.config.js'
        ]
    }))
];
