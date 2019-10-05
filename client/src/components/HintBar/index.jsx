import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import "./index.scss"

export default function HintBar(props) {
    return (
        <View className='hint-bar at-row at-row__align--center'>
            <View className={`at-icon at-icon-${props.icon}`}></View>
            <Text>{props.hint}</Text>
        </View>
    );
}