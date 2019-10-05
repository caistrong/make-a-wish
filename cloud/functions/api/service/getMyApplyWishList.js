const ResultPair = require('../util/result_pair');

module.exports = async function (db, openId, skip = 0, limit = 20) {
  const _ = db.command
  try {
    console.info(`getMyApplyWishList|openId:${openId}|limit:${limit}|skip${skip}`)
    const rsp = await db.collection('apply').where({
      openId
    }).skip(skip).limit(limit).get()
    const applyWishIds = rsp.data.map(apply => apply.targetWishId);
    console.info(`getMyApplyWishList|applyWishIds:${JSON.stringify(applyWishIds)}`)
    const wishsRsp = await db.collection('wish').where({
      _id: _.in(applyWishIds)
    }).get()
    const wishs = wishsRsp.data
    console.info(`getMyApplyWishList|wishs:${JSON.stringify(wishs)}`)
    return ResultPair.ok(wishs)
  } catch (error) {
    // 记录错误日志
    console.error('getMyApplyWishList|error|', error)
    throw error
  }
}