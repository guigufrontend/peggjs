'use strict';

const { Controller }  = require('egg')

class User extends Controller{
    async index(){
        const { ctx } = this
        // ctx.body = 'user'
        ctx.body = await ctx.service.user.getAll()
    }
}
module.exports = User