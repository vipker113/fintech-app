import {
  View,
  Text,
  SectionList,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import { Stack } from "expo-router";
import { tw } from "@/libs";
import { Colors, defaultStyles } from "@/constants";
import {
  useCryptoInfo,
  useCryptoTicker,
  useLoadingState,
} from "@/app/hooks/HookAPIs";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Ionicons } from "@expo/vector-icons";
const categories = ["Overview", "News", "Orders", "Transactions"];
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { Dimensions } from "react-native";
import { Circle, useFont } from "@shopify/react-native-skia";
import { format } from "date-fns";
import Animated, {
  SharedValue,
  useAnimatedProps,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color="black" />;
}

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const Detail = () => {
  const { id } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();
  const [activeIndex, setActiveIndex] = useState(0);
  const cryptoInfoQuery = useCryptoInfo(+id);
  const { data } = cryptoInfoQuery;
  const font = useFont(require("@/assets/fonts/SpaceMono-Regular.ttf"), 12);
  const { state, isActive } = useChartPressState({ x: 0, y: { price: 0 } });

  const { data: ticker } = useCryptoTicker();

  useLoadingState([cryptoInfoQuery]);

  useEffect(() => {
    console.log(isActive);
    if (isActive) Haptics.selectionAsync();
  }, [isActive]);

  const animatedText = useAnimatedProps(() => {
    return {
      text: `${state.y.price.value.value.toFixed(2)} €`,
      defaultValue: "",
    };
  });

  const animatedDateText = useAnimatedProps(() => {
    const date = new Date(state.x.value.value);
    return {
      text: `${date.toLocaleDateString()}`,
      defaultValue: "",
    };
  });

  return (
    <>
      <Stack.Screen options={{ title: data?.[+id]?.name }} />
      <SectionList
        scrollEnabled={true}
        style={{ marginTop: headerHeight }}
        keyExtractor={(i) => i.title}
        contentInsetAdjustmentBehavior="automatic"
        stickySectionHeadersEnabled={true}
        sections={[{ data: [{ title: "Chart" }] }]}
        renderSectionHeader={() => {
          return (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={tw`items-center w-full justify-between px-4 pb-2 bg-background border-b border-gray-200`}
            >
              {categories.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setActiveIndex(index)}
                  style={
                    activeIndex === index
                      ? styles.categoriesBtnActive
                      : styles.categoriesBtn
                  }
                >
                  <Text
                    style={
                      activeIndex === index
                        ? styles.categoryTextActive
                        : styles.categoryText
                    }
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          );
        }}
        ListHeaderComponent={() => (
          <>
            <View style={tw`flex-row justify-between items-center mx-4 my-2`}>
              <Text style={tw`text-lg`}>{data?.[+id]?.symbol}</Text>
              <Image
                source={{ uri: data?.[+id]?.logo }}
                style={{ width: 60, height: 60 }}
              />
            </View>
            <View style={{ flexDirection: "row", gap: 10, margin: 12 }}>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  {
                    backgroundColor: Colors.primary,
                    flexDirection: "row",
                    gap: 16,
                  },
                ]}
              >
                <Ionicons name="add" size={24} color={"#fff"} />
                <Text style={[defaultStyles.buttonText, { color: "#fff" }]}>
                  Buy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  {
                    backgroundColor: Colors.primaryMuted,
                    flexDirection: "row",
                    gap: 16,
                  },
                ]}
              >
                <Ionicons name="arrow-back" size={24} color={Colors.primary} />
                <Text
                  style={[defaultStyles.buttonText, { color: Colors.primary }]}
                >
                  Receive
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        renderItem={({ item }: any) => (
          <>
            {ticker && (
              <View style={[defaultStyles.block, tw`h-[500px] p-2`]}>
                <>
                  {isActive ? (
                    <View>
                      <AnimatedTextInput
                        editable={false}
                        underlineColorAndroid={"transparent"}
                        style={tw`font-semibold text-lg p-0 m-0`}
                        animatedProps={animatedText}
                      ></AnimatedTextInput>
                      <AnimatedTextInput
                        editable={false}
                        style={tw`text-gray p-0 m-0`}
                        underlineColorAndroid={"transparent"}
                        animatedProps={animatedDateText}
                      ></AnimatedTextInput>
                    </View>
                  ) : (
                    <View>
                      <Text style={tw`font-semibold text-lg`}>
                        {ticker[ticker.length - 1].price.toFixed(2)}€
                      </Text>
                      <Text style={tw`text-gray`}>Today</Text>
                    </View>
                  )}
                  <CartesianChart
                    chartPressState={state}
                    axisOptions={{
                      font,
                      tickCount: 5,
                      labelOffset: { x: 0, y: 0 },
                      labelColor: Colors.gray,
                      formatYLabel: (v) => `${v} €`,
                      formatXLabel: (ms) => format(new Date(ms), "dd/MM"),
                    }}
                    data={ticker}
                    xKey="timestamp"
                    yKeys={["price"]}
                  >
                    {({ points }) => (
                      <>
                        <Line
                          points={points.price}
                          color={Colors.primary}
                          strokeWidth={3}
                          curveType="bumpX"
                        />
                        {isActive && (
                          <ToolTip
                            x={state.x.position}
                            y={state.y.price.position}
                          />
                        )}
                      </>
                    )}
                  </CartesianChart>
                </>
              </View>
            )}
            <View style={[defaultStyles.block, { marginTop: 20 }]}>
              <Text>Overview</Text>
              <Text style={{ color: Colors.gray }}>
                Bitcoin is a decentralized digital currency, without a central
                bank or single administrator, that can be sent from user to user
                on the peer-to-peer bitcoin network without the need for
                intermediaries. Transactions are verified by network nodes
                through cryptography and recorded in a public distributed ledger
                called a blockchain.
              </Text>
            </View>
          </>
        )}
      ></SectionList>
    </>
  );
};

const styles = StyleSheet.create({
  categoryText: {
    fontSize: 14,
    color: Colors.gray,
  },
  categoryTextActive: {
    fontSize: 14,
    color: "#000",
  },
  categoriesBtn: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  categoriesBtnActive: {
    padding: 10,
    paddingHorizontal: 14,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
});

export default Detail;
