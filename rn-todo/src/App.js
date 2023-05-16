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
        {/* 로그인이 되어있으면 Main, 로그인이 필요한 상황이라면 Auth 스택이용 */}
        {user ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;
