import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React from "react";
import { Currency } from "@/interfaces/crypto";
import { Ionicons } from "@expo/vector-icons";
import { tw } from "@/libs";
import {
  useCryptoInfo,
  useCryptoListings,
  useLoadingState,
} from "@/app/hooks/HookAPIs";
import { Link } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import { Colors, defaultStyles } from "@/constants";

const Page = () => {
  const currencies = useCryptoListings(100);
  const listID = currencies.data
    ?.map((currency: Currency) => currency.id)
    .join(",");
  const info = useCryptoInfo(listID);
  const headerHeight = useHeaderHeight();

  useLoadingState([currencies, info]);

  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{
        marginTop: Platform.OS === "android" ? 0 : headerHeight,
      }}
    >
      <Text style={defaultStyles.sectionHeader}>Lastest Crypto</Text>
      <View style={defaultStyles.block}>
        {currencies.data?.map((currency: Currency) => {
          const currencyInfo = info.data?.[currency.id];
          const logoUrl = currencyInfo?.logo;
          const percentChange1h = currency.quote.USD.percent_change_1h;
          return (
            <Link
              href={`/crypto/${currency.id}` as any}
              key={currency.id}
              asChild
            >
              <TouchableOpacity
                style={tw`flex-row items-center justify-between`}
              >
                <View style={tw`flex-1 flex-row items-center gap-2`}>
                  {logoUrl ? (
                    <Image
                      source={{ uri: logoUrl }}
                      style={{ width: 40, height: 40 }}
                    />
                  ) : (
                    <Ionicons name="logo-bitcoin" size={30} color="black" />
                  )}
                  <View style={tw`flex-1 gap-1`}>
                    <Text
                      style={[
                        tw`text-lg font-semibold`,
                        { color: Colors.dark },
                      ]}
                    >
                      {currency.name}
                    </Text>
                    <Text style={tw`text-slate-500`}>
                      {currency.symbol.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <View style={tw`items-end`}>
                  <Text
                    style={[
                      tw`text-base font-semibold`,
                      {
                        color: percentChange1h > 0 ? "green" : "red",
                      },
                    ]}
                  >
                    {currency.quote.USD.price.toFixed(2)} €
                  </Text>
                  <View style={tw`flex-row items-center gap-1`}>
                    <Ionicons
                      name={percentChange1h > 0 ? "caret-up" : "caret-down"}
                      size={16}
                      color={percentChange1h > 0 ? "green" : "red"}
                    />
                    <Text
                      style={[
                        tw`text-sm`,
                        {
                          color: percentChange1h > 0 ? "green" : "red",
                        },
                      ]}
                    >
                      {percentChange1h.toFixed(2)}%
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Page;
