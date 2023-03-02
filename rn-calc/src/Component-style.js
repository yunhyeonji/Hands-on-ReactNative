import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const isError = true;
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: '700',
          color: 'blue',
          backgroundColor: 'green',
          padding: 10,
          borderWidth: 3,
          borderColor: 'red',
        }}
      >
        RN Calc App
      </Text>
      <Text style={styles.text}>함수로 style 적용하기</Text>
      <Text style={styles.text}>똑같은 함수로 style 적용하기</Text>
      <Text style={styles.error}>Error Message</Text>
      <Text style={[styles.text, styles.error]}>
        배열의 마지막으로 덮어쓰기
      </Text>
      <Text style={[styles.error, styles.text]}>
        배열의 마지막으로 덮어쓰기
      </Text>
      <Text style={[styles.text, isError && styles.error]}>
        isError가 true일때만 적용
      </Text>
      <Text style={[styles.text, !isError && styles.error]}>
        isError가 false일때만 적용
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: '700',
    color: 'green',
  },
  error: {
    color: 'red',
  },
});
