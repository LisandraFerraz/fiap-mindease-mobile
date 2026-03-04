import { StyleSheet, View } from "react-native";
import InputText from "../../../../components/ui/InputText";
import { useState } from "react";
import { isAuthFormValid } from "../../../../utils/functions/validate-auth";
import { UsuarioRegister } from "../../../../utils/models/user-model";
import { AuthTemplate } from "../AuthTemplate";
import { UseAuth } from "../../../../core/hooks/useAuth";

export function SignUpPage() {
  const { register } = UseAuth();

  const [signUpBody, setSignUp] = useState<UsuarioRegister>({
    email: "",
    password: "",
    nome: "",
  });
  const [confirmPass, setConfirmPass] = useState<string>();

  const prepareBody = (field: keyof UsuarioRegister, value: string) => {
    setSignUp({
      ...signUpBody,
      [field]: value,
    });
  };

  const handleSignup = () => {
    if (!isAuthFormValid(signUpBody) && signUpBody.password === confirmPass) {
      register(signUpBody);
    }
  };

  const isBodyValid = () => {
    return !isAuthFormValid(signUpBody) && signUpBody.password === confirmPass;
  };

  return (
    <AuthTemplate
      body={signUpBody}
      handleClick={handleSignup}
      navigateTo="LoginPage"
      linkName="Já tenho conta"
      btnDisabled={!isBodyValid()}
    >
      <View style={stylesSheet.form_container}>
        <InputText
          label="nome"
          placeholder="Seu Nome"
          onChange={(e: any) => prepareBody("email", e)}
        />
        <InputText
          label="e-mail"
          placeholder="seu@email.com"
          onChange={(e: any) => prepareBody("email", e)}
        />
        <InputText
          label="senha"
          placeholder="******"
          onChange={(e: any) => prepareBody("password", e)}
        />
        <InputText
          label="confirmar senha"
          placeholder="******"
          onChange={setConfirmPass}
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
