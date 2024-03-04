import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { createBox, createText } from "@shopify/restyle";

import { ThemeProps } from "../../theme";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

type Props = TouchableOpacityProps & {
  title: string;
};

export function Button({ title, ...rest }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.7} {...rest}>
      <Box
        width="100%"
        height={56}
        justifyContent="center"
        alignItems="center"
        backgroundColor="purple"
        borderRadius={4}
      >
        <Text color="gray_100">{title}</Text>
      </Box>
    </TouchableOpacity>
  );
}
