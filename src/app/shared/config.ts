import {extend} from 'lodash';
import {environment} from '../../environments/environment';

export let CONFIG = {
    // ---------------------------------------------
    // Google api configuration
    // ---------------------------------------------
    google: {
        maps: {
            API_KEY: environment.GOOGLE_MAPS_API_KEY
        },
        firebase: {
            URL: environment.GOOGLE_FIREBASE_SERVER_URL,
            API_KEY: environment.GOOGLE_FIREBASE_SERVER_KEY
        }
    },

    // ---------------------------------------------
    // Used for SAR-Status API
    // ---------------------------------------------
    sar_api: {
        BASE_URL: environment.SAR_STATUS_API_HOST + '/api'
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
};
