import React, { useEffect, useRef } from "react";
import { WebView } from "react-native-webview";
import { Button, StyleSheet, Text, View } from "react-native";

export default function TestView({ navigation, route }) {
  console.log(route);

  // 웹뷰에서 이벤트 받기
  onWebviewMessage = (e) => {
    console.log(e.nativeEvent.data);
    navigation.navigate("Naver");
  };

  //웹뷰에 이벤트 보내기
  changeBackgroundColor = () => {
    const backgroundColor = "blue";

    this.webview.injectJavaScript(
      `document.getElementById('myBox2').style.backgroundColor = '${backgroundColor}';
      window.alert('입력창');`
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="배경색 변경" onPress={this.changeBackgroundColor} />
      <WebView
        ref={(ref) => (this.webview = ref)}
        style={styles.container}
        source={{ uri: "http://172.20.14.69:8080" }}
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
