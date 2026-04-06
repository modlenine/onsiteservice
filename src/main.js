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

Vue.mixin({
  methods: {
    getUrl(){
      if(typeof window !== "undefined"){
          // Development: ใช้ relative path (proxy จะจัดการ)
          // Production: ใช้ absolute URL
          if (process.env.NODE_ENV === 'development') {
              return '/';
          } else {
              // Production: รวม port ด้วย (สำหรับทดสอบบน localhost:8080)
              const port = window.location.port ? ':' + window.location.port : '';
              return window.location.protocol + "//" + window.location.hostname + port + "/";
          }
      }
    },
    baseUrl(){
      switch (process.env.NODE_ENV) {
          case 'production': return '/intsys/onsiteservice/'
          case 'development': return '/'
          default: return ''
      }
    },
    formValidate()
    {
      window.addEventListener('click', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
            Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
                }, false);
            });
        }, false);
    },
    numberWithCommas(x) {
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
    conAreaidToFullname(dataareaid){
      if(dataareaid != ""){
        let fullname = '';
        switch(dataareaid){
          case "sln":
              fullname = "Salee Colour";
              break;
          case "ca":
              fullname = "Composite Asia";
              break;
          case "st":
              fullname = "Subterra";
              break;
          case "tbb":
              fullname = "The bubbles";
              break;
        }

        return fullname;
      }
    },
    getSessionStorage(){
      const getUserData = localStorage.getItem("userData");
      return getUserData ? JSON.parse(getUserData) : null;
    },
    
  },
  
});

new Vue({
  router,
  store,
  VueSweetalert2,
  render: h => h(App)
}).$mount('#app')
