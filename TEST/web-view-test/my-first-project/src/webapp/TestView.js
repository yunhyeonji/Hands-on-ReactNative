import React, { useRef, useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { Button, StyleSheet, View } from "react-native";
import { DeviceMotion } from "expo-sensors";
import * as Notifications from "expo-notifications";

export default function TestView({ route, navigation }) {
  const webViewRef = useRef(null);
  const [shakeCount, setShakeCount] = useState(0);
  const [newCount, setNewCount] = useState(0);

  //푸시 알림
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("알림 권한이 거부되었습니다!");
      }
    })();
  }, []);

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "웹뷰알림전송",
        body: "알림내용 부분입니다.",
      },
      trigger: null, // 즉시 보내려면 'trigger'에 'null'을 설정
    });
  };

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
    let data = e.nativeEvent.data.split(",");
    if (data[0] === "N") {
      sendNotification();
    } else {
      navigation.navigate(data[1]);
    }
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
        source={{ uri: "http://reactwebapp.dothome.co.kr/webapp/" }}
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
