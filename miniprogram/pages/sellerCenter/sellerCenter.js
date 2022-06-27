var id;
Page({
  data: {
    nickName: "微信昵称",
    phoneNo: "11111111111",
    status: "我的发布",
    List: 7,//实例展示
    iconURL: "",
    datalist: "",
  },
  
  onLoad: function () {
    this.setData({
      nickName: getApp().globalData.userInfo.nickName,
      iconURL: getApp().globalData.userInfo.avatarUrl
    });
    this.getData();
  },

  getData(){
    wx.cloud.callFunction({
      name:"demogetlist"
    }).then(res=>{
      console.log(res.result.data)
      this.setData({
        datalist:res.result.data
      })
    })
  },

  //点击发布商品按钮
  postgoods: function (e) {
    wx.navigateTo({
      url: '/pages/fabushangpin/fabushangpin',
    })
  },

  changeStatusAboutHuiNong: function(){
    this.setData({
      status: "关于惠农"
    })
  },

  changeStatusMine: function(){
    this.setData({
      status: "我的发布"
    })
  },

  change: function(){
    wx.navigateTo({
      url: '../dingdanxiugai/dingdanxiugai',
    })
  },

  loginPage: function (e) {
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },

  sellerIndexPage: function(){
    wx.redirectTo({
      url: '../sellerIndex/sellerIndex',
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