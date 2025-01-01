interface LocalConfig {
  short: boolean;
  withTime: boolean;
}

export const formatDate = (date: Date | string, config: LocalConfig) => {
  const dayjs = useDayjs();

  const month = config.short ? "MMM" : "MMMM";
  const time = config.withTime ? ", HH:mm" : "";
  const format = `DD ${month} YYYY${time}`;

  return dayjs(new Date(date)).format(format);
};

export const formatParamsDate = (date: Date | string) => {
  const dayjs = useDayjs();
  return dayjs(new Date(date)).format("YYYY-MM-DD");
};
