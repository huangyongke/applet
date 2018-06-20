//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
const app = getApp()

Page({
    data: {
      userInfo: null,
      title: '规划',
      plan_lists:[]
    },
    onLoad:function(){
      app.checkSession({
        success: ({ userInfo }) => {
          this.setData({
            userInfo
          })

        }
      })
      this.getplans()
    },
    onShow:function(){
      app.checkSession({
        success: ({ userInfo }) => {
          this.setData({
            userInfo
          })
          
        }
      })
      this.getplans()
    },
    onTapLogin() {
      app.login({
        success: ({ userInfo }) => {
          this.setData({
            userInfo
          })
          this.getplans()
        }
      })
    },
    getplans: function () {
      let that = this
      qcloud.request({
        url: `${config.service.getPlansUrl}`,
        login: false,
        header: {
          'content-type': 'application/json'
        },
        success(result) {
          console.log(result.data)
          if (!result.data.code) {
            var plans = []
            result.data.data.forEach(p => {
              var plan = {}
              plan.id = p.id
              plan.start_date = util.formatDate(new Date(p.start_time), 'yyyy-MM-dd')
              plan.end_date = util.formatDate(new Date(p.end_time), 'yyyy-MM-dd')
              plan.start_time = util.formatDate(new Date(p.start_time), 'HH:mm')
              plan.end_time = util.formatDate(new Date(p.end_time), 'HH:mm')
              plan.content = p.content
              plans.push(plan)
            })
            that.setData({
              plan_lists: plans
            })
          }
        }
      })
    },
    addPlan: function () {
      wx.navigateTo({
        url: '../plan/plan',
      })
    },
    watchPlan: function(event) {
      wx.navigateTo({
        url: '../browse/browse?id='+ event.currentTarget.dataset.id,
      })
    }
})
