import { getAuth } from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from 'firebase/firestore';

export const createPost = async ({ photos, location, text }) => {
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
};

export const getPosts = async () => {
  const collectionRef = collection(getFirestore(), 'posts');
  const options = query(collectionRef);
  const documentSnapshot = await getDocs(options);
  const documents = documentSnapshot.docs.map((doc) => doc.data());

  return documents;
};
