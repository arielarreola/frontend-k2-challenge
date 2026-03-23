import type { Product } from "../lib/models/product.model";

// Calcular valor del activo por categoría (precio × stock)
export const getAssetValueByCategory = (
  products: Product[],
): { [key: string]: number } => {
  const categoryValue: { [key: string]: number } = {};

  products.forEach((product) => {
    const categoryName = product.category.name;
    const assetValue = product.price * product.stock;
    categoryValue[categoryName] =
      (categoryValue[categoryName] || 0) + assetValue;
  });

  return categoryValue;
};

//calcular datos de stock por producto
export const getProductStockData = (
  products: Product[],
): { name: string; stock: number; categoryName: string }[] => {
  const productData: { name: string; stock: number; categoryName: string }[] =
    [];

  products.forEach((product) => {
    productData.push({
      name: product.name,
      stock: product.stock,
      categoryName: product.category.name,
    });
  });

  return productData;
};
//mapeo de catgorias
export const getCategoryColor = (
  categoryName: string,
): { bg: string; border: string } => {
  const colors: { [key: string]: { bg: string; border: string } } = {
    Postres: { bg: "rgba(99, 102, 241, 0.8)", border: "rgba(99, 102, 241, 1)" },
    Botanas: { bg: "rgba(34, 197, 94, 0.8)", border: "rgba(34, 197, 94, 1)" },
    Bebidas: { bg: "rgba(249, 115, 22, 0.8)", border: "rgba(249, 115, 22, 1)" },
  };
  return (
    colors[categoryName] || {
      bg: "rgba(147, 51, 234, 0.8)",
      border: "rgba(147, 51, 234, 1)",
    }
  );
};

//colores por categoria para pastel
export const getBackgroundColors = (
  productData: { categoryName: string }[],
): string[] => {
  return productData.length > 0
    ? productData.map((p) => getCategoryColor(p.categoryName).bg)
    : [
        "rgba(99, 102, 241, 0.8)",
        "rgba(34, 197, 94, 0.8)",
        "rgba(249, 115, 22, 0.8)",
      ];
};

// Obtener colores de borde para productos
export const getBorderColors = (
  productData: { categoryName: string }[],
): string[] => {
  return productData.length > 0
    ? productData.map((p) => getCategoryColor(p.categoryName).border)
    : [
        "rgba(99, 102, 241, 1)",
        "rgba(34, 197, 94, 1)",
        "rgba(249, 115, 22, 1)",
      ];
};

//calcular porcentaje del total
export const calculatePercentage = (value: number, total: number): string => {
  return ((value / total) * 100).toFixed(1);
};

// Formatear valor como moneda
export const formatCurrency = (value: number): string => {
  return `$${value.toFixed(2)}`;
};
