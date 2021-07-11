module.exports = {
    //  /user/xxx
    'get /':async app=>{
        const name = await app.$service.user.getName()
        app.ctx.body =  name
    },
    'get /info':async app=>{
        const age = app.$service.user.getAge()
        app.ctx.body = '用户年龄:' + age
    }
};
  