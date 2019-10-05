import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtAccordion, AtInput, AtImagePicker, AtTextarea, AtButton } from 'taro-ui'
import HintBar from '../HintBar'
import ApplyService from '../../service/apply_service'

import './index.scss'

export default class Apply extends Component {
  static defaultProps = {
    onApplyFinish: () => { },
    wish: {
      require: {

      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      profile: {
        ageInfo: '',
        bodyInfo: '',
        eduInfo: '',
        workInfo: ''
      },
      msgText: '',
      location: {},
      photos: []
    }
  }

  componentWillMount() { }

  componentDidMount() {
    const profile = Taro.getStorageSync('profile')
    if (profile) {
      this.setState({
        profile
      })
    }
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handlePhotosChange = (photos) => {
    this.setState({
      photos
    })
  }
  handleMsgTextChange = (event) => {
    const value = event.target.value
    this.setState({
      msgText: value
    })
  }

  getUserLocation = async () => {
    try {
      const res = await Taro.getSetting();
      if (!res.authSetting['scope.userLocation']) {
        await Taro.authorize({ scope: 'scope.userLocation' })
      }
      const location = await Taro.chooseLocation();
      this.setState({
        location
      })
    } catch (error) {
      console.error('getUserLocation catch error', error)
      this.setState({
        location: {}
      })
    }
  }
  handleApplyClick = async () => {
    const { location, profile, photos, msgText } = this.state
    const { needAge, needLocation, needBody, needEdu, needWork, needPhoto } = this.props.wish.require
    const { userInfo } = Taro.getStorageSync('user-data');
    try {
      if (needLocation && Object.keys(location).length === 0) throw Error('Ta想知道你的位置哦')
      if (needAge && !profile.ageInfo) throw Error('Ta想知道你的年龄哦')
      if (needBody && !profile.bodyInfo) throw Error('Ta想知道你的身高/体重哦')
      if (needEdu && !profile.eduInfo) throw Error('Ta想知道你的学历哦')
      if (needWork && !profile.workInfo) throw Error('Ta想知道你的工作哦')
      if (needPhoto && photos.length === 0) throw Error('Ta想看你的照片哦')
      if (!msgText) throw Error('写点留言吧~')
      const rsp = await ApplyService.addApply({
        wish: this.props.wish,
        location,
        profile,
        photos,
        msgText,
        userInfo
      })
      if (rsp.code === 0) {
        Taro.atMessage({
          message: '发送成功',
          type: 'success',
        })
        Taro.setStorageSync('profile', profile)
        this.setState({
          open: false
        })
        this.props.onApplyFinish(rsp.data._id)
      } else {
        Taro.atMessage({
          message: '添加心愿失败',
          type: 'error',
        })
      }

    } catch (error) {
      Taro.atMessage({
        message: error.message,
        type: 'error',
      })
    }
  }
  handleProfileChange(key, value) {
    this.setState({
      profile: {
        ...this.state.profile,
        [key]: value
      }
    })
  }
  handleAccordionClick = () => {
    this.setState({
      open: !this.state.open
    })
  }
  render() {
    const { needLocation, needAge, needBody, needEdu, needWork, needPhoto } = this.props.wish.require;
    return (
      <View className='wish-apply'>
        <AtAccordion title='点击填写申请' icon={{ value: 'mail', color: '#B9240F', size: '15' }} open={this.state.open} onClick={this.handleAccordionClick}>
          <View>
            {(!needLocation && !needAge && !needBody && !needEdu & !needWork) ? null : <HintBar hint='Ta想知道' icon='sketch' />}
            {needLocation ? <AtInput
              editable={false}
              title='你在哪里'
              type='text'
              placeholder='点击选择'
              value={this.state.location.name}
              onClick={this.getUserLocation}
            /> : null}
            {needAge ? <AtInput
              name='value'
              title='年龄'
              type='text'
              value={this.state.profile.ageInfo}
              onChange={this.handleProfileChange.bind(this, 'ageInfo')}
            /> : null}
            {needBody ? <AtInput
              name='value'
              title='身高/体重'
              type='text'
              value={this.state.profile.bodyInfo}
              onChange={this.handleProfileChange.bind(this, 'bodyInfo')}
            /> : null}
            {needEdu ? <AtInput
              name='value'
              title='学历'
              type='text'
              value={this.state.profile.eduInfo}
              onChange={this.handleProfileChange.bind(this, 'eduInfo')}
            /> : null}
            {needWork ? <AtInput
              name='value'
              title='工作'
              type='text'
              value={this.state.profile.workInfo}
              onChange={this.handleProfileChange.bind(this, 'workInfo')}
            /> : null}
            {needPhoto ? <HintBar hint='Ta想看你' icon='image' /> : null}
            {needPhoto ? <AtImagePicker
              mode='aspectFit'
              multiple
              count={4}
              files={this.state.photos}
              onChange={this.handlePhotosChange}
            /> : null}
            <HintBar hint='给Ta留言' icon='message' />
            <AtTextarea
              value={this.state.msgText}
              onChange={this.handleMsgTextChange}
              maxLength={140}
            />
            <AtButton type='primary' onClick={this.handleApplyClick}>发送</AtButton>
          </View>
        </AtAccordion>
      </View>
    )
  }
}
