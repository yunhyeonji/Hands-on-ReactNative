import { Keyboard, StyleSheet, View, Image, StatusBar } from 'react-native';
import Input, { InputTypes, ReturnKeyTypes } from '../components/Input';
import Button from '../components/Button';
import { useState, useRef, useEffect } from 'react';
import SafeInputView from '../components/SafeInputView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TextButton from '../components/TextButton';
import { useNavigation } from '@react-navigation/native';
import { AuthRoutes } from '../navigations/routes';
import HR from '../components/HR';
import { WHITE } from '../colors';

const SignInScreen = () => {
  const [email, setEmail] = useState(''); // 이메일 작성하는 것, 리렌더링 됨
  const [password, setPassword] = useState(''); // 비밀번호 작성하는 것, 리렌더링 됨
  const passwordRef = useRef(); // 이메일 작성 후 '다음'하면 비밀번호 입력하는 곳으로 이동
  const [isLoding, setIsLoding] = useState(false); // 로그인버튼 눌렀을때 함수가 작동하고있는지, 확인
  const [disabled, setDisabled] = useState(false); // 이메일, 비밀번호 작성안하면 로그인버튼 비활성화

  const { top, bottom } = useSafeAreaInsets(); // 화면에서 top 높이와 bottom 높이를 가져옴
  const { navigate } = useNavigation(); // 쌓는 느낌...

  useEffect(() => {
    setDisabled(!email || !password);
  }, [email, password]);

  const onSubmit = () => {
    Keyboard.dismiss();
    if (!disabled && !isLoding) {
      setIsLoding(true);
      console.log(email, password);
      setIsLoding(false);
    }
  };

  return (
    <SafeInputView>
      <StatusBar style={'light'} />
      <View style={[styles.container, { paddingTop: top }]}>
        <View style={StyleSheet.absoluteFillObject}>
          <Image
            source={require('../../assets/cover.png')}
            style={{ width: '100%' }}
            resizeMode={'cover'}
          ></Image>
        </View>
        <View
          style={[styles.form, { paddingBottom: bottom ? bottom + 10 : 40 }]}
        >
          <Input
            inputType={InputTypes.EMAIL}
            value={email}
            onChangeText={(text) => setEmail(text.trim())}
            onSubmitEditing={() => passwordRef.current.focus()}
            styles={{ container: { marginTop: 20 } }}
            returnKeyType={ReturnKeyTypes.NEXT}
          />
          <Input
            ref={passwordRef}
            inputType={InputTypes.PASSWORD}
            value={password}
            onChangeText={(text) => setPassword(text.trim())}
            onSubmitEditing={onSubmit}
            styles={{ container: { marginTop: 20 } }}
            returnKeyType={ReturnKeyTypes.DONE}
          />
          <Button
            title="SIGNIN"
            disabled={disabled}
            isLoding={isLoding}
            onPress={onSubmit}
            styles={{ container: { marginTop: 20 } }}
          />
          <HR text={'OR'} styles={{ container: { marginVertical: 30 } }}></HR>
          <TextButton
            title={'SIGNUP'}
            onPress={() => navigate(AuthRoutes.SIGN_UP)}
          ></TextButton>
        </View>
      </View>
    </SafeInputView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  form: {
    backgroundColor: WHITE,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 30,
  },
});

export default SignInScreen;
