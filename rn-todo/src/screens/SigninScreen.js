import { useRef, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Input, {
  IconNames,
  keyboardTypes,
  ReturnKeyTypes,
} from '../components/input';
import SafeInputView from '../components/safeInputView';

const SigninScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);

  const onSubmit = () => {
    console.log(';');
  };

  return (
    <SafeInputView>
      <View style={styles.container}>
        <Image
          source={require('../../assets/main.png')}
          style={styles.image}
          resizeMode={'cover'}
        />

        <Input
          value={email}
          onChangeText={(text) => setEmail(text.trim())}
          title={'email'}
          placeholder={'your@email.com'}
          keyboardType={keyboardTypes.EMAIL}
          returnKeyType={ReturnKeyTypes.NEXT}
          iconName={IconNames.EMAIL}
          onSubmitEditing={() => passwordRef.current.focus()}
        />

        <Input
          ref={passwordRef}
          value={password}
          onChangeText={(text) => setPassword(text.trim())}
          title={'password'}
          secureTextEntry
          iconName={IconNames.Lock}
          onSubmitEditing={onSubmit}
        />
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
