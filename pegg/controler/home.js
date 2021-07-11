module.exports=app=>({
    index: async ctx=>{
        // ctx.body='首页controler'
        const name = await app.$service.user.getName()
        app.ctx.body=`ctrl ${name}`
    },
    detail: async ctx=>{
        app.ctx.body='详情controler'
    },
})