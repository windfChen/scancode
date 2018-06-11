
const shareInfo = content => {
  let path = '/pages/code/code'
  if (content) {
    path = `/pages/scan/scan?content=${content}`
  }
  return {
    title: '二维码小工具',
    path: path,
    imageUrl: '/images/defaultQrcode.png'
  }
}

export {
  shareInfo
}