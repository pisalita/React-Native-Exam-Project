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
import { ChatStackParamList } from "../types/ChatStackParamList";
import {
  useAddChatroomsData,
  useChatroomsData,
} from "../hooks/useChatroomsData";

type ScreenNavigationType = NativeStackNavigationProp<
  ChatStackParamList,
  "ChatroomsList"
>;

const ChatroomsList = () => {
  const navigation = useNavigation<ScreenNavigationType>();
  const { data, isLoading, error, isError }: any = useChatroomsData();
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
        data={Object.keys(data)}
        keyExtractor={(item) => item as string}
        renderItem={({ item }) => <Text>{data[item].title}</Text>}
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
            if (chatroomTitle !== null) {
              mutate({ title: chatroomTitle });
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
