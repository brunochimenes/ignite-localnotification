import { useRef } from "react";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createBox, createText } from "@shopify/restyle";
import { useForm } from "react-hook-form";

import { ThemeProps } from "../../theme";

import { AccountProps } from "../../contexts/AccountFormContext";

import { useAccountForm } from "../../hooks/useAccountForm";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Progress } from "../../components/Progress";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function FormStepThree() {
  const { navigate } = useNavigation();
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
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
    <Box flex={1} justifyContent="center" bg="gray_600" p="l" gap="m">
      <Progress progress={100} />

      <Text color="purple" variant="title" mb="xl">
        Escolha sua senha
      </Text>

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
        buttonProps={{
          onPress: () => {
            reset({
              ...getValues(),
              password: "",
            });
          },
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
        buttonProps={{
          onPress: () => {
            reset({
              ...getValues(),
              passwordConfirmation: "",
            });
          },
        }}
      />

      <Button title="Continuar" onPress={handleSubmit(handleNextStep)} />
    </Box>
  );
}
