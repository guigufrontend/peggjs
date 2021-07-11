module.exports = {
    interval: '30 * * * * *',
    handler(){
        console.log('定时任务 30秒调用一次'+ new Date())
    }
}