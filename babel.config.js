module.exports = {
  presets: [
    '@babel/react',
    [
      '@babel/preset-env',
      {
        modules: false,
        loose: true,
        exclude: [
          'transform-named-capturing-groups-regex',
          'proposal-optional-catch-binding',
          'proposal-json-strings',
          'transform-async-to-generator',
          '@babel/plugin-transform-regenerator',
          'proposal-async-generator-functions',
        ],
        debug: true,
        targets: {
          browsers: ['last 2 versions', 'not dead'],
        },
      },
    ],
  ],
};
