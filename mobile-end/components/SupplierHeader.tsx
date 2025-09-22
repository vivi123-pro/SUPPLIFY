import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { ArrowLeft, PackageOpen } from "lucide-react-native";
import { colors } from "@/theme/theme";

const SupplierHeader = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push("/(tabs)")}>
        <ArrowLeft />
      </TouchableOpacity>
      <View>
        <View style={styles.iconTitleContainer}>
          <PackageOpen color={colors.primary} />
          <Text style={styles.title}>Suppliers Marketplace</Text>
        </View>

        <Text style={styles.desc}>Find the best materials and prices</Text>
      </View>
    </View>
  );
};

export default SupplierHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    padding: 24,
    paddingTop: 48,
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
  },
});
