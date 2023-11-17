import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  Platform,
  PermissionsAndroid,
  ImageBackground,
  StyleSheet,
  AppState,
} from "react-native";
import { Pedometer } from "expo-sensors";
import * as Location from "expo-location";
import ModalScreen from "./ModalScreen";

export default function StepCounterScreen() {
  // 걸음수
  const [stepCount, setStepCount] = useState(0);
  const [pastStepCount, setPastStepCount] = useState(0);
  // 거리 계산
  let Dist = stepCount / 1300;
  let DistanceCovered = Dist.toFixed(4);
  // 칼로리 계산
  let cal = DistanceCovered * 60;
  let caloriesBurnt = cal.toFixed(3);

  // 백그라운드, 포그라운드 상태 구분하기
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscri = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
      console.log("-------------------------------------");
    });

    return () => {
      subscri.remove();
    };
  }, []);

  // 위치권한 팝업 띄우기
  const [visible, setVisible] = useState(false);

  // 걸음수 측정 - IOS api
  const stepCountIOSFunc = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();

    if (isAvailable) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      console.log(pastStepCountResult);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
      }

      const subscribe = Pedometer.watchStepCount((result) => {
        setStepCount(result.steps);
      });

      return () => {
        subscribe.remove();
      };
    }
  };

  // 걸음수 측정 - 안드로이드 api
  const stepCountANDROIDFunc = () => {
    const subscribe = Pedometer.watchStepCount((result) => {
      console.log("Step count result:", result.steps);
      setStepCount(result.steps);
    });

    return () => {
      subscribe.remove();
    };
  };

  // 백그라운드 위치 권한 허용
  const checkBackgroundLocationPermission = async () => {
    const { status } = await Location.getBackgroundPermissionsAsync();
    if (status === "granted") {
      console.log("백그라운드 위치 권한이 항상 허용되었습니다.");
    } else {
      console.log("백그라운드 위치 권한이 허용되지 않았습니다.");
      setVisible(true);
    }
  };

  // 모달 -> 항상 허용 버튼 클릭시
  const onConfirm = () => {
    Location.requestBackgroundPermissionsAsync();
    setVisible(false);
  };
  // 모달 -> 닫기 버튼 클릭시
  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        if (Platform.OS === "android") {
          // Platform is Android
          await checkBackgroundLocationPermission();
          if (Platform.Version >= 29) {
            // 안드로이드 버전 10 이상인 경우 권한 요청
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
              // ACTIVITY_RECOGNITION 권한 획득 시 걸음 수 측정 시작
              stepCountANDROIDFunc();
            } else {
              console.log("Activity recognition permission denied on Android");
            }
          } else {
            // 안드로이드 버전 10 미만인 경우 요청 필요없음
            stepCountANDROIDFunc();
          }
        } else {
          // Platform is iOS
          stepCountIOSFunc();
        }
      } else {
        console.log("Location permission denied");
      }
    };

    requestPermission();
  }, []);

  return (
    <View style={styles.container}>
      <ModalScreen visible={visible} onConfirm={onConfirm} onClose={onClose} />
      <ImageBackground
        style={{ flex: 1 }}
        resizeMode="cover"
        source={require("../../assets/running.jpg")}
      >
        <View style={styles.stepCountContainer}>
          <View style={styles.stepCountView}>
            <Text style={styles.stepCount}>걸음 수: {stepCount} steps</Text>
            <Text style={styles.stepCount}>거리 : {DistanceCovered} km</Text>
            <Text style={styles.stepCount}>
              소모된 칼로리 : {caloriesBurnt} Kcal
            </Text>
            {Platform.OS === "ios" ? (
              <Text style={styles.stepCount}>
                어제 걸음 수 : {pastStepCount} steps
              </Text>
            ) : (
              ""
            )}
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
    paddingVertical: "2%",
  },
});
