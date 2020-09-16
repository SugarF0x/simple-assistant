import Vue from 'vue'
import App from './App.vue'
import * as $ from "jquery";

let stats = $('.kt-container')[1].children[0];
let display = $('<div>')
  .addClass('kt-portlet')
  .attr('id','app')
  .insertAfter(stats);

new Vue({
  el: '#app',
  render: h => h(App)
})