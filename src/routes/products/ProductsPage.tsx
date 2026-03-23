import DashboardLayout from "../../components/layout/DashboardLayout";
import ProductButton from "../../components/ui/ProductButton";
import TextInput from "../../components/ui/TextInput";
import AddProductModal from "./AddProductModal";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { IoSearch } from "react-icons/io5";
import { useState, useMemo } from "react";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useGetCategoriesQuery,
} from "../../lib/api/products";
import ProductCard from "../../components/ui/ProductCard";
import type { Product } from "../../lib/models/product.model";
import { useDelayed } from "../../hooks/useDelayed";
import SortMenu from "../../components/ui/SortMenu";
import FilterMenu from "../../components/ui/FilterMenu";

const ProductsPage = () => {
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState("name-asc");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Apply 1000ms delay to search term
  const delayedSearchTerm = useDelayed(searchTerm, 600);

  const {
    data: products,
    isLoading,
    error,
    refetch: refetchProducts,
  } = useGetProductsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  // Aplicar ordenamiento y filtrado
  const processedProducts = useMemo(() => {
    if (!products) return [];

    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(delayedSearchTerm.toLowerCase()),
    );

    // Aplicar filtrado por categoría
    if (selectedCategory !== null) {
      filtered = filtered.filter(
        (product) => product.category.id === selectedCategory,
      );
    }

    // Aplicar ordenamiento
    const [field] = sortBy.split("-");
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (field) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "stock":
          comparison = a.stock - b.stock;
          break;
        case "price":
          comparison = a.price - b.price;
          break;
        default:
          return 0;
      }
      return comparison;
    });

    return filtered;
  }, [products, delayedSearchTerm, sortBy, sortOrder, selectedCategory]);

  const isSearchDelayed = searchTerm !== delayedSearchTerm;

  const handleSortChange = (newSortBy: string, newOrder: "asc" | "desc") => {
    setSortBy(newSortBy);
    setSortOrder(newOrder);
  };

  const handleFilterChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setOpenDeleteConfirmation(true);
  };

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete.id).unwrap();
        await refetchProducts(); // Refetch products after deletion
        setOpenDeleteConfirmation(false);
        setProductToDelete(null);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <DashboardLayout title="Inventario">
      <div className="px-6 py-8">
        <div className="flex items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold leading-tight">Inventario</h1>
          <ProductButton onClick={() => setOpenAddProduct(true)} />
        </div>

        {/* Barra de búsqueda y botones */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* TextInput para búsqueda (3/4 del ancho en desktop) */}
          <div className="w-full md:w-3/4">
            <TextInput
              placeholder="Buscar por nombre"
              value={searchTerm}
              onChange={(value) => setSearchTerm(value)}
              rightIcon={<IoSearch className="size-5 text-gray-400" />}
            />
          </div>

          {/* Botones de ordenamiento y filtrado (1/4 del ancho en desktop) */}
          <div className="grid grid-cols-2 gap-2 w-full md:w-1/4">
            <div>
              <FilterMenu
                onFilter={handleFilterChange}
                categories={categories || []}
                selectedCategory={selectedCategory}
              />
            </div>
            <div>
              <SortMenu
                onSort={handleSortChange}
                currentSort={sortBy}
                currentOrder={sortOrder}
              />
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <section className="py-8">
          {isSearchDelayed && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-gray-600 dark:text-gray-400">
                Buscando...
              </span>
            </div>
          )}

          {/* Show loading spinner while products are loading */}
          {isLoading && !isSearchDelayed && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-gray-600 dark:text-gray-400">
                Cargando productos...
              </span>
            </div>
          )}

          {error && !isSearchDelayed && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <p className="text-red-700 dark:text-red-400">
                Error:{" "}
                {error instanceof Error
                  ? error.message
                  : "Error al cargar productos"}
              </p>
            </div>
          )}

          {!isLoading &&
            !error &&
            !isSearchDelayed &&
            processedProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-6 py-8">
                <p className="text-gray-600 dark:text-gray-400">
                  {searchTerm
                    ? "No se encontraron productos que coincidan con la búsqueda"
                    : "No hay productos en el inventario. \nAgrega un producto nuevo"}
                </p>
                {!searchTerm && (
                  <ProductButton onClick={() => setOpenAddProduct(true)} />
                )}
              </div>
            )}

          {!isLoading &&
            !error &&
            !isSearchDelayed &&
            processedProducts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {processedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>
            )}
        </section>
      </div>

      {/* Modal para agregar producto */}
      <AddProductModal
        open={openAddProduct}
        onClose={() => setOpenAddProduct(false)}
      />

      {/* Modal de confirmación de eliminación */}
      <DeleteConfirmDialog
        open={openDeleteConfirmation}
        onClose={() => {
          setOpenDeleteConfirmation(false);
          setProductToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        productName={productToDelete?.name || ""}
        isLoading={isDeleting}
      />
    </DashboardLayout>
  );
};

export default ProductsPage;
