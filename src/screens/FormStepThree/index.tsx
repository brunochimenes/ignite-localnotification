import { useRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { AccountProps } from "../../contexts/AccountFormContext";
import { useAccountForm } from "../../hooks/useAccountForm";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Progress } from "../../components/Progress";

export function FormStepThree() {
  const { navigate } = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<AccountProps>();

  const { updateFormData } = useAccountForm();

  const passwordConfirmationRef = useRef<TextInput>(null);

  function handleNextStep(data: AccountProps) {
    updateFormData(data);

    navigate("formStepFinish");
  }

  function validationPasswordConfirmation(passwordConfirmation: string) {
    const { password } = getValues();

    return password === passwordConfirmation || "Senhas devem ser iguais.";
  }

  return (
    <View style={styles.container}>
      <Progress progress={100} />

      <Text style={styles.title}>Escolha sua senha</Text>

      <Input
        icon="key"
        error={errors.password?.message}
        formProps={{
          name: "password",
          control,
          rules: {
            required: "Senha é obrigatório.",
            minLength: {
              value: 6,
              message: "Senha deve conter no mínimo 6 dígitos.",
            },
          },
        }}
        inputProps={{
          placeholder: "Senha",
          onSubmitEditing: () => passwordConfirmationRef.current?.focus(),
          returnKeyType: "next",
          secureTextEntry: true,
        }}
      />

      <Input
        ref={passwordConfirmationRef}
        icon="key"
        error={errors.passwordConfirmation?.message}
        formProps={{
          name: "passwordConfirmation",
          control,
          rules: {
            required: "Confirme a senha.",
            validate: validationPasswordConfirmation,
          },
        }}
        inputProps={{
          placeholder: "Confirme a senha",
          onSubmitEditing: handleSubmit(handleNextStep),
          secureTextEntry: true,
        }}
      />

      <Button title="Continuar" onPress={handleSubmit(handleNextStep)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F6",
    justifyContent: "center",
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 44,
  },
});
