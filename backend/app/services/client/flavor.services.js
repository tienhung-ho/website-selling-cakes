
const Flavor = require('../../models/flavor.model')

class FlavorServices {

  constructor () {
    this.Flavor = Flavor
  }

  async findBySlug (slug) {
    const cursor = await this.Flavor.findOne({ slug }).select('_id flavor')
    return cursor
  }

}

module.exports = FlavorServices
