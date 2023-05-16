import { useEffect, useRef, useState } from 'react';
import { Alert, Image, Keyboard, StyleSheet, View } from 'react-native';
import { signIn } from '../api/auth';
import Button from '../components/Button';
import Input, {
  IconNames,
  keyboardTypes,
  ReturnKeyTypes,
} from '../components/Input';
import SafeInputView from '../components/SafeInputView';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserContext } from '../contexts/UserContext';
// react-native에 있는 SafeAreaView는 ios에서만 적용 가능

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setISLoading] = useState(false);

  const insets = useSafeAreaInsets();
  // console.log(Platform.OS, insets);

  const { setUser } = useUserContext();

  // useEffect(() => {
  //   navigation.setOptions({
  //     contentStyle: {
  //       backgroundColor: email ? 'skyblue' : 'lightgray',
  //     },
  //   });
  // }, [navigation, email]);

  useEffect(() => {
    setDisabled(!email || !password);
  }, [email, password]);

  const onSubmit = async () => {
    if (!disabled && !isLoading) {
      Keyboard.dismiss();
      setISLoading(true);
      try {
        const data = await signIn(email, password);
        // auth.js에 있는 singIn함수 호출
        setISLoading(false);
        // navigation.navigate('List');
        setUser(data);
        // 로그인을 성공하면 setUser함수에 data를 넣어 로그인이 된 상태임을 체크한다.
      } catch (e) {
        Alert.alert('SignIn Error', e, [
          {
            text: 'OK',
            onPress: () => setISLoading(false),
          },
        ]);
      }
      setISLoading(false);
    }
  };

  return (
    <SafeInputView>
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
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
          // 제출 버튼을 누르면 다음 포커스로 이동한다.
        />

        <Input
          ref={passwordRef}
          value={password}
          onChangeText={(text) => setPassword(text.trim())}
          title={'password'}
          secureTextEntry
          iconName={IconNames.Lock}
          onSubmitEditing={onSubmit}
          // 제출 버튼을 누르면 setUser변수와 함꼐 onSubmit함수를 실행한다.
        />
        <View style={styles.buttonContainer}>
          <Button
            title="LOGIN"
            onPress={onSubmit}
            disabled={disabled}
            isLoading={isLoading}
            // 로그인 버튼을 누르면 setUser변수와 함꼐 onSubmit함수를 실행한다.
          />
        </View>
      </View>
    </SafeInputView>
  );
};

SignInScreen.propTypes = {
  navigation: PropTypes.object,
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

export default SignInScreen;
