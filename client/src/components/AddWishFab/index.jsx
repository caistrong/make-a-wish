import Taro, { Component } from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import { AtFab } from 'taro-ui'
import "./index.scss"


export default class AddWishFab extends Component {
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleAddWishTabClick = () => {
    Taro.navigateTo({
      url: '/pages/addwish/index'
    })
  }

  render() {
    return (
      <View className='add-wish-fab'>
        <AtFab size='small' onClick={this.handleAddWishTabClick}>
          <Text className='at-fab__icon at-icon at-icon-add'></Text>
        </AtFab>
      </View>
    )
  }
}
