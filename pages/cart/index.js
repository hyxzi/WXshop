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
  //商品选中
  handeleChange(e){
    const goods_id = e.currentTarget.dataset.id
    let {cart} = this.data
    let index = cart.findIndex(v=>v.goods_id===goods_id)
    cart[index].check = !cart[index].check
    this.setCart(cart)
  },
  //全选反选
  handleItemChange(){
    let {cart, allCheck} = this.data
    allCheck = !allCheck
    cart.forEach(v=>v.check=allCheck)
    this.setCart(cart)
  },
  //商品数量增加和减少
  async handleEdit(e){
    const {operation,id} = e.currentTarget.dataset
    let {cart} = this.data
    const index = cart.findIndex(v=>v.goods_id===id)
    if(cart[index].num===1&&operation===-1){
      const res = await showModal({content:"你确定要删除该商品吗"})
      if(res.confirm){
        cart.splice(index,1)
        this.setCart(cart)
      }
    }else{
      cart[index].num+=operation
      this.setCart(cart)
      console.log(cart)
    }
    
   
  },
  setCart(cart){
    let address = wx.getStorageSync("address");
    let allCheck = true
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v=>{
      if(v.check){
        totalPrice+=v.goods_price * v.num
        totalNum+=v.num
      }else{
        allCheck = false
      }
    })
    allCheck = cart.length!=0?allCheck:false
    this.setData({
      address,
      cart,
      allCheck,
      totalNum,
      totalPrice
    })
   wx.setStorageSync("cart",cart)
  },
  //点击支付
 async handlePay(){
    const {address,totalNum} = this.data
    if(!address.userName){
      await showToast({title:"您还没有选择收货地址"})
      return;
    }else if(totalNum===0){
      await showToast({title:"您还没有添加商品"})
    }else{
      wx.navigateTo({
        url: '/pages/pay/index',
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    }
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
    this.setCart(cart)
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