import * as Notifications from "expo-notifications";
import React, { useRef, useEffect, useState } from "react";

export const sendNotification = async () => {
  //푸시 알림
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("알림 권한이 거부되었습니다!");
      }
    })();
  }, []);
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "알림 제목 테스트",
      body: "알림 내용 테스트",
    },
    trigger: null, // 즉시 보내려면 'trigger'에 'null'을 설정
  });
};
