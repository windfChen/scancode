// pages/code/code.js
const QR = require('../../utils/qrcode/index');
const contant = require('../../utils/contant');

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
  onShow: function (options) {
  
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
    if (this.data.content != '') {
      return {
        title: '有句话一直想对你说',
        path: '/pages/scan/scan?content=' + this.data.content,
        imageUrl: '/images/defaultQrcode.png'
      }
    }

    return contant.shareInfo()
  },

  switchCode: function (event) {
    const content = event.detail.value.textarea;

    // 如果内容为空，什么都不操作
    if (content == '') {
      this.setData({ inputFocus: true})
      wx.showToast({
        title: '请填写内容',
        icon: 'none',
        duration: 1000
      })
      return
    }

    // 使用canvas绘制二维码d
    const canvasContext = wx.createCanvasContext('qrcodeCanvas')
    QR.drawQRCodeToCanvas(content, {
      ctx: canvasContext,
      size: this.data.imageSize,
      color: '#000000',
      background: '#FFFFFF'
    });
    canvasContext.draw();

    // 改变变量
    this.setData({
      content: content,
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
    // 画布生成图像
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: this.data.imageSize,
      height: this.data.imageSize,
      destWidth: this.data.imageSize,
      destHeight: this.data.imageSize,
      canvasId: 'qrcodeCanvas',
      success: function (res) {

        // 图像保存
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
          }
        })
      }
    })
  },

  getQRCodeSize: function () {
    var size = 0; 
    try {
      var res = wx.getSystemInfoSync();
      size = res.windowWidth - 40;

    } catch (e) {
      console.log("获取设备信息失败:"+e);
    }
    return size;
  }
})