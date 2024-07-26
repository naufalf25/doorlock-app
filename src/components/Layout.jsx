'use client';

import { useEffect, useState } from 'react';
import Nav from './Nav';
import Navbar from './Navbar';
import Loading from './Loading';
import { onAuthStateChanged } from 'firebase/auth';
import { app, auth, database } from '@/utils/db';
import { useRouter } from 'next/navigation';
import useFcmToken from '@/utils/hooks/useFcmToken';
import { getMessaging, onMessage } from 'firebase/messaging';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// import { ref, update } from 'firebase/database';
// import { getRTDB } from '@/services/firebase';

const MySwal = withReactContent(Swal);

const Toast = MySwal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', MySwal.stopTimer);
    toast.addEventListener('mouseleave', MySwal.resumeTimer);
  },
});

// async function callNotification(fcmToken, accessToken, title, body) {
//   const res = await fetch(
//     `https://fcm.googleapis.com/v1/projects/${process.env.NEXT_PUBLIC_PROJECT_ID}/messages:send`,
//     {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         message: {
//           token: fcmToken,
//           notification: {
//             body,
//             title,
//           },
//         },
//       }),
//     }
//   );

//   return res.json();
// }

export default function Layout({ children, title, path }) {
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState('');
  const router = useRouter();

  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  fcmToken && console.log('FCM token: ', fcmToken);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/user/login');
      } else {
        setLoading(false);
        setUid(user.uid);

        // const getAccessToken = await fetch(
        //   `${process.env.NEXT_PUBLIC_URL}/api/generate/token`
        // );

        // const { display, title, body } = await getRTDB(
        //   `${user.uid}/currentNotif`
        // );

        // if (fcmToken) {
        //   const updates = {};
        //   updates[`${user.uid}/fcmToken`] = fcmToken;

        //   await update(ref(database), updates);
        // }

        // if (display && fcmToken) {
        //   const updates = {};
        //   updates[`${user.uid}/currentNotif/display`] = false;
        //   await update(ref(database), updates);

        //   const { accessToken } = await getAccessToken.json();

        //   if (accessToken) {
        //     const callNotif = await callNotification(
        //       fcmToken,
        //       accessToken,
        //       title,
        //       body
        //     );
        //     console.log(callNotif);
        //   }
        // }

        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
          const messaging = getMessaging(app);

          const unsubsribe = onMessage(messaging, (payload) => {
            console.log('Foreground push notification received: ', payload);

            const notificationTitle = payload.notification.title;
            const notificationMessage = payload.notification.body;

            if (notificationTitle === 'Info') {
              Toast.fire({
                icon: 'info',
                title: notificationMessage,
              });
            } else {
              Toast.fire({
                icon: 'warning',
                title: notificationMessage,
              });
            }
          });
          return () => {
            unsubsribe();
          };
        }
      }
    });
  });

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <Navbar title={title} uid={uid} />
        {children}
        <Nav path={path} />
      </>
    );
  }
}
