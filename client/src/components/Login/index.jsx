import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import './index.scss'

export default class Login extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  handleGetUserInfo = (e) => {
    const { userInfo } = e.detail;
    if (!userInfo) {
      Taro.atMessage({
        message: '获取用户授权登录失败',
        type: 'error',
      })
    } else {
      this.props.onLoginComplete(e.detail);
    }
  }

  render() {
    return (
      <View className='login'>
        <Button className='login-button' open-type='getUserInfo' onGetUserInfo={this.handleGetUserInfo}>登录</Button>
      </View>
    )
  }
}
