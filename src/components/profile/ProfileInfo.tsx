import { useEffect, useState } from "react";
import { useAuth, type User } from "../../contexts/AuthContext";
import { FaEdit, FaUser } from "react-icons/fa";
import EditProfileModal from "./EditProfileModal";

const ProfileInfo = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState<User>({
    id: user?.id || "default",
    name: user?.name || "Usuario",
    email: user?.email || "sin correo",
    products: user?.products || [],
    company: user?.company || "Sin empresa",
    role: user?.role || "Sin puesto",
    description: user?.description || "Sin descripcion",
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile(parsedProfile);
      } catch (error) {
        console.error("Error al cargar el perfil desde localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        id: user.id,
        name: user.name || prev.name,
        email: user.email || prev.email,
        company: user.company || prev.company,
        role: user.role || prev.role,
        description: user.description || prev.description,
        products: user.products,
      }));
    }
  }, [user]);

  // Guardar datos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
  }, [profile]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="flex flex-1">
          <div className="mr-4 shrink-0 flex items-center">
            <FaUser className="text-6xl text-gray-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white">
              {profile.name}
            </h4>
            <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
              {profile.role}
            </p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {profile.company}
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
              {profile.email}
            </p>
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed pr-20">
              {profile.description}
            </p>
          </div>
        </div>
        <button
          onClick={handleEdit}
          className="ml-4 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
          title="Editar perfil"
        >
          <FaEdit className="size-5" />
        </button>
      </div>
      <EditProfileModal open={isEditing} onClose={handleCloseModal} />
    </>
  );
};

export default ProfileInfo;
