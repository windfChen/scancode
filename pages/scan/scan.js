// pages/scan/scan.js
const contant = require('../../utils/contant');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeList: [],
    currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.content) {
      this.addCode(options.content)
      wx.showToast({
        title: '当先显示为接收到的消息',
        icon: 'none',
        duration: 2000
      })
    } else {
      this.scan()
    }
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
    return contant.shareInfo()
  }, 

  scan: function() {
    wx.scanCode({
      scanType: 'qrCode',
      success: (result) => {
        this.addCode(result.result)
      }
    })
  },

  addCode: function(content) {
    this.data.codeList[this.data.codeList.length] = content
    this.setData({
      codeList: this.data.codeList.reverse()
    })
  },

  del: function(event) {
    const index = event.currentTarget.dataset.index
    this.data.codeList.splice(index, 1)
    this.setData({
      codeList: this.data.codeList,
      currentIndex: this.data.currentIndex == 0 ? 0 : this.data.currentIndex - 1
    })
  },

  choose: function(event) {
    this.setData({
      currentIndex: event.currentTarget.dataset.index
    })
  },

  copy: function() {
    if (this.data.codeList.length == 0) {
      wx.showToast({
        title: '没有可复制的内容',
        icon: 'none',
        duration: 1000
      })
      return;
    }

    wx.setClipboardData({
      data: this.data.codeList[this.data.currentIndex],
      success: (res) => {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        })
      }
    })    
  }
})