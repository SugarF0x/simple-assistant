import Vue       from 'vue';
import VueRouter from 'vue-router';
import App       from './App.vue';

import Arena      from './modules/Arena.vue';
import Battle     from './modules/Battle.vue';
import Gamble5050 from './modules/Gamble5050.vue';
import Home       from './modules/Home.vue';
import Job        from './modules/Job.vue';
import Quests     from './modules/Quests.vue';
import Travel     from './modules/Travel.vue';

Vue.use(VueRouter);
// TODO: add Vuex for every variable management

let stats   = document.getElementsByClassName('kt-container')[1].children[0];
let display = document.createElement('div');
display.id  = 'app';
stats.after(display);

new Vue({
  el:     '#app',
  router: new VueRouter({
    mode: 'history',
    routes: [
      { path: '/battlearena',     component: Arena },
      { path: '/npcs/attack/*',   component: Battle },
      { path: '/gamecentre/5050', component: Gamble5050 },
      { path: '/',                component: Home },
      { path: '/home',            component: Home },
      { path: '/job',             component: Job },
      { path: '/quests/viewall',  component: Quests },
      { path: '/travel',          component: Travel },
    ],
  }),
  render: h => h(App),
});
