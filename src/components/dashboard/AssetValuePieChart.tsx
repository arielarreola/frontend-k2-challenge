import { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import type { Product } from "../../lib/models/product.model";
import { useTheme } from "../../contexts/ThemeContext";
import {
  getAssetValueByCategory,
  calculatePercentage,
  formatCurrency,
} from "../../utils/chartCalculations";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

interface AssetValuePieChartProps {
  products?: Product[];
}

const AssetValuePieChart = ({ products = [] }: AssetValuePieChartProps) => {
  const chartRef = useRef<ChartJS<"pie">>(null);
  const { theme } = useTheme(); //contexto del tema para saber appearance actual y mantener consistencia
  const isDarkMode = theme === "dark";

  const categoryData = getAssetValueByCategory(products);
  const labels = Object.keys(categoryData);
  const values = Object.values(categoryData);

  const chartData = {
    labels: labels.length > 0 ? labels : ["Postres", "Botanas", "Bebidas"],
    datasets: [
      {
        label: "Valor del Activo",
        data: values.length > 0 ? values : [350, 1499.5, 300],
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)", // Indigo - Postres
          "rgba(34, 197, 94, 0.8)", // Green - Botanas
          "rgba(249, 115, 22, 0.8)", // Orange - Bebidas
          "rgba(239, 68, 68, 0.8)", // Red - Extra
          "rgba(147, 51, 234, 0.8)", // Purple - Extra
        ],
        borderColor: [
          "rgba(99, 102, 241, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(249, 115, 22, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(147, 51, 234, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          color: isDarkMode ? "rgb(255, 255, 255)" : "rgb(55, 65, 81)",
          font: {
            size: 12,
            weight: "bold" as const,
          },
          padding: 20,
          generateLabels: function (chart: any) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              const dataset = data.datasets[0];
              const total = dataset.data.reduce(
                (a: number, b: number) => a + b,
                0,
              );

              return data.labels.map((label: string, i: number) => {
                const value = dataset.data[i];
                const percentage = calculatePercentage(value, total);
                const formattedValue = formatCurrency(value);
                return {
                  text: `${label}: ${formattedValue} (${percentage}%)`,
                  fillStyle: dataset.backgroundColor[i],
                  strokeStyle: dataset.borderColor[i],
                  lineWidth: dataset.borderWidth,
                  hidden: false,
                  index: i,
                };
              });
            }
            return [];
          },
        },
      },
      title: {
        display: true,
        text: "Valor del Activo por Categoría",
        color: isDarkMode ? "rgb(255, 255, 255)" : "rgb(31, 41, 55)",
        font: {
          size: 18,
          family: "Arial",
          weight: "bold" as const,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        backgroundColor: isDarkMode
          ? "rgba(0, 0, 0, 0.8)"
          : "rgba(255, 255, 255, 0.8)",
        titleColor: isDarkMode ? "white" : "black",
        bodyColor: isDarkMode ? "white" : "black",
        borderColor: isDarkMode
          ? "rgba(255, 255, 255, 0.3)"
          : "rgba(0, 0, 0, 0.3)",
        borderWidth: 1,
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce(
              (a: number, b: number) => a + b,
              0,
            );
            const percentage = calculatePercentage(value, total);
            const formattedValue = formatCurrency(value);
            return `${label}: ${formattedValue} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-96 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <Pie ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default AssetValuePieChart;
