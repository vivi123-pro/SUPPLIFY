import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  BadgeCheck,
  MapPin,
  MessageCircleDashed,
  Phone,
  Star,
} from "lucide-react-native";
import { colors } from "@/theme/theme";

const data = [
  {
    key: "1",
    img: "https://images.unsplash.com/photo-1598302936625-6075fbd98dd7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Alaba Industrial Suppliers",
    material: "Steel",
    verified: true,
    price: 45000,
    location: "Lagos",
    limitedStock: false,
    productImages: [
      "https://plus.unsplash.com/premium_photo-1682144783087-fe52612b1f0d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1682144867572-3537cc9974e1?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1661962247387-6b5498e5b73a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    key: "2",
    img: "https://images.unsplash.com/photo-1598302936625-6075fbd98dd7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Alaba Industrial Suppliers",
    material: "Steel",
    verified: true,
    price: 1000000,
    location: "Kano",
    limitedStock: true,
    productImages: [
      "https://plus.unsplash.com/premium_photo-1682144783087-fe52612b1f0d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1682144867572-3537cc9974e1?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1661962247387-6b5498e5b73a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    key: "3",
    img: "https://images.unsplash.com/photo-1598302936625-6075fbd98dd7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Alaba Industrial Suppliers",
    material: "Steel",
    verified: true,
    price: 234,
    location: "Lagos",
    limitedStock: false,
    productImages: [
      "https://plus.unsplash.com/premium_photo-1682144783087-fe52612b1f0d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1682144867572-3537cc9974e1?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1661962247387-6b5498e5b73a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    key: "4",
    img: "https://images.unsplash.com/photo-1598302936625-6075fbd98dd7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Alaba Industrial Suppliers",
    material: "Steel",
    verified: false,
    price: 45000,
    location: "Abia",
    limitedStock: false,
    productImages: [
      "https://plus.unsplash.com/premium_photo-1682144783087-fe52612b1f0d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1682144867572-3537cc9974e1?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1661962247387-6b5498e5b73a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    key: "5",
    img: "https://images.unsplash.com/photo-1598302936625-6075fbd98dd7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Alaba Industrial Suppliers",
    material: "Steel",
    verified: false,
    price: 435000,
    location: "Lagos",
    limitedStock: false,
    productImages: [
      "https://plus.unsplash.com/premium_photo-1682144783087-fe52612b1f0d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1682144867572-3537cc9974e1?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1661962247387-6b5498e5b73a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    key: "6",
    img: "https://images.unsplash.com/photo-1598302936625-6075fbd98dd7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Alaba Industrial Suppliers",
    material: "Steel",
    verified: true,
    price: 45000,
    location: "Lagos",
    limitedStock: false,
    productImages: [
      "https://plus.unsplash.com/premium_photo-1682144783087-fe52612b1f0d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1682144867572-3537cc9974e1?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1661962247387-6b5498e5b73a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    key: "7",
    img: "https://images.unsplash.com/photo-1598302936625-6075fbd98dd7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Alaba Industrial Suppliers",
    material: "Steel",
    verified: true,
    price: 45000,
    location: "Lagos",
    limitedStock: false,
    productImages: [
      "https://plus.unsplash.com/premium_photo-1682144783087-fe52612b1f0d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1682144867572-3537cc9974e1?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1661962247387-6b5498e5b73a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    key: "8",
    img: "https://images.unsplash.com/photo-1598302936625-6075fbd98dd7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Alaba Industrial Suppliers",
    material: "Steel",
    verified: true,
    price: 45000,
    location: "Lagos",
    limitedStock: false,
    productImages: [
      "https://plus.unsplash.com/premium_photo-1682144783087-fe52612b1f0d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1682144867572-3537cc9974e1?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1661962247387-6b5498e5b73a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    key: "9",
    img: "https://images.unsplash.com/photo-1598302936625-6075fbd98dd7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Alaba Industrial Suppliers",
    material: "Steel",
    verified: true,
    price: 45000,
    location: "Lagos",
    limitedStock: false,
    productImages: [
      "https://plus.unsplash.com/premium_photo-1682144783087-fe52612b1f0d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1682144867572-3537cc9974e1?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1661962247387-6b5498e5b73a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    key: "10",
    img: "https://images.unsplash.com/photo-1598302936625-6075fbd98dd7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Alaba Industrial Suppliers",
    material: "Steel",
    verified: true,
    price: 45000,
    location: "Lagos",
    limitedStock: false,
    productImages: [
      "https://plus.unsplash.com/premium_photo-1682144783087-fe52612b1f0d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1682144867572-3537cc9974e1?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1661962247387-6b5498e5b73a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    key: "11",
    img: "https://images.unsplash.com/photo-1598302936625-6075fbd98dd7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Alaba Industrial Suppliers",
    material: "Steel",
    verified: true,
    price: 45000,
    location: "Lagos",
    limitedStock: false,
    productImages: [
      "https://plus.unsplash.com/premium_photo-1682144783087-fe52612b1f0d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1682144867572-3537cc9974e1?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1661962247387-6b5498e5b73a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    key: "12",
    img: "https://images.unsplash.com/photo-1598302936625-6075fbd98dd7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Alaba Industrial Suppliers",
    material: "Steel",
    verified: true,
    price: 45000,
    location: "Lagos",
    limitedStock: false,
    productImages: [
      "https://plus.unsplash.com/premium_photo-1682144783087-fe52612b1f0d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1682144867572-3537cc9974e1?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1661962247387-6b5498e5b73a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
];

const SupplierId = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const supplier = data.find((item) => item.key === id);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!supplier) {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{ padding: 20, paddingTop: 48, flexDirection: "row", gap: 20 }}
        >
          <TouchableOpacity onPress={() => router.push("/(tabs)/suppliers")}>
            <ArrowLeft />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: 600 }}>
            Supplier Profile
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 500 }}>
            Supplier not found
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 24,
        paddingHorizontal: 10,
      }}
    >
      {/* Header */}
      <View
        style={{ padding: 20, paddingTop: 48, flexDirection: "row", gap: 20 }}
      >
        <TouchableOpacity onPress={() => router.push("/(tabs)/suppliers")}>
          <ArrowLeft />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: 600 }}>Supplier Profile</Text>
      </View>

      {/* Supplier Details */}
      <View
        style={{
          padding: 24,
          borderBottomWidth: 1,
          borderColor: colors.border,
        }}
      >
        <View style={styles.mapContainer}>
          <Image source={supplier.img} style={styles.image} />
          <View
            style={{
              marginLeft: 15,
              flex: 1,
              justifyContent: "center",
              gap: 5,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Text style={styles.supplierName}>{supplier.name}</Text>
              {supplier.verified && (
                <BadgeCheck size={18} color={colors.primary} />
              )}
            </View>

            <View style={styles.locationContainer}>
              <MapPin color={colors.mutedForeground} size={15} />
              <Text style={styles.location}>{supplier.location}</Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Star fill={"gold"} color={"gold"} size={18} />
              <Text style={styles.location}>4.8</Text>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.mutedForeground,
                  fontWeight: 500,
                }}
              >
                {"(127 reviews)"}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 15,
            marginTop: 20,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.whatsapp}>
            <Phone color={"#fff"} size={20} />
            <Text style={styles.whatsappText}>Call Now</Text>
          </View>
          <View style={styles.whatsapp}>
            <MessageCircleDashed color={"#fff"} size={20} />
            <Text style={styles.whatsappText}>WhatsApp</Text>
          </View>
        </View>
      </View>

      {/* Business Info */}
      <View
        style={{
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          borderColor: colors.border,
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 500, marginBottom: 10 }}>
          Business Information
        </Text>
        <View>
          <View style={styles.businessInfo}>
            <Text style={styles.infoText}>Business Hours</Text>
            <Text style={styles.infoText}>Mon - Fri: 8am - 6pm</Text>
          </View>
          <View style={styles.businessInfo}>
            <Text style={styles.infoText}>Response Time</Text>
            <Text style={styles.infoText}>Usually within 1 hour</Text>
          </View>
          <View style={styles.businessInfo}>
            <Text style={styles.infoText}>Member Since</Text>
            <Text style={styles.infoText}>Jan 2022</Text>
          </View>
          <View style={styles.businessInfo}>
            <Text style={styles.infoText}>Total Orders</Text>
            <Text style={styles.infoText}>450+ commpleted</Text>
          </View>
        </View>
      </View>

      {/* Product */}
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 500,
            marginTop: 20,
            marginLeft: 10,
          }}
        >
          Product
        </Text>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderColor: colors.border,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ fontSize: 18, fontWeight: 600 }}>
              {supplier.material}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: colors.primary,
                marginTop: 5,
              }}
            >
              ₦{supplier.price.toLocaleString()}
            </Text>
          </View>

          <View>
            {supplier.limitedStock ? (
              <View
                style={[
                  styles.stockContainer,
                  { backgroundColor: "#fce09b56" },
                ]}
              >
                <Text style={[styles.stock, { color: colors.chart4 }]}>
                  Limited Stock
                </Text>
              </View>
            ) : (
              <View
                style={[
                  styles.stockContainer,
                  { backgroundColor: "#a4ffe156" },
                ]}
              >
                <Text style={[styles.stock, { color: colors.primary }]}>
                  In Stock
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Product Images */}
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          borderColor: colors.border,
            paddingBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: 500,
            marginBottom: 10,
            marginLeft: 10,
          }}
        >
          Product Images
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10 }}
        >
          {supplier.productImages.map((img, index) => (
            <Pressable
              key={index}
              onPress={() => {
                setSelectedImage(img);
                setModalVisible(true);
              }}
            >
              <Image
                source={{ uri: img }}
                style={{
                  width: 250,
                  height: 200,
                  marginRight: 15,
                  borderRadius: 10,
                }}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Modal for full image view */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <Pressable
            style={styles.modalBackground}
            onPress={() => setModalVisible(false)}
          >
            {selectedImage && (
              <Image
                source={selectedImage}
                style={styles.fullImage}
                contentFit="contain"
              />
            )}
          </Pressable>
        </View>
      </Modal>

      {/* Customer Review */}
      <View style={{ marginTop: 20, paddingBottom: 90, paddingHorizontal: 10 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 500,
            marginBottom: 10,
            marginLeft: 10,
          }}
        >
          Customer Reviews
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10 }}
        >
          {[1, 2, 3, 4, 5].map((review, index) => (
            <View
              key={index}
              style={{
                width: 300,
                padding: 15,
                marginRight: 15,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: "#f9f9f9",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <Image
                  source={"https://randomuser.me/api/portraits/men/1.jpg"}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: "600" }}>
                    John Doe
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Star fill={"gold"} color={"gold"} size={14} />
                    <Text
                      style={{ fontSize: 14, color: colors.mutedForeground }}
                    >
                      5.0
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={{ fontSize: 14, color: colors.mutedForeground }}>
                "Great supplier! Fast delivery and quality products. Highly
                recommend."
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default SupplierId;

const styles = StyleSheet.create({
  image: {
    width: 75,
    height: 75,
    borderRadius: "50%",
  },
  locationContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  location: {
    fontSize: 15,
    fontWeight: 500,
  },
  mapContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  supplierName: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
  },
  whatsappText: {
    fontSize: 17,
    color: colors.primaryForeground,
    fontWeight: 600,
  },
  whatsapp: {
    backgroundColor: "#059c6aff",
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: 400,
    height: 350,
    borderRadius: 15,
  },
  businessInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 500,
    color: colors.mutedForeground,
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
});
