import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import Index from './pages/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  componentDidMount() {
    if (process.env.TARO_ENV === 'weapp') {
      console.log(`当前云环境变量为：${process.env.CLOUD_ENV}，NODE环境变量为:${process.env.NODE_ENV}`)
      Taro.cloud.init({
        env: process.env.CLOUD_ENV
      })
    }
  }

  config = {
    pages: [
      'pages/index/index',
      'pages/mine/index',
      'pages/addwish/index',
      'pages/wish/index',
      'pages/wishlist/index',
      'pages/myapplylist/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#8a8a8a',
      selectedColor: '#2c2c2c',
      list: [{
        pagePath: 'pages/index/index',
        text: '心愿墙',
        iconPath: './assets/icons/heart.png',
        selectedIconPath: './assets/icons/heart-selected.png'
      },{
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: './assets/icons/user.png',
        selectedIconPath: './assets/icons/user-selected.png'
      }]
    },
    permission: {
      'scope.userLocation': {
        desc: '你的位置信息将用于心愿的城市展示' // 
      }
    },
    cloud: true
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
