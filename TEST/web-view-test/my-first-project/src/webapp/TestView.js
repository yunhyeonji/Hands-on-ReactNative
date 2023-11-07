import React, { useRef, useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { Button, StyleSheet, View } from "react-native";
import { DeviceMotion } from "expo-sensors";

export default function TestView({ route, navigation }) {
  const webViewRef = useRef(null);
  const [shakeCount, setShakeCount] = useState(0);
  const phoneNumber = route.params?.phoneNumber;
  if (phoneNumber) {
    postWebviewMessage("선택한 전화번호는 " + phoneNumber + "입니다.");
  }

  // 흔들기 이벤트 핸들링
  useEffect(() => {
    const subscription = DeviceMotion.addListener((data) => {
      if (data.acceleration && data.acceleration.x > 40) {
        console.log("기기가 흔들렸습니다!");
        // 이전 상태를 기반으로 업데이트
        setShakeCount((prevCount) => {
          const newCount = prevCount + 1;

          if (newCount >= 5) {
            postWebviewMessage("흔들기를 감지했습니다.");
            console.log("기기가 흔들렸습니다!", newCount);
            return 0; // 4번 흔들면 카운트를 리셋
          }

          return newCount;
        });
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
  postWebviewMessage = (message) => {
    // webViewRef.current.postMessage("네이티브에서 이벤트 보냅니다.");
    webViewRef.current.postMessage(message);
  };

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="앱단에서 이벤트보내기"
        onPress={() => postWebviewMessage("네이티브에서 이벤트 보냅니다.")}
      />
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
