Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  next: function(e) {
    console.log("userInfo", getApp().globalData.userInfo)
    wx.redirectTo({
      url: '/pages/login/login'
    })
  },

  onLoad: function(options) {
    var that = this

    wx.showLoading({
      title: '加载中',
    })

    wx.login({
      success(res) {
        if (res.code) {
        
          // 查看是否授权
          wx.getSetting({
            success(res) {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                  success: function(res) {
                    getApp().globalData.userInfo = res.userInfo
                    that.next();
                  }
                })
              }
            }
          })

        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })


    setTimeout(function() {
      wx.hideLoading()
    }, 2000)
  },

  bindGetUserInfo(e) {
    getApp().globalData.userInfo = e.detail.userInfo
    wx.redirectTo({
      url: '/pages/authorize/authorize'
    })
  }
})