const ResultPair = require('../util/result_pair');

module.exports = async function (db, openId, applyId) {
  try {
    console.info(`getApplyMessageList|openId:${openId}|applyId:${applyId}`)
    const rsp = await db.collection('message').where({
      applyId
    }).get()

    const messageList = rsp.data
    console.info(`getApplyMessageList|messageList:${JSON.stringify(messageList)}`)
    return ResultPair.ok(messageList)
  } catch (error) {
    // 记录错误日志
    console.error('getApplyMessageList|error|', error)
    throw error
  }
}