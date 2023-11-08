import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";

export default function FlashlightControl() {
  const [hasPermission, setHasPermission] = useState(null);
  const [flashOn, setFlashOn] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);

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
      setCapturedImage(photo); // 찍힌 사진을 저장

      console.log("사진이 찍혔습니다:", photo);
      // 이제 photo를 사용하거나 저장하는 등의 추가 작업을 수행할 수 있습니다.
    }
  };

  return (
    <View>
      {hasPermission === null ? (
        <Text>카메라 권한을 요청 중...</Text>
      ) : hasPermission === false ? (
        <Text>카메라 권한이 거부되었습니다.</Text>
      ) : (
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <Camera
            ref={cameraRef}
            style={{ width: 300, height: 300 }}
            type={Camera.Constants.Type.back}
            flashMode={
              flashOn
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            }
          />
          {capturedImage ? ( // 이미지가 캡처되면 표시
            <Image
              source={{ uri: capturedImage.uri }}
              style={{ width: 200, height: 200, marginTop: 10 }}
            />
          ) : (
            <TouchableOpacity onPress={takePicture}>
              <Text>사진 찍기</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={toggleFlashlight}>
            <Text>{flashOn ? "플래시 끄기" : "플래시 켜기"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
