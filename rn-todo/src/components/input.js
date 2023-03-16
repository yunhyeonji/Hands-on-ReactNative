import { StyleSheet, Text, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';

export const keyboardTypes = {
  DEFAULT: 'default',
  EMAIL: 'email-address',
};

export const ReturnKeyTypes = {
  DONE: 'done',
  NEXT: 'next',
};

const Input = ({ title, placeholder, value, ...props }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <TextInput
        {...props}
        value={value}
        style={styles.input}
        // null 이거나 undefind일 때 title을 넣어준다. placeholder={''}이렇게 라도 보내게 되면 placeholder로 인식함
        placeholder={placeholder ?? title}
        // null 이거나 undefind일 때 title을 넣어준다. placeholder={''}로 보내도 인식하지 못해 title로 넣어줌, placeholder={' '} 빈 칸은 인식험
        // placeholder={placeholder || title}
        placeholderTextColor={'#a3a3a3'}
        // 특정 문자를 자동으로 대문자로 변경 => 'none'일 시 소문자로 고정
        autoCapitalize={'none'}
        // 글씨가 오타가 났을때 확인 후 자동 수정을 하게 됨 =>  false일 시 수정 안됨
        autoCorrect={false}
        textContentType={'none'}
        // 키보드 색상 변경 가능 (IOS)
        keyboardAppearance={'dark'}
      />
    </View>
  );
};

Input.defaultProps = {
  returnKeyType: ReturnKeyTypes.DONE,
};

Input.propTypes = {
  value: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  title: {
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
    height: 42,
  },
});

export default Input;
