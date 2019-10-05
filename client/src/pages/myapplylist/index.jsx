import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtLoadMore } from 'taro-ui'
import callCloudFunction from '../../util/call_cloud_function';
import ApplyInfo from '../../components/ApplyInfo'
import './index.scss'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      applyList: [],
      loadMoreStatus: 'loading',
      skip: 0,
      limit: 20, // 不设置20后台默认也是20
    }
  }
  componentWillMount() { }
  componentDidMount() {
    this.getMyApplyList()
  }
  componentWillUnmount() { }
  config = {
    navigationBarTitleText: '申请过的心愿',
    onReachBottomDistance: 50,
  }
  componentDidShow() {
  }
  componentDidHide() { }
  onReachBottom() {
    let { skip } = this.state
    if (this.state.loadMoreStatus === 'loading') {
      this.setState({
        skip: skip + this.state.limit
      }, this.getMyApplyList)
    }
  }
  getMyApplyList = async () => {
    const rsp = await callCloudFunction('getMyApplyList', {
      skip: this.state.skip,
      limit: this.state.limit
    })
    if (rsp.data.length < this.state.limit) {
      this.setState({
        loadMoreStatus: 'noMore'
      })
    }
    const applyList = this.state.applyList.concat(rsp.data)
    this.setState({
      applyList
    })
  }

  render() {
    return (
      <View className='apply-list'>
        {
          this.state.applyList.map(apply => (
            <ApplyInfo key={apply._id} title={apply.targetWish.wishText} apply={apply} />
          ))
        }
        <AtLoadMore
          className='load-more'
          status={this.state.loadMoreStatus}
        />
      </View>
    )
  }
}
