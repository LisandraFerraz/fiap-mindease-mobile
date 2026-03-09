import {
  IaccessTokens,
  IRegisterResponse,
  UsuarioLogin,
  UsuarioRegister,
  VerificaSenha,
} from "../../utils/models/user-model";
import { apiFetch } from "../core-api";
import UserDataStore from "../../stores/user-data-store";
import { endpoints } from "../env/endpoints";

export const UseAuth = () => {
  const { tokens } = UserDataStore();

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

  const verificaSenha = async (body: VerificaSenha) => {
    body = {
      ...body,
      usuarioId: tokens.usuarioId,
    };

    return await apiFetch<IRegisterResponse>({
      url: `${endpoints.verificaSenha}`,
      method: "POST",
      body: body,
    });
  };

  const atualizaaUsuario = async (body: Partial<UsuarioLogin>) => {
    return await apiFetch<IRegisterResponse>({
      url: `${endpoints.user}/${tokens.usuarioId}`,
      method: "PATCH",
      body: body,
    });
  };

  return { login, register, verificaSenha, atualizaaUsuario };
};
