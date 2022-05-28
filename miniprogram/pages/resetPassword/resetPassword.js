Page({
  data: {
    shouji1: 0,     //存放手机号码
    shenfen1: 0,    //存放身份证后四位
    mima11: 0,      //存放一号密码框
    mima21: 0,      //存放二号密码框
    judge1: false,  //表示手机号码是否就绪
    judge2: false,  //判断身份证号码是否正确
    judge3: false,  //判断两次密码是否相同
    jingao1: ' ',    //密码不同的警告文字
    tishiyu1: ' ',   //提示身份证号码输入错误
  },

  //录入手机号的函数
  shouji(e) {
    this.data.shouji1 = e.detail.value;
    if (e.detail.cursor == 11) {
      this.setData({
        jingao1: " ",
        judge1: true
      })
      //上传手机号到云端
    } else {
      this.setData({
        jingao1: "请输入正确的手机号；",
        judge1: false
      })
    }
  },

  //判断身份证号码的函数
  shenfen(e) {
    this.data.shenfen1 = e.detail.value;
    if (this.data.judge1 && e.detail.cursor == 4) {
      //从云端获取正确的身份证号码并比对
      //if(输入的身份证号和云端相同)
      //this.judge2=ture;
      //this.setData({tishiyu1:'身份号码正确'})
      //else
      //this.judge2=false;
      //this.setData({tishiyu1:'身份号码错误'})
    } else {
      this.setData({
        tishiyu1: ' ',
        judge2: true   //暂时
      })
    }
  },

  //录入密码的函数
  mima1(e) {
    var that = this;
    this.data.mima11 = e.detail.value;
    if (this.data.mima21 == this.data.mima11) {
      that.setData({
        jingao1: ' ',
        judge3: true
      })
    } else {
      that.setData({
        jingao1: '两次输入的密码不同；',
        judge3: false
      })
    }
  },

  //确认密码的函数
  mima2(e) {
    var that = this;
    this.data.mima21 = e.detail.value;
    if (this.data.mima21 == this.data.mima11) {
      that.setData({
        jingao1: ' ',
        judge3: true
      })
    } else {
      that.setData({
        jingao1: '两次输入的密码不同；',
        judge3: false
      })
    }
  },

  //确认修改之后的函数
  sendpasswords() {
    if (this.data.judge1 && this.data.judge2 && this.data.judge3) {
      //把重设的密码发送到云端
      wx.redirectTo({
        url: '/pages/login/login'     //跳转到登录界面
      })
    }
  }
})
