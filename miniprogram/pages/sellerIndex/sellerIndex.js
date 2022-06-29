var id;
var buyerPhoneNo;
const db = wx.cloud.database()
Page({
  data: {
    datalist: [],//当前加载出来的所有数据
    datachange: '',//转移云函数中的数据，一次转移8项
    phoneNo: '',//我的手机号
    length: 10,//当前页面加载了几条订单
  },

  //自动运行一次的函数
  onLoad: function (options) {
    //获取卖家手机号
    console.log('获取电话函数运行中');
    var that = this
    db.collection('user').doc(getApp().globalData.userCloudId).get().then(res => {
      // res.data 包含该记录的数据
      that.setData({
        phoneNo: res.data.phoneNumber,
      })
      that.getData1();
    })
  },

  //获取订单信息（这个在填写单号或者修改订单的时候会让datalist增长）但是好像和渲染层有关，留在这里。另写一个重新获取data的函数
  getData(num = 5, page = 0) {
    wx.cloud.callFunction({
      name: "sellcenter",
      data: {
        num: num,
        page: page
      }
    }).then(res => {
      console.log(this.data.datalist)
      console.log(res)
      var oldData = this.data.datalist
      var newData = oldData.concat(res.result.data);
      console.log("now")
      console.log(res.result.data)
      console.log(newData)
      this.setData({
        datalist: newData
      })
    })
  },

  //获取data的函数
  getData1: function () {
    var that = this
    //通过手机号获取卖家的订单
    db.collection('buyerOrder').where({
      orderSellerPhoneNo: that.data.phoneNo
    })
      .get({
        success: function (res) {
          console.log(that.data.datachange);
          that.setData({
            datalist: res.data
          })
        }
      })
  },

  // 触底之后运行的函数,渲染的长度增加10条
  onReachBottom: function () {
    var a = this.data.length + 10;
    this.setData({
      length: a
    })
    this.getData1();
  },

  deleteFail: function () {
    wx.showModal({
      title: "打回失败",
      content: '已发货的订单无法打回',
      showCancel: false
    })
  },

  //点击打回按钮
  delete: function (e) {
    wx.showModal({
      title: '打回订单',
      content: '是否打回订单',
      showCancel: true,
      cancelText: "否",
      confirmText: "是",
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          console.log('删除函数运行')
          console.log(e.currentTarget.dataset.index)
          var that = this;
          db.collection('buyerOrder').doc(e.currentTarget.dataset.index).remove({
            success: function (res) {
              that.getData1();
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //点击填写快递单号
  tianxie: function (e) {
    console.log(e.currentTarget.dataset.index);
    var orderID = e.currentTarget.dataset.index;
    var that = this
    wx.showModal({
      title: '请输入快递单号',
      editable: true,
      success(res) {
        console.log(res.content);
        var expressID = res.content;
        db.collection('buyerOrder').doc(orderID).update({
          data: {
            orderExpressNo: expressID,
            orderStatus: '已发货',
          },
          success: function (res) {
            console.log(res.data);
            that.getData1();
          }
        })
      }
    })
  },

  getBuyerPhoneNo: function (e) {
    db.collection('buyerOrder').doc(e.currentTarget.id).get().then(res => {
      buyerPhoneNo = res.data.orderBuyerPhoneNo
    })
  },

  //点击感叹号，显示提示语
  info: function (e) {
    this.getBuyerPhoneNo(e);
    setTimeout(function () {
      wx.showModal({
        title: '如未能按时发货请联系买家沟通',
        content: '是否复制买家联系方式',
        showCancel: true,
        cancelText: "否",
        confirmText: "是",
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.setClipboardData({
              data: buyerPhoneNo,   //云数据库中该订单的卖家手机号
              success: (res) => {
                wx.showModal({
                  title: '买家信息已复制到剪贴板中',
                  content: '',
                  showCancel: false,
                })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }, 500)
    clearTimeout();
  },


  sellerCenterPage: function () {
    wx.redirectTo({
      url: '../sellerCenter/sellerCenter',
    })
  }
})