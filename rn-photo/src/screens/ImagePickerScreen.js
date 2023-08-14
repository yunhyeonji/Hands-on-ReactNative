import { useNavigation } from '@react-navigation/native';
import {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import HeaderRight from '../components/HeaderRight';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
  Platform,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PRIMARY } from '../colors';
import { BlurView } from 'expo-blur';

const initListInfo = {
  endCursor: '',
  hasNextPage: true,
};

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
  const listInfo = useRef(initListInfo);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  // 이미지 목록 초기화 하기
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    listInfo.current = initListInfo;
    await getPhotos();
    setRefreshing(false);
  };

  //   사진 목록 가져오기
  const getPhotos = useCallback(async () => {
    const options = {
      first: 30,
      sortBy: [MediaLibrary.SortBy.creationTime],
    };
    if (listInfo.current.endCursor) {
      options['after'] = listInfo.current.endCursor;
    }

    if (listInfo.current.hasNextPage) {
      const { assets, endCursor, hasNextPage } =
        await MediaLibrary.getAssetsAsync(options);
      setPhotos((prev) => (options.after ? [...prev, ...assets] : assets));
      listInfo.current = { endCursor, hasNextPage };
    }
  }, []);

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

  // 선택한 이미지가 배열안에 포함되어있는지 확인하는 함수
  const isSelectedPhoto = (photo) => {
    return selectedPhotos.findIndex((item) => item.id === photo.id) > -1;
  };
  //   이미지를 선택하기
  const togglePhoto = (photo) => {
    const isSelected = isSelectedPhoto(photo);
    setSelectedPhotos((prev) =>
      isSelected
        ? prev.filter((item) => item.id !== photo.id)
        : [...prev, photo]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={photos}
        renderItem={({ item }) => {
          const isSelected = isSelectedPhoto(item);
          return (
            <Pressable
              onPress={() => togglePhoto(item)}
              style={{ width, height: width }}
            >
              <Image source={{ uri: item.uri }} style={styles.photo} />
              {/* 이미지item이 선택되어 있을때, 사진을 blur처리하고 , 이미지 위에 체크아이콘을 띄운다 */}
              {isSelected && (
                <BlurView
                  intensity={Platform.select({ ios: 10, android: 80 })}
                  style={[StyleSheet.absoluteFillObject, styles.checkIcon]}
                >
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={40}
                    color={PRIMARY.DEFAULT}
                  />
                </BlurView>
              )}
            </Pressable>
          );
        }}
        numColumns={3}
        // FlatList 컴포넌트의 한 열에 렌더링하는 양
        // FlatList 컴포넌트를 세로로 사용할 때만 적용 가능
        // 각 항목의 높이가 같아야 함
        onEndReached={getPhotos}
        onEndReachedThreshold={0.3}
        onRefresh={onRefresh}
        refreshing={refreshing}
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
  checkIcon: { justifyContent: 'center', alignItems: 'center' },
});

export default ImagePickerScreen;
