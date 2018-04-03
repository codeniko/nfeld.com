require('babel-register')

require.extensions['.css'] = function () {
  return null
}

const Sitemap = require('react-router-sitemap')
const routes = require('../src/routes')

new Sitemap.default(routes)
  .build('https://www.nfeld.com')
  .save('./build/sitemap.xml')
