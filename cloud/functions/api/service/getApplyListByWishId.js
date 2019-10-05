const ResultPair = require('../util/result_pair');

module.exports = async function (db, openId, wishId) {
  try {
    console.info(`getApplyListByWishId|openId:${openId}|wishId:${wishId}`)
    const wishRsp = await db.collection('wish').doc(wishId).get()
    if (openId !== wishRsp.data.openId) {
      throw Error('你不是该心愿的发布者')
    }
    const rsp = await db.collection('apply').where({
      targetWishId: wishId
    }).get()
    const applys = rsp.data
    console.info(`getApplyListByWishId|applys:${JSON.stringify(applys)}`)
    return ResultPair.ok(applys)
  } catch (error) {
    // 记录错误日志
    console.error('getApplyListByWishId|error|', error)
    throw error
  }
}
