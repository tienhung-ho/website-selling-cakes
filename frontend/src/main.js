import './assets/client/css/reset.css'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/store.js'

import 'bootstrap/dist/css/bootstrap.css';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap';



/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

import '@/assets/admin/scss/reset.scss';

/* add icons to the library */
library.add(faCartShopping, far, fas)

/* Custom sidebar */
import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";

// Import Vue và VueSweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Sử dụng VueSweetalert2 với tùy chọn cấu hình của bạn



import Multiselect from 'vue-multiselect';

import Paginate from 'vuejs-paginate'



const app = createApp(App)

app.component('vue-sidebar-menu-akahon', VueSidebarMenuAkahon)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('multiselect', Multiselect)
app.component('paginate', Paginate)


app
  .use(VueSweetalert2)
  .use(router)
  .use(store)
  .mount('#app')
