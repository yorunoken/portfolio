// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    modules: ["@nuxt/eslint", "@nuxtjs/device"],
    vite: {
        server: {
            allowedHosts: ["demo.yorunoken.com", "yorunoken.com"]
        }
    },
    app: {
        head: {
            link: [{
                rel: 'stylesheet',
                href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
                crossorigin: 'anonymous',
            }],
            script: [
              {
                src: 'https://umami.yorunoken.com/script.js',
                defer: true,
                'data-website-id': 'de3aa471-a055-45e5-ae3e-e4521b6746b5'
              }
            ]
        }
    }
});