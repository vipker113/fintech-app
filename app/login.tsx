import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { Colors, SignInType } from "@/constants";
import { tw } from "@/libs";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";

const Page = () => {
  const [countryCode, setCountryCode] = useState("+84");
  const [phoneNumber, setPhoneNumber] = useState("");
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;

  const router = useRouter();

  const { signIn } = useSignIn();

  const onSignIn = async (type: SignInType) => {
    if (type === SignInType.Phone) {
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;
      try {
        const { supportedFirstFactors } = await signIn!.create({
          identifier: fullPhoneNumber,
        });

        const firstPhoneFactor: any = supportedFirstFactors?.find(
          (factor: any) => factor.strategy === "phone_code"
        );

        const { phoneNumberId } = firstPhoneFactor;

        await signIn?.prepareFirstFactor({
          strategy: "phone_code",
          phoneNumberId,
        });

        router.push({
          pathname: "/verify/[phone]",
          params: { phone: fullPhoneNumber, signin: "true" },
        });
      } catch (error) {
        console.error("Error signing in:", error);
        if (isClerkAPIResponseError(error)) {
          if (error.errors[0].code === "form_identity_not_found") {
            Alert.alert("Error", error.errors[0].message);
          }
        }
      }
    }
  };
  return (
    <KeyboardAvoidingView
      style={tw`flex-1`}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Let's get started</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your phone number. We will send you a confirmation code there
        </Text>
        <View style={tw`flex-row my-4`}>
          <TextInput
            style={styles.input}
            placeholder="Country code"
            placeholderTextColor={Colors.gray}
            value={countryCode}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Phone number"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Phone)}
          style={[
            defaultStyles.pillButton,
            phoneNumber !== ""
              ? defaultStyles.buttonDisabled
              : defaultStyles.buttonEnable,
            tw`mb-5`,
          ]}
        >
          <Text style={defaultStyles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <View style={tw`flex-row items-center gap-4 `}>
          <View
            style={[tw`flex-1 bg-gray`, { height: StyleSheet.hairlineWidth }]}
          />
          <Text style={tw`text-gray text-[20px]`}>or</Text>
          <View
            style={[tw`flex-1 bg-gray`, { height: StyleSheet.hairlineWidth }]}
          />
        </View>

        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Email)}
          style={[
            defaultStyles.pillButton,
            tw`mt-4 flex-row gap-4 items-center bg-white`,
          ]}
        >
          <Ionicons name="mail" size={28} color={Colors.dark} />
          <Text style={tw`text-gray text-[20px]`}>Sign in with email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Google)}
          style={[
            defaultStyles.pillButton,
            tw`mt-4 flex-row gap-4 items-center bg-white`,
          ]}
        >
          <Ionicons name="logo-google" size={28} color={Colors.dark} />
          <Text style={tw`text-gray text-[20px]`}>Sign in with email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Apple)}
          style={[
            defaultStyles.pillButton,
            tw`mt-4 flex-row gap-4 items-center bg-white`,
          ]}
        >
          <Ionicons name="logo-apple" size={28} color={Colors.dark} />
          <Text style={tw`text-gray text-[20px]`}>Sign in with email</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 16,
    marginRight: 10,
  },
});

export default Page;
