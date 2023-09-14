import { useEffect, useRef, useState } from 'react';
import { getPosts } from '../api/post';

const usePosts = () => {
  const [data, setData] = useState([]);
  const [refetching, setRefetching] = useState(false);

  const lastRef = useRef(null);
  const isLoadingRef = useRef(false);

  const fetchNextPage = async () => {
    if (!isLoadingRef.currnet) {
      isLoadingRef.currnet = true;
      const { list, last } = await getPosts({ after: lastRef.current });
      setData((prev) => (lastRef.current ? [...prev, ...list] : list));
      lastRef.current = last;
      isLoadingRef.currnet = false;
    }
  };

  const refetch = async () => {
    setRefetching(true);
    lastRef.currnet = null;
    await fetchNextPage();
    setRefetching(false);
  };

  useEffect(() => {
    fetchNextPage();
  }, []);

  return { data, fetchNextPage, refetch, refetching };
};

export default usePosts;
