import { View, Text, Button, TouchableOpacity } from "react-native";
import React from "react";
import { tw } from "@/libs";
import { useAssets } from "expo-asset";
import { ResizeMode, Video } from "expo-av";
import { Link } from "expo-router";
import { defaultStyles } from "@/constants/Styles";

const Page = () => {
  const [asset] = useAssets([require("@/assets/videos/intro.mp4")]);
  return (
    <View style={tw`flex-1 justify-between`}>
      {asset && (
        // <View style={tw`bg-primary w-full h-full absolute`} />
        <Video
          source={{ uri: asset[0].uri }}
          style={tw`w-full h-full absolute`}
          resizeMode={ResizeMode.COVER}
          isLooping
          shouldPlay
          isMuted
          useNativeControls={false}
        />
      )}
      <Text style={tw`text-4xl uppercase p-4 mt-4 text-white font-black`}>
        Ready to change the way you earn money?
      </Text>
      <View style={tw`flex-row justify-center gap-5 mb-14 mx-6`}>
        <Link
          href="/login"
          asChild
          style={[defaultStyles.pillButton, tw`flex-1 bg-dark`]}
        >
          <TouchableOpacity>
            <Text style={tw`text-white text-base`}>Login</Text>
          </TouchableOpacity>
        </Link>
        <Link
          href="/signup"
          asChild
          style={[defaultStyles.pillButton, tw`flex-1 bg-slate-200`]}
        >
          <TouchableOpacity>
            <Text style={tw`text-black text-base`}>Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default Page;
