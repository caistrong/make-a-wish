module.exports = {
  ok(data) {
    return Object.assign({}, this.SUCCESS, { data });
  },
  SUCCESS: {
    code: 0,
    message: '成功'
  },
  NOTFOUND: {
    code: 404,
    message: '未找到'
  },
};