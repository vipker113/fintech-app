import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { tw } from "@/libs";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const LockScreen = () => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.fullName);
  const [code, setCode] = useState<number[]>([]);
  const codeLength = new Array(6).fill(0);
  const router = useRouter();

  const offset = useSharedValue(0);

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  const OFFSET = 10;
  const TIME = 50;

  useEffect(() => {
    if (code.length === 6) {
      console.log("codeLength", code);
      if (code.join("") === "123456") {
        console.log("Unlocking the app...");
        router.replace("/(authenticated)/(tabs)/home");
      } else {
        offset.value = withSequence(
          withTiming(-OFFSET, {
            duration: TIME,
            easing: Easing.out(Easing.ease),
          }),
          withRepeat(
            withTiming(OFFSET, {
              duration: TIME * 2,
              easing: Easing.inOut(Easing.ease),
            }),
            3,
            true
          ),
          withTiming(0, { duration: TIME, easing: Easing.in(Easing.ease) })
        );
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        console.log("Incorrect code, try again.");
        setCode([]);
      }
    }
  }, [code]);

  const onNumberPress = (number: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (code.length < 6) {
      setCode((prevCode) => [...prevCode, number]);
    }
  };

  const onBackspacePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode((prevCode) => prevCode.slice(0, -1));
  };

  const onBiometricAuthentication = async () => {
    const { success } = await LocalAuthentication.authenticateAsync();
    if (success) {
      console.log("Unlocking the app...");
      router.replace("/(authenticated)/(tabs)/home");
    } else {
      console.log("Authentication failed");
    }
  };

  return (
    <SafeAreaView>
      <Text style={tw`text-2xl font-bold text-center self-center mt-10`}>
        {`Wellcome back,\n ${firstName}`}
      </Text>
      <View style={tw`flex-row justify-center items-center my-20 gap-4`}>
        {codeLength.map((_, index) => (
          <Animated.View
            key={index}
            style={[
              tw`w-6 h-6 rounded-full`,
              style,
              code[index] ? tw`bg-primary` : tw`bg-lightGray`,
            ]}
          ></Animated.View>
        ))}
      </View>
      <View style={tw`flex-row justify-between mx-12 gap-10`}>
        {[1, 2, 3].map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onNumberPress(item)}
            style={tw`p-4 rounded-full`}
          >
            <Text style={tw`text-dark text-2xl`}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={tw`flex-row justify-between mx-12 gap-10 mt-4`}>
        {[4, 5, 6].map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onNumberPress(item)}
            style={tw`p-4 rounded-full`}
          >
            <Text style={tw`text-dark text-2xl`}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={tw`flex-row justify-between mx-12 gap-10 mt-4`}>
        {[7, 8, 9].map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onNumberPress(item)}
            style={tw`p-4 rounded-full`}
          >
            <Text style={tw`text-dark text-2xl`}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={tw`flex-row justify-between mx-10 gap-10 mt-4`}>
        <TouchableOpacity onPress={onBiometricAuthentication} style={tw`p-4`}>
          <Ionicons name="finger-print" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onNumberPress(0)}
          style={tw`p-4 rounded-full`}
        >
          <Text style={tw`text-dark text-2xl`}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onBackspacePress} style={tw`p-4`}>
          <Ionicons name="backspace-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Text
          style={tw`text-center text-primary text-base mt-10 font-semibold`}
        >
          Forgot your passcode?
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LockScreen;
