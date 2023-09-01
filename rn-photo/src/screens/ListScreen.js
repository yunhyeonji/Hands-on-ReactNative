import { View, StyleSheet } from 'react-native';
import { WHITE } from '../colors';
import { useEffect, useRef, useState } from 'react';
import { getPosts } from '../api/post';
import PostList from '../components/PostList';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ListScreen = () => {
  const { top } = useSafeAreaInsets();

  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const lastRef = useRef(null);
  const isLoadingRef = useRef(false);

  const getList = async () => {
    if (!isLoadingRef.currnet) {
      isLoadingRef.currnet = true;
      const { list, last } = await getPosts({ after: lastRef.current });
      setData((prev) => (lastRef.current ? [...prev, ...list] : list));
      lastRef.current = last;
      isLoadingRef.currnet = false;
    }
  };

  const refetch = async () => {
    setRefreshing(true);
    lastRef.currnet = null;
    await getList();
    setRefreshing(false);
  };

  useEffect(() => {
    getList();
  }, []);
  console.log(data.length);

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <PostList
        data={data}
        fetchNextPage={getList}
        refreshing={refreshing}
        refetch={refetch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});

export default ListScreen;
