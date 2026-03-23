import { FaBox, FaTrash } from "react-icons/fa";
import { LuDessert } from "react-icons/lu";
import { GiFrenchFries, GiSodaCan } from "react-icons/gi";
import type { Product } from "../../lib/models/product.model";

type ProductCardProps = {
  product: Product;
  onDelete?: (product: Product) => void;
};

const ProductCardCategoryIcon = ({ product }: { product: Product }) => {
  switch (product.category?.id) {
    case 1:
      return <LuDessert />;
    case 2:
      return <GiFrenchFries />;
    case 3:
      return <GiSodaCan />;
    default:
      return <FaBox />;
  }
};

const ProductCard = ({ product, onDelete }: ProductCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col justify-center items-center text-[40px] py-8">
        <ProductCardCategoryIcon product={product} />
      </div>
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {product.name}
        </h3>
        <button
          className="text-red-400 hover:text-red-700 transition-colors text-md"
          onClick={() => onDelete?.(product)}
          title="Eliminar producto"
        >
          <FaTrash />
        </button>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Categoría: {product.category?.name || "Sin categoría"}
      </p>
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          ${product.price.toFixed(2)}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            product.stock > 25
              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
              : product.stock > 0
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
          }`}
        >
          Stock: {product.stock}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
