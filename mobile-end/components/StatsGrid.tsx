import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

const stats = [
  { label: "Saved", value: "₦2.5M", change: "+15%", color: "#059669" }, // text-emerald-600
  { label: "Suppliers", value: "45", change: "+8", color: "#2563eb" }, // text-blue-600
  { label: "Recycled", value: "1.2T", change: "+22%", color: "#d97706" }, // text-amber-600
];

export default function StatsGrid() {
  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardBackground} />

          <View style={styles.cardContent}>
            <Text style={[styles.valueText, { color: stat.color }]}>
              {stat.value}
            </Text>
            <Text style={styles.labelText}>{stat.label}</Text>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>{stat.change}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
  },
  card: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    borderRadius: 16,
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  cardContent: {
    position: "relative",
    padding: 16,
    alignItems: "center",
  },
  valueText: {
    fontSize: 18,
    fontWeight: "700",
  },
  labelText: {
    fontSize: 12,
    color: "#4b5563",
  },
  badge: {
    marginTop: 4,
    backgroundColor: "#ecfdf5",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 12,
    color: "#047857",
  },
});
