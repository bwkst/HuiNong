// pages/buyerAddress/buyerAddress.js
var a = ["1","2","3"]
var num
var DatabaseName=''
var DatabasePhoneNo=''
var DatabaseSheng=''
var DatabaseShi=''
var DatabaseQu=''
var DatabaseAddress=''
var ID
var id
var NowdeliveryName
var NowdeliveryPhone
var NowdeliverySheng
var NowdeliveryShi
var NowdeliveryQu
var NowdeliveryAddress
Page({
  data: {
    deliveryName: "",
    deliveryPhoneNo: "",
    deliveryRegion: "",
    deliverySheng: "",
    deliveryShi: "",
    deliveryQu: "",
    deliveryAddress: "",
    customItem: '全部',
    status: "显示",
  },

  onLoad: function () {
    console.log(getApp().globalData.phonenumber)//我的宝贝
    wx.cloud.database().collection('buyerAddress')
    .get()
    .then(res=>{
      for (let index = 0; index < res.data.length; index++) {
          if(res.data[index].identifyPhoneNo == getApp().globalData.phonenumber){
            if (res.data[index].deliveryName == '') {
              num = index
              console.log(res.data[index].identifyPhoneNo)
              this.setData({
                deliveryName: '未输入收货人'
              })
            }
            else{
              this.setData({
                deliveryName:res.data[index].deliveryName
              })
            }
            if (res.data[index].deliveryPhoneNo == '') {
              console.log(this.data.deliveryName)
              this.setData({
                deliveryPhoneNo: '未输入收货手机号'
              })
            }
            else{
              console.log(this.data.deliveryPhoneNo)
              this.setData({
                deliveryPhoneNo:res.data[index].deliveryPhoneNo
              })
            }
            if (res.data[index].deliveryRegion == '') {
              this.setData({
                deliveryRegion: '未输入收货地区'
              })
            }
            else{
              this.setData({
                deliveryRegion:res.data[index].deliveryRegion
              })
            }
            if (res.data[index].deliverySheng == '') {
              this.setData({
                deliverySheng: '未输入收货省'
              })
            }
            else{
              this.setData({
                deliverySheng:res.data[index].deliverySheng
              })
            }
            if (res.data[index].deliveryShi == '') {
              this.setData({
                deliveryShi: '未输入收货市'
              })
            }
            else{
              this.setData({
                deliveryShi:res.data[index].deliveryShi
              })
            }
            if (res.data[index].deliveryQu == '') {
              this.setData({
                deliveryQu: '未输入收货区'
              })
            }
            else{
              this.setData({
                deliveryQu:res.data[index].deliveryQu
              })
            }
            if (res.data[index].deliveryAddress == '') {
              this.setData({
                deliveryAddress: '未输入收货详细地址'
              })
            }
            else{
              this.setData({
                deliveryAddress:res.data[index].deliveryAddress
              })
            }
            this.setData({
              customItem: '全部',
            })
          
          
        }
        
      }
    })
    this.setData({            //从数据库拉下来
      customItem: '全部',
    })
  },
//下边这个函数是选位置的
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.data.deliverySheng = e.detail.value[0]
    this.data.deliveryShi = e.detail.value[1]
    this.data.deliveryQu = e.detail.value[2]
    wx.cloud.database().collection('buyerAddress')
    .where({
      deliveryPhoneNo: getApp().globalData.phonenumber
    })
    .get()
    .then(res=>{
      DatabaseSheng = res.data.deliverySheng
      DatabaseShi = res.data.deliveryShi
      DatabaseQu = res.data.deliveryQu
    })
    this.setData({
      deliveryRegion: e.detail.value,
      deliverySheng: e.detail.value[0],
      deliveryShi: e.detail.value[1],
      deliveryQu: e.detail.value[2]
    })
     if (DatabaseSheng != this.data.deliverySheng) {
      this.setData({
        status: "修改完成"
      })
      NowdeliverySheng = this.data.deliverySheng
    } else if (DatabaseShi != this.data.deliveryShi) {
      this.setData({
        status: "修改完成"
      })
      NowdeliveryShi = this.data.deliveryShi
    } else if (DatabaseQu != this.data.deliveryQu) {
      this.setData({
        status: "修改完成"
      })
      NowdeliveryQu = this.data.deliveryQu
    }
      else{
        this.setData({
          status:"修改中"
        })
      }
   // this.haveChange(e);
  },
//下边这个函数是选收货人 手机号 详细地址的
  haveChangename: function (e) {     
    //目前的修改数据是否和数据库内数据对比，有区别才可以提交修改
    //下方condition需改
    console.log(e.detail)
    this.data.deliveryName = e.detail.value
    wx.cloud.database().collection('buyerAddress')
    .where({
      identifyPhoneNo: getApp().globalData.phonenumber
    })
    .get()
    .then(res=>{
      DatabaseName = res.data.deliveryName
    })
    console.log(this.data.deliveryName)
    if (DatabaseName != this.data.deliveryName) {
      this.setData({
        status: "修改完成"
      })
      NowdeliveryName = this.data.deliveryName
    } else {
      this.setData({
        status: "修改中"
      })
    }
  },

haveChangephone:function(e){
  console.log(e.detail)
    this.data.deliveryPhoneNo = e.detail.value
    wx.cloud.database().collection('buyerAddress')
    .where({
      identifyPhoneNo: getApp().globalData.phonenumber
    })
    .get()
    .then(res=>{
      DatabasePhoneNo = res.data.deliveryPhoneNo
    })
    if (DatabasePhoneNo != this.data.deliveryPhoneNo) {
      this.setData({
        status: "修改完成"
      })
      NowdeliveryPhone = this.data.deliveryPhoneNo
      console.log(NowdeliveryPhone)
    } 
},

haveChangeaddress:function(e){
    console.log(e.detail)
    this.data.deliveryAddress = e.detail.value
    wx.cloud.database().collection('buyerAddress')
    .where({
      deliveryPhoneNo: getApp().globalData.phonenumber
    })
    .get()
    .then(res=>{
      DatabaseAddress = res.data.deliveryAddress
    })
    if (DatabaseAddress != this.data.deliveryAddress) {
      this.setData({
        status: "修改完成"
      })
      NowdeliveryAddress = this.data.deliveryAddress
    } 
},

  return: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },

  changeInfo: function () {
    this.setData({
      status: "修改中"
    })
  },

  submitChange: function () {
    this.setData({
      status: "修改完成"
    })
    //更新数据库
    wx.cloud.database().collection('buyerAddress')
    .where({
      identifyPhoneNo: getApp().globalData.phonenumber
    })
    .get()
    .then(res=>{
      id = res.data[num]._id
    })
    wx.cloud.database().collection('buyerAddress')
      .doc(id)
      .update({
        data:{
          deliveryName: NowdeliveryName,
          deliveryPhoneNo: NowdeliveryPhone,
          deliverySheng: NowdeliverySheng,
          deliveryShi: NowdeliveryShi,
          deliveryQu: NowdeliveryQu,
          deliveryAddress: NowdeliveryAddress
        }
      })
  },

  cancelChange: function () {
    this.setData({
      status: "显示"
    })
  }
})