import Taro from '@tarojs/taro'
import {  View } from '@tarojs/components'
import "./index.scss"

export default function Empty(props) {
    return (
        <View className='empty'>
            {props.alertMsg}
        </View>
    );
}