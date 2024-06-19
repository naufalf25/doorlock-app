import Layout from '@/components/Layout';
import TakePhoto from '@/components/root/TakePhoto';

export default function Home() {
  return (
    <Layout title="halaman dashboard" uid="0123456789" path="/">
      <main>
        <TakePhoto className="mt-6" />
      </main>
    </Layout>
  );
}
