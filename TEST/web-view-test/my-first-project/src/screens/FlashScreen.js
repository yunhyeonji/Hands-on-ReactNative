import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";

export default function FlashlightControl() {
  const [hasPermission, setHasPermission] = useState(null);
  const [flashOn, setFlashOn] = useState(false);

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

  return (
    <View>
      {hasPermission === null ? (
        <Text>카메라 권한을 요청 중...</Text>
      ) : hasPermission === false ? (
        <Text>카메라 권한이 거부되었습니다.</Text>
      ) : (
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <Camera
            style={{ width: 300, height: 300 }}
            type={Camera.Constants.Type.back}
            flashMode={
              flashOn
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            }
          />
          <TouchableOpacity onPress={toggleFlashlight}>
            <Text>{flashOn ? "플래시 끄기" : "플래시 켜기"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
