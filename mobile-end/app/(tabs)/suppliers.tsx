import { View, Text, ScrollView } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import SupplierHeader from "@/components/SupplierHeader";
import SupplyAndSurplusSearch from "@/components/SupplyAndSurplusSearch";

const Suppliers = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <ScrollView style={{ backgroundColor: "#fff" }}>
        <SupplierHeader />
        <SupplyAndSurplusSearch />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Suppliers;
