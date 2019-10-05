import Taro from "@tarojs/taro"

class CloudStorageService {
  static async uploadImage(path) {
    const imageFileName = path.replace(/\/|:|_/g, '')
    console.info('filename', imageFileName)
    const rsp = await Taro.cloud.uploadFile({
      cloudPath: `images/${imageFileName}`,
      filePath: path, // 文件路径
    })
    console.info('upload rsp', rsp)
    const imageInfo = {
      fileID: rsp.fileID,
      filePath: path
    }
    return imageInfo
  }
  static async uploadImages(pathArr) {
    try {
      const uploadPromises = pathArr.map(path => this.uploadImage(path));
      console.info('uploadPromises', uploadPromises)

      const imageInfoArr = await Promise.all(uploadPromises)
      console.info('imageInfoArr', imageInfoArr)
      return imageInfoArr
    } catch (error) {
      // TODO: 错误日志上报
      console.error(error)
      throw error
    }
  }
  static async getTempFileURL(fileIdArr) {
    try {
      const fileList = await Taro.cloud.getTempFileURL({
        fileList: fileIdArr
      })
      console.info('file list ', fileList)
      return fileList
    } catch (error) {
      // TODO: 错误日志上报
      console.error(error)
      throw error
    }
  }
}

export default CloudStorageService;