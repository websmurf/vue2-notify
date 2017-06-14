<template>
  <div class="notify" :class="'notify-' + options.position">
    <transition-group name="notify" tag="div" @enter="slideDown" @leave="slideUp">
      <div v-for="(item, key) in items" :key="key" class="notify-item">
        <div :class="itemClass(item.type)"><span :class="itemIcon(item.type)"></span> {{ item.text }}</div>
      </div>
    </transition-group>
  </div>
</template>
<style lang="sass" scoped>
  .notify-top-full
    position: fixed
    top: 5px
    left: 15px
    right: 15px
    z-index: 9999

  .notify-top-left
    position: fixed
    top: 5px
    width: 300px
    right: 15px
</style>
<script>
  import Vue from 'vue'
  import Velocity from 'velocity-animate'

  export default {
    data () {
      return {
        types: {
          info: { itemClass: 'alert-info', iconClass: 'fa fa-lg fa-info-circle' },
          error: { itemClass: 'alert-danger', iconClass: 'fa fa-lg fa-exclamation-triangle' },
          warning: { itemClass: 'alert-warning', iconClass: 'fa fa-lg fa-exclamation-circle' },
          success: { itemClass: 'alert-success', iconClass: 'fa fa-lg fa-check-circle' }
        },
        options: {
          itemClass: 'alert col-12',
          duration: 500,
          visibility: 2000,
          position: 'top-left'
        },
        items: {}
      }
    },
    methods: {
      itemClass (type) {
        return [this.options.itemClass, this.types[type].itemClass]
      },
      itemIcon (type) {
        return this.types[type].iconClass
      },
      setTypes (types) {
        this.types = types
      },
      addItem (type, msg) {
        // generate unique index
        let idx = new Date().getTime()

        // add it to the queue
        Vue.set(this.items, idx, { type: type, text: msg })

        // remove item from array
        setTimeout(() => { this.removeItem(idx) }, this.options.visibility)
      },
      slideDown (el) {
        Velocity(el, 'slideDown', {duration: this.options.duration})
      },
      slideUp (el, done) {
        Velocity(el, 'slideUp', {duration: this.options.duration, complete: done})
      },
      removeItem (index) {
        Vue.delete(this.items, index)
      }
    }
  }
</script>
