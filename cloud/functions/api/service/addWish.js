const ResultPair = require('../util/result_pair');

module.exports = async function (db, openId, wishText, profile, photos, msgText, location, require, user) {
  try {
    console.info(`addWish|openId:${openId}|wishText:${wishText}|profile:${JSON.stringify(profile)}|photos:${JSON.stringify(photos)}|msgText:${msgText}|location:${JSON.stringify(location)}|require:${JSON.stringify(require)}|user:${JSON.stringify(user)}`);
    const hasGeo = Object.keys(location).length !== 0 ? true : false; // 用户不一定传location

    const res = await db.collection('wish').add({
      data: {
        openId,
        wishText,
        profile,
        photos,
        msgText,
        location,
        require,
        user,
        geoPoint: hasGeo ? db.Geo.Point(location.longitude, location.latitude) : {},
        createTime: new Date(),
        updateTime: new Date()
      }
    });
    return ResultPair.ok(res);
  } catch (error) {
    // 记录错误日志
    console.error('addWish|error|', error)
    throw error
  }
}