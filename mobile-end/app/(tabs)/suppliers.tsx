import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import SupplierHeader from "@/components/SupplierHeader";
import SupplyAndSurplusSearch from "@/components/SupplyAndSurplusSearch";
import SellerCard from "@/components/SellerCard";
import { colors } from "@/theme/theme";
import { useRouter } from "expo-router";
import { FlatList, Pressable } from "react-native";

const DISPLAY_RATE = 3;

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
  },
];

const Suppliers = () => {
  const [displayData, setDisplayData] = useState<any[]>([]);
  const [page, setPage] = useState(0);

  const loadMoreData = () => {
    const startIndex = page * DISPLAY_RATE;
    const endIndex = startIndex + DISPLAY_RATE;
    const newData = data.slice(startIndex, endIndex);

    if (newData.length > 0) {
      setDisplayData((prevData) => [...prevData, ...newData]);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    loadMoreData();
  }, []);


  const router = useRouter();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.primaryForeground }}
    >
      <StatusBar style="dark" />
      <FlatList
        data={displayData}
        numColumns={1}
        style={{ marginBottom: 50 }}
        renderItem={({ item }) => (
          <Pressable style={{ flex: 1, padding: 8 }} onPress={() => router.push(`/supplier/${item.key}`)}>
            <SellerCard
              img={item.img}
              name={item.name}
              material={item.material}
              verified={item.verified}
              price={item.price}
              location={item.location}
              limitedStock={item.limitedStock}
            />
          </Pressable>
        )}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => item.key}
        ListHeaderComponent={() => (
          <>
            <SupplierHeader />
            <SupplyAndSurplusSearch color="#008751" />
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default Suppliers;
