import { AppState, AppStateStatus } from "react-native";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserInactivityProvider = ({ children }: any) => {
  const appState = useRef(AppState.currentState);
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (nextAppState === "background") {
      recordStartTime();
    } else if (nextAppState === "active") {
      console.log("WEEEE BACKkkkk");
      const startTimeStr = await AsyncStorage.getItem("startTime");
      const startTime = startTimeStr ? parseInt(startTimeStr, 10) : Date.now();
      const elapsedTime = Date.now() - startTime;
      const maxInactivityTime = 5000;

      console.log("elapsedTime", elapsedTime);
      if (elapsedTime > maxInactivityTime) {
        router.replace("/(authenticated)/(modals)/lock");
      }
    }
    appState.current = nextAppState;
  };

  const recordStartTime = async () => {
    console.log("recordStartTime");
    await AsyncStorage.setItem("startTime", Date.now().toString());
  };

  return children;
};
