import { Keyboard, StyleSheet, View } from 'react-native';
import Input, { InputTypes } from '../components/Input';
import Button from '../components/Button';
import { useState, useRef, useEffect } from 'react';
import SafeInputView from '../components/SafeInputView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TextButton from '../components/TextButton';
import { useNavigation } from '@react-navigation/native';
import { AuthRoutes } from '../navigations/routes';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef();
  const [isLoding, setIsLoding] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { top } = useSafeAreaInsets();
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
      <View style={[styles.container, { paddingTop: top }]}>
        {/* <Input
        title={'EMAIL'}
        placeholder={'your@email.com'}
        iconName={'email'}
        keyBoardType={KeyboardTypes.EMAIL}
      /> */}
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
        <TextButton
          title={'SIGNUP'}
          onPress={() => navigate(AuthRoutes.SIGN_UP)}
        ></TextButton>
      </View>
    </SafeInputView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
  },
});

export default SignInScreen;
