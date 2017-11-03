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
    // Create setTypes method
    Vue.$notify.setTypes = Vue.prototype.$notify.setTypes = (types) => {
      Notify.setTypes(types)
    }
    Vue.$notify.removeAll = Vue.prototype.$notify.removeAll = () => {
      Notify.removeAll()
    }
  }
}
