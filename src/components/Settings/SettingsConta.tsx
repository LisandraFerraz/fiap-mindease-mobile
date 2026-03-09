import { FlatList, StyleSheet, View } from "react-native";
import { IPreferenciasOptions } from "../../utils/data/settings";
import { ThemedText } from "../ThemedText";
import { SettingsTemplate } from "./SettingsTemplate";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { useMemo, useState } from "react";
import InputText from "../ui/InputText";
import { UseAuth } from "../../core/hooks/useAuth";
import { UsuarioLogin, VerificaSenha } from "../../utils/models/user-model";
import UserDataStore from "../../stores/user-data-store";
import {
  hasEmptyValues,
  isValueEmpty,
} from "../../utils/functions/validate-empty-values";
import { Button } from "../ui/Button";
import {
  isAuthFormValid,
  isEmailValid,
} from "../../utils/functions/validate-auth";

interface ISConta {
  data: IPreferenciasOptions;
}

export const SettingsConta = ({ data }: ISConta) => {
  const { verificaSenha, atualizaaUsuario } = UseAuth();

  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), []);

  const [confirmPass, setConfirmPass] = useState<string>();
  const [passwordVerified, setPasswordVerified] = useState<boolean>(false);

  const [updatedUserCrend, setUpdatedUserCrend] =
    useState<Partial<UsuarioLogin>>();

  const handleVerificaSenha = () => {
    const body = {
      password: confirmPass,
    } as VerificaSenha;

    if (!hasEmptyValues(body)) {
      verificaSenha(body).then((res) =>
        setPasswordVerified(res.message === "VALIDO"),
      );
    }
  };

  const handleUpdateUserB = (field: keyof UsuarioLogin, value: string) => {
    setUpdatedUserCrend({
      ...updatedUserCrend,
      [field]: value,
    } as Partial<UsuarioLogin>);
  };

  const handeUpdateUser = () => {
    if (
      updatedUserCrend &&
      ((updatedUserCrend.password && updatedUserCrend.password.length > 6) ||
        (updatedUserCrend.email && isEmailValid(updatedUserCrend.email)))
    )
      atualizaaUsuario(updatedUserCrend).then(() =>
        setUpdatedUserCrend(new UsuarioLogin()),
      );
  };

  const isNewPasswordValid = (): boolean => {
    if (
      updatedUserCrend &&
      updatedUserCrend.password &&
      updatedUserCrend.password.length >= 6
    ) {
      return true;
    }
    return false;
  };

  const isNewEmailValid = (): boolean => {
    if (
      updatedUserCrend &&
      updatedUserCrend.email &&
      !isEmailValid(updatedUserCrend.email)
    ) {
      return true;
    }

    return false;
  };

  return (
    <SettingsTemplate data={data}>
      {passwordVerified && (
        <View style={styles.form_wrapper}>
          <ThemedText>Confirme sua senha</ThemedText>
          <ThemedText type="thin">
            Antes de alterar seus dados, confirme sua senha atual abaixo.
          </ThemedText>
          <InputText
            onChange={(e: string) => setConfirmPass(e)}
            value={confirmPass}
            placeholder="Digite aqui..."
          />
          <Button
            onClick={handleVerificaSenha}
            name="Confirmar"
            color="primary"
            disabled={isValueEmpty(confirmPass)}
          />
        </View>
      )}

      {!passwordVerified && (
        <View style={[styles.form_wrapper, { gap: 35 }]}>
          <View style={styles.form_wrapper}>
            <ThemedText>Alterar e-mail</ThemedText>
            <InputText
              onChange={(e: string) => handleUpdateUserB("email", e)}
              value={confirmPass}
              placeholder="Digite aqui..."
              errorMessage={isNewEmailValid() ? "(inválido)" : ""}
            />
          </View>
          <View style={styles.form_wrapper}>
            <ThemedText>Alterar senha</ThemedText>
            <ThemedText type="thin">Infrome uma senha com: </ThemedText>
            <View>
              <FlatList
                data={[
                  { key: "- 6 caracteres" },
                  { key: "- Deve conter pelo menos 1 (um) número" },
                  { key: "- Deve conter pelo menos 1 (um) caractere especial" },
                ]}
                renderItem={({ item }) => (
                  <ThemedText type="thin">{item.key}</ThemedText>
                )}
              />
            </View>
            <InputText
              onChange={(e: string) => handleUpdateUserB("password", e)}
              value={confirmPass}
              placeholder="Digite aqui..."
              errorMessage={isNewPasswordValid() ? "(inválido)" : ""}
            />
          </View>
          <Button
            disabled={!isNewPasswordValid() || isNewEmailValid()}
            onClick={handeUpdateUser}
            name="Confirmar"
            color="primary"
          />
        </View>
      )}
    </SettingsTemplate>
  );
};

export const stylesSheet = (colors: any) =>
  StyleSheet.create({
    wrapper: {
      flexDirection: "column",
      gap: 25,
    },
    divider: {
      width: "100%",
      height: 1,
      marginBottom: 15,
      backgroundColor: colors.border_color,
    },
    form_wrapper: { gap: 15 },
  });
