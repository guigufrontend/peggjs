const delay = (data, tick)=>new Promise(resolve=>{
    setTimeout(()=>{
        resolve(data)
    },tick)  
})

module.exports = app=>({
    getName(){
        // return delay('tom', 1000)\
        return app.$model.user.findAll()
    },
    getAge(){
        return 45
    }
})