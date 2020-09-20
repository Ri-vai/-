// miniprogram/pages/end/end.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: "",
    itemData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var res_imgurl = wx.getStorageSync("res_imgurl");
      var res_data = wx.getStorageSync("res_data");
       
      var itemData = res_data["result"];
        this.setData({
          imgurl: res_imgurl,
          itemData: itemData
        });
        for (var a = this.data.itemData, s = [],m=[], e = 0, o = a.length; e < o; e++) {
            var i = (100 * Number(a[e].score)).toFixed(2);
            s.push(i);
           
        }
        this.setData({
            score: s
        }), console.log(this.data.itemData);


        var j= this.data.itemData[0].name;
        console.log('测试',j)
        const db=wx.cloud.database()
        db.collection('language')
        .where({
           name:j
        }) 
        .get({
          success:res=>{
          console.log(j)
          console.log('[寻找对应花语成功]',res.data[0].language) 
          this.setData({
            langua: res.data[0].language
          }),
          console.log('[寻找对应花语成功]',langua)
          }
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

  }
})