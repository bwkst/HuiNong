// pages/resetPassword/resetPassword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shouji1:0,
    shenfen1:0,
    mima11:0,
    mima21:0,
    judge1:false,
    judge2:false,
    judge3:true,
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
shouji(e){
  console.log(e.detail);
  this.data.shouji1=e.detail
},

shenfen(e){
  console.log(e.detail);
  this.data.shenfen1=e.detail
},
mima1(e){
  var that=this;
  this.data.mima11=e.detail;
  console.log(this.data.mima11);
  if(this.data.mima21==this.data.mima11){
    that.setData({judge1:false})}
    else{that.setData({judge1:true})}
},
mima2(e){
  var that=this;
  console.log(e.detail);
  this.data.mima21=e.detail;
  if(this.data.mima21==this.data.mima11){
  that.setData({judge1:false})}
  else{that.setData({judge1:true})}
},
sendpasswords(){

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
