import { View, Text, StyleSheet, Button } from 'react-native';
import { useUserState } from '../contexts/UserContext';
import { WHITE } from '../colors';
import { signOut } from '../api/auth';

const ProfileScreen = () => {
  const [user, setUser] = useUserState();
  console.log(user.uid, user.email, user.displayName, user.photoURL);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProfileScreen</Text>
      <Button
        title={'SIGNOUT'}
        onPress={async () => {
          await signOut();
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
