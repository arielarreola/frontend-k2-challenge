import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../components/ui/TextInput";
import SubmitButton from "../../components/ui/SubmitButton";
import wallpaperHeader from "../../assets/wallpaper-header.webp";
import favicon from "/favicon.svg";
import { useForm } from "../../hooks/useForm";
import { useAuth } from "../../contexts/AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const {
    values,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    setError,
    clearErrors,
  } = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    clearErrors();

    // Validación
    if (!values.name) {
      setError("name", "El nombre es requerido");
      return;
    }

    if (!values.email) {
      setError("email", "El correo electrónico es requerido");
      return;
    }

    if (!values.password) {
      setError("password", "La contraseña es requerida");
      return;
    }

    if (values.password !== values.confirmPassword) {
      setError("confirmPassword", "Las contraseñas no coinciden");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await register(
        values.name as string,
        values.email as string,
        values.password as string,
      );

      if (success) {
        navigate("/dashboard");
      } else {
        setError("email", "El correo electrónico ya está registrado");
      }
    } catch (error) {
      setError("email", "Error al crear cuenta");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <div className="flex min-h-screen">
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            alt=""
            src={wallpaperHeader}
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-purple-600/40"></div>
        </div>

        <div className="relative flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 lg:z-10">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="rounded-2xl bg-white/95 p-8 shadow-2xl backdrop-blur-sm dark:bg-gray-900/95">
              <div className="text-center">
                <img
                  alt="K2 Challenge"
                  src={favicon}
                  className="h-10 w-auto mx-auto"
                />
                <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
                  Crear cuenta
                </h2>
                <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-400">
                  ¿Ya tienes cuenta?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Inicia sesión
                  </Link>
                </p>
              </div>

              <div className="mt-10">
                <div>
                  <form
                    onSubmit={handleSubmit}
                    method="POST"
                    className="space-y-6"
                  >
                    <TextInput
                      id="name"
                      name="name"
                      type="text"
                      label="Nombre completo"
                      placeholder="Ingresa tu nombre"
                      required
                      onChange={(value) => handleChange("name", value)}
                      value={values.name}
                      hasError={!!errors.name}
                      errorMessage={errors.name}
                      autoComplete="name"
                    />

                    <TextInput
                      id="email"
                      name="email"
                      type="email"
                      label="Correo electrónico"
                      placeholder="correo@ejemplo.com"
                      required
                      onChange={(value) => handleChange("email", value)}
                      value={values.email}
                      hasError={!!errors.email}
                      errorMessage={errors.email}
                      autoComplete="email"
                    />

                    <TextInput
                      id="password"
                      name="password"
                      type="password"
                      label="Contraseña"
                      placeholder="Crea una contraseña"
                      required
                      onChange={(value) => handleChange("password", value)}
                      value={values.password}
                      hasError={!!errors.password}
                      errorMessage={errors.password}
                      autoComplete="new-password"
                    />

                    <TextInput
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      label="Confirmar contraseña"
                      placeholder="Repite tu contraseña"
                      onChange={(value) => {
                        handleChange("confirmPassword", value);
                      }}
                      value={values.confirmPassword}
                      hasError={!!errors.confirmPassword}
                      errorMessage={errors.confirmPassword}
                      required
                      autoComplete="new-password"
                    />

                    <div>
                      <SubmitButton disabled={isSubmitting}>
                        Crear cuenta
                      </SubmitButton>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
