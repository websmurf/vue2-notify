<template>
  <div :class="'notify-' + options.position" :style="{ width: width}" class="notify">
    <transition-group name="notify" tag="div" @enter="slideDown" @leave="slideUp">
      <div v-for="(item, key) in items" :key="key" class="notify-item">
        <div :class="item.options.itemClass">
          <button v-if="item.options.closeButtonClass" :class="item.options.closeButtonClass"
                  type="button"
                  aria-label="Close"
                  @click="removeItem(key)">
            <span aria-hidden="true">&times;</span>
          </button>
          <span v-if="item.options.iconClass" :class="item.options.iconClass"/>
          <div v-if="item.options.mode === 'html'" v-html="item.text"/>
          <template v-else>{{ item.text }}</template>
        </div>
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
    right: 15px
  .notify-top-left
    position: fixed
    top: 5px
    left: 15px
  .notify-bottom-left
    position: fixed
    bottom: 5px
    width: 300px
    left: 15px
  .notify-bottom-right
    position: fixed
    bottom: 5px
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
  .notify
    z-index: 100
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
        leave: 'slideUp',
        closeButtonClass: false,
        width: '300px',
        mode: 'text',
        permanent: false
      },
      items: {},
      idx: 0
    }
  },
  computed: {
    width () {
      if (this.options.position === 'top-full' || this.options.position === 'bottom-full') {
        return 'auto'
      } else {
        return this.options.width
      }
    }
  },
  methods: {
    setTypes (types) {
      this.types = types
    },
    addItem (type, msg, options) {
      let defaultOptions = {
        iconClass: this.types[type].iconClass,
        itemClass: [this.options.itemClass, this.types[type].itemClass],
        visibility: this.options.visibility,
        mode: this.options.mode,
        closeButtonClass: this.options.closeButtonClass,
        permanent: this.options.permanent
      }
      let itemOptions = Object.assign({}, defaultOptions, options)

      // get idx
      let idx = this.idx

      // check if this message is already shown
      for (let key in this.items) {
        /* istanbul ignore else */
        if (this.items.hasOwnProperty(key)) {
          if (this.items[key].text === msg) {
            return
          }
        }
      }

      // add it to the queue (if it's not already there)
      Vue.set(this.items, this.idx, { type: type, text: msg, options: itemOptions })

      // increment key
      this.idx++

      // remove item if not permanent
      if (itemOptions.permanent === false) {
        // remove item from array
        setTimeout(() => { this.removeItem(idx) }, this.options.duration + itemOptions.visibility)
      }
    },
    slideDown (el) {
      Velocity(el, this.options.enter, {duration: this.options.duration})
    },
    slideUp (el, done) {
      Velocity(el, this.options.leave, {duration: this.options.duration, complete: done})
    },
    removeItem (index) {
      Vue.delete(this.items, index)
    },
    removeAll () {
      this.items = {}
    }
  }
}
</script>
