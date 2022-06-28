// pages/fabushangpin/fabushangpin.js
const db = wx.cloud.database()
const todos = db.collection('orderform')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsname:"",//产品名称
    amount:0,//数量
    price:0,//价格
    address:['','',''],//产品发货地址
    time:'',//产品出产时间
    number:'',//用户电话号码
    photopath:'../../img/loading.png',//小程序的临时文件路径
    photoID:'',//图片的唯一标识符
    photo1:false,//判断是否上传图片
    judge:false,//判断信息是否填写完整
    numbertext:'点击获取手机号',//按钮一的文字
    phototext:'点击上传图片',//按钮二的文字
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
        number:res.data.phoneNumber,
        numbertext:'手机号已获取',
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
         photopath:res.tempFilePaths[0],
         phototext:'点击重新上传',
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
      //上传照片到数据库
      if(this.data.photo1==true){
          wx.cloud.uploadFile({
          filePath:this.data.photopath,
          name: this.data.number+Date.now(),
          cloudPath:"orderform/photo/"+this.data.number+Date.now()+'.jpg',
          success:res=>{
            console.log('下面是上传图片的id');
            console.log(res.fileID);
            this.setData({
              photoID:res.fileID
            })
            console.log(this.data.photoID)
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
                photoID:this.data.photoID,
              },
              success:function(res){
                console.log("下面是上传函数之后的云图片地址")
                concole.log('1')
              }
            })
            //上传信息完毕
          },
        })
      }
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