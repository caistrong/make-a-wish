import Taro, { Component } from '@tarojs/taro'
import { AtMessage } from 'taro-ui'
import { View } from '@tarojs/components'
import Login from '../../components/Login';
import UserInfo from '../../components/UserInfo';
import InfoItem from '../../components/InfoItem';
import callCloudFunction from '../../util/call_cloud_function';
import './index.scss'

export default class Mine extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      userInfo: {}
    }
  }
  componentWillMount() {
    const { userInfo } = Taro.getStorageSync('user-data');
    this.setState({
      isLogin: !!userInfo,
      userInfo
    })
  }

  componentDidMount() { }

  componentWillUnmount() { }
  config = {
    navigationBarTitleText: '个人中心'
  }
  componentDidShow() { }

  componentDidHide() { }

  handleLoginComplete = async (detail) => {
    try {
      const loginRsp = await callCloudFunction('login', {
        userDetail: detail
      })
      const openId = loginRsp.data;
      Taro.setStorageSync('openid', openId);
      Taro.setStorageSync('user-data', detail);
      this.setState({
        isLogin: true,
        userInfo: detail.userInfo
      })
    } catch (error) {
      console.error(error)
      Taro.atMessage({
        message: '登录失败',
        type: 'error',
      })
    }
  }
  handleMyWishItemClick = () => {
    Taro.navigateTo({
      url: `/pages/wishlist/index?wish_source_api=getMyWishList`
    })
  }
  handleMyApplyItemClick = () => {
    Taro.navigateTo({
      url: `/pages/wishlist/index?wish_source_api=getMyApplyWishList`
    })
  }
  render() {
    return (
      <View>
        <AtMessage />
        {!this.state.isLogin ? <Login onLoginComplete={this.handleLoginComplete} /> :
          <View>
            <UserInfo userInfo={this.state.userInfo}></UserInfo>

            <InfoItem title='我的心愿' onItemClick={this.handleMyWishItemClick}></InfoItem>
            <InfoItem title='发送的申请' onItemClick={this.handleMyApplyItemClick}></InfoItem>
          </View>
        }
      </View>
    )
  }
}
