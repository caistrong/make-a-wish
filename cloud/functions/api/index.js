// 云函数入口文件
const cloud = require('wx-server-sdk')
const login = require('./service/login')
const getWishList = require('./service/getWishList')
const addWish = require('./service/addWish')
const getWishDetail = require('./service/getWishDetail')
const addApply = require('./service/addApply')
const getApplyDetail = require('./service/getApplyDetail')
const getMyApplyByWishId = require('./service/getMyApplyByWishId')
const getApplyListByWishId = require('./service/getApplyListByWishId')
const getMyWishList = require('./service/getMyWishList')
const getMyApplyWishList = require('./service/getMyApplyWishList')
const addApplyMessage = require('./service/addApplyMessage')
const getApplyMessageList = require('./service/getApplyMessageList')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
  traceUser: true
})

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { OPENID, APPID, UNIONID, ENV, SOURCE } = cloud.getWXContext();
    // cloud.updateConfig({ env: ENV }) // 保证当前云函数的环境
    cloud.updateConfig({ env: 'test-39kf5' }) // TODO:本地调试链接测试环境云数据库，后续请注释
    const db = cloud.database()

    console.info(`api|ENV:${ENV}|SOURCE:${SOURCE}|APPID:${APPID}|OPENID:${OPENID}|UNIONID:${UNIONID}|event:${JSON.stringify(event)}|context:${JSON.stringify(context)}`)
    let data // 最后返回的数据
    const { operation, req } = event
    switch (operation) {
      case 'login': {
        const { userDetail } = req;
        data = await login(db, OPENID, UNIONID, userDetail);
        break;
      }
      case 'getWishList': {
        const { city, gender, skip, limit } = req
        data = await getWishList(db, city, gender, skip, limit)
        break
      }
      case 'addWish': {
        const { wishText, profile, photos, msgText, location, require, user } = req;
        data = await addWish(db, OPENID, wishText, profile, photos, msgText, location, require, user)
        break
      }
      case 'getWishDetail': {
        const { wishId } = req
        data = await getWishDetail(db, wishId)
        break
      }
      case 'addApply': {
        const { targetWishId, targetWish, user, profile, photos, msgText, location } = req
        data = await addApply(db, OPENID, targetWishId, targetWish, user, profile, photos, msgText, location)
        break
      }
      case 'getApplyDetail': {
        const { applyId } = req
        data = await getApplyDetail(db, applyId)
        break
      }
      case 'getApplyListByWishId': {
        const { wishId } = req
        data = await getApplyListByWishId(db, OPENID, wishId)
        break
      }
      case 'getMyApplyByWishId': {
        const { wishId } = req
        data = await getMyApplyByWishId(db, OPENID, wishId)
        break
      }
      case 'getMyWishList': {
        const { skip, limit } = req
        data = await getMyWishList(db, OPENID, skip, limit);
        break
      }
      case 'getMyApplyWishList': {
        const { skip, limit } = req
        data = await getMyApplyWishList(db, OPENID, skip, limit);
        break
      }
      case 'addApplyMessage': {
        const { applyId, applyerOpenId, applyerUser, wisherOpenId, wisherUser, content } = req
        data = await addApplyMessage(db, OPENID, applyId, applyerOpenId, applyerUser, wisherOpenId, wisherUser, content);
        break
      }
      case 'getApplyMessageList': {
        const { applyId } = req
        data = await getApplyMessageList(db, OPENID, applyId);
        break
      }
      default: {
        throw new Error('未找到相应的operation')
      }
    }
    console.info(`api|response data:${JSON.stringify(data)}`)
    return data
  } catch (error) {
    console.error(`api|error:${JSON.stringify(error)}`)
    throw error
  }
}