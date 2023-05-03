import { Button, StyleSheet, Text, View } from 'react-native';

const ListScreen = ({ navigation, route }) => {
  return (
    <View style={Styles.container}>
      <Text style={{ fontSize: 30 }}>ListScreen</Text>

      <Button
        title="push"
        onPress={() => navigation.push('List', { ts: Date.now() })}
      />
      {/* push => 누를때마다 스택에 화면을 쌓음, navigate => 같은 화면이면 스택에 추가하지 않음 */}
      <Button
        title="navigate"
        onPress={() => navigation.navigate('List', { ts: Date.now() })}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListScreen;
