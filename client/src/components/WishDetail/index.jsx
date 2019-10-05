import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import PhotosShow from '../../components/PhotosShow'
import './index.scss'

export default class WishDetail extends Component {
  static defaultProps = {
    wish: {
      wishText: '',
      profile: {},
      photos: [],
      msgText: '',
    }
  }
  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  render() {
    const { wishText, profile, photos, msgText } = this.props.wish;
    const { ageInfo, bodyInfo, eduInfo, workInfo } = profile;
    return (
      <View className='wish-detail'>
        <View className='wish-title at-row at-row__justify--center'>
          <Text>{wishText}</Text>
        </View>
        {
          (!ageInfo && !bodyInfo && !eduInfo && !workInfo) ? null :
            <View className='wish-profile'>
              {ageInfo ? <View>年龄：{ageInfo}</View> : null}
              {bodyInfo ? <View>身高/体重：{bodyInfo}</View> : null}
              {eduInfo ? <View>教育：{eduInfo}</View> : null}
              {workInfo ? <View>工作：{workInfo}</View> : null}
            </View>
        }
        {photos.length > 0 ?
          <View className='wish-photos'>
            <PhotosShow photos={photos}></PhotosShow>
          </View> : null
        }
        {msgText ?
          <View className='wish-message'>
            {msgText}
          </View> : null
        }
      </View>
    )
  }
}
