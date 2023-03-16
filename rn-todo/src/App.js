import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { WHITE } from './Color';
import SigninScreen from './screens/SigninScreen';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SigninScreen />
      {/* <TestAvoid></TestAvoid> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});

export default App;
