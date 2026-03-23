import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router";

interface UserMenuProps {
  onProfileClick?: () => void;
  onLogoutClick?: () => void;
}

export default function UserMenu({
  onProfileClick,
  onLogoutClick,
}: UserMenuProps) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();
    } else {
      navigate("/profile");
    }
  };

  const handleLogoutClick = () => {
    if (onLogoutClick) {
      onLogoutClick();
    } else {
      navigate("/");
    }
  };

  return (
    <Menu>
      <MenuButton className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        <FiUser className="w-5 h-5" />
        <span className="sr-only">Menú de usuario</span>
      </MenuButton>

      <MenuItems
        anchor="bottom"
        className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white ring-opacity-10 focus:outline-none z-50"
      >
        <div className="py-1">
          <MenuItem>
            <button
              onClick={handleProfileClick}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              <FiUser className="mr-3 h-4 w-4" />
              Perfil
            </button>
          </MenuItem>

          <MenuItem>
            <button
              onClick={handleLogoutClick}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              <FiLogOut className="mr-3 h-4 w-4" />
              Cerrar sesión
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
