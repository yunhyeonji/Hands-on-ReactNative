import { useEffect, useRef, useState } from 'react';
import { Alert, Image, Keyboard, StyleSheet, View } from 'react-native';
import { signIn } from '../api/auth';
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
  const [isLoading, setISLoading] = useState(false);

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

  const onSubmit = async () => {
    if (!disabled && !isLoading) {
      Keyboard.dismiss();
      setISLoading(true);
      try {
        const data = await signIn(email, password);
        console.log(data);
        setISLoading(false);
      } catch (e) {
        // console.log(e);
        Alert.alert('SignIn Error', e, [
          {
            text: 'OK',
            onPress: () => setISLoading(false),
          },
          // {
          //   text: 'cancel',
          //   onPress: () => console.log('cancel'),
          //   style: 'cancel',
          // },
          // {
          //   text: 'done',
          //   onPress: () => console.log('done'),
          //   style: 'destructive',
          // },
        ]);
      }
      setISLoading(false);
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
          <Button
            title="LOGIN"
            // title={'로그인'}
            onPress={onSubmit}
            disabled={disabled}
            isLoading={isLoading}
          />
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
