import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HeaderlessScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View>
        <Text style={{ textAlign: "center" }}> Header 없는 화면</Text>
        <Button title="뒤로가기" onPress={() => navigation.pop()} />
      </View>
    </SafeAreaView>
  );
};

export default HeaderlessScreen;
