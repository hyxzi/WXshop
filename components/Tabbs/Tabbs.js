// components/Tabbs/Tabbs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbs:{
      type:Array,
      name:[]
    }
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
    itemClick(e){
      const {index} = e.currentTarget.dataset
      this.triggerEvent("tabbItemChange",{index})
    }
  }
})
