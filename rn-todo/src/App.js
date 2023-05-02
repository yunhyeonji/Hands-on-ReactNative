import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import SigninScreen from './screens/SigninScreen';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <SigninScreen />
      {/* <TestAvoid></TestAvoid> */}
    </NavigationContainer>
  );
};

export default App;
