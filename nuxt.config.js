const colors = require('vuetify/es5/util/colors').default

module.exports = {
  ssr: true,
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: 'EverGrow Coin ($EGC) Prices on Exchanges',
    title: 'EverGrow Coin ($EGC) Prices on Exchanges',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'EverGrow Coin price today on crypto exchanges. EGC token prices updated in real-time (Pancakeswap, BitMart, ZTGlobal, LBank, Bibox, Hotbit, Bitrue, DigiFinex and Coinsbit)' },
      { property: 'og:image', content: 'https://www.egcprice.info/samplepage.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preload', as: 'image', href: '/Grey Dawn.avif' }
    ]
  },
  /*
  ** Prevent telemetry aquisition from nuxt
  */
  telemetry: false,
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/gtag'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    browserBaseURL: process.env.BROWSER_BASE_URL || 'https://www.egcprice.info'
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
        },
        light: {
          primary: '#E91E63',
          secondary: '#9C27b0',
          accent: '#e91e63',
          info: '#00CAE3',
          success: '#4CAF50',
          warning: '#FB8C00',
          error: '#FF5252',
        }
      }
    }
  },
  /*
  ** Serverside middleware
  */
  serverMiddleware: [
    '~/server/routes/router'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
