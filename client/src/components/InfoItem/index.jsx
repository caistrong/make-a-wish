import Taro, { Component } from "@tarojs/taro"
import { View, Text } from "@tarojs/components";
import "./index.scss"


export default class InfoItem extends Component {
  static defaultProps = {
    onItemClick: ()=>{},
    title: {},
    messageCount: 0
  }
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='info-item at-row' onClick={this.props.onItemClick}>
        <View className='at-col at-col-3'>
          <Text>{this.props.title}</Text>
        </View>
        <View className='at-col at-col__offset-8'>
          {
            this.props.messageCount === 0 ?
              <View className='at-icon at-icon-chevron-right'></View> :
              <View className='message-badge weui-badge'>{this.props.messageCount}</View>
          }
        </View>
      </View>
    )
  }
}
