import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import ListScreen from '../screens/ListScreen';
import { PRIMARY, WHITE } from '../Color';
import { Pressable, Text } from 'react-native';

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
      }}
    >
      <Stack.Screen
        name={'List'}
        component={ListScreen}
        // options={{
        //   title: 'TODO List',
        // }}
      />
      <Stack.Screen
        name={'Home'}
        component={SignInScreen}
        // options={{
        //   title: 'TODO List',
        //   headerTitle: (props) => {
        //     console.log(props);
        //     return (
        //       <Pressable onPress={() => console.log('header')}>
        //         <Text style={{ color: props.tintColor }}>{props.children}</Text>
        //       </Pressable>
        //     );
        //   },
        // }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
