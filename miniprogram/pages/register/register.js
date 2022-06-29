
Page({
  data: {
    identity: "",
    array: ['农产品买家', '农产品卖家'],
    phoneNumber: 0,      //存放手机号码
    passwordSet: 0,     //存放一号密码框
    passowordConfirm: 0,    //存放二号密码框
    IDNumber: 0,         //存放身份证后四位
    judge1: false,
    judge2: false,    //表示手机号码是否就绪
    judge3: false,    //判断两次密码是否相同
    judge4: false,    //判断身份证号码是否正确
    warning1: '请选择身份；',
    warning2: ' ',    //手机号输入错误警告
    warning3: ' ',    //密码不同的警告文字
    warning4: ' ',    //提示身份证号码输入错误
  },

  identityRegist: function (e) {
    this.data.identity = this.data.array[e.detail.value];
    if (this.data.array[e.detail.value]) {
      this.setData({
        identity: this.data.array[e.detail.value],
        warning1: " ",
        judge1: true
      })
    } else {
      this.setData({
        identity: "",
        warning1: "请选择身份；",
        judge1: false
      })
    }
  },

  //录入手机号的函数
  phoneNumberRegist(e) {
    this.data.phoneNumber = e.detail.value;
    var checkPhoneNumber = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (e.detail.value.length != 11) {
      this.setData({
        warning2: "请输入手机号；",
        judge2: false
      })
    } else if (e.detail.value.length == 11 && !checkPhoneNumber.test(e.detail.value)) {
      this.setData({
        warning2: "请输入正确的手机号；",
        judge2: false
      })
    } else {
      this.setData({
        warning2: " ",
        judge2: true
      })
    }
  },

  //录入密码的函数
  passwordSetRegist(e) {
    var that = this;
    this.data.passwordSet = e.detail.value;

    if (this.data.passwordSet == this.data.passwordConfirm) {
      that.setData({
        warning3: ' ',
        judge3: true
      })
    } else {
      that.setData({
        warning3: '两次输入的密码不同；',
        judge3: false
      })
    }
  },

  //确认密码的函数
  passwordComfirmRegist(e) {
    var that = this;
    this.data.passwordConfirm = e.detail.value;
    if (this.data.passwordConfirm == this.data.passwordSet) {
      that.setData({
        warning3: ' ',
        judge3: true
      })
    } else {
      that.setData({
        warning3: '两次输入的密码不同；',
        judge3: false
      })
    }
  },

  //判断身份证号码的函数
  IDNumberRegist(e) {
    this.data.IDNumber = e.detail.value;
    if (e.detail.value.length == 4) {
      this.setData({
        warning4: " ",
        judge4: true
      })
      //上传后四位到云端
    } else {
      this.setData({
        warning4: "请输入正确的身份信息；",
        judge4: false
      })
    }
  },

  //确认修改之后的函数
  regist() {
    var that = this;
    var phoneNumber = this.data.phoneNumber
    var identity = this.data.identity
    if (this.data.judge1 && this.data.judge2 && this.data.judge3 && this.data.judge4) {
      wx.showModal({
        content: '确定注册？',
        showCancel: true,
        cancelText: "否",
        confirmText: "是",
        confirmColor: 'skyblue',
        success: (res) => {
          if (res.confirm) {
            //点击取消,默认隐藏弹框
            console.log('用户点击确定')
            wx.cloud.database().collection('user')
              .where({
                phoneNumber: phoneNumber
              })
              .get().then(res => {
                console.log(res.data.length)
                if (res.data.length == 0) {
                  console.log("可以注册")
                  wx.cloud.database().collection('user')
                    .add({
                      data: {
                        identity: this.data.identity,
                        phoneNumber: this.data.phoneNumber,
                        passwordSet: this.data.passwordSet,
                        IDNumber: this.data.IDNumber, //为什么数据库里不是number类型而是string？？？
                        nickName: getApp().globalData.userInfo.nickName,
                        iconURL: getApp().globalData.userInfo.avatarUrl
                      }
                    })
                    .then(res => {
                      console.log('添加成功')
                      wx.cloud.database().collection('buyerAddress')
                        .add({
                          data: {
                            identifyPhoneNo: this.data.phoneNumber,
                            deliveryName: '',
                            deliveryAddress: '',
                            deliverySheng: '',
                            deliveryShi: '',
                            deliveryQu: '',
                            deliveryPhoneNo: '',
                            deliveryRegion: ''
                          }
                        })
                        .then(res0 => {
                          wx.showLoading({
                            title: '注册中',
                          })
                          setTimeout(function(){
                            wx.hideLoading({
                              success: (res) => {
                                console.log('添加成功')
                                that.loginPage();
                              },
                            })
                          }, 2000)
                          clearTimeout();
                        })
                    })
                    .catch(err => {
                      console.log('添加失败', err)
                    })
                }
                else {
                  console.log("号码重复不能注册")
                  wx.showToast({
                    title: '号码重复',
                    icon: 'none'
                  })
                }
              })
              .catch(err => {
                console.log(err)
              })
            //把重设的密码发送到云端
          }
          if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      console.log(this.data.phoneNumber)
      console.log(identity)
    }
  },

  loginPage: function (e) {
    wx.navigateBack({
      delta: 1
    })
  }
})
