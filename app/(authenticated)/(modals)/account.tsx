import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { tw } from "@/libs";
import { useUser } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useGlobalStore } from "@/store/common-state";
import { sleep } from "@/libs/helper";
import * as ImagePicker from "expo-image-picker";
import { getAppIcon, setAppIcon } from "expo-dynamic-app-icon";
import { Colors } from "@/constants";

const ICONS = [
  {
    name: "Default",
    icon: require("@/assets/images/icon.png"),
  },
  {
    name: "Dark",
    icon: require("@/assets/images/icon-dark.png"),
  },
  {
    name: "Vivid",
    icon: require("@/assets/images/icon-vivid.png"),
  },
];

const Page = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [edit, setEdit] = useState(false);
  const { setLoading } = useGlobalStore();
  const [activeIcon, setActiveIcon] = useState("Default");

  const onSaveUser = async () => {
    try {
      setLoading(true);
      await user?.update({
        firstName: firstName,
        lastName: lastName,
      });
      console.log("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setEdit(false);
      setLoading(false);
    }
  };
  const onCaptureImmage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.75,
      base64: true,
    });
    if (!result.canceled) {
      const base64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setLoading(true);
      await user
        ?.setProfileImage({
          file: base64,
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onChangeAppIcon = async (icon: string) => {
    await setAppIcon(icon.toLowerCase());
    setActiveIcon(icon);
  };

  return (
    <BlurView intensity={100} tint={"dark"} style={tw`flex-1 bg-black/60`}>
      {user && (
        <>
          <View style={tw`items-center mt-10 mx-[20px]`}>
            <TouchableOpacity onPress={onCaptureImmage} style={tw`mb-4`}>
              {user?.imageUrl && (
                <Image
                  source={{ uri: user?.imageUrl }}
                  style={tw`w-20 h-20 rounded-full`}
                />
              )}
            </TouchableOpacity>
            {edit ? (
              <View style={tw`flex-row items-center gap-4`}>
                <TextInput
                  value={firstName || ""}
                  onChangeText={setFirstName}
                  style={tw`bg-white rounded-xl px-4 h-11 w-[140px] text-base`}
                />
                <TextInput
                  value={lastName || ""}
                  onChangeText={setLastName}
                  style={tw`bg-white rounded-xl px-4 h-11 w-[140px] text-base`}
                />
                <TouchableOpacity onPress={onSaveUser}>
                  <Ionicons name="checkmark-outline" size={24} color="white" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={tw`flex-row items-center gap-2`}>
                <Text style={tw`text-white text-center text-2xl font-semibold`}>
                  {firstName} {lastName}
                </Text>
                <TouchableOpacity onPress={() => setEdit(true)}>
                  <MaterialIcons name="create" size={24} color="white" />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.btn} onPress={() => signOut()}>
              <Ionicons name="log-out" size={24} color={"#fff"} />
              <Text style={{ color: "#fff", fontSize: 18 }}>Log out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Ionicons name="person" size={24} color={"#fff"} />
              <Text style={{ color: "#fff", fontSize: 18 }}>Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Ionicons name="bulb" size={24} color={"#fff"} />
              <Text style={{ color: "#fff", fontSize: 18 }}>Learn</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Ionicons name="megaphone" size={24} color={"#fff"} />
              <Text style={{ color: "#fff", fontSize: 18, flex: 1 }}>
                Inbox
              </Text>
              <View
                style={{
                  backgroundColor: Colors.primary,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 12 }}>14</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.actions}>
            {ICONS.map((icon) => (
              <TouchableOpacity
                key={icon.name}
                style={styles.btn}
                onPress={() => onChangeAppIcon(icon.name)}
              >
                <Image source={icon.icon} style={{ width: 24, height: 24 }} />
                <Text style={{ color: "#fff", fontSize: 18 }}>{icon.name}</Text>
                {activeIcon.toLowerCase() === icon.name.toLowerCase() && (
                  <Ionicons name="checkmark" size={24} color={"#fff"} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  actions: {
    backgroundColor: "rgba(256, 256, 256, 0.1)",
    borderRadius: 16,
    gap: 0,
    margin: 20,
  },
  btn: {
    padding: 14,
    flexDirection: "row",
    gap: 20,
  },
});

export default Page;
