import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import MessageBubble from '../MessageBubble'
import "./index.scss"

export default function MessageBox(props) {
  const { messageList } = props;
  const me_openid = Taro.getStorageSync('openid');
  const messages = messageList.map(msg => {
    const msgType = msg.fromOpenId === me_openid ? 0: 1; // 0表示是自己发的消息，1表示是对方发的消息
    return {
     id: msg._id,
     type: msgType,
     text: msg.content
    }
  })
  return (
    <View className='message-box'>
      {
        messages.map(msg =>
          <MessageBubble message={msg} key={msg._id}></MessageBubble>
        )
      }
    </View>
  );
}

MessageBox.defaultProps = {
  messageList: []
}
