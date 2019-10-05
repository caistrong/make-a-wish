const ResultPair = require('../util/result_pair');

module.exports = async function (db, wishId) {
  try {
    console.info(`getWishDetail|wishId:${wishId}`)
    const rsp = await db.collection('wish').doc(wishId).get()
    const wish = rsp.data
    console.info(`getWishDetail|wish:${JSON.stringify(wish)}`)
    return ResultPair.ok(wish)
  } catch (error) {
    // 记录错误日志
    console.error('getWishDetail|error|', error)
    throw error
  }
}