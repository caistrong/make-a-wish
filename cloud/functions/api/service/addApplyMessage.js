const ResultPair = require('../util/result_pair');

module.exports = async function (db, openId, applyId, applyerOpenId, applyerUser, wisherOpenId, wisherUser, content) {
  try {
    console.info(`addApplyMessage|openId:${openId}|applyId:${applyId}|applyerOpenId:${applyerOpenId}|applyerUser:${JSON.stringify(applyerUser)}|wisherOpenId:${wisherOpenId}|wisherUser:${JSON.stringify(wisherUser)}|content:${content}`)

    const isFromApplyer = openId === applyerOpenId; // 判断留言的是申请者还是愿望发出的

    const fromOpenId = isFromApplyer ? applyerOpenId : wisherOpenId;
    const fromUser = isFromApplyer ? applyerUser : wisherUser;
    const toOpenId = isFromApplyer ? wisherOpenId : applyerOpenId;
    const toUser = isFromApplyer ? wisherUser : applyerUser;

    // 新用户
    const addMessageRes = await db.collection('message').add({
      data: {
        openId,
        applyId,
        fromOpenId,
        fromUser,
        toOpenId,
        toUser,
        content,
        createTime: new Date(),
        updateTime: new Date()
      }
    })
    console.info(`addApplyMessage|addMessageRes:${JSON.stringify(addMessageRes)}`)
    if (!addMessageRes._id) throw new Error('添加消息失败')
    return ResultPair.ok({
      fromOpenId,
      fromUser,
      toOpenId,
      toUser,
      content
    })
  } catch (error) {
    // 记录错误日志
    console.error('addApplyMessage|error', error)
    throw error
  }
}