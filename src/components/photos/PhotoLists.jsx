'use client';

import { useEffect, useState } from 'react';
import { getRTDB } from '@/services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/utils/db';
import PhotoItem from './PhotoItem';

export default function PhotoLists() {
  const [imageLists, setImageLists] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const getData = await getRTDB(`${user.uid}/data`);
        const datas = [];
        for (let key in getData) {
          datas.push(getData[key]);
        }

        setImageLists(
          datas.sort(
            (a, b) =>
              new Date(b.timestamp * 1000) - new Date(a.timestamp * 1000)
          )
        );
      }
    });
  }, []);

  return (
    <main className="min-h-[75vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {imageLists &&
        imageLists.map((imageData) => (
          <PhotoItem key={imageData.timestamp} data={imageData} />
        ))}
      {!imageLists && (
        <div className="mt-10 p-4 text-center">
          <p className="text-lg font-semibold">Belum ada foto yang tersimpan</p>
        </div>
      )}
    </main>
  );
}
