import { useEffect, useRef, useState } from 'react';
import { Image, Keyboard, StyleSheet, View } from 'react-native';
import Button from '../components/Button';
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
  const [disabled, setDisabled] = useState(true);

  // useEffect() 도 Hook이므로 순서가 중요합니다.
  // useEffect(() => {
  //   console.log(`always: ${email} ${password}`);
  // }); // always rendering
  // useEffect(() => {
  //   console.log(`mount: ${email} ${password}`);
  // }, []); // mount
  // useEffect(() => {
  //   console.log(`email: ${email} ${password}`);
  // }, [email]); // email이 변경되었을때 useEffect함수가 실행된다.

  useEffect(() => {
    setDisabled(!email || !password);
  }, [email, password]);

  const onSubmit = () => {
    if (!disabled) {
      Keyboard.dismiss();
      console.log('HI IM LOGIN BUTTON');
    }
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
        <View style={styles.buttonContainer}>
          <Button title="LOGIN" onPress={onSubmit} disabled={disabled} />
        </View>
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
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default SigninScreen;
