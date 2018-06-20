const app = getApp();
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    newplan: true,
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    content: ''
  },
  onLoad: function (option) {
    console.log(option)
    if(option.id){
      this.setData({
        newplan: false,
        id: option.id
      })
      this.getplan()
    }else{
      this.setData({
        newplan: true,
        start_date: util.formatDate(new Date(), 'yyyy-MM-dd'),
        start_time: util.formatDate(new Date(), 'HH:mm'),
        end_date: util.formatDate(new Date(), 'yyyy-MM-dd'),
        end_time: util.formatDate(new Date(), 'HH:mm'),
      })
    }
  },
  onShow: function () {

  },
  onInput(event) {
    this.setData({
      content: event.detail.value
    })
  },
  bindStartTimeChange: function (e) {
    this.setData({
      start_time: e.detail.value
    })
  },
  bindStartDateChange: function (e) {
    this.setData({
      start_date: e.detail.value
    })
  },
  bindEndTimeChange: function (e) {
    this.setData({
      end_time: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    this.setData({
      end_date: e.detail.value
    })
  },
  done: function () {
    if (!this.data.content) {
      util.showModel('失败', '请填写内容')
    } else {
      if(this.data.newplan)
        this.addplan()
      else
        this.modifyplan()
    }
  },
  getplan: function () {
    let that = this
    qcloud.request({
      url: `${config.service.getPlanUrl}`,
      login: false,
      data: {
        id: that.data.id
      },
      success(result) {
        console.log(result.data)
        if (!result.data.code) {
          console.log(result.data.data)
          that.setData({
            start_date: util.formatDate(new Date(result.data.data[0].start_time), 'yyyy-MM-dd'),
            end_date: util.formatDate(new Date(result.data.data[0].end_time), 'yyyy-MM-dd'),
            start_time: util.formatDate(new Date(result.data.data[0].start_time), 'HH:mm'),
            end_time: util.formatDate(new Date(result.data.data[0].end_time), 'HH:mm'),
            content: result.data.data[0].content
          })
        }
      }
    })
  },
  addplan: function(){
    let that = this
    var start = that.data.start_date + ' ' + that.data.start_time + ':00'
    var end = that.data.end_date + ' ' + that.data.end_time + ':00'
    console.log(start)
    console.log(end)
    qcloud.request({
      url: `${config.service.addPlaneUrl}`,
      login: false,
      method: 'POST',
      data: {
        start_time: that.data.start_date + ' ' + that.data.start_time+':00',
        end_time: that.data.end_date + ' ' + that.data.end_time+':00',
        content: that.data.content
      },
      success(result) {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          complete: function () {
            wx.reLaunch({
              url: '../index/index',
            })
          }
        })
      }
    })
  },
  modifyplan: function () {
    let that = this
    qcloud.request({
      url: `${config.service.modifyPlanUrl}`,
      login: false,
      method: 'POST',
      data: {
        id: that.data.id,
        start_time: that.data.start_date + ' ' + that.data.start_time,
        end_time: that.data.end_date + ' ' + that.data.end_time,
        content: that.data.content
      },
      success(result) {
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          complete: function () {
            wx.reLaunch({
              url: '../index/index',
            })
          }
        })
      }
    })
  }

});