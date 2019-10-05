class ResultPair {
  static ok(data) {
    return {
      code: 0,
      message: '成功',
      data
    }
  }
  static notFound (){
    return {
      code: 404,
      message: '未找到'
    }
  };
  static fail(error) {
    return {
      code: -1,
      message: '失败',
      error
    }
  }
}

export default ResultPair