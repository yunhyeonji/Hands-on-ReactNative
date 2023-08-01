import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useUserState } from '../contexts/UserContext';
import { GRAY, WHITE } from '../colors';
import { signOut } from '../api/auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FastImage from '../components/FastImage';
import DangerAlert, { AlertTypes } from '../components/DangerAlert';
import { useState } from 'react';

const ProfileScreen = () => {
  const [user, setUser] = useUserState();
  const { top } = useSafeAreaInsets();

  const [visible, setVisible] = useState(false);

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <DangerAlert
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={async () => {
          signOut();
          setUser({});
        }}
        alertType={AlertTypes.SIGNOUT}
      />
      <View style={styles.settingButton}>
        <Pressable
          onPress={() => {
            setVisible(true);
          }}
          hitSlop={10}
        >
          <MaterialCommunityIcons
            name="logout-variant"
            size={24}
            color={GRAY.DEFAULT}
          />
        </Pressable>
      </View>

      <View style={styles.profile}>
        <View
          style={[
            styles.photo,
            user.photoURL || { backgroundColor: GRAY.DEFAULT },
          ]}
        >
          <FastImage source={{ uri: user.photoURL }} style={styles.photo} />
          <Pressable style={styles.editButton} onPress={() => {}}>
            <MaterialCommunityIcons name="pencil" size={20} color={WHITE} />
          </Pressable>
        </View>

        <Text style={styles.nickname}>{user.displayName || 'nickname'}</Text>
      </View>

      <View style={styles.listContainer}>{/* 내가 쓴 글 목록만 렌더링 */}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  settingButton: {
    paddingHorizontal: 20,
    alignItems: 'flex-end',
  },
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: GRAY.DEFAULT,
    paddingVertical: 10,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: GRAY.DARK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nickname: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 10,
  },
  listContainer: {
    flex: 1,
  },
});

export default ProfileScreen;
