const productRouter = require('./products.routers')
const flavorRouter = require('./flavor.router')
const staffRouter = require('./staff.router')
const rolesRouter = require('./roles.router')
const usersRouter = require('./users.router')

function Routes (app) {
  const prefixApi = app.locals.prefixApi
  const prefixAdmin = app.locals.prefixAdmin
    
  app.use(`${prefixApi}/${prefixAdmin}/products`, productRouter)
  app.use(`${prefixApi}/${prefixAdmin}/flavor`, flavorRouter)
  app.use(`${prefixApi}/${prefixAdmin}/staff`, staffRouter)
  app.use(`${prefixApi}/${prefixAdmin}/roles`, rolesRouter)
  app.use(`${prefixApi}/${prefixAdmin}/users`, usersRouter)
}

module.exports = Routes
