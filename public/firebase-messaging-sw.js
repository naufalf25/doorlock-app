importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js'
);

self.addEventListener('fetch', () => {
  try {
    const urlParams = new URLSearchParams(location.search);
    self.firebaseConfig = Object.fromEntries(urlParams);
  } catch (error) {
    console.error('Failed to add event listener, ', error);
  }
});

const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};
firebase.initializeApp(self.firebaseConfig || defaultConfig);

let messaging;
try {
  messaging = firebase.messaging.isSupported() ? firebase.messaging() : null;
} catch (error) {
  console.error('Failed to initialize Firebase Messaging, ', error);
}

if (messaging) {
  try {
    messaging.onBackgroundMessage((payload) => {
      console.log('Received background message: ', payload);
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        tag: notificationTitle,
        icon: payload.notification?.image || data.image,
        data: {
          url: payload?.data?.openUrl,
        },
      };

      if (payload?.collapseKey && notification?.image) {
        self.registration.showNotification(
          notificationTitle,
          notificationOptions
        );
      } else {
        return new Promise(function (resolve, reject) {});
      }
    });
  } catch (error) {
    console.error(error);
  }
}

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const urlToOpen = event?.notification?.data?.url || 'https://www.google.com'; // Diupdate setelah masuk hosting
  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
      })
      .then((windowClients) => {
        for (const client of windowClients) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }

        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});
