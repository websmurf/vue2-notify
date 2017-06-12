'use strict'
import VueNotify from './notify.vue'

export default {
  install (Vue, options = {}) {
    // Create component instance
    let Constr = Vue.extend(VueNotify)
    let Notify = new Constr()

    // Mount it
    let vm = Notify.$mount()

    // Add it to the Vue application
    document.querySelector('body').appendChild(vm.$el)

    // Create generic method
    Vue.$notify = Vue.prototype.$notify = (msg, type = 'info') => {
      Notify.addItem(type, msg)
    }
  }
}
