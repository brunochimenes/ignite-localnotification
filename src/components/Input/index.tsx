import { forwardRef } from "react";
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { createBox, createText } from "@shopify/restyle";
import clsx from "clsx";
import { Controller, UseControllerProps } from "react-hook-form";
import { Feather } from "@expo/vector-icons";

import { ThemeProps, theme } from "../../theme";

const Box = createBox<ThemeProps>();
const TextInputBase = createBox<ThemeProps>(TextInput);
const Text = createText<ThemeProps>();

type Props = {
  icon: keyof typeof Feather.glyphMap;
  formProps: UseControllerProps;
  inputProps: TextInputProps;
  buttonProps: TouchableOpacityProps;
  error?: string;
};

const Input = forwardRef<TextInput, Props>(
  ({ icon, formProps, inputProps, buttonProps, error = "" }, ref) => {
    return (
      <Box width="100%">
        <Controller
          render={({ field }) => (
            <Box
              flexDirection="row"
              width="100%"
              height={56}
              alignItems="center"
              bg="gray_100"
              borderRadius={4}
              overflow="hidden"
            >
              <Box
                width={56}
                height={56}
                justifyContent="center"
                alignItems="center"
                borderRightWidth={2}
                borderRightColor="gray_200"
                overflow="hidden"
              >
                <Feather
                  name={icon}
                  size={24}
                  color={clsx({
                    [theme.colors.Danger]: error.length > 0,
                    [theme.colors.purple]: error.length === 0 && field.value,
                    [theme.colors.gray_300]: !field.value && error.length === 0,
                  })}
                />
              </Box>

              <TextInputBase
                flex={1}
                pl="m"
                style={{ fontSize: 16 }}
                ref={ref}
                placeholderTextColor={theme.colors.gray_300}
                value={field.value}
                onChangeText={field.onChange}
                {...inputProps}
              />

              <TouchableOpacity activeOpacity={0.7} {...buttonProps}>
                <Box mr="m">
                  <Feather
                    name="x"
                    size={24}
                    color={clsx({
                      [theme.colors.Danger]: error.length > 0,
                      [theme.colors.purple]: error.length === 0 && field.value,
                      [theme.colors.gray_300]:
                        !field.value && error.length === 0,
                    })}
                  />
                </Box>
              </TouchableOpacity>
            </Box>
          )}
          {...formProps}
        />

        {error.length > 0 && (
          <Text color="Danger" fontSize={14} mt="s">
            {error}
          </Text>
        )}
      </Box>
    );
  }
);

export { Input };
