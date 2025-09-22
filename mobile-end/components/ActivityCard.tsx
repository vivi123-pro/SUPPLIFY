import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

interface ActivityItem {
  id: string;
  activity: string;
  time: string;
  dotColor: string;
}

const recentActivityData: ActivityItem[] = [
  {
    id: "1",
    activity: "New supplier verified",
    time: "2 min ago",
    dotColor: "#10b981",
  },
  {
    id: "2",
    activity: "Surplus deal completed",
    time: "1 hour ago",
    dotColor: "#d97706cb",
  },
  {
    id: "3",
    activity: "₦15K saved on aluminum",
    time: "3 hours ago",
    dotColor: "#2563ebcb",
  },
];

const renderActivityItem = ({ item }: { item: ActivityItem }) => (
  <View style={styles.activityItem}>
    <View style={[styles.dot, { backgroundColor: item.dotColor }]} />
    <View style={styles.textContainer}>
      <Text style={styles.activityText}>{item.activity}</Text>
      <Text style={styles.timeText}>{item.time}</Text>
    </View>
  </View>
);

const ActivityCard = () => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.header}>Recent Activity</Text>
      <FlatList
        data={recentActivityData}
        renderItem={renderActivityItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  timeText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 12,
  },
});

export default ActivityCard;
