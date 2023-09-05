import svgLoader from "vite-svg-loader";

// i18n setup
const AVAILABLE_LOCALES = ["it", "de"];
const DEFAULT_LOCALE = AVAILABLE_LOCALES[0];

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/apollo", "@nuxt/image-edge", "@nuxtjs/i18n"],

  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700;900&display=swap",
        },
      ],
      noscript: [{ children: "Javascript is required" }],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  typescript: {
    shim: false,
  },

  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  components: [
    {
      path: "~/components/",
      pathPrefix: false,
    },
  ],

  apollo: {
    clients: {
      default: {
        httpEndpoint:
          process.env.GRAPHQL_HTTP_ENDPOINT || "http://localhost:4000/graphql",
        browserHttpEndpoint: process.env.GRAPHQL_BROWSER_HTTP_ENDPOINT,
      },
    },
  },

  hooks: {
    "webpack:config": (configs) => {
      configs.forEach((config) => {
        const svgRule = config.module.rules.find(
          (rule: { test: { test: (arg0: string) => any } }) =>
            rule.test.test(".svg")
        );
        svgRule.test = /\.(png|jpe?g|gif|webp)$/;
        config.module.rules.push({
          test: /\.svg$/,
          oneOf: [
            {
              resourceQuery: /inline/,
              loader: "file-loader",
              query: {
                name: "static/image/[name].[hash:8].[ext]",
              },
            },
            {
              loader: "vue-svg-loader",
              options: {
                // Optional svgo options
                svgo: {
                  plugins: [{ removeViewBox: false }],
                },
              },
            },
          ],
        });
      });
    },
  },

  i18n: {
    locales: AVAILABLE_LOCALES.map((localeName) => ({
      code: localeName,
      file: localeName + ".json",
    })),
    lazy: true,
    langDir: "locales",
    defaultLocale: DEFAULT_LOCALE,
    strategy: "prefix_except_default",
    vueI18n: {
      legacy: false,
      locale: DEFAULT_LOCALE,
      messages: {},
    },
  },

  /* nitro: {
    devProxy: {
      "/api/text": {
        target: process.env.PUBLIC_API_HTTP_ENDPOINT,
        changeOrigin: true,
        ignorePath: true,
        cookieDomainRewrite: true,
        followRedirects: true,
      },
    },
  }, NOTE: nitro proxy is not available in production. In case it's necessary to implement a proxy with Nuxt 3, see https://github.com/nuxt-alt/proxy */

  vite: {
    /* server: {
      proxy: {
        "/api/text": {
          target: process.env.PUBLIC_API_HTTP_ENDPOINT,
          changeOrigin: true,
          ignorePath: true,
          followRedirects: true,
        },
      },
    }, NOTE: not working, see here: https://github.com/nuxt/nuxt/issues/13998 */

    plugins: [
      svgLoader({
        /* NOTE: add here optional config */
      }),
    ],
  },

  runtimeConfig: {
    public: {
      PUBLIC_API_HTTP_ENDPOINT: process.env.PUBLIC_API_HTTP_ENDPOINT,
      PUBLIC_VISIT_COUNT_API_HTTP_ENDPOINT:
        process.env.PUBLIC_VISIT_COUNT_API_HTTP_ENDPOINT,
    },
  },

  telemetry: false,
});
