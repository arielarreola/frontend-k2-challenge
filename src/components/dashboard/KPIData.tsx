import KpiLayout from "../layout/KpiLayout";
import { calculateKPI } from "../../utils/kpiCalculations";
import type { Product } from "../../lib/models/product.model";

const KPIData = ({
  data,
  operation,
  category,
}: {
  data: Product[] | undefined;
  operation: "stocks" | "average" | "leastStock";
  category: { id: number; name: string };
}) => {
  // Calcular KPI usando las utilidades
  const kpiResult = calculateKPI(data || [], category.id, operation);

  // Formatear el resultado según el tipo de operación
  let displayData: string | number = kpiResult.value;

  if (operation === "average" && kpiResult.value > 0) {
    displayData = `$${kpiResult.value.toFixed(2)}`;
  } else if (operation === "leastStock" && kpiResult.value > 0) {
    const leastStockData =
      data?.filter((product) => product.category.id === category.id) || [];
    if (leastStockData.length > 0) {
      const minStockProduct = leastStockData.reduce((min, product) =>
        product.stock < min.stock ? product : min,
      );
      displayData = `${minStockProduct.name} (${kpiResult.value})`;
    }
  }

  return (
    <KpiLayout
      category={category.name}
      label={kpiResult.label}
      data={displayData}
    />
  );
};

export default KPIData;
