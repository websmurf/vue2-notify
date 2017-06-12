import Notify from 'src/Notify.vue'
import {expect} from 'chai'

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
})
