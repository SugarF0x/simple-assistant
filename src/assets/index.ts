// TODO: add profile comment copy-pasta, that being an editable message you can auto paste on one's profile
/* TODO: add gift assistant
     when pressing 'send item' it would remember level of the recipient
     and automatically sort things by a +-5 level margin of said player
*/
/* TODO: add full options page
     add button to top-right cornet of display that would lead to
     lets say https://web.simple-mmo.com/simpleassistant
     where the page would get fully replaced by one large card
     with all the available settings for all modules
     so that one could edit then without accessing said pages
     in the first place
       that would be good for them pages with isAuto: true
 */
/* TODO: add market assistant
     that would buy set amount of cheapest items
     for daily tasks
*/

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
      { path: '/jobs/*',          component: Job },
      { path: '/quests/viewall',  component: Quests },
      { path: '/travel',          component: Travel },
    ],
  }),
  render: h => h(App),
});
