// const app = new (require('koa'))()

// const {initRouter} = require('./router-loader')

// app.use(initRouter().routes())

// app.listen(3000)

const pegg = require('./pegg')
const app = new pegg()
app.start(3000)