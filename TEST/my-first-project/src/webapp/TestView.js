import React, { useRef } from "react";
import { WebView } from "react-native-webview";
import { Button, StyleSheet, View } from "react-native";

export default function TestView({ navigation }) {
  const webViewRef = useRef(null);

  // 웹뷰에서 이벤트 받기
  onWebviewMessage = (e) => {
    console.log(e.nativeEvent.data);
    navigation.navigate(e.nativeEvent.data);
  };
  // 웹뷰로 이벤트 보내기
  postWebviewMessage = () => {
    webViewRef.current.postMessage("업데이트 하세요");
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="배경색 변경" onPress={postWebviewMessage} />
      <WebView
        ref={webViewRef}
        style={styles.container}
        source={{ uri: "http://172.20.14.69:3000/react-2022-tutorial-src" }}
        onMessage={this.onWebviewMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
