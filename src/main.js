import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import VueVirtualScroller from 'vue-virtual-scroller'
import { Plugin } from 'vue-fragment'

import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.$eventHub = new Vue();
Vue.use(VueCompositionAPI);
Vue.use(VueVirtualScroller)
Vue.use(Plugin);

new Vue({
  render: h => h(App),
}).$mount('#app')
