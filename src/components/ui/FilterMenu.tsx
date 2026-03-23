import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaFilter, FaTag } from "react-icons/fa";

interface FilterMenuProps {
  onFilter: (categoryId: number | null) => void;
  categories: { id: number; name: string }[];
  selectedCategory: number | null;
}

const FilterMenu = ({
  onFilter,
  categories,
  selectedCategory,
}: FilterMenuProps) => {
  const handleFilter = (categoryId: number | null) => {
    onFilter(categoryId);
  };

  return (
    <Menu as="div" className="relative inline-block w-full">
      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:shadow-none dark:ring-white/5 dark:hover:bg-white/20">
        <FaFilter
          aria-hidden="true"
          className="size-4 text-gray-400 sm:size-5 sm:mr-1"
        />
        <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-200">
          Filtrar
        </span>
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
      >
        <div className="py-1">
          <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide dark:text-gray-400">
            Categorías
          </h3>

          {/* Opción para mostrar todos */}
          <MenuItem>
            <button
              onClick={() => handleFilter(null)}
              className={`block w-full px-4 py-2 text-left text-sm ${
                selectedCategory === null
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5 dark:data-focus:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <FaTag className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="font-medium">Todas las categorías</span>
              </div>
            </button>
          </MenuItem>

          {/* Opciones de categorías */}
          {categories.map((category) => (
            <MenuItem key={category.id}>
              <button
                onClick={() => handleFilter(category.id)}
                className={`block w-full px-4 py-2 text-left text-sm ${
                  selectedCategory === category.id
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5 dark:data-focus:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FaTag className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="font-medium">{category.name}</span>
                </div>
              </button>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default FilterMenu;
