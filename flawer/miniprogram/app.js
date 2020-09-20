//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.globalData = {}
  },
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
                      
                      },
                      wx.navigateTo({
                        url: "../end/end"
                      });
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

  }
})
