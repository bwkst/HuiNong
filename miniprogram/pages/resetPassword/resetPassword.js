Page({
  data: {
    phoneNum: 0,      //存放手机号码
    IDNum: 0,         //存放身份证后四位
    password1: 0,     //存放一号密码框
    passoword2: 0,    //存放二号密码框
    judge1: false,    //表示手机号码是否就绪
    judge2: false,    //判断身份证号码是否正确
    judge3: false,    //判断两次密码是否相同
    warning1: ' ',    //手机号输入错误警告
    warning2: ' ',    //提示身份证号码输入错误
    warning3: ' ',    //密码不同的警告文字
  },

  //录入手机号的函数
  phoneNumberCheck(e) {
    this.data.phoneNum = e.detail.value;
    if (e.detail.value.length == 11) {
      this.setData({
        warning1: " ",
        judge1: true
      })
      //上传手机号到云端
    } else {
      this.setData({
        warning1: "请输入正确的手机号；",
        judge1: false
      })
    }
  },

  //判断身份证号码的函数
  IDNumberCheck(e) {
    this.data.IDNum = e.detail.value;
    if (this.data.judge1 && e.detail.value.length == 4) {
      //从云端获取正确的身份证号码并比对
      //if(输入的身份证号和云端相同)
      //this.judge2=true;
      //this.setData({warning2:'身份号码正确'})
      //else
      //this.judge2=false;
      //this.setData({warning2:'身份号码错误'})
    } else {
      this.setData({
        warning2: ' ',
        judge2: true   //暂时
      })
    }
  },

  //录入密码的函数
  password1Check(e) {
    var that = this;
    this.data.password1 = e.detail.value;
    if (this.data.password1 == this.data.password2) {
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
  password2Check(e) {
    var that = this;
    this.data.password2 = e.detail.value;
    if (this.data.password2 == this.data.password1) {
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

  //确认修改之后的函数
  sendPassword() {
    if (this.data.judge1 && this.data.judge2 && this.data.judge3) {
      //把重设的密码发送到云端
      wx.redirectTo({
        url: '/pages/login/login'     //跳转到登录界面
      })
    }
  }
})
