import { useState } from "react";
import ModalLayout from "../../components/layout/ModalLayout";
import TextInput from "../../components/ui/TextInput";
import {
  useCreateProductMutation,
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "../../lib/api/products";
import type { Product } from "../../lib/models/product.model";
import { FaBox, FaMoneyBill } from "react-icons/fa";

type AddProductModalProps = {
  open: boolean;
  onClose: () => void;
};

const AddProductModal = ({ open, onClose }: AddProductModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    categoryId: "", // Default category - empty string for select
  });

  const [createProduct, { isLoading, error }] = useCreateProductMutation();
  const { refetch: refetchPreviousProducts } = useGetProductsQuery();
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  console.log("Categories data:", categories);
  console.log("Categories loading:", categoriesLoading);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validar que se haya seleccionado una categoría
      if (!formData.categoryId) {
        alert("No se seleccionó ninguna categoría");
        return;
      }

      const categoryId = parseInt(formData.categoryId);
      const selectedCategory = categories?.find((cat) => cat.id === categoryId);

      if (!selectedCategory) {
        alert("Categoría no encontrada");
        return;
      }

      const productData: Partial<Product> = {
        name: formData.name,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category: {
          id: categoryId,
          name: selectedCategory.name,
        },
      };

      console.log("Product data being sent:", productData);

      const result = await createProduct(productData).unwrap();

      console.log("Result", result);

      // Product created successfully - refetch products data
      await refetchPreviousProducts();

      setFormData({
        name: "",
        price: "",
        stock: "",
        categoryId: "",
      });
      onClose();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <ModalLayout open={open} onClose={onClose} title="Agregar producto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          label="Nombre del producto"
          value={formData.name}
          onChange={(value) => handleChange("name", value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-row gap-4 items-center">
            <FaMoneyBill className="text-lg" />
            <TextInput
              placeholder="Precio unitario"
              label="Precio"
              type="number"
              step="1"
              value={formData.price}
              onChange={(value) => handleChange("price", value)}
            />
          </div>

          <div className="flex flex-row gap-4 items-center">
            <FaBox className="text-lg" />

            <TextInput
              placeholder="Cant. disponible"
              label="Stock"
              type="number"
              value={formData.stock}
              onChange={(value) => handleChange("stock", value)}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Categoría
          </label>
          <select
            value={formData.categoryId}
            onChange={(e) => handleChange("categoryId", e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            disabled={categoriesLoading}
          >
            <option value="">
              {categoriesLoading ? "Cargando..." : "Selecciona una categoría"}
            </option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
            disabled={isLoading}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Agregando..." : "Agregar producto"}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-700 dark:text-red-400 text-sm">
              Error al crear producto:{" "}
              {(error as any)?.data?.message ||
                (error as any)?.message ||
                "Inténtalo de nuevo"}
            </p>
          </div>
        )}
      </form>
    </ModalLayout>
  );
};

export default AddProductModal;
