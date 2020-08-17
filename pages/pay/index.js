import {getSetting, openSetting, chooseAddress, showModal, showToast} from "../../utils/asyncWx"
// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allCheck:false,
    totalPrice:0,
    totalNum:0
  },
  //点击获取收货地址
  async handleChooseAddress(){
    try{
      const res = await getSetting()
      const scopeAddress = res.authSetting['scope.address']
      //判断权限状态
      if(scopeAddress === false){
        await openSetting()
      }
      //调用收货地址的api
      const res2 = await chooseAddress()
      wx.setStorageSync("address", res2);
      
      this.setData({
        address:res2
      })
    }catch(e){
      console.log(e)
    }
  },
  
  setCart(cart){
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v=>{
      if(v.check){
        totalPrice+=v.goods_price * v.num
        totalNum+=v.num
      }
    })
    this.setData({
      cart,
      totalNum,
      totalPrice
    })
  
  },
  //点击结算
handlePay(){
  const cart = wx.getStorageSync("cart") || []
  let checkCart = cart.filter(v=>!v.check)
  wx.setStorageSync("cart", checkCart);
  wx.navigateBack({
    delta: 2
  });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart") || []
    let checkCart = cart.filter(v=>v.check)
    console.log(checkCart)
    this.setCart(checkCart)
    this.setData({address})
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