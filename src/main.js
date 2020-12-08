import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import VueVirtualScroller from 'vue-virtual-scroller'

import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.$eventHub = new Vue();
Vue.use(VueCompositionAPI);
Vue.use(VueVirtualScroller)

new Vue({
  render: h => h(App),
}).$mount('#app')
