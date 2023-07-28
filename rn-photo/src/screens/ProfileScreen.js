import { View, Text, StyleSheet, Button } from 'react-native';
import { useUserState } from '../contexts/UserContext';
import { WHITE } from '../colors';

const ProfileScreen = () => {
  const [, setUser] = useUserState();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProfileScreen</Text>
      <Button
        title={'SIGNOUT'}
        onPress={() => {
          setUser({});
        }}
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

export default ProfileScreen;
