module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    // https://www.5axxw.com/wiki/content/c3wa5h
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser', // 使用 TypeScript 解析器
  plugins: [
    // 'react',
    '@typescript-eslint',
    'import',
    'unused-imports',
  ], // 启用 TypeScript 插件
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-vars': 'warn',
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'import/order': [
      'error',
      {
        // groups: [['builtin', 'external', 'internal']],
        'newlines-between': 'always',
      },
    ],
    'unused-imports/no-unused-imports': 'error',
  },
  settings: {
    // 'import/resolver': {
    //   node: {
    //     extensions: ['.js', '.jsx', '.ts', '.tsx'],
    //     moduleDirectory: ['node_modules', 'src'],
    //   },
    // },
  },
}
