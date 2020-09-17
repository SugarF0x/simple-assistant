import Vue from 'vue'
import App from './App.vue'

let stats = document.getElementsByClassName('kt-container')[1].children[0];
let display = document.createElement('div');
    display.id = 'app';
stats.after(display);

new Vue({
  el: '#app',
  render: h => h(App)
})