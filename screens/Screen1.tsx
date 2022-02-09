import { View, Text, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Screen1 = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Button title="Screen2" onPress={() => navigation.navigate("Screen2")} />
    </View>
  );
};

export default Screen1;
