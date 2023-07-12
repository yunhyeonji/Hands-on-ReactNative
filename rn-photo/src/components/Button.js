import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { GRAY, PRIMARY, WHITE } from '../colors';

const Button = ({ title, onPress, disabled, isLoding, styles }) => {
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
                  return PRIMARY.LIGHT;
                case pressed:
                  return PRIMARY.DARK;
                default:
                  return PRIMARY.DEFAULT;
              }
            })(),
          },
          styles?.button,
        ]}
      >
        {isLoding ? (
          <ActivityIndicator size={'samll'} color={GRAY.DARK} />
        ) : (
          <Text style={defaultstyles.title}>{title}</Text>
        )}
      </Pressable>
    </View>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  isLoding: PropTypes.bool,
  styles: PropTypes.object,
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
