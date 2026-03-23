import { useState, useEffect } from "react";
import ModalLayout from "../layout/ModalLayout";
import TextInput from "../ui/TextInput";
import { useAuth } from "../../contexts/AuthContext";

type EditProfileModalProps = {
  open: boolean;
  onClose: () => void;
};

const EditProfileModal = ({ open, onClose }: EditProfileModalProps) => {
  const { user, updateUserInfo } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    description: "",
  });

  // Cargar datos desde localStorage y del usuario al abrir el modal
  useEffect(() => {
    if (open) {
      // Intentar cargar desde localStorage primero
      const savedProfile = localStorage.getItem("userProfile");
      let profileData = null;
      
      if (savedProfile) {
        try {
          profileData = JSON.parse(savedProfile);
        } catch (error) {
          console.error("Error al cargar el perfil desde localStorage:", error);
        }
      }

      // Usar datos del usuario autenticado o localStorage
      setFormData({
        name: user?.name || profileData?.name || "",
        email: user?.email || profileData?.email || "",
        company: user?.company || profileData?.company || "",
        role: user?.role || profileData?.role || "",
        description: user?.description || profileData?.description || "",
      });
    }
  }, [open, user]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Actualizar información del usuario manteniendo productos y otros datos
    if (user) {
      updateUserInfo({
        name: formData.name,
        company: formData.company,
        role: formData.role,
        description: formData.description,
        // Mantener los productos existentes
        products: user.products,
        // Mantener el id y email existentes
        id: user.id,
        email: user.email,
      });
    }

    // También guardar en localStorage para el perfil local
    localStorage.setItem("userProfile", JSON.stringify(formData));
    
    onClose();
  };

  return (
    <ModalLayout open={open} onClose={onClose} title="Editar perfil">
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          label="Nombre"
          value={formData.name}
          onChange={(value) => handleChange("name", value)}
          required
        />

        <TextInput
          label="Correo electrónico"
          value={formData.email}
          onChange={(value) => handleChange("email", value)}
          disabled={true} // Deshabilitar edición de correo
          placeholder="Correo no editable"
        />

        <TextInput
          label="Empresa"
          value={formData.company}
          onChange={(value) => handleChange("company", value)}
        />

        <TextInput
          label="Puesto"
          value={formData.role}
          onChange={(value) => handleChange("role", value)}
        />

        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Descripción
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
            placeholder="Describe tu experiencia y habilidades..."
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default EditProfileModal;
