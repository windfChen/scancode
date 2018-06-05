// pages/code/code.js
import QR from "../../utils/wxqrcode.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    qrcode: '',
    showQrcode: false,
    imageSize : 0,
    inputFocus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imageSize: this.getQRCodeSize()
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

  switchCode: function (event) {
    const content = event.detail.value.textarea;

    if (content == '') {
      this.setData({ inputFocus: true})
      return
    }

    const qrcodeImg = QR.createQrCodeImg(content, {
      size: parseInt(this.data.imageSize)
    })

    this.setData({
      qrcode: qrcodeImg,
      showQrcode: true
    })
  },

  clean: function() {
    this.setData({
      content: ''
    })
  },

  paste: function() {
    wx.getClipboardData({
      success: (res) => {
        this.setData({
          content: res.data
        })
      }
    })
  },

  close: function() {
    this.setData({
      showQrcode: false
    })
  },

  download: function() {

    console.log(this.data.qrcode)
    wx.saveImageToPhotosAlbum({
      filePath: this.data.qrcode,
      success(res) {
        console.log(res)
      }
    })
  },

  getQRCodeSize: function () {
    var size = 0; 
    try {
      var res = wx.getSystemInfoSync();
      // var scale = 750 / 300; //不同屏幕下QRcode的适配比例；设计稿是750宽
      // var width = res.windowWidth / scale;
      size = res.windowWidth - 40;

    } catch (e) {
      // Do something when catch error
      // console.log("获取设备信息失败"+e);
    }
    return size;
  }
})