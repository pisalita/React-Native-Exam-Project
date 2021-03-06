import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Chatroom from "../../screens/Chatroom";
import ChatroomsList from "../../screens/ChatroomsList";
import { ChatStackParamList } from "../../types/ChatStackParamList";

const Stack = createNativeStackNavigator<ChatStackParamList>();

const ChatStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ChatroomsList" component={ChatroomsList} />
      <Stack.Screen name="Chatroom" component={Chatroom} />
    </Stack.Navigator>
  );
};

export default ChatStackNavigator;
