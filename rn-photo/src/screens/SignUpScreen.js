import {
  Keyboard,
  StyleSheet,
  View,
  Image,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import Input, { InputTypes, ReturnKeyTypes } from '../components/Input';
import Button from '../components/Button';
import { useRef, useReducer } from 'react';
import SafeInputView from '../components/SafeInputView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TextButton from '../components/TextButton';
import { useNavigation } from '@react-navigation/native';
import { AuthRoutes } from '../navigations/routes';
import HR from '../components/HR';
import { WHITE } from '../colors';
import {
  AuthFormTypes,
  authFormReducer,
  initAuthForm,
} from '../reducers/authFormReducer';
import { getAuthErrorMesseages, signUp } from '../api/auth';
import { useUserState } from '../contexts/UserContext';

const SignUpScreen = () => {
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [passwordConfirm, setPasswordConfirm] = useState('');
  // const [isLoding, setIsLoding] = useState(false);
  // const [disabled, setDisabled] = useState(false);
  const [form, dispatch] = useReducer(authFormReducer, initAuthForm);

  const { top, bottom } = useSafeAreaInsets();
  const { navigate } = useNavigation();
  const [, setUser] = useUserState();

  const updateForm = (payload) => {
    const newForm = {
      ...form,
      ...payload,
    };
    const disabled =
      !newForm.email ||
      !newForm.password ||
      newForm.password !== newForm.passwordConfirm;

    dispatch({
      type: AuthFormTypes.UPDATE_FORM,
      payload: { disabled, ...payload },
    });
  };

  const onSubmit = async () => {
    Keyboard.dismiss();
    if (!form.disabled && !form.isLoding) {
      dispatch({ type: AuthFormTypes.TOGGLE_LOADING });
      try {
        const user = await signUp(form);
        setUser(user); // unmount 됨
      } catch (e) {
        const message = getAuthErrorMesseages(e.code);
        Alert.alert('회원가입 실패', message, [
          {
            text: '확인',
            onPress: () => dispatch({ type: AuthFormTypes.TOGGLE_LOADING }),
          },
        ]);
      }
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
        <ScrollView
          style={[styles.form, { paddingBottom: bottom ? bottom + 10 : 40 }]}
          contentContainerStyle={{ alignItems: 'center' }}
          // <ScrollView>에서는 자식 컴포넌트의 스타일 코드를 contentContainerStyle에 작성해야 함
          bounces={false} // ios에서 스크롤이 생성되지 않아도, 혹인 스크롤이 끝에 도달해도, 당겼을 때 바운스 여부를 결정하는 props
          keyboardShouldPersistTaps={'always'}
        >
          <Input
            inputType={InputTypes.EMAIL}
            value={form.email}
            onChangeText={(text) => updateForm({ email: text.trim() })}
            onSubmitEditing={() => passwordRef.current.focus()}
            styles={{ container: { marginTop: 20 } }}
            returnKeyType={ReturnKeyTypes.NEXT}
          />
          <Input
            ref={passwordRef}
            inputType={InputTypes.PASSWORD}
            value={form.password}
            onChangeText={(text) => updateForm({ password: text.trim() })}
            onSubmitEditing={() => passwordConfirmRef.current.focus()}
            styles={{ container: { marginTop: 20 } }}
            returnKeyType={ReturnKeyTypes.NEXT}
          />
          <Input
            ref={passwordConfirmRef}
            inputType={InputTypes.PASSWORD_CONFIRM}
            value={form.passwordConfirm}
            onChangeText={(text) =>
              updateForm({ passwordConfirm: text.trim() })
            }
            onSubmitEditing={onSubmit}
            styles={{ container: { marginTop: 20 } }}
            returnKeyType={ReturnKeyTypes.DONE}
          />
          <Button
            title="SIGNUP"
            disabled={form.disabled}
            isLoding={form.isLoding}
            onPress={onSubmit}
            styles={{ container: { marginTop: 20 } }}
          />
          <HR text={'OR'} styles={{ container: { marginVertical: 30 } }}></HR>
          <TextButton
            title={'SIGNIN'}
            onPress={() => navigate(AuthRoutes.SIGN_IN)}
          ></TextButton>
        </ScrollView>
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
    flexGrow: 0,
    backgroundColor: WHITE,
    // alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 30,
  },
});

export default SignUpScreen;
