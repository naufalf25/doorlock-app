import Layout from '@/components/Layout';
import PhotoLists from '@/components/photos/PhotoLists';

export default function Photos() {
  return (
    <Layout title="halaman riwayat foto" path="/photos">
      <PhotoLists />
    </Layout>
  );
}
