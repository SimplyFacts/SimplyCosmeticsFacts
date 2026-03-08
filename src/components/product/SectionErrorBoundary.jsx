import React from "react";
import { View, Text } from "react-native";
import { AlertTriangle } from "lucide-react-native";

export class SectionErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(
      `SectionErrorBoundary caught error in "${this.props.sectionName || "unknown section"}":`,
      error,
      errorInfo,
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{
            backgroundColor: "#FEF3C7",
            borderRadius: 8,
            padding: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: "#FCD34D",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AlertTriangle size={18} color="#D97706" />
          <Text
            style={{
              fontSize: 14,
              color: "#92400E",
              marginLeft: 8,
              flex: 1,
            }}
          >
            Could not load{" "}
            {this.props.sectionName
              ? this.props.sectionName.toLowerCase()
              : "this section"}
            .
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}
