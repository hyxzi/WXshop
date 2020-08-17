import {request} from "../../request/index"
import regeneratorRuntime from '../../lib/runtime/runtime';
// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    good_detail:{},
    isCollect:false
  },
GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const goods_id = options.goods_id
    
    this.getGoodsdetail(goods_id)
  },
  //获取商品详情数据
  async getGoodsdetail(goods_id){
    
    const good_detail = await request({url:"/goods/detail",data:{goods_id}})
    this.GoodsInfo = good_detail.data.message
   let collectArr = wx.getStorageSync("collectArr")||[]
   //判断商品是否被收藏
   let isCollect = collectArr.some(v=>v.goods_id===this.GoodsInfo.goods_id)
    this.setData({
      good_detail:{
        pics:good_detail.data.message.pics,
        goods_price:good_detail.data.message.goods_price,
        goods_name:good_detail.data.message.goods_name,
        goods_introduce:good_detail.data.message.goods_introduce
      },
      isCollect
    })
  },
  //点击图片浏览大图
handlePrevewImage(e){
  const urls = this.GoodsInfo.pics.map(v=>v.pics_mid)
 /*  console.log(urls) */
  const current = e.currentTarget.dataset.url

  wx.previewImage({
    current,
    urls,
  });
},
//点击加入购物车
handCartAdd(){
  let cart = wx.getStorageSync("cart") || [];
  let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
  if(index === -1){
    this.GoodsInfo.num = 1
    this.GoodsInfo.check = true
    cart.push(this.GoodsInfo)
  }else {
    cart[index].num++
  }
  wx.setStorageSync("cart",cart)
  wx.showToast({
    title: '加入成功',
    icon: 'success',
    mask: true,
    
  });
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
    let pages = getCurrentPages();
    let currentPages = pages[pages.length-1]
    let options = currentPages.options
    const {goods_id} = options
    this.getGoodsdetail(goods_id)
    console.log(goods_id)
    

  },
  handleCollect(){
    let collectArr = wx.getStorageSync("collectArr")||[];
    let index = collectArr.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
    let isCollect = false
    if(index!=-1){
      collectArr.splice(index,1)
      isCollect = false
    }else{
      collectArr.push(this.GoodsInfo)
      isCollect = true
    }
    wx.setStorageSync("collectArr",collectArr)
    this.setData({isCollect})
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