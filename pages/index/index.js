import {request} from "../../request/index"
//Page Object
Page({
  data: {
    swiperList:[],
    catitemList:[],
    floorList:[]
  },
  //options(Object)
  onLoad: function(options){

    this.getSwiperList();
    this.getCatitems();
    this.getFloorList();
  },
  //获取轮播图数据
  getSwiperList(){
    request({url:"/home/swiperdata"}).then(result=>{
      let message = []
      result.data.message.forEach((v)=>{
        v.navigator_url = v.navigator_url.replace(/main/,"index")
        message.push(v)
      })
      
      
      this.setData({
        swiperList:message
      })
    })
  },
  
  //获取商品分类导航数据
  getCatitems(){
    request({url:"/home/catitems"}).then(result=>{
      this.setData({
        catitemList:result.data.message
      })
    })
  },
  //获取楼层数据
  getFloorList(){
    request({url:"/home/floordata"}).then(result=>{
      let message = result.data.message
      let arr = []
      /* result.data.message.forEach((v)=>{
        v.navigator_url = v.navigator_url.replace(/goods_list/,"goods_list/index")
        v.product_list.forEach(v=>{
          v.navigator_url = v.navigator_url.replace(/goods_list/,"goods_list/index")
          message.push(v)
        })
         //v.product_list = message
        arr.push(v)
       
        //console.log(v..navigator_url)
      }) */
      for(let i = 0;i<message.length;i++){
        for(let j = 0;j<message[i].product_list.length;j++){
         message[i].product_list[j].navigator_url = message[i].product_list[j].navigator_url.replace(/goods_list/,"goods_list/index") 
        }
       /*  console.log(message[i].product_list) */
      }
      
      console.log(message)
      this.setData({
        floorList:message
      })
    })
  },
  
  onReady: function(){
    
  },
  onShow: function(){
    
  },
  onHide: function(){

  },
  onUnload: function(){

  },
  //下拉刷新界面
  onPullDownRefresh: function(){
    this.getSwiperList();
    this.getCatitems();
    this.getFloorList();
    wx.stopPullDownRefresh()
  },
  onReachBottom: function(){

  },
  onShareAppMessage: function(){

  },
  onPageScroll: function(){

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item){

  }
});