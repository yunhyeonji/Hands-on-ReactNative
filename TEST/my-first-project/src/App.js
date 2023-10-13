import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import NaverView from "./webapp/NaverView";

export default function App() {
  return (
    <View style={styles.container}>
      <NaverView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
