import { useTheme } from "../../contexts/ThemeContext";
import mainWpDark from "../../assets/main-wp-dark.png";
import mainWpLight from "../../assets/main-wp-light.png";
import { Link } from "react-router-dom";
import favicon from "/favicon.svg";
import LandingLayout from "../../components/layout/LandingLayout";

const NotFoundPage = () => {
  const { theme } = useTheme();

  const backgroundImages = {
    dark: mainWpDark,
    light: mainWpLight,
  };

  return (
    <LandingLayout>
      <div className="grid min-h-full grid-cols-1 grid-rows-[1fr_auto_1fr] bg-white lg:grid-cols-[max(50%,36rem)_1fr] dark:bg-gray-900">
        <header className="mx-auto w-full max-w-7xl px-6 pt-6 sm:pt-10 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:px-8">
          <Link to="/" className="inline-block">
            <span className="sr-only">K2 Challenge</span>
            <img
              alt="K2 Challenge"
              src={favicon}
              className="h-10 w-auto sm:h-12"
            />
          </Link>
        </header>
        <main className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
          <div className="max-w-lg">
            <p className="text-base/8 font-semibold text-indigo-600 dark:text-indigo-400">
              404
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl dark:text-white">
              Page not found
            </h1>
            <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
              La página que buscas no existe o ha sido movida.
            </p>
            <div className="mt-10">
              <Link
                to="/"
                className="text-sm/7 font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
              >
                <span aria-hidden="true">&larr;</span> Volver al inicio
              </Link>
            </div>
          </div>
        </main>
        <div className="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
          <img
            alt=""
            src={backgroundImages[theme]}
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-purple-600/40"></div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default NotFoundPage;
