import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImageManipulator from "expo-image-manipulator";

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
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo.uri);
      // navigation.navigate("Test", {
      //   photoURL: photo,
      // });
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
              <MaterialCommunityIcons name="camera" size={40} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleFlashlight}>
              {flashOn ? (
                <MaterialCommunityIcons
                  name="flash-off"
                  size={40}
                  color="black"
                />
              ) : (
                <MaterialCommunityIcons name="flash" size={40} color="black" />
              )}
            </TouchableOpacity>
          </View>
          {capturedImage && (
            <>
              <Image
                source={{ uri: capturedImage }}
                style={{
                  marginTop: 20,
                  width: 100,
                  height: 100,
                }}
              />
              <Text>웹페이지로 전송기능은 구현중</Text>
            </>
          )}
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
