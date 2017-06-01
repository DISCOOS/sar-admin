export let CONFIG = {
    // Used for google maps
    google: {
        API_KEY: 'AIzaSyBYzGTxVG0t0RYu0-IFlqFbp9x4PjLUl_E'
    },
    // Used for push notifications
    ionic: {
        API_URL: 'https://api.ionic.io',
        API_TOKEN:  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzN2FjZmZmZS00OWEwLTQxYTctOTc2YS00MTRiZDI3MmM1NjkifQ.ugeTWngk5wfI_If0zvqfXw-Kvrk3_-dNbNeXklOulks'
    },
    // Used for SAR-API
    urls: {
        baseUrl: 'https://sar-api.herokuapp.com/api',
        missionsUrl: 'https://sar-api.herokuapp.com/api/missions'
    },
    // Used for calendar settings frontend
    flatpickr: {
        enableTime: true,
        defaultDate: "today",
        altInput: true,
        altFormat: "j. F Y, H:i",
        time_24hr: true,
        defaultHour: "12",
        defaultMinute: "00",
        minDate: "today",
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
