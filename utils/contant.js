
const shareInfo = content => {
  return {
    title: '二维码小工具',
    path: `/pages/index/index${content ?'?content=' + content: ''}`,
    imageUrl: '/images/defaultQrcode.png'
  }
}

export {
  shareInfo
}