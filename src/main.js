import Vue from 'vue';
import App from './App';
import DokkuAppsList from './components/DokkuAppsList';
import DokkuAppDetails from './components/DokkuAppDetails';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  history: true,
}).map({
  '/apps/:name': {
    component: DokkuAppDetails,
  },
  '*': {
    component: DokkuAppsList,
  },
});

router.start(App, '#app');

/* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App },
// });
