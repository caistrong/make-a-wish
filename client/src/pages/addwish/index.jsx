import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtForm, AtInput, AtButton, AtImagePicker, AtTextarea, AtSwitch, AtMessage, AtNoticebar } from 'taro-ui'
import wishService from '../../service/wish_service'
import tool from '../../util/tool'
import HintBar from '../../components/HintBar'

import './index.scss'

export default class AddWish extends Component {
  static MAX_PHOTO_NUM = 4;
  constructor() {
    super(...arguments)
    this.state = {
      wishText: '',
      location: {},
      profile: {
        ageInfo: '',
        bodyInfo: '',
        eduInfo: '',
        workInfo: '',
      },
      photos: [],
      msgText: '',
      require: {
        needLocation: false,
        needAge: false,
        needBody: false,
        needEdu: false,
        needWork: false,
        needPhoto: false,
      },
      addImageButtonShow: true,
      maxChooseLeft: AddWish.MAX_PHOTO_NUM
    }
  }
  componentDidMount() {
    const profile = Taro.getStorageSync('profile')
    if (profile) {
      this.setState({
        profile
      })
    }
  }

  componentWillUnmount() { }
  config = {
    navigationBarTitleText: '添加心愿'
  }
  componentDidShow() { }

  componentDidHide() { }

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

  handleWishTextChange = (value) => {
    this.setState({
      wishText: value
    })
  }
  handleProfileChange(key, value) {
    this.setState({
      profile: {
        ...this.state.profile,
        [key]: value
      }
    })
  }

  handleMsgTextChange = (event) => {
    const value = event.target.value
    this.setState({
      msgText: value
    })
  }
  handleReqChange(key, value) {
    this.setState({
      require: {
        ...this.state.require,
        [key]: value
      }
    })
  }
  handleSubmit = async () => {
    const wish = this.state;
    if (!wish.wishText) {
      Taro.atMessage({ message: '心愿不可为空', type: 'error', })
      return
    };
    const { userInfo } = Taro.getStorageSync('user-data');
    let rsp = await wishService.addWish(wish, userInfo);
    if (rsp.code === 0) {
      Taro.atMessage({
        message: '添加心愿成功',
        type: 'success',
      })
      Taro.setStorageSync('profile', wish.profile)
      await tool.sleep(500) //TODO: 个人觉得很不优雅
      Taro.switchTab({
        url: '/pages/index/index'
      })
    } else {
      Taro.atMessage({
        message: '添加心愿失败',
        type: 'error',
      })
    }
  }
  handlePhotosChange = (photos) => {
    const currentImagesCount = photos.length;

    if (currentImagesCount < AddWish.MAX_PHOTO_NUM) {
      this.setState({
        addImageButtonShow: true,
        maxChooseLeft: AddWish.MAX_PHOTO_NUM - currentImagesCount
      })
    } else {
      this.setState({
        addImageButtonShow: false,
        maxChooseLeft: 0
      })
    }

    this.setState({
      photos
    })
  }
  render() {
    const { wishText, location, profile, photos, msgText, require, addImageButtonShow, maxChooseLeft } = this.state
    const { ageInfo, bodyInfo, eduInfo, workInfo } = profile
    const { needAge, needLocation, needBody, needEdu, needWork, needPhoto } = require
    return (
      <View>
        <AtMessage />
        <AtNoticebar close>除心愿文本外,其余信息均为可选,并且不验证内容</AtNoticebar>
        <AtForm
          onSubmit={this.handleSubmit}
          reportSubmit
        >
          <AtInput
            name='value'
            title='心愿'
            type='text'
            value={wishText}
            onChange={this.handleWishTextChange}
          />
          <HintBar hint='展示你自己' icon='sketch' />
          <AtInput
            editable={false}
            title='你在哪里'
            type='text'
            placeholder='点击选择'
            value={location.name}
            onClick={this.getUserLocation}
          />
          <AtInput
            name='value'
            title='年龄'
            type='text'
            value={ageInfo}
            onChange={this.handleProfileChange.bind(this, 'ageInfo')}
          />
          <AtInput
            name='value'
            title='身高/体重'
            type='text'
            value={bodyInfo}
            onChange={this.handleProfileChange.bind(this, 'bodyInfo')}
          />
          <AtInput
            name='value'
            title='学历'
            type='text'
            value={eduInfo}
            onChange={this.handleProfileChange.bind(this, 'eduInfo')}
          />
          <AtInput
            name='value'
            title='工作'
            type='text'
            value={workInfo}
            onChange={this.handleProfileChange.bind(this, 'workInfo')}
          />
          <HintBar hint='来些照片吧' icon='image' />
          <AtImagePicker
            mode='aspectFit'
            showAddBtn={addImageButtonShow}
            multiple
            count={maxChooseLeft}
            files={photos}
            onChange={this.handlePhotosChange}
          />
          <HintBar hint='再说点什么' icon='message' />
          <AtTextarea
            value={msgText}
            onChange={this.handleMsgTextChange}
            maxLength={140}
          />
          <HintBar hint='对方的必填信息' icon='eye' />
          <AtSwitch title='位置' color='#B9240F' checked={needLocation} onChange={this.handleReqChange.bind(this, 'needLocation')} />
          <AtSwitch title='年龄' color='#B9240F' checked={needAge} onChange={this.handleReqChange.bind(this, 'needAge')} />
          <AtSwitch title='身高/体重' color='#B9240F' checked={needBody} onChange={this.handleReqChange.bind(this, 'needBody')} />
          <AtSwitch title='学历' color='#B9240F' checked={needEdu} onChange={this.handleReqChange.bind(this, 'needEdu')} />
          <AtSwitch title='工作' color='#B9240F' checked={needWork} onChange={this.handleReqChange.bind(this, 'needWork')} />
          <AtSwitch title='照片' color='#B9240F' checked={needPhoto} onChange={this.handleReqChange.bind(this, 'needPhoto')} />

          <AtButton type='primary' formType='submit'>提交</AtButton>
        </AtForm>
      </View>
    )
  }
}
