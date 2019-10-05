const ResultPair = require('../util/result_pair');

module.exports = async function (db, city, gender, skip = 0, limit = 20) {
  // city 为城市名拼音 Shenzhen 空表示不限制区域
  // 前端参数gender的含义为 gender = 0 为男女都不要，gender = 1 为男，gender = 2为女， gender = 3为男女都要
  // 微信user的gender的含义为 gender = 0 为未知，gender = 1 为男，gender = 2为女
  try {
    console.info(`getWishList|city:${city}|gender:${gender}|limit:${limit}|skip${skip}`)

    const userOpt = {}
    if (city.length > 0) userOpt.city = city;
    switch (gender) {
      case 0: {
        userOpt.gender = 99 //必返回空
        break
      }
      case 1: {
        userOpt.gender = 1
        break;
      }
      case 2: {
        userOpt.gender = 2
        break
      }
      default: {
        break
      }
    }
    const rsp = await db.collection('wish').where({
      user: userOpt
    }).skip(skip).limit(limit).orderBy('updateTime', 'desc').get()

    const wishs = rsp.data

    return ResultPair.ok(wishs)
  } catch (error) {
    // 记录错误日志
    console.error('getWishList|error|', error)
    throw error
  }
}