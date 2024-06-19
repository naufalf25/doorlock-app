import Layout from '@/components/Layout';

export default function Notifications() {
  return (
    <Layout title="halaman notifikasi" uid="0123456789" path="/notifications">
      <main className="mt-4 min-h-[75vh]">
        <div className="mx-4 py-2 border-b border-dashed border-b-blue-950">
          <div className="w-full min-h-20 flex border rounded-lg">
            <div className="w-[10%] bg-green-500 rounded-l-lg"></div>
            <div className="w-[90%] px-4 py-2">
              <p className="text-sm">99 Desember 9999, Pukul 99:99</p>
              <p className="mt-1 text-lg">Pintu Terkunci</p>
            </div>
          </div>
        </div>
        <div className="mx-4 py-2 border-b border-dashed border-b-blue-950">
          <div className="w-full min-h-20 flex border rounded-lg">
            <div className="w-[10%] bg-green-500 rounded-l-lg"></div>
            <div className="w-[90%] px-4 py-2">
              <p className="text-sm">99 Desember 9999, Pukul 99:99</p>
              <p className="mt-1 text-lg">Pintu Terbuka</p>
            </div>
          </div>
        </div>
        <div className="mx-4 py-2 border-b border-dashed border-b-blue-950">
          <div className="w-full min-h-20 flex border rounded-lg">
            <div className="w-[10%] bg-red-500 rounded-l-lg"></div>
            <div className="w-[90%] px-4 py-2">
              <p className="text-sm">99 Desember 9999, Pukul 99:99</p>
              <p className="mt-1 text-lg">Kata Sandi Salah</p>
            </div>
          </div>
        </div>
        <div className="mx-4 py-2 border-b border-dashed border-b-blue-950">
          <div className="w-full min-h-20 flex border rounded-lg">
            <div className="w-[10%] bg-red-500 rounded-l-lg"></div>
            <div className="w-[90%] px-4 py-2">
              <p className="text-sm">99 Desember 9999, Pukul 99:99</p>
              <p className="mt-1 text-lg">Sidik Jari Salah</p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
