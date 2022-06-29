var id;
const db = wx.cloud.database()
Page({
  data: {
    datalist:[]
  },

getData(num = 5, page = 0) {
  wx.cloud.callFunction({
    name: "sellcenter",
    data: {
      num: num,
      page: page
    }
  }).then(res => {
    var oldData = this.data.datalist
    var newData = oldData.concat(res.result.data);
    console.log(res.result.data)
    this.setData({
      datalist: newData
    })
  })
},

onLoad: function (options) {
  this.getData();
},
// 触底
onReachBottom: function () {
  var page = this.data.datalist.length
  this.getData(5, page)//5为每次刷新的次数
},
  //点击打回按钮
  delete: function (e) {
    console.log('删除函数运行')
    console.log(e.currentTarget.dataset.index)
    var that = this;
    db.collection('buyerOrder').doc(e.currentTarget.dataset.index).remove({
      success: function (res) {
        that.getData();
      }
    })
  },

info:function(){
  wx.showModal({
    title:'提示',
    content:'如未能按时发货请联系买家沟通',
    showCancel:false
  })
},


  sellerCenterPage: function () {
    wx.redirectTo({
      url: '../sellerCenter/sellerCenter',
    })
  }
})