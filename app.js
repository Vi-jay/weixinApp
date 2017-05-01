//app.js
App({
  //App函数是用来注册一个小程序 接受一个 对象 可以设置一系列的生命周期对应的回调函数
  //也可以自定义配置其他函数  再次方法中传入的函数 在其他js文件中可以用getApp()函数获取到全局app对象 然后调用在传入对象中定义的属性函数
  /**
   * 生命周期函数有:
   * onLaunch 表示当小程序启动时调用的回调函数
   * onShow 表示小程序隐藏后再次打开显示时调用的函数
   * onShow,onLaunch的参数有一个参数 包含三个属性 path query scene 打开小程序的路径 打开小程序的query 当前小程序所在的url
   * onHide 表示当小程序隐藏到后台时调用的函数
   */
  onLaunch: function (path,query,scene) {
    //调用API从本地缓存中获取日志数据
    var logs = []
    //再日志中加入时间
    logs.unshift(Date.now())
    //再覆盖本地的日志数据
    wx.setStorageSync('logs', logs)
  },
    //获取用户信息
  getUserInfo:function(cb){
    var that = this
    //确保本地数据中的用户信息存在
    if(this.globalData.userInfo){
     //把用户信息存入global对象
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用微信的登录功能使用户重新登录进app
      wx.login({
        //登录成功后的回调函数
        success: function () {
          //使用wx提供的getUserInfo函数获取用户信息  
          wx.getUserInfo({
            //获取信息成功的回调函数
            success: function (res) {
              //把用户信息存入global对象
              that.globalData.userInfo = res.userInfo
              //如果cb是函数则调用cb并且传入用户信息
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})