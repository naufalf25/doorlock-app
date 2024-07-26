'use client';

import { useEffect, useState } from 'react';
import TakePhoto from './TakePhoto';
import { getRTDB } from '@/services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, database } from '@/utils/db';
import { ref, update } from 'firebase/database';

export default function Root() {
  const [imageData, setImageData] = useState(null);
  const [lock, setLock] = useState(true);
  const [openLock, setOpenLock] = useState(false);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);

        const getImage = await getRTDB(`${user.uid}/latestImage`);
        setImageData(getImage);

        const getLockCondition = await getRTDB(`${user.uid}/door/doorLock`);
        setLock(getLockCondition === 1 ? true : false);

        const getLockIndicator = await getRTDB(`${user.uid}/door/openLock`);
        setOpenLock(getLockIndicator === 1 ? true : false);
      }
    });
  });

  async function getImageEvent(e) {
    e.preventDefault();

    const updates = {};
    if (uid) {
      updates[`${uid}/door/takeImage`] = 1;
    }

    await update(ref(database), updates);
  }

  async function openCloseLock(e) {
    e.preventDefault();

    const updates = {};
    if (uid) {
      if (openLock === true) {
        updates[`${uid}/door/openLock`] = 0;

        setOpenLock(false);
      } else {
        updates[`${uid}/door/openLock`] = 1;

        setOpenLock(true);
      }
    }

    await update(ref(database), updates);
  }

  return (
    <>
      <main className="min-h-[75vh]">
        <TakePhoto
          image={imageData}
          lock={lock}
          openLock={openLock}
          takePhotoEvent={getImageEvent}
          openLockEvent={openCloseLock}
          className="mt-6"
        />
      </main>
    </>
  );
}
