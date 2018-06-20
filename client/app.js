//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
let userInfo
App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    },
    login({ success, error }) {
      wx.getSetting({
        success: res => {
          console.log(res)
          if (res.authSetting['scope.userInfo'] === false) {
            // 已拒绝授权
            wx.showModal({
              title: '提示',
              content: '请授权我们获取您的用户信息',
              showCancel: false,
              success: () => {
                wx.openSetting({
                  success: res => {
                    if (res.authSetting['scope.userInfo'] === true) {
                      this.doQcloudLogin({ success, error })
                    }
                  }
                })
              }
            })
          } else {
            console.log("未授权")
            this.doQcloudLogin({ success, error })
          }
        }
      })
    },

    doQcloudLogin({ success, error }) {
      console.log("登录")
      // 调用 qcloud 登陆接口
      qcloud.login({
        success: result => {
          console.log(result)
          if (result) {
            userInfo = result

            success && success({
              userInfo
            })
          } else {
            console.log("获取信息")
            // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
            this.getUserInfo({ success, error })
          }
        },
        fail: (err) => {
          console.log("登录失败" + err)
          error && error()
        }
      })
    },

    getUserInfo({ success, error }) {
      if (userInfo) return userInfo
      console.log("获取用户信息")
      qcloud.request({
        url: `${config.service.requestUrl}`,
        login: true,
        success: result => {
          let data = result.data

          if (!data.code) {
            userInfo = data.data

            success && success({
              userInfo
            })
          } else {
            error && error()
          }
        },
        fail: () => {
          error && error()
        }
      })
    },

    checkSession({ success, error }) {
      if (userInfo) {
        return success && success({
          userInfo
        })
      }

      wx.checkSession({
        success: () => {
          console.log("session成功")
          this.getUserInfo({
            success: res => {
              userInfo = res.userInfo

              success && success({
                userInfo
              })
            },
            fail: () => {
              error && error()
            }
          })
        },
        fail: () => {
          console.log("session失败")
          error && error()
        }
      })
    }
})