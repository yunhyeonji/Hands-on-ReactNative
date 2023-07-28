import { View, Text, StyleSheet, Button } from 'react-native';
import { WHITE } from '../colors';
import { useNavigation } from '@react-navigation/native';
import { MainRoutes } from '../navigations/routes';

const SelectPhotosScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SelectPhotosScreen</Text>

      <Button
        title="tab"
        onPress={() => navigation.navigate(MainRoutes.CONTNET_TAB)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  title: {
    fontSize: 30,
  },
});

export default SelectPhotosScreen;
