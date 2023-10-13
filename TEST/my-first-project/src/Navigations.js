import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";

const Stack = createNativeStackNavigator();

const Navigations = () => {
  return (
    <NavigationContainer>
      {/* 내비게이션 설정 */}
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

{
  /**
name => 화면의 이름을 설정하는 props,
        다른 화면으로 이동하거나 현재 화면이 어떤 화면인지 조회할 때 쓰임
        
Screen으로 사용된 컴포넌트는 navigation이라는 객체를 props로 이동할 페이지에 던질 수 있음
*/
}

export default Navigations;
