const showFormattedDateAndTime = (date) => {
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

  return `${targetDate} Pukul ${targetTime}`;
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

export { showFormattedDateAndTime, formattedDateAndTimeEpoch };
