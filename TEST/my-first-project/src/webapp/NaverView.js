import * as React from "react";
import { WebView } from "react-native-webview";
import { StyleSheet } from "react-native";

export default function NaverView() {
  return (
    <WebView
      style={styles.container}
      source={{
        uri: "https://www.naver.com",
        // uri: "https://mblogthumb-phinf.pstatic.net/MjAyMTExMTdfNjUg/MDAxNjM3MDc2NzQ4NDE5.2fawXaDXwi84bNLXVUe9DcRgKfJZOOItBXLZy6LXKKAg.lfdVeNzjtSGB_AQGGl-IxUwMDl4egVECOHw7PLLzm4Ag.JPEG.lovejm0011/2021111309441000%EF%BC%8D02CB906EA538A35643C1E1484C4B947D.jpg?type=w800",
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
