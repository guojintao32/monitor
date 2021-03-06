import Vue from 'vue'
import App from './App.vue'
import router from './router'
import request from './utils/request'
//iview
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
//v-charts
import VeHistogram from 'v-charts/lib/histogram.common';
import VeMap from 'v-charts/lib/map.common';
import moment from 'moment';

[VeHistogram, VeMap].forEach(comp => {
  Vue.component(comp.name, comp);
});
Vue.prototype.$axios = request;
Vue.prototype.$moment = moment;
Vue.config.productionTip = false
Vue.use(ViewUI);

new Vue({
  el: '#app',
  router,
  render: (h) => h(App)
})