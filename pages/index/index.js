//index.js
//获取应用实例
var util = require('../../utils/util.js');
var app = getApp()
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
//注册一个页面 首先要在app.json中的pages中定义页面路径
//页面的展示顺序由app.json中pages的排列顺序决定 排名第一个的则首屏展示
Page({
  //页面的数据
  //data中的数据都可以直接在页面中用{{}}模版形式调用 可以写js表达式
  data: {
    store: {
      poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      name: '此时此刻',
      author: '许巍',
      src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
      years: years,
      year: date.getFullYear(),
      months: months,
      month: 2,
      days: days,
      day: 2,
      year: date.getFullYear(),
      value: [9999, 1, 1],
      array: ['美国', '中国', '巴西', '日本'],
      index: 0,
      items: [
        { name: 'USA', value: '美国' },
        { name: 'CHN', value: '中国', checked: true },
        { name: 'BRA', value: '巴西' },
        { name: 'JPN', value: '日本' },
        { name: 'ENG', value: '英国' },
        { name: 'TUR', value: '法国' },
      ],
      percent: 95,
      motto: util.formatTime(new Date()),
      userInfo: {
        "nickName": "Vijay",
        "gender": "男",
        "language": "zh_CN",
        "city": "Changzhou",
        "province": "Jiangsu",
        "country": "CN", "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/yXpgplvvCA0oicjMGdKNR9SQd0TqVhXlLa6ug4hAxdTmmptX8DUic8Jnr8j8lPHev52LewPic7Bs1KbefrOUfyhJQ/0"
      }
    }
  },
  //事件处理函数
  bindViewTap() {
    //调用微信的内置函数导航到其他路径 
    //  wx.navigateTo({
    //   url: '../logs/logs'
    // })
    //navigateTo redirectoTo只能打开非tabbar页面 switchTab只能打开tabbar页面 reLaunch可以打开任意页面
    //navigateBack redirectoTo reLaunch 都会导致页面被卸载 页面被卸载的话重新将该页面入栈的时候需要重新渲染
    //数据视图是基于react的render那种 更新虚拟dom然后比对渲染
    //只会覆盖属性名对应data的属性 不会把没写的覆盖掉
    this.setData({
      motto: "hey"

    })
  },
  moveToUpper(event) {
    console.log(event);
  },
  inputValue(e) {
    console.log(123);
    return "哈哈";
  },
  submit(e) {
    console.log(123);
    console.log(e);
  },
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  },
  changeCheck(e) {
    let items = e.detail.value;

    let itemStore = this.data.store.items;
    itemStore.forEach(itemstore => {
      let flag = true;
      items.forEach((itemName) => {
        if (itemName === itemstore.name) {
          itemstore.checked = true;
        } else if (itemstore.checked !== undefined) {
          delete itemstore.checked
        }
      })
    })
  },
  touchMe(event) {
    wx.request({
      url: 'https://just2doit.xyz', //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      }
    })
    console.log(event);
  },
  //生命周期监听函数 onload表示页面加载完成  onready表示页面渲染完成 onshow 表示打开
  //页面只会加载一次 也只会渲染一次 除非被卸载  流程是 先onload 然后onshow 然后onready 但是未卸载的情况下onload和onready不会调用
  //onshow与onhide相对应 
  //当使用当redirectTo或navigateBack的时候调用。会触发unload事件
  onLoad() {
    setInterval(() => {
      let data = JSON.parse(JSON.stringify(this.data));
      data.store.motto = util.formatTime(new Date());
      data.store.percent = data.store.percent > 100 ? 0 : data.store.percent + 1;
      this.setData(data);
    }, 1000)
    //调用app中创建的获取用户数据的函数 并传入回调函数获取用户信息
    app.getUserInfo(userInfo => {
      //这个函数中是 参数.xxx()来调用函数的 所以上下文对象是我们传进去的这个对象 可以在这个对象的所有函数中用this.xx调用其他属性或者函数
      //但是我们传进去的这个对象的原型上会被加上 setData update forceUpDate三个函数 update已被废弃
      //setData会覆盖data中的属性
      userInfo.gender = userInfo.gender === 1 ? "男" : "女";
      this.setData({
        userInfo: userInfo,
      })
    })
  },
  onShow() {
    console.log("onshow");
  },
  onReady: function () {
    console.log("onready");
    this.audioCtx = wx.createAudioContext('myAudio')
    // 获取audio控件的上下文
  },
  /**
   * 需要在config的window选项中开启enablePullDownRefresh。
当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新。
   */
  onPullDownRefresh() {
    console.log("really");
    wx.stopPullDownRefresh();
  },
  onShareAppMessage() {
    return {
      title: '爱分享不分享!!',
      // path: '/page/user?id=123'
    }
  }
})
