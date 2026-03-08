import { Text } from "react-native";

export function SectionHeader({ title }) {
  return (
    <Text
      style={{
        fontSize: 13,
        fontWeight: "600",
        color: "#6B7280",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginBottom: 12,
        paddingHorizontal: 20,
      }}
    >
      {title}
    </Text>
  );
}
