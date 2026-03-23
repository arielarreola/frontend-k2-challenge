import Footer from "../ui/Footer";
import Header from "../ui/Header";
import Navbar from "../ui/Navbar";

interface DashboardLayoutProps {
  children?: React.ReactNode;
  title?: string;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Header title={title} />
      <main className="flex-1 p-10">{children}</main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
