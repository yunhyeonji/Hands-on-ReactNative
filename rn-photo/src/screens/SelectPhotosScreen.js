import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  Platform,
  Alert,
} from 'react-native';
import { GRAY } from '../colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MainRoutes } from '../navigations/routes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import HeaderRight from '../components/HeaderRight';
import { getLocalUri } from '../components/ImagePicker';

const SelectPhotosScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute(); // 현재 라우트의 파라미터 객체를 가져옴

  const width = useWindowDimensions().width;

  const [photos, setPhotos] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setDisabled(isLoading || !photos.length);
  }, [isLoading, photos.length]);

  useEffect(() => {
    if (params) {
      setPhotos(params.selectedPhotos ?? []);
    }
  }, [params]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight disabled={disabled} onPress={onConfirm} />
      ),
    });
  }, [disabled, navigation, onConfirm]);

  const onConfirm = useCallback(async () => {
    if (!disabled) {
      setIsLoading(true);
      try {
        const localUris = await Promise.all(
          photos.map((photo) =>
            Platform.select({
              ios: getLocalUri(photo.id),
              android: photo.uri,
            })
          )
        );
        console.log(localUris);
      } catch (e) {
        Alert.alert('사진 정보 조회 실패', e.message);
      }
      setIsLoading(false);
    }
  }, [disabled, photos]);

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        이미지는 최대 4장까지 선택 가능합니다.
      </Text>

      <View style={{ width, height: width }}>
        <Pressable
          onPress={() =>
            navigation.navigate(MainRoutes.IMAGE_PICKER, { maxCount: 4 })
          }
          style={styles.photoButton}
        >
          <MaterialCommunityIcons
            name="image-plus"
            size={80}
            color={GRAY.DEFAULT}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  description: {
    color: GRAY.DARK,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  photoButton: {
    backgroundColor: GRAY.LIGHT,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SelectPhotosScreen;
