import { createContext, ReactNode, useContext, useState } from "react";
import {
  IaccessTokens,
  UsuarioLogin,
  UsuarioRegister,
} from "../../utils/models/user-model";
import { apiFetch } from "../core-api";
import { router } from "expo-router";

interface IAuthContextType {
  tokens: IaccessTokens | null;
  login: (signInBody: UsuarioLogin) => void;
  register: (registerBody: UsuarioRegister) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [tokens, setTokens] = useState<IaccessTokens | null>(null);
  //   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const isAuthenticated = !!tokens;

  const login = async (signInBody: UsuarioLogin) => {
    try {
      const result = await apiFetch<IaccessTokens>({
        url: `/auth/login`,
        method: "POST",
        body: signInBody,
      });

      if (result.accessToken) {
        setTokens(result);

        console.log("AuthProvider :: [LOGIN] - login com sucesso ", result);
        //   setIsAuthenticated(true);
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log("AuthProvider :: [LOGIN] - falha no login ", error);
    }
  };

  const register = async (registerBody: UsuarioRegister) => {
    try {
      const result = await apiFetch<IaccessTokens>({
        url: `/user/register`,
        method: "POST",
        body: registerBody,
      });

      setTokens(result);

      console.log("AuthProvider  :: SignUp - usuário cadastrado: ", result);
      navigation.navigate("AuthPage");
    } catch (error) {
      console.log("AuthProvider :: [LOGIN] - falha no login ", error);
    }
  };

  const logout = () => {
    console.log("AuthProvider :: Usuário deslogado");
    router.replace("/login");
    setTokens(null);
  };

  return (
    <AuthContext.Provider
      value={{
        tokens,
        login,
        register,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error(
      "Contexto não encontrado. UseAuth deve estar dentro de AuthProvider.",
    );

  return context;
};
