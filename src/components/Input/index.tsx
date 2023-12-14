import { forwardRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import clsx from "clsx";
import { Controller, UseControllerProps } from "react-hook-form";
import { Feather } from "@expo/vector-icons";

type Props = {
  icon: keyof typeof Feather.glyphMap;
  formProps: UseControllerProps;
  inputProps: TextInputProps;
  error?: string;
};

const Input = forwardRef<TextInput, Props>(
  ({ icon, formProps, inputProps, error = "" }, ref) => {
    return (
      <View style={styles.container}>
        <Controller
          render={({ field }) => (
            <View style={styles.group}>
              <View style={styles.icon}>
                <Feather
                  name={icon}
                  size={24}
                  color={clsx({
                    ["#DC1637"]: error.length > 0,
                    ["#8257E5"]: error.length === 0 && field.value,
                    ["#999999"]: !field.value && error.length === 0,
                  })}
                />
              </View>

              <TextInput
                ref={ref}
                value={field.value}
                onChangeText={field.onChange}
                style={styles.control}
                {...inputProps}
              />
            </View>
          )}
          {...formProps}
        />

        {error.length > 0 && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  group: {
    width: "100%",
    height: 56,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  icon: {
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRightWidth: 3,
    borderRightColor: "#F4F5F6",
  },
  control: {
    flex: 1,
    paddingLeft: 16,
    fontSize: 16,
  },
  error: {
    fontSize: 14,
    marginTop: 7,
    color: "#DC1637",
  },
});

export { Input };
