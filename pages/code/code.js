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

    // 如果内容为空，什么都不操作
    if (content == '') {
      this.setData({ inputFocus: true})
      return
    }

    // 生成base64格式二维码图片图片
    const qrcodeImg = QR.createQrCodeImg(content, {
      size: parseInt(this.data.imageSize)
    })

    // 改变变量
    this.setData({
      qrcode: qrcodeImg,
      showQrcode: true
    })
    console.log(this.data.imageSize)
    console.log(qrcodeImg)
    // 画布绘图
    const canvasContext = wx.createCanvasContext('qrcodeCanvas')
    canvasContext.drawImage(qrcodeImg, 0, 0, this.data.imageSize, this.data.imageSize)
    canvasContext.draw()

    console.log('draw')

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
        console.log(res.tempFilePath)

        // 图像保存
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            console.log(res)
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
      // Do something when catch error
      // console.log("获取设备信息失败"+e);
    }
    return size;
  }
})