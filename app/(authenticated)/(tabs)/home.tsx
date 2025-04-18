import { View, Text, ScrollView, FlatList, Platform } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colors, defaultStyles } from "@/constants";
import { tw } from "@/libs";
import RoundBtn from "@/components/RoundBtn";
import Dropdown from "@/components/Dropdown";
import { Transaction, useBalanceStore } from "@/store/balance-store";
import Seperator from "@/components/Seperator";
import { Ionicons } from "@expo/vector-icons";
import WidgetList from "@/components/SortTable/WidgetList";
import { useHeaderHeight } from "@react-navigation/elements";

const Page = () => {
  const { balance, clearTransactions, runTransaction, transactions } =
    useBalanceStore();

  const [initialBalance, setInitialBalance] = useState(0);
  const [percentChange, setPercentChange] = useState(0);
  const scrollRef = useRef(null);
  const headerHeight = useHeaderHeight();
  useEffect(() => {
    const currentBalance = balance();
    setInitialBalance(currentBalance);
  }, []);

  useEffect(() => {
    const currentBalance = balance();
    if (initialBalance !== 0) {
      const change =
        ((currentBalance - initialBalance) / Math.abs(initialBalance)) * 100;
      setPercentChange(change);
    }
  }, [balance(), initialBalance]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      runTransaction({
        id: Math.random().toString(36),
        amount: Math.random() * 10 * (Math.random() > 0.5 ? 1 : -1),
        date: new Date(),
        title: "Automatic transaction",
      });
    }, 20000);

    return () => clearInterval(intervalId);
  }, []);

  const onAddMoney = () => {
    runTransaction({
      id: Math.random().toString(36),
      amount: Math.random() * 10 * (Math.random() > 0.5 ? 1 : -1),
      date: new Date(),
      title: "Added money",
    });
  };

  const getPercentageDisplay = () => {
    const currentBalance = balance();

    const iconName =
      percentChange > 0
        ? "arrow-up"
        : percentChange < 0
        ? "arrow-down"
        : "remove";

    return { iconName, currentBalance };
  };

  const { iconName, currentBalance } = getPercentageDisplay();

  const renderTransaction = ({
    item: transaction,
    index,
  }: {
    item: Transaction;
    index: number;
  }) => (
    <View key={transaction.id}>
      <View style={tw`flex-row justify-between items-center`}>
        <View style={tw`gap-1`}>
          <Text style={tw`text-base text-slate-800`}>{transaction.title}</Text>
          <Text style={tw`text-sm text-slate-500 font-light`}>
            {transaction.date.toLocaleString()}
          </Text>
        </View>
        <Text
          style={tw`text-base ${
            transaction.amount > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {transaction.amount.toFixed(2)} €
        </Text>
      </View>
      {index !== transactions.length - 1 && <Seperator style={tw`my-2`} />}
    </View>
  );
  return (
    <ScrollView
      ref={scrollRef}
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{
        // marginTop: Platform.OS === "android" ? 0 : headerHeight,
        paddingTop: headerHeight,
      }}
    >
      <View style={tw`items-center`}>
        <View style={tw`flex-row gap-2 items-end justify-center`}>
          <Text
            style={tw`text-[50px] font-semibold ${
              currentBalance > 0
                ? "text-green-500"
                : currentBalance < 0
                ? "text-red-500"
                : "text-gray-800"
            }`}
          >
            {Math.abs(currentBalance).toFixed(2)}
          </Text>
          <View>
            <View style={tw`flex-row items-center`}>
              <Ionicons
                name={iconName as any}
                size={16}
                color={
                  percentChange > 0
                    ? "green"
                    : percentChange < 0
                    ? "red"
                    : "gray"
                }
              />
              <Text
                style={tw`text-[16px] ${
                  percentChange > 0
                    ? "text-green-500"
                    : percentChange < 0
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {Math.abs(percentChange).toFixed(2)}%
              </Text>
            </View>
            <Text style={tw`text-[20px] font-semibold`}>€</Text>
          </View>
        </View>
      </View>
      <View style={tw`mt-10 flex-row justify-between px-4`}>
        <RoundBtn icon={"add"} text="Add Money" onPress={onAddMoney} />
        <RoundBtn
          icon={"refresh"}
          text="Exchange"
          onPress={clearTransactions}
        />
        <RoundBtn icon={"list"} text="Details" onPress={onAddMoney} />
        <Dropdown />
      </View>
      <Text style={defaultStyles.sectionHeader}>Transaction</Text>
      <View style={tw`mx-4 my-2 bg-white rounded-2xl shadow-md max-h-[240px]`}>
        {transactions.length > 0 ? (
          <FlatList
            data={transactions}
            renderItem={renderTransaction}
            keyExtractor={(item) => item.id}
            nestedScrollEnabled={true}
            contentContainerStyle={tw`px-4 py-2`}
          />
        ) : (
          <Text style={tw`text-center px-4 py-2 text-slate-500`}>
            No transactions yet.
          </Text>
        )}
      </View>
      <Text style={defaultStyles.sectionHeader}>Widget</Text>
      <WidgetList />
    </ScrollView>
  );
};

export default Page;
