import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "../lib/models/product.model";

export interface User {
  id: string;
  email: string;
  name: string;
  products: Product[];
  company?: string;
  role?: string;
  description?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string | boolean, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  updateUserProducts: (products: Product[]) => void;
  getUserProducts: () => Product[];
  updateUserInfo: (info: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (
    email: string | boolean,
    password: string,
  ): Promise<boolean> => {
    try {
      // Simular con local storage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const foundUser = users.find(
        (u: any) => u.email === email && u.password === password,
      );

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      if (users.find((u: any) => u.email === email)) {
        return false;
      }
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
        products: [],
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      return true;
    } catch (error) {
      console.error("Register error:", error);
      return false;
    }
  };
  const updateUserInfo = (info: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...info };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const updateUserProducts = (products: Product[]) => {
    if (user) {
      const updatedUser = { ...user, products }; //los productos que han cambiado se guardan en una propiedad del perfil
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const getUserProducts = (): Product[] => {
    return user?.products || [];
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isLoading,
        updateUserProducts,
        getUserProducts,
        updateUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
