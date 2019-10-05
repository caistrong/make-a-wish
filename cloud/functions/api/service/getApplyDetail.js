const ResultPair = require('../util/result_pair');

module.exports = async function (db, applyId) {
  try {
    console.info(`getApplyDetail|applyId:${applyId}`)
    const rsp = await db.collection('apply').doc(applyId).get()
    const wish = rsp.data
    console.info(`getApplyDetail|wish:${JSON.stringify(wish)}`)
    return ResultPair.ok(wish)
  } catch (error) {
    // 记录错误日志
    console.error('getApplyDetail|error|', error)
    throw error
  }
}