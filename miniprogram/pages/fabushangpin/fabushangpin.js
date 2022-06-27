// pages/fabushangpin/fabushangpin.js
const db = wx.cloud.database()
const todos = db.collection('orderform')
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
    number:'',
    photopath:'../../img/loading.png',
    cloudphotopath:'',
    photo1:false,//判断是否上传图片
    judge:false//判断信息是否填写完整
  },

    //判断信息是否输入完毕
    judge1:function(){
      console.log('judge函数运行');
      if(this.data.goodsname!=''&&this.data.amount!=0&&this.data.price!=0&&this.data.address[2]!=''&&this.data.time!=''&&this.data.number!='')
      this.setData({
        judge:true
      })
      else
      this.setData({
        judge:false
      })
      console.log(this.data.judge)
    },

  //获取用户手机号
  getnumber:function(){
    console.log('获取电话函数运行中');
    console.log(getApp().globalData.userCloudId);
    db.collection('user').doc(getApp().globalData.userCloudId).get().then(res => {
      // res.data 包含该记录的数据
      console.log(res.data)
      this.setData({
        number:res.data.phoneNumber
      })
      this.judge1();
      wx.showModal({
        content: '已获取您的号码',
        showCancel:false,
        success (res) {
        }
      })
    })
  },

 //获取照片本地地址
 picture1:function(){
   wx.chooseImage({
     count:1,
     success:res=>{
       this.setData({
         photopath:res.tempFilePaths[0]
       })
       console.log(this.data.photopath);
     }
   })
   this.data.photo1=true;
   console.log('上传照片函数');
   console.log(this.data.photopath);
   console.log(this.data.photo1);
 },

  //输入产品名称
  chanpinmingcheng:function(e){
    this.data.goodsname = e.detail.value;
    this.judge1();
    console.log('名称');
  },

  //输入产品数量
  chanpinshuliang:function(e){
   this.data.amount = e.detail.value;
   this.judge1();
   console.log('名称');
 },

  //输入产品价格
  chanpinjiage:function(e){
    this.data.price = e.detail.value;
    this.judge1();
    console.log('名称');
  },

  //选择地址
  addressinput: function (e) {
    this.setData({
      ['address[0]']:e.detail.value[0],
      ['address[1]']:e.detail.value[1],
      ['address[2]']:e.detail.value[2],
    })
    this.judge1();
    console.log('名称');
  },

  //选择时间
  timeinput:function(e){
    this.setData({
      time:e.detail.value
    })
    this.judge1();
    console.log('名称');
  },

    //确认发布的函数
    post:function(){
      this.judge1();
      //上传照片到数据库
      if(this.data.photo1==true){
          wx.cloud.uploadFile({
          filePath:this.data.photopath,
          name: this.data.number+Date.now(),
          cloudPath:"orderform/photo"+this.data.number+Date.now()+'.jpg'
        })
        .then(res=>{
          console.log('照片上传成功')
        })
      }
      //上传其他信息到数据库
      wx.cloud.database().collection('orderform')
      .add({
        data:{
          goodsname:this.data.goodsname,
          amount:this.data.amount,
          price:this.data.price,
          address:[this.data.address[0],this.data.address[1],this.data.address[2]],
          time:this.data.time,
          number:this.data.number,
          identify:Date.now()
        }
      })
      .then(res=>{ 
        console.log('添加成功')
      })
      .catch(err=>{
        console.log('添加失败',err)
      })
      //跳转到卖家个人中心
      wx.redirectTo({
        url: '/pages/sellerCenter/sellerCenter'     //跳转到卖家个人中心界面
      })
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