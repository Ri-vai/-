// miniprogram/pages/show/show.js
Page({
  
  getToken(res) {
    var that=this;
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token',
      data: {
        grant_type: 'client_credentials',
        client_id: 'AuzARGYtxef9F5jHeQb35zxZ',
        client_secret: 'IIldDWEM05bZ47YTIjQw6nLLyEQmeXy0',
      },

      success(res) {

        console.log(res.data.access_token)

        let token = res.data.access_token

        wx.chooseImage({

          count: 1,
          sizeType: ['original', 'compressed'],
          sourseType: ['album', 'camera'],
          success(res) {
            console.log(res)
            let url = res.tempFilePaths[0]
            //图片转码
            wx.getFileSystemManager().readFile({
              
              filePath: url,
              encoding: 'base64',
              success(res) {
                console.log(res)
                let base64 = res.data
                wx.request({

                  url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant',
                  header: {
                    "Content-type": "application/x-www-form-urlencoded",
                  },
                  method: 'post',
                  data: {
                    image: base64,
                    access_token: token,
                    baike_num: 1
                  },
                  success: function (res) {
                    console.log(res.data.result)
                    let botanyimg = res.data.result
                    let botanydata =botanyimg.map((item)=>{
                      let name = item.name;
                      let score = item.score.toFixed(3);
                      let baike = item.baike_info
                      
                      return {
                        name,
                        score,
                        baike
                      
                      }
                    })
                    console.log(botanydata)
                    that.setData({
                      botanyimg: botanydata
                    })
                  }
                })


              }
            })
          }
        })



      }
    })

  },
  /**
   * 页面的初始数据
   */
  data: {
    botanyimg: [],
    imgurl: "",
    itemData: []
  },

  /**e
   * 生命周期函数--监听页面加载
   */
  onLoad (e){
    console.log(e)
    var itemData = JSON.parse(e["data"]);
    console.log(itemData)
        this.setData({
          Data:itemData
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