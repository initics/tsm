module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'node',
        'jest'
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    rules: {
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        indent: ['error', 4, { 'SwitchCase': 1 }],
        'array-bracket-spacing': 'off',
        'arrow-spacing': 'error',
        'space-before-function-paren': 'off',
        'padded-blocks': 'off',
        'brace-style': [
            'error',
            'stroustrup',
            { 'allowSingleLine': true }
        ],
        '@typescript-eslint/ban-ts-comment': 'off'
    }
};
