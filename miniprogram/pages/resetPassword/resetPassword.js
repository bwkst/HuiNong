// pages/resetPassword/resetPassword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shouji1: 0,//存放手机号码
    shenfen1: 0,//存放身份证后四位
    mima11: 0,//存放一号密码框
    mima21: 0,//存放二号密码框
    judge1: false,//表示手机号码是否就绪
    judge2: false,//判断身份证号码是否正确
    judge3: false,//判断两次密码是否相同
    jingao1: '',//密码不同的警告文字
    tishiyu1: '',//提示身份证号码输入错误
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },
  //录入手机号的函数
  shouji(e) {
    this.data.shouji1 = e.detail["value"];
    console.log(e.detail);
    if (e.detail["cursor"] == 11) {
      this.judge1 = true;
      //上传手机号到云端
    }
    else {
      this.judge1 = false;
    }
  },
  //判断身份证号码的函数
  shenfen(e) {
    this.data.shenfen1 = e.detail["value"];
    if (judge1 && e.detail["cursor"] == 4) {
      //从云端获取正确的身份证号码并比对
      //if(输入的身份证号和云端相同)
      //this.judge2=ture;
      //this.setData({tishiyu1:'身份号码正确'})
      //else
      //this.judge2=false;
      //this.setData({tishiyu1:'身份号码错误'})
    }
    else
      this.setData({ tishiyu1: ' ' });
  },
  //录入密码的函数
  mima1(e) {
    var that = this;
    this.data.mima11 = e.detail["value"];
    console.log(this.data.mima11);
    if (this.data.mima21 == this.data.mima11) {
      that.setData({ jinggao1: '' })
    }
    else { that.setData({ jinggao1: "两次输入的密码不同" }) }
  },
  //确认密码的函数
  mima2(e) {
    var that = this;
    this.data.mima21 = e.detail["value"];
    if (this.data.mima21 == this.data.mima11) {
      that.setData({ jinggao1: '' })
    }
    else { that.setData({ jinggao1: "两次输入的密码不同" }) }
  },
  //确认修改之后的函数
  sendpasswords() {
    if (judge1&&judge2&&judge3){
      //把重设的密码发送到云端
      wx.redirectTo({
        url: 'pages/register/register',//跳转到登录界面
      })
    }
},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
