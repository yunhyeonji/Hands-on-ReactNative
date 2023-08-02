import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Pressable, TextInput } from 'react-native';
import { useUserState } from '../contexts/UserContext';
import FastImage from '../components/FastImage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GRAY, WHITE } from '../colors';
import HeaderRight from '../components/HeaderRight';
import { useLayoutEffect } from 'react';

const UpdateProfileScreen = () => {
  const navigation = useNavigation();
  const [user] = useUserState();

  useLayoutEffect(() => {
    // useEffect와 사용하는 방법, 이유는 동일하지만 컴포넌트를 화면에 보여주기 전에 작업을 동기적으로 실행하는 특징이 있음.
    // 복잡하고 오래걸리는 작업인 경우 화면이 나타나기까지 오랜 시간이 걸린다는 단점이 있음
    navigation.setOptions({
      headerRight: () => <HeaderRight onPress={() => console.log('right')} />,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View>
        <FastImage source={{ uri: user.photoURL }} style={styles.photo} />
        <Pressable onPress={() => {}} style={styles.imageButton}>
          <MaterialCommunityIcons name="image" size={20} color={WHITE} />
        </Pressable>
      </View>
      <View>
        <TextInput
          value={user.displayName}
          style={styles.input}
          placeholder="Nickname"
          textAlign="center"
          maxLength={10}
          returnKeyType="done"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="none"
        ></TextInput>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: GRAY.LIGHT,
  },
  imageButton: {
    position: 'absolute',
    bottom: 0,
    right: 20,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GRAY.DARK,
  },
  input: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 8,
    width: 200,
    fontSize: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: GRAY.LIGHT,
  },
});

export default UpdateProfileScreen;
