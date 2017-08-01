export let CONFIG = {
    // Used for google maps
    google: {
        API_KEY: process.env.GOOGLE_API_KEY || 'AIzaSyBYzGTxVG0t0RYu0-IFlqFbp9x4PjLUl_E'
    },
    // Currently not in use
    ionic: {
        API_URL: 'https://api.ionic.io',
        API_TOKEN:  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzN2FjZmZmZS00OWEwLTQxYTctOTc2YS00MTRiZDI3MmM1NjkifQ.ugeTWngk5wfI_If0zvqfXw-Kvrk3_-dNbNeXklOulks',
        API_PROFILE: 'sar_ionic_services'
    },
    // Used for push notifications
    firebase: {
        URL: 'https://fcm.googleapis.com/fcm/send',
        API_KEY: 'AAAA0yMxNS4:APA91bHsbIIiGpre3JS0KWzvoPgbGw5ztUguylTgkG5qSHeWxMKtiqbqebmWSfsp41INj5ncBDj8cB7zUvE-PosUHGr-WO3Pc8bAipWzVl5nlR4WBvjOG3ytc9kI8QD01G6FJ2A-CbrV'
    },
    // Used for SAR-Status API
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
