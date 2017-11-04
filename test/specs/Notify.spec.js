import Notify from '../../src/Notify.vue'
import {expect} from 'chai'
import sinon from 'sinon'

describe('notify.vue', function () {
  it('should have a data function that defines default settings', function () {
    // data should be a function
    expect(Notify.data).to.be.a('function')
    const defaultData = Notify.data()

    // Types should exist
    expect(defaultData.types).to.be.a('object')

    // Options should exist and be set
    expect(defaultData.options).to.be.a('object')

    // default values should be set as well
    expect(defaultData.options.itemClass).to.equal('alert col-12')
    expect(defaultData.options.duration).to.equal(500)
    expect(defaultData.options.visibility).to.equal(2000)
    expect(defaultData.options.position).to.equal('top-left')

    // Items should exist and be set
    expect(defaultData.items).to.be.a('object')
  })

  it('should have a setTypes method that overrides the existing type mapping', function () {
    // Create mock list
    Notify.types = {}

    // define new list of items
    let types = {
      info: { itemClass: 'info', iconClass: 'glyphicons glyphicons-info-sign' },
      success: { itemClass: 'alert-success', iconClass: 'glyphicons glyphicons-ok' }
    }

    // Call method logic
    Notify.methods.setTypes.call(Notify, types)

    // Types should be bound to the this context
    expect(Notify.types).to.deep.equal(types)
  })

  it('should have an addItem method that adds an item with default settings to the items list', function () {
    // Use fake timers
    let clock = sinon.useFakeTimers()

    // Create mock list
    Notify.items = {}
    Notify.types = Notify.data().types
    Notify.options = Notify.data().options
    Notify.removeItem = sinon.stub()

    // Call method logic
    Notify.methods.addItem.call(Notify, 'error', 'This is an error message')

    // Items should be set at this point, keyed by the timestamp (zero at this point)
    expect(Notify.items).to.deep.equal({
      0: {
        type: 'error',
        text: 'This is an error message',
        options: {
          iconClass: 'fa fa-lg fa-exclamation-triangle',
          itemClass: ['alert col-12', 'alert-danger'],
          visibility: 2000,
          mode: 'text',
          closeButton: false,
          permanent: false
        }
      }
    })

    // At this point removeItem should not be called
    expect(Notify.removeItem.called).to.equal(false)

    // Move clock forward visibility + duration milliseconds
    clock.tick(5000)

    // Validation
    expect(Notify.removeItem.calledOnce).to.equal(true)
    expect(Notify.removeItem.calledWith(0)).to.equal(true)

    // Restore logic
    clock.restore()
  })

  it('should have an addItem method that adds an item with custom settings to the items list', function () {
    // Use fake timers
    let clock = sinon.useFakeTimers()

    // Create mock list
    Notify.items = {}
    Notify.types = Notify.data().types
    Notify.options = Notify.data().options
    Notify.removeItem = sinon.stub()

    // Call method logic
    Notify.methods.addItem.call(Notify, 'error', 'This is an error message', { iconClass: 'icon', itemClass: 'item', visibility: 10000, mode: 'html', closeButton: 'bulma', permanent: true })
    // Items should be set at this point, keyed by the timestamp (zero at this point)
    console.log(Notify.items[0].options)
    expect(Notify.items).to.deep.equal({0: {
      type: 'error',
      text: 'This is an error message',
      options: { iconClass: 'icon', itemClass: 'item', visibility: 10000, mode: 'html', closeButton: 'bulma', permanent: true }
    }})

    // At this point removeItem should not be called
    expect(Notify.removeItem.called).to.equal(false)

    // Move clock forward visibility + duration milliseconds
    clock.tick(10501)

    // Move clock another second forward
    expect(Notify.removeItem.calledOnce).to.equal(false)
    expect(Notify.removeItem.calledWith(0)).to.equal(false)

    // Restore logic
    clock.restore()
  })

  it('should have a removeItem method that removes an item from the item list', function () {
    // Create mock list
    Notify.items = {1497340433000: {type: 'error', text: 'This is an error message'}}

    // Call method logic
    Notify.methods.removeItem.call(Notify, 1497340433000)

    // Validation
    expect(Notify.items).to.deep.equal({})
  })
})
