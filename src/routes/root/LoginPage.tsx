import wallpaperHeader from "../../assets/wallpaper-header.webp";
import favicon from "/favicon.svg";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../components/ui/TextInput";
import SubmitButton from "../../components/ui/SubmitButton";
import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";
import ThemeToggle from "../../components/ui/ThemeToggle";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    values,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    setError,
    clearErrors,
  } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    clearErrors();
    if (!values.email) {
      setError("email", "El correo electrónico es requerido");
      setIsSubmitting(false);
      return;
    }

    if (!values.password) {
      setError("password", "La contraseña es requerida");
      setIsSubmitting(false);
      return;
    }
    try {
      const res = await login(values.email, values.password as string);
      if (res) {
        navigate("/dashboard");
      } else {
        setError("email", "Credenciales inválidas");
      }
    } catch (error) {
      setError("email", "Hubo un error al iniciar sesión");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <div className="flex min-h-screen">
        <div className="relative hidden w-full flex-1 lg:block">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-purple-600/40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={wallpaperHeader}
              alt="Wallpaper"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
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
                  Iniciar sesión
                </h2>
                <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-400">
                  ¿No tienes cuenta?{" "}
                  <Link
                    to="/register"
                    className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Regístrate
                  </Link>
                </p>
                <ThemeToggle />
              </div>

              <div className="mt-10">
                <div>
                  <form
                    onSubmit={handleSubmit}
                    method="POST"
                    className="space-y-6"
                  >
                    <TextInput
                      id="email"
                      name="email"
                      type="email"
                      label="Correo electrónico"
                      value={values.email}
                      onChange={(value) => handleChange("email", value)}
                      hasError={!!errors.email}
                      errorMessage={errors.email}
                      placeholder="correo@ejemplo.com"
                      required
                    />

                    <TextInput
                      id="password"
                      name="password"
                      type="password"
                      label="Contraseña"
                      value={values.password}
                      onChange={(value) => handleChange("password", value)}
                      hasError={!!errors.password}
                      errorMessage={errors.password}
                      placeholder="Ingresa tu contraseña"
                      required
                    />

                    <div>
                      <SubmitButton disabled={isSubmitting}>
                        {isSubmitting ? (
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white-500" />
                        ) : (
                          "Iniciar sesión"
                        )}
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

export default LoginPage;
