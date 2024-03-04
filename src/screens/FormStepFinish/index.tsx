import { createBox, createText } from "@shopify/restyle";

import { ThemeProps } from "../../theme";

import { useAccountForm } from "../../hooks/useAccountForm";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function FormStepFinish() {
  const { accountFormData } = useAccountForm();

  return (
    <Box flex={1} justifyContent="center" alignItems="center" bg="gray_600">
      <Text color="gray_100">Nome: {accountFormData.name}</Text>

      <Text color="gray_100">Email: {accountFormData.email}</Text>

      <Text color="gray_100">Data de nascimento: {accountFormData.birth}</Text>

      <Text color="gray_100">Celular: {accountFormData.phone}</Text>

      <Text color="gray_100">Senha: {accountFormData.password}</Text>

      <Text color="gray_100">
        Senha Confirmada: {accountFormData.passwordConfirmation}
      </Text>
    </Box>
  );
}
