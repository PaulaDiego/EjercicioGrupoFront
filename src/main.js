import Vue from 'vue'
import App from './App.vue'

window.SERVER = "http://10.60.23.26:50514"; // Ruben
//window.SERVER = "http://10.60.23.11:50514"; //Paula

new Vue({
  el: '#app',
  render: h => h(App)
})
