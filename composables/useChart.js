export const useChart = (field = ["name", "total_votes"]) => {
  const labels = ref([]);
  const chartData = ref([]);

  const setData = (v) => {
    console.log(v);
    labels.value = [];
    chartData.value = [];

    v.votes.forEach((v2) => {
      console.log(v2);
      labels.value.push(v2[field[0]]);
      chartData.value.push(v2[field[1]]);
    });
  };

  return { labels, chartData, setData };
};
