import { Pressable, Text } from 'react-native';
import PropTypes from 'prop-types';

const Button = ({ title }) => {
  return (
    <Pressable
      onPressIn={() => console.log('in!')}
      onPressOut={() => console.log('out!')}
      onPress={() => console.log('onPress!')}
      onLongPress={() => console.log('Long!')}
      delayLongPress={2000}
      style={(data) => {
        // console.log(data);
        return [
          { backgroundColor: 'green' },
          data.pressed && { backgroundColor: 'orange', opacity: 0.3 },
        ];
      }}
    >
      <Text>{title}</Text>
    </Pressable>
  );

  // return (
  //     <TouchableOpacity
  //         onPress={() => console.log("click!")}
  //         style={{backgroundColor:'green'}}
  //         // underlayColor={'orange'}
  //     >
  //         <Text>{title}</Text>
  //     </TouchableOpacity >
  // );

  // return (
  //     <TouchableHighlight
  //         onPress={() => console.log("click!")}
  //         style={{backgroundColor:'green'}}
  //         // underlayColor={'orange'}
  //     >
  //         <Text>{title}</Text>
  //     </TouchableHighlight>
  // );
};

Button.defaultProps = {
  title: 'default',
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Button;
