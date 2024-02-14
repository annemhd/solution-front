// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@element-plus/nuxt',
    // 'nuxt-vuefire'
  ],
  // vuefire: {
  //   auth: {
  //     enabled: true
  //   },
  //   config: {
  //     apiKey: 'AIzaSyApWZJ37QQV9gVaItSf9naPJn69xD4q4gY',
  //     authDomain: 'solution-cloud-dd932.firebaseapp.com',
  //     projectId: 'solution-cloud-dd932',
  //     appId: '853369724688',
  //     // there could be other properties depending on the project
  //   },
  //   appCheck: {
  //     // Allows you to use a debug token in development
  //     debug: process.env.NODE_ENV !== 'production',
  //     isTokenAutoRefreshEnabled: true,
  //     provider: 'ReCaptchaV3',
  //     // Find the instructions in the Firebase documentation, link above
  //     key: 'AIzaSyApWZJ37QQV9gVaItSf9naPJn69xD4q4gY',
  //   },
  // },
})
