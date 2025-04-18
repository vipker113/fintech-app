import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { Colors } from "@/constants";
import { tw } from "@/libs";
import { Link, useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";

const Page = () => {
  const [countryCode, setCountryCode] = useState("+84");
  const [phoneNumber, setPhoneNumber] = useState("");
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;

  const { signUp } = useSignUp();
  const router = useRouter();

  const onSignUp = async () => {
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;

    try {
      await signUp!.create({
        phoneNumber: fullPhoneNumber,
      });
      signUp!.preparePhoneNumberVerification();

      router.push({
        pathname: "/verify/[phone]",
        params: { phone: fullPhoneNumber },
      });
    } catch (error) {
      console.error("Error signing up:", error);
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
        <View style={tw`flex-row my-10`}>
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
        <Link href={"/verify/[phone]"} replace asChild>
          <TouchableOpacity>
            <Text style={defaultStyles.textLink}>
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </Link>
        <View style={tw`flex-1`} />
        <TouchableOpacity
          onPress={onSignUp}
          style={[
            tw`mt-4`,
            defaultStyles.pillButton,
            phoneNumber !== ""
              ? defaultStyles.buttonDisabled
              : defaultStyles.buttonEnable,
          ]}
        >
          <Text style={defaultStyles.buttonText}>Sign up</Text>
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
