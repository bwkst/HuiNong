// pages/dingdanxiugai/dingdanxiugai.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsname:"",
    amount:0,
    price:0,
    address:['','',''],
    time:'',
    pictureaddress:"",
    number:0,
    judge:false//判断信息是否填写完整
  },

    //判断信息是否输入完毕
    judge1:function(){
      console.log('judge函数运行');
      if(this.data.goodsname!=''&&this.data.amount!=0&&this.data.price!=0&&this.data.address[2]!=''&&this.data.time!=''&&this.data.number>=10000000000)
      this.setData({
        judge:true
      })
      else
      this.setData({
        judge:false
      })
      console.log(this.data.judge)
    },

  //发布产品的函数
  post:function(){

  },

  //输入产品名称
  chanpinmingcheng:function(e){
    this.data.goodsname = e.detail.value;
  },

  //输入产品价格
  chanpinjiage:function(e){
    this.data.price = e.detail.value;
  },

  //输入产品数量
  chanpinshuliang:function(e){
    this.data.amount = e.detail.value;
  },

  //选择地址
  addressinput: function (e) {
    console.log(e);
    this.setData({
      ['address[0]']:e.detail.value[0],
      ['address[1]']:e.detail.value[1],
      ['address[2]']:e.detail.value[2],
    })
    console.log(this.data.address)
  },

  //选择时间
  timeinput:function(e){
    console.log(e);
    this.setData({
      time:e.detail.value
    })
  },

  //输入联系电话
  lianxidianhua:function(e){
    this.data.number = e.detail.value;
    this.judge1;
    console.log('联系电话正常')
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