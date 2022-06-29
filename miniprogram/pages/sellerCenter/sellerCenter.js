var id;
const db = wx.cloud.database()
Page({
  data: {
    dyingphotopath: '',//删除图片时用到的路径索引
    nickName: "微信昵称",
    phoneNo: "",
    status: "我的发布",
    List: 7,//实例展示
    iconURL: "",
    datalist: "",
  },

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
        phoneNo: res.data.phoneNumber,
      })
      that.getData();
    })
  },

  //获取数组信息
  getData() {
    var that = this;
    console.log(this.data.phoneNo);
    db.collection('orderform').where({
      number: that.data.phoneNo
    })
      .get({
        success: function (res) {
          that.setData({
            datalist: res.data.reverse(),
          })
        }
      })
  },

  //点击发布商品按钮
  postgoods: function (e) {
    wx.navigateTo({
      url: '/pages/fabushangpin/fabushangpin',
    })
  },

  //点击删除按钮
  shanchu: function (e) {
    console.log('删除函数运行')
    console.log(e.currentTarget.dataset.index)
    var that = this;
    //获取删除图片路径
    db.collection('orderform').doc(e.currentTarget.dataset.index).get({
      success: function (res) {
        // res.data 包含该记录的数据
        console.log(res.data)
        that.setData({
          dyingphotopath: res.data.photoID
        })
        //删除云端图片
        wx.cloud.deleteFile({
          fileList: [that.data.dyingphotopath],
          success: res => {
            // handle success
            console.log("删除照片函数已运行")
          },
          fail: console.error
        })
      }
    })
    //删除云端记录
    db.collection('orderform').doc(e.currentTarget.dataset.index).remove({
      success: function (res) {
        that.getData();
      }
    })
  },

  changeStatusAboutHuiNong: function () {
    this.setData({
      status: "关于惠农"
    })
  },

  changeStatusMine: function () {
    this.setData({
      status: "我的发布"
    })
  },

  //修改信息的页面，包括传参
  change: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '../dingdanxiugai/dingdanxiugai?id=' + e.currentTarget.dataset.index,
    })
  },

  loginPage: function (e) {
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },

  sellerIndexPage: function () {
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