module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'airbnb',
  ],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
  },
};
