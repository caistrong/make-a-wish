import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components';

import "./index.scss"

const handleClickImage = (images, index) => {
  const previewUrls = images.map(image => image.fileID)
  Taro.previewImage({
    urls: previewUrls,
    current: previewUrls[index]
  })
}

export default function ImageShower(props) {
  const { images } = props;
  const IMAGE_LEN = images.length;
  return (
    <View className='at-row at-row--wrap at-row__justify--around'>
      {
        images.map((image, index) => (
          <Image
            key={image.fileID}
            className={`image-gallery-${IMAGE_LEN}`}
            mode='aspectFit'
            src={image.fileID}
            onClick={handleClickImage.bind(this, images, index)}
          />
        ))
      }
    </View>
  );
}

ImageShower.defaultProps = {
  images: []
}
