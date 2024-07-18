import Layout from '@/components/Layout';
import NotificationLists from '@/components/notifications/NotificationLists';

export default function Notifications() {
  return (
    <Layout title="halaman notifikasi" uid="0123456789" path="/notifications">
      <NotificationLists />
    </Layout>
  );
}
