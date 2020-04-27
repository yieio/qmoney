// vue.config.js
module.exports = {
    chainWebpack: config => {
      config
      .plugin('html')
      .tap(args => {
        args[0].title = '信用卡积分换钱'
        return args
      })
    }
  }