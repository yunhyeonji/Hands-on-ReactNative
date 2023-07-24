import { Keyboard, StyleSheet, View, Image, StatusBar } from 'react-native';
import Input, { InputTypes } from '../components/Input';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef();
  const [isLoding, setIsLoding] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { top, bottom } = useSafeAreaInsets();
  const { navigate } = useNavigation();

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
          />
          <Input
            ref={passwordRef}
            inputType={InputTypes.PASSWORD}
            value={password}
            onChangeText={(text) => setPassword(text.trim())}
            onSubmitEditing={onSubmit}
            styles={{ container: { marginTop: 20 } }}
          />
          <Button
            title="signIn"
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
