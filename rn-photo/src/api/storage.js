import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

export const uploadPhoto = async (uri) => {
  if (uri.startsWith('https')) {
    return uri;
  }

  const blob = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      // eslint-disable-next-line no-console
      console.log('blob error : ', e);
      reject(new Error('사진 업로드에 실패하였습니다.'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const filename = uri.split('/').pop();
  const storageRef = ref(
    getStorage(),
    `/${getAuth().currentUser.uid}/${filename}`
  );
  await uploadBytes(storageRef, blob);

  blob.close();
  return await getDownloadURL(storageRef);
};
