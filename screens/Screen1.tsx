import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types/navigations";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createChatroom } from "../features/Chatrooms";

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
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={chatrooms}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
      <TextInput
        value={chatroomTitle}
        onChange={onTitleChange}
        placeholder="Chatroom title"
      />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  flatList: {
    backgroundColor: "red",
  },
});
