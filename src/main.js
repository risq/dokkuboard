import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import AppsList from './components/AppsList';
import AppDetails from './components/AppDetails';

Vue.use(VueRouter);

const router = new VueRouter({
  history: true,
}).map({
  '/apps/:name': {
    component: AppDetails,
  },
  '*': {
    component: AppsList,
  },
});

router.start(App, '#app');

/* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App },
// });
