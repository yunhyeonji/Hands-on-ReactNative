import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import { useUserState } from '../contexts/UserContext';
import MainStack from './MainStack';

const Navigation = () => {
  const [user] = useUserState();

  return (
    <NavigationContainer>
      {user.uid ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
