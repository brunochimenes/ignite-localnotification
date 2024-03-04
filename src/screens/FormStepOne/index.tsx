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

export function FormStepOne() {
  const { navigate } = useNavigation();
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<AccountProps>();

  const { updateFormData } = useAccountForm();

  const emailRef = useRef<TextInput>(null);

  function handleNextStep(data: AccountProps) {
    updateFormData(data);

    navigate("formStepTwo");
  }

  return (
    <Box flex={1} justifyContent="center" bg="gray_600" p="l" gap="m">
      <Progress progress={30} />

      <Text color="purple" variant="title" mb="xl">
        Crie sua conta
      </Text>

      <Input
        icon="user"
        error={errors.name?.message}
        formProps={{
          name: "name",
          control,
          rules: {
            required: "Nome é obrigatório.",
          },
        }}
        inputProps={{
          placeholder: "Nome",
          onSubmitEditing: () => emailRef.current?.focus(),
          returnKeyType: "next",
        }}
        buttonProps={{
          onPress: () => {
            reset({
              ...getValues(),
              name: "",
            });
          },
        }}
      />

      <Input
        ref={emailRef}
        icon="mail"
        error={errors.email?.message}
        formProps={{
          name: "email",
          control,
          rules: {
            required: "E-mail é obrigatório.",
            pattern: {
              value:
                /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
              message: "E-mail inválido.",
            },
          },
        }}
        inputProps={{
          placeholder: "E-mail",
          onSubmitEditing: handleSubmit(handleNextStep),
        }}
        buttonProps={{
          onPress: () => {
            reset({
              ...getValues(),
              email: "",
            });
          },
        }}
      />

      <Button title="Continuar" onPress={handleSubmit(handleNextStep)} />
    </Box>
  );
}
