// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:Array,
    value:[]
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    hangdleItemTap(e) {
      console.log(e);
      // 1.获取点击的索引
      const { index } = e.currentTarget.dataset;
      // 2.触发 父组件中的事件  自定义
      // this.triggerEvent("事件名"，参数)
      this.triggerEvent("tabsItemChange",{index})
    }
  }


  
})
