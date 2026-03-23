import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import ThemeToggle from "./ThemeToggle";
import favicon from "/favicon.svg";
import UserMenu from "./UserMenu";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Productos", href: "/products" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <header className="bg-white dark:bg-gray-900">
      <nav
        aria-label="Global"
        className=" flex items-center justify-between p-6 lg:px-8"
      >
        <a href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Frontend Challenge</span>
          <img alt="" src={favicon} className="h-8 w-auto" />
        </a>
        <div className="flex lg:hidden gap-10">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-400"
          >
            <GiHamburgerMenu />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12 lg:items-center">
          <ThemeToggle />
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm/6 font-semibold text-gray-900 dark:text-white"
            >
              {item.name}
            </a>
          ))}

          {user ? (
            <div className="ml-4">
              <UserMenu onLogoutClick={handleLogout} />
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm/6 font-semibold text-indigo-600 dark:text-indigo-400"
              >
                Iniciar sesión
              </Link>
            </>
          )}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:sm:ring-gray-100/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Katu Labs</span>
              <img alt="Inventario" src={favicon} className="h-8 w-auto  " />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-400"
            >
              X{/* <XMarkIcon aria-hidden="true" className="size-6" /> */}
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 dark:divide-white/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                {user ? (
                  <>
                    <a
                      href="/profile"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                    >
                      Mi perfil
                    </a>
                    <button
                      onClick={handleLogout}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 w-full text-left"
                    >
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                  >
                    Iniciar sesión
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
