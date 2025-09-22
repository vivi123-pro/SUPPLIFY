import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Recycle } from "lucide-react-native";

const ImpactCard = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#008751", "#10b981"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Recycle size={24} color="#fff" />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.title}>Sustainability Impact</Text>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Today's Tip</Text>
              </View>
            </View>
          </View>
          <Text style={styles.message}>
            Recycling 1 ton of aluminum saves 14,000 kWh of energy and reduces
            CO₂ emissions by 9 tons. Every deal makes a difference!
          </Text>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Explore Impact Deals</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: "hidden",
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  gradientBackground: {
    padding: 24,
  },
  content: {
    paddingTop: 8,
    paddingBottom: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#ffffff4d",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerText: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    maxWidth: 150,
  },
  tag: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 12,
    color: "white",
    fontWeight: "600",
  },
  message: {
    fontSize: 14,
    color: "white",
    lineHeight: 20,
    marginBottom: 24,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#008751",
  },
});

export default ImpactCard;
