import ResultPair from '../util/result_pair'
import CloudStorageService from './cloud_storage_service'
import callCloudFunction from '../util/call_cloud_function'

class WishService {
  static async getWishList(city, gender, limit, skip) {
    // city 为城市名拼音 Shenzhen 空表示不限制区域
    // gender = 0 为男女都不要，gender = 1 为男，gender = 2为女， gender = 3为男女都要
    try {
      const rsp = await callCloudFunction('getWishList', {
        city,
        gender,
        limit,
        skip
      })
      if (rsp.code !== 0) throw new Error(`获取心愿列表失败`)
      const wishList = rsp.data;
      return wishList;
    } catch (error) {
      // TODO: 错误日志上报
      console.error(error)
      throw error
    }
  }

  static async addWish(wish, user) {
    const { wishText, location, photos, profile, msgText, require } = wish;
    try {
      const photoPathArr = photos.map(photo => photo.file.path)
      const photoInfoArr = await CloudStorageService.uploadImages(photoPathArr)

      const rsp = await callCloudFunction('addWish', {
        wishText,
        profile,
        photos: photoInfoArr,
        msgText,
        location,
        require,
        user
      })
      if (rsp.code !== 0) throw new Error(`添加心愿失败`)
      return rsp;
    } catch (error) {
      // TODO: 错误日志上报
      console.error(error)
      throw error
    }
  }
  static async getWishDetail(wishId) {
    try {
      const rsp = await callCloudFunction('getWishDetail', {
        wishId
      })
      if (rsp.code !== 0) throw new Error(`wishId:${wishId}获取心愿详情失败`)
      const wish = rsp.data;
      return ResultPair.ok(wish)
    } catch (error) {
      // TODO: 错误日志上报
      console.error(error)
      return ResultPair.fail(error)
    }
  }
}

export default WishService;