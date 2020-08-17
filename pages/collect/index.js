// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbs:[
      {id:0,name:"商品收藏",isActive:true},
      {id:1,name:"品牌收藏",isActive:false},
      {id:2,name:"店铺收藏",isActive:false},
      {id:3,name:"浏览足迹",isActive:false}
    ],
    collectArr:[]
  },
  itemClick(e){
    const {index} = e.detail
    let {tabbs} = this.data
    tabbs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabbs
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let collectArr = wx.getStorageSync("collectArr")||[];
    this.setData({collectArr})
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