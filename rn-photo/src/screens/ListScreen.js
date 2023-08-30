import { View, Text, StyleSheet } from 'react-native';
import { WHITE } from '../colors';
import { useEffect } from 'react';
import { getPosts } from '../api/post';

const ListScreen = () => {
  useEffect(() => {
    (async () => {
      const list = await getPosts();
      console.log(list);
    })();
  }, []);
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
