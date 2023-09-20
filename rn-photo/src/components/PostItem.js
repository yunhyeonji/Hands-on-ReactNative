import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import { memo } from 'react';
import ImageSwiper from './ImageSwiper';
import FastImage from './FastImage';
import { GRAY, PRIMARY, WHITE } from '../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useUserState } from '../contexts/UserContext';
import { useActionSheet } from '@expo/react-native-action-sheet';

const ActionSheetOptions = {
  options: ['삭제', '수정', '취소'],
  cancelButtonIndex: 2,
  destructiveButtonIndex: 0,
};
const PostItem = memo(({ post }) => {
  const width = useWindowDimensions().width;
  const [user] = useUserState();

  const { showActionSheetWithOptions } = useActionSheet();
  const onPressActionSheet = (idx) => {
    if (idx === 0) {
      // '삭제'버튼을 클릭했을때 할 내용
    } else if (idx === 1) {
      // '수정'을 클릭했을때 할 내용
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profile}>
          {/* USER */}
          <FastImage
            source={{ uri: post.user.photoURL }}
            style={styles.profilePhoto}
          />
          <Text style={styles.nickname}>
            {post.user.displayName ?? 'nickname'}
          </Text>
        </View>
        {post.user.uid === user.uid && (
          <Pressable
            hitSlop={10}
            onPress={() =>
              showActionSheetWithOptions(ActionSheetOptions, onPressActionSheet)
            }
          >
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={24}
              color={GRAY.DARK}
            />
          </Pressable>
        )}
      </View>

      <View style={{ width, height: width }}>
        {/* PHOTOS */}
        <ImageSwiper photos={post.photos} />
      </View>

      <View style={styles.location}>
        {/* LOCATION */}
        <MaterialCommunityIcons
          name="map-marker"
          size={24}
          color={PRIMARY.DEFAULT}
        />
        <Text>{post.location}</Text>
      </View>

      <Text style={styles.text}>
        {/* TEXT */}
        {post.text}
      </Text>
    </View>
  );
});
PostItem.displayName = 'PostItem';

PostItem.propTypes = {
  post: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: WHITE,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: GRAY.LIGHT,
  },
  nickname: { paddingHorizontal: 10, fontWeight: '600' },
  location: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: { paddingHorizontal: 10 },
});

export default PostItem;
