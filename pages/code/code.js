// pages/code/code.js
const QR = require('../../utils/qrcode/index');
const contant = require('../../utils/contant');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    imgSrc: '',
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
    this.setData({
      content
    })

    this.toQRCode();
  },

  toQRCode() {
    const content = this.data.content;
    const imgSrc = this.data.imgSrc;

    // 如果内容为空，什么都不操作
    if (content == '') {
      this.setData({ inputFocus: true })
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

    // 设置图片
    if (imgSrc) {
      canvasContext.drawImage(imgSrc, 
          this.data.imageSize * 0.36, this.data.imageSize * 0.36, 
          this.data.imageSize * 0.28, this.data.imageSize * 0.28);
    }

    canvasContext.draw();

    // 改变变量
    this.setData({
      content: content,
      showQrcode: true
    })
  },

  setImage() {
    wx.chooseImage({
      success: (res) => {
        const tempFilePaths = res.tempFilePaths
        this.setData({
          imgSrc: tempFilePaths[0]
        })

        this.toQRCode();
      }
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
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              this.doDownload()
            }
          })
        } else {
          this.doDownload()
        }
      }
    })
  },

  doDownload() {
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
          }
        })
      }
    })
  },

  getQRCodeSize: function () {
    var size = 0; 
    try {
      var res = wx.getSystemInfoSync();
      size = res.windowWidth - 50;
    } catch (e) {
      console.log("获取设备信息失败:"+e);
    }
    return size;
  },

  copyLink() {
    wx.setClipboardData({
      data: '460436388',
      success: (res) => {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        })
      }
    })  
  },
  
  showAd: function() {
    // 在页面中定义激励视频广告
    let videoAd = null

    // 在页面onLoad回调事件中创建激励视频广告实例
    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-bab5c106fb162274'
      })
      videoAd.onLoad(() => { 
        console.log('激励视频加载完成')
      })
      videoAd.onError((err) => { })
      videoAd.onClose((res) => { })
    }

    // 用户触发广告后，显示激励视频广告
    if (videoAd) {
      videoAd.show().catch(() => {
        // 失败重试
        videoAd.load()
          .then(() => videoAd.show())
          .catch(err => {
            console.log('激励视频 广告显示失败')
          })
      })
    }
  },

  showInterstitialAd() {
    // 在页面中定义插屏广告
    let interstitialAd = null

    // 在页面onLoad回调事件中创建插屏广告实例
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-dafbf0c217a8a6af'
      })
      interstitialAd.onLoad(() => { })
      interstitialAd.onError((err) => { })
      interstitialAd.onClose(() => { })
    }

    // 在适合的场景显示插屏广告
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  }
})