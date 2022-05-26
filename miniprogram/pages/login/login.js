// pages/login/login.js
Page({
  data: {
    haoma:"",
    password:"",


    start: "身份",
    slist: [
    { id: 1, name: "农产品买家" },
    { id: 1, name: "农产品卖家" }
   ],
   isstart: false,
   openimg: "/images/list/list.png",
   offimg: "/images/list/list1.png"
  },

  haomainput:function(e){
    this.data.haoma=e.detail.value

  },
  passwordinput:function(e){
    this.data.password=e.detail.value

  },
  










  opens: function (e) {
   switch (e.currentTarget.dataset.item) {
    case "1":
     if (this.data.isstart) {
      this.setData({
       isstart: false,
      });
     }
     else {
      this.setData({
       isstart: true,
      });
     }
     break;
   }
  },
  onclicks1: function (e) {
   var index = e.currentTarget.dataset.index;
   let name = this.data.slist[index].name;
   this.setData({
    isstart: false,
    isfinish: false,
    isdates: false,
    start: this.data.slist[index].name,
    finish: "身份"
   })
  }

 })
