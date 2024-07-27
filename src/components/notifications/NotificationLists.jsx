'use client';

import { getRTDB } from '@/services/firebase';
import { auth } from '@/utils/db';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import NotificationItems from './NotificationItems';

export default function NotificationLists() {
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const getData = await getRTDB(`${user.uid}/notifications`);

        const datas = [];
        for (let key in getData) {
          datas.push(getData[key]);
        }

        if (datas.length > 1) {
          setNotificationList(
            datas.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          );
        } else {
          setNotificationList(datas);
        }
      }
    });
  }, []);

  return (
    <main className="mt-4 min-h-[75vh]">
      {notificationList.length !== 0 &&
        notificationList.map(({ status, message, timestamp }) => (
          <NotificationItems
            key={timestamp}
            status={status}
            message={message}
            timestamp={timestamp}
          />
        ))}
      {notificationList.length === 0 && (
        <div className="mt-10 p-4 text-center">
          <p className="text-lg font-semibold">
            Belum ada notifikasi yang tersimpan
          </p>
        </div>
      )}
    </main>
  );
}
