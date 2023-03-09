import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button, { ButtonTypes } from './components/Button';

export default function App() {
  const [result, setResult] = useState(0);
  console.log('rendering : ', result);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 60 }}>{result}</Text>
      <Button
        title="+"
        onPress={() => {
          setResult((prev) => {
            console.log('1 prev : ', prev);
            return prev + 1;
          });

          console.log('2 setResult : ', result);
          setResult((prev) => {
            console.log('2 prev : ', prev);
            return prev + 1;
          });
        }}
        buttonStyle={{ width: 100, height: 100, marginBottom: 10 }}
        buttonType={ButtonTypes.OPERATOR}
      ></Button>
      <Button
        title="-"
        onPress={() => {
          setResult(result - 1);
          console.log(result);
        }}
        buttonStyle={{ width: 100, height: 100 }}
        buttonType={ButtonTypes.OPERATOR}
      ></Button>
      <Button
        title="1"
        onPress={() => {}}
        buttonStyle={{ width: 100, height: 100 }}
        buttonType={ButtonTypes.NUMBER}
      ></Button>
      <Button
        title="0"
        onPress={() => {}}
        buttonStyle={{ width: 200, height: 100 }}
      ></Button>
      <Button
        title="="
        onPress={() => {}}
        buttonStyle={{ width: 100, height: 100 }}
        buttonType={ButtonTypes.OPERATOR}
      ></Button>
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
