// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonenumber:"",
    username:"",
    password:"",
    passwordACK:"",
    IDnumber:"",
  },
  login:function(e){
    wx.navigateBack({
      delta: 1,
    })
  },
  regist:function(e){
    var that=this
    var myreg = /^ (0|86|17951)? (13 [0-9]|15 |17 |18 [0-9]|14) [0-9] {8}$/;
    if(that.data.phonenumber == ''){
      wx.showModal({
        title: '提示!',
        content: '请输入手机号码！',
        success (res) {
        if (res.confirm) {
        console.log('用户点击确定')
        } else if (res.cancel) {
        console.log('用户点击取消')
        }
        }
        })
      }
      else if(that.data.phonenumber.length != 11){
        wx.showModal({
          title: '提示!',
          content: '手机号长度有误，请重新输入！',
          success (res) {
          if (res.confirm) {
          console.log('用户点击确定')
          } else if (res.cancel) {
          console.log('用户点击取消')
          }
          }
          })
        }
        else if(!myreg.test(that.data.phonenumber)){
          wx.showModal({
            title: '提示!',
            content: '请输入正确的手机号码！',
            success (res) {
            if (res.confirm) {
            console.log('用户点击确定')
            } else if (res.cancel) {
            console.log('用户点击取消')
            }
            }
            })
          }
      else if(that.data.username == ''){
        wx.showModal({
          title: '提示!',
          content: '请输入昵称!',
          success (res) {
          if (res.confirm) {
          console.log('用户点击确定')
          } else if (res.cancel) {
          console.log('用户点击取消')
          }
          }
          })
        }
      else if(that.data.password == ''){
        wx.showModal({
          title: '提示!',
          content: '请输入密码！',
          success (res) {
          if (res.confirm) {
          console.log('用户点击确定')
          } else if (res.cancel) {
          console.log('用户点击取消')
          }
          }
          })
        }
        else if(that.data.passwordACK == ''){
          wx.showModal({
            title: '提示!',
            content: '请再次输入密码！',
            success (res) {
            if (res.confirm) {
            console.log('用户点击确定')
            } else if (res.cancel) {
            console.log('用户点击取消')
            }
            }
            })
          }
          else if(that.data.passwordACK != that.data.password){
            wx.showModal({
              title: '提示!',
              content: '两次输入密码不一致！',
              success (res) {
              if (res.confirm) {
              console.log('用户点击确定')
              } else if (res.cancel) {
              console.log('用户点击取消')
              }
              }
              })
            }
          else if(that.data.IDnumber == ''){
            wx.showModal({
              title: '提示!',
              content: '请输入身份证后四位！',
              success (res) {
              if (res.confirm) {
              console.log('用户点击确定')
              } else if (res.cancel) {
              console.log('用户点击取消')
              }
              }
              })
            }
           else if(that.data.IDnumber.length== 4){
              wx.showModal({
                title: '提示!',
                content: '身份证后四位输入长度有误！',
                success (res) {
                if (res.confirm) {
                console.log('用户点击确定')
                } else if (res.cancel) {
                console.log('用户点击取消')
                }
                }
                })
              }
  },
  phonenumberInput:function(e){

    this.data.phonenumber = e.detail.value
  },
  usernameInput:function(e){

    this.data.username = e.detail.value
  },
  passwordInput:function(e){

    this.data.password = e.detail.value
  },
  passwordInputACK:function(e){

    this.data.passwordACK = e.detail.value
  },
  IDnumberInput:function(e){

    this.data.IDnumber = e.detail.value
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
