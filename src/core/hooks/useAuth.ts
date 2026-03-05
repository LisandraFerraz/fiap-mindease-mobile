import {
  IaccessTokens,
  UsuarioLogin,
  UsuarioRegister,
} from "../../utils/models/user-model";
import { apiFetch } from "../core-api";
import UserDataStore from "../../stores/user-data-store";

export const UseAuth = () => {
  const setUserData = UserDataStore((state) => state.setUserData);

  const login = async (signInBody: UsuarioLogin) => {
    try {
      const result = await apiFetch<any>({
        url: `/auth/login`,
        method: "POST",
        body: signInBody,
      });

      if (result) {
        const { userName, ...tokens } = result;

        setUserData({ tokens, userInfo: { nome: userName } });
      }
    } catch (error) {
      console.error("UseAuth :: [LOGIN] - falha no login ", error);
    }
  };

  const register = async (registerBody: UsuarioRegister) => {
    try {
      const result = await apiFetch<IaccessTokens>({
        url: `/user/register`,
        method: "POST",
        body: registerBody,
      });

      console.log("AuthProvider  :: SignUp - usuário cadastrado: ", result);
      navigation.navigate("LoginPage");
    } catch (error) {
      console.error("AuthProvider :: [LOGIN] - falha no login ", error);
    }
  };

  return { login, register };
};
