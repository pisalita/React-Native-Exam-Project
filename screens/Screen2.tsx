import { View, Text, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Screen2 = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Button title="Screen3" onPress={() => navigation.navigate("Screen3")} />
    </View>
  );
};

export default Screen2;
