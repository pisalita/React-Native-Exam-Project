import { View, Text, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types/navigations";

type ScreenNavigationType = NativeStackNavigationProp<
  StackParamList,
  "Screen1"
>;

const Screen1 = () => {
  const navigation = useNavigation<ScreenNavigationType>();

  return (
    <View>
      <Button title="Screen2" onPress={() => navigation.navigate("Screen2")} />
    </View>
  );
};

export default Screen1;
