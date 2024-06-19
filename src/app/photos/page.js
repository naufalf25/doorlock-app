import Layout from '@/components/Layout';
import PhotoItem from '@/components/photos/PhotoItem';

const dataTemp = {
  imageUrl:
    'https://firebasestorage.googleapis.com/v0/b/door-lock-esp32-b79a1.appspot.com/o/image%2F8rRjCUIrqZZlx4mjJXaXMyTPP9B2%2F1718700723.jpg?alt=media&token=cf3ea036-9eb5-4ad9-bb4b-07284d717bed',
  timestamp: 1718700723,
};

const formattedDateAndTimeEpoch = (date) => {
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Jakarta',
  };

  const timeOptions = {
    timeZone: 'Asia/Jakarta',
    timeZoneName: 'short',
    hour: '2-digit',
    minute: '2-digit',
  };

  const targetDate = new Date(date * 1000).toLocaleDateString(
    'id-ID',
    dateOptions
  );
  const targetTime = new Date(date * 1000).toLocaleTimeString(
    'id-ID',
    timeOptions
  );

  return {
    date: targetDate,
    time: targetTime,
  };
};

export default function Photos() {
  const { date, time } = formattedDateAndTimeEpoch(dataTemp.timestamp);

  return (
    <Layout title="halaman riwayat foto" uid="0123456789" path="/photos">
      <main className="min-h-[75vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <PhotoItem imageUrl={dataTemp.imageUrl} date={date} time={time} />
        <PhotoItem imageUrl={dataTemp.imageUrl} date={date} time={time} />
        <PhotoItem imageUrl={dataTemp.imageUrl} date={date} time={time} />
        <PhotoItem imageUrl={dataTemp.imageUrl} date={date} time={time} />
      </main>
    </Layout>
  );
}
