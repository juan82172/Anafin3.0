import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  AuthContextInterface,
  ChildrenProps,
  UserInterface,
} from "@/interfaces/authInterfaces/AuthContextProps";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";

const initialValue: AuthContextInterface = {
  user: null,
  isAuthenticated: false,
  loading: false,
  login: async () => {},
  logout: async () => {},
  loginWithoutGoogle: async () => {},
};

export const AuthContext = createContext<AuthContextInterface>(initialValue);

export const AuthContextProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  console.log("⚙️ Configurando GoogleSignin...");

  GoogleSignin.configure({
    webClientId: "1086441668006-iuud1lflv6kofhue3sl06oeak7d2goq8.apps.googleusercontent.com",
    iosClientId: "1086441668006-mql6k17h7iap31cusndae7dv8e6t6jkd.apps.googleusercontent.com",    
    scopes: ["profile", "email"],
    offlineAccess: true,
  });

  console.log("✅ GoogleSignin configurado correctamente");

  getCurrentUser();
}, []);

  const getCurrentUser = async () => {
    setLoading(true);
    try {
      const { type, data } = await GoogleSignin.signInSilently();
      if (type === "success") {
        const userData: UserInterface = {
          id: data.user.id ?? "",
          email: data.user.email ?? "",
          photoUrl: data.user.photo ?? "",
          name: data.user.name ?? "",
        };
        setValues(userData, true);
      } else {
        setValues(null, false);
      }
    } catch (error) {
      console.error("error getCurrentUser", error);
      setValues(null, false);
    } finally {
      setLoading(false);
    }
  };

const login = async () => {
  setLoading(true);
  console.log("🔍 Iniciando login con Google");

  try {
    const hasPlayServices = await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    console.log("✅ Google Play Services disponibles:", hasPlayServices);

    if (!hasPlayServices) {
      console.warn("⚠️ Google Play Services NO disponibles");
      throw new Error("Google Play Services not available");
    }

    console.log("⏳ Intentando iniciar sesión con Google...");
    const response: any = await GoogleSignin.signIn();
    console.log("✅ Resultado de signIn:", response);

    if (response?.idToken || response?.data?.idToken) {
      const idToken = response?.idToken || response?.data?.idToken;
      const userInfo = response?.user || response?.data?.user;

      console.log("🆔 idToken recibido:", idToken);
      console.log("👤 Datos de usuario recibidos:", userInfo);

      const userData: UserInterface = {
        id: userInfo?.id ?? "",
        email: userInfo?.email ?? "",
        photoUrl: userInfo?.photo ?? "",
        name: userInfo?.name ?? "",
      };

      console.log("📦 Usuario procesado para el contexto:", userData);
      setValues(userData, true);
    } else {
      console.warn("⚠️ No se recibió idToken (fallo en autenticación)");
      setValues(null, false);
    }

  } catch (error: any) {
    console.error("❌ Error en login con Google:", error);

    if (error.code) console.log("📛 Error code:", error.code);
    if (error.message) console.log("📄 Error message:", error.message);
    if (error.stack) console.log("🪵 Stack trace:", error.stack);

    setValues(null, false);
  } finally {
    console.log("🔁 Login finalizado");
    setLoading(false);
  }
};



  const loginWithoutGoogle = async () => {
    setLoading(true);
    const userData: UserInterface = {
      id: "usuarioIncognito",
      email: "prueba@gmail.com",
      photoUrl: "",
      name: "Incognito",
    };
    setValues(userData, true);
  };

  const logout = async () => {
    setValues(null, false);
    console.log("Usuario deslogueado");
    await GoogleSignin.signOut();
    setLoading(false);
  };

  const setValues = (user: UserInterface | null, isAuthenticated: boolean) => {
    setUser(user);
    setIsAuthenticated(isAuthenticated);
    if (user) {
      console.log("Usuario logueado");
      router.replace("/Home");
    } else {
      console.log("Usuario deslogueado");
      router.replace("/Login");
    }
  };

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated,
      loading,
      login,
      logout,
      loginWithoutGoogle,
    }),
    [user, isAuthenticated, loading, login, logout, loginWithoutGoogle]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.error("Debes estar dentro del contexto de AuthContext");
  }
  return context;
};
