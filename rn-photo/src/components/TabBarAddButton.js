import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MainRoutes } from '../navigations/routes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PRIMARY } from '../colors';

const TabBarAddButton = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate(MainRoutes.SELECT_PHOTOS)}
      >
        <MaterialCommunityIcons name="plus" size={25} color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: PRIMARY.DEFAULT,
    borderRadius: 999,
    padding: 4,
  },
  title: {
    fontSize: 30,
  },
});

export default TabBarAddButton;
