import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import PropTypes from 'prop-types';

// 키보드가 올라오면서 화면을 가리는 문제 해결 - ios
const SafeInputView = ({ children }) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: 'padding' })}
    >
      <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        {children}
      </Pressable>
    </KeyboardAvoidingView>
  );
};

SafeInputView.propTypes = {
  children: PropTypes.node,
};

export default SafeInputView;
