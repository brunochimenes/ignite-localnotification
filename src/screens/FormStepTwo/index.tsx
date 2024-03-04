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

export function FormStepTwo() {
  const { navigate } = useNavigation();
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<AccountProps>();

  const { updateFormData } = useAccountForm();

  const phoneRef = useRef<TextInput>(null);

  function handleNextStep(data: AccountProps) {
    updateFormData(data);

    navigate("formStepThree");
  }

  return (
    <Box flex={1} justifyContent="center" bg="gray_600" p="l" gap="m">
      <Progress progress={60} />

      <Text color="purple" variant="title" mb="xl">
        Suas informações
      </Text>

      <Input
        icon="calendar"
        error={errors.birth?.message}
        formProps={{
          name: "birth",
          control,
          rules: {
            required: "Data de nascimento é obrigatório.",
            pattern: {
              value:
                /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
              message: "Data de nascimento inválida.",
            },
          },
        }}
        inputProps={{
          placeholder: "Data de nascimento",
          onSubmitEditing: () => phoneRef.current?.focus(),
          returnKeyType: "next",
        }}
        buttonProps={{
          onPress: () => {
            reset({
              ...getValues(),
              birth: "",
            });
          },
        }}
      />

      <Input
        ref={phoneRef}
        icon="phone"
        error={errors.phone?.message}
        formProps={{
          name: "phone",
          control,
          rules: {
            required: "Número de telefone é obrigatório.",
            pattern: {
              value:
                /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{5}))$/,
              message: "Telefone inválido.",
            },
          },
        }}
        inputProps={{
          placeholder: "Número de telefone",
          onSubmitEditing: handleSubmit(handleNextStep),
        }}
        buttonProps={{
          onPress: () => {
            reset({
              ...getValues(),
              phone: "",
            });
          },
        }}
      />

      <Button title="Continuar" onPress={handleSubmit(handleNextStep)} />
    </Box>
  );
}
