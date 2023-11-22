import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ContactScreen from './screens/ContactScreen';
import FlashScreen from './screens/FlashScreen';
import { Text, View } from 'react-native';
import NaverView from './webapp/NaverView';
import TestView from './webapp/TestView';
import React from 'react';
import DanuView from './webapp/DanuView';
import StepCountScreen from './screens/StepCounterScreen';
import BackgroundFetchScreen from './screens/BackgroundTask';
const Stack = createNativeStackNavigator();

const headerTitle = ({ children }) => (
  <View>
    <Text>{children}</Text>
  </View>
);

const Navigations = () => {
  return (
    <NavigationContainer>
      {/* 내비게이션 설정 */}
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '홈',
            // Header 블록에 대한 스타일
            headerStyle: { backgroundColor: '#29b6f6' },
            //Header의 텍스트, 버튼들 색상
            headerTintColor: '#fff',
            //타이틀 텍스트 스타일
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}
        />
        <Stack.Screen
          name="contact"
          component={ContactScreen}
          options={{
            title: `연락처 목록`,
          }}
        />
        <Stack.Screen
          name="Naver"
          component={NaverView}
          options={{
            title: `네이버 웹뷰`,
          }}
        />
        <Stack.Screen
          name="Danu"
          component={DanuView}
          options={{
            title: `다누시스 홈페이지`,
          }}
        />
        <Stack.Screen
          name="Test"
          component={TestView}
          options={({ route }) => ({
            title: `다누시스 웹앱 테스트`,
            backgroundColor: route.params?.backgroundColor,
          })}
        />
        <Stack.Screen
          name="StepCounter"
          component={StepCountScreen}
          options={{
            title: `만보기 기능`,
          }}
        />
        <Stack.Screen
          name="BackgroundTask"
          component={BackgroundFetchScreen}
          options={{
            title: `백그라운드 테스트 진행`,
          }}
        />
        <Stack.Screen
          name="Flash"
          component={FlashScreen}
          options={{
            title: `카메라 및 플래시`,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

{
  /**
name => 화면의 이름을 설정하는 props,
        다른 화면으로 이동하거나 현재 화면이 어떤 화면인지 조회할 때 쓰임
        
Screen으로 사용된 컴포넌트는 navigation이라는 객체를 props로 이동할 페이지에 던질 수 있음
*/
}

export default Navigations;
