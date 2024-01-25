const flavorRoute = require('./flavor.router')
const productRouter = require('./product.routers')

function Routes (app) {
  const prefixApi = app.locals.prefixApi

    app.use(`${prefixApi}/flavor`, flavorRoute)
    
    app.use(`${prefixApi}/products`, productRouter)
}

module.exports = Routes
