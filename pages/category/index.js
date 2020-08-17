import {request} from "../../request/index"
import regeneratorRuntime from '../../lib/runtime/runtime';
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftmenuList:[],
    rightmenuList:[],
    currentIndex:0,
    scrollTop:0
  },
  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates = wx.getStorageSync('cates')
    //检查缓存是否有数据，没有就重新加载，否则使用旧数据
    if(!Cates){
      this.getCateList()
    }else{
      if(Date.now()-Cates.time>10000){
        this.getCateList()
      }else{
        this.Cates = Cates.data
         //获取左边菜单栏数据
        let leftmenuList = this.Cates.map(v=>v.cat_name)
        //获取右边菜单栏数据
        let rightmenuList = this.Cates[0].children
        this.setData({
          leftmenuList,
          rightmenuList
            //swiperList:result.data.message
          })
        }
    }
    
  },
  async getCateList(){
    /* request({url:"/categories"}).then(result=>{
    this.Cates = result.data.message
    wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
    //获取左边菜单栏数据
    let leftmenuList = this.Cates.map(v=>v.cat_name)
    //获取右边菜单栏数据
    let rightmenuList = this.Cates[0].children
    this.setData({
      leftmenuList,
      rightmenuList
      })
    }) */
    const result = await request({url:"/categories"})
    //把数据存储到缓存中
    this.Cates = result.data.message
    wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
    //获取左边菜单栏数据
    let leftmenuList = this.Cates.map(v=>v.cat_name)
    //获取右边菜单栏数据
    let rightmenuList = this.Cates[0].children
    this.setData({
      leftmenuList,
      rightmenuList
      })
  },
  handItem(e){
    console.log(e.target.dataset.index)
    let currentIndex = e.target.dataset.index
    let rightmenuList = this.Cates[currentIndex].children
    this.setData({
     currentIndex,
     rightmenuList,
     scrollTop:0
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})