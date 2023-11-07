import { Button, View } from "react-native";

const HomeScreen = ({ navigation }) => {
  console.log({ navigation });
  return (
    <View>
      <Button
        title="Detail 1 열기"
        onPress={() => {
          navigation.navigate("Detail");
        }}
      />
      <Button
        title="Detail 2 열기"
        onPress={() => {
          navigation.navigate("Detail", { id: 2 });
        }}
      />
      <Button
        title="전화 기능 설정"
        onPress={() => {
          navigation.navigate("contact");
        }}
      />
      <Button
        title="네이버 웹뷰"
        onPress={() => {
          navigation.navigate("Naver");
        }}
      />
      <Button
        title="테스트"
        onPress={() => {
          navigation.navigate("Test");
        }}
      />
    </View>
  );
};

{
  /**
스크린으로 사용된 컴포넌트는 navigation이라는 객체를 Props로 받아올 수 있음
navigation.navigate("Detail"); 말고 navigation.push('Detail'); 로도 이동 가능

console.log({navigation}) = 
{
    "navigation": {
        "addListener": [Function addListener], 
        "canGoBack": [Function canGoBack], 
        "dispatch": [Function dispatch], 
        "getId": [Function getId], 
        "getParent": [Function getParent], 
        "getState": [Function anonymous],
        "goBack": [Function anonymous], 
        "isFocused": [Function isFocused], 
        "navigate": [Function anonymous], 
        "pop": [Function anonymous], 
        "popToTop": [Function anonymous], 
        "push": [Function anonymous], 
        "removeListener": [Function removeListener], 
        "replace": [Function anonymous], 
        "reset": [Function anonymous], 
        "setOptions": [Function setOptions], 
        "setParams": [Function anonymous]
    }
}
*/
}

export default HomeScreen;
