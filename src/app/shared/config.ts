export let CONFIG = {
    google: {
        API_KEY: 'AIzaSyBYzGTxVG0t0RYu0-IFlqFbp9x4PjLUl_E'
    },
    headers: {
        token: ''
    },
    urls: {
        baseUrl: 'https://sar-api.herokuapp.com/api',
        missionsUrl: 'https://sar-api.herokuapp.com/api/missions'
    },
    flatpickr: {
        enableTime: true,
        defaultDate : "today",
        altInput: true,
        altFormat: "j. F Y, H:m",
        time_24hr: true,
        defaultHour : "12",
        defaultMinute : "00",
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