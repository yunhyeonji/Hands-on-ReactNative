import { useNavigation, useRoute } from '@react-navigation/native';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  TextInput,
  Text,
  Alert,
} from 'react-native';
import HeaderRight from '../components/HeaderRight';
import FastImage from '../components/FastImage';
import { GRAY } from '../colors';
import LocationSearch from '../components/LocationSearch';
import { uploadPhoto } from '../api/storage';
import { createPost } from '../api/post';

const MAX_TEXT_LENGTH = 60; // 최대 입력 글자 수

const WriteTextScreen = () => {
  const navigation = useNavigation(); // 화면 이동

  const { params } = useRoute(); // 현재 라우트의 데이터 값 가져오기
  const [photoUris, setPhotoUris] = useState([]); // 이미지 uri가져오기

  const [disabled, setDisabled] = useState(true); // 사용가능한지 확인
  const [isLoading, setIsLoading] = useState(false); // loading 중인지 확인

  const [text, setText] = useState(''); // 텍스트 입력
  const [location, setLocation] = useState(''); // 위치 저장 변수

  const width = useWindowDimensions().width / 4; // 이미지 한 줄에 4장 몰아넣기 위한 변수

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      const photos = await Promise.all(
        photoUris.map((uri) => uploadPhoto(uri))
      );
      await createPost({ photos, location, text });
      navigation.goBack();
    } catch (e) {
      Alert.alert('글 작성 실패', e.message, [
        {
          text: '확인',
          onPress: () => setIsLoading(false),
        },
      ]);
    }
  }, [location, text, photoUris, navigation]);

  useEffect(() => {
    setPhotoUris(params?.photoUris ?? []);
  }, [params?.photoUris]);

  useEffect(() => {
    setDisabled(isLoading || !text);
  }, [isLoading, text]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRight disabled={disabled} onPress={onSubmit} />,
    });
  }, [disabled, onSubmit, navigation]);

  return (
    <View style={styles.container}>
      {/* 사진보이기 */}
      <View style={{ flexDirection: 'row' }}>
        {photoUris.map((uri, idx) => (
          <FastImage
            key={idx}
            source={{ uri }}
            style={{ width, height: width }}
          />
        ))}
      </View>
      {/* 위치 검색하기 */}
      <LocationSearch
        onPress={({ description }) => setLocation(description)}
        isLoading={isLoading}
        isSelected={!!location}
      />

      {/* 글 작성 */}
      <View>
        <TextInput
          value={text}
          onChangeText={(text) => setText(text)}
          style={styles.input}
          placeholder="사진의 설명을 작성하세요"
          maxLength={MAX_TEXT_LENGTH}
          returnKeyType="done"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="none"
          keyboardAppearance="light"
          multiline={true}
          blurOnSubmit={true}
          /*
           * blurOnSubmit={true}
           * - onSubmitEditing 호출 + 키보드 사라짐
           * blurOnSubmit={false}
           * - onSubmitEditing 호출
           *
           * multiline={true}로 설정시 blurOnSubmit 기본값이 false
           * multiline={false}로 설정시 blurOnSubmit 기본값이 true
           */
          editable={!isLoading}
        />
        <Text style={styles.inputLength}>
          {text.length} / {MAX_TEXT_LENGTH}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputLength: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    color: GRAY.DARK,
    fontSize: 12,
  },
});

export default WriteTextScreen;
