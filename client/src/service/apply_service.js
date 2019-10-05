import Taro from "@tarojs/taro"
import ResultPair from '../util/result_pair'
import CloudStorageService from './cloud_storage_service'
import callCloudFunction from '../util/call_cloud_function'


class ApplyService {
  constructor() {
    const database = Taro.cloud.database();
    this.database = database;
    this.collection = database.collection('apply');
  }
  async addApply(applyObj) {
    const { wish, location, profile, photos, msgText, userInfo } = applyObj
    try {
      const photoPathArr = photos.map(photo => photo.file.path)
      const photoInfoArr = await CloudStorageService.uploadImages(photoPathArr)

      const rsp = await callCloudFunction('addApply', {
        targetWishId: wish._id,
        targetWish: wish,
        user: userInfo,
        profile,
        photos: photoInfoArr,
        msgText,
        location
      })
      if(rsp.code !== 0) throw new Error(`添加申请失败`)
      return rsp;
    } catch (error) {
      console.error(error)
      return ResultPair.fail(error)
    }
  }
  async getApplyDetail(applyId) {
    try {
      const rsp = await callCloudFunction('getApplyDetail', {
        applyId
      })
      if (rsp.code !== 0) throw new Error(`applyId:${applyId}获取申请详情失败`)
      const apply = rsp.data;
      return ResultPair.ok(apply)
    } catch (error) {
      // TODO: 错误日志上报
      console.error(error)
      return ResultPair.fail(error)
    }
  }
  async getMyApplyByWishId(wishId) {
    try {
      const rsp = await callCloudFunction('getMyApplyByWishId', {
        wishId
      })
      if (rsp.code !== 0) return ResultPair.notFound;
      const apply = rsp.data;
      return ResultPair.ok(apply)
    } catch (error) {
      // TODO: 错误日志上报
      console.error(error)
      return ResultPair.fail(error)
    }
  }
  async getApplyListByWishId(wishId) {
    try {
      const rsp = await callCloudFunction('getApplyListByWishId', {
        wishId
      })
      return rsp
    } catch (error) {
      // TODO: 错误日志上报
      console.error(error)
      return ResultPair.fail(error)
    }
  }
}

export default new ApplyService();