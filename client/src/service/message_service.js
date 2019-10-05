import callCloudFunction from '../util/call_cloud_function'

class MessageService {
  static async addApplyMessage(apply, msgContent) {
    const { _id: applyId, openId: applyerOpenId, user: applyerUser, targetWish } = apply;
    const { openId: wisherOpenId, user: wisherUser } = targetWish
    const content = msgContent
    try {
      const rsp = await callCloudFunction('addApplyMessage', {
        applyId, 
        applyerOpenId, 
        applyerUser, 
        wisherOpenId, 
        wisherUser, 
        content
      })
      if (rsp.code !== 0) throw new Error(`消息发送失败`)
      return rsp;
    } catch (error) {
      // TODO: 错误日志上报
      console.error(error)
      throw error
    }
  }
  static async getApplyMessageList(applyId) {
    try {
      const rsp = await callCloudFunction('getApplyMessageList', {
        applyId,
      })
      if (rsp.code !== 0) throw new Error(`获取消息失败`)
      return rsp;
    } catch (error) {
      // TODO: 错误日志上报
      console.error(error)
      throw error
    }
  }
}

export default MessageService;