import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { ArrowLeft, Plus, Recycle } from "lucide-react-native";
import { colors } from "@/theme/theme";

const SurplusHeader = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push("/(tabs)")}>
        <ArrowLeft />
      </TouchableOpacity>

      <View>
        <View style={styles.iconTitleContainer}>
          <Recycle color={colors.accent} />
          <Text style={styles.title}>Surplus Exchange</Text>
        </View>

        <Text style={styles.desc}>Turn surplus materials into opportuity</Text>
      </View>
      <TouchableOpacity style={styles.listBtn}>
        <Plus color={colors.primaryForeground} size={17} />
        <Text
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: colors.primaryForeground,
          }}
        >
          List Surplus
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SurplusHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 24,
    paddingHorizontal: 24,
    paddingTop: 48,
    justifyContent: "space-between",
  },

  rightHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconTitleContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: 600,
  },
  desc: {
    fontSize: 12,
    fontWeight: 400,
    color: colors.mutedForeground,
    width: 150,
  },

  listBtn: {
    backgroundColor: colors.accent,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 20,
    gap: 5,
  },
});
