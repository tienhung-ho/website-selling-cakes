const userRoute = require('./user.routers')  

function Routes (app) {
  const prefixApi = app.locals.prefixApi

    app.use(`${prefixApi}/user`, userRoute)
  
}

module.exports = Routes

