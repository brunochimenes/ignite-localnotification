import { StyleSheet, View } from "react-native";

type Props = {
  progress: number;
};

export function Progress({ progress }: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.progress, { width: `${progress}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 4,
    backgroundColor: "#DEDEDE",
  },
  progress: {
    height: 4,
    backgroundColor: "#8257E5",
  },
});
