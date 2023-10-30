import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
import { Text, TouchableOpacity, View } from "react-native";
import NaverView from "./webapp/NaverView";
const Stack = createNativeStackNavigator();

const headerLeft = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text>Left</Text>
  </TouchableOpacity>
);

const headerRight = () => <Text>Right</Text>;

const headerTitle = ({ children }) => (
  <View>
    <Text>{children}</Text>
  </View>
);

const Navigations = () => {
  return (
    <NavigationContainer>
      {/* 내비게이션 설정 */}
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "홈",
            // Header 블록에 대한 스타일
            headerStyle: { backgroundColor: "#29b6f6" },
            //Header의 텍스트, 버튼들 색상
            headerTintColor: "#fff",
            //타이틀 텍스트 스타일
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
          }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={({ route }) => ({
            title: `상세정보 - ${route.params?.id}`,
            headerBackVisible: false,
            headerLeft,
            headerTitle,
            headerRight,
          })}
        />
        <Stack.Screen
          name="Naver"
          component={NaverView}
          options={{
            title: `네이버 웹뷰`,
          }}
        />
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
