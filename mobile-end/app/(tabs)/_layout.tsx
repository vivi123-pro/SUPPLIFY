import { Tabs } from "expo-router";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Home, Package, Recycle, BarChart3, User } from "lucide-react-native";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { colors } from "@/theme/theme";

// Your TabIcon component is fine, no changes needed here.
function TabIcon({ icon: Icon, focused, color, size, title }: any) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 70,
      }}
    >
      {focused && (
        <View
          style={{
            width: 25,
            height: 3,
            borderRadius: 999,
            backgroundColor: "#059669",
            marginBottom: 6,
            shadowColor: "#059669",
            shadowOpacity: 0.6,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 0 },
            elevation: 5,
          }}
        />
      )}
      <View
        style={{
          padding: 6,
          borderRadius: 20,
          backgroundColor: focused ? "#ECFDF5" : "transparent",
          marginBottom: 4,
          shadowColor: focused ? "#059669" : "transparent",
          shadowOpacity: focused ? 0.3 : 0,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
          elevation: focused ? 5 : 0,
        }}
      >
        <Icon color={color} size={size} />
      </View>
      <Text
        style={{
          fontSize: 12,
          fontWeight: focused ? "700" : "500",
          color: color,
          textAlign: "center",
          flexWrap: "nowrap",
        }}
        numberOfLines={1}
      >
        {title}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const isAndroid = Platform.OS === "android";

  const tabBarHeight = isAndroid ? 40 + insets.bottom : 70 + insets.bottom;

  const bottom = isAndroid ? 50 : 10;
  const marHori = isAndroid ? 10 : 15;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#059669",
          tabBarStyle: {
            backgroundColor: "transparent",
            borderTopWidth: 0,
            elevation: 0,
            position: "absolute",
            bottom: bottom,
            left: 15,
            right: 15,
            height: tabBarHeight,
            paddingBottom: insets.bottom,
            paddingTop: 20,
            marginHorizontal: marHori,
          },
          tabBarBackground: () => {
            // Conditionally render based on platform
            if (isAndroid) {
              return (
                <View
                  style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    borderRadius: 25,
                    overflow: "hidden",
                  }}
                />
              );
            }
            return (
              <BlurView
                intensity={8}
                tint="light"
                style={{
                  ...StyleSheet.absoluteFillObject,
                  borderRadius: 25,
                  overflow: "hidden",
                }}
              />
            );
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon
                icon={Home}
                focused={focused}
                color={color}
                size={size}
                title="Home"
              />
            ),
          }}
        />

        <Tabs.Screen
          name="suppliers"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon
                icon={Package}
                focused={focused}
                color={color}
                size={size}
                title="Suppliers"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="surplus"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon
                icon={Recycle}
                focused={focused}
                color={color}
                size={size}
                title="Surplus"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="analytics"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon
                icon={BarChart3}
                focused={focused}
                color={color}
                size={size}
                title="Analytics"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon
                icon={User}
                focused={focused}
                color={color}
                size={size}
                title="Profile"
              />
            ),
          }}
        />
       <Tabs.Screen
       name="supplier/[id]"
       options={{href: null}}
       />
      </Tabs>
    </View>
  );
}
