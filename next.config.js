const { withSentryConfig } = require('@sentry/nextjs')

// https://nextjs.org/docs/advanced-features/security-headers
// https://securityheaders.com to test security header score
const ContentSecurityPolicy = `
  default-src data: 'unsafe-inline' 'unsafe-eval' https:;
`

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()'}, // browsing-topics=()}
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-XSS-Protection', value: '1; mode=block' }, // optional, mostly for legacy browsers
  { key: 'Referrer-Policy', value: 'no-referrer-when-downgrade' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  },
]

const moduleExports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },

  async headers() {
    const isDev = process.env.NODE_ENV === 'development'

    if (!isDev) {
      return [{
        // Apply these headers to all routes.
        source: '/:path*', headers: securityHeaders,
      }]
    } else {
      return [] // set no headers in dev. Comment if testing the above
    }
  },

  sentry: {
    // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
    // for client-side builds. (This will be the default starting in
    // `@sentry/nextjs` version 8.0.0.) See
    // https://webpack.js.org/configuration/devtool/ and
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
    // for more information.
    hideSourceMaps: true,
  },

  poweredByHeader: false,
}

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}


// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports =
    process.env.NODE_ENV === "production"
        ? withSentryConfig(moduleExports, sentryWebpackPluginOptions)
        : moduleExports
