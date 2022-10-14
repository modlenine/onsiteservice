import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import 'popper.js';
import 'bootstrap';

import 'datatables.net-bs4';
import 'moment';

import "zebra_datepicker/dist/css/default/zebra_datepicker.min.css";
import "zebra_datepicker/dist/zebra_datepicker.min.js";

import 'highcharts';
import 'highcharts/modules/drilldown.js';


Vue.config.productionTip = false

new Vue({
  router,
  store,
  VueSweetalert2,
  render: h => h(App)
}).$mount('#app')
