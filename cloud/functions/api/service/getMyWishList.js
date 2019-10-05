const ResultPair = require('../util/result_pair');

module.exports = async function (db, openId, skip = 0, limit = 20) {
  try {
    console.info(`getMyWishList|openId:${openId}|limit:${limit}|skip${skip}`)
    const rsp = await db.collection('wish').where({
      openId
    }).skip(skip).limit(limit).get()
    const wishs = rsp.data
    return ResultPair.ok(wishs)
  } catch (error) {
    // 记录错误日志
    console.error('getMyWishList|error|', error)
    throw error
  }
}