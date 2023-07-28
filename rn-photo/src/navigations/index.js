import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useUserState } from '../contexts/UserContext';
import AuthStack from './AuthStack';
import { Asset } from 'expo-asset';
import { initFirebase } from '../api/firebase';
import * as SplashScreen from 'expo-splash-screen';
import { onAuthStateChanged } from '../api/auth';
import MainStack from './MainStack';

const ImageAssets = [
  require('../../assets/cover.png'),
  require('../../assets/home-clock.png'),
  require('../../assets/home-map.png'),
  require('../../assets/icon.png'),
];

const Navigation = () => {
  const [user, setUser] = useUserState();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // 이미지 캐싱하기
        await SplashScreen.preventAutoHideAsync();
        await Promise.all(
          ImageAssets.map((image) => Asset.fromModule(image).downloadAsync())
        );

        initFirebase();

        const unsubscribe = onAuthStateChanged((user) => {
          if (user) {
            setUser(user);
          }
          setIsReady(true);
          unsubscribe();
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        setIsReady(true);
      }
    })();
  }, [setUser]);

  const onReady = async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  };

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer onReady={onReady}>
      {user.uid ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
