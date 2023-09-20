import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import PropTypes from 'prop-types';
import { memo } from 'react';
import ImageSwiper from './ImageSwiper';
import FastImage from './FastImage';
import { GRAY, PRIMARY, WHITE } from '../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PostItem = memo(({ post }) => {
  const width = useWindowDimensions().width;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* USER */}
        <FastImage
          source={{ uri: post.user.photoURL }}
          style={styles.profilePhoto}
        />
        <Text style={styles.nickname}>
          {post.user.displayName ?? 'nickname'}
        </Text>
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
    paddingHorizontal: 10,
    paddingBottom: 10,
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