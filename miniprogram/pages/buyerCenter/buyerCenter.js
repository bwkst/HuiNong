var id;
const db = wx.cloud.database()
Page({
  data: {
    nickName: "",
    phoneNo: "",
    address: "",
    status: "",
    dataList: 7,//装数据
    zhuangtai: "未寄出",
    iconURL: "",
  },

  changeStatusAboutHuiNong: function () {
    this.setData({
      status: "关于惠农"
    })
  },

  changeStatusMine: function () {
    this.setData({
      status: "我的订单"
    })
  },

  loginPage: function (e) {
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },

  onLoad: function () {
    this.setData({
      nickName: getApp().globalData.userInfo.nickName,
      iconURL: getApp().globalData.userInfo.avatarUrl,
    });
      //获取用户手机号
      console.log('获取电话函数运行中');
      var that=this
      db.collection('user').doc(getApp().globalData.userCloudId).get().then(res => {
        // res.data 包含该记录的数据
        that.setData({
          phoneNo:res.data.phoneNumber,
        })
        that.getData();
      })
  },

  getData(){
    var that=this;
    console.log(this.data.phoneNo);
    db.collection('orderform').where({
      number:that.data.phoneNo
    })
    .get({
      success: function(res) {
        that.setData({
          datalist:res.data,
        })
      }
    })
  },

  buyerIndexPage: function () {
    wx.redirectTo({
      url: '../buyerIndex/buyerIndex',
    })
  },

  buyerAddressPage: function () {
    wx.navigateTo({
      url: '../buyerAddress/buyerAddress',
    })
  },

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
  }
})