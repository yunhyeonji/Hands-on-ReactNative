import { getAuth } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  where,
} from 'firebase/firestore';

// 글 작성, 업로드
export const createPost = async ({ photos, location, text }) => {
  try {
    const { uid, displayName, photoURL } = getAuth().currentUser;
    const collectionRef = collection(getFirestore(), 'posts');
    const documentRef = doc(collectionRef);
    const id = documentRef.id;
    await setDoc(documentRef, {
      id,
      photos,
      location,
      text,
      user: { uid, displayName, photoURL },
      createdTs: Date.now(),
    });
  } catch (e) {
    throw new Error('글 작성 실패');
  }
};

// 자신이 쓴 글 목록 가져오기 -> 쿼리 작성
const getOption = ({ after, isMine }) => {
  const collectionRef = collection(getFirestore(), 'posts');
  const uid = getAuth().currentUser.uid;

  if (isMine) {
    return after
      ? query(
          collectionRef,
          where('user.uid', '==', uid),
          orderBy('createdTs', 'desc'),
          startAfter(after),
          limit(10)
        )
      : query(
          collectionRef,
          where('user.uid', '==', uid),
          orderBy('createdTs', 'desc'),
          limit(10)
        );
  } else {
    return after
      ? query(
          collectionRef,
          orderBy('createdTs', 'desc'),
          startAfter(after),
          limit(10)
        )
      : query(collectionRef, orderBy('createdTs', 'desc'), limit(10));
  }
};

// 자신이 쓴 글 목록 가져오기
export const getPosts = async ({ after, isMine }) => {
  const options = getOption({ after, isMine });
  const documentSnapshot = await getDocs(options);
  const list = documentSnapshot.docs.map((doc) => doc.data());
  const last = documentSnapshot.docs[documentSnapshot.docs.length - 1];

  return { list, last };
};

// 글 삭제
export const deletePost = async (id) => {
  await deleteDoc(doc(getFirestore(), `posts/${id}`));
};

// 글 수정
export const updatePost = async (post) => {
  try {
    await setDoc(doc(getFirestore(), `posts/${post.id}`), post);
  } catch (e) {
    throw new Error('글 수정 실패');
  }
};

// 위치로 글 목록 받아오기
export const getPostsByLocation = async ({ after, location }) => {
  const collectionRef = collection(getFirestore(), 'posts');

  const option = after
    ? query(
        collectionRef,
        where('location', '==', location),
        orderBy('createdTs', 'desc'),
        startAfter(after),
        limit(10)
      )
    : query(
        collectionRef,
        where('location', '==', location),
        orderBy('createdTs', 'desc'),
        limit(10)
      );

  const documentSnapshot = await getDocs(option);
  const list = documentSnapshot.docs.map((doc) => doc.data());
  const last = documentSnapshot.docs[documentSnapshot.docs.length - 1];

  return { list, last };
};
