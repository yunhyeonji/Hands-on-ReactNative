import { useUserContext } from '../contexts/UserContext';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { NavigationContainer } from '@react-navigation/native';

const Navigation = () => {
  const { user } = useUserContext();
  return (
    <NavigationContainer>
      {/* 로그인이 되어있으면 Main, 로그인이 필요한 상황이라면 Auth 스택이용 */}
      {user ? <MainStack /> : <AuthStack />}
      {/* {user ?<AuthStack /> : <MainStack /> } */}
    </NavigationContainer>
  );
};

export default Navigation;
