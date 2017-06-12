"use strict"

import Vue from 'vue'
import Notify from '../src/notify'

Vue.use(Notify)

/* eslint-disable no-new */
new Vue({
  template: '<div>' +
  '<button class="btn btn-danger mr-1" @click="error">Error</button>' +
  '<button class="btn btn-info mr-1" @click="info">Info</button>' +
  '<button class="btn btn-success" @click="success">Success</button>' +
  '</div>',
  methods: {
    error () {
      this.$notify('This is an error message', 'error')
    },
    info () {
      this.$notify('This is an informational message', 'info')
    },
    success () {
      this.$notify('This is a success message', 'success')
    }
  }
}).$mount('#app')