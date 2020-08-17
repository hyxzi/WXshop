import {request} from "../../request/index"
// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    isFours:true,
    isValue:''
  },
  QueryParams:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  TimeId:-1,
  //输入搜索内容
  handleChange(e){
    let value = e.detail.value
    if(!value.trim()){
    this.setData({isFours:true})
    return;
    }else{
      this.QueryParams.query = value
      clearTimeout(this.TimeId)
      this.TimeId=setTimeout(()=>{
        this.search(this.QueryParams)
      },1000)
    }
  },
  //获取后台数据
  async search(){
    const result = await request({url:"/goods/search",data:this.QueryParams})
    let goods = result.data.message.goods
    this.setData({goods,isFours:false})
  },
  //取消搜索
  handleItem(){
    this.setData({
      goods:[],
      isFours:true,
      isValue:""
    })
    console.log(1)
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