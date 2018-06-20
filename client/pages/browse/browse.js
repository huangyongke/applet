var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({
  data: {
    id: '',
    start_time: '',
    end_time: '',
    content: ''
  },
  onLoad: function(option){
    this.setData({
      id: option.id
    })
    console.log(option.id)
    this.getplan()
  },
  editPlan: function () {
    wx.redirectTo({
      url: '../plan/plan?id='+this.data.id 
    })
  },
  clearPlan: function(){
    let that = this
    qcloud.request({
      url: `${config.service.deletePlanUrl}`,
      login: false,
      header: {
        'content-type': 'application/json'
      },
      data: {
        id: that.data.id
      },
      success(result) {
        if (!result.data.code) {
          wx.showToast({
            title: '删除完成',
            icon: 'success',
            duration: 2000,
            success: function(){
              wx.reLaunch({
                url: '../index/index',
              })
            }
          })
        }
      }
    })
    
  },
  getplan: function () {
    let that = this
    qcloud.request({
      url: `${config.service.getPlanUrl}`,
      login: false,
      header: {
        'content-type': 'application/json'
      },
      data:{
        id: that.data.id
      },
      success(result) {
        if (!result.data.code) {
          console.log(result.data.data)
          var start_time = util.formatDate(new Date(result.data.data[0].start_time), 'yyyy-MM-dd HH:mm:ss')
          console.log(start_time)
          var end_time = util.formatDate(new Date(result.data.data[0].end_time), 'yyyy-MM-dd HH:mm:ss')
          console.log(end_time)
          that.setData({
            start_time: start_time,
            end_time: end_time,
            content: result.data.data[0].content
          })
        }
      },
      fail(result) {
        console.log(result)
      }
    })
  },

})
