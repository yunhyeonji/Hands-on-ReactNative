import {
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions,
  Animated,
} from 'react-native';
import { BLACK, PRIMARY, WHITE } from '../Color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const BOTTOM = 30;
const BUTTON_WIDTH = 60;

const InputFAB = ({onInsert}) => {
  const [text, setText] = useState('');
  const [isOpened, setIsOpened] = useState(false);
  const inputRef = useRef(null);
  const windowWidth = useWindowDimensions().width;
  const [keyboardHeight, setKeyboardHeight] = useState(BOTTOM);

  const inputWidth = useRef(new Animated.Value(BUTTON_WIDTH)).current;
  const buttonRotation = useRef(new Animated.Value(0)).current;
  const spin = buttonRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '315deg'],
  });

  // 창 켜기
  const open = () => {
    setIsOpened(true);
    Animated.timing(inputWidth, {
      toValue: windowWidth - 20,
      useNativeDriver: false,
      duration: 300, // 애니메이션이 동작하는 시간
    }).start(() => {
      inputRef.current.focus();
    });
    Animated.spring(buttonRotation, {
      toValue: 1,
      useNativeDriver: false,
      bounciness: 20,
    }).start();
  };

  // 창 끄기
  const close = () => {
    setIsOpened(false);
    Animated.timing(inputWidth, {
      toValue: BUTTON_WIDTH,
      useNativeDriver: false,
      duration: 300, // 애니메이션이 동작하는 시간
    }).start(() => {
      inputRef.current.blur();
      setText('');
    });
    Animated.spring(buttonRotation, {
      toValue: 0,
      useNativeDriver: false,
      bounciness: 20,
    }).start();
  };

  // 버튼을 클릭했을 때 함수 실행
  const onPressButton = () => (isOpened ? close() : open());
  const onPressInsert = () => {
    const task = text.trim();
    if (task) {
      onInsert(task);
    }
  };

  // ios에서만 사용하는 함수
  useEffect(() => {
    if (Platform.OS === 'ios') {
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
    }
  }, []);

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          styles.shadow,
          {
            bottom: keyboardHeight,
            alignItems: 'flex-start',
            width: inputWidth,
          },
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
          onSubmitEditing={onPressInsert}
        ></TextInput>
      </Animated.View>

      <Animated.View
        style={[
          styles.container,
          { bottom: keyboardHeight, transform: [{ rotate: spin }] },
        ]}
      >
        <Pressable
          onPress={onPressButton}
          style={({ pressed }) => [
            styles.container,
            { right: 0 },
            pressed && { backgroundColor: PRIMARY.DARK },
          ]}
        >
          <MaterialCommunityIcons name="plus" size={24} color={WHITE} />
        </Pressable>
      </Animated.View>
    </>
  );
};

InputFAB.propTypes = {
  onInsert: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 10,
    width: BUTTON_WIDTH,
    height: BUTTON_WIDTH,
    borderRadius: BUTTON_WIDTH / 2,
    backgroundColor: PRIMARY.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    color: WHITE,
    paddingLeft: 20,
    paddingRight: BUTTON_WIDTH + 10,
  },
  // ios와 android 에서 사용하는 그림자 컴포넌트가 다름!!
  shadow: {
    shadowColor: BLACK,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: { elevation: 5 },
    }),
  },
});

export default InputFAB;
