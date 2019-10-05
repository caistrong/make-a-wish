import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtLoadMore } from 'taro-ui'
import callCloudFunction from '../../util/call_cloud_function';
import WishCard from '../../components/WishCard'
import './index.scss'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wishList: [],
      loadMoreStatus: 'loading',
      skip: 0,
      limit: 20, // 不设置20后台默认也是20
    }
  }
  componentWillMount() { }
  componentDidMount() { 
    this.getWishList()
  }
  componentWillUnmount() { }
  config = {
    navigationBarTitleText: '我的心愿',
    onReachBottomDistance: 50,
  }
  componentDidShow() { }
  componentDidHide() { }
  onReachBottom() {
    let { skip } = this.state
    if (this.state.loadMoreStatus === 'loading') {
      this.setState({
        skip: skip + this.state.limit
      }, this.getWishList)
    }
  }
  getWishList = async () => {
    const wish_source_api = this.$router.params.wish_source_api
    const rsp = await callCloudFunction(wish_source_api, {
      skip: this.state.skip,
      limit: this.state.limit
    })
    if (rsp.data.length < this.state.limit) {
      this.setState({
        loadMoreStatus: 'noMore'
      })
    }
    const wishList = this.state.wishList.concat(rsp.data)
    this.setState({
      wishList
    })
  }
  handleCardClick = (wishId) => {
    Taro.navigateTo({
      url: `/pages/wish/index?id=${wishId}`
    })
  }
  render() {
    return (
      <View className='wish-list'>
        {
          this.state.wishList.map(wish => (
            <WishCard key={wish._id} wish={wish} onCardClick={this.handleCardClick.bind(this, wish._id)} />
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
