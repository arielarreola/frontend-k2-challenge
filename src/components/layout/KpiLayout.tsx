type KpiLayoutProps = {
  category: string;
  label: string;
  data: string | number;
};

const KpiLayout = ({ category, label, data }: KpiLayoutProps) => {
  return (
    //formato de cards rectangulares que otorgan informacion generica al dashboard
    <div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
      <div className="px-4 py-5 sm:p-6">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {category}
        </span>
        <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-1">
          {label}
        </h5>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
          {data}
        </h3>
      </div>
    </div>
  );
};

export default KpiLayout;
