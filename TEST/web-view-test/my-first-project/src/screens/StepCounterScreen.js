import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Pedometer } from "expo-sensors";
import * as Location from "expo-location";

export default function StepCounterScreen() {
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        // 앱 컴포넌트가 마운트되면 권한을 요청하고 걸음 수를 가져옵니다.
        const subscribe = Pedometer.watchStepCount((result) => {
          setStepCount(result.steps);
        });

        // 컴포넌트가 언마운트될 때 구독을 정리합니다.
        return () => {
          subscribe.remove();
        };
      } else {
        // 권한이 거부된 경우에 대한 처리
        console.log("Location permission denied");
      }
    };

    requestPermission();
  }, []);

  return (
    <View>
      <Text>걸음 수: {stepCount}</Text>
    </View>
  );
}
