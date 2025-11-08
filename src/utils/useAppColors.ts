import { useColorScheme } from "react-native";

export function useAppColors() {
  const colorScheme = useColorScheme();
  return {
    backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
    textColor: colorScheme === "dark" ? "#fff" : "#000",
    placeholderColor: colorScheme === "dark" ? "#aaa" : "#888",
  };
}
