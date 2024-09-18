export const formatDate = (date, short = false) => {
  const dayjs = useDayjs();

  const month = short ? "MMM" : "MMMM";
  const dateFormat = `${month} DD, YYYY`;

  return dayjs(new Date(date)).format(dateFormat);
};

export const formatDateTime = (date, short = false) => {
  const dayjs = useDayjs();

  const month = short ? "MMM" : "MMMM";
  const dateFormat = `${month} DD, YYYY, HH:mm`;

  return dayjs(new Date(date)).format(dateFormat);
};

export const formatParamsDate = (date) => {
  const dayjs = useDayjs();
  return dayjs(new Date(date)).format("YYYY-MM-DD");
};
