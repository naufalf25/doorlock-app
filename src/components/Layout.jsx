'use client';

// import { useAuthContext } from './AuthContext';
import { useEffect, useState } from 'react';
import Nav from './Nav';
import Navbar from './Navbar';
import Loading from './Loading';
import { onAuthStateChanged } from 'firebase/auth';
import { app, auth } from '@/utils/db';
import { useRouter } from 'next/navigation';
import useFcmToken from '@/utils/hooks/useFcmToken';
import { getMessaging, onMessage } from 'firebase/messaging';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

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

export default function Layout({ children, title, path }) {
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState('');
  const router = useRouter();

  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  fcmToken && console.log('FCM token: ', fcmToken);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/user/login');
      } else {
        setLoading(false);

        setUid(user.uid);

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
  }, [router]);

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
