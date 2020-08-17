import {request} from "../../request/index"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbs:[
      {
        id:0,
        name:'综合',
        isActive:true
      },
      {
        id:1,
        name:'销量',
        isActive:false
      },
      {
        id:2,
        name:'价格',
        isActive:false
      }
    ],
    goodsList:[],
    imgSrc:'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg'
  },
  //商品列表数据
  QueryParams:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.QueryParams.cid = options.cid
    this.QueryParams.query = options.query || ''
    this.getGoodsList()
    
  },
  async getGoodsList(){
    const result = await request({url:"/goods/search",data:this.QueryParams})
    //获取总条数
    const total = result.data.message.total
    //获取总页数
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
    let goodsList = result.data.message.goods
    console.log(goodsList)
    this.setData({
      goodsList:[...this.data.goodsList,...goodsList]
    })
    wx.stopPullDownRefresh()
  
  },
  //点击导航样式跟着改变
  itemClick(e){
    const {index} = e.detail
    let {tabbs} = this.data
    tabbs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabbs
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
    this.totalPages = 1
    this.QueryParams.pagenum = 1
    this.setData({
      goodsList:[]
    })
    this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.QueryParams.pagenum>=this.totalPages){
      wx.showToast({
        title:"已经到底了",
        icon:"none",
        duration:1000
      })
    }else{
      this.QueryParams.pagenum++
      this.getGoodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})