import { createBox } from "@shopify/restyle";

import { ThemeProps } from "../../theme";

const Box = createBox<ThemeProps>();

type Props = {
  progress: number;
};

export function Progress({ progress }: Props) {
  return (
    <Box width="100%" height={4} bg="gray_100">
      <Box width={`${progress}%`} height={4} backgroundColor="purple" />
    </Box>
  );
}
