import type { Product } from "../lib/models/product.model";

export type KPIOperation = "stocks" | "average" | "leastStock";

export interface KPIResult {
  value: number;
  label: string;
}

// Calcular stock total para una categoría
export const calculateTotalStock = (
  products: Product[],
  categoryId: number,
): number => {
  const categoryProducts = products.filter(
    (product) => product.category.id === categoryId,
  );
  return categoryProducts.reduce((total, product) => total + product.stock, 0);
};

// Calcular precio promedio para una categoría
export const calculateAveragePrice = (
  products: Product[],
  categoryId: number,
): number => {
  const categoryProducts = products.filter(
    (product) => product.category.id === categoryId,
  );
  if (categoryProducts.length === 0) return 0;

  const total = categoryProducts.reduce(
    (sum, product) => sum + product.price,
    0,
  );
  return Math.round((total / categoryProducts.length) * 100) / 100;
};

// Calcular producto con menor stock para una categoría
export const calculateLeastStock = (
  products: Product[],
  categoryId: number,
): { stock: number; productName: string } => {
  const categoryProducts = products.filter(
    (product) => product.category.id === categoryId,
  );
  if (categoryProducts.length === 0) return { stock: 0, productName: "" };

  const minStockProduct = categoryProducts.reduce((min, product) =>
    product.stock < min.stock ? product : min,
  );

  return {
    stock: minStockProduct.stock,
    productName: minStockProduct.name,
  };
};

//calcular KPIs
export const calculateKPI = (
  products: Product[],
  categoryId: number,
  operation: KPIOperation,
): KPIResult => {
  let result = 0;
  let label = "";

  switch (operation) {
    case "stocks":
      result = calculateTotalStock(products, categoryId);
      label = "Stock Total";
      break;
    case "average":
      result = calculateAveragePrice(products, categoryId);
      label = "Precio Promedio";
      break;
    case "leastStock":
      const leastStockData = calculateLeastStock(products, categoryId);
      result = leastStockData.stock;
      label = "Menor Stock";
      break;
  }

  return {
    value: result,
    label,
  };
};
