import { View, StyleSheet } from 'react-native';
import { WHITE } from '../colors';
import { useEffect } from 'react';
import { getPosts } from '../api/post';
import PostItem from '../components/PostItem';

const post = {
  createdTs: 1693392074069,
  id: 'nCMJFusVdqhynzGguVro',
  location: '대한민국 경기도 광명시',
  photos: [
    'https://firebasestorage.googleapis.com/v0/b/rn-photo-76754.appspot.com/o/zwQ57ZYjnfOeH7OxTFlOyCeRzs53%2Fs-31.jpeg.jpg?alt=media&token=5cbc7ac2-55a6-4bee-adde-29f70b1ed640',
    'https://firebasestorage.googleapis.com/v0/b/rn-photo-76754.appspot.com/o/zwQ57ZYjnfOeH7OxTFlOyCeRzs53%2Fs-34.jpeg.jpg?alt=media&token=d14b0c2f-84ed-4636-aff0-9a38336906e3',
    'https://firebasestorage.googleapis.com/v0/b/rn-photo-76754.appspot.com/o/zwQ57ZYjnfOeH7OxTFlOyCeRzs53%2Fs-37.jpeg.jpg?alt=media&token=db7f0c89-0093-4654-ac22-28014e705612',
  ],
  text: 'test7',
  user: {
    displayName: '닉네임',
    photoURL:
      'https://firebasestorage.googleapis.com/v0/b/rn-photo-76754.appspot.com/o/zwQ57ZYjnfOeH7OxTFlOyCeRzs53%2Fs-41.jpeg.jpg?alt=media&token=d0fe15c8-297c-4b94-92a7-07bf66223834',
    uid: 'zwQ57ZYjnfOeH7OxTFlOyCeRzs53',
  },
};

const ListScreen = () => {
  useEffect(() => {
    (async () => {
      const list = await getPosts();
      console.log(list);
    })();
  }, []);
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>ListScreen</Text> */}
      <PostItem post={post}></PostItem>
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
