import * as React from "react";
import { WebView } from "react-native-webview";
import { StyleSheet } from "react-native";

export default function NaverView({ navigation }) {
  return (
    <WebView
      style={styles.container}
      source={{ uri: "http://172.20.14.69:8080" }}
      onMessage={(event) => {
        // 이벤트 처리 및 네이티브 앱으로 전달
        console.log(event.nativeEvent.data); // 웹뷰에서 전송한 데이터
        if (event.nativeEvent.data) {
          navigation.navigate("Naver");
        }
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
