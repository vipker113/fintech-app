import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants";
import { tw } from "@/libs";

type RoundBtnProps = {
  text: string;
  icon?: typeof Ionicons.defaultProps;
  onPress?: () => void;
};

const RoundBtn = ({ text, icon, onPress }: RoundBtnProps) => {
  return (
    <TouchableOpacity style={tw`items-center gap-2`} onPress={onPress}>
      <View
        style={tw`rounded-full bg-slate-300 w-12 h-12 items-center justify-center`}
      >
        <Ionicons name={icon} size={24} color={Colors.dark} />
      </View>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default RoundBtn;
