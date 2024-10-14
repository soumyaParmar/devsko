import { Doughnut } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  Filler,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title, Filler);

const CircularProgressBar = () => {
  const data = {
    labels: ["Work Experience", "Skills Added", "Education"],
    datasets: [
      {
        data: [15, 21, 46],
        backgroundColor: ["#FF4DA2", "#59BFFA", "#5215FF"],
        hoverBackgroundColor: ["#FF4DA2", "#59BFFA", "#5215FF"],
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    radius: '100%',
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default CircularProgressBar;
