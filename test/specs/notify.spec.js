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

  it('should have an itemClass method that returns the class that should be applied to the item based on the provided type', function () {
    // Extract default data
    const defaultData = Notify.data()

    // Create local mapping
    Notify.types = defaultData.types
    Notify.options = defaultData.options

    // Validation
    expect(Notify.methods.itemClass.call(Notify, 'info')).to.deep.equal(['alert col-12', 'alert-info'])
    expect(Notify.methods.itemClass.call(Notify, 'error')).to.deep.equal(['alert col-12', 'alert-danger'])
  })

  it('should have an itemIcon method that returns the class that should be applied to the item icon based on the provided type', function () {
    // Extract default data
    const defaultData = Notify.data()

    // Create local mapping
    Notify.types = defaultData.types
    Notify.options = defaultData.options

    // Validation
    expect(Notify.methods.itemIcon.call(Notify, 'info')).to.equal('fa fa-lg fa-info-circle')
    expect(Notify.methods.itemIcon.call(Notify, 'error')).to.equal('fa fa-lg fa-exclamation-triangle')
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

  it('should have an addItem method that adds an item to the items list', function () {
    // Use fake timers
    let clock = sinon.useFakeTimers()

    // Create mock list
    Notify.items = {}
    Notify.options = {visibility: 500}
    Notify.removeItem = sinon.stub()

    // Call method logic
    Notify.methods.addItem.call(Notify, 'error', 'This is an error message')

    // Items should be set at this point, keyed by the timestamp (zero at this point)
    expect(Notify.items).to.deep.equal({0: {type: 'error', text: 'This is an error message'}})

    // Move clock forward 499 seconds
    expect(Notify.removeItem.called).to.equal(false)

    // Move clock another second forward
    expect(Notify.removeItem.calledOnce)
    expect(Notify.removeItem.calledWith('0'))

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
