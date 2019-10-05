const ResultPair = require('../util/result_pair');

module.exports = async function (db, openId, targetWishId, targetWish, user, profile, photos, msgText, location) {
  try {
    console.info(`addApply|targetWishId:${targetWishId}|targetWish:${JSON.stringify(targetWish)}|user:${JSON.stringify(user)}|profile:${JSON.stringify(profile)}|photos:${JSON.stringify(photos)}|msgText:${msgText}|location:${JSON.stringify(location)}`);
    const hasGeo = Object.keys(location).length !== 0 ? true : false; // 用户不一定传location

    const res = await db.collection('apply').add({
      data: {
        openId,
        targetWishId,
        targetWish,
        user,
        profile,
        photos,
        msgText,
        location,
        geoPoint: hasGeo ? db.Geo.Point(location.longitude, location.latitude) : {},
        createTime: new Date(),
        updateTime: new Date()
      }
    });
    return ResultPair.ok(res);
  } catch (error) {
    // 记录错误日志
    console.error('addApply|error|', error)
    throw error
  }
}
