interface LocalTime {
  hours: number;
  minutes: number;
  seconds: number;
}

export const createExpiredToken = (time: LocalTime) => {
  let currentDate = new Date();

  currentDate.setHours(currentDate.getHours() + time.hours || 2);
  currentDate.setMinutes(currentDate.getMinutes() + time.minutes || 2);
  currentDate.setMinutes(currentDate.getSeconds() + time.seconds || 0);

  return currentDate;
};
