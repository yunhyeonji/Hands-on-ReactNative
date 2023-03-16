import { StyleSheet, Text, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import { BLACK, GRAY, PRIMARY } from '../Color';
import { forwardRef, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export const keyboardTypes = {
  DEFAULT: 'default',
  EMAIL: 'email-address',
};

export const ReturnKeyTypes = {
  DONE: 'done',
  NEXT: 'next',
};

export const IconNames = {
  EMAIL: 'email',
  Lock: 'lock',
};

const Input = forwardRef(
  ({ title, placeholder, value, iconName, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
      <View style={styles.container}>
        <Text
          style={[
            styles.title, // default
            value && styles.hasValueTitle, // value
            isFocused && styles.focusedTitle, // value + focus
          ]}
        >
          {title}
        </Text>
        <View>
          <TextInput
            ref={ref}
            {...props}
            value={value}
            style={[
              styles.input,
              value && styles.hasValueInput,
              isFocused && styles.focusedInput,
            ]}
            // null 이거나 undefind일 때 title을 넣어준다. placeholder={''}이렇게 라도 보내게 되면 placeholder로 인식함
            placeholder={placeholder ?? title}
            // null 이거나 undefind일 때 title을 넣어준다. placeholder={''}로 보내도 인식하지 못해 title로 넣어줌, placeholder={' '} 빈 칸은 인식험
            // placeholder={placeholder || title}
            placeholderTextColor={GRAY}
            // 특정 문자를 자동으로 대문자로 변경 => 'none'일 시 소문자로 고정
            autoCapitalize={'none'}
            // 글씨가 오타가 났을때 확인 후 자동 수정을 하게 됨 =>  false일 시 수정 안됨
            autoCorrect={false}
            textContentType={'none'}
            // 키보드 색상 변경 가능 (IOS)
            keyboardAppearance={'dark'}
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
          />
          <View style={styles.icon}>
            <MaterialIcons
              name={iconName}
              size={20}
              color={(() => {
                switch (true) {
                  case isFocused:
                    return PRIMARY.DEFAULT;
                  case !!value:
                    return BLACK;
                  default:
                    return GRAY.DEFAULT;
                }
              })()}
            />
          </View>
        </View>
      </View>
    );
  }
);

// 이거 없으면  eslint오류 발생
Input.displayName = 'Input';

Input.defaultProps = {
  returnKeyType: ReturnKeyTypes.DONE,
};

Input.propTypes = {
  value: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  iconName: PropTypes.oneOf(Object.values(IconNames)),
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  title: {
    marginBottom: 4,
    color: GRAY.DEFAULT,
  },
  focusedTitle: {
    fontWeight: '600',
    color: PRIMARY.DEFAULT,
  },
  hasValueTitle: {
    color: BLACK,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: GRAY.DEFAULT,
    paddingHorizontal: 20,
    height: 42,
    paddingLeft: 30,
  },
  focusedInput: {
    borderWidth: 2,
    borderColor: PRIMARY.DEFAULT,
    color: PRIMARY.DEFAULT,
  },
  hasValueInput: {
    color: BLACK,
    borderColor: BLACK,
  },
  icon: {
    position: 'absolute',
    left: 8,
    height: '100%',
    justifyContent: 'center',
  },
});

export default Input;
