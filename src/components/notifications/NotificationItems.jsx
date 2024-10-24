import { showFormattedDateAndTime } from '@/utils/data';

export default function NotificationItems({ status, timestamp, message }) {
  const date = showFormattedDateAndTime(timestamp);

  return (
    <div className="mx-4 py-2 border-b border-dashed border-b-blue-950">
      <div className="w-full min-h-20 flex border rounded-lg">
        <div
          className={
            'w-[10%] rounded-l-lg' +
            (status === 'green'
              ? ' bg-green-500'
              : status === 'yellow'
              ? ' bg-yellow-500'
              : status === 'red'
              ? ' bg-red-500'
              : '')
          }
        ></div>
        <div className="w-[90%] px-4 py-2">
          <p className="text-sm">{date}</p>
          <p className="mt-1 text-lg">{message}</p>
        </div>
      </div>
    </div>
  );
}
