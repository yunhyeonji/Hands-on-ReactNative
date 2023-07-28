import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ContentRoutes } from './routes';
import HomeScreen from '../screens/HomeScreen';
import ListScreen from '../screens/ListScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const ContentTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={ContentRoutes.HOME} component={HomeScreen} />
      <Tab.Screen name={ContentRoutes.LIST} component={ListScreen} />
      <Tab.Screen name={ContentRoutes.MAP} component={MapScreen} />
      <Tab.Screen name={ContentRoutes.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default ContentTab;
