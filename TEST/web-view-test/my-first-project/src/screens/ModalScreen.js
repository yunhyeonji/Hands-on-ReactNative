import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text, Modal, Button } from "react-native";

const ModalScreen = ({ visible, onConfirm, onClose }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Modal
        animationType="fade" // or "fade", "slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              flex: 0.4,
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text style={styles.title}>
              안드로이드 정책에 따른 위치기반서비스 알림{"\n"}
            </Text>
            <Text style={styles.contents}>
              걸음수 측정은 앱이 켜진 상태에서만
              {"\n"}사용자의 현재 위치를 제공받고 있습니다.
              {"\n"}만약, 백그라운드에서도 걸음수 측정을 원하신다면
              {"\n"}
              {"\n"} * 휴대폰 '설정{">"}danusys_webapp{">"}권한{">"}위치'로
              {"\n"} 이동하여, 위치 권한을 '항상 허용'으로
              {"\n"} 설정하시기 바랍니다.
              {"\n"}
            </Text>
            <View style={styles.button}>
              <Button title="앱 사용 중에만 걸음수 측정" onPress={onClose} />
              <Button title="'항상 허용' 설정" onPress={onConfirm} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    flex: 2,
    fontSize: 20,
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  contents: {
    flex: 5,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default ModalScreen;
