import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import HeaderRight from '../components/HeaderRight';
import { StyleSheet, Text, View } from 'react-native';

const ImagePickerScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRight onPress={() => {}} />,
    });
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ImagePickerScreen</Text>
    </View>
  );
};

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

export default ImagePickerScreen;
