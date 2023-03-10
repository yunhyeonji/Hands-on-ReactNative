import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  ImageBackground,
} from 'react-native';
import Button, { ButtonTypes } from './components/Button';

const image = {
  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcZLfFJF3YVtIUzGKSXbsy6zQuwf7fGUnuGg&usqp=CAU',
  // uri: '../src/img/helloKitty.png',
};

const Operators = {
  CLEAR: 'C',
  MINUS: '-',
  PLUS: '+',
  EQUAL: '=',
};

export default function App() {
  const [result, setResult] = useState(0);
  const [formula, setFormula] = useState([]);
  // [12,+,1,=]

  const width = (useWindowDimensions().width - 50) / 4;

  const calculate = () => {
    let calculatedNumber = 0;
    let operator = '';

    formula.forEach((value) => {
      if ([Operators.PLUS, Operators.MINUS].includes(value)) {
        operator = value;
      } else {
        if (operator === Operators.PLUS) {
          // [23,'+',3]
          calculatedNumber += value;
        } else if (operator === Operators.MINUS) {
          // [23,'-',3]
          calculatedNumber -= value;
        } else {
          // [23...]
          calculatedNumber = value;
        }
      }
    });

    setResult(calculatedNumber);
    setFormula([]);
  };

  const onPressNumber = (num) => {
    // const last = formula.at(-1);
    const last = formula[formula.length - 1];

    if (isNaN(last)) {
      setResult(num);
      setFormula((prev) => [...prev, num]);
    } else {
      const newNumber = (last ?? 0) * 10 + num;
      setResult(newNumber);
      setFormula((prev) => {
        prev.pop();
        return [...prev, newNumber];
      });
    }
  };

  const onPressOperator = (operator) => {
    switch (operator) {
      case Operators.CLEAR:
        setResult(0);
        setFormula([]);
        break;
      case Operators.EQUAL:
        calculate();
        break;
      default: {
        // const last = formula.at(-1);
        const last = formula[formula.length - 1];
        if ([Operators.PLUS, Operators.MINUS].includes(last)) {
          setFormula((prev) => {
            prev.pop();
            return [...prev, operator];
          });
        } else {
          setFormula((prev) => [...prev, operator]);
        }
        break;
      }
    }
  };

  return (
    <View style={styles.pull}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <ImageBackground style={styles.image} source={image}></ImageBackground>
        <View style={styles.resultContainer}>
          {/* 결과 */}
          <Text style={styles.result}>{result.toLocaleString()}</Text>
        </View>

        <View style={styles.buttonContainer}>
          {/* 버튼 */}
          <View style={styles.leftPad}>
            {/* 숫자 버튼 */}
            <View style={styles.number}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <Button
                  key={num}
                  title={num.toString()}
                  onPress={() => onPressNumber(num)}
                  buttonStyle={{ width, height: width, margin: 4 }}
                ></Button>
              ))}
            </View>

            {/* 0과 = 버튼 */}
            <View style={styles.bottom}>
              <Button
                title="0"
                onPress={() => onPressNumber(0)}
                buttonStyle={{
                  width: width * 2,
                  height: width,
                  margin: 4,
                }}
              ></Button>
              <Button
                title={Operators.EQUAL}
                onPress={() => onPressOperator(Operators.EQUAL)}
                buttonStyle={{ width, height: width, margin: 4 }}
                buttonType={ButtonTypes.OPERATOR}
              ></Button>
            </View>
          </View>

          {/* 수식 버튼 */}
          <View style={styles.operator}>
            <Button
              title={Operators.CLEAR}
              onPress={() => onPressOperator(Operators.CLEAR)}
              buttonStyle={{ width, height: width, margin: 4 }}
              buttonType={ButtonTypes.OPERATOR}
            ></Button>
            <Button
              title={Operators.MINUS}
              onPress={() => onPressOperator(Operators.MINUS)}
              buttonStyle={{ width, height: width, margin: 4 }}
              buttonType={ButtonTypes.OPERATOR}
            ></Button>
            <Button
              title={Operators.PLUS}
              onPress={() => onPressOperator(Operators.PLUS)}
              buttonStyle={{ width, height: width * 2, margin: 4 }}
              buttonType={ButtonTypes.OPERATOR}
            ></Button>
          </View>
        </View>

        {/* <View style={{ flex: 2, backgroundColor: 'gray' }}>
        <Text>flex는 비율을 의미 합니다 1:2비율</Text>
      </View>  */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#ffffff',
    flex: 1,
    width: '70%',
  },
  pull: {
    flex: 1,
    backgroundColor: '#f6d0d6',
  },
  container: {
    marginTop: '10%',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    ImageBackground: '',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  resultContainer: {
    flex: 1,
    backgroundColor: '#f6d0d6',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#f6d0d6',
    // backgroundColor: '#000000',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  result: {
    color: '#ffffff',
    fontSize: 60,
    fontWeight: '700',
    padding: 30,
  },
  leftPad: {
    width: '75%',
  },
  number: {
    flexDirection: 'row',
    flexWrap: 'wrap-reverse',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  operator: {},
});
