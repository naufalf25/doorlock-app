import { database } from '@/utils/db';
import { child, get, ref } from 'firebase/database';

const getRTDB = async (path) => {
  const dbRef = ref(database);

  try {
    const getData = await get(child(dbRef, path));
    const data = getData.val();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getRTDB };
