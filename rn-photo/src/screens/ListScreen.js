import { View, Text, StyleSheet } from 'react-native';
import { WHITE } from '../colors';

const ListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ListScreen</Text>
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

export default ListScreen;
