export let CONFIG = {
    // ---------------------------------------------
    // Used for google maps api
    // ---------------------------------------------
    //
    // Pre-requisites: Google project and api key created with https://console.developers.google.com
    //
    google: {
        API_KEY: process.env.GOOGLE_API_KEY
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
        URL: 'https://fcm.googleapis.com/fcm/send',
        API_KEY: process.env.GOOGLE_FIREBASE_SERVER_KEY
    },
    // ---------------------------------------------
    // Used for SAR-Status API
    // ---------------------------------------------
    sar_api: {
        BASE_URL: (process.env.API_HOST || 'https://sar-status-api.herokuapp.com') + '/api',
    },
    // Used for calendar settings frontend
    flatpickr: {
        enableTime: true,
        defaultDate: 'today',
        altInput: true,
        altFormat: 'j. F Y, H:i',
        time_24hr: true,
        defaultHour: '12',
        defaultMinute: '00',
        minDate: 'today',
        locale: {
            firstDayOfWeek: 1,
            weekdays: {
                shorthand: ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'],
                longhand: ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'],
            },
            months: {
                shorthand: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
                longhand: ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'],
            },
        },
    }
}
