import {
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import { useLayoutEffect, useCallback, useState } from 'react';
import HeaderRight from '../components/HeaderRight';
import ImagePicker from '../components/ImagePicker';

const ImagePickerScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const maxCount = params?.maxCount ?? 1;

  const [selectedPhotos, setSelectedPhotos] = useState([]);
  // 이전 화면의 이름을 얻을수있음 -> 이미지와 함께 이전 페이지로 돌아가기
  const stateRoutes = useNavigationState((state) => state.routes);

  const onConfirm = useCallback(() => {
    const prevScreenName = stateRoutes[stateRoutes.length - 2].name;
    navigation.navigate(prevScreenName, { selectedPhotos });
  }, [navigation, selectedPhotos, stateRoutes]);

  //   오른쪽 위 체크 버튼 나타내기
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight onPress={onConfirm} disabled={selectedPhotos.length < 1} />
      ),
    });
  }, [navigation, onConfirm, selectedPhotos.length]);

  // 선택한 이미지가 배열안에 포함되어있는지 확인하는 함수
  const isSelectedPhoto = (photo) => {
    return selectedPhotos.findIndex((item) => item.id === photo.id) > -1;
  };
  //   이미지를 선택하기
  const togglePhoto = (photo) => {
    const isSelected = isSelectedPhoto(photo);
    setSelectedPhotos((prev) => {
      if (isSelected) {
        return prev.filter((item) => item.id !== photo.id);
      }
      if (maxCount > prev?.length) {
        return [...prev, photo];
      }
      return prev;
    });
  };

  return (
    <ImagePicker togglePhoto={togglePhoto} isSelectedPhoto={isSelectedPhoto} />
  );
};

export default ImagePickerScreen;
