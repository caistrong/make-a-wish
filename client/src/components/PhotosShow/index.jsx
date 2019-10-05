import Taro, { Component } from '@tarojs/taro'
import { Image, Swiper, SwiperItem } from '@tarojs/components'
import './index.scss'

export default class PhotosShow extends Component {
  static defaultProps = {
    photos: []
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  handleClickImage = () => {
    const previewUrls = this.props.photos.map(photo => photo.tempFileURL)
    Taro.previewImage({
      urls: previewUrls
    })
  }

  render() {
    return (
      <Swiper
        className='photo-swiper'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        autoplay
      >
        {
          this.props.photos.length > 0 ? this.props.photos.map((photo) => (
            <SwiperItem key={photo.fileID}>
              <Image
                mode='aspectFit'
                class='photo-img'
                src={photo.fileID}
                onClick={this.handleClickImage}
              />
            </SwiperItem>
          )) : null
        }
      </Swiper>
    )
  }
}
