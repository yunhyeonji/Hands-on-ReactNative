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
  const [stepCount, setStepCount] = useState(0);

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
        <View style={styles.stepCountView}>
          <Text style={styles.stepCount}>걸음 수: {stepCount}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepCountView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    margin: 5,
  },
  stepCount: {
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    // alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
    padding: 5,
    borderRadius: 10,
  },
});
