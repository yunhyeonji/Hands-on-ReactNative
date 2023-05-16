import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from '../screens/ListScreen';
import HeaderLeftButton from '../components/HeaderLeftButton';
import { PRIMARY, WHITE } from '../Color';
import HeaderRightButton from '../components/HeaderRightButton';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: WHITE },
        headerTitleAlign: 'center',
        headerTintColor: PRIMARY.DEFAULT,
        headerTitleStyle: { fontWeight: '700' },
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
          title: 'TODO List',
          headerRight: HeaderRightButton,
        }}
      />
      <Stack.Screen name={'Settings'} component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
