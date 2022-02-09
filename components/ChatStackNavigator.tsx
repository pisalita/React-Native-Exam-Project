import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Screen1 from "../screens/Screen1";
import Screen2 from "../screens/Screen2";
import Screen3 from "../screens/Screen3";

const Stack = createNativeStackNavigator();

const ChatStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Screen1" component={Screen1} />
      <Stack.Screen name="Screen2" component={Screen2} />
      <Stack.Screen name="Screen3" component={Screen3} />
    </Stack.Navigator>
  );
};

export default ChatStackNavigator;
