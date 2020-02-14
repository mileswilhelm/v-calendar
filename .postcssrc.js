const postcssPresetEnv = require('postcss-preset-env');
const tailwindcss = require('tailwindcss');
const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    tailwindcss('./tailwind.config.js'),
    postcssPresetEnv({
      browsers: 'ie 10'
    }),
    require('autoprefixer'),
    require('postcss-css-variables'),
    process.env.NODE_ENV === 'production'
      ? purgecss({
          content: ['./src/**/*.vue', './src/**/*.js'],
          extractors: [
            {
              extractor: class {
                static extract(content) {
                  return content.match(/[A-Za-z0-9-_:/]+/g) || [];
                }
              },
              extensions: ['vue', 'js'],
            },
          ],
          whitelistPatterns: [/vc-text/, /vc-bg/, /vc-border/, /^vc-rounded/],
        })
      : '',
  ],
};
