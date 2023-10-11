import Vue from 'vue'
import App from './App.vue'
import MemoBody from './components/MemoBody'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  components: {
    MemoBody
  },
  render: h => h(App),
})