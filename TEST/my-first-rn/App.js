// import React from 'react';
// react 17부터는 import를 하지않고도 react를 사용할 수 있음 -> ESLint설정 파일에서 오류를 나타내지 않도록 변경하시오
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  console.log('console Test ~ing');
  const name = 'HyeonJi';
  const add = (a, b) => a + b;
  const isFullname = true;

  return (
    <>
      {/* 주석자리 -> 주석도 전체를 감싸는 태그 안에 있어야 함 */}
      <View
        style={styles.container}
        // 아니면 태그 안에, 한 라인을 주석처리 할 수도 있음
      >
        <Text>여기는 텍스트 변경하는 부분입니다.</Text>
        <Text>My name is {name}</Text>
        <Text>1 + 2 = {add(1, 2)}</Text>
        <Text>{isFullname ? name + 'Yun' : name}</Text>

        <StatusBar style="auto" />
      </View>
      <Text>여기는 부모태그안에 있지 않은 Text입니다.</Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
