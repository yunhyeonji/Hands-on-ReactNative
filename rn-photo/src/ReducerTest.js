import { useReducer, useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';

/*
const [state, dispatch] = useReducer(reducer, initState);
state : 상태변수
dispatch : reducer로 action을 전달하는 함수
action : 현재상태를 어떻게 변경해야하는지에 대한 행동 지침
*/

const init = 0;

const CountType = {
  INCREMENT: 'iNCREMENT',
  DECREMENT: 'DECREMENT',
};

const reducer = (state, action) => {
  switch (action) {
    case CountType.INCREMENT:
      return state + 1;
    case CountType.DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

const ReducerTest = () => {
  // const [result, setResult] = useState(0);
  const [result, dispatch] = useReducer(reducer, init);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{result}</Text>

      {/* <Button title={'+'} onPress={() => setResult((prev) => prev + 1)} /> */}
      {/* <Button title={'-'} onPress={() => setResult((prev) => prev - 1)} /> */}
      <Button title={'+'} onPress={() => dispatch(CountType.INCREMENT)} />
      <Button title={'-'} onPress={() => dispatch(CountType.DECREMENT)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
  },
});

export default ReducerTest;
