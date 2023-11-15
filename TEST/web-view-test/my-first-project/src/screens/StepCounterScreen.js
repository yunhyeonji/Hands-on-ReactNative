import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Platform,
  PermissionsAndroid,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { Pedometer } from "expo-sensors";
import * as Location from "expo-location";

export default function StepCounterScreen() {
  // 걸음수
  const [stepCount, setStepCount] = useState(0);
  // 거리 계산
  let Dist = stepCount / 1300;
  let DistanceCovered = Dist.toFixed(4);
  // 칼로리 계산
  let cal = DistanceCovered * 60;
  let caloriesBurnt = cal.toFixed(3);

  const stepCountFunc = () => {
    const subscribe = Pedometer.watchStepCount((result) => {
      console.log("Step count result:", result.steps);
      setStepCount(result.steps);
    });

    return () => {
      subscribe.remove();
    };
  };

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        if (Platform.OS === "android") {
          // Platform is Android
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
            {
              title: "권한 요청",
              message: "'신체활동'에 대한 권한 요청입니다.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK",
            }
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            stepCountFunc();
          } else {
            console.log("Activity recognition permission denied on Android");
          }
        } else {
          // Platform is iOS
          stepCountFunc();
        }
      } else {
        console.log("Location permission denied");
      }
    };

    requestPermission();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ flex: 1 }}
        resizeMode="cover"
        source={{
          uri: "https://blog.kakaocdn.net/dn/ed9WhD/btr2ZCo0nVf/mPce1icYwOptbCVLMC4HG0/img.jpg",
        }}
      >
        <View style={styles.stepCountContainer}>
          <View style={styles.stepCountView}>
            <Text style={styles.stepCount}>걸음 수: {stepCount} steps</Text>
            <Text style={styles.stepCount}>거리 : {DistanceCovered} km</Text>
            <Text style={styles.stepCount}>
              소모된 칼로리 : {caloriesBurnt} Kcal
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepCountContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    margin: "1%",
  },
  stepCountView: {
    width: "70%",
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: "2%",
  },
  stepCount: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    padding: "2%",
  },
});
