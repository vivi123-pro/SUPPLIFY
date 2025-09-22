import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import { Package, Recycle, Heart, TrendingUp } from "lucide-react-native";
import { colors } from "@/theme/theme";

interface QuickActionCardProps {
  title: string;
  stat: string;
  icon: React.FC<any>;
  bgColor: string;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  icon: Icon,
  title,
  stat,
  bgColor,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
        <Icon color={"#fff"} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.info}>{stat}</Text>
      </View>
    </View>
  );
};

export default QuickActionCard;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "white",
    borderRadius: 10,
    gap: 10,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  iconContainer: {
    padding: 10,
    borderRadius: 16,
  },
  contentContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
  },
  info: {
    fontSize: 12,
    fontWeight: 400,
    color: colors.mutedForeground,
  },
});
