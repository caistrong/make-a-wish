const ResultPair = require('../util/result_pair');

module.exports = async function (db, openId, wishId) {
  try {
    console.info(`getMyApplyByWishId|openId:${openId}|wishId:${wishId}`)
    const rsp = await db.collection('apply').where({
      targetWishId: wishId,
      openId
    }).get()
    if (rsp.data.length === 0) return ResultPair.NOTFOUND
    const apply = rsp.data[0]
    console.info(`getMyApplyByWishId|apply:${JSON.stringify(apply)}`)
    return ResultPair.ok(apply)
  } catch (error) {
    // 记录错误日志
    console.error('getMyApplyByWishId|error|', error)
    throw error
  }
}