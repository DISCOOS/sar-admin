module.export = function(path){
    
    var CONFIG = require(path);
    
    return {
        // ---------------------------------------------
        // Used for google maps api
        // ---------------------------------------------
        //
        // Pre-requisites: Google project and api key created with https://console.developers.google.com
        //
        google: {
            API_KEY: (process.env.GOOGLE_API_KEY || CONFIG.google.API_KEY)
        },
        // ---------------------------------------------
        // Used for push notifications
        // ---------------------------------------------
        //
        // Pre-requisites: Firebase project and server key created with https://console.firebase.google.com
        //
        // See https://github.com/firebase/quickstart-js/tree/master/messaging
        //
        firebase: {
            API_KEY: (process.env.GOOGLE_FIREBASE_SERVER_KEY  || CONFIG.firebase.API_KEY)
        },
        // ---------------------------------------------
        // Used for SAR-Status API
        // ---------------------------------------------
        sar_api: {
            BASE_URL: (process.env.API_HOST ? process.env.API_HOST + '/api' : CONFIG.sar_api.BASE_URL),
        }
        
    }
}
