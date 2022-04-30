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
//import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChatStackParamList } from "../types/ChatStackParamList";
import {
  useAddChatroomsData,
  useChatroomsData,
} from "../hooks/useChatroomsData";

//ignore max timer warning
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);

import { useAppSelector } from "../app/hooks";

type ScreenNavigationType = NativeStackNavigationProp<
  ChatStackParamList,
  "ChatroomsList"
>;

const ChatroomsList = () => {
  //const navigation = useNavigation<ScreenNavigationType>();
  const token = useAppSelector((state) => state.user.user?.idToken);
  const { data, isLoading, error, isError }: any = useChatroomsData(token);
  const { mutate } = useAddChatroomsData();
  const [chatroomTitle, setChatroomTitle] = useState<string>("");

  const onTitleChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    setChatroomTitle(value);
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={data}
        keyExtractor={(item) => item.id}
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
            if (chatroomTitle !== null && token) {
              mutate({ chatroom: { title: chatroomTitle }, token: token });
              setChatroomTitle("");
            }
          }}
        />
      </View>
    </View>
  );
};

export default ChatroomsList;

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
