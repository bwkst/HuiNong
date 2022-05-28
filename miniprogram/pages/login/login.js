// pages/login/login.js
Page({
  data: {
    haoma:"",
    password:"",
    array: ['农产品买家', '农产品卖家'],
    isstart: false,
  },

  haomainput:function(e){
    this.data.haoma=e.detail.value

  },
  passwordinput:function(e){
    this.data.password=e.detail.value

  },
  slist:function(e){
    this.data.slist=e.detail.value

  },
  
  register:function(e){
   wx.redirectTo({
     url: '/pages/register/register',
   })
  },
  resetpassword:function(e){
    wx.redirectTo({
      url: '/pages/resetPassword/resetPassword',
    })
   },

   login:function(e){
   var that=this
     if(that.data.array==''){
    wx.showModal({
      title: '提示',
      content: '请选择身份',
      showCancel:false,
      success (res) { }
    })
   }
       else if(that.data.haoma==''){
    wx.showModal({
      title: '提示',
      content: '请填写手机号码',
      showCancel:false,
      success (res) { }
   })
  }
      else if(that.data.password==''){
    wx.showModal({
      title: '提示',
      content: '请填写密码',
      showCancel:false,
      success (res) { }
    })
   }
   else if(that.data.haoma.length!='11'){
    wx.showModal({
      title: '提示',
      content: '手机号码长度有误',
      showCancel:false,
      success (res) { }
   })
  }
    else wx.redirectTo({
    url: '/pages/resetPassword/resetPassword',
  })
   },


 
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
            data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
            break;
          case 1:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            data.multiArray[2] = ['鲫鱼', '带鱼'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                break;
              case 1:
                data.multiArray[2] = ['蛔虫'];
                break;
              case 2:
                data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                break;
              case 3:
                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                break;
              case 4:
                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['鲫鱼', '带鱼'];
                break;
              case 1:
                data.multiArray[2] = ['青蛙', '娃娃鱼'];
                break;
              case 2:
                data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        break;
    }
    console.log(data.multiIndex);
    this.setData(data);
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  }






 })
