const productRouter = require('./products.routers')

function Routes (app) {
  const prefixApi = app.locals.prefixApi
  const prefixAdmin = app.locals.prefixAdmin
    
  app.use(`${prefixApi}/${prefixAdmin}/products`, productRouter)
}

module.exports = Routes
