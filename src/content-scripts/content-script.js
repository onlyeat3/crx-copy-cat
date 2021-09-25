import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from '../views/Content';

const div = document.createElement("div")
document.documentElement.append(div);

Vue.use(ElementUI);

new Vue({
  el: div,
  render: h => { return h(App); }
});