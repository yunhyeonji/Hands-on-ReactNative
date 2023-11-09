import React, { useRef, useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { Button, StyleSheet, View } from "react-native";
import { DeviceMotion } from "expo-sensors";

export default function TestView({ route, navigation }) {
  const webViewRef = useRef(null);
  const [shakeCount, setShakeCount] = useState(0);
  const [newCount, setNewCount] = useState(0);

  // 이벤트 핸들링과 상태 업데이트
  useEffect(() => {
    const subscription = DeviceMotion.addListener((data) => {
      if (data.acceleration && data.acceleration.x > 30) {
        console.log("기기가 흔들렸습니다!");
        setShakeCount((prevCount) => {
          const updatedCount = prevCount + 1;

          if (updatedCount >= 5) {
            postWebviewMessage("흔들기를 감지했습니다.");
            console.log("기기가 흔들렸습니다!", updatedCount);
            setNewCount(0); // 4번 흔들면 카운트를 리셋
            return 0;
          }

          setNewCount(updatedCount);
          return updatedCount;
        });
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // 전화번호부 선택 이벤트 처리
  useEffect(() => {
    const phoneNumber = route.params?.phoneNumber;
    if (phoneNumber) {
      postWebviewMessage(phoneNumber);
      navigation.setParams({ phoneNumber: null });
    }
  }, [route.params?.phoneNumber]);

  // 이미지 사진 받는 이벤트 처리
  useEffect(() => {
    const photoURL = route.params?.photoURL;
    if (photoURL) {
      postWebviewMessage(photoURL.uri);
      navigation.setParams({ photoURL: null });
    }
  }, [route.params?.photoURL]);

  // 웹뷰에서 이벤트 받기
  const onWebviewMessage = (e) => {
    console.log(e.nativeEvent.data);
    navigation.navigate(e.nativeEvent.data);
  };

  // 웹뷰로 이벤트 보내기
  const postWebviewMessage = (message) => {
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
        onMessage={onWebviewMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
