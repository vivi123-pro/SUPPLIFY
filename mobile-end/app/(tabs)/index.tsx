import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import HomeHeader from "@/components/HomeHeader";
import StatsGrid from "@/components/StatsGrid";
import { colors } from "@/theme/theme";
import QuickActionCard from "@/components/QuickActionCard";
import { Heart, Package, Recycle, TrendingUp } from "lucide-react-native";
import ImpactCard from "@/components/ImpactCard";
import ActivityCard from "@/components/ActivityCard";

const data = [
  {
    key: "1",
    icon: Package,
    title: "Raw Materials",
    stat: "120+ suppliers",
    bgColor: "#008751",
  },
  {
    key: "2",
    icon: Recycle,
    title: "Surplus Deals",
    stat: "45 active deals",
    bgColor: "#fbbf24",
  },
  {
    key: "3",
    icon: Heart,
    title: "Favorites",
    stat: "12 saved",
    bgColor: "#e0327a",
  },
  {
    key: "4",
    icon: TrendingUp,
    title: "Analytics",
    stat: "View reports",
    bgColor: "#2563eb",
  },
];

const Index = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primaryForeground,
      }}
    >
      <StatusBar style="dark" />
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <QuickActionCard
              icon={item.icon}
              title={item.title}
              stat={item.stat}
              bgColor={item.bgColor}
            />
          </View>
        )}
        keyExtractor={(item) => item.key}
        ListHeaderComponent={() => (
          <>
            <HomeHeader />
            <StatsGrid />
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </>
        )}
        ListFooterComponent={() => (
          <>
            <ImpactCard />
            <View style={{ paddingBottom: 70 }}>
              <ActivityCard />
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    padding: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
});

export default Index;
