let axjxTimes = 0
export const request=(params)=>{
  axjxTimes++
  wx.showLoading({
    title:"正在加载",
    mask:true
  })
  return new Promise((resolve,reject)=>{
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
    wx.request({
      ...params,
      url:baseUrl + params.url,
      success: (result)=>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err);
      },
      complete:()=>{
        axjxTimes--
        if(axjxTimes===0){
          wx.hideLoading()
        }
        
      }
    })
  })
}