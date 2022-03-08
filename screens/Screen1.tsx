import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  _View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types/navigations";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createChatroom } from "../features/Chatrooms";
import tw from "tailwind-rn";

type ScreenNavigationType = NativeStackNavigationProp<
  StackParamList,
  "Screen1"
>;

const Screen1 = () => {
  const navigation = useNavigation<ScreenNavigationType>();
  const chatrooms = useAppSelector((state) => state.chatrooms.chatrooms);
  const dispatch = useAppDispatch();
  const [chatroomTitle, setChatroomTitle] = useState<string>("");

  const onTitleChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    setChatroomTitle(value);
  };

  return (
    <View>
      <FlatList
        data={chatrooms}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
      <TextInput value={chatroomTitle} onChange={onTitleChange}></TextInput>
      <View>
        <Button
          title="Create chatroom"
          onPress={() => {
            if (chatroomTitle != null) {
              dispatch(createChatroom(chatroomTitle));
              setChatroomTitle("");
            }
          }}
        />
        <Button
          title="Screen2"
          onPress={() => navigation.navigate("Screen2")}
        />
      </View>
    </View>
  );
};

export default Screen1;
