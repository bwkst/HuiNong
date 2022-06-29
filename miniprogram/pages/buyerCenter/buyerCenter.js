var id;
var showDeliveryNo;
const db = wx.cloud.database();

Page({
  data: {
    nickName: "",
    phoneNo: "",//我的电话号码
    sellerNo: '',//卖家的电话号码
    address: "",
    status: "我的订单",
    dataList: '',//装数据
    zhuangtai: "未寄出",
    iconURL: "",//图标
  },

  //页面自动加载订单信息
  onLoad: function () {
    this.setData({
      nickName: getApp().globalData.userInfo.nickName,
      iconURL: getApp().globalData.userInfo.avatarUrl,
    });
    //获取用户手机号
    console.log('获取电话函数运行中');
    var that = this
    db.collection('user').doc(getApp().globalData.userCloudId).get().then(res => {
      // res.data 包含该记录的数据
      that.setData({
        phoneNo: res.data.phoneNumber
      })
      that.getData();
    })
  },

  //获取数组信息
  getData() {
    var that = this;
    console.log(this.data.phoneNo);
    db.collection('buyerOrder').where({
      orderBuyerPhoneNo: that.data.phoneNo
    })
      .get({
        success: function (res) {
          console.log('now');
          console.log(res.data);
          that.setData({
            dataList: res.data.reverse(),
          })
          console.log(dataList);
        }
      })
  },

  onShow: function(){
    this.onLoad();
  },

  //点击获取卖家号码
  getsellerNo: function (e) {
    var that = this
    console.log('订单ID是下面的数据：')
    console.log(e.currentTarget.dataset.index)
    db.collection('buyerOrder').doc(e.currentTarget.dataset.index).get().then(res => {
      // res.data 包含该记录的数据
      console.log(res)
      that.setData({
        sellerNo: res.data.orderSellerPhoneNo,
      })
      //展示提示框
      wx.showModal({
        title: '卖家的联系方式',
        content: '是否复制到剪贴板',
        showCancel: true,
        cancelText: "否",
        confirmText: "是",
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.setClipboardData({
              data: that.data.sellerNo,   //云数据库中该订单的卖家手机号
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
    })
  },

  //跳转到关于云惠农界面
  changeStatusAboutHuiNong: function () {
    this.setData({
      status: "关于云惠农"
    })
  },

  //跳转到我的订单界面
  changeStatusMine: function () {
    this.setData({
      status: "我的订单"
    })
  },

  //跳转到登陆界面
  loginPage: function (e) {
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },

  //跳转到买家主页
  buyerIndexPage: function () {
    wx.redirectTo({
      url: '../buyerIndex/buyerIndex',
    })
  },

  //跳转到编辑地址界面
  buyerAddressPage: function () {
    wx.navigateTo({
      url: '../buyerAddress/buyerAddress',
    })
  },

  //点击更新授权按钮
  updateUserInfo: function () {
    wx.getUserProfile({
      desc: '用于完善会员资料', //声明获取用户个人信息后的用途，后续会展示在弹窗中
      success: (res) => {
        wx.setStorageSync('userInfo', res.userInfo);
        getApp().globalData.userInfo = res.userInfo;
        id = getApp().globalData.userCloudId;
        wx.cloud.database().collection('user')
          .doc(id)
          .update({
            data: {
              nickName: getApp().globalData.userInfo.nickName,
              iconURL: getApp().globalData.userInfo.avatarUrl
            }
          });
        this.onLoad();
      },
      fail: (res) => {
        console.log(res);
      }
    });
  },

  getDeliveryNum: function (e) {
    db.collection('buyerOrder').doc(e.currentTarget.id).get().then(res => {
      showDeliveryNo = res.data.orderExpressNo
    })
  },

  getDeliveryNo: function (e) {
    this.getDeliveryNum(e);
    setTimeout(function () {
      console.log(showDeliveryNo);
      wx.showModal({
        title: '获取快递单号',
        content: '是否复制到剪贴板',
        showCancel: true,
        cancelText: "否",
        confirmText: "是",
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.setClipboardData({
              data: showDeliveryNo,   //云数据库中该订单的卖家手机号
              success: (res) => {
                wx.showModal({
                  title: '快递单号已复制到剪贴板中',
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
  }
})