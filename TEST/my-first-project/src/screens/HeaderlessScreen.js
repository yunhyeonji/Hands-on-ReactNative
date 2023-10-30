import { Button, Text, View } from "react-native";

const HeaderlessScreen = ({ navigation }) => {
  return (
    <View>
      <Text> Header 없는 화면</Text>
      <Button title="뒤로가기" onPress={() => navigation.pop()} />
    </View>
  );
};
