import { Pressable, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export const ButtonTypes = {
  NUMBER: 'NUMBER',
  OPERATOR: 'OPERATOR',
};

const Colors = {
  // 일반 색 , 클릭했을때 색
  NUMBER: ['#fdf2f8', '#fecdd3'],
  OPERATOR: ['#fdf2f8', '#fecdd3'],
};

const Button = ({ title, onPress, buttonStyle, buttonType }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: Colors[buttonType][0] },
        pressed && { backgroundColor: Colors[buttonType][1] },
        buttonStyle,
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

Button.defaultProps = {
  buttonType: ButtonTypes.NUMBER,
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  buttonStyle: PropTypes.object,
  buttonType: PropTypes.oneOf(Object.values(ButtonTypes)),
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  title: {
    fontSize: 50,
    color: '#000000',
  },
});

export default Button;
