# Notify

A simple bootstrap styled Vue component for notifications. Compatible with Vue 2.x

## Install

```
$ npm install vue2-notify --save
```

Then in your main.js:

```
import Notify from '../src/notify'

// Use Notify
Vue.use(Notify)
```

## Usage

Inside your component:

```
this.$notify('A message that should be displayed', 'type')
```

or

```
Vue.$notify('A message that should be displayed', 'type')
```


Type should be one of the types defined in the configuration of the component.

## Configuration

| Option            | Type          | Default           | Description     
|-------------------|---------------|-------------------|-----------------------------------------------------------------------------------------
| itemClass         | String        | 'alert col-12'    | The class that the notification is wrapped in, defaults to the default bootstrap style
| duration          | Integer       | 500               | The amount of milliseconds that the animation should take (slideDown, slideUp) 
| visibility        | Integer       | 2000              | The amount of milliseconds that the notification should be visible
| position          | String        | 'top-left'        | The location of the notification, currently possible: `top-left` or `top-full`


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

```
const types = {
  info: { itemClass: 'alert-info', iconClass: 'glyphicons glyphicons-info-sign'},
  ..
  success: { itemClass: 'alert-success', iconClass: 'glyphicons glyphicons-ok'},
}

Vue.$notify.setTypes(types)

```