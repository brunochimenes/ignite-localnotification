import { useRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

import { AccountProps } from "../../contexts/AccountFormContext";
import { useAccountForm } from "../../hooks/useAccountForm";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Progress } from "../../components/Progress";

export function FormStepTwo() {
  const { navigate } = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountProps>();

  const { updateFormData } = useAccountForm();

  const phoneRef = useRef<TextInput>(null);

  function handleNextStep(data: AccountProps) {
    updateFormData(data);

    navigate("formStepThree");
  }

  return (
    <View style={styles.container}>
      <Progress progress={60} />

      <Text style={styles.title}>Suas informações</Text>

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
