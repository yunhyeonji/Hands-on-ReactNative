import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Pedometer } from "expo-sensors";

export default function StepCounterScreen() {
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    // 앱 컴포넌트가 마운트되면 권한을 요청하고 걸음 수를 가져옵니다.
    const subscribe = Pedometer.watchStepCount((result) => {
      setStepCount(result.steps);
    });

    // 컴포넌트가 언마운트될 때 구독을 정리합니다.
    return () => {
      subscribe.remove();
    };
  }, []);

  return (
    <View>
      <Text>걸음 수: {stepCount}</Text>
    </View>
  );
}
