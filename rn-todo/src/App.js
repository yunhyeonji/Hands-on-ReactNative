import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import SigninScreen from './screens/SigninScreen';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SigninScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
