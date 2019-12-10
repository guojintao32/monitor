import Vue from 'vue'
import Router from 'vue-router'
import Home from './page/home.vue'
import Detail from './page/detail.vue'
import jsError from './page/jsError.vue';
import httpError from './page/httpError.vue';
import resourceError from './page/resourceError.vue';
Vue.use(Router);

export default new Router({
  mode:'history',
  routes:[
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/jsError',
      name:'jsError',
      component:jsError
    },
    {
      path:'/httpError',
      name:'httpError',
      component:httpError
    },
    {
      path:'/resourceError',
      name:'resourceError',
      component:resourceError
    },{
      path:'/errorDetail',
      name:'errorDetail',
      component:Detail
    }
  ]
})