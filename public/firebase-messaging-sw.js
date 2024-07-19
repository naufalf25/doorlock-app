importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: 'AIzaSyDMenZdbpkPeOpQYkSTMwKcuJnTJgplABE',
  authDomain: 'door-lock-esp32-b79a1.firebaseapp.com',
  databaseURL:
    'https://door-lock-esp32-b79a1-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'door-lock-esp32-b79a1',
  storageBucket: 'door-lock-esp32-b79a1.appspot.com',
  messagingSenderId: '69785333048',
  appId: '1:69785333048:web:2c6cfe5b8ec0615d9225cd',
  measurementId: 'G-W2QMG046BB',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
