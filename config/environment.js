/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ember-chess',
    environment: environment,
    baseURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    contentSecurityPolicy: {
      // 'default-src': "'none'",
      // 'script-src': "'self' 'unsafe-eval' 'unsafe-inline' https://*.firebase.com https://*.firebaseio.com",
      // 'font-src': "'self'",
      // 'frame-src': "https://*.firebase.com https://*.firebaseio.com",
      // 'connect-src': "'self' https://api.cloudinary.com res.cloudinary.com https://*.firebase.com https://*.firebaseio.com wss://*.firebaseio.com data:",
      // 'img-src': "'self' res.cloudinary.com api.cloudinary.com data:",
      'style-src': "'self' 'unsafe-inline'",
      // 'media-src': "'self'"
    },


  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
