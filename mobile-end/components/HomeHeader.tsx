import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Animated,
  TextInput,
  Pressable,
} from "react-native";
import { User, Bell, Search } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { colors } from "@/theme/theme";

export default function HomeScreenHeader() {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [pulseAnim]);

  const pulseScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  const router = useRouter();

  const username = "Ade Manufacturing";

  return (
    <View style={styles.container}>
      {/* Background Pattern */}
      <LinearGradient
        colors={["#fff", "#baf1da63", "#fff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <View style={styles.profileSection}>
              <View style={styles.userIconContainer}>
                <User style={styles.userIcon} />
              </View>
              <View>
                <Text style={styles.greetingText}>
                  Hello,{" "}
                  {username.length < 8
                    ? username
                    : username.slice(0, 8) + "..."}
                </Text>
                <Text style={styles.welcomeText}>Welcome back to Supplify</Text>
              </View>
            </View>

            <View style={styles.notificationContainer}>
              <Pressable onPress={() => {}} style={styles.notificationButton}>
                <Bell style={styles.bellIcon} />
              </Pressable>
              <Animated.View
                style={[
                  styles.notificationDot,
                  { transform: [{ scale: pulseScale }] },
                ]}
              />
            </View>
          </View>

          {/* Search Bar */}
          <Pressable
            style={styles.searchBarContainer}
            onPress={() => router.push("/(tabs)/suppliers")}
          >
            <View style={styles.searchBarInner}>
              <Search style={styles.searchIcon} />
              <Text style={styles.searchInput}>
                Find suppliers, surplus deals, mat...
              </Text>
            </View>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
  },
  content: {
    position: "relative",
    padding: 24,
    paddingTop: 48,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  userIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#008751",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  userIcon: {
    height: 24,
    width: 24,
    color: "white",
  },
  greetingText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  welcomeText: {
    fontSize: 14,
    color: "#4b5563",
  },
  notificationContainer: {
    position: "relative",
  },
  notificationButton: {
    padding: 10,
    borderRadius: 16,
    borderWidth: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  bellIcon: {
    height: 20,
    width: 20,
  },
  notificationDot: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 12,
    height: 12,
    backgroundColor: "#ef4444",
    borderRadius: 999,
  },
  searchBarContainer: {
    position: "relative",
    marginBottom: 24,
  },
  searchBarInner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    borderRadius: 25,
    elevation: 1,
    ...Platform.select({
      ios: {
        backgroundColor: "rgba(255, 255, 255, 1)",
      },
      android: {
        backgroundColor: "rgba(255, 255, 255, 1)",
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
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 0,
    backgroundColor: "rgba(255, 255, 255, 1)",
    color: colors.mutedForeground,
  },
});
