import Vue from 'vue';
import App from '../views/Content';
const div = document.createElement("div")
document.body.insertBefore(div, document.body.firstChild);

new Vue({
  el: div,
  render: h => { return h(App); }
});