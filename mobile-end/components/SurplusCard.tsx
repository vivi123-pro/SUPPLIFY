import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";

import React from "react";
import { Image } from "expo-image";
import {
  BadgeCheck,
  MapPin,
  MessageCircleDashed,
  Star,
  Users,
} from "lucide-react-native";

import { colors } from "@/theme/theme";

interface SellerDetail {
  img: string;
  name: string;
  material: string;
  verified: boolean;
  price: number;
  location: string;
  pending: boolean;
}

const blurhash = "|rF?hV%2.o\n...";

const SurplusCard: React.FC<SellerDetail> = ({
  img = "",
  name,
  material,
  verified,
  price,
  location,
  pending,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View style={styles.topLeft}>
          <View style={styles.imageContainer}>
            {img === "" ? (
              <View style={styles.userIconContainer}>
                <Users style={styles.userIcon} />
              </View>
            ) : (
              <Image
                style={styles.image}
                source={img}
                placeholder={blurhash}
                contentFit="cover"
                transition={1000}
              />
            )}
          </View>
          <View style={styles.detail}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.material}>{material} </Text>
          </View>
        </View>
        <View style={styles.topRight}>
          <Text style={styles.price}>₦{price.toLocaleString()}</Text>
          <Text style={styles.quantity}>per ton</Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.bottom1}>
          <View style={styles.mapContainer}>
            <View style={styles.dot} />
            <View style={styles.locationContainer}>
              <MapPin color={colors.mutedForeground} size={15} />
              <Text style={styles.location}>{location}</Text>
            </View>
            <View style={[styles.locationContainer]}>
              <View
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: colors.mutedForeground,
                  borderRadius: "50%",
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: colors.mutedForeground,
                  fontWeight: 500,
                }}
              >
                2.3 km
              </Text>
            </View>
          </View>

          {pending ? (
            <View
              style={[styles.stockContainer, { backgroundColor: "#fce09b56" }]}
            >
              <Text style={[styles.stock, { color: colors.chart4 }]}>
                Pending
              </Text>
            </View>
          ) : (
            <View
              style={[styles.stockContainer, { backgroundColor: "#a4ffe156" }]}
            >
              <Text style={[styles.stock, { color: colors.primary }]}>
                Available
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.whatsapp}>
          <MessageCircleDashed color={"#fff"} />
          <Text style={styles.whatsappText}>Contact via WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SurplusCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primaryForeground,
    paddingHorizontal: 13,
    paddingVertical: 20,
    borderRadius: 20,
    borderTopWidth: 3,
    borderTopColor: colors.accent,
    marginHorizontal: 7,
    gap: 20,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
      },

      android: {
        elevation: 5,
      },
    }),
  },
  imageContainer: {
    width: 48,
    height: 48,
    borderRadius: 50,
    marginRight: 10,
    overflow: "hidden",
  },

  image: {
    flex: 1,
    backgroundColor: "#0553",
  },

  userIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent,
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

  name: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 5,
  },

  material: {
    fontSize: 15,
    color: colors.mutedForeground,
    fontWeight: 500,
  },

  topLeft: {
    flexDirection: "row",
    flexGrow: 3,
  },

  detail: {
    width: "50%",
  },

  price: {
    fontSize: 18,
    fontWeight: 800,
    color: "#d97706",
  },

  quantity: {
    fontSize: 14,
    color: colors.mutedForeground,
  },

  topRight: {
    alignItems: "flex-end",
    gap: 5,
    flexGrow: 1,
  },

  top: {
    flexDirection: "row",
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: colors.accent,
    borderRadius: "50%",
    marginRight: 2,
  },
  locationContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  location: {
    fontSize: 15,
    color: colors.mutedForeground,
    fontWeight: 600,
  },
  mapContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  stockContainer: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  stock: {
    fontSize: 14,
    fontWeight: 600,
  },
  bottom1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stars: {
    flexDirection: "row",
  },
  stats: {
    flexDirection: "row",
    gap: 3,
  },
  rating: {
    flexDirection: "row",
    gap: 5,
  },
  whatsapp: {
    backgroundColor: colors.accent,
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  whatsappText: {
    fontSize: 17,
    color: colors.primaryForeground,
    fontWeight: 600,
  },
  bottom: {
    gap: 10,
  },
});
