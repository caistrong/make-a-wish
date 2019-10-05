import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import "./index.scss"


export default class UserInfo extends Component {
  static defaultProps = {
    userInfo:{}
  }
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='user-info'>
        <View className='at-row at-row__justify--center'>
          <AtAvatar className='at-col' circle image={this.props.userInfo.avatarUrl}></AtAvatar>
        </View>
        <View className='at-row at-row__justify--center'>
          <Text className='nick-name'>{this.props.userInfo.nickName}</Text>
        </View>
      </View>
    )
  }
}
