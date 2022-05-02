import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  StyleSheet,
  TouchableOpacity,
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
import { useNavigation } from "@react-navigation/native";

type ScreenNavigationType = NativeStackNavigationProp<
  ChatStackParamList,
  "ChatroomsList"
>;

const ChatroomsList = () => {
  const navigation = useNavigation<ScreenNavigationType>();
  const token = useAppSelector((state) => state.user.user?.idToken);
  const { data, isLoading, error, isError }: any = useChatroomsData(token);
  const { mutate } = useAddChatroomsData();
  const [chatroomTitle, setChatroomTitle] = useState<string>("");
  const user = useAppSelector((state) => state.user.user);

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
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatroomContainer}
            onPress={() => navigation.navigate("Chatroom", item)}
          >
            <View>
              <Text>{item.title}</Text>
            </View>
            <View style={styles.lastMessage}>
              <Text ellipsizeMode="tail" numberOfLines={1}>
                {item.messages[0]
                  ? item.messages[item.messages.length - 1]?.message
                  : "no messages"}
              </Text>
              <Text style={styles.messageTimestamp}>
                {item.messages[0]
                  ? item.messages[item.messages.length - 1]?.timestamp.getDate()
                  : ""}
                -
                {item.messages[0]
                  ? item.messages[
                      item.messages.length - 1
                    ]?.timestamp.getMonth()
                  : ""}
                -
                {item.messages[0]
                  ? item.messages[
                      item.messages.length - 1
                    ]?.timestamp.getFullYear()
                  : ""}
                {" / "}
                {item.messages[0]
                  ? item.messages[
                      item.messages.length - 1
                    ]?.timestamp.getHours()
                  : ""}
                :
                {item.messages[0]
                  ? item.messages[
                      item.messages.length - 1
                    ]?.timestamp.getMinutes()
                  : ""}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TextInput
        style={{ marginTop: 20 }}
        value={chatroomTitle}
        onChange={onTitleChange}
        placeholder="Chatroom title"
      />
      <View>
        <Button
          title="Create chatroom"
          onPress={() => {
            if (chatroomTitle !== null && token && user) {
              mutate({
                chatroom: {
                  title: chatroomTitle,
                  messages: [{}],
                },
                token: token,
              });
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
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    backgroundColor: "#F5F5F5",
  },
  chatroomContainer: {
    paddingTop: 20,
  },
  flatList: {
    width: "100%",
    flex: 1,
  },
  lastMessage: {
    flex: 1,
    flexDirection: "row",
  },
  messageTimestamp: {
    marginLeft: "auto",
  },
});
