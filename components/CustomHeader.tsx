import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { tw } from "@/libs";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants";
import { Link } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

const CustomHeader = () => {
  const { top } = useSafeAreaInsets();
  const { user } = useUser();

  return (
    <BlurView
      intensity={100}
      tint={"light"}
      style={[tw`bg-white/80 bg-opacity-20 shadow-lg`, { paddingTop: top }]}
    >
      <View
        style={tw`flex-row items-center justify-between mx-3 py-2 h-15 gap-2`}
      >
        <Link href={"/(authenticated)/(modals)/account"} asChild>
          <TouchableOpacity
            style={tw`w-10 h-10 justify-center items-center rounded-full bg-gray p-2`}
          >
            {user?.imageUrl ? (
              <Image
                source={{ uri: user?.imageUrl }}
                style={tw`w-10 h-10 rounded-full`}
              />
            ) : (
              <Text style={tw`text-white text-base font-semibold`}>FT</Text>
            )}
          </TouchableOpacity>
        </Link>
        <View
          style={tw`flex-1 flex-row items-center bg-lightGray rounded-full px-2`}
        >
          <Ionicons name="search" size={24} color={Colors.dark} />
          <TextInput
            style={tw`flex-1 p-2 text-base`}
            placeholder="Search"
            placeholderTextColor={Colors.gray}
          />
        </View>
        <TouchableOpacity
          style={tw`w-10 h-10 justify-center items-center bg-lightGray rounded-full p-2`}
        >
          <Ionicons name="stats-chart" size={20} color={Colors.dark} />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`w-10 h-10 justify-center items-center bg-lightGray rounded-full p-2`}
        >
          <Ionicons name="card" size={20} color={Colors.dark} />
        </TouchableOpacity>
      </View>
    </BlurView>
  );
};

export default CustomHeader;
