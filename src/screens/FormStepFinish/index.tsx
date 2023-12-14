import { StyleSheet, Text, View } from "react-native";

import { useAccountForm } from "../../hooks/useAccountForm";

export function FormStepFinish() {
  const { accountFormData } = useAccountForm();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nome: {accountFormData.name}</Text>

      <Text style={styles.text}>Email: {accountFormData.email}</Text>

      <Text style={styles.text}>
        Data de nascimento: {accountFormData.birth}
      </Text>

      <Text style={styles.text}>Celular: {accountFormData.phone}</Text>

      <Text style={styles.text}>Senha: {accountFormData.password}</Text>

      <Text style={styles.text}>
        Senha Confirmada: {accountFormData.passwordConfirmation}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
});
