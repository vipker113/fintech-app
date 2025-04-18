import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { tw } from "@/libs";
import { Colors } from "@/constants";
import { useGlobalStore } from "@/store/common-state";

const Loading = () => {
  const { isLoading } = useGlobalStore();
  return (
    <>
      {isLoading ? (
        <View
          style={tw`flex-1 absolute h-full w-full items-center justify-center bg-zinc-900/50`}
        >
          <ActivityIndicator size={"large"} color={Colors.primary} />
        </View>
      ) : null}
    </>
  );
};

export default Loading;
