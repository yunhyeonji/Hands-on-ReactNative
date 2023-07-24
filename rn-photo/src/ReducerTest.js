import { useReducer, useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';

/*
const [state, dispatch] = useReducer(reducer, initState);
state : 상태변수
dispatch : reducer로 action을 전달하는 함수
action : 현재상태를 어떻게 변경해야하는지에 대한 행동 지침
*/

// const init = 0;
const init = { count: 0 };

const CountType = {
  INCREMENT: 'iNCREMENT',
  DECREMENT: 'DECREMENT',
};

const reducer = (state, action) => {
  switch (action.key) {
    case CountType.INCREMENT:
      // 리렌더링이 안됨
      state.count = state.count + 1;
      return state;
    case CountType.DECREMENT:
      // 리렌더링이 됨
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const ReducerTest = () => {
  // const [result, setResult] = useState(0);
  const [result, dispatch] = useReducer(reducer, init);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{result.count}</Text>

      {/* <Button title={'+'} onPress={() => setResult((prev) => prev + 1)} /> */}
      {/* <Button title={'-'} onPress={() => setResult((prev) => prev - 1)} /> */}
      <Button
        title={'+'}
        onPress={() => dispatch({ key: CountType.INCREMENT, value: 2 })}
      />
      <Button
        title={'-'}
        onPress={() => dispatch({ key: CountType.DECREMENT, value: 1 })}
      />
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
