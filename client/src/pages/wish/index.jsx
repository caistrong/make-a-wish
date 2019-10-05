import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtActivityIndicator, AtMessage } from 'taro-ui'
import Apply from '../../components/Apply'
import ApplyInfo from '../../components/ApplyInfo'
import WishDetail from '../../components/WishDetail'
import wishService from '../../service/wish_service'
import applyService from '../../service/apply_service'
import './index.scss'

export default class Wish extends Component {

  constructor(props) {
    super(props);
    this.state = {
      wish: {
        profile: {}
      },
      recvApplyList: [],
      isYourWish: false,
      alreadyApply: false,
      apply: {}
    }
  }
  componentWillMount() {
  }

  componentDidMount() {
    const wishId = this.$router.params.id
    this.getData(wishId)
  }

  componentWillUnmount() { }
  config = {
    navigationBarTitleText: '心愿详情'
  }
  componentDidShow() { }

  componentDidHide() { }
  getData = async (wishId) => {
    try {
      const wishRsp = await wishService.getWishDetail(wishId)
      if (wishRsp.code !== 0) throw new Error(`wishId:${wishId}|拉取心愿失败`);
      const openId = Taro.getStorageSync('openid');
      if (wishRsp.data.openId === openId) {
        const rsp = await applyService.getApplyListByWishId(wishId)
        this.setState({
          wish: wishRsp.data,
          isYourWish: true,
          recvApplyList: rsp.data
        })
      } else {
        const applyRsp = await applyService.getMyApplyByWishId(wishId)
        const alreadyApply = applyRsp.code === 0 ? true : false

        this.setState({
          wish: wishRsp.data,
          isYourWish: false,
          alreadyApply,
          apply: alreadyApply ? applyRsp.data : {}
        })
      }

    } catch (error) {

    }
  }
  handleApplyFinish = async (applyId) => {
    const applyRsp = await applyService.getApplyDetail(applyId)
    this.setState({
      alreadyApply: true,
      apply: applyRsp.data
    })
  }

  render() {
    return (
      !this.state.wish._id ? <AtActivityIndicator mode='center'></AtActivityIndicator> :
        <View>
          <AtMessage />
          <WishDetail wish={this.state.wish}></WishDetail>
          {this.state.isYourWish ? <View>
            {
              this.state.recvApplyList.map(recvApply => (
                <ApplyInfo key={recvApply._id} title={recvApply.user.nickName} apply={recvApply}></ApplyInfo>
              ))
            }
          </View> :
            <View>
              {
                this.state.alreadyApply ?
                  <ApplyInfo title='点击查看详情' apply={this.state.apply}></ApplyInfo> :
                  <Apply wish={this.state.wish} onApplyFinish={this.handleApplyFinish}></Apply>
              }
            </View>
          }
        </View>
    )
  }
}
