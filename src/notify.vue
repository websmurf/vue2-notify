<template>
  <div class="notify">
    <transition-group name="notify" tag="div" @enter="slideDown" @leave="slideUp">
      <div v-for="(item, key) in items" :key="key" class="notify-item">
        <div :class="itemClass(item.type)"><span :class="itemIcon(item.type)"></span> {{ item.text }}</div>
      </div>
    </transition-group>
  </div>
</template>
<style lang="sass">
  .notify
    position: fixed
    top: 5px
    left: 15px
    right: 15px
</style>
<script>
  import Vue from 'vue'
  import Velocity from 'velocity-animate'

  export default {
    data () {
      return {
        options: {
          itemClass: 'alert col-12',
          duration: 500,
          visibility: 2000,
          types: {
            info: { itemClass: 'alert-info', iconClass: 'fa fa-info-circle' },
            error: { itemClass: 'alert-danger', iconClass: 'fa fa-exclamation-circle' },
            success: { itemClass: 'alert-success', iconClass: 'fa fa-info-circle' }
          }
        },
        items: {}
      }
    },
    methods: {
      itemClass (type) {
        return [this.options.itemClass, this.options.types[type].itemClass]
      },
      itemIcon (type) {
        return this.options.types[type].iconClass
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
