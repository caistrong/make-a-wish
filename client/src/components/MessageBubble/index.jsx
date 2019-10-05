import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import "./index.scss"

export default function MessageBubble(props) {
    const { message } = props;

    let bubbleClass = 'you';
    let bubbleDirection = '';

    if (message.type === 0) {
        bubbleClass = 'me';
        bubbleDirection = "bubble-direction-reverse";
    }
    return (
        <View className={`bubble-container ${bubbleDirection}`}>
            {/* <img className={`img-circle`} src={message.image} /> */}
            <View className={`bubble ${bubbleClass}`}>{message.text}</View>
        </View>
    );
}
MessageBubble.defaultProps = {
    message: {}
}