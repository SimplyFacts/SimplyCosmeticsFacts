import { View, Text, Pressable, Animated } from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { useState, useRef, useEffect } from "react";
import { getFontSizes } from "@/utils/productPreferences";

export function CollapsibleSection({
  title,
  count,
  children,
  fontSize = "medium",
  defaultExpanded = false,
  expandedOverride, // External control: when set, overrides defaultExpanded
  badgeColor = "#10B981",
  badgeTextColor = "#fff",
  icon = "📋",
  backgroundColor = "#F0FDF4",
  color = "#10B981",
}) {
  const fonts = getFontSizes(fontSize);
  const initialExpanded =
    expandedOverride !== undefined ? expandedOverride : defaultExpanded;
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const rotateAnim = useRef(
    new Animated.Value(initialExpanded ? 1 : 0),
  ).current;

  // React to external override changes
  useEffect(() => {
    if (expandedOverride !== undefined) {
      setIsExpanded(expandedOverride);
    }
  }, [expandedOverride]);

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Determine badge text and styling
  const showBadge = count !== null && count !== undefined;
  const isNoneFound = count === 0 || count === "0";
  const badgeText = showBadge ? count.toString() : "";

  // Visual prominence for sections with items
  const hasItems = !isNoneFound && count > 0;
  const sectionBackgroundColor = hasItems ? backgroundColor : "#F9FAFB";
  const borderLeftWidth = hasItems ? 6 : 0;
  const borderLeftColor = hasItems ? color : "transparent";

  return (
    <View
      style={{
        marginBottom: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#fff",
        overflow: "hidden",
        borderLeftWidth: borderLeftWidth,
        borderLeftColor: borderLeftColor,
      }}
    >
      {/* Tile Header */}
      <Pressable
        onPress={toggleExpand}
        style={{
          backgroundColor: sectionBackgroundColor,
          padding: 16,
          flexDirection: "column",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
              gap: 12,
            }}
          >
            <Text style={{ fontSize: 32 }}>{icon}</Text>
            <Text
              style={{
                fontSize: fonts.sectionHeader,
                fontWeight: "600",
                color: color,
                flex: 1,
              }}
              numberOfLines={2}
            >
              {title}
            </Text>
          </View>

          {showBadge && (
            <View
              style={{
                backgroundColor: "#FFFFFF",
                opacity: 0.7,
                paddingHorizontal: 12,
                paddingVertical: 7,
                borderRadius: 14,
                minWidth: 32,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 8,
                borderWidth: 1,
                borderColor: "#E5E7EB",
              }}
            >
              <Text
                style={{
                  fontSize: fonts.tagText * 1.5,
                  fontWeight: "700",
                  color: "#111827",
                }}
              >
                {badgeText}
              </Text>
            </View>
          )}

          <View
            style={{
              backgroundColor: color,
              width: 24,
              height: 24,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 8,
            }}
          >
            {isExpanded ? (
              <ChevronUp size={14} color="#fff" />
            ) : (
              <ChevronDown size={14} color="#fff" />
            )}
          </View>
        </View>
      </Pressable>

      {/* Collapsible content */}
      {isExpanded && children && (
        <View style={{ padding: 16, paddingTop: 12 }}>{children}</View>
      )}
    </View>
  );
}
