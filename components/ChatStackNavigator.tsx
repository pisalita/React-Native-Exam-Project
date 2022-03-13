import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ChatroomsList from "../screens/ChatroomsList";
import Screen2 from "../screens/Screen2";
import Screen3 from "../screens/Screen3";
import { ChatStackParamList } from "../types/ChatStackParamList";

const Stack = createNativeStackNavigator<ChatStackParamList>();

const ChatStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ChatroomsList" component={ChatroomsList} />
      <Stack.Screen name="Screen2" component={Screen2} />
      <Stack.Screen name="Screen3" component={Screen3} />
    </Stack.Navigator>
  );
};

export default ChatStackNavigator;
