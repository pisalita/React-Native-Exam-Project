import {
  Button,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import {
  useAddChatroomMessage,
  useChatroomsData,
} from "../hooks/useChatroomsData";

const Chatroom = ({ route }: any) => {
  const item = route.params;
  const token = useAppSelector((state) => state.user.user?.idToken);
  const { mutate } = useAddChatroomMessage();
  const user = useAppSelector((state) => state.user.user);
  const { data, isLoading, error, isError }: any = useChatroomsData(token);

  const [message, setMessage] = useState<string>("");

  const onMessageChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    setMessage(value);
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.messages}>
        {/* MAKE THIS RERENDER WHEN DATA CHANGES */}
        {item.messages?.map((message: any) => {
          {
            return (
              <Text
                style={
                  user?.email !== message.user.email
                    ? styles.senderMessage
                    : styles.receiverMessage
                }
                key={message.id}
              >
                {message.message}
              </Text>
            );
          }
        })}
      </View>
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
  messages: {
    flex: 1,
    justifyContent: "flex-end",
  },
  senderMessage: {
    padding: 10,
    backgroundColor: "lightgrey",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 4,
    color: "#333333",
    marginRight: "auto",
    marginVertical: 2,
  },
  receiverMessage: {
    marginLeft: "auto",
    padding: 10,
    backgroundColor: "#5050A5",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 12,
    color: "white",
    marginVertical: 2,
  },
});
