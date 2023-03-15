import { Image, StyleSheet, View } from 'react-native';
import Input, { keyboardTypes, ReturnKeyTypes } from '../components/input';

const SigninScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/main.png')}
        style={styles.image}
        resizeMode={'cover'}
      />

      <Input
        title={'email'}
        placeholder={'your@email.com'}
        keyboardType={keyboardTypes.EMAIL}
        returnKeyType={ReturnKeyTypes.NEXT}
      />

      <Input title={'password'} secureTextEntry />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default SigninScreen;
