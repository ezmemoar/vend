import type { ChartData, ChartOptions } from "chart.js";

export const useChart = () => {
  const chartRef = ref<HTMLElement>();
  const chartData = ref<ChartData<any, number[], unknown>>({
    labels: [],
    datasets: [],
  });
  const options = ref<ChartOptions>({
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  });

  const isCircularChart = (type: ChartType) =>
    ["doughnut", "pie"].includes(type);
  const isLineChart = (type: ChartType) => ["bar", "line"].includes(type);

  const setCircularData = (
    labels: string[],
    data: number[][],
    backgroundColor: string[],
    other: { [key: string]: any }[] = []
  ) => {
    chartData.value = {
      labels,
      datasets: data.map((v, i) => ({
        data: v,
        backgroundColor,
        ...other[i],
      })),
    };
  };

  const setLineData = (
    labels: string[],
    data: number[][],
    backgroundColor: string[],
    other: { [key: string]: any }[] = []
  ) => {
    chartData.value = {
      labels,
      datasets: data.map((v, i) => ({
        data: v,
        borderColor: backgroundColor[i],
        backgroundColor: backgroundColor[i],
        ...other[i],
      })),
    };
  };

  return {
    chartRef,
    chartData,
    options,
    setCircularData,
    setLineData,
    isCircularChart,
    isLineChart,
  };
};
