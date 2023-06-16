import { StyleSheet, Text, View } from 'react-native';

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignUpScreen</Text>
    </View>
  );
};

SignUpScreen.propType = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
  },
});
export default SignUpScreen;
