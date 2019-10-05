const ResultPair = require('../util/result_pair');

module.exports = async function (db, openId, unionId, userDetail) {
  try {
    console.info(`login|openId:${openId}|unionId:${unionId}|userDetail${JSON.stringify(userDetail)}`)
    const { data: users } = await db.collection('user').where({
      openId
    }).get()
    console.info(`login|users:${JSON.stringify(users)}`)
    if (users.length === 0) {
      // 新用户
      let addUserRes = await db.collection('user').add({
        data: {
          openId,
          unionId,
          ...userDetail,
          createTime: new Date(),
          updateTime: new Date()
        }
      })
      console.info(`login|addUserRes:${JSON.stringify(addUserRes)}`)
    } else {
      // 老用户重新登录
      const hitUser = users[0]
      let updateUserRes = await db.collection('user').doc(hitUser._id).update({
        data: {
          ...userDetail,
          updateTime: new Date()
        }
      });
      console.info(`login|updateUserRes:${JSON.stringify(updateUserRes)}`)
    }
    console.info(`login|success`)
    return ResultPair.ok(openId)
  } catch (error) {
    // 记录错误日志
    console.error('login|error|', error)
    throw error
  }
}