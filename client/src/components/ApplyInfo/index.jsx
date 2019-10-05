import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtAccordion, AtInput, AtToast } from 'taro-ui'
import HintBar from '../HintBar'
import PhotosShow from '../PhotosShow'
import MessageBox from '../MessageBox'
import MessageService from '../../service/message_service'

import './index.scss'

export default class ApplyInfo extends Component {
  static defaultProps = {
    apply: {
      profile: {},
      photos: [],
      msgText: ''
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      msgContent: '',
      messageList: [],
      sendToast: {
        toastShow: false,
        text: '',
        sendStatus: ''
      }
    }
  }

  componentWillMount() { }

  componentDidMount() {
    this.refreshApplyMessageList()
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  refreshApplyMessageList = async () => {
    const { _id } = this.props.apply;
    const rsp = await MessageService.getApplyMessageList(_id);
    this.setState({
      messageList: rsp.data,
      sendToast: {
        ...this.state.sendToast,
        toastShow: false
      }
    })
  }

  handleAccordionClick = () => {
    this.setState({
      open: !this.state.open
    })
  }
  handleMsgContentChange = (value) => {
    this.setState({
      msgContent: value
    })
  }
  handleSendClick = async () => {
    const { apply } = this.props;
    const { msgContent } = this.state;

    if (msgContent.length === 0) {
      Taro.atMessage({
        message: '消息内容不能为空',
        type: 'error',
      })
    } else {
      this.setState({
        sendToast: {
          ...this.state.sendToast,
          text: '发送中...',
          toastShow: true,
          sendStatus: 'loading'
        }
      })
      await MessageService.addApplyMessage(apply, msgContent)
      this.setState({
        msgContent: '',
        sendToast: {
          ...this.state.sendToast,
          text: '发送成功',
          sendStatus: 'success'
        }
      })
      this.refreshApplyMessageList()
    }

  }
  render() {
    const { profile, photos, msgText } = this.props.apply;
    const { ageInfo, bodyInfo, eduInfo, workInfo } = profile;
    return (
      <View className='apply-info'>
        <AtToast duration={1000} isOpened={this.state.sendToast.toastShow} text={this.state.sendToast.text} status={this.state.sendToast.sendStatus} hasMask></AtToast>
        <AtAccordion title={this.props.title} icon={{ value: 'mail', color: '#B9240F', size: '15' }} open={this.state.open} onClick={this.handleAccordionClick}>
          <View>
            {
              (!ageInfo && !bodyInfo && !eduInfo && !workInfo) ? null :
                <View>
                  <HintBar hint='基本信息' icon='sketch' />
                  <View className='apply-info-profile'>
                    {ageInfo ? <View>年龄：{ageInfo}</View> : null}
                    {bodyInfo ? <View>身高/体重：{bodyInfo}</View> : null}
                    {eduInfo ? <View>教育：{eduInfo}</View> : null}
                    {workInfo ? <View>工作：{workInfo}</View> : null}
                  </View>
                </View>
            }
            {
              photos.length > 0 ?
                <View className='apply-info-photos'>
                  <HintBar hint='照片' icon='image' />
                  <PhotosShow photos={photos}></PhotosShow>
                </View> : null
            }
            <HintBar hint='留言' icon='mail' />
            <View className='apply-info-message'>
              {msgText ? <Text>{msgText}</Text> : null}
            </View>
            {
              this.state.messageList.length > 0 ? <View>
                <HintBar hint='对话消息' icon='message' />
                <View className='apply-message-content'>
                  <MessageBox messageList={this.state.messageList}></MessageBox>
                </View>
              </View> : null
            }
            <View className='apply-message-wrapper'>
              <AtInput
                className='apply-message'
                type='text'
                border={false}
                value={this.state.msgContent}
                onChange={this.handleMsgContentChange}
              >
                <View className='at-icon at-icon-arrow-up' onClick={this.handleSendClick}></View>
              </AtInput>
            </View>
          </View>
        </AtAccordion>
      </View>
    )
  }
}
