// pages/buyerIndex/buyerIndex.js


Page({
  data: {
    ne:[],
    // 创建一个空数组
    List: [
      {
        id: 0,
        chanpin: '面粉',
        shuliang: '600斤',
        jiage: '3元/斤',
        fahuodizhi: '德阳市什邡县',
        lianxifangshi: '123456789'
      },
      {
        id: 1,
        chanpin: '青桔',
        shuliang: '50斤',
        jiage: '12元/斤',
        fahuodizhi: 'xx市xx县xx村',
        lianxifangshi: '123456789'
      },
      {
        id: 2,
        chanpin: '大米',
        shuliang: '500斤',
        jiage: '3元/斤',
        fahuodizhi: 'xx市xx县xx村',
        lianxifangshi: '123456789'
      },
      {
        id: 3,
        chanpin: '地瓜',
        shuliang: '100斤',
        jiage: '3.2元/斤',
        fahuodizhi: 'xx市xx县xx村',
        lianxifangshi: '123456789'
      },
      {
        id: 4,
        chanpin: '香蕉',
        shuliang: '600斤',
        jiage: '4.5元/斤',
        fahuodizhi: 'xx市xx县xx村',
        lianxifangshi: '123456789'
      },
      {
        id: 5,
        chanpin: '青提',
        shuliang: '600斤',
        jiage: '10元/斤',
        fahuodizhi: 'xx市xx县xx村',
        lianxifangshi: '123456789'
      },
    ],//模拟云函数的数据
  },

  //下单的函数
  clickToOrder: function () {
    wx.navigateTo({
      url: "../buyerOrder/buyerOrder",
    })
  },

  //获取卖家联系方式的函数
  clickToGetContact: function () {
    wx.showModal({
      title: '卖家的联系方式',
      content: '暂无',
      showCancel: true,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.setClipboardData({
            data: "",   //云数据库中该订单的卖家手机号
            success: (res) => {
              wx.showModal({
                title: '卖家信息已复制到剪贴板中',
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
  },
  
// 数据库的调用部分
  onLoad: function (options) {
    var _this = this;
    //1、引用数据库
    const db = wx.cloud.database({
    env: 'cloud1-5g5pke1n3f2b893c'
    })
    //2、开始查询数据了 news对应的是集合的名称
    db.collection('orderform').get({
    //如果查询成功的话
    success: res => {
    console.log(res.data)
    //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
    this.setData({
    ne: res.data
    })
    }
    })
    },

  buyerCenterPage: function () {
    wx.redirectTo({
      url: '../buyerCenter/buyerCenter',
    })
  }
})