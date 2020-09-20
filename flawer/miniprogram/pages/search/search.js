// miniprogram/pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[],
    input_value:'', //value值
  },
  getlanData : function(e){
    this.data.search = e.detail.value;
    console.log(this.data.search)
   },

   getMessa(res) {
    var that=this;
    var picture=res.currentTarget.dataset.id;
    console.log(picture)
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
            let url = picture
            console.log(url)
            try {
              var res_imgurl = wx.getStorageSync('url')
              if (res_imgurl) {
                console.log(res_imgurl)
              }
            } catch (e) {
              console.log(err)
            }
            console.log(res_imgurl)
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
                    var res_data = res.data
                    wx.setStorageSync("res_data", res_data),
                    console.log(res.data.result)
                      wx.navigateTo({
                        url: "../end/end"
                      });
                  }
                })
              }
            })
      }
    })

  },

 SearchTranslate : function(e){
    var i = this.data.search   //获取输入框输入内容

    const db = wx.cloud.database()
    const _ = db.command 

    db.collection('language')
    .where(_.or({
      language:{
        $regex:'.*'+i+'.*',
        $options: 'i'
      } 
    },{
      name:{
        $regex:'.*'+i+'.*',
        $options: 'i'
      } 
    }))

    .get({
       success : res =>{
         console.log('.*'+i+'.*')
         this.setData({
           data : res.data
          })
          console.log('[搜索成功]',res.data)
          let res_data = JSON.stringify(res.data)
          
          wx.navigateTo({
            url: '/pages/show/show?data='+res_data,
          })
        },fail(res){
          console.log(res)
        }
      })
   },
 

  this_value:function(e){
   let value =e.currentTarget.dataset.text;
   console.log(value)
   this.setData({
     search:value,
     input_value:value
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db=wx.cloud.database()
    const banner=db.collection('Swi')
    banner.get().then(res=>{
      console.log(res)
      this.setData({
        banner:res.data
      })
    })
    .catch(err=>{
      console.log(err)
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

  },
 

})

