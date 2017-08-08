declare let env: any;

export const config = {

    // ---------------------------------------------
    // Used for google maps api
    // ---------------------------------------------
    //
    // Pre-requisites: Google project and api key created with https://console.developers.google.com
    //
    GOOGLE_MAPS_API_KEY: env.GOOGLE_MAPS_API_KEY || undefined,

    // ---------------------------------------------
    // Used for push notifications
    // ---------------------------------------------
    //
    // Pre-requisites: Firebase project and server key created with https://console.firebase.google.com
    //
    // See https://github.com/firebase/quickstart-js/tree/master/messaging
    //
    GOOGLE_FIREBASE_SERVER_URL: 'https://fcm.googleapis.com/fcm/send',
    GOOGLE_FIREBASE_SERVER_KEY: env.GOOGLE_FIREBASE_SERVER_KEY || undefined,


    // ---------------------------------------------
    // SAR Status api endpoint
    // ---------------------------------------------
    //
    SAR_STATUS_API_HOST: env.SAR_STATUS_API_HOST || 'http://sar-status-api.heroku.com'
};