// pages/fabushangpin/fabushangpin.js
const db = wx.cloud.database()
const todos = db.collection('orderform')
var Nowamount = 0
var Nowgoodsname = ''
var Nowprice = ''
var Nowaddress = new Array(3) 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsID: '',//商品在云函数中的id
    goodsname: "",//产品名称
    amount: 0,//数量
    price: 0,//价格
    address: ['', '', ''],//产品发货地址
    time: '',//产品出产时间
    number: '',//用户电话号码
    photopath: '../../img/loading.png',//小程序的临时文件路径
    photoID: '',//删除旧图片的地址，被赋予新图片的地址
    photo1: true,//判断图片是否改变
    judge: true,//判断信息是否填写完整
    phototext: '点击重新上传',//按钮二的文字
  },

  onLoad(options) {
    wx.showLoading({
      title: '加载中',
    })
    console.log("下面是传入的参数")
    console.log(options.id)
    var that = this
    this.setData({
      goodsID: options.id
    })
    //下载商品原有的信息
    db.collection('orderform').doc(options.id).get({
      success: function (res) {
        // res.data 包含该记录的数据
        console.log("从云端得到的信息")
        console.log(res.data)
        //把云端图片转移到本地
        wx.cloud.downloadFile({
          fileID: res.data.photoID, // 文件 ID
          success: res => {
            // 返回临时文件路径
            that.setData({
              photopath: res.tempFilePath,
            })
            console.log(res.tempFilePath)
          },
          fail: console.error
        })
        that.setData({
          goodsname: res.data.goodsname,
          amount: res.data.amount,
          price: res.data.price,
          address: res.data.address,
          number: res.data.number,
          time: String(new Date().getFullYear()) + "/" + String(new Date().getMonth() + 1) + "/" + String(new Date().getDate()) + " - " + String(new Date().getHours()) + ":" + String(new Date().getMinutes()) + ":" + String(new Date().getSeconds()),
          photoID: res.data.photoID
        })
        console.log(that.data.goodsname)
        Nowgoodsname = that.data.goodsname
        console.log(Nowgoodsname)
      }
    })
    console.log(Nowgoodsname)
    wx.cloud.database().collection('orderform')
    .where({
      amount: Nowamount,
      goodsname: Nowgoodsname,
      price:Nowprice,
    //  address:Nowaddress
    })
    .get()
    .then(res=>{
      console.log(res.data)
      if(res.data.length==1){
        this.setData({
          judge: false
        })
      }
      else{
        this.setData({
          judge: true
        })
      }
    })
    var that = this;
    setTimeout(function () {
      wx.hideLoading({
        success: (res) => { }
      })
    }, 2500)
  },

  //判断信息是否输入完毕
  judge1: function () {
    var that = this
    console.log(this.data.address)
    console.log('judge函数运行');
    if (this.data.goodsname != '' && this.data.amount != 0 && this.data.price != 0 && this.data.address[2] != '' && this.data.time != '' && this.data.number != '')
  this.setData({
    judge: true
  })
    else
      this.setData({
        judge: false
      })
    console.log(this.data.judge)
  },

  //获取照片本地地址
  picture1: function () {
    wx.chooseImage({
      count: 1,
      success: res => {
        this.setData({
          photopath: res.tempFilePaths[0],
        })
      }
    })
    this.data.photo1 = true;
    this.judge1();
  },

  //输入产品名称
  chanpinmingcheng: function (e) {
    this.data.goodsname = e.detail.value;
    this.judge1();
  },

  //输入产品数量
  chanpinshuliang: function (e) {
    this.data.amount = e.detail.value;
    this.judge1();
  },

  //输入产品价格
  chanpinjiage: function (e) {
    this.data.price = e.detail.value;
    this.judge1();
  },

  //选择地址
  addressinput: function (e) {
    this.setData({
      ['address[0]']: e.detail.value[0],
      ['address[1]']: e.detail.value[1],
      ['address[2]']: e.detail.value[2],
    })
    this.judge1();
  },

  //点击删除按钮
  shanchu: function () {
    console.log('删除函数运行')
    console.log(this.data.goodsID)
    var that = this;
    //获取删除图片路径
    db.collection('orderform').doc(that.data.goodsID).get({
      success: function (res) {
        // res.data 包含该记录的数据
        console.log(res.data)
        that.setData({
          photoID: res.data.photoID
        })
        //删除云端图片
        wx.cloud.deleteFile({
          fileList: [that.data.photoID],
          success: res => {
            // handle success
            console.log("删除照片函数已运行")
          },
          fail: console.error
        })
      }
    })
    //删除云端记录
    db.collection('orderform').doc(that.data.goodsID).remove({
      success: function (res) {
      }
    })
  },

  //确认发布的函数
  post: function () {
    this.shanchu();
    //上传照片到数据库
    if (this.data.photo1 == true) {
      wx.cloud.uploadFile({
        filePath: this.data.photopath,
        name: this.data.number + Date.now(),
        cloudPath: "orderform/photo/" + this.data.number + Date.now() + '.jpg',
        success: res => {
          console.log('图片上传成功');
          this.setData({
            photoID: res.fileID
          })
          //上传其他信息到数据库
          wx.cloud.database().collection('orderform')
            .add({
              data: {
                goodsname: this.data.goodsname,
                amount: this.data.amount,
                price: this.data.price,
                address: [this.data.address[0], this.data.address[1], this.data.address[2]],
                time: this.data.time,
                number: this.data.number,
                photoID: this.data.photoID,
              },
              success: function (res) {
                console.log('其他信息上传成功')
                //跳转到卖家个人中心
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          //上传信息完毕
        },
      })
    }
  }
})