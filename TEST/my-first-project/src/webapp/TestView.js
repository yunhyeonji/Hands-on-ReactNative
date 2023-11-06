import React, { useRef, useEffect } from "react";
import { WebView } from "react-native-webview";
import { Button, StyleSheet, View } from "react-native";
import { DeviceMotion } from "expo-sensors";

export default function TestView({ navigation }) {
  const webViewRef = useRef(null);

  // 흔들기 기능
  useEffect(() => {
    const subscription = DeviceMotion.addListener((data) => {
      // 여기서 흔들기 이벤트를 처리
      if (data.acceleration && data.acceleration.x > 10) {
        // 흔들기 이벤트가 발생하면 원하는 동작 수행
        console.log("기기가 흔들렸습니다!");
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

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
