import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtLoadMore, AtTag } from 'taro-ui'
import WishCard from '../../components/WishCard'
import AddWishFab from '../../components/AddWishFab'
import './index.scss'
import WishService from '../../service/wish_service';

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadMoreStatus: 'loading',
      skip: 0,
      limit: 20, // 不设置20后台默认也是20
      wishList: [],
      sameCityActive: false,
      boyActive: true,
      girlActive: true
    }
  }
  componentWillMount() { }

  componentDidMount() {
    const openid = Taro.getStorageSync('openid');
    if (!openid) { // 未登录跳到个人中心页让用户登录
      Taro.switchTab({
        url: '/pages/mine/index'
      })
    } else {
      Taro.startPullDownRefresh()
    }
  }
  componentWillUnmount() { }
  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true,
    onReachBottomDistance: 50,
  }
  componentDidShow() {}
  componentDidHide() { }
  onPullDownRefresh() {
    this.setState({
      skip: 0,
      limit: 20,
      wishList: [],
      loadMoreStatus: 'loading'
    }, this.getWishList)
    Taro.stopPullDownRefresh()
  }
  onReachBottom() {
    let { skip } = this.state
    if (this.state.loadMoreStatus === 'loading') {
      this.setState({
        skip: skip + this.state.limit
      }, this.getWishList)
    }
  }
  getWishList = async () => {
    const { userInfo } = Taro.getStorageSync('user-data');
    const { sameCityActive, boyActive, girlActive } = this.state;
    const city = sameCityActive ? userInfo.city : '';

    const gender = boyActive ? (girlActive ? 3 : 1) : (girlActive ? 2 : 0);

    const wishlist = await WishService.getWishList(
      city,
      gender,
      this.state.limit,
      this.state.skip
    )

    if (wishlist.length < this.state.limit) {
      this.setState({
        loadMoreStatus: 'noMore'
      })
    }
    const wishList = this.state.wishList.concat(wishlist)
    this.setState({
      wishList
    })
  }
  handleCardClick = (wishId) => {
    Taro.navigateTo({
      url: `/pages/wish/index?id=${wishId}`
    })
  }
  handleTagClick = (tag) => {
    const { name } = tag
    switch (name) {
      case 'sameCity': {
        this.setState({
          sameCityActive: !this.state.sameCityActive
        })
        break;
      }
      case 'boy': {
        this.setState({
          boyActive: !this.state.boyActive
        })
        break;
      }
      case 'girl': {
        this.setState({
          girlActive: !this.state.girlActive
        })
        break;
      }
      default: {
        throw new Error('错误的标签')
        break;
      }
    }
    this.setState({
      skip: 0,
      limit: 20,
      wishList: [],
      loadMoreStatus: 'loading'
    }, this.getWishList)
  }
  render() {
    return (
      <View className='wish-list'>
        <View className='wish-tag-filter at-row at-row__justify--around'>
          <View
            className='at-col at-col-2'
          >
            <AtTag
              name='sameCity'
              type='primary'
              active={this.state.sameCityActive}
              onClick={this.handleTagClick}
            >
              同城
          </AtTag>
          </View>
          <View
            className='at-col at-col-2'
          >
            <AtTag
              name='girl'
              type='primary'
              active={this.state.girlActive}
              onClick={this.handleTagClick}
            >
              女生
          </AtTag>
          </View>
          <View
            className='at-col at-col-2'
          >
            <AtTag
              name='boy'
              type='primary'
              active={this.state.boyActive}
              onClick={this.handleTagClick}
            >
              男生
          </AtTag>
          </View>
        </View>
        {
          this.state.wishList.map(wish => (
            <WishCard key={wish._id} wish={wish} onCardClick={this.handleCardClick.bind(this, wish._id)} />
          ))
        }
        <AtLoadMore
          className='load-more'
          status={this.state.loadMoreStatus}
        />
        <AddWishFab />
      </View>
    )
  }
}
