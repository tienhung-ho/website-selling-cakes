const productRouter = require('./products.routers')
const flavorRouter = require('./flavor.router')

function Routes (app) {
  const prefixApi = app.locals.prefixApi
  const prefixAdmin = app.locals.prefixAdmin
    
  app.use(`${prefixApi}/${prefixAdmin}/products`, productRouter)
  app.use(`${prefixApi}/${prefixAdmin}/flavor`, flavorRouter)
}

module.exports = Routes
