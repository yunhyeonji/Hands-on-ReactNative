import { useNavigation } from '@react-navigation/native';
import { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import HeaderRight from '../components/HeaderRight';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';

const ImagePickerScreen = () => {
  const navigation = useNavigation();
  const [status, requestPermission] = MediaLibrary.usePermissions();

  //   앱 사진 권한
  useEffect(() => {
    (async () => {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert('사진 접근 권한', '사진 접근 권한이 필요합니다.', [
          {
            text: '확인',
            onPress: () => navigation.canGoBack() && navigation.goBack(),
          },
        ]);
      }
    })();
  }, [requestPermission, navigation]);

  const width = useWindowDimensions().width / 3;
  const [photos, setPhotos] = useState([]);
  const [listInfo, setListInfo] = useState({
    endCursor: '',
    hasNextPage: true,
  });

  //   사진 목록 가져오기
  const getPhotos = useCallback(async () => {
    const options = {
      first: 30,
      sortBy: [MediaLibrary.SortBy.creationTime],
    };

    if (listInfo.hasNextPage) {
      const { assets, endCursor, hasNextPage } =
        await MediaLibrary.getAssetsAsync(options);
      setPhotos(assets);
      setListInfo({ endCursor, hasNextPage });
    }
  }, [listInfo.hasNextPage]);

  // 권한이 true이면 이미지 가져오기
  useEffect(() => {
    if (status?.granted) {
      getPhotos();
    }
  }, [status?.granted, getPhotos]);

  //   오른쪽 위 체크 버튼 나타내기
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRight onPress={() => {}} />,
    });
  });

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={photos}
        renderItem={({ item }) => (
          <Pressable style={{ width, height: width }}>
            <Image source={{ uri: item.uri }} style={styles.photo} />
          </Pressable>
        )}
        numColumns={3}
        // FlatList 컴포넌트의 한 열에 렌더링하는 양
        // FlatList 컴포넌트를 세로로 사용할 때만 적용 가능
        // 각 항목의 높이가 같아야 함
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lsit: {
    width: '100%',
  },
  photo: { width: '100%', height: '100%' },
});

export default ImagePickerScreen;
