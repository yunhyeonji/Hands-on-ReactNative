import {
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { PRIMARY, WHITE } from '../Color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRef, useState, useEffect } from 'react';

const BOTTOM = 30;
const InputFAB = () => {
  const [text, setText] = useState('');
  const [isOpened, setIsOpened] = useState(false);
  const inputRef = useRef(null);
  const windowWidth = useWindowDimensions().width;
  const [keyboardHeight, setKeyboardHeight] = useState(BOTTOM);

  // 창 켜기
  const open = () => {
    setIsOpened(true);
    inputRef.current.focus();
  };

  // 창 끄기
  const close = () => {
    setIsOpened(false);
    inputRef.current.blur();
  };

  // 버튼을 클릭했을 때 함수 실행
  const onPressButton = () => (isOpened ? close() : open());

  // ios에서만 사용하는 함수
  useEffect(() => {
    const show = Keyboard.addListener('keyboardWillShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height + BOTTOM);
    });
    const hide = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(BOTTOM);
    });

    // 정리함수 , useEffect함수로 이벤트를 만들때, 꼭 정리함수를 통해서 정리해줘야 함
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <>
      <View
        style={[
          styles.container,
          { bottom: keyboardHeight, alignItems : 'flex-start' },
          isOpened && { width: windowWidth - 20 },
        ]}
      >
        <TextInput
          ref={inputRef}
          value={text}
          onChangeText={setText}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="none"
          keyboardAppearance="light"
          returnKeyType="done"
          onBlur={close}
        ></TextInput>
      </View>
      <Pressable
        onPress={onPressButton}
        style={({ pressed }) => [
          styles.container,
          {bottom: keyboardHeight},
          pressed && { backgroundColor: PRIMARY.DARK },
        ]}
      >
        <MaterialCommunityIcons name="plus" size={24} color={WHITE} />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: BOTTOM,
    right: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: PRIMARY.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    color: WHITE,
    paddingLeft: 20,
    paddingRight: 70,
  },
});

export default InputFAB;
