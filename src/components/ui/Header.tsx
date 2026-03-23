import wallpaperHeader from "../../assets/wallpaper-header.webp";

interface HeaderProps {
  title?: string;
}

export default function Header({ title = "Back End Developer" }: HeaderProps) {
  return (
    <div className="relative bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Wallpaper de fondo */}
      <img
        src={wallpaperHeader}
        alt="Wallpaper Header"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Capa de transparencia */}
      <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60"></div>

      <div className="relative z-10">
        <div className="mt-2 md:flex md:items-center md:justify-between px-16 py-20">
          <div className="min-w-0 flex-1">
            <h2 className="text-3xl font-bold text-gray-900 sm:truncate sm:text-6xl dark:text-white">
              {title}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
