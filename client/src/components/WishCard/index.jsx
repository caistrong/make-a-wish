import Taro, { Component } from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import { AtAvatar } from 'taro-ui'
import moment from 'moment'
import 'moment/locale/zh-cn';
import ImageShower from '../ImageShower'
import "./index.scss"



export default class WishCard extends Component {
  static defaultProps = {
    onCardClick: () => { },
    wish: {
      user: {},
      photos: []
    }
  }
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { user, wishText, photos, updateTime } = this.props.wish
    const { gender, avatarUrl } = user
    const genderClass = gender === 1 ? 'boy' : 'girl';

    return (
      <View className={`paper-card ${genderClass}`} >
        <View className='at-row'>
          <View>
            <AtAvatar circle size='small' image={avatarUrl}></AtAvatar>
          </View>
          <View className='paper-wish-text at-row at-row__align--center' onClick={this.props.onCardClick}>
            <Text>
              {wishText}
            </Text>
          </View>
        </View>
        <ImageShower images={photos}></ImageShower>
        <View className='at-row paper-time-show'>
          <View>{moment(updateTime).locale('zh-cn').fromNow()}</View>
        </View>
      </View>
    )
  }
}
