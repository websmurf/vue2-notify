'use strict'

import { shallow, mount } from '@vue/test-utils'
import Notify from 'src/Notify'

jest.useFakeTimers()

describe('Notify.vue', () => {
  const defaultTypes = {
    info: { itemClass: 'alert-info', iconClass: 'fa fa-lg fa-info-circle' },
    error: { itemClass: 'alert-danger', iconClass: 'fa fa-lg fa-exclamation-triangle' },
    warning: { itemClass: 'alert-warning', iconClass: 'fa fa-lg fa-exclamation-circle' },
    success: { itemClass: 'alert-success', iconClass: 'fa fa-lg fa-check-circle' }
  }

  it('should have a data function that defines default settings', () => {
    // Create component
    const wrapper = shallow(Notify)

    // Types should exist
    expect(wrapper.vm.types).toEqual(defaultTypes)

    // Options should exist and be set
    expect(wrapper.vm.options).toEqual({
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
    })

    // Items should exist and be set
    expect(wrapper.vm.items).toEqual({})
  })

  it('has a width computed property that calculates the with based on the position', () => {
    // Create component
    const wrapper = shallow(Notify)

    // Check width
    expect(wrapper.vm.width).toBe('300px')

    // Set new value
    wrapper.setData({
      options: {
        position: 'top-full'
      }
    })

    // Check width
    expect(wrapper.vm.width).toBe('auto')

    // Set new value
    wrapper.setData({
      options: {
        position: 'bottom-full'
      }
    })

    // Check width
    expect(wrapper.vm.width).toBe('auto')
  })

  it('has a setType method that overwrites the existing array', () => {
    // Create component
    const wrapper = shallow(Notify)

    // This should be the default set
    expect(wrapper.vm.types).toEqual(defaultTypes)

    const types = {
      info: { itemClass: 'is-info', },
      error: { itemClass: 'is-danger' },
      warning: { itemClass: 'is-warning' },
      success: { itemClass: 'is-success', iconClass: 'fa fa-lg fa-check-circle' }
    }

    // Call function
    wrapper.vm.setTypes(types)

    expect(wrapper.vm.types).toEqual(types)
  })

  it('should have an addItem method that adds an item with default settings to the items list', () => {
    // Create component
    const wrapper = shallow(Notify)

    // Call method logic
    wrapper.vm.addItem.call(Notify, 'error', 'This is an error message')
    wrapper.vm.addItem.call(Notify, 'info', 'This is an info message')

    expect(wrapper.vm.items).toEqual({
      0: {
        type: 'error',
        text: 'This is an error message',
        options: {
          iconClass: 'fa fa-lg fa-exclamation-triangle',
          itemClass: ['alert col-12', 'alert-danger'],
          visibility: 2000,
          mode: 'text',
          closeButtonClass: false,
          permanent: false
        }
      },
      1: {
        type: 'info',
        text: 'This is an info message',
        options: {
          iconClass: 'fa fa-lg fa-info-circle',
          itemClass: ['alert col-12', 'alert-info'],
          visibility: 2000,
          mode: 'text',
          closeButtonClass: false,
          permanent: false
        }
      }
    })

    // Move timer forward
    jest.advanceTimersByTime(2500);

    // Should be empty now
    expect(wrapper.vm.items).toEqual({})
  })

  it('should have an addItem method that adds an item with custom settings to the items list', () => {
    // Create component
    const wrapper = shallow(Notify)

    // Stub out removeItem
    wrapper.vm.removeItem = jest.fn()

    // Call method logic
    wrapper.vm.addItem.call(Notify, 'error', 'This is an error message', { iconClass: 'icon', itemClass: 'item', visibility: 10000, mode: 'html', closeButtonClass: 'bulma', permanent: true })

    expect(wrapper.vm.items).toEqual({
      0: {
        type: 'error',
        text: 'This is an error message',
        options: {
          iconClass: 'icon',
          itemClass: 'item',
          visibility: 10000,
          mode: 'html',
          closeButtonClass: 'bulma',
          permanent: true
        }
      }
    })

    // Move timer forward
    jest.advanceTimersByTime(10500);

    // Remove should not be not be called on permanent items
    expect(wrapper.vm.items).toEqual({
      0: {
        type: 'error',
        text: 'This is an error message',
        options: {
          iconClass: 'icon',
          itemClass: 'item',
          visibility: 10000,
          mode: 'html',
          closeButtonClass: 'bulma',
          permanent: true
        }
      }
    })
  })

  it('should have an addItem method that doesn\'t add an item if the item already exists', () => {
    // Create component
    const wrapper = shallow(Notify)

    // Stub out removeItem
    wrapper.vm.removeItem = jest.fn()

    // Call method logic
    wrapper.vm.addItem.call(Notify, 'error', 'This is an error message')
    wrapper.vm.addItem.call(Notify, 'error', 'This is an error message')
    wrapper.vm.addItem.call(Notify, 'error', 'This is an error message')
    wrapper.vm.addItem.call(Notify, 'error', 'This is an error message')

    expect(wrapper.vm.items).toEqual({
      0: {
        type: 'error',
        text: 'This is an error message',
        options: {
          iconClass: 'fa fa-lg fa-exclamation-triangle',
          itemClass: ['alert col-12', 'alert-danger'],
          visibility: 2000,
          mode: 'text',
          closeButtonClass: false,
          permanent: false
        }
      }
    })
  })

  it('should have a removeAll method that clears the messages list', () => {
    // Create component
    const wrapper = shallow(Notify)

    // Create items list
    wrapper.setData({
      items: {
        0: {
          type: 'error',
          text: 'This is an error message',
          options: {
            iconClass: 'fa fa-lg fa-exclamation-triangle',
            itemClass: ['alert col-12', 'alert-danger'],
            visibility: 2000,
            mode: 'text',
            closeButtonClass: false,
            permanent: false
          }
        },
        1: {
          type: 'error',
          text: 'This is an error message',
          options: {
            iconClass: 'fa fa-lg fa-exclamation-triangle',
            itemClass: ['alert col-12', 'alert-danger'],
            visibility: 2000,
            mode: 'text',
            closeButtonClass: false,
            permanent: false
          }
        }
      }
    })

    // Call method
    wrapper.vm.removeAll()

    // Items should be empty
    expect(wrapper.vm.items).toEqual({})
  })

  it('renders an empty notify element correctly', () => {
    // Create component
    const wrapper = mount(Notify)

    // Validations
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders a notification correctly', () => {
    // Create component
    const wrapper = mount(Notify)

    // Call method logic
    wrapper.vm.addItem.call(Notify, 'info', 'This is an info message')

    // Validations
    expect(wrapper.html()).toMatchSnapshot()
  })
})
