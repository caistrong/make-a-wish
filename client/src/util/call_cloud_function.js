import Taro from '@tarojs/taro'

export default async function (operation, req) {
  const rsp = await Taro.cloud.callFunction({
    name: 'api',
    data: {
      operation,
      req
    }
  })
  //统一的请求响应日志
  console.log(`callFunction|operation:${operation}|req`,req);
  console.log(`callFunction|operation:${operation}|rsp`,rsp);
  return rsp.result
}