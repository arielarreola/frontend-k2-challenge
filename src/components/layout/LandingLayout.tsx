import Footer from "../ui/Footer";
import Navbar from "../ui/Navbar";
import { useTheme } from "../../contexts/ThemeContext";
import mainWpDark from "../../assets/main-wp-dark.png";
import mainWpLight from "../../assets/main-wp-light.png";

interface LandingLayoutProps {
  children?: React.ReactNode;
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  const { theme } = useTheme();

  const backgroundImages = {
    dark: mainWpDark,
    light: mainWpLight,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 relative">
        <img
          src={backgroundImages[theme]}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-purple-600/40"></div>
        <div className="relative z-10 h-full">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
