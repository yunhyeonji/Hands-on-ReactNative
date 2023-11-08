import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function FlashlightControl() {
  const [hasPermission, setHasPermission] = useState(null);
  const [flashOn, setFlashOn] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const toggleFlashlight = async () => {
    if (hasPermission) {
      setFlashOn(!flashOn);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      const base64Image = `data:image/jpeg;base64,${photo.base64}`;
      setCapturedImage(photo); // 찍힌 사진을 저장

      // base64Image를 웹뷰로 전송
      const message = {
        image: base64Image,
      };
      // webViewRef.current.postMessage(JSON.stringify(message));
      console.log("사진이 찍혔습니다:", JSON.stringify(message));
      // 이제 photo를 사용하거나 저장하는 등의 추가 작업을 수행할 수 있습니다.
      navigation.navigate("Test", {
        photoURL: photo,
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {hasPermission === null ? (
        <Text>카메라 권한을 요청 중...</Text>
      ) : hasPermission === false ? (
        <Text>카메라 권한이 거부되었습니다.</Text>
      ) : (
        <View style={{ alignItems: "center" }}>
          <Camera
            ref={cameraRef}
            style={{ aspectRatio: 3 / 4, width: "100%" }}
            type={Camera.Constants.Type.back}
            flashMode={
              flashOn
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            }
          />
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <MaterialCommunityIcons name="camera" size={50} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleFlashlight}>
              {flashOn ? (
                <MaterialCommunityIcons
                  name="flash-off"
                  size={50}
                  color="black"
                />
              ) : (
                <MaterialCommunityIcons name="flash" size={50} color="black" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: "row",
    flex: 0 / 7,
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 50,
  },
});
