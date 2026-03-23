import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "../../lib/api/products";
import KPIData from "../../components/dashboard/KPIData";
import CountingProductsBars from "../../components/dashboard/CountingProductsBars";
import AssetValuePieChart from "../../components/dashboard/AssetValuePieChart";

const DashboardPage = () => {
  //obtener productos del state
  const { data: products } = useGetProductsQuery();
  const { data: categories } = useGetCategoriesQuery();
  return (
    <DashboardLayout title="Dashboard">
      <section className="flex flex-col gap-6 ">
        <h2 className="text-xl text-gray-600 dark:text-gray-400">
          Resumen de la actividad
        </h2>

        {/* Grid para mostrar KPIs por categoría */}
        <div className="space-y-8">
          {categories?.map((category) => (
            <div key={category.id} className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                {category.name}
              </h3>

              {/* Tres tipos de KPI en horizontal por cada categoría */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <KPIData
                  data={products}
                  operation="stocks"
                  category={category}
                />
                <KPIData
                  data={products}
                  operation="average"
                  category={category}
                />
                <KPIData
                  data={products}
                  operation="leastStock"
                  category={category}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="p-10">
        <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          General
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CountingProductsBars products={products} />
          <AssetValuePieChart products={products} />
        </div>
      </section>
    </DashboardLayout>
  );
};

export default DashboardPage;
