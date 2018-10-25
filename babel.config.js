module.exports = {
  presets: [
    '@babel/react',
    [
      '@babel/preset-env',
      {
        modules: false,
        debug: true,
        targets: {
          // see which browsers this supports here: http://browserl.ist/?q=%3E0.25%25%2Cchrome+41
          // we support Chrome 41 as it's what they currently use for SEO crawling
          browsers: ['>0.25%'],
        },
      },
    ],
  ],
};
