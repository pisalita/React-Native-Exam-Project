import {
  Button,
  FlatList,
  Image,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import {
  useAddChatroomMessage,
  useChatroomsData,
} from "../hooks/useChatroomsData";

//ignore non-serializable warning
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const Chatroom = ({ route }: any) => {
  const item = route.params;
  const token = useAppSelector((state) => state.user.user?.idToken);
  const { mutate } = useAddChatroomMessage();
  const user = useAppSelector((state) => state.user.user);
  const { data, isLoading, error, isError }: any = useChatroomsData(token);

  const [chatroom, setChatroom] = useState<any>({});
  const [message, setMessage] = useState<string>("");

  const onMessageChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    setMessage(value);
  };

  useEffect(() => {
    const chatrooms = data.find((room: any) => room.id === item.id);
    setChatroom({ ...chatrooms, messages: chatrooms.messages.reverse() });
  }, [data]);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        inverted={true}
        style={styles.flatList}
        data={chatroom.messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              {item.user.email !== user?.email ? (
                <Image
                  style={styles.senderMessageAvatar}
                  source={{ uri: user?.photoUrl }}
                />
              ) : (
                <Text></Text>
              )}
              <Text
                style={
                  user?.email === item.user.email
                    ? styles.senderMessage
                    : styles.receiverMessage
                }
              >
                {item.message}
              </Text>
            </View>
            <Text
              style={
                user?.email === item.user.email
                  ? styles.senderMessageTime
                  : styles.receiverMessageTime
              }
            >
              {item.user.email !== user?.email ? (
                <Text>
                  {item.user.displayName} {" / "}
                </Text>
              ) : (
                ""
              )}
              {item.timestamp.getDate() < 10 ? "0" : ""}
              {item.timestamp.getDate()}-
              {item.timestamp.getMonth() < 10 ? "0" : ""}
              {item.timestamp.getMonth()}-{item.timestamp.getFullYear()}
              {" / "}
              {item.timestamp.getHours()}:
              {item.timestamp.getMinutes() < 10 ? "0" : ""}
              {item.timestamp.getMinutes()}
            </Text>
          </View>
        )}
      />
      <View>
        <TextInput
          style={{ marginTop: 20 }}
          value={message}
          onChange={onMessageChange}
          placeholder="Message"
        />
        <Button
          title="Send message"
          onPress={() => {
            if (message !== null && token && user) {
              mutate({
                id: item.id,
                messages: {
                  message: message,
                  user: user,
                  timestamp: new Date(),
                },
                token: token,
              });
              setMessage("");
            }
          }}
        />
      </View>
    </View>
  );
};

export default Chatroom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    backgroundColor: "#F5F5F5",
  },
  senderMessage: {
    marginLeft: "auto",
    maxWidth: "80%",
    padding: 10,
    backgroundColor: "#5050A5",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 12,
    color: "white",
    marginVertical: 2,
  },
  senderMessageTime: {
    marginLeft: "auto",
  },
  receiverMessage: {
    padding: 10,
    backgroundColor: "lightgrey",
    maxWidth: "80%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 4,
    color: "#333333",
    marginRight: "auto",
    marginVertical: 2,
  },
  receiverMessageTime: {
    marginRight: "auto",
  },
  flatList: {
    width: "100%",
    flex: 1,
  },
  senderMessageAvatar: {
    borderRadius: 40,
    width: 40,
    height: 40,
    marginRight: 10,
  },
});
