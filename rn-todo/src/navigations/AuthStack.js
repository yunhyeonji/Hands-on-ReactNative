import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import ListScreen from '../screens/ListScreen';
import { WHITE } from '../Color';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'SignIn'}
      screenOptions={{
        contentStyle: { backgroundColor: WHITE },
      }}
    >
      <Stack.Screen name={'SignIn'} component={SignInScreen} />
      <Stack.Screen
        name={'List'}
        component={ListScreen}
        // options={{
        //   contentStyle: { backgroundColor: 'lavender', borderRadius: 30 },
        // }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
