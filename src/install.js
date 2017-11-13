import VueNotify from './Notify.vue'

export default {
  install (Vue, options = {}) {
    // Create component instance
    let Constr = Vue.extend(VueNotify)
    let Notify = new Constr()

    // Apply configuration
    Notify.options = Object.assign(Notify.options, options)

    // Mount it
    let vm = Notify.$mount()

    // Add it to the Vue application
    document.querySelector('body').appendChild(vm.$el)

    // Create generic method
    Vue.$notify = Vue.prototype.$notify = (msg, type = 'info', options = {}) => {
      Notify.addItem(type, msg, options)
    }
    Vue.$notify.info = Vue.prototype.$notify.info = (msg, options = {}) => {
      Notify.addItem('info', msg, options)
    }
    Vue.$notify.success = Vue.prototype.$notify.success = (msg, options = {}) => {
      Notify.addItem('success', msg, options)
    }
    Vue.$notify.error =
      Vue.prototype.$notify.error =
        Vue.$notify.danger =
          Vue.prototype.$notify.danger = (msg, options = {}) => {
            Notify.addItem('error', msg, options)
          }
    Vue.$notify.warning = Vue.prototype.$notify.warning = (msg, options = {}) => {
      Notify.addItem('warning', msg, options)
    }
    // Create setTypes method
    Vue.$notify.setTypes = Vue.prototype.$notify.setTypes = (types) => {
      Notify.setTypes(types)
    }
    Vue.$notify.removeAll = Vue.prototype.$notify.removeAll = () => {
      Notify.removeAll()
    }
  }
}
