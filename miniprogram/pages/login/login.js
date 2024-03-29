var NowphoneNo;
var Nowidentity;
var id;
var globalphone;
Page({
  data: {
    identity: "",
    phoneNo: "",
    password: "",
    array: ['农产品买家', '农产品卖家'],
    judge1: false,
    judge2: false,
    judge3: false,
    warning1: '请选择身份；',
    warning2: ' ',
    warning3: ' '
  },

  identityInput: function (e) {
    this.data.identity = this.data.array[e.detail.value];
    if (this.data.array[e.detail.value]) {
      var that = this;
      this.setData({
        identity: this.data.array[e.detail.value],
        warning1: " ",
        judge1: true
      })
      if (this.data.judge1 && this.data.judge2 && this.data.judge3) {
        wx.cloud.database().collection('user')
          .doc(id)
          .get()
          .then(res => {
            if (res.data.identity != that.data.identity) {
              that.setData({
                identity: that.data.array[e.detail.value],
                warning2: "该手机号未注册；",
                judge1: false
              })
              if (that.data.warning2 != '') {
                that.setData({
                  warning3: ''
                })
              }
            }
          })
      }
      Nowidentity = this.data.identity
    } else {
      this.setData({
        identity: "",
        warning1: "请选择身份；",
        judge1: false
      })
    }
  },

  phoneNoInput: function (e) {
    this.data.phoneNo = e.detail.value;
    if (e.detail.value.length == 11 && e.detail.value) {
      wx.cloud.database().collection('user')
        .get()
        .then(res => {
          console.log(res.data)
          for (let index = 0; index < res.data.length; index++) {
            if (this.data.phoneNo == res.data[index].phoneNumber && res.data[index].identity == Nowidentity) {
              NowphoneNo = index
              id = res.data[NowphoneNo]._id;
              this.setData({
                warning2: '',
                judge2: true
              })
            }
            else {
              if (this.data.judge2 == false) {
                this.setData({
                  warning2: "该手机号未注册；",
                  judge2: false
                })
              }
            }
          }
        })
        .catch(err => {
          console.log('查找失败')
        })
    } else {
      this.setData({
        warning2: "请输入正确的手机号；",
        warning3: " ",
        judge2: false
      })
    }
  },

  passwordInput: function (e) {
    this.data.password = e.detail.value;
    console.log(e.detail.value)
    if (e.detail.value) {
      wx.cloud.database().collection('user')
        .get()
        .then(res => {
          if (this.data.password == res.data[NowphoneNo].passwordSet) {
            this.setData({
              warning3: '',
              judge3: true
            })
            id = res.data[NowphoneNo]._id;
            globalphone = res.data[NowphoneNo].phoneNumber;
          }
          else {
            this.setData({
              warning3: "密码错误",
              judge3: false
            })
          }
        })
        .catch(err => {
          console.log('查找失败')
        })
    } else {
      console.log('2')
      this.setData({
        warning3: "请输入正确的密码；",
        judge3: false
      })
    }
  },

  login: function () {
    if (this.data.judge1 && this.data.judge2 && this.data.judge3) {
      wx.cloud.database().collection('user')
        .doc(id)
        .update({
          data: {
            nickName: getApp().globalData.userInfo.nickName,
            iconURL: getApp().globalData.userInfo.avatarUrl
          }
        });
      getApp().globalData.userCloudId = id;
      getApp().globalData.phonenumber = globalphone;
      if (this.data.identity == "农产品买家") {
        wx.redirectTo({
          url: '/pages/buyerIndex/buyerIndex'     //跳转到买家主页
        })
      } else {
        wx.redirectTo({
          url: '/pages/sellerIndex/sellerIndex'     //跳转到卖家主页
        })
      }
    }
  },

  registerPage: function (e) {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },

  resetpasswordPage: function (e) {
    wx.navigateTo({
      url: '/pages/resetPassword/resetPassword',
    })
  }
})
