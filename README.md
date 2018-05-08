# Notify

[![Build Status](https://travis-ci.org/websmurf/vue2-notify.svg?branch=master)](https://travis-ci.org/websmurf/vue2-notify)
[![Coverage Status](https://coveralls.io/repos/github/websmurf/vue2-notify/badge.svg?branch=master)](https://coveralls.io/github/websmurf/vue2-notify?branch=master)

A simple bootstrap|bulma styled Vue component for notifications. Compatible with Vue 2.x

## Requirements

Required packages:
- vue 2+
- velocity-animate 1.5+

Optional packages:
- bootstrap or bulma (only used for styling)

## Install

```
$ yarn add vue2-notify
```

Then in your main.js:

```js
import Notify from 'vue2-notify'

// Use Notify
Vue.use(Notify)
```

## Usage

Inside your component:

```js
this.$notify('A message that should be displayed', 'type')
```

or

```js
Vue.$notify('A message that should be displayed', 'type')
```

You may use short type call:

```js
this.$notify.success('This is success message');
```

or

```js
Vue.$notify('This is success message');
```

**Bulma users** can call `this.$notify.danger('Error message');`, `this.$notify.danger()` is link to `this.$notify.error()`
## Configuration

| Option            | Type             | Default           | Description
|-------------------|------------------|-------------------|---------------------------------------------------------------------------------------------------------------------------
| itemClass         | String           | 'alert col-12'    | The class that the notification is wrapped in, defaults to the default bootstrap style
| duration          | Integer          | 500               | The amount of milliseconds that the animation should take (slideDown/slideUp, fadeIn/fadeOut)
| visibility        | Integer          | 2000              | The amount of milliseconds that the notification should be visible (if notification __is not permanent__)
| position          | String           | 'top-left'        | The location of the notification, currently possible: `top-left`, `top-right`, `top-full`, `bottom-left`, `bottom-right` and `bottom-full`
| enter             | String           | 'slideDown'       | Entry animation type, currently possible: `slideDown`, `fadeIn`
| leave             | String           | 'slideUp'         | Exit animation type, currently possible: `slideUp`, `fadeOut`
| permanent         | Boolean          | false             | Disable notification auto close
| mode              | String           | 'text'            | Set `'html'` to output real html. Only use HTML interpolation on trusted content and never on user-provided content.
| closeButtonClass  | Boolean / String | false             | Class name for close button. If false - close button will not be displayed. ( Example: set `'delete'` for bulma or `'close'` for bootstrap.)

Configuration options can be provided as options in the Vue.use statement:

```js
// Use Notify
Vue.use(Notify, {visibility: 5000, permanent: true})
```

### Overriding configuration
You can override the ___itemClass___, ___iconClass___, ___visibility___, ___mode___ or ___closeButtonClass___ options on a per usage basis:

```js
this.$notify('A message that should be displayed', 'type', { itemClass: 'alert col-6 alert-info', iconClass: 'fa fa-lg fa-handshake-o', visibility: 10000 })
```

Type should be one of the types defined in the configuration of the component.

## Types

Defines the type of notifications that can be triggered

| Type      | ItemClass         | IconClass                     
|-----------|-------------------|--------------------------------------
| info      | 'alert-info'      | 'fa fa-lg fa-info-circle'     
| error     | 'alert-danger'    | 'fa fa-lg fa-exclamation-triangle'
| warning   | 'alert-warning'   | 'fa fa-lg fa-exclamation-circle'
| success   | 'alert-success'   | 'fa fa-lg fa-check-circle'

You can override the default list of types in the following way, for example to use
glyphicons instead of font awesome icons:

```js
const types = {
  info: { itemClass: 'alert-info', iconClass: 'glyphicons glyphicons-info-sign'},
  ..
  success: { itemClass: 'alert-success', iconClass: 'glyphicons glyphicons-ok'},
}

Vue.$notify.setTypes(types)

```

## Examples

### Using vue2-notify with Bulma

In app.js:
```js
import Notify from 'vue2-notify'
Vue.use(Notify, {
  itemClass: 'notification'
})
const types = {
  info: { itemClass: 'is-info', },
  error: { itemClass: 'is-danger' },
  warning: { itemClass: 'is-warning' },
  success: { itemClass: 'is-success', iconClass: 'fa fa-lg fa-check-circle' }
}

Vue.$notify.setTypes(types);
```
And call `this.$notify` method as usual:
```js
this.$notify('A message that should be displayed', 'info')
```
or
```js
this.$notify.info('A message that should be displayed')
```
### HTML in notification
```js
this.$notify('<p>My HTML <br/>message</p>', 'info', {mode: 'html'})
```
or
```js
this.$notify.error('<p>My HTML <br/>message</p>', {mode: 'html'})
```
### Permanent notification
```js
this.$notify('Permanent message', 'info', {permanent: true})
```
