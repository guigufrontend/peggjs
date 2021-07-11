const koa = require('koa')
const {initRouter, initControler, initService, loadConfig, initSchedule} = require('./pegg-loader')

class pegg{
    constructor(conf){
        this.$app = new koa(conf)
        loadConfig(this)
        this.$service = initService(this)
        this.$ctrl = initControler(this)
        this.$router = initRouter(this)
        this.$app.use(this.$router.routes())
        initSchedule()
    }
    start(port){
        this.$app.listen(port,()=>{
            console.log(`pegg start at ${ port }`)
        })
    }
}


module.exports=pegg