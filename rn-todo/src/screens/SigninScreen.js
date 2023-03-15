import { Image, StyleSheet, View } from 'react-native';
import Input, { keyboardTypes, ReturnKeyTypes } from '../components/input';
import SafeInputView from '../components/safeInputView';

const SigninScreen = () => {
  return (
    <SafeInputView>
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
    </SafeInputView>
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
  avoid: {
    flex: 1,
  },
});

export default SigninScreen;
