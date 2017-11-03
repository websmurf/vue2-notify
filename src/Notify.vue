<template>
  <div class="notify" :class="'notify-' + options.position">
    <transition-group name="notify" tag="div" @enter="slideDown" @leave="slideUp">
      <div v-for="(item, key) in items" :key="key" class="notify-item">
        <div :class="item.options.itemClass">
          <span :class="item.options.iconClass" v-if="item.options.iconClass"></span> {{ item.text }}</div>
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
  .notify-bottom-full
    position: fixed
    bottom: 5px
    left: 15px
    right: 15px
    z-index: 9999
  .notify-top-right
    position: fixed
    top: 5px
    width: 300px
    right: 15px
  .notify-top-left
    position: fixed
    top: 5px
    width: 300px
    left: 15px
  .notify-bottom-left
    position: fixed
    bottom: 5px
    width: 300px
    left: 15px
  .notify-bottom-right
    position: fixed
    bottom: 5px
    width: 300px
    right: 15px
  .notify-top-full,
  .notify-top-right,
  .notify-top-left
    .notify-item
      &:not(:last-child)
        margin-bottom: 5px
  .notify-bottom-full,
  .notify-bottom-right,
  .notify-bottom-left
    .notify-item
      &:not(:first-child)
        margin-top: 5px
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
          position: 'top-left',
          enter: 'slideDown',
          leave: 'slideUp'
        },
        items: {}
      }
    },
    methods: {
      setTypes (types) {
        this.types = types
      },
      addItem (type, msg, options) {
        let itemOptions = Object.assign({}, { iconClass: this.types[type].iconClass, itemClass: [this.options.itemClass, this.types[type].itemClass], visibility: this.options.visibility }, options)

        // generate unique index
        let idx = new Date().getTime()

        // add it to the queue
        Vue.set(this.items, idx, { type: type, text: msg, options: itemOptions })

        // remove item from array
        setTimeout(() => { this.removeItem(idx) }, this.options.duration + itemOptions.visibility)
      },
      slideDown (el) {
        Velocity(el, this.options.enter, {duration: this.options.duration})
      },
      slideUp (el, done) {
        Velocity(el, this.options.leave, {duration: this.options.duration, complete: done})
      },
      removeItem (index) {
        Vue.delete(this.items, index)
      }
    }
  }
</script>
