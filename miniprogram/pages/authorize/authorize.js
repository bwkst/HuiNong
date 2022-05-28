Page({
  data: {
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    }),

      //如果以前获取过用户身份信息，从本地Storage直接赋值给全局变量
      //用户在不删除小程序前，Storage理论上一直在
      getApp().globalData.userInfo = wx.getStorageSync('userInfo');
    console.log(getApp().globalData.userInfo);  //调试用

    //如果以前获取过权限，就跳转页面
    //如果本地Storage没有则不跳转
    if (getApp().globalData.userInfo) {
      this.next();
    };

    setTimeout(function () {
      wx.hideLoading()
    }, 500)
  },

  //获取用户身份信息
  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善会员资料', //声明获取用户个人信息后的用途，后续会展示在弹窗中
      success: (res) => {
        //将用户身份信息存储到本地，以防关掉小程序后全局变量重置
        wx.setStorageSync('userInfo', res.userInfo);

        //将用户身份信息存储到全局变量，供后续页面使用
        getApp().globalData.userInfo = res.userInfo;

        //跳转页面
        this.next();
      },
      fail: (res) => {
        console.log(res);
        wx.redirectTo({
          url: '/pages/authorize/authorize'
        })
      }
    })
  },

  next: function (e) {
    //看存储的全局变量是否正确
    console.log("userInfo", getApp().globalData.userInfo)

    //跳转页面
    wx.redirectTo({
      url: '/pages/login/login'
    })
  }
})