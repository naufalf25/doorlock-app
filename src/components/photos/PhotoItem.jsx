import Image from 'next/image';
import { IoMdDownload } from 'react-icons/io';
import Link from 'next/link';

export default async function PhotoItem({ imageUrl, date, time }) {
  return (
    <div className="p-4">
      <div className="border rounded-lg">
        <div className="w-full">
          <Image
            src={imageUrl}
            alt="latestImage"
            width={1600}
            height={1200}
            style={{
              objectFit: 'cover',
            }}
            className="rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <h2 className="capitalize font-semibold text-lg">
            informasi pengambilan gambar:
          </h2>
          <div className="mt-2">
            <p>
              <span className="font-semibold">Tanggal:</span> {date}
            </p>
            <p>
              <span className="font-semibold">Pukul:</span> {time}
            </p>
          </div>
        </div>
        <div className="m-2">
          <Link
            href={imageUrl}
            download
            target="_blank"
            referrerPolicy="no-referrer"
            className="w-full py-2 px-6 border border-blue-950 rounded-lg flex justify-center items-center gap-2"
          >
            <IoMdDownload className="text-xl" />
            <p>Download Gambar</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
