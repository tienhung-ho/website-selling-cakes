const flavorRoute = require('./flavor.routers')
const productRouter = require('./product.routers')
const userRouter = require('./user.routers')

function Routes (app) {
  const prefixApi = app.locals.prefixApi

    app.use(`${prefixApi}/flavor`, flavorRoute)
    
    app.use(`${prefixApi}/products`, productRouter)

    app.use(`${prefixApi}/user`, userRouter)
}

module.exports = Routes
