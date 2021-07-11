const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

function load(dir, cb){
    const url = path.resolve(__dirname, dir)
    console.log('filepath', url)
    const files = fs.readdirSync(url)
    files.forEach(filename=>{
        filename = filename.replace('.js','')
        const file = require(url+'/'+filename)
        cb(filename, file)
    })
}

function initRouter(app){
    const router = new Router()
    load('routes',(filename, routes)=>{
        const prefix = filename == 'index'? '': `/${filename}`
        routes = typeof routes === 'function' ? routes(app) : routes
        Object.keys(routes).forEach(k=>{
            const [method, path ] = k.split(' ')



            console.log(`正在映射${method.toUpperCase()} ${prefix + path}`)
            // router[method](prefix+path, routes[k])
            // 构造中间件
            router[method](prefix+path, async(ctx)=>{
                app.ctx = ctx
                // 绑定 app中的上下文
                await routes[k](app)
            })
        })
    })
    return router
}

function initControler(app){
    const controlers={}
    load('controler',(filename, controler)=>{
        controlers[filename] = controler(app)
    })
    return controlers
}

function initService(app){
    const services={}
    load('service',(filename, service)=>{
        services[filename] = service(app)
    })
    return services
}


const Sequelize = require('sequelize')
function loadConfig(app){
    load('config', (filename, config)=>{
        // 数据库自动架子啊
        if(config.db){
            app.$db = new Sequelize(config.db)

            app.$model = {}
            load('model', (filename, {schema, options})=>{
                app.$model[filename] = app.$db.define(filename, schema, options)
            })
            app.$db.sync()
        }
        // 中间件自动加载
        if(config.middleware){
            config.middleware.forEach(m=>{
                const midPath = path.resolve(__dirname, 'middleware', m)
                app.$app.use(require(midPath))
            })
        }
    })
}

const schedule = require('node-schedule')
function initSchedule(){
    load('schedule', (filename, config)=>{
        schedule.scheduleJob(config.interval, config.handler)
    })
}
module.exports={initRouter, initControler, initService, loadConfig, initSchedule}