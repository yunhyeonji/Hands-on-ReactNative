import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import AuthStack from './navigations/AuthStack';
import MainStack from './navigations/MainStack';
import UserContext from './contexts/UserContext';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ setUser }}>
      <NavigationContainer>
        <StatusBar style="dark" />
        {user ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;
