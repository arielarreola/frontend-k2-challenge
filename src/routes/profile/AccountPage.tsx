import DashboardLayout from "../../components/layout/DashboardLayout";
import ProfileInfo from "../../components/profile/ProfileInfo";

const AccountPage = () => {
  return (
    <DashboardLayout title="Perfil">
      <div className="px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold leading-tight mb-2">Perfil</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Información personal y profesional
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <ProfileInfo />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AccountPage;
