import { View, Text, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChatStackParamList } from "../types/ChatStackParamList";

type ScreenNavigationType = NativeStackNavigationProp<
  ChatStackParamList,
  "Screen2"
>;

const Screen2 = () => {
  const navigation = useNavigation<ScreenNavigationType>();

  return (
    <View>
      <Button title="Screen3" onPress={() => navigation.navigate("Screen3")} />
    </View>
  );
};

export default Screen2;
