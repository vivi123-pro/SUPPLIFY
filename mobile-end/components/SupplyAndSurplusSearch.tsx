import {
  View,
  Platform,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Search } from "lucide-react-native";
import { colors } from "@/theme/theme";

const SupplyAndSurplusSearch = () => {
  const [query, setQuery] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBarInner}>
          <Search style={styles.searchIcon} />
          <TextInput
            placeholder="Search materials, suppliers, locatio..."
            placeholderTextColor="#9ca3af"
            style={styles.searchInput}
            onChangeText={setQuery}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.find}>
        <Text style={styles.findInner}>Find</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SupplyAndSurplusSearch;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: 7,
    marginBottom: 20,
  },
  searchBarContainer: {
    position: "relative",
    width: "80%",
  },
  searchBarInner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    borderRadius: 25,

    backgroundColor: "rgba(255, 255, 255, 1)",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  searchIcon: {
    position: "absolute",
    left: 16,
    height: 20,
    width: 20,
    color: "#9ca3af",
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 48,
    paddingRight: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 0,
    backgroundColor: "rgba(255, 255, 255, 1)",
    color: "#1a1a1a",
  },
  find: {
    backgroundColor: colors.primary,
    paddingVertical: 13,
    paddingHorizontal: 17,
    borderRadius: 30,
  },
  findInner: {
    color: "#fff",
    fontSize: 14,
    fontWeight: 500,
  },
});
