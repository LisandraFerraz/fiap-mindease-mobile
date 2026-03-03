import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { UsuarioLogin } from "../../../../utils/models/user-model";

import InputText from "../../../../components/ui/InputText";
import {
  isAuthFormValid,
  isEmailValid,
} from "../../../../utils/functions/validate-auth";
import { useAuth } from "../../../../core/context/AuthContext";
import { AuthTemplate } from "../AuthTemplate";

export default function AuthPage() {
  const { login } = useAuth();

  const [loginBody, setLoginBody] = useState<UsuarioLogin>({
    email: "",
    password: "",
  });

  const prepareBody = (field: string, value: string) => {
    setLoginBody({
      ...loginBody,
      [field]: value,
    });
  };

  const handleLogin = () => {
    if (isAuthFormValid(loginBody)) {
      login(loginBody);
    }
  };

  return (
    <AuthTemplate
      body={loginBody}
      handleClick={handleLogin}
      navigateTo="SignUpPage"
      linkName="Criar conta"
      btnDisabled={!isAuthFormValid(loginBody)}
    >
      <View style={stylesSheet.form_container}>
        <InputText
          errorMessage={
            loginBody.email && !isEmailValid(loginBody.email)
              ? "(inválido)"
              : ""
          }
          label="e-mail"
          placeholder="seu@email.com"
          onChange={(e: any) => prepareBody("email", e)}
        />
        <InputText
          errorMessage={
            loginBody.password && loginBody.password.length < 6
              ? "(inválido)"
              : ""
          }
          label="senha"
          placeholder="******"
          onChange={(e: any) => prepareBody("password", e)}
        />
      </View>
    </AuthTemplate>
  );
}

const stylesSheet = StyleSheet.create({
  form_container: {
    gap: 20,
    width: "100%",
    paddingVertical: 20,
    borderRadius: 10,
  },
});
