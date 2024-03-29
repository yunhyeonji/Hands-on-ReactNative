import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { GRAY, PRIMARY, DANGER, WHITE } from '../colors';

export const ButtonTypes = {
  PRIMARY: 'PRIMARY',
  DANGER: 'DANGER',
  CANCEL: 'CANCEL',
};

// 키와 값이 같을 땐 간단하게 사용가능
const ButtonTypeColors = {
  PRIMARY,
  DANGER,
  CANCEL: GRAY,
};

const Button = ({ title, onPress, disabled, isLoding, styles, buttonType }) => {
  const Colors = ButtonTypeColors[buttonType];
  return (
    <View style={[defaultstyles.container, styles?.container]}>
      <Pressable
        onPress={onPress}
        disabled={disabled || isLoding}
        style={({ pressed }) => [
          defaultstyles.button,
          {
            backgroundColor: (() => {
              switch (true) {
                case disabled || isLoding:
                  return Colors.LIGHT;
                case pressed:
                  return Colors.DARK;
                default:
                  return Colors.DEFAULT;
              }
            })(),
          },
          styles?.button,
        ]}
      >
        {isLoding ? (
          <ActivityIndicator size={'small'} color={GRAY.DARK} />
        ) : (
          <Text style={defaultstyles.title}>{title}</Text>
        )}
      </Pressable>
    </View>
  );
};
Button.defaultProps = {
  buttonType: ButtonTypes.PRIMARY,
};

Button.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  isLoding: PropTypes.bool,
  styles: PropTypes.object,
  buttonType: PropTypes.oneOf(Object.values(ButtonTypes)),
};

const defaultstyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },
  button: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;
