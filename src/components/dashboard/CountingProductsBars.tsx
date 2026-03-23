import { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { Product } from "../../lib/models/product.model";
import { useTheme } from "../../contexts/ThemeContext";
import {
  getProductStockData,
  getBackgroundColors,
  getBorderColors,
} from "../../utils/chartCalculations";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface CountingProductsBarsProps {
  products?: Product[];
}

const CountingProductsBars = ({ products = [] }: CountingProductsBarsProps) => {
  const chartRef = useRef<ChartJS<"bar">>(null);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const productData = getProductStockData(products);
  const labels = productData.length > 0 ? productData.map((p) => p.name) : [];
  const stockData =
    productData.length > 0 ? productData.map((p) => p.stock) : [35, 50, 25];

  const backgroundColors = getBackgroundColors(productData);
  const borderColors = getBorderColors(productData);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Stock por Producto",
        data: stockData,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Stock de cada Producto",
        color: isDarkMode ? "#fff" : "rgb(31, 41, 55)",
        font: {
          size: 16,
          family: "Arial",
          weight: "bold" as const,
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
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: isDarkMode ? "rgb(255, 255, 255)" : "rgb(107, 114, 128)",
          stepSize: 2,
        },
        grid: {
          color: isDarkMode
            ? "rgba(5, 48, 135, 0.5)"
            : "rgba(229, 231, 235, 0.5)",
        },
      },
      x: {
        ticks: {
          color: isDarkMode ? "rgb(255, 255, 255)" : "rgb(107, 114, 128)",
        },
        grid: {
          color: isDarkMode
            ? "rgba(5, 48, 135, 0.5)"
            : "rgba(229, 231, 235, 0.5)",
        },
      },
    },
  };

  return (
    <div className="w-full h-96 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <Bar ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default CountingProductsBars;
