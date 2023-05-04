import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import ListScreen from '../screens/ListScreen';
import HeaderLeftButton from '../components/HeaderLeftButton';
import { PRIMARY, WHITE } from '../Color';
import HeaderRightButton from '../components/HeaderRightButton';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        contentStyle: { backgroundColor: WHITE },
        headerTitleAlign: 'center',
        headerTintColor: PRIMARY.DEFAULT,
        headerTitleStyle: { fontWeight: '700' },
        title: 'TODO List',
        headerBackTitleVisible: false,
        headerLeft: HeaderLeftButton,
        // 아래 두개의 소스와 같음
        // headerLeft: (props) => HeaderLeftButton(props),
        // headerLeft: (props) => <HeaderLeftButton {...props} />,
      }}
    >
      <Stack.Screen
        name={'List'}
        component={ListScreen}
        options={{
          headerRight: HeaderRightButton,
        }}
      />
      <Stack.Screen
        name={'Home'}
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={'Settings'} component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
